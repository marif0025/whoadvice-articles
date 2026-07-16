# Hedge-trimmer article cluster

This directory is the shared workspace for the WhoAdvice hedge-trimmer content cluster.

## Structure

- `best-hedge-trimmers/` — mixed-format hub article and its brief, sources, and publisher handoff
- `best-corded-hedge-trimmers/` — corded branch article and its related files
- `best-cordless-hedge-trimmers/` — cordless branch article, research, contract, sources, and handoff
- `best-pole-hedge-trimmers/` — pole and long-reach commercial article package
- `corded-vs-cordless-hedge-trimmer/` — power-format comparison package
- `what-size-hedge-trimmer-do-i-need/` — blade-length and stated-capacity explainer package
- `hedge-trimmer-vs-loppers-vs-pruning-saw/` — thick-stem and tool-selection explainer package
- `how-to-sharpen-hedge-trimmers/` — full article package; Part 4 editorial audit complete; conditional CMS handoff pending live-page checks and responsible human safety review
- `how-to-clean-hedge-trimmer-blades/` — full article package; Part 4 editorial audit and July 16 primary-source refresh complete; conditional CMS handoff pending live-page checks and responsible human safety review
- `how-to-use-a-hedge-trimmer/` — full article package; Part 4 editorial audit complete; ready for responsible human review and CMS checks
- `products/` — one normalized raw research file per exact product/model/package across the cluster
- `audits/` — cluster-wide hierarchy, topology, consistency, and final-readiness audit records
- `content-strategy.md` — canonical keyword ownership, content priorities, cannibalization boundaries, and expansion roadmap
- `research/` — dated cluster-level discovery inputs, including raw keyword exports and question banks that apply across multiple articles
- `publisher-cms-guide.md` — publisher entry point for moving all ten completed drafts into the CMS and recording publication-day checks

Keep durable cluster navigation and strategy at this root. Put cluster-wide audit reports in `audits/`. Keep an article-specific `audit.md` inside its article folder when the report applies only to that package.

## Standard article-folder contract

Every article subfolder contains the same six files:

- `article.md` — public draft
- `content-brief.md` — page role, reader, keyword, and editorial direction
- `research.md` — Part 1 evidence, eligibility, ranking, and unresolved questions
- `article-contract.md` — approved Part 2 structure, fields, claim limits, and drafting constraints
- `sources.md` — source register, claim ledger, and raw retailer destinations
- `publisher-handoff.md` — canonical, links, images, schema, freshness, and CMS tasks

Do not combine the contract back into the brief or move shared product evidence into an article subfolder.

## Shared product archive rule

Product evidence belongs in `articles/hedge-trimmers/products/`, not inside an individual article subfolder. Shared products such as EGO HT2601, WORX WG261, and BLACK+DECKER BEHT350FF use one evidence file across every article. Append dated snapshots when evidence changes; do not silently overwrite prior observations.

Every product file also carries a standardized affiliate record with `affiliate_key`, raw `amazon_url`, `asin`, populated `affiliate_link`, `affiliate_status`, and `exact_model_status`. The publisher has filled `affiliate_link` after checking each exact variation and completing the commercial gate. Publication-day destination checks remain required.

`products/destination-register.md` is the cluster index. Product files remain the source of truth; update the register whenever an ASIN, exact package, affiliate destination, or approval status changes. A deferred record with a publisher-confirmed link must be labeled as outside public copy so it cannot be mistaken for a selected recommendation. Rejected candidates otherwise belong only in the relevant article's `research.md`, not in the active product archive or destination register.

Article-specific rankings, contracts, source registers, and publisher notes remain in their corresponding article subfolders.
