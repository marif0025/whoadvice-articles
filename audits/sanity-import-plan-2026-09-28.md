# Sanity import - review and plan - 2026-09-28

**Scope:** the Codex-written importer (`scripts/import-digital-clocks-draft.ts`), the Sanity schema and custom Studio inputs in `~/personal/blog`, the site's read contract for articles, the 19 article packages in this vault, and Sanity's own agent and import tooling.
**Method:** the code was read in full. The package formats were mapped across all 19 packages. Sanity's docs, changelog and agent toolkit were read. Production data was not queried by Claude; Arif ran four read-only GROQ queries in Vision and supplied the results.
**Companion:** [[site-audit-2026-09-25]], which found that approved packages never reach the site (CON-01, PIPE-01 to PIPE-12).

---

## 1. The answer

The "slug already exists" error is a data problem, not an editing problem. Every digital-clock product exists twice. Both copies fail the ASIN check and the slug check, and a document with validation errors cannot be published.

The duplicates came from the importers. On 16 Sep the vault importer created products with dotted IDs (`product.<slug>-<asin>`). About two hours later a second pass created hyphenated copies (`product-<slug>-<asin>`) and pointed the article at them. It left the dotted originals behind. Seven epilator products also exist only as dotted IDs, each with a dotted draft. Sanity does not show dotted IDs to anonymous readers, so the live site can never render them.

The importer itself cannot be repaired into something reliable. It guesses structure with regexes tuned to two articles, it hard-codes product data, it overwrites whole documents, and it publishes products on its own.

### Recommendation

Replace it with a new importer driven by a small machine-readable file in each package, after fixing the data and three Studio inputs.

- **What:** delete the 21 orphaned dotted product documents (done 2026-09-28). Then fix the Studio inputs so imported content stays editable. Then add a `cms.yaml` contract to each package and build a plan-then-apply importer in this vault. Rehearse it on the `dev` dataset before the epilator pillar goes to production.
- **Why it fits:** the packages differ in every layer (section 3). Any parser that guesses structure from headings will break on the next package. A contract per package moves the guessing to a human-checked file, and the importer only has to be strict.
- **Assumptions:** the `dev` dataset can be seeded with a copy of production for rehearsals. Arif or an editor publishes articles by hand. Product identity is the ASIN, which the vault's 57 product records carry and which agree with every article and handoff.
- **Trades away:** about a week of work before the next article ships. Each package also needs a `cms.yaml` written and checked once.
- **Verified:** the duplicate and orphan data (Arif's dataset export, checked locally, and his four query results), the dotted-ID visibility rule (Sanity docs), every importer and Studio defect cited below (code read at the file and line given).
- **Uncertain:** whether `sanity documents validate --file` runs this schema's custom validators, and whether `@portabletext/sanity-bridge` 4.x supports `sanity` 5. Section 9 lists how to settle each.
- **Next:** phase 3, the importer (section 7). As of 2026-09-28:
- Phase 0 is complete.
- Phase 1 is built and tested, and waits for Arif's commit.
- Phase 2's contracts pass validation.

---

## 2. What is in the dataset

From Arif's dataset export of 2026-09-28 (`production-export-2026-09-28t07-33-39-191z`: 1,732 documents), checked locally. Arif's Vision queries the same day agree, except that Vision was showing drafts over published documents, so it missed the dotted drafts.

| ID scheme | Documents | Readable by visitors | Referenced by |
|---|---|---|---|
| `product.<slug>-<asin>` (dotted), created 16 Sep 19:10-19:55 UTC | 21: 7 clocks, 7 epilators, and a draft of each epilator | No | Nothing, drafts included |
| `product-<slug>-<asin>` (hyphen), created 16 Sep 21:02 UTC | 7 clocks, each with a pending draft | Yes | The clock article `29e6d35e-1509-47cd-b32b-d9362c67608a` |

- The 7 clock pairs share ASIN and slug, so each copy fails both uniqueness checks. That is the error in the Studio screenshot.
- The dotted clock copies are identical to the published hyphen copies in every non-system field, so deleting them loses nothing.
- The hyphen copies' pending drafts change only the image (all 7) and the Echo Spot title ("Amazon Echo Spot"). These are the edits that couldn't be published.
- The 7 epilator dotted products and their drafts are identical and unedited. Their `_updatedAt` is the import time.
- No other document type has a dotted ID. The dataset has no release versions.

Other facts from the export that shape the importer:
- **Most products have no ASIN.** 1,442 of the published products have none, so an ASIN lookup can't see a legacy product for the same item. The importer must report likely legacy matches instead of silently creating a second product (section 6.3).
- **`best-epilators` is already an article.** It is `8a21d258-4bce-4b11-9cb7-cd5844e62601`, the legacy post moved over with Studio's "Migrate to article". No legacy post shares a slug with an article, so importing the pillar means writing a new draft over this article.
- **All 10 hedge-trimmer packages already have articles:** best-corded, best-cordless and best-hedge-trimmers are published, and the other seven are drafts only. An earlier importer run left them. Each is a candidate for its package's first run through the new importer.
- **Article slugs are unique.**

**Repair, done 2026-09-28:** Arif deleted the 21 dotted documents with `sanity documents delete --dataset=production`, which reported "Deleted 21 documents".
- Before the delete, a count of the dotted documents returned 21. Afterwards the dotted count and the published ASIN-twin count both returned 0.
- The export is in `~/personal/blog/backups/`, which `.git/info/exclude` keeps out of git.
- Rollback, if ever needed: `sanity dataset import <export> production --missing`.
- CLI quirk: `sanity documents query` reports a bare `0` as "Query returned no results". Wrap counts in an object, such as `{"n": count(…)}`.

The hyphen IDs are slug-derived, which the installed Sanity skill advises against. They are valid, public and referenced, so they stay. Renaming them would mean cloning and repointing for no reader-visible gain. New documents get random IDs (section 6.4).

---

## 3. Why the Codex importer fails

The file has two parsers. `main()` is hard-wired to the digital-clocks article. `mainAuto()` (`--auto`) is the regex-based general mode.

| # | Defect | Where | Effect |
|---|---|---|---|
| 1 | Dotted IDs for new documents: `product.${slug}-${asin}`, `article.${slug}` | L703, L821, L1044, L1060 | Visitors can't read them. The live page drops the products silently. |
| 2 | `createOrReplace` on the article draft and on products | L907, L918, L1168, L1170 | Wipes editor changes, images included. AGENTS.md says to patch importer-owned fields only. |
| 3 | Spreads whole fetched documents into the new one (`...published, ...draft`) | L707, L1062 | Copies system fields and stale deprecated fields into every write. |
| 4 | Publishes new products by itself | L909-911, L1168 | Products go live without review. AGENTS.md allows this only when the plan says so. |
| 5 | Hard-coded identities: 7 clock ASINs and links, 11 epilator ASINs and links | L81-99, L940-952 | Product data lives in code instead of in the vault's product records. |
| 6 | Title matching by shared words | L585-631 | Can attach the wrong product to a top pick or table row without failing. |
| 7 | Guessed brand (`title.split(' ')[0]`), guessed author (inherited from a legacy post or the newest article in the category), guessed category from the folder path | L978, L1046-1053, L1005-1011 | Writes values nobody chose. |
| 8 | Section roles guessed from heading words (`/top\|leading/`, `/^Types of/`, `/^How to choose/`) | L1027, L1088, L1104 | Breaks on the next package's wording. |
| 9 | Top-pick regex assumes `### Badge: Product` | L243 | best-corded and best-hedge use `### Product: Badge`, so badge and product swap. |
| 10 | Needs `**Pros:**` with a colon | L1000 | Hedge-trimmer pros and cons import empty. |
| 11 | Keeps the first `<callout>` and deletes the rest | L1016-1017 | Loses callouts in 6 packages. |
| 12 | Skips only single-line HTML comments | L494 | Multi-line CMS comments import as body text. |
| 13 | Markdown handled by hand: no numbered lists, italics, nested lists or blockquotes. Extra tables in product guides become paragraphs full of pipes. | L473-528, L1133 | Visible damage on the page. |
| 14 | Writes a FAQ `title` field the schema does not define | L798, L1124 | Studio flags an unknown field. |
| 15 | No limit checks (comparison table max 8 rows and 6 columns, callout group 1-3) | - | Studio shows errors only after the write. |
| 16 | `_key` values from hashed seeds, with fixed seeds such as `types-heading` | L1091-1094 | Two matching sections produce duplicate keys. |
| 17 | Cannot resolve its imports | vault has no `package.json`; the blog has no `tsx` | `next-sanity` is not found when run from the vault. |

A hardened version existed for four hours on 17 Sep: blog commit `9c80846` added UUID IDs, `@sanity/id-utils`, ambiguity checks and a dotted-ID migration. Commit `c754176` deleted it. It skipped dotted documents as "migration inputs" and created fresh products, which is the likely source of the hyphen twins (inference). Its reusable parts are the ID assertions and the ambiguity check, not its parser.

---

## 4. Studio and schema review

Files are in `~/personal/blog`. Priority: **P1** blocks editable imports, **P2** is needed before the pillar goes live, **P3** is cleanup.

| # | Finding | Evidence | Effect | Fix | Pri |
|---|---|---|---|---|---|
| S1 | The three custom inputs send the whole array or object on every keystroke | `ArticleProductsInput.tsx:239-257`, `TopPickItemsInput.tsx:218-233`, `ComparisonTableInput.tsx:137-147` | Two editors, or an editor and the importer, overwrite each other. Studio's per-field validation markers, presence and review changes are bypassed. | Send path-scoped patches, e.g. `set(value, [{_key}, 'summary'])`. | P1 |
| S2 | Top Picks and Comparison look products up by published ID only | `TopPickItemsInput.tsx:159-167`, `ComparisonTableInput.tsx:110-114` | A product that exists only as a draft shows as "Select product" or "Unknown product". | Query both the published and the `drafts.` IDs and keep one entry per product. | P1 |
| S3 | The Products picker lists drafts and published copies separately | `ArticleProductsInput.tsx:182-194` | Each product appears twice in search. | Same fix as S2. | P1 |
| S4 | The ASIN check doesn't name the conflicting document and doesn't exclude release versions | `sanity/schemas/product.ts:51-73` | Editors see "another product uses this ASIN" with no way to find it. | Return the other document's title and ID, and exclude `versions.**`. | P1 |
| S5 | `faqSection` has no `title` field, but the site renders one and the importer writes one | `sectionBlocks.ts:179-211`, site report item 2 | Studio shows an unknown field. Editors can't set the FAQ heading. | Add `title` (string). | P1 |
| S6 | Product-level badge, summary, verdict, pros and cons are read-only and deprecated, but still shown | `sanity/schemas/product.ts:124-201` | Editors open a product to fix copy and find it locked. The copy lives on each article's Products tab. | Hide these fields when empty, and add a product description that points to the article's Products tab. | P1 |
| S7 | `editorial_badge` is free text, and its help text suggests "Expert Tested • 2026" | `article/index.ts:49-56` | Invites the testing claim the audit flagged (TRUST-01). | Replace it with a list of approved labels, defaulting to "Research-Based Buying Guide". | P2 |
| S8 | No editor-set reviewed date. The hero shows `_updatedAt`. `publishedAt` is optional, but missing it prints "NaN" and likely breaks listing cards. | `article/index.ts:78-83`, site report item 4 | Dates change whenever anyone saves, and imports without `publishedAt` break pages. | Add `reviewedAt`, make `publishedAt` required, and render them instead of `_updatedAt` (audit RULES-08). | P2 |
| S9 | Links inside FAQ answers, type items and guide items are not rendered | site report item 2 | Internal links in those blocks become plain text. | Project their `markDefs` and render them with the article's Portable Text components. | P2 |
| S10 | Studio "Revalidate now" sends `type: "content"`, which the routes reject with 400 since `33fcd0f` | `sanity/lib/revalidateContent.ts:14`, site report item 6 | Editors can't refresh a page after publishing. | Send `type: "article"` or `"post"` with the slug and category. | P2 |
| S11 | `articleProduct.product` is not required ("LEGACY" note) | `objects/article-product.ts:17-23` | Product rows without a product can be saved; the site drops them silently. | Restore `Rule.required()` once phase 0 is done. | P2 |
| S12 | The article body allows H1 | `fragments/article-block-content.ts:8` | A second H1 is possible. | Remove H1 from the article's styles. The importer never emits one. | P3 |
| S13 | The hero image and intro text come from `seo.open_graph_image` and `seo.meta_description` | site report item 4 | The meta description doubles as the visible dek (audit RULES-25). | Add `dek` and `heroImage` fields later, with the section 5 anatomy from the audit. | P3 |
| S14 | API version defaults to `2023-06-15` | `sanity/env.ts:1-2` | Older than the `drafts` perspective the preview client uses. Whether that fails is unverified. | Pin `2025-02-19` or later in env and code. | P3 |
| S15 | Roundups emit Product and Review JSON-LD per product | site report item 4 | Conflicts with the vault's schema policy (Article, BreadcrumbList, ItemList). | Audit TECH-16 and SEO-10. Not an importer change. | P3 |

S1 to S6 are app code, so Arif commits them. They are small and local to the files named.

**Phase 1 result (2026-09-28):** S1 to S6 are built in `~/personal/blog` and uncommitted. Testing in Studio against `dev` found two more defects, and both are fixed:

| # | Finding | Fix |
|---|---|---|
| S16 | Picking a product that exists only as a draft saved a strong reference, which Sanity rejects ("references non-existent document"). The old picker had the same fault. | `ProductReferencePicker.tsx` writes a weak reference with `_strengthenOnPublish` for a never-published product, the same shape as Studio's create-in-place. `mergeDraftProducts` now reports whether a published version exists. |
| S17 | The ASIN rule chain ended in `.error('When provided, ASIN must be a valid 10-character identifier.')`. That message replaced the duplicate check's own text, so duplicates showed as a format error. This is what editors saw during the duplicate-product problem. | The format check and the duplicate check are now two separate rules. |

Tested in Studio against `dev`, each change confirmed by reading the saved document back:
1. Editing one pro changed only `products[_key=="d0f89757c708"].pros[2]`.
2. A draft-only product appears once in the pickers, shows its title, and saves as a weak reference in Products and Top Picks. Publish stays blocked until that product is published.
3. In the comparison table, a cell edit, an add and remove of a row, and an add and remove of a column left only the edited cell changed.
4. The FAQ Heading field shows and holds the existing value.
5. The deprecated product fields hide on a clock product and show, with the new note, on a legacy product.
6. A duplicate ASIN now names the other product and its ID. The format rule still fires on its own.

Type check passes, lint findings are identical to `HEAD` in every file, and the existing 20 tests pass. The test documents were deleted from `dev` afterwards.

---

## 5. Sanity's agent and import tooling

Sanity has no single packaged "agentic publishing" product. It has four separate pieces. The table rates each against this job.

| Tool | Would replace | Fit | Why |
|---|---|---|---|
| `@portabletext/markdown` 2.x | Hand-written prose parsing | Good | The official converter. Deterministic. Handles headings, lists (including nested), bold, italic, links, blockquotes and tables. Its link matcher can return our `inlineLink` object. `onDegradation` reports anything it could not convert, so the importer can fail loudly. Needs Node 22.12 or later. |
| `sanity documents validate --file` | Nothing; there is no validation today | Good | Validates an NDJSON file against the Studio schema before anything is written. |
| Actions API (`client.action`) | `createOrReplace` of `drafts.` IDs, auto-publish | Good | Creates drafts properly. Sanity advises against writing `drafts.` IDs with the mutation API. Several actions in one request are atomic, and publish takes an `ifDraftRevisionId` guard. |
| Agent Action `patch` | Raw writes | Partial | Schema-checked without an LLM, but experimental (`vX`) and needs a deployed schema. Whether it runs custom rules is unconfirmed. |
| Remote MCP server (`mcp.sanity.io`) | The script's writes | Partial | Writes drafts or release versions, one call at a time. The toolkit itself says not to use it for bulk loads. Useful for reading schema and data while developing, with a read-only token and Arif's explicit go-ahead. |
| Content Releases | Staging article and products together | Poor | Enterprise-only on current pricing. |
| Agent Actions generate/transform, Content Agent, Canvas | Nothing | Poor | An LLM would rewrite approved copy, which breaks the vault's evidence rules. |
| Agent Toolkit skills | Guidance | Partial | Useful, but the migration skill says to derive IDs from slugs and the best-practices skill says never to. This project follows the installed best-practices skill and AGENTS.md: random IDs, look up by field. |

Sanity's official guidance that shapes this plan:
- **Human checkpoint.** One human checkpoint before anything writes, and a human publishes. The toolkit and the Content Agent docs both say this.
- **Validation isn't automatic.** Schema validation runs in Studio, not on API writes, so the importer must validate before it writes.
- **Unpublished references.** Point at an unpublished document with `_weak: true` and `_strengthenOnPublish`, as Studio does. The publish step strengthens the reference.

---

## 6. The new importer

### 6.1 Where it lives and how it runs

- **Location:** `tools/sanity-import/` in this vault, with its own `package.json`. It is tooling, not app code, which follows the 2026-09-28 ruling that code repos hold only app code.
- **Dependencies:** `@sanity/client`, `@portabletext/markdown`, `@portabletext/schema`, `yaml`, `zod`, `tsx`.
- **Node:** 24, via nvm in WSL.
- **Configuration:** the project ID and dataset come from flags. The write token is read from an env file given with `--env`, such as the blog's `.env`, and is never printed.
- **Schema checks:** run with the blog's Sanity CLI (`pnpm --dir ~/personal/blog exec sanity documents validate --file <plan>.ndjson`), so the real Studio schema is used without importing app code.
- **Types:** TypeGen output from the blog (`pnpm typegen`) is copied into the tool, so writing a field the schema doesn't have is a compile error.

### 6.2 The package contract: `cms.yaml`

One file per package, next to `article.md`. The prose stays in `article.md`. The contract says what each part becomes. A one-time normaliser drafts it from the handoff YAML, the product records (joined on ASIN) and the article's headings, and a human checks it.

```yaml
version: 1
status: approved_for_publication   # the importer refuses anything else
approved_by: <name>
approved_at: 2026-10-01
slug: best-epilators
category: skin-care
author: <author document slug>    # no handoff names an author today
article_format: product_guide
badge: Research-Based Buying Guide
published_at: 2026-10-01
reviewed_at: 2026-10-01
seo:
  meta_title: Best Epilator in 2026 - 7 Picks for At-Home Hair Removal
  meta_description: ...
  keywords: [best epilator, ...]
  indexable: true
hero_image: { file: images/hero.png, alt: ... }
products:                          # identity from products/*.md, joined on ASIN
  - { asin: B0FNXC28MM, review_heading: "1. Braun Silk-épil 9 Flex SES9-041" }
    # optional, only after a human checks a reported legacy match:
    # existing_product: <document id>
sections:                          # every H2 in article.md, in order
  - { heading: "Our top picks", block: topPicks }
  - { heading: "Epilators compared", block: comparisonTable }
  - { heading: "The 7 epilators, reviewed", block: productReviews }
  - { heading: "Types of epilators", block: typesSection }
  - { heading: "How to choose an epilator", block: guideSection }
  - { heading: "Epilator questions", block: faqSection, faq_schema: false }
  - { heading: "*", block: prose }
```

**As built (phase 2, 2026-09-28):** `tools/sanity-import/src/contract.ts` is the reference. It differs from the sketch above in these ways:
- Each product carries the exact headings that tie it to its review, top pick and table row (`review_heading`, `top_pick_heading`, `table_label`).
- A product can carry `legacy_product`: an existing document ID to reuse, or `none`.
- There is no `legacy_post` field, because no legacy post shares a slug with an article.
- `needs_review` lists open questions for a human. Validation fails until it is empty.

Commands:
- `node src/cli.ts draft <package>` writes `cms.draft.yaml` from the package.
- `node src/cli.ts validate <package>` checks `cms.yaml`.

The first two contracts carry Arif's decisions of 2026-09-28:
- **Epilator pillar:** reuse the four exact-model legacy products (`5d377c8d`, `ff951841`, `72f77ba3`, `be9bcb5d`), and create new products for SE7-041, BRE708/00 and BRE728/00. Types renders as cards; How to choose renders as prose.
- **Clock article:** its three How to choose sections stay prose.
- **Both:** the badge is Research-Based Buying Guide, and each keeps its current author (emily-cooper, max-collins).

The validator has 16 tests. Each check tested was shown to fail with that check disabled.

Rules:
- **Headings:** every H2 must be listed or covered by `*`. A heading missing from `article.md` stops the run.
- **Product fields:** title, brand, link and slug come from the product record. Review copy comes from the H3 named in `review_heading`, with tolerant labels (`**Pros:**` or `**Pros**`).
- **Callouts:** `<callout>` blocks become `calloutGroup` entries. Each needs a title, from `<callout title="…">` or the contract.

### 6.3 Pipeline

`plan` is the default and writes nothing. `apply` needs the plan file and a typed confirmation.

1. **Load:** read and validate `cms.yaml` with zod, read `article.md`, and join the product records on ASIN.
2. **Parse:** split `article.md` by the contract's headings. Convert prose with `@portabletext/markdown`. Build structured blocks from their sections.
3. **Resolve:** find the category, author, article and products by slug or ASIN, reading both published and draft documents. More than one match, or a dotted ID, stops the run.
   - A product with no ASIN match is also checked against the 1,442 ASIN-less legacy products: the ASIN inside their Amazon URL, then an exact title match.
   - A likely match stops the run. A human then sets `existing_product` in the contract, or confirms a new product. The importer never merges on its own.
   - When `existing_product` is used, the importer sets that product's missing `asin` in a draft patch, so the next lookup succeeds.
4. **Build:** produce the article draft, new product drafts and patches for existing products. Keys are unique by construction and asserted.
5. **Check:**
   - Schema limits: comparison table 2-8 rows and at most 6 columns with every cell filled; decision table 2-6 columns and 2-12 rows; callout group 1-3; top picks 1-10.
   - Every reference resolves.
   - No unknown block types.
   - No H1 in the body.
   - `sanity documents validate --file`.
6. **Plan:** write `plan.ndjson` and `plan.md` (a field diff against what's in Sanity, plus the list of writes) into the package's `import/` folder.
7. **Apply:** one atomic Actions API request.
   - Create the article draft, or edit it if it already exists.
   - Create new products as drafts.
   - Add a draft patch for any existing product whose ASIN record changed. Live pages that share the product change only when someone publishes that draft.
   - Reject the run if the dataset or the plan hash differs from the plan file.
8. **Record:** write `import/record.json` with the document IDs, draft revisions, source hash and importer version.
9. **Publish products:** a separate command, run after review. It publishes the new product drafts in one atomic request, with `ifDraftRevisionId` guards. The editor then publishes the article in Studio. The importer never publishes an article.
10. **Verify:** read everything back, then fetch the draft preview and, after publishing, the anonymous published page. Check the counts against the contract.

### 6.4 Write rules

- **IDs:** new documents get a random ID from `@sanity/uuid`. Every root ID must match `^[A-Za-z0-9_-]+$`. References target root IDs only.
- **Idempotency** comes from lookups (article by `slug.current`, product by upper-cased `asin`), not from derived IDs.
- **Ownership:** the importer owns the article's `title`, `slug`, `article_format`, `editorial_badge`, `seo` (except `open_graph_image` unless the contract names an image), `categories`, `author`, dates, `products` and `content`. It never touches product images, prices or anything not in that list.
- **Drift guard:** if the draft's revision differs from the one in `record.json`, someone edited it in Studio since the last import. The run stops, and the plan lists the changed fields. The vault is the source of truth, so the fix goes into `article.md` or is overridden deliberately with a per-field flag.
- **Unpublished references:** a reference to a product that exists only as a draft is written as `_weak: true` with `_strengthenOnPublish: {type: 'product'}`, the same shape Studio's create-in-place uses (`ProductReferencePicker.tsx:38-49`).
- **Production guard:** writing to `production` needs `--dataset production` and a typed slug confirmation. The default dataset is `dev`.

### 6.5 Markdown mapping

| Markdown | Becomes |
|---|---|
| H2 | A `block` with style `h2` before each section, unless the block renders its own heading (decision table) |
| H3, H4 | `h3`, `h4`. H5 and H6 fail. H1 is only the title. |
| Paragraph, bold, italic | `normal` blocks with `strong` and `em` |
| Bullet and numbered lists, nested | `listItem` with `level` |
| Blockquote | style `blockquote`. Lists inside a blockquote are flattened and reported. |
| Link | `inlineLink` with `linkType: url` and `url`. `is_external` is true only for other hosts. Resolving internal links to article references is a later step. |
| Inline code | Plain text, reported. The schema has no code mark. |
| Table in a `comparisonTable` section | `comparisonTableBlock`. Rows are joined to products by ASIN through the contract, never by title words. |
| Other table | `decisionComparisonTableBlock`. It fails if it doesn't fit the 2-6 column and 2-12 row limits. |
| `<callout>` | `calloutGroup`. Items are plain strings, because the schema allows no formatting there. |
| HTML comment | Dropped. `CMS IMAGE` and `INTERNAL-LINK HOLD` comments are listed in the plan as open tasks. |
| Image | Uploaded with `client.assets.upload` as `iimage`, with alt text required. |
| Anything `onDegradation` reports | Stops the run |

### 6.6 Checks that must fail when broken

Each check is shown failing against a deliberately broken fixture before it is trusted:
- a contract missing an ASIN
- 9 comparison rows
- a duplicate slug
- a heading not in the contract
- a dotted ID found during resolve
- an unknown block
- a drifted draft revision
- `status` not approved

Beyond that, the proof is the rendered page: section counts in the DOM (3 top picks, N table rows, N review cards, N FAQs), the heading outline, and that every product card has a working affiliate link.

---

## 7. Phases

| Phase | Work | Owner | Size | Done when |
|---|---|---|---|---|
| 0 | **Done 2026-09-28.** Exported the dataset, deleted the 21 orphaned dotted documents (dotted and ASIN-twin counts both 0), and published the 7 blocked clock product drafts (0 pending). A copy of the export without the 21 is `backups/production-2026-09-28-clean.tar.gz`: 1,711 documents, assets intact. | Arif | S | Met. |
| 1 | Studio fixes S1-S6, plus S16 and S17 found in testing. **Built and tested 2026-09-28, uncommitted; Arif commits.** | code, Arif commits | M | Met on `dev` (section 4, phase 1 result). |
| 2 | Contract schema, normaliser, and `cms.yaml` for the epilator pillar and the clock article. **Done 2026-09-28**, uncommitted. | vault | M | Met: both contracts pass, and Arif confirmed every judgment call. |
| 3 | The importer (section 6), with the broken fixtures | vault | L | Every fixture fails for the right reason. The pillar's plan passes `documents validate`. |
| 4 | Rehearsal on the `dev` dataset, seeded 2026-09-28 from the cleaned export. Never seed from the raw export, which still holds the 21 dotted documents. | Arif seeds dev; Claude runs the local site and Studio against it (`NEXT_PUBLIC_SANITY_DATASET=dev`) | M | The local page matches the contract counts, Studio edits work, and publish-products plus a Studio publish renders the page. |
| 5 | Epilator pillar to production: apply as a draft, editor review, publish products, publish the article, unpublish the legacy post, revalidate, check the live page against the package | Arif and the editor | S | The live page matches the package (audit rule change 2, `live_verified`). |
| 6 | Retire `scripts/import-digital-clocks-draft.ts`. Add the contract to `12` Part 14 and a publication stage to `11`. | vault | S | Only one importer and one handoff format remain. |

The project has two datasets, `production` and `dev`, and both are public.

**`dev` is ready for the rehearsal (2026-09-28).** Arif deleted the old `dev` (4 stray documents, no assets, no code using them), recreated it as public, and imported the cleaned export: "Imported 1711 documents".
- Checked afterwards: 19 articles, 192 posts, 1,481 products, 7 categories, 7 authors and 1,915 image assets.
- No dotted IDs, no ASIN twins, and no article product reference left dangling. The clock article's 7 products all resolve.
- Two products have an `image` field with no file attached. Production has the same two, so they are not an import loss.
- The importer's default dataset is `dev`.
- Re-seed `dev` from a fresh production export before each rehearsal that needs current data.

---

## 8. Decisions defaulted

Change any of these if they are wrong.

1. **The editor publishes the article in Studio.** The importer only publishes new products, on a separate command. This follows AGENTS.md: "Never publish an article automatically."
2. **An existing article at the slug is updated through a new draft,** never replaced. The epilator pillar goes over the migrated article `8a21d258-…`, which stays live until the editor publishes. If a legacy post ever shares a slug with an article, the post is unpublished, not deleted, once the article is verified live.
3. **FAQ schema is off by default** (`faq_schema: false`). The contract can turn it on per package.
4. **The author is chosen per package in the contract.** No handoff names one, so the importer stops without it.
5. **The digital-clock article stays as it is** until its contract exists. It was edited in Studio after import, so its first run through the new importer will stop on drift, which is intended.

---

## 9. Unverified, and how to settle each

| Item | How to settle |
|---|---|
| ~~A second dataset is allowed~~ | Settled: `dev` exists and is public. Seed it from the export with `--missing`. |
| ~~`sanity dataset import --missing` exists~~ | Settled: "Skip documents that already exist". The export has no system documents. |
| `sanity documents validate --file` runs the custom validators (ASIN, table rows) | Validate a fixture with 9 comparison rows and confirm it fails |
| `@portabletext/sanity-bridge` 4.x works with `sanity` 5 | Not needed: the importer defines its Portable Text schema with `@portabletext/schema` directly, and `documents validate` guards against drift |
| Exact Actions API shapes for create, edit and publish in `@sanity/client` 7.x | Read the client's type definitions when building phase 3 |
| The revalidation webhook exists in Sanity | Arif checks sanity.io/manage → API → Webhooks |
| ~~`sanity documents delete` accepts several IDs~~ | Settled: yes (`ID... [IDS...]`, with `--dataset`) |

---

## 10. Evidence

- **Importer:** `scripts/import-digital-clocks-draft.ts` in this vault (committed `69bcd14`, plus 78 uncommitted lines from 17 Sep 16:53). Blog commits `9c80846` and `c754176`.
- **Schema and Studio:** `sanity.config.ts`, `sanity/schemas/**`, `sanity/components/*Input.tsx`, `ProductReferencePicker.tsx` and `sanity/lib/productRef.ts` in `~/personal/blog` at `57a03a9`, with three uncommitted frontend files that don't affect the schema.
- **Site read contract:** `src/lib/content-queries.ts`, `src/lib/requests.ts`, `article-portable-text.tsx`, `ArticleHero.tsx`, `post-seo.ts`, and the revalidation routes, read on 2026-09-28.
- **Packages:** all 19 under `articles/`, their handoffs, and the 57 product records. ASINs and links agree across all of them. Handoff YAML key names drift, and two blocks don't parse.
- **Data:** Arif's dataset export of 2026-09-28, checked locally (dotted IDs of every type, references including drafts, field diffs of the twins, ASIN groups, article slugs). Also his four Vision query results of the same day.
- **Sanity sources:**
  - Document IDs and dots: sanity.io/docs/content-lake/ids.
  - Actions API: sanity.io/docs/http-reference/actions.
  - Reference strengthening: sanity.io/docs/studio/reference-type.
  - Validation scope: sanity.io/docs/studio/validation.
  - `documents validate`: sanity.io/docs/cli-reference/documents.
  - MCP server: sanity.io/docs/ai/mcp-server.
  - Agent Actions: sanity.io/docs/agent-actions/introduction.
  - Releases pricing: sanity.io/pricing.
  - The `sanity-io/agent-toolkit` skills.
