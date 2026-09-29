/**
 * Sends a reviewed plan to Sanity in one atomic Actions API request, then
 * reads the drafts back and compares every field the importer owns. Also
 * publishes the products an import created or changed, on a separate,
 * explicit command. Never publishes an article.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

import type { Action, SanityClient } from '@sanity/client'

import type { Plan } from './plan.ts'

export type ImportRecord = Record<
    string,
    {
        appliedAt: string
        transactionId: string
        sourceHash: string
        article: { id: string; draftRev: string }
        /**
         * Both flags survive later runs until the product is published:
         * `created` (this import made it) and `pending` (it has an import
         * change waiting in a draft). publish-products publishes the pending ones.
         */
        products: { asin: string; id: string; mode: string; change: string; created: boolean; pending: boolean }[]
    }
>

const ARTICLE_FIELDS = [
    'title',
    'slug',
    'article_format',
    'editorial_badge',
    'categories',
    'author',
    'products',
    'content',
] as const

export function recordFile(packageDir: string): string {
    return join(packageDir, 'import', 'record.json')
}

export function readRecord(packageDir: string): ImportRecord {
    const file = recordFile(packageDir)
    return existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')) as ImportRecord) : {}
}

/** Stable JSON: object keys sorted, so field order never counts as a change. */
function stable(value: unknown): string {
    if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`
    if (value && typeof value === 'object') {
        return `{${Object.keys(value)
            .sort()
            .map((key) => `${JSON.stringify(key)}:${stable((value as Record<string, unknown>)[key])}`)
            .join(',')}}`
    }
    return JSON.stringify(value)
}

async function revisions(client: SanityClient, id: string): Promise<{ published?: string; draft?: string }> {
    const docs = await client.fetch<{ _id: string; _rev: string }[]>(`*[_id in [$id, $draft]]{_id, _rev}`, {
        id,
        draft: `drafts.${id}`,
    })
    return {
        published: docs.find((doc) => doc._id === id)?._rev,
        draft: docs.find((doc) => doc._id === `drafts.${id}`)?._rev,
    }
}

export async function applyPlan(input: {
    client: SanityClient
    plan: Plan
    packageDir: string
    hash: string
}): Promise<{ transactionId: string; mismatches: string[] }> {
    const { client, plan } = input

    if (plan.sourceHash !== input.hash) {
        throw new Error('cms.yaml or article.md changed since this plan was made; run plan again')
    }

    // Nothing the plan read may have changed since.
    const stale: string[] = []
    const check = async (label: string, id: string, basedOn: { published?: string; draft?: string }) => {
        const now = await revisions(client, id)
        if (now.published !== basedOn.published || now.draft !== basedOn.draft) stale.push(`${label} ${id}`)
    }
    await check('article', plan.article.id, plan.article.basedOn)
    for (const product of plan.products) {
        if (product.change !== 'none') await check(`product ${product.asin}`, product.id, product.basedOn)
    }
    if (stale.length > 0) throw new Error(`changed since the plan was made: ${stale.join(', ')}; run plan again`)

    // Images first, so the article's asset references resolve. Same bytes, same
    // ID: an asset already in the dataset is not uploaded again.
    for (const image of plan.images ?? []) {
        if (await client.getDocument(image.assetId)) continue
        const bytes = readFileSync(join(input.packageDir, image.file))
        const asset = await client.assets.upload('image', bytes, { filename: basename(image.file) })
        if (asset._id !== image.assetId) {
            throw new Error(`${image.file} uploaded as ${asset._id}, not ${image.assetId} as planned; run plan again`)
        }
    }

    const result = await client.action(plan.actions)
    const transactionId = (result as { transactionId?: string }).transactionId ?? ''

    // Read back and compare what the importer owns.
    const mismatches: string[] = []
    const draftId = `drafts.${plan.article.id}`
    const draft = await client.getDocument(draftId)
    const intended = plan.documents.find((doc) => doc._id === draftId) as Record<string, unknown> | undefined
    if (!draft || !intended) {
        mismatches.push(`article draft ${draftId} not found after apply`)
    } else {
        for (const field of ARTICLE_FIELDS) {
            if (stable(draft[field]) !== stable(intended[field])) mismatches.push(`article.${field}`)
        }
        const seo = (draft.seo ?? {}) as Record<string, unknown>
        const seoIntended = (intended.seo ?? {}) as Record<string, unknown>
        for (const key of ['meta_title', 'meta_description', 'keywords', 'indexable']) {
            if (stable(seo[key]) !== stable(seoIntended[key])) mismatches.push(`article.seo.${key}`)
        }
    }
    for (const product of plan.products.filter((item) => item.change !== 'none')) {
        const doc = await client.getDocument(`drafts.${product.id}`)
        const expected = plan.documents.find((item) => item._id === `drafts.${product.id}`) as Record<string, unknown> | undefined
        for (const key of ['asin', 'link', 'brand', 'title']) {
            if (doc && expected && stable(doc[key]) !== stable(expected[key])) mismatches.push(`product ${product.asin}.${key}`)
        }
        if (!doc) mismatches.push(`product draft drafts.${product.id} not found after apply`)
    }

    const record = readRecord(input.packageDir)
    const before = record[plan.dataset]?.products ?? []
    record[plan.dataset] = {
        appliedAt: new Date().toISOString(),
        transactionId,
        sourceHash: plan.sourceHash,
        article: { id: plan.article.id, draftRev: String(draft?._rev ?? '') },
        products: await Promise.all(
            plan.products.map(async ({ asin, id, mode, change }) => {
                const earlier = before.find((item) => item.id === id)
                const revs = await revisions(client, id)
                return {
                    asin,
                    id,
                    mode,
                    change,
                    created: change === 'create' || (Boolean(earlier?.created) && !revs.published),
                    pending: Boolean(revs.draft) && (change !== 'none' || Boolean(earlier?.pending)),
                }
            }),
        ),
    }
    writeFileSync(recordFile(input.packageDir), `${JSON.stringify(record, null, 2)}\n`)

    return { transactionId, mismatches }
}

/**
 * Publishes the product drafts an import created or changed, in one atomic
 * request guarded by each draft's revision. The article stays for an editor.
 */
export async function publishProducts(input: {
    client: SanityClient
    dataset: string
    packageDir: string
}): Promise<{ published: string[]; skipped: string[] }> {
    const entry = readRecord(input.packageDir)[input.dataset]
    if (!entry) throw new Error(`no import recorded for dataset "${input.dataset}"`)

    const actions: Action[] = []
    const published: string[] = []
    const skipped: string[] = []
    for (const product of entry.products.filter((item) => item.pending)) {
        const revs = await revisions(input.client, product.id)
        if (!revs.draft) {
            skipped.push(`${product.asin} (no draft; already published?)`)
            continue
        }
        actions.push({
            actionType: 'sanity.action.document.publish',
            draftId: `drafts.${product.id}`,
            publishedId: product.id,
            ifDraftRevisionId: revs.draft,
        })
        published.push(`${product.asin} ${product.id}`)
    }
    if (actions.length > 0) await input.client.action(actions)
    return { published, skipped }
}
