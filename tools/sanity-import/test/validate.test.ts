/**
 * Each test breaks one thing in a real package and expects the matching
 * error. The packages are read, never written.
 */

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

import { parse } from 'yaml'

import { draftContract } from '../src/draft.ts'
import { loadHandoff, loadProductRecords } from '../src/sources.ts'
import { validate, type ValidateInput } from '../src/validate.ts'

const ARTICLES = join(import.meta.dirname, '../../../articles')
const EPILATORS = join(ARTICLES, 'epilators/best-epilators-at-home-hair-removal')
const CLOCKS = join(ARTICLES, 'digital-clocks')

type Input = ValidateInput & { contract: Record<string, any> }

/** A package's real inputs, with needs_review cleared. */
function load(dir: string): Input {
    const contract = parse(readFileSync(join(dir, 'cms.yaml'), 'utf8'))
    return {
        contract: { ...contract, needs_review: [] },
        articleText: readFileSync(join(dir, 'article.md'), 'utf8'),
        handoff: loadHandoff(dir),
        records: loadProductRecords(dir),
    }
}

function errorCodes(input: ValidateInput): string[] {
    return validate(input)
        .filter((issue) => issue.level === 'error')
        .map((issue) => issue.code)
}

test('both contracts pass once needs_review is cleared', () => {
    assert.deepEqual(errorCodes(load(EPILATORS)), [])
    assert.deepEqual(errorCodes(load(CLOCKS)), [])
})

test('open needs_review items fail validation', () => {
    const input = load(EPILATORS)
    input.contract.needs_review = ['author: confirm']
    assert.ok(errorCodes(input).includes('NEEDS_REVIEW'))
})

test('a malformed ASIN fails the schema', () => {
    const input = load(EPILATORS)
    input.contract.products[0].asin = 'B0FNXC28M'
    assert.ok(errorCodes(input).includes('SCHEMA'))
})

test('a colon in a head field fails', () => {
    const input = load(EPILATORS)
    input.contract.seo.meta_title = 'Best Epilator in 2026: 7 Picks'
    assert.ok(errorCodes(input).includes('HEAD_COLON'))
})

test('approval needs an approver and a date', () => {
    const input = load(EPILATORS)
    input.contract.status = 'approved_for_publication'
    assert.ok(errorCodes(input).includes('APPROVAL'))
})

test('a review with no product in the contract fails', () => {
    const input = load(EPILATORS)
    input.contract.products.splice(3, 1)
    assert.ok(errorCodes(input).includes('REVIEW_UNMAPPED'))
})

test('a link that disagrees with the product record fails', () => {
    const input = load(EPILATORS)
    input.handoff = undefined
    input.contract.products[0].link = 'https://amzn.to/wrong'
    assert.ok(errorCodes(input).includes('LINK_MISMATCH_RECORD'))
})

test('a link that disagrees with the review CTA fails', () => {
    const input = load(EPILATORS)
    input.articleText = input.articleText.replace('https://amzn.to/4prmaeK', 'https://amzn.to/wrong')
    assert.ok(errorCodes(input).includes('LINK_MISMATCH_ARTICLE'))
})

test('a review without a verdict fails', () => {
    const input = load(EPILATORS)
    input.articleText = input.articleText.replace(/^\*\*Verdict:\*\*.*$/m, '')
    assert.ok(errorCodes(input).includes('REVIEW_FIELD'))
})

test('a comparison table over 8 rows fails', () => {
    const input = load(EPILATORS)
    const row = input.articleText.split('\n').find((line) => line.startsWith('| 7. Braun'))
    assert.ok(row)
    input.articleText = input.articleText.replace(row, `${row}\n${row}\n${row}`)
    assert.ok(errorCodes(input).includes('TABLE_ROWS'))
})

test('a comparison row with no product fails', () => {
    const input = load(CLOCKS)
    delete input.contract.products[0].table_label
    assert.ok(errorCodes(input).includes('TABLE_ROW_UNMAPPED'))
})

test('an H2 the contract does not list fails', () => {
    const input = load(EPILATORS)
    input.articleText = input.articleText.replace(
        '## Which epilator is best?',
        '## A new section\n\nNew text.\n\n## Which epilator is best?',
    )
    assert.ok(errorCodes(input).includes('SECTION_UNCOVERED'))
})

test('a listed H2 missing from the article fails', () => {
    const input = load(EPILATORS)
    input.contract.sections[3].heading = 'How we ranked epilators'
    assert.ok(errorCodes(input).includes('SECTION_MISSING'))
})

test('a table inside a prose section fails', () => {
    const input = load(EPILATORS)
    input.articleText = input.articleText.replace(
        'This is a research-based ranking;',
        '| Factor | Weight |\n|---|---|\n| Fit | 25% |\n| Control | 20% |\n\nThis is a research-based ranking;',
    )
    assert.ok(errorCodes(input).includes('PROSE_TABLE'))
})

test('draft takes epilator identities from the handoff', () => {
    const input = load(EPILATORS)
    const draft = draftContract(input) as { products: { asin: string; link: string }[] }
    assert.deepEqual(
        draft.products.map((product) => product.asin),
        ['B0FNXC28MM', 'B0GNB94W8G', 'B0CWJF37L8', 'B0GNB4X5FV', 'B0CQBY737Z', 'B0F13G2F1S', 'B06WGLSRPZ'],
    )
    assert.equal(draft.products[0].link, 'https://amzn.to/4prmaeK')
})

test('draft does not guess short comparison labels', () => {
    const input = load(CLOCKS)
    const draft = draftContract(input) as { needs_review: string[] }
    const rows = draft.needs_review.filter((item) => item.startsWith('comparison row'))
    assert.equal(rows.length, 4)
})
