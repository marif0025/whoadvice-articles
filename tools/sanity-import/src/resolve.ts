/**
 * Finds what the contract points at in a dataset: the category, the author,
 * the article (by slug) and each product (by ASIN, then by the contract's
 * legacy decision). Read-only. Anything ambiguous is an error, never a guess.
 */

import type { SanityClient } from '@sanity/client'

import { normalizeName } from './article.ts'
import type { Contract } from './contract.ts'

export type Doc = Record<string, unknown> & { _id: string; _rev: string; _type: string }

export type ResolvedProduct = {
    asin: string
    /** existing: found by ASIN. legacy: the contract's legacy_product. new: to be created. */
    mode: 'existing' | 'legacy' | 'new'
    /** Published (root) ID, existing or newly generated. */
    id: string
    published?: Doc
    draft?: Doc
}

export type Resolved = {
    categoryId: string
    authorId: string
    article: { mode: 'create' | 'edit'; id: string; published?: Doc; draft?: Doc }
    products: ResolvedProduct[]
    /** Product slugs already in use, for naming new products. */
    takenSlugs: Set<string>
    errors: string[]
    warnings: string[]
}

const rootId = (id: string) => id.replace(/^drafts\./, '')
const isDotted = (id: string) => rootId(id).includes('.')

/** Group documents by root ID into { published, draft }. */
function byRoot(docs: Doc[]): Map<string, { published?: Doc; draft?: Doc }> {
    const groups = new Map<string, { published?: Doc; draft?: Doc }>()
    for (const doc of docs) {
        const root = rootId(doc._id)
        const group = groups.get(root) ?? {}
        if (doc._id.startsWith('drafts.')) group.draft = doc
        else group.published = doc
        groups.set(root, group)
    }
    return groups
}

export async function resolve(client: SanityClient, contract: Contract, newId: () => string): Promise<Resolved> {
    const errors: string[] = []
    const warnings: string[] = []
    const asins = contract.products.map((product) => product.asin)
    const legacyIds = contract.products
        .map((product) => product.legacy_product)
        .filter((id): id is string => Boolean(id) && id !== 'none')

    const data = await client.fetch<{
        category: { _id: string }[]
        author: { _id: string }[]
        articles: Doc[]
        posts: string[]
        byAsin: Doc[]
        legacy: Doc[]
        noAsin: { _id: string; title?: string; link?: string }[]
        slugs: string[]
    }>(
        `{
            "category": *[_type == "category" && slug.current == $category && !(_id in path("drafts.**"))]{_id},
            "author": *[_type == "author" && slug.current == $author && !(_id in path("drafts.**"))]{_id},
            "articles": *[_type == "article" && slug.current == $slug],
            "posts": *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))]._id,
            "byAsin": *[_type == "product" && upper(asin) in $asins],
            "legacy": *[_type == "product" && _id in $legacyIds],
            "noAsin": *[_type == "product" && !defined(asin) && !(_id in path("drafts.**"))]{_id, title, link},
            "slugs": *[_type == "product" && defined(slug.current)].slug.current
        }`,
        {
            category: contract.category,
            author: contract.author,
            slug: contract.slug,
            asins,
            legacyIds: [...legacyIds, ...legacyIds.map((id) => `drafts.${id}`)],
        },
    )

    if (data.category.length !== 1) errors.push(`category "${contract.category}": ${data.category.length} published matches`)
    if (data.author.length !== 1) errors.push(`author "${contract.author}": ${data.author.length} published matches`)
    if (data.posts.length > 0) {
        warnings.push(`legacy post(s) ${data.posts.join(', ')} share the slug; the site shows the article, but both are in the sitemap until the post is unpublished`)
    }

    // Article
    const articleGroups = byRoot(data.articles)
    let article: Resolved['article'] = { mode: 'create', id: newId() }
    if (articleGroups.size > 1) {
        errors.push(`slug "${contract.slug}" belongs to ${articleGroups.size} articles: ${[...articleGroups.keys()].join(', ')}`)
    } else if (articleGroups.size === 1) {
        const [id, group] = [...articleGroups.entries()][0]
        if (isDotted(id)) errors.push(`article ${id} has a dotted ID, which visitors cannot read`)
        article = { mode: 'edit', id, ...group }
    }

    // Products
    const asinGroups = new Map<string, Map<string, { published?: Doc; draft?: Doc }>>()
    for (const asin of asins) {
        asinGroups.set(asin, byRoot(data.byAsin.filter((doc) => String(doc.asin ?? '').toUpperCase() === asin)))
    }
    const legacyGroups = byRoot(data.legacy)

    const products: ResolvedProduct[] = []
    for (const product of contract.products) {
        const found = asinGroups.get(product.asin) ?? new Map()
        const decision = product.legacy_product

        if (found.size > 1) {
            errors.push(`${product.asin}: ${found.size} products carry this ASIN (${[...found.keys()].join(', ')})`)
            continue
        }
        if (found.size === 1) {
            const [id, group] = [...found.entries()][0]
            if (isDotted(id)) errors.push(`${product.asin}: product ${id} has a dotted ID`)
            if (decision && decision !== 'none' && decision !== id) {
                errors.push(`${product.asin}: cms.yaml reuses ${decision}, but ${id} already carries this ASIN`)
            }
            products.push({ asin: product.asin, mode: 'existing', id, ...group })
            continue
        }

        if (decision && decision !== 'none') {
            const group = legacyGroups.get(decision)
            if (!group?.published) {
                errors.push(`${product.asin}: legacy_product ${decision} is not a published product`)
                continue
            }
            const legacyAsin = String(group.published.asin ?? '').toUpperCase()
            if (legacyAsin && legacyAsin !== product.asin) {
                errors.push(`${product.asin}: legacy_product ${decision} already has ASIN ${legacyAsin}`)
                continue
            }
            products.push({ asin: product.asin, mode: 'legacy', id: decision, ...group })
            continue
        }

        const name = normalizeName(product.title)
        const candidates = data.noAsin.filter((doc) => {
            const other = normalizeName(doc.title ?? '')
            return (
                (doc.link ?? '').toUpperCase().includes(`/DP/${product.asin}`) ||
                (other !== '' && (other === name || other.includes(name) || name.includes(other)))
            )
        })
        if (candidates.length > 0 && decision !== 'none') {
            errors.push(
                `${product.asin}: possible legacy product(s) without an ASIN: ` +
                    candidates.map((doc) => `${doc._id} "${doc.title ?? ''}"`).join('; ') +
                    '. Set legacy_product in cms.yaml to one of these IDs, or to none.',
            )
            continue
        }
        products.push({ asin: product.asin, mode: 'new', id: newId() })
    }

    return {
        categoryId: data.category[0]?._id ?? '',
        authorId: data.author[0]?._id ?? '',
        article,
        products,
        takenSlugs: new Set(data.slugs),
        errors,
        warnings,
    }
}
