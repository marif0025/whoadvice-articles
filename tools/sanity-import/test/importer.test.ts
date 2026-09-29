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
import { ConversionError, promoteCallouts, sequentialKeys, toPortableText } from '../src/portable-text.ts'
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

test('a bold-colon blockquote promotes to a calloutGroup card', () => {
    const md = '> **Stop before you begin:** Do not proceed if unclear. Stop for a cut or bleeding.'
    const blocks = promoteCallouts(toPortableText(md, sequentialKeys(), 'test'), sequentialKeys())
    assert.deepEqual(blocks, [
        {
            _type: 'calloutGroup',
            _key: 'k0000',
            callouts: [
                {
                    _type: 'callout',
                    _key: 'k0001',
                    title: 'Stop before you begin',
                    items: ['Do not proceed if unclear.', 'Stop for a cut or bleeding.'],
                },
            ],
        },
    ])
})

test('a blockquote with no bold colon lead-in stays a plain blockquote', () => {
    const md = '> **The three-yes check**\n>\n> 1. First check\n> 2. Second check'
    const before = toPortableText(md, sequentialKeys(), 'test')
    const after = promoteCallouts(before, sequentialKeys())
    assert.deepEqual(after, before)
    assert.ok(after.every((block) => block._type !== 'calloutGroup'))
})

const withIntroImage = (text: string, line = "![Alt text](images/a.png)") => {
    const at = text.indexOf("\n## ")
    return `${text.slice(0, at)}\n\n${line}\n${text.slice(at)}`
}

test("an image line in the intro becomes an iimage block between the text blocks", () => {
    const text = withIntroImage(articleText)
    const result = buildArticle(parseArticle(text), contract(), ref, (file) => `asset-${file}`)
    const index = result.content.findIndex((block) => block._type === "iimage")
    assert.ok(index > 0, "no iimage block")
    assert.deepEqual(result.content[index], {
        _type: "iimage",
        _key: result.content[index]._key,
        alt: "Alt text",
        asset: { _type: "reference", _ref: "asset-images/a.png" },
    })
    assert.equal(result.content[index + 1]?.style, "h2")
    assert.ok(!JSON.stringify(result.content).includes("!["), "image markdown leaked into text")
})

test("an image inside a card stops the build", () => {
    // One card per H3 (the underarm steps): the importer's own check.
    const underarm = join(ARTICLES, "epilators/how-to-epilate-underarms")
    const stepsText = readFileSync(join(underarm, "article.md"), "utf8")
    const stepsContract = Contract.parse({ ...parse(readFileSync(join(underarm, "cms.yaml"), "utf8")), needs_review: [] })
    const broken = stepsText.replace("### 3. Inspect and clean the epilating head\n", "$&\n![Alt](images/a.png)\n")
    assert.notEqual(broken, stepsText)
    assert.throws(() => buildArticle(parseArticle(broken), stepsContract, ref, (file) => file), /only stand in the intro or a prose section/)

    // Labelled-paragraph cards join a card's lines, so the converter stops it.
    const labelled = articleText.replace(/^(\*\*Wide heads\.\*\* They cover.*)$/m, "$1\n![Alt](images/a.png)")
    assert.notEqual(labelled, articleText)
    assert.throws(() => buildArticle(parseArticle(labelled), contract(), ref, (file) => file), /no `image` object/)
})

test("an image with no alt text stops the build", () => {
    const text = withIntroImage(articleText, "![](images/a.png)")
    assert.throws(() => buildArticle(parseArticle(text), contract(), ref, (file) => file), /no alt text/)
})

test("the asset ID is sha1, size and extension, as Sanity names an upload", async () => {
    const { createHash } = await import("node:crypto")
    const { assetIdFor } = await import("../src/images.ts")
    const png = Buffer.alloc(33)
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(png, 0)
    png.writeUInt32BE(13, 8)
    png.write("IHDR", 12, "ascii")
    png.writeUInt32BE(1600, 16)
    png.writeUInt32BE(900, 20)
    const sha1 = createHash("sha1").update(png).digest("hex")
    assert.equal(assetIdFor(png, "a.png"), `image-${sha1}-1600x900-png`)
    assert.throws(() => assetIdFor(Buffer.from("not an image"), "a.txt"), /not a PNG, WebP or JPEG/)
})

async function imageApply(uploadedId: string) {
    const { mkdtempSync, mkdirSync, writeFileSync } = await import("node:fs")
    const { tmpdir } = await import("node:os")
    const dir = mkdtempSync(join(tmpdir(), "import-"))
    mkdirSync(join(dir, "import"))
    mkdirSync(join(dir, "images"))
    writeFileSync(join(dir, "images/a.png"), "bytes")
    const plan = { ...(await planFor(datasetFor())), images: [{ file: "images/a.png", assetId: "image-planned" }] }
    const order: string[] = []
    // Sanity unchanged since the plan: every revision the plan read is still there.
    const revs = [plan.article, ...plan.products].flatMap(({ id, basedOn }) => [
        ...(basedOn.published ? [{ _id: id, _rev: basedOn.published }] : []),
        ...(basedOn.draft ? [{ _id: `drafts.${id}`, _rev: basedOn.draft }] : []),
    ])
    const { client } = fakeClient({}, revs)
    Object.assign(client, {
        action: async () => {
            order.push("action")
            return { transactionId: "tx" }
        },
        assets: {
            upload: async (_type: string, _bytes: Buffer, options: { filename: string }) => {
                order.push(`upload ${options.filename}`)
                return { _id: uploadedId }
            },
        },
    })
    const run = applyPlan({ client, plan, packageDir: dir, hash: "h" })
    return { run, order }
}

test("apply uploads a missing image before the article actions", async () => {
    const { run, order } = await imageApply("image-planned")
    await run
    assert.deepEqual(order, ["upload a.png", "action"])
})

test("apply refuses when an image uploads under another ID than planned", async () => {
    const { run, order } = await imageApply("image-something-else")
    await assert.rejects(run, /uploaded as image-something-else, not image-planned/)
    assert.deepEqual(order, ["upload a.png"])
})

test("validate reports an image with no alt, a wrong type or a missing file", async () => {
    const { validate } = await import("../src/validate.ts")
    const text = withIntroImage(withIntroImage(articleText, "![](images/a.png)"), "![Alt](images/b.gif)")
    const issues = validate({ contract: { ...parse(contractText), needs_review: [] }, articleText: text, fileExists: () => false })
    const codes = issues.filter((issue) => issue.level === "error").map((issue) => issue.code)
    for (const code of ["IMAGE_ALT", "IMAGE_TYPE", "IMAGE_MISSING"]) assert.ok(codes.includes(code), code)
})

test("\"must be published\" on an image asset is expected only when apply uploads it", async () => {
    const plan = await planFor(datasetFor())
    const doc = plan.documents.find((item) => item._id === "drafts.article-1") as { content: Record<string, unknown>[] }
    doc.content.push(
        { _type: "iimage", _key: "img-planned", asset: { _type: "reference", _ref: "image-planned" } },
        { _type: "iimage", _key: "img-unknown", asset: { _type: "reference", _ref: "image-unknown" } },
    )
    plan.images = [{ file: "images/a.png", assetId: "image-planned" }]
    const report = (key: string) =>
        JSON.stringify({
            documentId: "drafts.article-1",
            markers: [{ level: "error", message: "Referenced document must be published", path: ["content", { _key: key }, "asset"] }],
        })
    const planned = classifyValidation(report("img-planned"), plan)
    assert.deepEqual([planned.expected, planned.errors.length], [1, 0])
    const unknown = classifyValidation(report("img-unknown"), plan)
    assert.deepEqual([unknown.expected, unknown.errors.length], [0, 1])
})

test("an image title becomes its caption", () => {
    const text = withIntroImage(articleText, "![Alt text](images/a.png \"What the figure shows.\")")
    const result = buildArticle(parseArticle(text), contract(), ref, (file) => `asset-${file}`)
    const image = result.content.find((block) => block._type === "iimage")
    assert.equal(image?.caption, "What the figure shows.")
    assert.equal(image?.asset && (image.asset as { _ref: string })._ref, "asset-images/a.png")
})

test("a [!CAUTION] alert becomes a caution callout; an alert without a bold title stops the build", () => {
    const blocks = toPortableText("> [!CAUTION]\n> **Stop before you begin:** Do not proceed. Stop if it bleeds.", sequentialKeys(), "test")
    assert.deepEqual(blocks, [
        {
            _type: "calloutGroup",
            _key: "k0003",
            callouts: [
                {
                    _type: "callout",
                    _key: "k0004",
                    title: "Stop before you begin",
                    items: ["Do not proceed.", "Stop if it bleeds."],
                    tone: "caution",
                },
            ],
        },
    ])
    assert.throws(() => toPortableText("> [!CAUTION]\n> No bold title here.", sequentialKeys(), "test"), ConversionError)
})
