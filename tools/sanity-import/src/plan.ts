/**
 * Builds an import plan: the exact Sanity actions `apply` will send, and the
 * full documents they produce, for a human to read and for Sanity's own
 * `documents validate` to check against the Studio schema. Writes nothing to
 * Sanity.
 *
 * What the importer owns on the article: title, slug, article_format,
 * editorial_badge, the seo text fields (never open_graph_image), categories,
 * author, publishedAt (only when the contract gives a date), products and
 * content. On a product: create a new one; on an existing or legacy product,
 * only asin, link and a missing brand, always as a draft.
 */

import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import type { Action } from '@sanity/client'

import type { Article } from './article.ts'
import { buildArticle, type Reference } from './build.ts'
import type { Contract } from './contract.ts'
import type { Doc, Resolved } from './resolve.ts'

export type ProductPlan = {
    asin: string
    title: string
    mode: 'existing' | 'legacy' | 'new'
    id: string
    change: 'none' | 'create' | 'set'
    set?: Record<string, string>
    /** Created by an earlier run of this import and not yet published. */
    pending?: true
    basedOn: { published?: string; draft?: string }
}

export type Plan = {
    version: 1
    createdAt: string
    dataset: string
    package: string
    sourceHash: string
    article: { mode: 'create' | 'edit'; id: string; basedOn: { published?: string; draft?: string } }
    products: ProductPlan[]
    actions: Action[]
    /** Full documents after apply, for validation and for the read-back check. */
    documents: Record<string, unknown>[]
    counts: Record<string, number>
    notes: string[]
    warnings: string[]
}

export function sourceHash(contractText: string, articleText: string): string {
    return createHash('sha256').update(contractText).update('\0').update(articleText).digest('hex')
}

const STRENGTHEN = { type: 'product', weak: false, template: { id: 'product', params: {} } } as const

function slugify(value: string): string {
    return value
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

function withoutSystem(doc: Doc | undefined): Record<string, unknown> {
    if (!doc) return {}
    const rest: Record<string, unknown> = { ...doc }
    for (const key of ['_rev', '_createdAt', '_updatedAt', '_system']) delete rest[key]
    return rest
}

export function makePlan(input: {
    contract: Contract
    article: Article
    resolved: Resolved
    dataset: string
    packagePath: string
    hash: string
    /** Products earlier runs of this import created (record.json, `created`). */
    createdIds?: Set<string>
}): Plan {
    const { contract, article, resolved } = input
    const actions: Action[] = []
    const documents: Record<string, unknown>[] = []
    const products: ProductPlan[] = []

    // Products first: new ones as drafts, existing and legacy ones as draft patches.
    const refs = new Map<string, Reference>()
    const taken = new Set(resolved.takenSlugs)

    for (const product of contract.products) {
        const found = resolved.products.find((item) => item.asin === product.asin)
        if (!found) continue
        const basedOn = { published: found.published?._rev, draft: found.draft?._rev }

        if (found.mode === 'new') {
            let slug = slugify(product.title)
            if (taken.has(slug)) slug = `${slug}-${product.asin.toLowerCase()}`
            taken.add(slug)
            const attributes = {
                _id: `drafts.${found.id}`,
                _type: 'product',
                title: product.title,
                brand: product.brand,
                asin: product.asin,
                link: product.link,
                slug: { _type: 'slug', current: slug },
            }
            actions.push({
                actionType: 'sanity.action.document.create',
                publishedId: found.id,
                attributes,
                ifExists: 'fail',
            })
            documents.push(attributes)
            products.push({ asin: product.asin, title: product.title, mode: 'new', id: found.id, change: 'create', basedOn })
            refs.set(product.asin, { _type: 'reference', _ref: found.id, _weak: true, _strengthenOnPublish: STRENGTHEN })
            continue
        }

        const current = found.draft ?? found.published
        const set: Record<string, string> = {}
        if (String(current?.asin ?? '').toUpperCase() !== product.asin) set.asin = product.asin
        if (current?.link !== product.link) set.link = product.link
        if (!current?.brand) set.brand = product.brand

        if (Object.keys(set).length > 0) {
            actions.push({
                actionType: 'sanity.action.document.edit',
                draftId: `drafts.${found.id}`,
                publishedId: found.id,
                patch: { set },
            })
            documents.push({ ...withoutSystem(current), ...set, _id: `drafts.${found.id}` })
        }
        products.push({
            asin: product.asin,
            title: String(current?.title ?? product.title),
            mode: found.mode,
            id: found.id,
            change: Object.keys(set).length > 0 ? 'set' : 'none',
            ...(Object.keys(set).length > 0 ? { set } : {}),
            ...(!found.published && input.createdIds?.has(found.id) ? { pending: true as const } : {}),
            basedOn,
        })
        refs.set(
            product.asin,
            found.published
                ? { _type: 'reference', _ref: found.id }
                : { _type: 'reference', _ref: found.id, _weak: true, _strengthenOnPublish: STRENGTHEN },
        )
    }

    const built = buildArticle(article, contract, (asin) => {
        const ref = refs.get(asin)
        if (!ref) throw new Error(`no product reference for ${asin}`)
        return ref
    })

    // Article
    const { id } = resolved.article
    const fields: Record<string, unknown> = {
        title: contract.title,
        slug: { _type: 'slug', current: contract.slug },
        article_format: contract.article_format,
        editorial_badge: contract.badge,
        categories: [{ _type: 'reference', _key: 'category', _ref: resolved.categoryId }],
        author: { _type: 'reference', _ref: resolved.authorId },
        products: built.products,
        content: built.content,
        ...(contract.dates.published !== 'keep' ? { publishedAt: `${contract.dates.published}T00:00:00.000Z` } : {}),
    }
    const seo = {
        meta_title: contract.seo.meta_title,
        meta_description: contract.seo.meta_description,
        keywords: contract.seo.keywords.join(', '),
        indexable: contract.seo.indexable,
    }

    const warnings = [...resolved.warnings]
    if (resolved.article.mode === 'create') {
        if (contract.dates.published === 'keep') {
            throw new Error('dates.published is "keep", but no article with this slug exists; give a date')
        }
        const attributes = { _id: `drafts.${id}`, _type: 'article', ...fields, seo: { _type: 'seo', ...seo } }
        actions.push({ actionType: 'sanity.action.document.create', publishedId: id, attributes, ifExists: 'fail' })
        documents.push(attributes)
    } else {
        const base = withoutSystem(resolved.article.draft ?? resolved.article.published)
        const seoPaths = Object.fromEntries(Object.entries(seo).map(([key, value]) => [`seo.${key}`, value]))
        actions.push(
            {
                actionType: 'sanity.action.document.edit',
                draftId: `drafts.${id}`,
                publishedId: id,
                patch: { setIfMissing: { seo: { _type: 'seo' } } },
            },
            {
                actionType: 'sanity.action.document.edit',
                draftId: `drafts.${id}`,
                publishedId: id,
                patch: { set: { ...fields, ...seoPaths } },
            },
        )
        documents.push({
            ...base,
            ...fields,
            seo: { _type: 'seo', ...((base.seo as object | undefined) ?? {}), ...seo },
            _id: `drafts.${id}`,
        })
    }

    const count = (type: string) => built.content.filter((block) => block._type === type).length
    return {
        version: 1,
        createdAt: new Date().toISOString(),
        dataset: input.dataset,
        package: input.packagePath,
        sourceHash: input.hash,
        article: {
            mode: resolved.article.mode,
            id,
            basedOn: { published: resolved.article.published?._rev, draft: resolved.article.draft?._rev },
        },
        products,
        actions,
        documents,
        counts: {
            contentBlocks: built.content.length,
            h2: built.content.filter((block) => block._type === 'block' && block.style === 'h2').length,
            topPicks: (built.content.find((block) => block._type === 'topPicksBlock')?.items as unknown[] | undefined)?.length ?? 0,
            comparisonRows:
                ((built.content.find((block) => block._type === 'comparisonTableBlock')?.comparison_table as { rows?: unknown[] } | undefined)?.rows?.length) ?? 0,
            productRows: built.products.length,
            faqs: (built.content.find((block) => block._type === 'faqSection')?.items as unknown[] | undefined)?.length ?? 0,
            typesSections: count('typesSection'),
            guideSections: count('guideSection'),
            decisionTables: count('decisionComparisonTableBlock'),
        },
        notes: built.notes,
        warnings,
    }
}

export function writePlan(packageDir: string, plan: Plan): { json: string; ndjson: string } {
    const dir = join(packageDir, 'import')
    mkdirSync(dir, { recursive: true })
    // Plans are regenerated on every run; only record.json belongs in git.
    writeFileSync(join(dir, '.gitignore'), 'plan-*\n')
    const json = join(dir, `plan-${plan.dataset}.json`)
    const ndjson = join(dir, `plan-${plan.dataset}.ndjson`)
    writeFileSync(json, `${JSON.stringify(plan, null, 2)}\n`)
    writeFileSync(ndjson, `${plan.documents.map((doc) => JSON.stringify(doc)).join('\n')}\n`)
    return { json, ndjson }
}

export type SchemaCheck = {
    ok: boolean
    /** Real problems: every error marker except the expected kind below. */
    errors: string[]
    /** "Referenced document must be published" on a weak reference to a product this plan creates. */
    expected: number
    output: string
}

type PathSegment = string | number | { _key: string }
type Marker = { level: string; message: string; path: PathSegment[] }

function valueAt(doc: unknown, path: PathSegment[]): unknown {
    let current = doc
    for (const segment of path) {
        if (current === null || typeof current !== 'object') return undefined
        if (typeof segment === 'object') {
            current = (current as { _key?: string }[]).find?.((item) => item?._key === segment._key)
        } else {
            current = (current as Record<string | number, unknown>)[segment]
        }
    }
    return current
}

function pathText(path: PathSegment[]): string {
    return path.map((segment) => (typeof segment === 'object' ? `[_key=="${segment._key}"]` : `.${segment}`)).join('')
}

/**
 * Runs the blog's `sanity documents validate --file` on the plan's documents,
 * so the Studio schema itself (custom rules included) checks them.
 *
 * A draft article may point at a product that exists only as a draft; Sanity
 * marks that "must be published", which is what keeps the article from going
 * live before its products. That marker is expected on the weak references to
 * products this plan creates. Every other error fails the check.
 */
export function checkWithStudio(ndjsonFile: string, plan: Plan, blogDir: string): SchemaCheck {
    const result = spawnSync(
        'pnpm',
        ['exec', 'sanity', 'documents', 'validate', '--file', ndjsonFile, '--dataset', plan.dataset, '--level', 'error', '--format', 'ndjson', '-y'],
        {
            cwd: blogDir,
            encoding: 'utf8',
            env: { ...process.env, NEXT_PUBLIC_SANITY_DATASET: plan.dataset, SANITY_DATASET: plan.dataset, NO_UPDATE_NOTIFIER: '1' },
            timeout: 300_000,
        },
    )
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim()
    const { errors, expected, reports } = classifyValidation(result.stdout ?? '', plan)

    // A non-zero exit with nothing parsed means the check itself failed to run.
    if (result.status !== 0 && reports === 0) {
        errors.push(`sanity documents validate did not run cleanly (exit ${result.status}): ${output.slice(-500)}`)
    }
    return { ok: errors.length === 0, errors, expected, output }
}

/** Sorts `documents validate --format ndjson` markers into expected and real errors. */
export function classifyValidation(stdout: string, plan: Plan): { errors: string[]; expected: number; reports: number } {
    // Products publish-products will publish: new in this plan, or created by an earlier run.
    const newProducts = new Set(
        plan.products.filter((product) => product.mode === 'new' || product.pending).map((product) => product.id),
    )
    const errors: string[] = []
    let expected = 0
    let reports = 0

    for (const line of stdout.split('\n')) {
        if (!line.trim().startsWith('{')) continue
        const report = JSON.parse(line) as { documentId: string; markers?: Marker[] }
        reports++
        const doc = plan.documents.find((item) => item._id === report.documentId)
        for (const marker of report.markers ?? []) {
            if (marker.level !== 'error') continue
            const value = valueAt(doc, marker.path) as { _ref?: string; _weak?: boolean } | undefined
            if (
                marker.message === 'Referenced document must be published' &&
                value?._weak === true &&
                typeof value._ref === 'string' &&
                newProducts.has(value._ref)
            ) {
                expected++
                continue
            }
            errors.push(`${report.documentId}${pathText(marker.path)}: ${marker.message}`)
        }
    }
    return { errors, expected, reports }
}
