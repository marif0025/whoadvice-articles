/**
 * Importer checks, without Sanity: a fake client returns crafted data, and
 * each test breaks one thing and expects the importer to stop or report it.
 */

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

import type { SanityClient } from '@sanity/client'
import { parse } from 'yaml'

import { applyPlan } from '../src/apply.ts'
import { findLinkHolds, parseArticle, splitLabelledParagraphs } from '../src/article.ts'
import { buildArticle, BuildError } from '../src/build.ts'
import { Contract } from '../src/contract.ts'
import { classifyValidation, makePlan, sourceHash, type Plan } from '../src/plan.ts'
import { ConversionError } from '../src/portable-text.ts'
import { resolve, type Resolved } from '../src/resolve.ts'

const ARTICLES = join(import.meta.dirname, '../../../articles')
const EPILATORS = join(ARTICLES, 'epilators/best-epilators-at-home-hair-removal')

const contractText = readFileSync(join(EPILATORS, 'cms.yaml'), 'utf8')
const articleText = readFileSync(join(EPILATORS, 'article.md'), 'utf8')
const contract = () => Contract.parse(parse(contractText))
const ref = (asin: string) => ({ _type: 'reference' as const, _ref: `id-${asin}` })

let counter = 0
const newId = () => `new-${counter++}`

/** A client whose fetch returns `data` and whose action records calls. */
function fakeClient(data: unknown, revs?: { _id: string; _rev: string }[]) {
    const calls: unknown[] = []
    const client = {
        fetch: async (query: string) => (query.includes('_rev}') && revs ? revs : data),
        action: async (actions: unknown) => {
            calls.push(actions)
            return { transactionId: 'tx' }
        },
        getDocument: async () => undefined,
    } as unknown as SanityClient
    return { client, calls }
}

/** Sanity data in which the pillar resolves cleanly, as in the dev dataset. */
function datasetFor(overrides: Record<string, unknown> = {}) {
    const c = contract()
    return {
        category: [{ _id: 'cat' }],
        author: [{ _id: 'auth' }],
        articles: [{ _id: 'article-1', _rev: 'r1', _type: 'article', title: 'Old' }],
        posts: [],
        byAsin: [],
        legacy: c.products
            .filter((product) => product.legacy_product && product.legacy_product !== 'none')
            .map((product) => ({ _id: product.legacy_product, _rev: 'r', _type: 'product', title: product.title, link: 'https://amzn.to/old' })),
        noAsin: [],
        slugs: [],
        ...overrides,
    }
}

test('the pillar builds with unique keys and nothing dropped', () => {
    const result = buildArticle(parseArticle(articleText), contract(), ref)
    const keys: string[] = []
    JSON.stringify(result, (key, value) => {
        if (key === '_key') keys.push(value)
        return value
    })
    assert.equal(new Set(keys).size, keys.length)
    assert.equal(result.products.length, 7)
    assert.deepEqual(result.notes, [])
})

test('a heading the schema cannot hold stops the build', () => {
    const broken = articleText.replace('## What to expect from epilation\n', '## What to expect from epilation\n\n##### Too deep\n')
    assert.throws(() => buildArticle(parseArticle(broken), contract(), ref), ConversionError)
})

test('text before the first FAQ question stops the build', () => {
    const broken = articleText.replace(
        '## Frequently asked questions about epilators\n',
        '## Frequently asked questions about epilators\n\nAn intro the FAQ block cannot hold.\n',
    )
    assert.throws(() => buildArticle(parseArticle(broken), contract(), ref), BuildError)
})

test('an unexpected line in a review is reported, not silently dropped', () => {
    const anchor = '**Verdict:** Choose it when knees, ankles, and other curves decide'
    const broken = articleText.replace(anchor, `A stray paragraph.\n\n${anchor}`)
    assert.notEqual(broken, articleText, 'the fixture anchor is no longer in article.md')
    const result = buildArticle(parseArticle(broken), contract(), ref)
    assert.ok(result.notes.some((note) => note.includes('A stray paragraph')))
})

test('two products with one ASIN stop the run', async () => {
    const data = datasetFor({
        byAsin: [
            { _id: 'p1', _rev: 'r', _type: 'product', asin: 'B0GNB94W8G' },
            { _id: 'p2', _rev: 'r', _type: 'product', asin: 'B0GNB94W8G' },
        ],
    })
    const resolved = await resolve(fakeClient(data).client, contract(), newId)
    assert.ok(resolved.errors.some((error) => error.startsWith('B0GNB94W8G: 2 products')))
})

test('an undecided legacy match stops the run', async () => {
    const data = datasetFor({ noAsin: [{ _id: 'legacy-9000', title: 'Philips Epilator Series 9000 BRE728/00' }] })
    const resolved = await resolve(fakeClient(data).client, contract(), newId)
    assert.ok(resolved.errors.some((error) => error.includes('B0GNB4X5FV') && error.includes('legacy_product')))
})

test('legacy_product none creates a new product despite a match', async () => {
    const data = datasetFor({ noAsin: [{ _id: 'legacy-7', title: 'Braun Silk-épil 7 SE7-041' }] })
    const resolved = await resolve(fakeClient(data).client, contract(), newId)
    assert.deepEqual(resolved.errors, [])
    assert.equal(resolved.products.find((product) => product.asin === 'B0CWJF37L8')?.mode, 'new')
})

test('a dotted article ID stops the run', async () => {
    const data = datasetFor({ articles: [{ _id: 'article.best-epilators', _rev: 'r', _type: 'article' }] })
    const resolved = await resolve(fakeClient(data).client, contract(), newId)
    assert.ok(resolved.errors.some((error) => error.includes('dotted ID')))
})

test('a slug on two articles stops the run', async () => {
    const data = datasetFor({
        articles: [
            { _id: 'a1', _rev: 'r', _type: 'article' },
            { _id: 'a2', _rev: 'r', _type: 'article' },
        ],
    })
    const resolved = await resolve(fakeClient(data).client, contract(), newId)
    assert.ok(resolved.errors.some((error) => error.includes('2 articles')))
})

async function planFor(data: Record<string, unknown>, change?: (c: ReturnType<typeof contract>) => void): Promise<Plan> {
    const c = contract()
    change?.(c)
    const resolved: Resolved = await resolve(fakeClient(data).client, c, newId)
    assert.deepEqual(resolved.errors, [])
    return makePlan({ contract: c, article: parseArticle(articleText), resolved, dataset: 'dev', packagePath: 'x', hash: 'h' })
}

test('an existing product only ever gets its link changed, never its title', async () => {
    const plan = await planFor(
        datasetFor({ byAsin: [{ _id: 'p8000', _rev: 'r', _type: 'product', asin: 'B0GNB94W8G', title: 'Edited title', link: 'https://amzn.to/old', brand: 'Philips' }] }),
    )
    const product = plan.products.find((item) => item.asin === 'B0GNB94W8G')
    assert.deepEqual(product?.set, { link: 'https://amzn.to/4pw4HSG' })
})

test('a new article needs a published date', async () => {
    await assert.rejects(
        planFor(datasetFor({ articles: [] }), (c) => {
            c.dates.published = 'keep'
        }),
        /no article with this slug exists/,
    )
})

test('apply refuses a plan when the package changed since', async () => {
    const plan = await planFor(datasetFor())
    const { client, calls } = fakeClient({})
    await assert.rejects(applyPlan({ client, plan, packageDir: '/nonexistent', hash: 'different' }), /changed since this plan/)
    assert.equal(calls.length, 0)
})

test('apply refuses a plan when Sanity changed since', async () => {
    const plan = await planFor(datasetFor())
    const { client, calls } = fakeClient({}, [{ _id: 'article-1', _rev: 'edited-in-studio' }])
    await assert.rejects(applyPlan({ client, plan, packageDir: '/nonexistent', hash: 'h' }), /changed since the plan was made/)
    assert.equal(calls.length, 0)
})

test('only "must be published" on a weak reference to a new product is expected', async () => {
    const plan = await planFor(datasetFor())
    const newProduct = plan.products.find((product) => product.mode === 'new')!
    const legacyProduct = plan.products.find((product) => product.mode === 'legacy')!
    const doc = plan.documents.find((item) => item._id === 'drafts.article-1') as { products: { _key: string; product: { _ref: string } }[] }
    const keyFor = (id: string) => doc.products.find((row) => row.product._ref === id)!._key
    const report = (id: string, message: string) =>
        JSON.stringify({
            documentId: 'drafts.article-1',
            markers: [{ level: 'error', message, path: ['products', { _key: keyFor(id) }, 'product'] }],
        })

    const expected = classifyValidation(report(newProduct.id, 'Referenced document must be published'), plan)
    assert.deepEqual([expected.expected, expected.errors.length], [1, 0])

    const strong = classifyValidation(report(legacyProduct.id, 'Referenced document must be published'), plan)
    assert.deepEqual([strong.expected, strong.errors.length], [0, 1])

    const other = classifyValidation(report(newProduct.id, 'Required'), plan)
    assert.deepEqual([other.expected, other.errors.length], [0, 1])
})

test('"must be published" on an existing draft-only product is an error', async () => {
    // publish-products never publishes a product the import did not change,
    // so this reference would block the article until someone publishes it.
    const plan = await planFor(
        datasetFor({ byAsin: [{ _id: 'drafts.p8000', _rev: 'r', _type: 'product', asin: 'B0GNB94W8G', link: 'https://amzn.to/4pw4HSG', brand: 'Philips' }] }),
    )
    const doc = plan.documents.find((item) => item._id === 'drafts.article-1') as { products: { _key: string; product: { _ref: string; _weak?: boolean } }[] }
    const row = doc.products.find((item) => item.product._ref === 'p8000')!
    assert.equal(row.product._weak, true)
    const result = classifyValidation(
        JSON.stringify({
            documentId: 'drafts.article-1',
            markers: [{ level: 'error', message: 'Referenced document must be published', path: ['products', { _key: row._key }, 'product'] }],
        }),
        plan,
    )
    assert.deepEqual([result.expected, result.errors.length], [0, 1])
})

test('"must be published" on a draft-only product an earlier run created is expected', async () => {
    const data = datasetFor({
        byAsin: [{ _id: 'drafts.p8000', _rev: 'r', _type: 'product', asin: 'B0GNB94W8G', link: 'https://amzn.to/4pw4HSG', brand: 'Philips' }],
    })
    const c = contract()
    const resolved = await resolve(fakeClient(data).client, c, newId)
    const plan = makePlan({
        contract: c,
        article: parseArticle(articleText),
        resolved,
        dataset: 'dev',
        packagePath: 'x',
        hash: 'h',
        createdIds: new Set(['p8000']),
    })
    const doc = plan.documents.find((item) => item._id === 'drafts.article-1') as { products: { _key: string; product: { _ref: string } }[] }
    const row = doc.products.find((item) => item.product._ref === 'p8000')!
    const result = classifyValidation(
        JSON.stringify({
            documentId: 'drafts.article-1',
            markers: [{ level: 'error', message: 'Referenced document must be published', path: ['products', { _key: row._key }, 'product'] }],
        }),
        plan,
    )
    assert.deepEqual([result.expected, result.errors.length], [1, 0])
})

test('labelled paragraphs become one card per type under each group heading', () => {
    const result = buildArticle(parseArticle(articleText), contract(), ref)
    const groups = result.content.filter((block) => block._type === 'typesSection') as unknown as { items: { title: string }[] }[]
    assert.deepEqual(
        groups.map((group) => group.items.map((item) => item.title)),
        [
            ['Tweezer-style epilators', 'Spring epilators'],
            ['Cordless wet/dry epilators', 'Corded dry epilators', 'Replaceable-battery epilators', 'Manual epilators'],
            ['Facial epilators', 'Body epilators', 'Bikini and precision formats'],
            ['Fixed heads', 'Pivoting heads', 'Fully flexible heads', 'Wide heads', 'Precision heads and caps'],
        ],
    )
    const h3 = result.content
        .filter((block) => block._type === 'block' && block.style === 'h3')
        .map((block) => (block.children as { text: string }[]).map((child) => child.text).join(''))
    assert.ok(h3.includes('Types by mechanism') && h3.includes('Types by head design'))
})

test('two bold labels in one card paragraph stop the build and fail validation', async () => {
    const broken = articleText.replace('**Pivoting heads.** They add controlled movement', '**Pivoting heads.** They add **controlled** movement')
    assert.notEqual(broken, articleText)
    assert.throws(() => buildArticle(parseArticle(broken), contract(), ref), BuildError)
    const { validate } = await import('../src/validate.ts')
    const issues = validate({ contract: { ...parse(contractText), needs_review: [] }, articleText: broken })
    assert.ok(issues.some((issue) => issue.code === 'CARD_PARAGRAPH'))
})

test('plain text between cards stops the build', () => {
    const broken = articleText.replace('**Wide heads.** They cover', 'A stray note.\n\n**Wide heads.** They cover')
    assert.notEqual(broken, articleText)
    assert.throws(() => buildArticle(parseArticle(broken), contract(), ref), BuildError)
})

test('a card repeats its title only when the title is the sentence subject', () => {
    const split = splitLabelledParagraphs([
        '**Spring epilators.** A bent coil traps hair.',
        '',
        '**Tweezer-style epilators** use rotating plates.',
    ])
    assert.deepEqual(
        split.cards.map((card) => [card.label, card.lines[0]]),
        [
            ['Spring epilators', 'A bent coil traps hair.'],
            ['Tweezer-style epilators', 'Tweezer-style epilators use rotating plates.'],
        ],
    )
})

test('the source hash covers both files', () => {
    assert.notEqual(sourceHash('a', 'b'), sourceHash('a', 'c'))
    assert.notEqual(sourceHash('a', 'b'), sourceHash('x', 'b'))
})

test('held internal links are found with their line, other comments are not', () => {
    const text = [
        '# Title',
        'Read our underarm epilation steps<!-- INTERNAL-LINK HOLD: /skin-care/how-to-epilate-underarms/ --> first.',
        '<!-- CMS IMAGE: hero -->',
        'Two <!-- INTERNAL-LINK HOLD: /a/ --> on <!--INTERNAL-LINK HOLD: /b/--> one line.',
    ].join('\n')
    assert.deepEqual(findLinkHolds(text), [
        { url: '/skin-care/how-to-epilate-underarms/', line: 2 },
        { url: '/a/', line: 4 },
        { url: '/b/', line: 4 },
    ])
})
