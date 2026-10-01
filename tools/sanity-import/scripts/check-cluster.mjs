// Read-only check of published cluster pages. It only sends GET requests.
//
//   node scripts/check-cluster.mjs <base-url> <path>... [--held <path>]...
//
// For each page it checks:
// - the page answers 200;
// - there is exactly one <h1>;
// - the canonical URL ends with the page's own path;
// - every same-site link in the article body answers 200;
// - no link points at a held path (a page that isn't live yet);
// - every Amazon link carries rel="sponsored".
// It prints PASS or FAIL per check and exits 1 if anything failed.

const args = process.argv.slice(2)
const held = []
const paths = []
let base
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--held') held.push(args[++i])
    else if (!base) base = args[i].replace(/\/$/, '')
    else paths.push(args[i])
}
if (!base || paths.length === 0) {
    console.error('usage: node scripts/check-cluster.mjs <base-url> <path>... [--held <path>]...')
    process.exit(2)
}

const headers = { 'user-agent': 'Mozilla/5.0 (cluster check; read-only)' }
let failed = 0
const report = (ok, what) => {
    if (!ok) failed++
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}`)
}

const linkStatus = new Map()
async function statusOf(url) {
    if (!linkStatus.has(url)) {
        linkStatus.set(url, fetch(url, { headers, redirect: 'follow' }).then((r) => r.status, () => 0))
    }
    return linkStatus.get(url)
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]

for (const path of paths) {
    const url = base + path
    const res = await fetch(url, { headers, redirect: 'follow' }).catch(() => undefined)
    report(res?.status === 200, `${path} answers ${res?.status ?? 'no response'}`)
    if (res?.status !== 200) continue
    const html = await res.text()

    const h1 = (html.match(/<h1[\s>]/g) ?? []).length
    report(h1 === 1, `${path} has ${h1} <h1>`)

    const canonical = [...html.matchAll(/<link\b[^>]*>/g)]
        .map((m) => m[0])
        .find((tag) => attr(tag, 'rel') === 'canonical')
    const canonicalHref = canonical && attr(canonical, 'href')
    report(Boolean(canonicalHref?.replace(/\/?$/, '/').endsWith(path.replace(/\/?$/, '/'))), `${path} canonical ${canonicalHref ?? 'missing'}`)

    const article = html.match(/<article\b[\s\S]*<\/article>/)?.[0] ?? ''
    report(article.length > 0, `${path} has an <article> body`)
    const anchors = [...article.matchAll(/<a\b[^>]*>/g)].map((m) => m[0])

    const internal = new Set()
    for (const tag of anchors) {
        const href = attr(tag, 'href')
        if (!href) continue
        const target = href.startsWith('/') ? base + href : href.startsWith(base) ? href : undefined
        if (target) internal.add(target.split('#')[0])
    }
    for (const target of internal) {
        const status = await statusOf(target)
        report(status === 200, `${path} links ${target.slice(base.length)} (${status})`)
    }
    for (const hold of held) {
        const linked = [...internal].some((t) => t.slice(base.length).replace(/\/?$/, '/') === hold.replace(/\/?$/, '/'))
        report(!linked, `${path} does not link held ${hold}`)
    }

    const amazon = anchors.filter((tag) => /amzn\.to|amazon\.com/.test(attr(tag, 'href') ?? ''))
    const unsponsored = amazon.filter((tag) => !/\bsponsored\b/.test(attr(tag, 'rel') ?? ''))
    report(unsponsored.length === 0, `${path} ${amazon.length} Amazon links, ${unsponsored.length} without rel=sponsored`)
}

console.log(failed === 0 ? '\nALL PASS' : `\n${failed} FAILED`)
process.exit(failed === 0 ? 0 : 1)
