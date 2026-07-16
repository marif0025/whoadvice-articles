# How to clean hedge-trimmer blades — Part 4 audit

**Audit date:** July 16, 2026  
**Status:** Conditional pass for CMS handoff  
**Draft:** `article.md`  
**Contract:** `article-contract.md`  
**Research:** `research.md` and `sources.md`

## Gate summary

| Gate | Status | Findings |
|---|---|---|
| Contract compliance | Pass | Approved section order, manual-first safety sequence, four-row comparison, oil distinction, inspection route, storage checklist, ten FAQs, and conclusion logic are present. |
| Evidence and safety | Conditional pass | Claims stay within the ledger and preserve model-specific differences. Current EGO US documentation, official page freshness, SDS revision, and recalls still require publication-day checks. |
| On-page SEO | Pass | Informational intent, supporting-page role, primary keyword placement, answer-first opening, metadata, headings, secondary questions, and descriptive internal links are present. |
| Human-centered writing | Pass | The article leads with action, includes a compact quick sequence, explains why manual differences matter, and avoids fake experience, generic empathy, filler, and unsupported universals. |
| Mechanical audit | Pass | Workflow script returned 0 flags and counted 2,008 words after revision. |
| CMS and technical SEO | Pending | Canonical, live-link status, images, schema implementation, rendered tables, accessibility, indexability, sitemap, and page-speed testing require CMS work. |

## Revisions made during Part 4

- Converted YAML front matter to the project's recognized visible metadata format.
- Added primary keyword, research date, target market, evidence model, and no-affiliate disclosure.
- Split the dense direct-answer, water, and conclusion sentences.
- Added one compact quick-sequence callout near the top.
- Preserved the four-row table; Husqvarna remains excluded because current official US support was not captured.
- Expanded `publisher-handoff.md` with the required SEO, internal-link, visual, schema, freshness, and final-verification fields.

## On-page SEO findings

- The page matches tutorial and maintenance intent rather than commercial product intent.
- The primary keyword appears in the title/H1 wording, opening, procedure heading, meta description, and slug without repetitive exact-match use.
- The title is concise and the meta description is 143 characters.
- The opening identifies the reader's action and gives the safe answer before background.
- Headings form one H1 with descriptive H2 and nested H3 steps.
- FAQs cover genuine secondary questions about water, solvents, oil, WD-40, vegetable oil, frequency, binding, and sharpening.
- Internal links preserve cluster ownership. CMS must verify that the sharpening destination is live before publication.
- Article and BreadcrumbList are appropriate schema candidates. Product and ItemList schema are not appropriate.

## Human-centered findings

- The main recommendation is clear: identify the model and isolate power before choosing a cleaner or lubricant.
- The central tradeoff is concrete: manufacturer instructions conflict, so copying another model's maintenance routine can introduce safety or compatibility risk.
- The quick sequence helps a reader act without rereading the full guide.
- Tables carry source differences and diagnostic branches; prose explains the consequence.
- Safety instructions lead with the action rather than burying it after technical detail.
- No first-person testing, invented anecdote, fake empathy, vague consensus, promotional language, or AI-detector optimization appears.
- Repetition of `manual` remains purposeful because it identifies the controlling source; redundant caveats were removed during editing.

## Publication blockers and CMS work

1. Locate or reopen a current US-hosted EGO HT2600/HT2600-FC manual and reconcile its instructions with the captured manual.
2. Reopen the named official manuals/support pages and confirm the current STIHL label/SDS revision.
3. Repeat exact-model and serial-range CPSC and manufacturer recall checks.
4. Verify both included internal-link destinations are published and correct; remove or hold unpublished links.
5. Complete responsible human safety/editorial review and record the reviewer and date.
6. Implement and validate canonical, Article/BreadcrumbList schema, images, alt text, tables, accessibility, indexability, sitemap inclusion, and page performance.

## Final audit result

The editorial draft passes contract, on-page SEO, human-centered writing, and mechanical review. It is ready for conditional CMS handoff, not publication, until the source-freshness, recall, link, and human safety-review gates above are complete.
