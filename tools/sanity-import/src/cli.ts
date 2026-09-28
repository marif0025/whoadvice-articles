/**
 * Usage, from tools/sanity-import:
 *   node src/cli.ts draft    <package-dir>   writes <package-dir>/cms.draft.yaml
 *   node src/cli.ts validate <package-dir>   checks <package-dir>/cms.yaml
 *
 * Neither command reads or writes Sanity.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

import { parse, stringify } from 'yaml'

import { draftContract } from './draft.ts'
import { loadHandoff, loadProductRecords } from './sources.ts'
import { validate } from './validate.ts'

function fail(message: string): never {
    console.error(message)
    process.exit(2)
}

const [command, target] = process.argv.slice(2)
if (!command || !target || !['draft', 'validate'].includes(command)) {
    fail('usage: node src/cli.ts <draft|validate> <package-dir>')
}

const packageDir = resolve(target)
const articleFile = join(packageDir, 'article.md')
if (!existsSync(articleFile)) fail(`no article.md in ${packageDir}`)

const articleText = readFileSync(articleFile, 'utf8')
const handoff = loadHandoff(packageDir)
const records = loadProductRecords(packageDir)

if (command === 'draft') {
    const contract = draftContract({ articleText, handoff, records })
    const out = join(packageDir, 'cms.draft.yaml')
    const header = [
        '# Drafted by tools/sanity-import from article.md, publisher-handoff.md and products/.',
        '# Check every value and clear needs_review, then save it as cms.yaml.',
        '',
    ].join('\n')
    writeFileSync(out, header + stringify(contract, { lineWidth: 0 }))

    const needs = contract.needs_review as string[]
    console.log(`wrote ${out}`)
    console.log(`${(contract.products as unknown[]).length} products, ${(contract.sections as unknown[]).length} sections, ${needs.length} items to review:`)
    for (const item of needs) console.log(`  - ${item}`)
    process.exit(0)
}

const contractFile = join(packageDir, 'cms.yaml')
if (!existsSync(contractFile)) fail(`no cms.yaml in ${packageDir}; run draft first`)

let contract: unknown
try {
    contract = parse(readFileSync(contractFile, 'utf8'))
} catch (error) {
    fail(`cms.yaml does not parse: ${(error as Error).message}`)
}

const issues = validate({
    contract,
    articleText,
    handoff,
    records,
    fileExists: (relativePath) => existsSync(join(packageDir, relativePath)),
})

const errors = issues.filter((issue) => issue.level === 'error')
const warnings = issues.filter((issue) => issue.level === 'warning')
for (const issue of [...errors, ...warnings]) {
    console.log(`${issue.level === 'error' ? 'ERROR  ' : 'warning'} ${issue.code.padEnd(24)} ${issue.message}`)
}
console.log(`${errors.length} errors, ${warnings.length} warnings: ${errors.length === 0 ? 'PASS' : 'FAIL'}`)
process.exit(errors.length === 0 ? 0 : 1)
