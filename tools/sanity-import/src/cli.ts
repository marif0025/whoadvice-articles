/**
 * From tools/sanity-import, with Node 24:
 *
 *   node src/cli.ts draft    <package>                  writes <package>/cms.draft.yaml
 *   node src/cli.ts validate <package>                  checks <package>/cms.yaml
 *   node src/cli.ts plan     <package> --dataset <name> reads Sanity, writes import/plan-<dataset>.*
 *   node src/cli.ts apply    <package> --dataset <name> sends the plan, reads it back
 *   node src/cli.ts publish-products <package> --dataset <name> --confirm products
 *
 * Options: --env <file> (default ~/personal/blog/.env), --blog <dir> (for the
 * Studio schema check), --replace-draft, --skip-studio-check.
 * Writing to production also needs status approved_for_publication in
 * cms.yaml and --confirm <slug>. Nothing here publishes an article.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, resolve as resolvePath } from 'node:path'

import { uuid } from '@sanity/uuid'
import { parse, stringify } from 'yaml'

import { applyPlan, publishProducts, readRecord } from './apply.ts'
import { findLinkHolds, parseArticle } from './article.ts'
import { assetIdFor, findImages } from './images.ts'
import { connect, DEFAULT_BLOG_DIR, DEFAULT_ENV_FILE } from './config.ts'
import { Contract } from './contract.ts'
import { draftContract } from './draft.ts'
import { checkWithStudio, makePlan, sourceHash, writePlan, type Plan } from './plan.ts'
import { resolve } from './resolve.ts'
import { loadHandoff, loadProductRecords } from './sources.ts'
import { validate } from './validate.ts'

const VAULT = resolvePath(import.meta.dirname, '../../..')
const COMMANDS = ['draft', 'validate', 'plan', 'apply', 'publish-products']

function fail(message: string): never {
    console.error(`ERROR ${message}`)
    process.exit(1)
}

// Refusals (stale plans, ambiguous data, conversion losses) print as one line, not a stack.
process.on('uncaughtException', (error) => fail(error.message))
process.on('unhandledRejection', (error) => fail(error instanceof Error ? error.message : String(error)))

const args = process.argv.slice(2)
const [command, target] = args
const flags = new Map<string, string | true>()
for (let i = 2; i < args.length; i++) {
    if (!args[i].startsWith('--')) fail(`unexpected argument "${args[i]}"`)
    const next = args[i + 1]
    if (next !== undefined && !next.startsWith('--')) {
        flags.set(args[i].slice(2), next)
        i++
    } else {
        flags.set(args[i].slice(2), true)
    }
}
const flag = (name: string) => {
    const value = flags.get(name)
    return typeof value === 'string' ? value : undefined
}

if (!command || !target || !COMMANDS.includes(command)) {
    fail(`usage: node src/cli.ts <${COMMANDS.join('|')}> <package-dir> [options]`)
}

const packageDir = resolvePath(target)
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

// Every other command starts from a contract that validates.
const contractFile = join(packageDir, 'cms.yaml')
if (!existsSync(contractFile)) fail(`no cms.yaml in ${packageDir}; run draft first`)
const contractText = readFileSync(contractFile, 'utf8')
let raw: unknown
try {
    raw = parse(contractText)
} catch (error) {
    fail(`cms.yaml does not parse: ${(error as Error).message}`)
}

const issues = validate({
    contract: raw,
    articleText,
    handoff,
    records,
    fileExists: (path) => existsSync(join(packageDir, path)),
})
const errors = issues.filter((issue) => issue.level === 'error')
const warnings = issues.filter((issue) => issue.level === 'warning')

if (command === 'validate') {
    for (const issue of [...errors, ...warnings]) {
        console.log(`${issue.level === 'error' ? 'ERROR  ' : 'warning'} ${issue.code.padEnd(24)} ${issue.message}`)
    }
    console.log(`${errors.length} errors, ${warnings.length} warnings: ${errors.length === 0 ? 'PASS' : 'FAIL'}`)
    process.exit(errors.length === 0 ? 0 : 1)
}

if (errors.length > 0) {
    for (const issue of errors) console.log(`ERROR   ${issue.code.padEnd(24)} ${issue.message}`)
    fail('cms.yaml does not validate; fix it before planning or applying')
}
const contract = Contract.parse(raw)

const dataset = flag('dataset')
if (!dataset) fail('--dataset is required (dev for rehearsals)')
if (dataset === 'production') {
    if (contract.status !== 'approved_for_publication') {
        fail(`status is ${contract.status}; production needs approved_for_publication in cms.yaml`)
    }
    if (command !== 'plan' && flag('confirm') !== contract.slug && command !== 'publish-products') {
        fail(`writing to production needs --confirm ${contract.slug}`)
    }
}
const { client } = connect(dataset, flag('env') ?? DEFAULT_ENV_FILE)
const hash = sourceHash(contractText, articleText)

if (command === 'plan') {
    const resolved = await resolve(client, contract, uuid)
    for (const warning of resolved.warnings) console.log(`warning ${warning}`)
    if (resolved.errors.length > 0) {
        for (const error of resolved.errors) console.log(`ERROR   ${error}`)
        fail(`${resolved.errors.length} problem(s) in ${dataset}; nothing was planned`)
    }

    const draft = resolved.article.draft
    if (draft) {
        const own = readRecord(packageDir)[dataset]?.article.draftRev === draft._rev
        if (!own && !flags.has('replace-draft')) {
            fail(
                `${draft._id} exists and was not left by this importer, or was edited since. ` +
                    'Publish or discard it in Studio, or pass --replace-draft to overwrite its importer-owned fields.',
            )
        }
    }

    const createdIds = new Set(
        (readRecord(packageDir)[dataset]?.products ?? []).filter((item) => item.created).map((item) => item.id),
    )
    const plan = makePlan({
        contract,
        article: parseArticle(articleText),
        resolved,
        dataset,
        packagePath: relative(VAULT, packageDir),
        hash,
        createdIds,
        images: new Map(
            findImages(articleText).map(({ file }) => [file, assetIdFor(readFileSync(join(packageDir, file)), file)]),
        ),
    })
    // Comments never reach Sanity, so a held link would otherwise vanish silently.
    for (const hold of findLinkHolds(articleText)) {
        plan.notes.push(`INTERNAL-LINK HOLD ${hold.url} (article.md:${hold.line}): restore the link when that page is live`)
    }
    const files = writePlan(packageDir, plan)

    console.log(`article  ${plan.article.mode.padEnd(8)} ${plan.article.id}  "${contract.title}"`)
    for (const product of plan.products) {
        const detail = product.set ? ` sets ${Object.keys(product.set).join(', ')}` : ''
        console.log(`product  ${product.asin} ${product.mode.padEnd(8)} ${product.change.padEnd(6)} ${product.id}  ${product.title}${detail}`)
    }
    console.log(`counts   ${Object.entries(plan.counts).map(([key, value]) => `${key}=${value}`).join(' ')}`)
    console.log(`actions  ${plan.actions.length} in one atomic request`)
    for (const note of plan.notes) console.log(`note     ${note}`)
    for (const warning of plan.warnings) console.log(`warning  ${warning}`)
    console.log(`wrote    ${files.json}`)

    if (flags.has('skip-studio-check')) {
        console.log('studio   schema check skipped')
        process.exit(0)
    }
    const check = checkWithStudio(files.ndjson, plan, flag('blog') ?? DEFAULT_BLOG_DIR)
    const expected = check.expected > 0 ? ` (${check.expected} expected "must be published" on references to new products or images)` : ''
    console.log(`studio   ${check.ok ? 'PASS' : 'FAIL'}: sanity documents validate${expected}`)
    for (const error of check.errors) console.log(`ERROR   ${error}`)
    process.exit(check.ok ? 0 : 1)
}

if (command === 'apply') {
    const planFile = flag('plan') ?? join(packageDir, 'import', `plan-${dataset}.json`)
    if (!existsSync(planFile)) fail(`no plan at ${planFile}; run plan first`)
    const plan = JSON.parse(readFileSync(planFile, 'utf8')) as Plan
    if (plan.dataset !== dataset) fail(`the plan is for ${plan.dataset}, not ${dataset}`)

    const { transactionId, mismatches } = await applyPlan({ client, plan, packageDir, hash })
    console.log(`applied  transaction ${transactionId}: ${plan.actions.length} actions`)
    console.log(`studio   /studio/structure/article;${plan.article.id}`)
    if (mismatches.length > 0) {
        for (const mismatch of mismatches) console.log(`ERROR   read-back differs: ${mismatch}`)
        process.exit(1)
    }
    console.log('verified the drafts match the plan field for field')
    process.exit(0)
}

if (command === 'publish-products') {
    if (flag('confirm') !== 'products') fail('publishing products needs --confirm products')
    const { published, skipped } = await publishProducts({ client, dataset, packageDir })
    for (const item of published) console.log(`published ${item}`)
    for (const item of skipped) console.log(`skipped   ${item}`)
    console.log('the article stays a draft; an editor publishes it in Studio')
    process.exit(0)
}
