/**
 * Checks a contract against its package: article.md, the handoff YAML and
 * the product records. Errors block an import; warnings are for a human to
 * read. The limits mirror the Sanity schema in ~/personal/blog.
 */

import {
    findTables,
    labelledList,
    labelledValue,
    markdownLinks,
    normalizeName,
    parseArticle,
    type Section,
} from './article.ts'
import { Contract, type ContractSection } from './contract.ts'
import { handoffProducts, type Handoff, type ProductRecord } from './sources.ts'

export type Issue = {
    level: 'error' | 'warning'
    code: string
    message: string
}

export type ValidateInput = {
    contract: unknown
    articleText: string
    handoff?: Handoff
    records?: Map<string, ProductRecord[]>
    /** True when a path relative to the package exists. */
    fileExists?: (relativePath: string) => boolean
}

const SINGLE_USE = ['topPicks', 'comparisonTable', 'productReviews', 'faqSection'] as const
const PRODUCT_BLOCKS = ['topPicks', 'comparisonTable', 'productReviews'] as const
const AFFILIATE_HOST = /^https:\/\/(amzn\.to|(www\.)?amazon\.com)\//

export function validate(input: ValidateInput): Issue[] {
    const issues: Issue[] = []
    const error = (code: string, message: string) => issues.push({ level: 'error', code, message })
    const warn = (code: string, message: string) => issues.push({ level: 'warning', code, message })

    const parsed = Contract.safeParse(input.contract)
    if (!parsed.success) {
        for (const issue of parsed.error.issues) {
            error('SCHEMA', `${issue.path.join('.') || '(root)'}: ${issue.message}`)
        }
        return issues
    }
    const contract = parsed.data
    const article = parseArticle(input.articleText)

    // Human sign-off
    if (contract.needs_review.length > 0) {
        error('NEEDS_REVIEW', `${contract.needs_review.length} open item(s): ${contract.needs_review.join(' | ')}`)
    }
    if (contract.status === 'approved_for_publication' && (!contract.approved_by || !contract.approved_at)) {
        error('APPROVAL', 'approved_for_publication needs approved_by and approved_at')
    }

    // Head fields
    if (contract.title !== article.h1) {
        error('TITLE_MISMATCH', `title "${contract.title}" is not the article H1 "${article.h1}"`)
    }
    for (const [field, value] of [
        ['meta_title', contract.seo.meta_title],
        ['meta_description', contract.seo.meta_description],
    ] as const) {
        if (value.includes(':')) {
            error('HEAD_COLON', `seo.${field} has a colon. Titles use " - " and descriptions use full stops.`)
        }
    }
    if (contract.seo.meta_title.length > 60) {
        warn('META_TITLE_LENGTH', `seo.meta_title is ${contract.seo.meta_title.length} characters (60 or fewer shows in full)`)
    }
    if (contract.seo.meta_description.length > 160) {
        warn('META_DESCRIPTION_LENGTH', `seo.meta_description is ${contract.seo.meta_description.length} characters (Sanity warns above 160)`)
    }

    const slugField = article.fields['Slug'] ?? article.fields['Suggested slug'] ?? article.fields['Recommended slug']
    if (slugField) {
        const lastSegment = slugField.replace(/`/g, '').split('/').filter(Boolean).pop()
        if (lastSegment !== contract.slug) {
            error('SLUG_MISMATCH', `slug "${contract.slug}" differs from article.md Slug "${slugField}"`)
        }
    }
    if (article.fields['SEO title'] && article.fields['SEO title'] !== contract.seo.meta_title) {
        warn('META_TITLE_DIFFERS', `seo.meta_title overrides article.md SEO title "${article.fields['SEO title']}"`)
    }
    if (article.fields['Meta description'] && article.fields['Meta description'] !== contract.seo.meta_description) {
        warn('META_DESCRIPTION_DIFFERS', 'seo.meta_description overrides the article.md Meta description')
    }
    if (/\[FACT CHECK/i.test(input.articleText)) {
        error('FACT_CHECK', 'article.md still has [FACT CHECK] markers')
    }
    if (contract.hero_image && input.fileExists && !input.fileExists(contract.hero_image.file)) {
        error('HERO_IMAGE_MISSING', `hero_image.file "${contract.hero_image.file}" is not in the package`)
    }

    // Sections
    const headings = article.sections.map((section) => section.heading)
    const explicit = contract.sections.filter((section) => section.heading !== '*')
    const wildcardIndex = contract.sections.findIndex((section) => section.heading === '*')

    if (wildcardIndex >= 0) {
        if (wildcardIndex !== contract.sections.length - 1) {
            error('SECTION_WILDCARD', '"*" must be the last sections entry')
        }
        if (contract.sections[wildcardIndex].block !== 'prose') {
            error('SECTION_WILDCARD', '"*" can only map to prose')
        }
    }
    const seen = new Set<string>()
    for (const section of explicit) {
        if (seen.has(section.heading)) error('SECTION_DUPLICATE', `sections lists "${section.heading}" twice`)
        seen.add(section.heading)
        if (!headings.includes(section.heading)) {
            error('SECTION_MISSING', `sections: "${section.heading}" is not an H2 in article.md`)
        }
        if (section.faq_schema !== undefined && section.block !== 'faqSection') {
            warn('FAQ_SCHEMA_IGNORED', `faq_schema on "${section.heading}" only applies to faqSection`)
        }
    }
    if (wildcardIndex < 0) {
        for (const heading of headings) {
            if (!seen.has(heading)) error('SECTION_UNCOVERED', `H2 "${heading}" is not mapped and there is no "*" entry`)
        }
    }

    const blockOf = (heading: string): ContractSection['block'] | undefined =>
        explicit.find((section) => section.heading === heading)?.block ??
        (wildcardIndex >= 0 ? 'prose' : undefined)
    const sectionsFor = (block: ContractSection['block']): Section[] =>
        article.sections.filter((section) => blockOf(section.heading) === block)

    for (const block of SINGLE_USE) {
        if (sectionsFor(block).length > 1) error('BLOCK_REPEATED', `${block} is mapped to more than one H2`)
    }
    if (contract.article_format === 'product_guide') {
        for (const block of PRODUCT_BLOCKS) {
            if (sectionsFor(block).length === 0) error('BLOCK_REQUIRED', `a product guide needs one ${block} section`)
        }
    } else {
        for (const block of PRODUCT_BLOCKS) {
            if (sectionsFor(block).length > 0) error('EDITORIAL_PRODUCTS', `an editorial article cannot have a ${block} section`)
        }
        if (contract.products.length > 0) error('EDITORIAL_PRODUCTS', 'an editorial article cannot list products')
    }

    // Products
    const products = contract.products
    const asins = new Set<string>()
    for (const product of products) {
        if (asins.has(product.asin)) error('PRODUCT_DUPLICATE', `ASIN ${product.asin} is listed twice`)
        asins.add(product.asin)
        if (!AFFILIATE_HOST.test(product.link)) {
            warn('LINK_HOST', `${product.asin}: link "${product.link}" is not an amzn.to or amazon.com URL`)
        }
    }

    const reviews = sectionsFor('productReviews')[0]
    if (reviews) {
        const reviewHeadings = reviews.subsections.map((sub) => sub.heading)
        for (const sub of reviews.subsections) {
            const owners = products.filter((product) => product.review_heading === sub.heading)
            if (owners.length === 0) {
                error('REVIEW_UNMAPPED', `review "${sub.heading}" has no product in the contract`)
                continue
            }
            if (owners.length > 1) error('REVIEW_AMBIGUOUS', `review "${sub.heading}" is claimed by several products`)
            const product = owners[0]

            for (const label of ['Summary', 'Verdict']) {
                if (!labelledValue(sub.lines, label)) error('REVIEW_FIELD', `review "${sub.heading}": no ${label}`)
            }
            for (const label of ['Pros', 'Cons']) {
                const items = labelledList(sub.lines, label)
                if (!items || items.length === 0) error('REVIEW_FIELD', `review "${sub.heading}": no ${label} list`)
            }

            const inlineAsin = labelledValue(sub.lines, 'ASIN')
            if (inlineAsin && inlineAsin.toUpperCase() !== product.asin) {
                error('ASIN_MISMATCH', `review "${sub.heading}" says ASIN ${inlineAsin}; the contract says ${product.asin}`)
            }
            for (const link of markdownLinks(sub.lines)) {
                if (AFFILIATE_HOST.test(link.url) && link.url !== product.link) {
                    error('LINK_MISMATCH_ARTICLE', `review "${sub.heading}" links ${link.url}; the contract says ${product.link}`)
                }
            }
        }
        for (const product of products) {
            if (!reviewHeadings.includes(product.review_heading)) {
                error('REVIEW_MISSING', `${product.asin}: review_heading "${product.review_heading}" is not an H3 in "${reviews.heading}"`)
            }
        }
        const order = products
            .map((product) => reviewHeadings.indexOf(product.review_heading))
            .filter((index) => index >= 0)
        if (order.some((index, i) => i > 0 && index < order[i - 1])) {
            warn('PRODUCT_ORDER', 'products are not listed in the order of their reviews')
        }
    }

    const topPicks = sectionsFor('topPicks')[0]
    if (topPicks) {
        const picks = topPicks.subsections
        if (picks.length < 1 || picks.length > 10) {
            error('TOP_PICK_COUNT', `top picks has ${picks.length} cards (Sanity allows 1 to 10)`)
        }
        for (const pick of picks) {
            if (!products.some((product) => product.top_pick_heading === pick.heading)) {
                error('TOP_PICK_UNMAPPED', `top pick "${pick.heading}" has no product in the contract`)
            }
            if (!pick.lines.some((line) => line.trim() !== '')) {
                error('TOP_PICK_EMPTY', `top pick "${pick.heading}" has no description`)
            }
        }
        for (const product of products) {
            if (product.top_pick_heading && !picks.some((pick) => pick.heading === product.top_pick_heading)) {
                error('TOP_PICK_MISSING', `${product.asin}: top_pick_heading "${product.top_pick_heading}" is not an H3 in "${topPicks.heading}"`)
            }
        }
    }

    const comparison = sectionsFor('comparisonTable')[0]
    if (comparison) {
        const tables = findTables(comparison.lines)
        if (tables.length === 0) {
            error('TABLE_MISSING', `"${comparison.heading}" has no table`)
        } else {
            if (tables.length > 1) error('TABLE_EXTRA', `"${comparison.heading}" has ${tables.length} tables; the comparison block holds one`)
            const table = tables[0]
            const columns = table.header.length - 1
            if (columns < 1 || columns > 6) {
                error('TABLE_COLUMNS', `comparison table has ${columns} spec columns (Sanity allows 1 to 6)`)
            }
            if (table.rows.length < 2 || table.rows.length > 8) {
                error('TABLE_ROWS', `comparison table has ${table.rows.length} rows (Sanity allows 2 to 8)`)
            }
            for (const row of table.rows) {
                const label = row[0] ?? ''
                if (!products.some((product) => product.table_label === label)) {
                    error('TABLE_ROW_UNMAPPED', `comparison row "${label}" has no product in the contract`)
                }
                const cells = row.slice(1)
                if (cells.length !== columns || cells.some((cell) => cell === '')) {
                    error('TABLE_CELL_EMPTY', `comparison row "${label}" needs a value in each of ${columns} columns`)
                }
            }
            for (const product of products) {
                if (product.table_label && !table.rows.some((row) => row[0] === product.table_label)) {
                    error('TABLE_LABEL_MISSING', `${product.asin}: table_label "${product.table_label}" is not a row`)
                }
            }
        }
    }

    for (const section of sectionsFor('decisionTable')) {
        const table = findTables(section.lines)[0]
        if (!table) {
            error('TABLE_MISSING', `"${section.heading}" has no table`)
            continue
        }
        const columns = table.header.length - 1
        if (columns < 2 || columns > 6) error('TABLE_COLUMNS', `"${section.heading}": ${columns} columns (Sanity allows 2 to 6)`)
        if (table.rows.length < 2 || table.rows.length > 12) error('TABLE_ROWS', `"${section.heading}": ${table.rows.length} rows (Sanity allows 2 to 12)`)
        for (const row of table.rows) {
            if (!row[0] || row.slice(1).length !== columns || row.slice(1).some((cell) => cell === '')) {
                error('TABLE_CELL_EMPTY', `"${section.heading}": row "${row[0] ?? ''}" needs a label and a value in each column`)
            }
        }
    }

    for (const block of ['faqSection', 'typesSection', 'guideSection'] as const) {
        for (const section of sectionsFor(block)) {
            if (section.subsections.length === 0) error('ITEMS_MISSING', `"${section.heading}" (${block}) has no H3 items`)
            for (const sub of section.subsections) {
                if (!sub.lines.some((line) => line.trim() !== '')) error('ITEM_EMPTY', `"${section.heading}": "${sub.heading}" is empty`)
            }
        }
    }

    for (const section of sectionsFor('prose')) {
        if (findTables(section.lines).length > 0) {
            error('PROSE_TABLE', `"${section.heading}" is prose but holds a table; map it to decisionTable`)
        }
    }
    if (/<callout/i.test(input.articleText)) warn('CALLOUT', 'article.md has <callout> blocks; they import as callout groups')
    if (/!\[/.test(input.articleText)) warn('IMAGE_INLINE', 'article.md has inline images; each needs alt text and a file in the package')

    // Product records and handoff
    for (const product of products) {
        const records = input.records?.get(product.asin)
        if (!records) {
            warn('RECORD_MISSING', `${product.asin}: no product record in products/`)
            continue
        }
        for (const record of records) {
            if (record.affiliateLink && record.affiliateLink !== product.link) {
                error('LINK_MISMATCH_RECORD', `${product.asin}: ${record.file} has ${record.affiliateLink}; the contract says ${product.link}`)
            }
        }
    }

    for (const message of input.handoff?.errors ?? []) {
        warn('HANDOFF_YAML', `publisher-handoff.md YAML does not parse: ${message}`)
    }
    const fromHandoff = handoffProducts(input.handoff)
    if (fromHandoff.size > 0) {
        for (const product of products) {
            const entry = fromHandoff.get(product.asin)
            if (!entry) {
                error('HANDOFF_PRODUCT_MISSING', `${product.asin} is not in the handoff products`)
                continue
            }
            if (typeof entry.affiliate_link === 'string' && entry.affiliate_link !== product.link) {
                error('LINK_MISMATCH_HANDOFF', `${product.asin}: the handoff has ${entry.affiliate_link}; the contract says ${product.link}`)
            }
            if (typeof entry.brand === 'string' && entry.brand !== product.brand) {
                warn('BRAND_DIFFERS', `${product.asin}: the handoff brand is "${entry.brand}"; the contract says "${product.brand}"`)
            }
            if (typeof entry.title === 'string' && normalizeName(entry.title) !== normalizeName(product.title)) {
                warn('TITLE_DIFFERS', `${product.asin}: the handoff title is "${entry.title}"; the contract says "${product.title}"`)
            }
        }
        for (const asin of fromHandoff.keys()) {
            if (!asins.has(asin)) error('HANDOFF_PRODUCT_EXTRA', `handoff product ${asin} is not in the contract`)
        }
    }

    return issues
}
