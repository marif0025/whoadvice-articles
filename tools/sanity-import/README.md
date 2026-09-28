# sanity-import

Imports WhoAdvice article packages into Sanity as drafts. The plan is
`audits/sanity-import-plan-2026-09-28.md`.

A package's prose stays in `article.md`. Its `cms.yaml` says what each part
becomes in Sanity: the slug, category, author, badge and head fields; each
product's ASIN, link and the exact headings of its review, top pick and table
row; and which block every H2 becomes. The importer reads the contract and
never guesses from heading wording.

## Commands

Run from this folder with Node 24 (it runs TypeScript directly):

```bash
pnpm install
node src/cli.ts draft    ../../articles/<cluster>/<package>
node src/cli.ts validate ../../articles/<cluster>/<package>
node src/cli.ts plan     ../../articles/<cluster>/<package> --dataset dev
node src/cli.ts apply    ../../articles/<cluster>/<package> --dataset dev
node src/cli.ts publish-products ../../articles/<cluster>/<package> --dataset dev --confirm products
pnpm test
pnpm typecheck
```

- **draft** writes `cms.draft.yaml` from article.md, publisher-handoff.md and
  the product records. Every judgment call goes into `needs_review`. Check
  it, then save it as `cms.yaml` and delete the draft.
- **validate** checks `cms.yaml` against the package and exits 1 on any
  error. It does not touch Sanity.
- **plan** reads the dataset, then writes `import/plan-<dataset>.json`
  (the exact actions and resulting documents) and
  `import/plan-<dataset>.ndjson`. It then runs the blog's
  `sanity documents validate` on those documents. It writes nothing to
  Sanity.
- **apply** sends the plan in one atomic Actions API request, reads the
  drafts back, compares every field the importer owns, and updates
  `import/record.json`.
- **publish-products** publishes the product drafts the import created or
  changed. The article is never published by this tool; an editor publishes
  it in Studio.

Options:
- `--env <file>`: default `~/personal/blog/.env`. It supplies the project ID
  and `SANITY_API_WRITE_TOKEN`, which is never printed.
- `--blog <dir>`: default `~/personal/blog`, used for the schema check.
- `--replace-draft`: overwrite a draft this importer did not leave.
- `--skip-studio-check`.

## What the importer writes

- **Article:** a draft. It creates the article, or patches only title, slug,
  format, badge, the seo text fields, categories, author, products and
  content. It never touches `seo.open_graph_image` or anything else.
  `publishedAt` changes only when `cms.yaml` gives a date.
- **Products:** found by ASIN. A legacy product without an ASIN is reused
  only when `cms.yaml` names it in `legacy_product`. Otherwise the importer
  creates a new product as a draft. On an existing product it sets only
  `asin`, `link` and a missing `brand`, always as a draft, never the title
  or image.
- **References:** a reference to a product with no published version is weak
  and strengthened on publish, as Studio does.
- **IDs:** new documents get random IDs, never dotted or slug-derived.

## Guards

- **Before plan:** `cms.yaml` must validate.
- **Ambiguous data stops `plan`.** That covers:
  - two products with one ASIN, or a slug on two articles;
  - dotted IDs;
  - a likely legacy product without a decision in `cms.yaml`.
- **A draft the importer did not leave** stops `plan` unless
  `--replace-draft` is passed. `record.json` holds the draft revision it
  left.
- **A stale plan stops `apply`.** That means `cms.yaml` or article.md
  changed, or any document the plan read changed.
- **Production** needs `status: approved_for_publication` in `cms.yaml` and
  `--confirm <slug>`.
- **Lossy Markdown** (an H5, a table in prose, text before the first FAQ)
  stops the build. Dropped inline code keeps its text and is reported.
- **Schema check:** the only error `plan` accepts from the check is "must be
  published" on a weak reference to a product the import owns and will
  publish.

Every guard and check in `test/` was shown to fail with its code disabled
before it was trusted.
