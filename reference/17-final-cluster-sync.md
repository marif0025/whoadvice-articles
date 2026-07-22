# WhoAdvice: Final Cluster Sync

## Purpose

Run this as the final editorial part of a complete article cluster, after every included article has passed its individual factual, human-centered, on-page SEO, and mechanical audits. It synchronizes the cluster; it does not reopen rankings or replace medical, legal, factual, editorial, or CMS review.

Use the live workspace as the source of truth. Preserve uncommitted user work, inspect every complete article package in the cluster, and distinguish public-copy edits from CMS and publication-day tasks.

## Required inputs

- Cluster root and page inventory
- Current pillar and support articles
- Article contracts or approved outlines
- Research packets, claim ledgers, product records, and sources
- Individual audit reports
- Publisher handoffs
- Keyword and page-ownership map

If a purported article is still a brief or lacks required evidence, list it as incomplete and do not invent the missing copy.

## Final cluster-sync prompt

```text
Perform the final WhoAdvice cluster sync after every complete article has passed its individual factual, editorial, human-centered, on-page SEO, and mechanical audits.

[PASTE CLUSTER ROOT]
[PASTE PAGE INVENTORY AND PAGE-OWNERSHIP MAP]

Follow the route in `reference/README.md`, especially the fact-checking policy, banned AI patterns, human-centered writing standard, `18-on-page-seo-checklist.md`, canonical article lifecycle, and this final cluster-sync reference. Do not load optional handbooks or prompt recipes unless an unresolved issue requires them.

1. Inventory the pillar, commercial support pages, and informational or tip pages. Identify briefs or incomplete packages without drafting them.
2. Confirm one primary intent and keyword owner per URL. Flag cannibalization, scope leakage, duplicated FAQ ownership, and thin support pages.
3. Confirm shared exact-product names, models, variants, awards, specifications, area permissions, safety wording, destination records, and source boundaries agree everywhere they appear.
4. Audit each final article's first sentence. Prefer one interesting, decision-bearing controlling question when it fits naturally; use a direct answer when that is clearer. When a question is used, the next sentence must begin answering it, the major sections must resolve it in a useful order, and the conclusion must close it. Remove forced questions, question stacks, and generic curiosity hooks.
5. Run a separate human-writing pass. Remove generic framing, catalog summaries, repetitive syntax, fake empathy, fake experience, robotic transitions, repeated caveats, empty praise, and conclusions that merely summarize. Preserve evidence strength and approved rankings.
6. Run the on-page SEO checklist for every page. Confirm title, H1, metadata, slug, opening, heading hierarchy, intent coverage, useful links, image and alt-text handoff, schema notes, and page-role boundaries without keyword stuffing.
7. Add or retain at least one meaningful callout only where it shortens a difficult decision, comparison, action, warning, or compatibility check. Do not add decorative callouts or repeat surrounding prose.
8. For every product roundup, add a generation-ready prompt for a useful types-card or type-decision visual when the category framework benefits from a graphic. Keep all essential labels and decisions in HTML.
9. For every tip, technique, or safety article, select only the images required to explain an action, sequence, boundary, anatomy, measurement, or manual symbol. Mark the insertion point and add a precise image-generation prompt, filename, alt-text intent, prohibited content, and human-review requirement. Free-stock services may be recommended for neutral lifestyle context, but verify the individual license and do not use stock as proof of an exact product, technique, result, or medical permission.
10. Audit the internal-link graph in both directions. Every link must help the next decision, use descriptive anchor text, resolve to the intended live page, and respect the cluster's page ownership.
11. Synchronize article.md, article-contract.md, content-brief.md when affected, sources.md when claims change, publisher-handoff.md, and audit.md. Do not mark CMS-owned or publication-day work as editorial failure.
12. Run the mechanical audit on every complete article, run git diff --check, and scan the cluster for stale statuses, paths, product names, counts, dates, and handoff language.

Return:

A. Cluster status: blocked, needs_revision, or ready_for_editorial_review
B. Page inventory and ownership
C. Cross-page inconsistencies found and resolved
D. Per-page on-page SEO and human-writing result
E. Opening-hook and answer-path check, including whether any question earns its place
F. Callout map
G. Image-generation and free-stock plan
H. Internal-link graph and missing reciprocal links
I. Mechanical audit results
J. Remaining medical, editorial, CMS, licensing, and publication-day gates

Do not claim publication readiness solely because scripts pass. Do not generate or publish images unless explicitly requested. Do not overwrite unrelated user work.
```

## Definition of done

- Every complete page keeps a distinct intent and keyword owner.
- Shared facts and exact products agree across the cluster.
- Every final introduction leads with the useful decision or answer; any controlling question fits naturally and is resolved by the article.
- Human-centered edits preserve evidence while removing generic, template-driven prose.
- Every page passes the on-page SEO and mechanical checks.
- Callouts are meaningful and nonrepetitive.
- Roundup type visuals and required tip-article visuals have usable prompts, placements, filenames, alt-text intent, and review boundaries.
- Internal links form a useful, non-cannibalizing network.
- Contracts, handoffs, audits, and article copy are synchronized.
- Remaining human review, licensing, CMS, and time-sensitive checks are explicit.
