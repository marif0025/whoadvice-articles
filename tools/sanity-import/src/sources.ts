/**
 * Loads the other files in an article package: the fenced YAML in
 * `publisher-handoff.md` and the per-product records in `products/*.md`.
 * Parse failures are reported, never thrown: several handoffs hold YAML that
 * does not parse, and the validator has to say so.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { parse } from 'yaml'

export type Handoff = {
    file: string
    data: Record<string, unknown>
    errors: string[]
}

export type ProductRecord = {
    file: string
    asin: string
    affiliateLink?: string
    displayName?: string
    brand?: string
}

export function yamlBlocks(text: string): { blocks: unknown[]; errors: string[] } {
    const blocks: unknown[] = []
    const errors: string[] = []
    for (const match of text.matchAll(/```ya?ml\r?\n([\s\S]*?)```/g)) {
        try {
            blocks.push(parse(match[1]))
        } catch (error) {
            errors.push((error as Error).message.split('\n')[0])
        }
    }
    return { blocks, errors }
}

export function loadHandoff(packageDir: string): Handoff | undefined {
    const file = join(packageDir, 'publisher-handoff.md')
    if (!existsSync(file)) return undefined

    const { blocks, errors } = yamlBlocks(readFileSync(file, 'utf8'))
    const data: Record<string, unknown> = {}
    for (const block of blocks) {
        if (block && typeof block === 'object' && !Array.isArray(block)) {
            Object.assign(data, block)
        }
    }
    return { file, data, errors }
}

/** Handoff `products:` entries, when present, keyed by upper-case ASIN. */
export function handoffProducts(handoff: Handoff | undefined): Map<string, Record<string, unknown>> {
    const byAsin = new Map<string, Record<string, unknown>>()
    const products = handoff?.data.products
    if (!Array.isArray(products)) return byAsin
    for (const entry of products) {
        if (entry && typeof entry === 'object' && typeof (entry as { asin?: unknown }).asin === 'string') {
            byAsin.set(String((entry as { asin: string }).asin).toUpperCase(), entry as Record<string, unknown>)
        }
    }
    return byAsin
}

/**
 * Product records live in `products/` inside the package or beside it (the
 * cluster folder). Every YAML block carrying an `asin` is a record.
 */
export function loadProductRecords(packageDir: string): Map<string, ProductRecord[]> {
    const byAsin = new Map<string, ProductRecord[]>()
    const dirs = [join(packageDir, 'products'), join(dirname(packageDir), 'products')]

    for (const dir of dirs) {
        if (!existsSync(dir)) continue
        for (const name of readdirSync(dir).filter((file) => file.endsWith('.md')).sort()) {
            const file = join(dir, name)
            const { blocks } = yamlBlocks(readFileSync(file, 'utf8'))
            for (const block of blocks) {
                if (!block || typeof block !== 'object') continue
                const record = block as Record<string, unknown>
                if (typeof record.asin !== 'string') continue
                const asin = record.asin.toUpperCase()
                const entry: ProductRecord = {
                    file,
                    asin,
                    affiliateLink: typeof record.affiliate_link === 'string' ? record.affiliate_link : undefined,
                    displayName: typeof record.display_name === 'string' ? record.display_name : undefined,
                    brand: typeof record.brand === 'string' ? record.brand : undefined,
                }
                byAsin.set(asin, [...(byAsin.get(asin) ?? []), entry])
            }
        }
    }
    return byAsin
}
