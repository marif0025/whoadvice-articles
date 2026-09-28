/**
 * Drafts a contract from a package: article.md, the handoff YAML and the
 * product records. The draft is a starting point for a human, never an
 * import input: every value it could not take from a source, and every
 * judgment call, goes into `needs_review`, and validation fails until a
 * human has cleared that list.
 */

import {
    findTables,
    labelledValue,
    markdownLinks,
    normalizeName,
    parseArticle,
} from './article.ts'
import type { ContractSection } from './contract.ts'
import { handoffProducts, type Handoff, type ProductRecord } from './sources.ts'

export type DraftInput = {
    articleText: string
    handoff?: Handoff
    records?: Map<string, ProductRecord[]>
}

const TODO = 'TODO'
const DEFAULT_BADGE = 'Research-Based Buying Guide'

export function draftContract(input: DraftInput): Record<string, unknown> {
    const article = parseArticle(input.articleText)
    const handoff = input.handoff?.data ?? {}
    const needs: string[] = []
    const str = (value: unknown) => (typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined)

    // Slug and category from the article's Slug line, e.g. /skin-care/best-epilators/
    const slugField =
        article.fields['Slug'] ??
        article.fields['Suggested slug'] ??
        article.fields['Recommended slug'] ??
        str(handoff.recommended_slug) ??
        ''
    const segments = slugField.replace(/`/g, '').split('/').filter(Boolean)
    const slug = segments.at(-1) ?? TODO
    const category = segments.length > 1 ? segments[0] : TODO
    if (slug === TODO) needs.push('slug: article.md has no Slug line')
    if (category === TODO) needs.push(`category: the Slug "${slugField}" has no category segment; set the Sanity category slug`)

    needs.push('author: set the Sanity author slug; no handoff names an author')
    needs.push(`badge: confirm "${DEFAULT_BADGE}"`)

    // Head fields
    let metaTitle = article.fields['SEO title'] ?? str(handoff.seo_title) ?? article.h1
    if (metaTitle.includes(':')) {
        const fixed = metaTitle.replace(/\s*:\s*/, ' - ')
        needs.push(`seo.meta_title: colon replaced ("${metaTitle}" became "${fixed}"); confirm the wording`)
        metaTitle = fixed
    }
    const metaDescription = article.fields['Meta description'] ?? str(handoff.meta_description) ?? TODO
    if (metaDescription.includes(':')) needs.push('seo.meta_description has a colon; rewrite it with a full stop')
    const secondary = Array.isArray(handoff.secondary_keywords)
        ? handoff.secondary_keywords.filter((item): item is string => typeof item === 'string')
        : []
    const keywords = [...new Set([article.fields['Primary keyword'], ...secondary].filter((item): item is string => Boolean(item)))]

    // Sections
    const reviews = article.sections.find(
        (section) => section.subsections.filter((sub) => labelledValue(sub.lines, 'Summary')).length >= 2,
    )
    const topPicks = article.sections.find(
        (section) =>
            section !== reviews &&
            (!reviews || section.line < reviews.line) &&
            section.subsections.length > 0 &&
            section.subsections.every((sub) => sub.heading.includes(': ')),
    )
    const comparison = article.sections.find(
        (section) => section !== reviews && section !== topPicks && findTables(section.lines).length > 0,
    )

    const mapped: ContractSection[] = article.sections.map((section) => {
        if (section === reviews) return { heading: section.heading, block: 'productReviews' }
        if (section === topPicks) return { heading: section.heading, block: 'topPicks' }
        if (section === comparison) return { heading: section.heading, block: 'comparisonTable' }
        if (section.subsections.length > 0 && section.subsections.every((sub) => sub.heading.trim().endsWith('?'))) {
            const wantsSchema = Array.isArray(handoff.suggested_schema_types) && handoff.suggested_schema_types.includes('FAQPage')
            return { heading: section.heading, block: 'faqSection', faq_schema: wantsSchema }
        }
        if (/^types of\b/i.test(section.heading) && section.subsections.length > 0) {
            return { heading: section.heading, block: 'typesSection' }
        }
        if (findTables(section.lines).length > 0) return { heading: section.heading, block: 'decisionTable' }
        return { heading: section.heading, block: 'prose' }
    })
    needs.push('sections: confirm each block, especially typesSection and guideSection versus prose')

    // Products, in review order
    const fromHandoff = handoffProducts(input.handoff)
    const handoffByName = new Map(
        [...fromHandoff.values()]
            .filter((entry) => typeof entry.title === 'string')
            .map((entry) => [normalizeName(entry.title as string), entry]),
    )
    const tableRows = comparison ? findTables(comparison.lines)[0]?.rows ?? [] : []

    const products = (reviews?.subsections ?? []).map((sub) => {
        const name = sub.heading.replace(/^\d+\.\s*/, '').trim()
        const key = normalizeName(name)

        const inlineAsin = labelledValue(sub.lines, 'ASIN')?.toUpperCase()
        const inlineLinkField = labelledValue(sub.lines, 'Affiliate link')
        const inlineLink = inlineLinkField ? markdownLinks([inlineLinkField])[0]?.url ?? inlineLinkField : undefined
        const entry = (inlineAsin ? fromHandoff.get(inlineAsin) : undefined) ?? handoffByName.get(key)
        const asin = inlineAsin ?? str(entry?.asin)?.toUpperCase() ?? TODO
        const record = input.records?.get(asin)?.[0]

        const link = inlineLink ?? str(entry?.affiliate_link) ?? record?.affiliateLink ?? TODO
        const brand = labelledValue(sub.lines, 'Brand') ?? str(entry?.brand) ?? record?.brand ?? TODO
        for (const [field, value] of [['asin', asin], ['link', link], ['brand', brand]] as const) {
            if (value === TODO) needs.push(`products "${name}": no ${field} in article.md, the handoff or products/`)
        }

        const topPick = topPicks?.subsections.find((pick) =>
            [pick.heading, ...pick.heading.split(': ')].some((part) => normalizeName(part) === key),
        )
        const row = tableRows.find((cells) =>
            [cells[0] ?? '', (cells[0] ?? '').replace(/^\d+\.\s*/, ''), ...(cells[0] ?? '').replace(/^\d+\.\s*/, '').split(/ [—-] /)]
                .some((part) => normalizeName(part) === key),
        )

        return {
            asin,
            title: name,
            brand,
            link,
            review_heading: sub.heading,
            ...(topPick ? { top_pick_heading: topPick.heading } : {}),
            ...(row ? { table_label: row[0] } : {}),
        }
    })

    const unmatchedPicks = (topPicks?.subsections ?? []).filter(
        (pick) => !products.some((product) => product.top_pick_heading === pick.heading),
    )
    for (const pick of unmatchedPicks) needs.push(`top pick "${pick.heading}": no matching product; set top_pick_heading`)
    for (const cells of tableRows) {
        if (!products.some((product) => product.table_label === cells[0])) {
            needs.push(`comparison row "${cells[0]}": no matching product; set table_label`)
        }
    }

    return {
        version: 1,
        status: 'draft',
        slug,
        category,
        author: TODO,
        article_format: reviews ? 'product_guide' : 'editorial',
        badge: DEFAULT_BADGE,
        title: article.h1,
        seo: { meta_title: metaTitle, meta_description: metaDescription, keywords, indexable: true },
        dates: { published: 'keep' },
        products,
        sections: mapped,
        needs_review: needs,
    }
}
