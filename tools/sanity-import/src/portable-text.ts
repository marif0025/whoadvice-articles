/**
 * Markdown to Portable Text with Sanity's converter, limited to what the
 * article schema allows (sanity/schemas/fragments/article-block-content.ts in
 * the blog): normal, h2-h4 and blockquote; bullet and number lists; strong
 * and em; inlineLink annotations. Anything the converter cannot carry over
 * faithfully stops the build instead of being dropped.
 */

import { markdownToPortableText } from '@portabletext/markdown'
import { compileSchema, defineSchema } from '@portabletext/schema'

const SITE = /^https?:\/\/(www\.)?whoadvice\.com(?=\/|$)/

const schema = compileSchema(
    defineSchema({
        styles: [{ name: 'normal' }, { name: 'h2' }, { name: 'h3' }, { name: 'h4' }, { name: 'blockquote' }],
        decorators: [{ name: 'strong' }, { name: 'em' }],
        annotations: [
            {
                name: 'inlineLink',
                fields: [
                    { name: 'linkType', type: 'string' },
                    { name: 'url', type: 'string' },
                    { name: 'is_external', type: 'boolean' },
                ],
            },
        ],
        lists: [{ name: 'bullet' }, { name: 'number' }],
        // A GitHub alert (`> [!CAUTION]`) lands here as a callout group.
        blockObjects: [{ name: 'calloutGroup', fields: [{ name: 'callouts', type: 'array' }] }],
    }),
)

/** GitHub alert type to the site's callout tone (sanity/schemas/objects/callout.ts). */
const ALERT_TONES: Record<string, string> = {
    caution: 'caution',
    warning: 'caution',
    important: 'primary',
    tip: 'primary',
    note: 'neutral',
}

export type KeyGenerator = () => string

/** Keys that repeat on every run for the same content: k0000, k0001, ... */
export function sequentialKeys(prefix = 'k'): KeyGenerator {
    let next = 0
    return () => `${prefix}${String(next++).padStart(4, '0')}`
}

export type Block = Record<string, unknown> & { _type: string; _key: string }

export class ConversionError extends Error {}

/**
 * Links to whoadvice.com become site-relative paths. Only other hosts open
 * in a new tab.
 */
export function linkFor(href: string): { url: string; is_external: boolean } {
    if (SITE.test(href)) return { url: href.replace(SITE, '') || '/', is_external: false }
    return { url: href, is_external: /^https?:\/\//.test(href) }
}

/**
 * A dropped decorator (inline code, strikethrough) keeps its text and is
 * reported in `notes`. Every other loss throws.
 */
export function toPortableText(markdown: string, keys: KeyGenerator, where: string, notes?: string[]): Block[] {
    if (markdown.trim() === '') return []
    return markdownToPortableText(markdown, {
        schema,
        keyGenerator: keys,
        marks: {
            link: ({ context, value }) => ({
                _type: 'inlineLink',
                _key: context.keyGenerator(),
                linkType: 'url',
                ...linkFor(value.href),
            }),
        },
        types: {
            // `> [!CAUTION]` then `> **Title:** Sentence. Sentence.` — one
            // paragraph with a bold-colon title, like a promoted blockquote.
            // Any other shape returns nothing and the conversion fails loudly.
            callout: ({ context, value }) => {
                const tone = ALERT_TONES[value.tone.toLowerCase()]
                if (!tone || value.content.length !== 1) return undefined
                const group = parseCallout(
                    { ...(value.content[0] as Block), style: 'blockquote' },
                    context.keyGenerator,
                )
                if (!group) return undefined
                const [callout] = group.callouts as Record<string, unknown>[]
                return { ...group, callouts: [{ ...callout, tone }] } as never
            },
        },
        onDegradation: ({ degradations, message }) => {
            if (degradations.some((degradation) => degradation.type !== 'decorator-dropped')) {
                throw new ConversionError(`${where}: ${message}`)
            }
            for (const degradation of degradations) notes?.push(`${where}: ${degradation.message}`)
        },
    }) as unknown as Block[]
}

/**
 * A blockquote written as `> **Title:** sentence one. Sentence two.` upgrades
 * to a calloutGroup card (sanity/schemas/blocks/callout-group.ts) instead of
 * the plain italic blockquote, which reads flat next to the site's other
 * card components. Only a blockquote whose first span is bold and ends in a
 * colon qualifies; every other blockquote (a numbered checklist, a quote
 * with no bold lead-in) is left untouched. The callout schema's `items` are
 * plain strings, so any inline link or bold text inside the blockquote's
 * body is flattened to plain text — write callouts as short whole sentences,
 * not as a place to carry a link.
 */
export function promoteCallouts(blocks: Block[], keys: KeyGenerator): Block[] {
    return blocks.map((block) => parseCallout(block, keys) ?? block)
}

function parseCallout(block: Block, keys: KeyGenerator): Block | undefined {
    if (block._type !== 'block' || block.style !== 'blockquote') return undefined
    const children = (block.children as { text?: string; marks?: string[] }[] | undefined) ?? []
    const first = children[0]
    if (!first?.marks?.includes('strong') || !/:\s*$/.test(first.text ?? '')) return undefined

    const title = (first.text ?? '').replace(/:\s*$/, '').trim()
    const rest = children
        .slice(1)
        .map((child) => child.text ?? '')
        .join('')
        .trim()
    if (!title || !rest) return undefined

    const items = rest
        .split(/(?<=[.!?])\s+(?=[A-Z])/)
        .map((sentence) => sentence.trim())
        .filter(Boolean)
    if (items.length === 0) return undefined

    return {
        _type: 'calloutGroup',
        _key: keys(),
        callouts: [{ _type: 'callout', _key: keys(), title, items }],
    }
}

/** Text only, for plain string fields such as summaries and pros. */
export function toPlainText(markdown: string, where: string, notes?: string[]): string {
    const blocks = toPortableText(markdown, sequentialKeys('p'), where, notes)
    return blocks
        .map((block) =>
            Array.isArray(block.children)
                ? (block.children as { text?: string }[]).map((child) => child.text ?? '').join('')
                : '',
        )
        .join('\n\n')
        .trim()
}
