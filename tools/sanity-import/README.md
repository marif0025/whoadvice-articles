# sanity-import

Package contracts for WhoAdvice article packages. Later phases add the
Sanity import. The plan is `audits/sanity-import-plan-2026-09-28.md`.

A package's prose stays in `article.md`. Its `cms.yaml` says what each part
becomes in Sanity: the slug, category, author, badge and head fields; each
product's ASIN, link and the exact headings of its review, top pick and table
row; and which block every H2 becomes. The importer reads the contract and
never guesses from heading wording.

## Commands

Run from this folder with Node 24 (it runs TypeScript directly):

```bash
pnpm install
node src/cli.ts draft ../../articles/<cluster>/<package>
node src/cli.ts validate ../../articles/<cluster>/<package>
pnpm test
pnpm typecheck
```

- `draft` writes `cms.draft.yaml` from article.md, publisher-handoff.md and
  the product records. Anything it cannot take from a source, and every
  judgment call, goes into `needs_review`. Check it, resolve each item, then
  save it as `cms.yaml` and delete the draft.
- `validate` checks `cms.yaml` against the package and exits 1 on any error.
  A contract with open `needs_review` items always fails.

Neither command touches Sanity.

## What validate checks

- **The contract:** its shape (`src/contract.ts`), and approval fields when
  the status is `approved_for_publication`.
- **Head fields:** the H1 matches article.md; no colon in the meta title or
  description; the slug matches article.md.
- **Section mapping:** every H2 is mapped, every mapped H2 exists, and the
  single blocks appear once.
- **Products:** each review, top pick and comparison row maps to exactly one
  product; each review has Summary, Verdict, Pros and Cons.
- **Links:** every affiliate link agrees with the review CTA, the handoff and
  the product record.
- **Sanity limits:** 1-10 top picks; 2-8 comparison rows with 1-6 filled spec
  columns; decision tables of 2-12 rows and 2-6 columns.
- **Prose:** no tables inside prose sections, and no `[FACT CHECK]` markers.

Each check in `test/validate.test.ts` was shown to fail with the check
disabled before it was trusted.
