# Hedge-trimmer article cluster

This directory is the shared workspace for the WhoAdvice hedge-trimmer content cluster.

## Structure

- `best-hedge-trimmers/` — mixed-format hub article and its brief, sources, and publisher handoff
- `best-corded-hedge-trimmers/` — corded branch article and its related files
- `best-cordless-hedge-trimmers/` — cordless branch article, research, contract, sources, and handoff
- `products/` — one normalized raw research file per exact product/model/package across the cluster
- `cluster-audit.md` — cluster topology, overlap, consistency, Amazon, and implementation audit

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

Article-specific rankings, contracts, source registers, and publisher notes remain in their corresponding article subfolders.
