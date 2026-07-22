# Bug-zapper technical indexing audit

**Status:** Live technical capture complete; Search Console indexing/performance evidence pending
**Captured:** July 20, 2026
**Method:** Direct unauthenticated HTTPS requests to production HTML, response headers, `robots.txt`, and `sitemap.xml`
**Mutation:** Read-only; no production or CMS change

## Result

All seven scoped URLs returned a direct HTTP 200 response, declared `index, follow`, self-canonicalized to the requested HTTPS URL, and appeared in the production sitemap. Each page's HTML title matched its H1. The earlier outdoor and racket extraction errors were not reproduced at the HTTP layer; both returned complete HTML.

This proves basic fetchability and declared indexability at capture time. It does not prove Google indexation, ranking, query ownership, or absence of rendering/search-engine issues. Those require Search Console and, if needed, rendered inspection.

## URL matrix

| Page | HTTP / hops | HTML canonical | Robots | Sitemap | Title = H1 | Published / modified metadata | Raw HTML internal links* |
|---|---|---|---|---|---|---|---:|
| Pillar | 200 / 1 | Self | index, follow | Yes | Yes | 2024-05-23 / 2024-06-04 | 36 (33 unique) |
| Indoor | 200 / 1 | Self | index, follow | Yes | Yes | 2024-06-03 / 2024-06-03 | 32 (29 unique) |
| Outdoor | 200 / 1 | Self | index, follow | Yes | Yes | 2024-06-03 / 2024-06-03 | 32 (29 unique) |
| Solar | 200 / 1 | Self | index, follow | Yes | Yes | 2024-06-04 / 2024-06-04 | 32 (29 unique) |
| Racket | 200 / 1 | Self | index, follow | Yes | Yes | 2024-05-30 / 2024-05-30 | 31 (28 unique) |
| Flowtron | 200 / 1 | Self | index, follow | Yes | Yes | 2024-06-03 / 2024-06-03 | 32 (29 unique) |
| Mosquito killer | 200 / 1 | Self | index, follow | Yes | Yes | 2023-10-04 / 2023-10-30 | 31 (28 unique) |

\*Raw HTML counts include navigation, footer, related-post, anchor, and body links; they are not editorial-body link counts. A later rendered/body-only crawl should distinguish cluster links from global template links.

## Exact canonical/title capture

| Page | Canonical | Title and H1 |
|---|---|---|
| Pillar | `https://whoadvice.com/home-gadgets/best-bug-zapper/` | Best Bug Zapper To Keep Your Home Bug Free |
| Indoor | `https://whoadvice.com/home-gadgets/best-indoor-bug-zapper/` | Best Indoor Bug Zapper To Keep Your Home Bug Free |
| Outdoor | `https://whoadvice.com/home-gadgets/best-outdoor-bug-zapper/` | Best Outdoor Bug Zapper To Keep Your Home Bug Free |
| Solar | `https://whoadvice.com/home-gadgets/best-solar-bug-zapper/` | Best Solar Bug Zapper To Keep Your Home Bug Free |
| Racket | `https://whoadvice.com/home-gadgets/best-bug-zapper-racket/` | Best Bug Zapper Racket To Keep Your Home Bug Free |
| Flowtron | `https://whoadvice.com/home-gadgets/best-flowtron-bug-zapper/` | Best Flowtron Bug Zapper To Keep Home Bug Free |
| Mosquito killer | `https://whoadvice.com/home-gadgets/best-mosquito-killer/` | Best Mosquito Killer to Keep Your Home Bug-Free |

There is no exact title/H1 duplication among the seven URLs, but six use nearly identical “keep your home bug free” framing. That is a positioning-quality and intent-differentiation issue for later contracts, not a technical duplicate-title finding.

## Structured-data capture

Each page exposes these JSON-LD types in raw HTML:

`WebPage`, `BlogPosting`, `BreadcrumbList`, `ItemList`, `ListItem`, `Product`, `Review`, `FAQPage`, `Question`, `Answer`, `Organization`, `Person`, and `ImageObject`.

The capture records presence, not validity or eligibility. Product/Review and FAQ markup require a later rendered schema validation against visible content, exact product identity, review-method truthfulness, and current search-engine policies. Do not treat schema presence as approval of current awards or claims.

## Robots and sitemap

- `robots.txt` allows the site generally and disallows `/products-audit/`.
- `robots.txt` names `https://whoadvice.com/sitemap.xml`.
- All seven exact canonical URLs were found in the sitemap.
- No page-level `noindex` or conflicting canonical was observed.

## Raw recapture integrity

The fetched HTML was held temporarily for parsing and was not added to the repository. These hashes identify the exact responses used for this audit:

| Page | Bytes | SHA-256 |
|---|---:|---|
| Pillar | 289,985 | `dcb2d28b5981eeceeb285327603ca37695412465f9f6b2aa8d7f4d386a2224f4` |
| Indoor | 352,984 | `dd412e2d79c330c254486b446560b2baf1e621c330ea6e720ce3dfd31048e2ce` |
| Outdoor | 320,532 | `b2a24ea3f5cfdcd4cf872d20bd3c2a3c1e63c447ab1cd10d21854abb676f411c` |
| Solar | 285,716 | `214230d4f2669123525bf65eb03c2b5f16450f48f3875965e836973f3d158fd9` |
| Racket | 324,638 | `0f046ef73bf996693635ab50ac81d99b4a32d74c44f9d03ecad907ad25567ccb` |
| Flowtron | 265,097 | `e34bb365bc60d2e436ed1609b1ad3531d1811169d2286134d367e6185ac4e8f5` |
| Mosquito killer | 403,911 | `751d145702b1408f75b2fc91767120ff9d48041e3c8e2a5b84b262e9c06accee` |

## Remaining technical evidence

- Search Console URL Inspection/index status for each URL.
- Page-and-query clicks, impressions, CTR, and average position.
- Body-only inbound and outbound internal-link counts plus anchor text.
- External backlink targets and redirect-preservation needs.
- Rendered structured-data validation and rich-result eligibility.
- Any server/CDN behavior across Googlebot, mobile, and alternate URL forms.

Until those inputs exist, technical status is **basic production fetch/index directives pass; search-engine status pending**.
