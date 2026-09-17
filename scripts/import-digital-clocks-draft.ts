/**
 * Import the approved digital-clocks Markdown package into Sanity as drafts.
 *
 * Run from the WhoAdvice blog checkout:
 *   pnpm exec tsx scripts/import-digital-clocks-draft.ts
 *   pnpm exec tsx scripts/import-digital-clocks-draft.ts --commit
 *
 * Dry-run is the default. --commit requires SANITY_API_WRITE_TOKEN.
 */

import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

import { createClient } from 'next-sanity'

type PortableSpan = {
    _key: string
    _type: 'span'
    marks: string[]
    text: string
}

type PortableBlock = {
    _key: string
    _type: 'block'
    children: PortableSpan[]
    markDefs: Record<string, unknown>[]
    style: string
    level?: number
    listItem?: 'bullet' | 'number'
}

type ParsedProduct = {
    title: string
    slug: string
    badge: string
    brand: string
    asin: string
    affiliateLink: string
    summary: string
    verdict: string
    pros: string[]
    cons: string[]
}

type ParsedTopPick = {
    badge: string
    productTitle: string
    description: string
}

type ParsedComparison = {
    columns: string[]
    rows: { productTitle: string; values: string[] }[]
}

type ParsedFaq = { question: string; answer: string }

type ParsedArticle = {
    title: string
    metadata: Record<string, string>
    introduction: string[]
    topPicks: ParsedTopPick[]
    comparison: ParsedComparison
    products: ParsedProduct[]
    sectionsBeforeProducts: { heading: string; body: string[] }[]
    sectionsAfterProducts: { heading: string; body: string[] }[]
    faqs: ParsedFaq[]
    conclusion: { heading: string; body: string[] }
}

type SanityDocument = Record<string, unknown> & {
    _id: string
    _type: string
}

const DEFAULT_ARTICLE_PATH =
    '/home/arif/code/whoadvice/articles/digital-clocks/article.md'

const EXPECTED_ASINS = [
    'B07FNC6N1L',
    'B0D9229N9B',
    'B07BFLYNNT',
    'B0F2B45PNV',
    'B07DQWT15Y',
    'B07RKTVQDR',
    'B0BFC7WQ6R',
] as const

const EXPECTED_AFFILIATE_LINKS = [
    'https://amzn.to/4riOwsT',
    'https://amzn.to/4yz8H86',
    'https://amzn.to/4y2tzVA',
    'https://amzn.to/4y24XfA',
    'https://amzn.to/4yh2Jcx',
    'https://amzn.to/4xX8vQ1',
    'https://amzn.to/4AnfGmv',
] as const

function loadEnvFile(path: string) {
    if (!existsSync(path)) return

    for (const rawLine of readFileSync(path, 'utf8').split(/\r?\n/)) {
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue
        const separator = line.indexOf('=')
        if (separator < 1) continue

        const name = line.slice(0, separator).trim()
        let value = line.slice(separator + 1).trim()
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1)
        }
        if (!(name in process.env)) process.env[name] = value
    }
}

loadEnvFile(resolve(process.cwd(), '.env'))
loadEnvFile(resolve(process.cwd(), '.env.local'))

function argValue(name: string): string | undefined {
    const direct = process.argv.find((arg) => arg.startsWith(`${name}=`))
    if (direct) return direct.slice(name.length + 1)
    const index = process.argv.indexOf(name)
    return index >= 0 ? process.argv[index + 1] : undefined
}

const commit = process.argv.includes('--commit')
const outputJson = process.argv.includes('--json')
const sourcePath = resolve(
    argValue('--article-path') ??
        process.env.WHOADVICE_ARTICLE_PATH ??
        DEFAULT_ARTICLE_PATH,
)
const requestedAuthorId =
    argValue('--author-id') ?? process.env.SANITY_AUTHOR_ID

function fail(message: string): never {
    throw new Error(message)
}

function stableKey(...parts: string[]): string {
    return createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 12)
}

function stripDraftPrefix(id: string): string {
    return id.replace(/^drafts\./, '')
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

function normalizeTitle(value: string): string {
    return value
        .toLowerCase()
        .replace(/[™®]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
}

function splitH2Sections(markdown: string): {
    preamble: string[]
    sections: { heading: string; lines: string[] }[]
} {
    const lines = markdown.split(/\r?\n/)
    const firstH2 = lines.findIndex((line) => line.startsWith('## '))
    const preamble = lines.slice(0, firstH2)
    const sections: { heading: string; lines: string[] }[] = []
    let current: { heading: string; lines: string[] } | undefined

    for (const line of lines.slice(firstH2)) {
        if (line.startsWith('## ')) {
            current = { heading: line.slice(3).trim(), lines: [] }
            sections.push(current)
        } else if (current) {
            current.lines.push(line)
        }
    }

    return { preamble, sections }
}

function nonEmptyParagraphs(lines: string[]): string[] {
    const paragraphs: string[] = []
    let current: string[] = []
    const flush = () => {
        if (current.length) paragraphs.push(current.join(' ').trim())
        current = []
    }

    for (const line of lines) {
        if (!line.trim()) {
            flush()
        } else {
            current.push(line.trim())
        }
    }
    flush()
    return paragraphs
}

function parseMetadata(preamble: string[]) {
    const titleLine = preamble.find((line) => line.startsWith('# '))
    if (!titleLine) fail('Article H1 is missing.')

    const metadata: Record<string, string> = {}
    let firstBodyLine = -1
    preamble.forEach((line, index) => {
        const match = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/)
        if (match) metadata[match[1].trim()] = match[2].trim()
        if (
            firstBodyLine < 0 &&
            index > 0 &&
            line.trim() &&
            !line.startsWith('**')
        ) {
            firstBodyLine = index
        }
    })

    return {
        title: titleLine.slice(2).trim(),
        metadata,
        introduction:
            firstBodyLine >= 0
                ? nonEmptyParagraphs(preamble.slice(firstBodyLine))
                : [],
    }
}

function parseTopPicks(lines: string[]): ParsedTopPick[] {
    const picks: ParsedTopPick[] = []
    let index = 0
    while (index < lines.length) {
        const heading = lines[index].match(/^###\s+(.+?):\s+(.+)$/)
        if (!heading) {
            index += 1
            continue
        }
        index += 1
        while (index < lines.length && !lines[index].trim()) index += 1
        const description: string[] = []
        while (index < lines.length && !lines[index].startsWith('### ')) {
            if (lines[index].trim()) description.push(lines[index].trim())
            index += 1
        }
        picks.push({
            badge: heading[1].trim(),
            productTitle: heading[2].trim(),
            description: description.join(' '),
        })
    }
    return picks
}

function parseComparison(lines: string[]): ParsedComparison {
    const table = lines.filter((line) => /^\|.+\|$/.test(line.trim()))
    if (table.length < 3) fail('Comparison table is missing or incomplete.')
    const cells = (line: string) =>
        line
            .trim()
            .slice(1, -1)
            .split('|')
            .map((cell) => cell.trim())

    const headers = cells(table[0])
    return {
        columns: headers.slice(1),
        rows: table.slice(2).map((line) => {
            const row = cells(line)
            return { productTitle: row[0], values: row.slice(1) }
        }),
    }
}

function fieldValue(lines: string[], field: string): string {
    const prefix = `**${field}:**`
    const line = lines.find((candidate) => candidate.startsWith(prefix))
    if (!line) fail(`Missing product field: ${field}`)
    return line.slice(prefix.length).trim()
}

function bulletListAfter(lines: string[], label: string): string[] {
    const start = lines.findIndex((line) => line.trim() === `**${label}:**`)
    if (start < 0) fail(`Missing product list: ${label}`)
    const items: string[] = []
    for (const line of lines.slice(start + 1)) {
        if (/^\*\*[^*]+:\*\*/.test(line.trim())) break
        const match = line.match(/^\s*-\s+(.+)$/)
        if (match) items.push(match[1].trim())
    }
    return items
}

function parseProducts(lines: string[]): ParsedProduct[] {
    const groups: { title: string; lines: string[] }[] = []
    let current: { title: string; lines: string[] } | undefined
    for (const line of lines) {
        if (line.startsWith('### ')) {
            current = { title: line.slice(4).trim(), lines: [] }
            groups.push(current)
        } else if (current) {
            current.lines.push(line)
        }
    }

    return groups.map(({ title, lines }) => {
        const asin = fieldValue(lines, 'ASIN').replace(/`/g, '')
        const affiliateRaw = fieldValue(lines, 'Affiliate link')
        const affiliateMatch = affiliateRaw.match(/\((https:\/\/amzn\.to\/[^)]+)\)/)
        if (!affiliateMatch) fail(`Invalid affiliate link for ${title}.`)
        return {
            title,
            slug: fieldValue(lines, 'Slug').replace(/`/g, ''),
            badge: fieldValue(lines, 'Editorial badge'),
            brand: fieldValue(lines, 'Brand'),
            asin,
            affiliateLink: affiliateMatch[1],
            summary: fieldValue(lines, 'Summary'),
            verdict: fieldValue(lines, 'Verdict'),
            pros: bulletListAfter(lines, 'Pros'),
            cons: bulletListAfter(lines, 'Cons'),
        }
    })
}

function parseFaqs(lines: string[]): ParsedFaq[] {
    const items: ParsedFaq[] = []
    let current: ParsedFaq | undefined
    for (const line of lines) {
        if (line.startsWith('### ')) {
            current = { question: line.slice(4).trim(), answer: '' }
            items.push(current)
        } else if (current && line.trim()) {
            current.answer = [current.answer, line.trim()].filter(Boolean).join(' ')
        }
    }
    return items
}

function parseArticle(markdown: string): ParsedArticle {
    const { preamble, sections } = splitH2Sections(markdown)
    const meta = parseMetadata(preamble)
    const byHeading = new Map(sections.map((section) => [section.heading, section]))
    const required = (heading: string) => {
        const section = byHeading.get(heading)
        if (!section) fail(`Missing required section: ${heading}`)
        return section
    }

    const productsHeading = 'Our seven digital-clock picks'
    const faqHeading = 'Frequently asked questions'
    const conclusionHeading = 'Which digital clock should you choose?'
    const productsIndex = sections.findIndex((s) => s.heading === productsHeading)
    const faqIndex = sections.findIndex((s) => s.heading === faqHeading)
    const conclusionIndex = sections.findIndex((s) => s.heading === conclusionHeading)

    return {
        ...meta,
        topPicks: parseTopPicks(required('Three leading digital clocks').lines),
        comparison: parseComparison(required('Digital clocks compared').lines),
        products: parseProducts(required(productsHeading).lines),
        sectionsBeforeProducts: sections
            .slice(2, productsIndex)
            .map((section) => ({
                heading: section.heading,
                body: section.lines,
            })),
        sectionsAfterProducts: sections
            .slice(productsIndex + 1, faqIndex)
            .map((section) => ({
                heading: section.heading,
                body: section.lines,
            })),
        faqs: parseFaqs(required(faqHeading).lines),
        conclusion: {
            heading: conclusionHeading,
            body: required(conclusionHeading).lines,
        },
    }
}

function inlineChildren(text: string, seed: string) {
    const children: PortableSpan[] = []
    const markDefs: Record<string, unknown>[] = []
    const tokenPattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g
    let cursor = 0
    let tokenIndex = 0

    for (const match of text.matchAll(tokenPattern)) {
        const start = match.index ?? 0
        if (start > cursor) {
            children.push({
                _key: stableKey(seed, 'span', String(tokenIndex++)),
                _type: 'span',
                marks: [],
                text: text.slice(cursor, start),
            })
        }

        const token = match[0]
        const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
            const markKey = stableKey(seed, 'link', String(tokenIndex))
            markDefs.push({
                _key: markKey,
                _type: 'inlineLink',
                linkType: 'url',
                url: link[2],
                is_external: /^https?:\/\//.test(link[2]),
            })
            children.push({
                _key: stableKey(seed, 'span', String(tokenIndex++)),
                _type: 'span',
                marks: [markKey],
                text: link[1],
            })
        } else {
            children.push({
                _key: stableKey(seed, 'span', String(tokenIndex++)),
                _type: 'span',
                marks: ['strong'],
                text: token.slice(2, -2),
            })
        }
        cursor = start + token.length
    }

    if (cursor < text.length || children.length === 0) {
        children.push({
            _key: stableKey(seed, 'span', String(tokenIndex)),
            _type: 'span',
            marks: [],
            text: text.slice(cursor),
        })
    }

    return { children, markDefs }
}

function portableBlock(
    text: string,
    style: string,
    seed: string,
    listItem?: 'bullet' | 'number',
): PortableBlock {
    const inline = inlineChildren(text, seed)
    return {
        _key: stableKey(seed),
        _type: 'block',
        style,
        ...inline,
        ...(listItem ? { level: 1, listItem } : {}),
    }
}

function markdownLinesToPortableText(
    lines: string[],
    seed: string,
): PortableBlock[] {
    const blocks: PortableBlock[] = []
    let paragraph: string[] = []
    let sequence = 0
    const flush = () => {
        if (!paragraph.length) return
        blocks.push(
            portableBlock(
                paragraph.join(' ').trim(),
                'normal',
                `${seed}-p-${sequence++}`,
            ),
        )
        paragraph = []
    }

    for (const rawLine of lines) {
        const line = rawLine.trim()
        if (!line) {
            flush()
            continue
        }
        const heading = line.match(/^(#{3,6})\s+(.+)$/)
        if (heading) {
            flush()
            blocks.push(
                portableBlock(
                    heading[2],
                    `h${heading[1].length}`,
                    `${seed}-h-${sequence++}`,
                ),
            )
            continue
        }
        const bullet = line.match(/^-\s+(.+)$/)
        if (bullet) {
            flush()
            blocks.push(
                portableBlock(
                    bullet[1],
                    'normal',
                    `${seed}-li-${sequence++}`,
                    'bullet',
                ),
            )
            continue
        }
        paragraph.push(line)
    }
    flush()
    return blocks
}

function sectionToPortableText(
    heading: string,
    lines: string[],
    seed: string,
): PortableBlock[] {
    return [
        portableBlock(heading, 'h2', `${seed}-heading`),
        ...markdownLinesToPortableText(lines, seed),
    ]
}

function splitH3Items(lines: string[]) {
    const items: { title: string; lines: string[] }[] = []
    let current: { title: string; lines: string[] } | undefined
    for (const line of lines) {
        if (line.startsWith('### ')) {
            current = { title: line.slice(4).trim(), lines: [] }
            items.push(current)
        } else if (current) {
            current.lines.push(line)
        }
    }
    return items
}

function validateParsedArticle(article: ParsedArticle) {
    if (article.products.length !== 7) {
        fail(`Expected 7 products, found ${article.products.length}.`)
    }
    if (article.topPicks.length !== 3) {
        fail(`Expected 3 top picks, found ${article.topPicks.length}.`)
    }
    if (article.comparison.rows.length !== 7) {
        fail(`Expected 7 comparison rows, found ${article.comparison.rows.length}.`)
    }
    if (article.faqs.length !== 6) {
        fail(`Expected 6 FAQs, found ${article.faqs.length}.`)
    }

    const asins = article.products.map((product) => product.asin)
    const links = article.products.map((product) => product.affiliateLink)
    if (JSON.stringify(asins) !== JSON.stringify(EXPECTED_ASINS)) {
        fail(`ASIN order changed: ${asins.join(', ')}`)
    }
    if (JSON.stringify(links) !== JSON.stringify(EXPECTED_AFFILIATE_LINKS)) {
        fail('Affiliate link order or values changed.')
    }

    for (const product of article.products) {
        if (product.pros.length !== 3 || product.cons.length !== 2) {
            fail(`${product.title} must have 3 pros and 2 cons.`)
        }
    }
}

function findProductByTitle(
    products: ParsedProduct[],
    title: string,
): ParsedProduct {
    const target = normalizeTitle(title)
    const targetTokens = new Set(target.split(' ').filter(Boolean))
    const exact = products.find(
        (product) => normalizeTitle(product.title) === target,
    )
    if (exact) return exact
    const partial = products.filter((product) => {
        const normalized = normalizeTitle(product.title)
        const productTokens = new Set(normalized.split(' ').filter(Boolean))
        const targetIsSubset = [...targetTokens].every((token) =>
            productTokens.has(token),
        )
        const productIsSubset = [...productTokens].every((token) =>
            targetTokens.has(token),
        )
        return (
            normalized.includes(target) ||
            target.includes(normalized) ||
            targetIsSubset ||
            productIsSubset
        )
    })
    if (partial.length === 1) return partial[0]
    const scored = products
        .map((product) => {
            const productTokens = new Set(
                normalizeTitle(product.title).split(' ').filter(Boolean),
            )
            return {
                product,
                score: [...targetTokens].filter((token) => productTokens.has(token))
                    .length,
            }
        })
        .sort((a, b) => b.score - a.score)
    if (
        scored[0]?.score >= 2 &&
        scored[0].score > (scored[1]?.score ?? 0)
    ) {
        return scored[0].product
    }
    fail(`Could not uniquely match product title: ${title}`)
}

async function main() {
    if (!existsSync(sourcePath)) fail(`Article not found: ${sourcePath}`)

    const projectId =
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID
    const dataset =
        process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET
    const apiVersion =
        process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2023-06-15'
    const token = process.env.SANITY_API_WRITE_TOKEN

    if (!projectId || !dataset) {
        fail('Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.')
    }
    if (commit && !token) {
        fail('SANITY_API_WRITE_TOKEN is required with --commit.')
    }

    const parsed = parseArticle(readFileSync(sourcePath, 'utf8'))
    validateParsedArticle(parsed)

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false,
        perspective: 'raw',
    })

    const category = await client.fetch<{ _id: string; title: string } | null>(
        `*[_type == "category" && slug.current == "home-gadgets"] | order(_updatedAt desc)[0]{_id,title}`,
    )
    if (!category) fail('Home Gadgets category was not found in Sanity.')

    let author: { _id: string; name: string } | null = null
    if (requestedAuthorId) {
        author = await client.fetch(
            `*[_type == "author" && _id in [$id, "drafts." + $id]][0]{_id,name}`,
            { id: stripDraftPrefix(requestedAuthorId) },
        )
        if (!author) fail(`Author not found: ${requestedAuthorId}`)
    } else {
        const authors = await client.fetch<{ _id: string; name: string }[]>(
            `*[_type == "author" && !(_id in path("drafts.**"))] | order(name asc){_id,name}`,
        )
        if (authors.length !== 1) {
            const choices = authors
                .map((item) => `${item._id} (${item.name})`)
                .join(', ')
            fail(
                `Choose an author with --author-id or SANITY_AUTHOR_ID. Available: ${choices || 'none'}`,
            )
        }
        author = authors[0]
    }

    const productDocuments: SanityDocument[] = []
    const productIds = new Map<string, { baseId: string; published: boolean }>()

    for (const product of parsed.products) {
        const matches = await client.fetch<SanityDocument[]>(
            `*[_type == "product" && upper(asin) == $asin] | order(_updatedAt desc){...}`,
            { asin: product.asin },
        )
        const published = matches.find((doc) => !doc._id.startsWith('drafts.'))
        const draft = matches.find((doc) => doc._id.startsWith('drafts.'))
        const existing = draft ?? published
        const baseId = existing
            ? stripDraftPrefix(existing._id)
            : `product.${slugify(product.title)}-${product.asin.toLowerCase()}`

        productIds.set(product.asin, { baseId, published: Boolean(published) })
        productDocuments.push({
            ...(published ?? {}),
            ...(draft ?? {}),
            _id: `drafts.${baseId}`,
            _type: 'product',
            title: product.title,
            slug: { _type: 'slug', current: product.slug },
            brand: product.brand,
            asin: product.asin,
            link: product.affiliateLink,
        })
    }

    const productRef = (product: ParsedProduct) => {
        const record = productIds.get(product.asin)
        if (!record) fail(`No product ID for ${product.asin}`)
        return {
            _type: 'reference',
            _ref: record.baseId,
        }
    }

    const content: Record<string, unknown>[] = []
    parsed.introduction.forEach((paragraph, index) => {
        content.push(portableBlock(paragraph, 'normal', `intro-${index}`))
    })

    content.push({
        _key: stableKey('top-picks'),
        _type: 'topPicksBlock',
        items: parsed.topPicks.map((pick, index) => {
            const product = findProductByTitle(parsed.products, pick.productTitle)
            return {
                _key: stableKey('top-pick', String(index), product.asin),
                _type: 'topPickItem',
                product: productRef(product),
                description: pick.description,
            }
        }),
    })

    content.push(portableBlock('Digital clocks compared', 'h2', 'comparison-heading'))
    content.push({
        _key: stableKey('comparison-table'),
        _type: 'comparisonTableBlock',
        comparison_table: {
            _type: 'comparisonTable',
            columns: parsed.comparison.columns,
            rows: parsed.comparison.rows.map((row, index) => {
                const product = findProductByTitle(parsed.products, row.productTitle)
                return {
                    _key: stableKey('comparison-row', String(index), product.asin),
                    _type: 'comparisonRow',
                    product: productRef(product),
                    values: row.values,
                }
            }),
        },
    })

    parsed.sectionsBeforeProducts.forEach((section, index) => {
        content.push(
            ...sectionToPortableText(
                section.heading,
                section.body,
                `before-products-${index}`,
            ),
        )
    })

    content.push(
        portableBlock('Our seven digital-clock picks', 'h2', 'products-heading'),
        {
            _key: stableKey('product-reviews'),
            _type: 'productReviewsBlock',
            show_products: true,
        },
    )

    parsed.sectionsAfterProducts.forEach((section, index) => {
        content.push(
            ...sectionToPortableText(
                section.heading,
                section.body,
                `after-products-${index}`,
            ),
        )
    })

    content.push({
        _key: stableKey('faqs'),
        _type: 'faqSection',
        title: 'Frequently Asked Questions',
        enable_schema: true,
        items: parsed.faqs.map((faq, index) => ({
            _key: stableKey('faq', String(index), faq.question),
            _type: 'faq',
            question: faq.question,
            answer: [portableBlock(faq.answer, 'normal', `faq-answer-${index}`)],
        })),
    })

    content.push(
        ...sectionToPortableText(
            parsed.conclusion.heading,
            parsed.conclusion.body,
            'conclusion',
        ),
    )

    const existingArticle = await client.fetch<{ _id: string } | null>(
        `*[_type == "article" && slug.current == "best-digital-clocks"] | order(_updatedAt desc)[0]{_id}`,
    )
    const articleBaseId = existingArticle
        ? stripDraftPrefix(existingArticle._id)
        : 'article.best-digital-clocks'

    const articleDocument: SanityDocument = {
        _id: `drafts.${articleBaseId}`,
        _type: 'article',
        title: parsed.title,
        slug: { _type: 'slug', current: 'best-digital-clocks' },
        article_format: 'product_guide',
        editorial_badge: 'Research-Based Guide • 2026',
        seo: {
            _type: 'seo',
            meta_title: parsed.metadata['SEO title'],
            meta_description: parsed.metadata['Meta description'],
            keywords: [
                parsed.metadata['Primary keyword'],
                'best digital clock for bedroom',
                'best digital clock for office',
                'best digital clock for classroom',
                'digital wall clock',
                'digital alarm clock',
            ].join(', '),
            indexable: true,
        },
        author: {
            _type: 'reference',
            _ref: stripDraftPrefix(author._id),
        },
        categories: [
            {
                _key: stableKey('category', category._id),
                _type: 'reference',
                _ref: stripDraftPrefix(category._id),
            },
        ],
        products: parsed.products.map((product, index) => ({
            _key: stableKey('article-product', String(index), product.asin),
            _type: 'articleProduct',
            product: productRef(product),
            tagline: product.badge,
            summary: product.summary,
            verdict: product.verdict,
            pros: product.pros,
            cons: product.cons,
        })),
        content,
    }

    const report = {
        mode: commit ? 'commit' : 'dry-run',
        sourcePath,
        projectId,
        dataset,
        category,
        author,
        articleId: articleDocument._id,
        products: parsed.products.map((product) => ({
            asin: product.asin,
            title: product.title,
            affiliateLink: product.affiliateLink,
            documentId: `drafts.${productIds.get(product.asin)?.baseId}`,
            existingPublishedDocument: productIds.get(product.asin)?.published,
        })),
        contentBlockCount: content.length,
    }

    if (!commit) {
        console.log(JSON.stringify(report, null, 2))
        console.log('\nDry run complete. No Sanity documents were changed.')
        console.log('Run again with --commit after reviewing this report.')
        if (outputJson) {
            console.log(JSON.stringify({ productDocuments, articleDocument }))
        }
        return
    }

    // Sanity references declared by the schema are strong references. A draft
    // article therefore cannot reference a product that exists only as a
    // draft. Publish newly created product dependency documents first. For a
    // product that already has a published base document, preserve the normal
    // editorial workflow by writing its updates to the product draft.
    const productTransaction = client.transaction()
    productDocuments.forEach((document) => {
        const asin = typeof document.asin === 'string' ? document.asin : ''
        const record = productIds.get(asin)
        if (!record) fail(`No product record for ${asin || document._id}`)

        productTransaction.createOrReplace({
            ...document,
            _id: record.published
                ? `drafts.${record.baseId}`
                : record.baseId,
        })
    })
    const productResult = await productTransaction.commit({ visibility: 'sync' })

    const articleResult = await client
        .transaction()
        .createOrReplace(articleDocument)
        .commit({ visibility: 'sync' })

    console.log(
        JSON.stringify(
            {
                ...report,
                productTransactionId: productResult.transactionId,
                articleTransactionId: articleResult.transactionId,
            },
            null,
            2,
        ),
    )
    console.log(
        '\nDraft import complete. New product dependency documents were published; the article remains an unpublished draft.',
    )
    console.log(`Open: ${process.env.APP_URL ?? 'https://whoadvice.com'}/studio/structure/article;${articleBaseId}`)
}

type AutoProduct = ParsedProduct

const EPILATOR_PRODUCT_OVERRIDES: Record<string, Pick<AutoProduct, 'slug' | 'brand' | 'asin' | 'affiliateLink'>> = {
    'braun silk pil 9 flex ses9 041': { slug: 'braun-silk-epil-9-flex-ses9-041', brand: 'Braun', asin: 'B0FNXC28MM', affiliateLink: 'https://amzn.to/4prmaeK' },
    'philips epilator series 8000 bre708 00': { slug: 'philips-epilator-series-8000-bre708-00', brand: 'Philips', asin: 'B0GNB94W8G', affiliateLink: 'https://amzn.to/4pw4HSG' },
    'braun silk pil 7 se7 041': { slug: 'braun-silk-epil-7-se7-041', brand: 'Braun', asin: 'B0CWJF37L8', affiliateLink: 'https://amzn.to/4gIcrP5' },
    'philips epilator series 9000 bre728 00': { slug: 'philips-epilator-series-9000-bre728-00', brand: 'Philips', asin: 'B0GNB4X5FV', affiliateLink: 'https://amzn.to/4fmtFPE' },
    'braun silk pil 9 ses9 441': { slug: 'braun-silk-epil-9-ses9-441', brand: 'Braun', asin: 'B0CQBY737Z', affiliateLink: 'https://amzn.to/4b3MOEK' },
    'philips epilator series 2000 bre227 00': { slug: 'philips-epilator-series-2000-bre227-00', brand: 'Philips', asin: 'B0F13G2F1S', affiliateLink: 'https://amzn.to/4fa6R6V' },
    'braun silk pil 3 3 270': { slug: 'braun-silk-epil-3-3-270', brand: 'Braun', asin: 'B06WGLSRPZ', affiliateLink: 'https://amzn.to/4fkA25V' },
    'braun facespa pro 911': { slug: 'braun-facespa-pro-911', brand: 'Braun', asin: 'B07HFHY6RH', affiliateLink: 'https://amzn.to/3Ro09kr' },
    'remington smooth silky facial epilator ep1050fcdn': { slug: 'remington-smooth-silky-facial-epilator-ep1050fcdn', brand: 'Remington', asin: 'B00935AXAU', affiliateLink: 'https://amzn.to/4wjQYB6' },
    'tweezerman smooth finish facial hair remover 5090 r': { slug: 'tweezerman-smooth-finish-facial-hair-remover-5090-r', brand: 'Tweezerman', asin: 'B00JVOU89E', affiliateLink: 'https://amzn.to/4wgwBVk' },
    'bellabe original facial hair remover': { slug: 'bellabe-original-facial-hair-remover', brand: 'Bellabe', asin: 'B001RPL902', affiliateLink: 'https://amzn.to/4w7Bujf' },
}

function valueOrEmpty(lines: string[], field: string) {
    const prefix = `**${field}:**`
    const line = lines.find((candidate) => candidate.startsWith(prefix))
    return line ? line.slice(prefix.length).trim() : ''
}

function archivedIdentity(title: string, articlePath: string) {
    const directory = resolve(articlePath, '..', '..', 'products')
    if (!existsSync(directory)) return undefined
    const targetTokens = new Set(normalizeTitle(title).split(' ').filter(Boolean))
    const candidates = readdirSync(directory)
        .filter((file) => file.endsWith('.md'))
        .map((file) => readFileSync(resolve(directory, file), 'utf8'))
        .map((record) => {
            const heading = record.match(/^#\s+(.+)$/m)?.[1] ?? ''
            const score = normalizeTitle(heading).split(' ').filter((token) => targetTokens.has(token)).length
            return { record, score }
        })
        .sort((a, b) => b.score - a.score)
    if (!candidates[0] || candidates[0].score < 2 || candidates[0].score === candidates[1]?.score) return undefined
    const record = candidates[0].record
    const asin = record.match(/asin:\s*([A-Z0-9]{10})/i)?.[1]?.toUpperCase() ?? record.match(/amazon\.com\/dp\/([A-Z0-9]{10})/i)?.[1]?.toUpperCase()
    const affiliateLink = record.match(/affiliate_link:\s*(https:\/\/amzn\.to\/\S+)/i)?.[1]
    if (!asin || !affiliateLink) return undefined
    return { asin, affiliateLink, slug: slugify(title), brand: title.split(/\s+/)[0] }
}

function autoProducts(lines: string[], articlePath: string): AutoProduct[] {
    const groups: { title: string; lines: string[] }[] = []
    let current: { title: string; lines: string[] } | undefined
    for (const line of lines) {
        const heading = line.match(/^#{2,3}\s+(.+)$/)
        if (heading) {
            current = { title: heading[1].replace(/^\d+\.\s*/, '').trim(), lines: [] }
            groups.push(current)
        } else if (current) current.lines.push(line)
    }
    return groups.filter(({ lines }) => valueOrEmpty(lines, 'Summary')).map(({ title, lines }) => {
        const override = EPILATOR_PRODUCT_OVERRIDES[normalizeTitle(title)]
        const archive = archivedIdentity(title, articlePath)
        const asin = valueOrEmpty(lines, 'ASIN').replace(/`/g, '') || override?.asin || archive?.asin
        const affiliateRaw = valueOrEmpty(lines, 'Affiliate link')
        const affiliateLink = affiliateRaw.match(/\((https:\/\/amzn\.to\/[^)]+)\)/)?.[1] || override?.affiliateLink || archive?.affiliateLink
        const slug = valueOrEmpty(lines, 'Slug').replace(/`/g, '') || override?.slug || archive?.slug
        const brand = valueOrEmpty(lines, 'Brand') || override?.brand || archive?.brand
        if (!asin || !affiliateLink || !slug || !brand) fail(`Product identity is incomplete for ${title}.`)
        const list = (label: string) => lines.some((line) => line.trim() === `**${label}:**`) ? bulletListAfter(lines, label) : []
        return { title, slug, brand, asin, affiliateLink, badge: valueOrEmpty(lines, 'Editorial badge'), summary: valueOrEmpty(lines, 'Summary'), verdict: valueOrEmpty(lines, 'Verdict'), pros: list('Pros'), cons: list('Cons') }
    })
}

function inferCategory(source: string, path: string) {
    const match = source.match(/^\*\*Slug:\*\*\s*`?\/?([^/]+)\//m)
    if (match) return match[1]
    if (path.includes('/epilators/')) return 'skin-care'
    if (path.includes('/hedge-trimmers/')) return 'garden-tools'
    return 'home-gadgets'
}

async function mainAuto() {
    if (!existsSync(sourcePath)) fail(`Article not found: ${sourcePath}`)
    const source = readFileSync(sourcePath, 'utf8')
    const { preamble, sections } = splitH2Sections(source)
    const meta = parseMetadata(preamble)
    const slugMatch = source.match(/^\*\*Slug:\*\*\s*`?\/?[^/]+\/([^/]+)\/?`?/m)
    const slug = slugMatch?.[1] ?? slugify(sourcePath.split('/').slice(-2, -1)[0])
    const sectionProducts = (section: { heading: string; lines: string[] }) =>
        autoProducts([`## ${section.heading}`, ...section.lines], sourcePath)
    const productSections = sections.filter((section) => sectionProducts(section).length > 0)
    const productSection = productSections[0]
    const products = productSections.flatMap(sectionProducts)
    const topSection = sections.find((section) => /top|leading|three best/i.test(section.heading) && parseTopPicks(section.lines).length > 0)
    const topPicks = topSection ? parseTopPicks(topSection.lines) : []
    const comparisonSection = sections.find((section) => /^\|.+\|$/m.test(section.lines.join('\n')))
    const comparison = comparisonSection ? parseComparison(comparisonSection.lines) : undefined
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET
    const token = process.env.SANITY_API_WRITE_TOKEN
    if (!projectId || !dataset) fail('Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.')
    if (commit && !token) fail('SANITY_API_WRITE_TOKEN is required with --commit.')
    const client = createClient({ projectId, dataset, apiVersion: '2025-02-19', token, useCdn: false, perspective: 'raw' })
    const categorySlug = inferCategory(source, sourcePath)
    const category = await client.fetch<{ _id: string } | null>(`*[_type == "category" && slug.current == $slug][0]{_id}`, { slug: categorySlug })
    if (!category) fail(`Category not found: ${categorySlug}`)
    const authors = await client.fetch<{ _id: string; name: string }[]>(`*[_type == "author" && !(_id in path("drafts.**"))] | order(name asc){_id,name}`)
    const existing = await client.fetch<{ _id: string }[]>(`*[_type == "article" && slug.current == $slug]{_id}`, { slug })
    const published = existing.find((item) => !item._id.startsWith('drafts.'))
    const baseId = (published ?? existing[0])?._id.replace(/^drafts\./, '') ?? `article.${slug}`
    const inheritedAuthor = published
        ? await client.fetch<{ _id: string } | null>(`*[_id == $id][0].author->{_id}`, { id: published._id })
        : null
    const categoryAuthor = !inheritedAuthor
        ? await client.fetch<{ _id: string } | null>(`*[_type == "article" && references($categoryId) && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0].author->{_id}`, { categoryId: category._id })
        : null
    const author = inheritedAuthor ?? categoryAuthor ?? (authors.length === 1 ? authors[0] : null)
    if (!author) fail(`No unambiguous author for ${slug}; set the article author before importing or configure a single default author.`)
    const productIds = new Map<string, { id: string; published: boolean }>()
    const productDocuments: SanityDocument[] = []
    for (const product of products) {
        const matches = await client.fetch<SanityDocument[]>(`*[_type == "product" && upper(asin) == $asin] | order(_updatedAt desc){...}`, { asin: product.asin })
        const publishedProduct = matches.find((item) => !item._id.startsWith('drafts.'))
        const existingProduct = matches.find((item) => item._id.startsWith('drafts.')) ?? publishedProduct
        const id = existingProduct?._id.replace(/^drafts\./, '') ?? `product.${slugify(product.title)}-${product.asin.toLowerCase()}`
        productIds.set(product.asin, { id, published: Boolean(publishedProduct) })
        productDocuments.push({ ...(publishedProduct ?? {}), ...(existingProduct ?? {}), _id: `drafts.${id}`, _type: 'product', title: product.title, slug: { _type: 'slug', current: product.slug }, brand: product.brand, asin: product.asin, link: product.affiliateLink })
    }
    const ref = (product: AutoProduct) => ({ _type: 'reference', _ref: productIds.get(product.asin)?.id })
    const content: Record<string, unknown>[] = meta.introduction.map((paragraph, index) => portableBlock(paragraph, 'normal', `intro-${index}`))
    const appendSection = (section: { heading: string; lines: string[] }, index: number) => content.push(...sectionToPortableText(section.heading, section.lines, `section-${index}`))
    sections.forEach((section, index) => {
        if (section === topSection && topPicks.length && products.length) {
            content.push({ _key: stableKey('top-picks'), _type: 'topPicksBlock', items: topPicks.map((pick, i) => { const product = findProductByTitle(products, pick.productTitle); return { _key: stableKey('top-pick', String(i), product.asin), _type: 'topPickItem', product: ref(product), description: pick.description } }) })
        } else if (section === comparisonSection && comparison && products.length) {
            content.push(portableBlock(section.heading, 'h2', 'comparison-heading'), { _key: stableKey('comparison-table'), _type: 'comparisonTableBlock', comparison_table: { _type: 'comparisonTable', columns: comparison.columns, rows: comparison.rows.map((row, i) => { const product = findProductByTitle(products, row.productTitle); return { _key: stableKey('comparison-row', String(i), product.asin), _type: 'comparisonRow', product: ref(product), values: row.values } }) } })
        } else if (productSections.includes(section) && products.length) {
            if (section === productSection) content.push(portableBlock('Product reviews', 'h2', 'products-heading'), { _key: stableKey('product-reviews'), _type: 'productReviewsBlock', show_products: true })
        } else if (slug === 'best-epilators' && section.heading === 'Types of epilators') {
            const items = splitH3Items(section.lines)
            content.push(
                portableBlock(section.heading, 'h2', 'types-heading'),
                ...markdownLinesToPortableText(section.lines.slice(0, section.lines.findIndex((line) => line.startsWith('### '))), 'types-intro'),
                {
                    _key: stableKey('types-section'),
                    _type: 'typesSection',
                    items: items.map((item, itemIndex) => ({
                        _key: stableKey('type-item', String(itemIndex), item.title),
                        _type: 'typeItem',
                        title: item.title,
                        content: markdownLinesToPortableText(item.lines, `type-item-${itemIndex}`),
                    })),
                },
            )
        } else if (slug === 'best-epilators' && section.heading === 'How to choose the best epilator') {
            const items = splitH3Items(section.lines)
            content.push(
                portableBlock(section.heading, 'h2', 'guide-heading'),
                {
                    _key: stableKey('guide-section'),
                    _type: 'guideSection',
                    items: items.map((item, itemIndex) => ({
                        _key: stableKey('guide-item', String(itemIndex), item.title),
                        _type: 'guideItem',
                        title: item.title,
                        content: markdownLinesToPortableText(item.lines, `guide-item-${itemIndex}`),
                    })),
                },
            )
        } else if (slug === 'best-epilators' && section.heading === 'Frequently asked questions about epilators') {
            const items = splitH3Items(section.lines)
            content.push({
                _key: stableKey('faq-section'),
                _type: 'faqSection',
                title: section.heading,
                enable_schema: true,
                items: items.map((item, itemIndex) => ({
                    _key: stableKey('faq-item', String(itemIndex), item.title),
                    _type: 'faq',
                    question: item.title,
                    answer: markdownLinesToPortableText(item.lines, `faq-item-${itemIndex}`),
                })),
            })
        } else appendSection(section, index)
    })
    const document: SanityDocument = { _id: `drafts.${baseId}`, _type: 'article', title: meta.title, slug: { _type: 'slug', current: slug }, article_format: products.length ? 'product_guide' : 'editorial', editorial_badge: 'Research-Based Guide • 2026', seo: { _type: 'seo', meta_title: meta.metadata['SEO title'] ?? meta.title, meta_description: meta.metadata['Meta description'] ?? '', keywords: meta.metadata['Primary keyword'] ?? '', indexable: true }, author: { _type: 'reference', _ref: author._id }, categories: [{ _key: stableKey('category', category._id), _type: 'reference', _ref: category._id }], ...(products.length ? { products: products.map((product, index) => ({ _key: stableKey('article-product', String(index), product.asin), _type: 'articleProduct', product: ref(product), tagline: product.badge, summary: product.summary, verdict: product.verdict, pros: product.pros, cons: product.cons })) } : {}), content }
    const report = { mode: commit ? 'commit' : 'dry-run', sourcePath, articleId: document._id, slug, products: products.map((item) => ({ title: item.title, asin: item.asin })), topPickCount: topPicks.length, comparisonRows: comparison?.rows.length ?? 0, typesCards: (content.find((item) => item._type === 'typesSection')?.items as unknown[] | undefined)?.length ?? 0, guideCards: (content.find((item) => item._type === 'guideSection')?.items as unknown[] | undefined)?.length ?? 0, faqItems: (content.find((item) => item._type === 'faqSection')?.items as unknown[] | undefined)?.length ?? 0, contentBlocks: content.length }
    if (!commit) { console.log(JSON.stringify(report, null, 2)); return }
    const transaction = client.transaction()
    productDocuments.forEach((product) => { const asin = String(product.asin); const record = productIds.get(asin); if (!record) fail(`Missing product reference for ${asin}`); transaction.createOrReplace({ ...product, _id: record.published ? `drafts.${record.id}` : record.id }) })
    if (productDocuments.length) await transaction.commit({ visibility: 'sync' })
    await client.createOrReplace(document)
    console.log(JSON.stringify(report, null, 2))
}

;(process.argv.includes('--auto') ? mainAuto() : main()).catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})
