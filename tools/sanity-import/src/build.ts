/**
 * Turns a parsed article and its contract into the article's `content` and
 * `products` arrays. Pure: product references come in through `refFor`, and
 * nothing here reads or writes Sanity.
 *
 * Headings: the site draws no heading for top picks, the comparison table,
 * the product reviews or the types and guide cards, so each of those gets its
 * H2 as a normal heading block. The FAQ block draws its own H2 from `title`.
 * Types and guide blocks carry only `items`: the schema defines no `title`
 * or `content` on them, so the section's H2 and intro stay normal blocks.
 */

import {
    findTables,
    labelledList,
    labelledValue,
    splitLabelledParagraphs,
    type Article,
    type Section,
} from './article.ts'
import type { Contract } from './contract.ts'
import { IMAGE_LINE } from './images.ts'
import { promoteCallouts, sequentialKeys, toPlainText, toPortableText, type Block } from './portable-text.ts'

export type Reference = {
    _type: 'reference'
    _ref: string
    _weak?: true
    _strengthenOnPublish?: { type: string; weak: false; template: { id: string; params: Record<string, never> } }
}

export type BuildResult = {
    content: Block[]
    products: Block[]
    /** Reported, not fatal: dropped formatting and review lines the importer does not carry. */
    notes: string[]
}

export class BuildError extends Error {}

const REVIEW_FIELD = /^\*\*(Editorial badge|Summary|Verdict|Slug|Brand|ASIN|Affiliate link|Title):?\*\*/
const LIST_LABEL = /^\*\*(Pros|Cons):?\*\*:?\s*$/
const CTA_ONLY = /^\[[^\]]+\]\([^)\s]+\)\.?$/

function splitAtTable(lines: string[]) {
    const isRow = (index: number) => lines[index]?.trim().startsWith('|') ?? false
    const isSeparator = (index: number) => /^\|?\s*:?-{3,}/.test(lines[index]?.trim() ?? '')
    const start = lines.findIndex((_, index) => isRow(index) && isSeparator(index + 1))
    if (start < 0) return undefined
    let end = start + 2
    while (end < lines.length && isRow(end)) end++
    return {
        before: lines.slice(0, start),
        table: findTables(lines.slice(start, end))[0],
        after: lines.slice(end),
    }
}

export function buildArticle(
    article: Article,
    contract: Contract,
    refFor: (asin: string) => Reference,
    /** Asset ID for an image file in the package (images.ts assetIdFor). */
    imageFor?: (file: string) => string,
): BuildResult {
    const keys = sequentialKeys()
    const notes: string[] = []
    const content: Block[] = []
    const products: Block[] = []

    const text = (lines: string[], where: string) =>
        promoteCallouts(toPortableText(lines.join('\n'), keys, where, notes), keys)
    // An image line is only allowed where the article content array can hold
    // an iimage: the intro and prose sections, never inside a card, FAQ or table.
    const md = (lines: string[], where: string, images = false) => {
        const blocks: Block[] = []
        let run: string[] = []
        for (const line of lines) {
            const match = line.trim().match(IMAGE_LINE)
            if (!match) {
                run.push(line)
                continue
            }
            if (!images) throw new BuildError(`${where}: an image can only stand in the intro or a prose section`)
            if (!imageFor) throw new BuildError(`${where}: an image needs its file read, and none was given`)
            if (!match[1].trim()) throw new BuildError(`${where}: image ${match[2]} has no alt text`)
            blocks.push(...text(run, where))
            run = []
            blocks.push({
                _type: 'iimage',
                _key: keys(),
                alt: match[1].trim(),
                ...(match[3]?.trim() ? { caption: match[3].trim() } : {}),
                asset: { _type: 'reference', _ref: imageFor(match[2]) },
            })
        }
        blocks.push(...text(run, where))
        return blocks
    }
    const plain = (text: string, where: string) => toPlainText(text, where, notes)
    const heading = (text: string) => md([`## ${text}`], text)
    const mapFor = (text: string) =>
        contract.sections.find((section) => section.heading === text) ??
        contract.sections.find((section) => section.heading === '*')

    const tableParts = (section: Section) => {
        const parts = splitAtTable(section.lines)
        if (!parts?.table) throw new BuildError(`"${section.heading}" has no table`)
        return parts
    }

    content.push(...md(article.intro, 'intro', true))

    for (const section of article.sections) {
        const map = mapFor(section.heading)
        if (!map) throw new BuildError(`"${section.heading}" is not mapped in cms.yaml`)
        const where = section.heading

        switch (map.block) {
            case 'prose': {
                content.push(...heading(section.heading), ...md(section.lines, where, true))
                break
            }

            case 'topPicks': {
                content.push(...heading(section.heading), ...md(section.intro, where))
                content.push({
                    _type: 'topPicksBlock',
                    _key: keys(),
                    items: section.subsections.map((pick) => {
                        const product = contract.products.find((item) => item.top_pick_heading === pick.heading)
                        if (!product) throw new BuildError(`top pick "${pick.heading}" has no product`)
                        return {
                            _type: 'topPickItem',
                            _key: keys(),
                            product: refFor(product.asin),
                            description: plain(pick.lines.join('\n'), `${where} > ${pick.heading}`),
                        }
                    }),
                })
                break
            }

            case 'comparisonTable': {
                const { before, table, after } = tableParts(section)
                content.push(...heading(section.heading), ...md(before, where))
                content.push({
                    _type: 'comparisonTableBlock',
                    _key: keys(),
                    comparison_table: {
                        _type: 'comparisonTable',
                        columns: table.header.slice(1).map((cell) => plain(cell, `${where} header`)),
                        rows: table.rows.map((row) => {
                            const product = contract.products.find((item) => item.table_label === row[0])
                            if (!product) throw new BuildError(`comparison row "${row[0]}" has no product`)
                            return {
                                _type: 'comparisonRow',
                                _key: keys(),
                                product: refFor(product.asin),
                                values: row.slice(1).map((cell) => plain(cell, `${where} > ${row[0]}`)),
                            }
                        }),
                    },
                })
                content.push(...md(after, where))
                break
            }

            case 'productReviews': {
                content.push(...heading(section.heading), ...md(section.intro, where))
                content.push({ _type: 'productReviewsBlock', _key: keys(), show_products: true })

                for (const review of section.subsections) {
                    const product = contract.products.find((item) => item.review_heading === review.heading)
                    if (!product) throw new BuildError(`review "${review.heading}" has no product`)
                    const at = `review "${review.heading}"`
                    const pros = labelledList(review.lines, 'Pros') ?? []
                    const cons = labelledList(review.lines, 'Cons') ?? []
                    const listed = new Set([...pros, ...cons])

                    for (const line of review.lines) {
                        const trimmed = line.trim()
                        const item = trimmed.match(/^[-*]\s+(.+)$/)?.[1]
                        const consumed =
                            trimmed === '' ||
                            REVIEW_FIELD.test(trimmed) ||
                            LIST_LABEL.test(trimmed) ||
                            CTA_ONLY.test(trimmed) ||
                            (item !== undefined && listed.has(item.trim()))
                        if (!consumed) notes.push(`${at}: not imported: "${trimmed.slice(0, 90)}"`)
                    }

                    const badge = labelledValue(review.lines, 'Editorial badge')
                    products.push({
                        _type: 'articleProduct',
                        _key: keys(),
                        product: refFor(product.asin),
                        ...(badge ? { tagline: plain(badge, `${at} badge`) } : {}),
                        summary: plain(labelledValue(review.lines, 'Summary') ?? '', `${at} summary`),
                        verdict: plain(labelledValue(review.lines, 'Verdict') ?? '', `${at} verdict`),
                        pros: pros.map((text) => plain(text, `${at} pros`)),
                        cons: cons.map((text) => plain(text, `${at} cons`)),
                    })
                }
                break
            }

            case 'typesSection':
            case 'guideSection': {
                const itemType = map.block === 'typesSection' ? 'typeItem' : 'guideItem'
                // typeItem has no tip field (src/types/types.ts); only guideItem does.
                const tipFor = (lines: string[]): { tip?: string; lines: string[] } => {
                    if (itemType !== 'guideItem') return { lines }
                    const tip = labelledValue(lines, 'Tip')
                    if (tip === undefined) return { lines }
                    const withoutTip = lines.filter((line) => !/^\*\*Tip:?\*\*:?/.test(line.trim()))
                    return { tip, lines: withoutTip }
                }
                content.push(...heading(section.heading), ...md(section.intro, where))

                if (map.cards === 'labelled_paragraphs') {
                    // Each H3 is a group heading; each labelled paragraph is a card.
                    for (const sub of section.subsections) {
                        const at = `${where} > ${sub.heading}`
                        const split = splitLabelledParagraphs(sub.lines)
                        if (split.errors.length > 0) throw new BuildError(`${at}: ${split.errors.join('; ')}`)
                        if (split.cards.length === 0) throw new BuildError(`${at}: no paragraph opens with a bold label`)
                        content.push(...md([`### ${sub.heading}`], at), ...md(split.before, at))
                        content.push({
                            _type: map.block,
                            _key: keys(),
                            items: split.cards.map((card) => {
                                const { tip, lines } = tipFor(card.lines)
                                return {
                                    _type: itemType,
                                    _key: keys(),
                                    title: card.label,
                                    content: md(lines, `${at} > ${card.label}`),
                                    ...(tip ? { tip: plain(tip, `${at} > ${card.label} tip`) } : {}),
                                }
                            }),
                        })
                        content.push(...md(split.after, at))
                    }
                    break
                }

                content.push({
                    _type: map.block,
                    _key: keys(),
                    items: section.subsections.map((sub) => {
                        const { tip, lines } = tipFor(sub.lines)
                        return {
                            _type: itemType,
                            _key: keys(),
                            title: sub.heading,
                            content: md(lines, `${where} > ${sub.heading}`),
                            ...(tip ? { tip: plain(tip, `${where} > ${sub.heading} tip`) } : {}),
                        }
                    }),
                })
                break
            }

            case 'faqSection': {
                if (section.intro.some((line) => line.trim() !== '')) {
                    throw new BuildError(`"${section.heading}" has text before its first question; the FAQ block cannot hold it`)
                }
                content.push({
                    _type: 'faqSection',
                    _key: keys(),
                    title: section.heading,
                    enable_schema: map.faq_schema ?? false,
                    items: section.subsections.map((sub) => ({
                        _type: 'faq',
                        _key: keys(),
                        question: sub.heading,
                        answer: md(sub.lines, `${where} > ${sub.heading}`),
                    })),
                })
                break
            }

            case 'decisionTable': {
                // The table's own title would render above the intro text, so
                // the H2 stays a normal heading block and the table has no title.
                const { before, table, after } = tableParts(section)
                content.push(...heading(section.heading), ...md(before, where))
                content.push({
                    _type: 'decisionComparisonTableBlock',
                    _key: keys(),
                    table: {
                        _type: 'decisionComparisonTable',
                        label_column_title: plain(table.header[0] ?? '', `${where} header`),
                        columns: table.header.slice(1).map((cell) => plain(cell, `${where} header`)),
                        rows: table.rows.map((row) => ({
                            _type: 'decisionComparisonRow',
                            _key: keys(),
                            label: plain(row[0] ?? '', `${where} row`),
                            values: row.slice(1).map((cell) => plain(cell, `${where} > ${row[0]}`)),
                        })),
                    },
                })
                content.push(...md(after, where))
                break
            }
        }
    }

    return { content, products, notes }
}
