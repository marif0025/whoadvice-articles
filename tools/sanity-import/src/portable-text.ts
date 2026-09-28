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
    }),
)

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
        onDegradation: ({ degradations, message }) => {
            if (degradations.some((degradation) => degradation.type !== 'decorator-dropped')) {
                throw new ConversionError(`${where}: ${message}`)
            }
            for (const degradation of degradations) notes?.push(`${where}: ${degradation.message}`)
        },
    }) as unknown as Block[]
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
