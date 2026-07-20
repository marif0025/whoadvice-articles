# Best Epilator Cluster Final Sync

- **Sync date:** July 20, 2026
- **Cluster root:** `articles/epilators/`
- **Status:** `ready_for_editorial_review`
- **Reference:** `reference/17-final-cluster-sync.md`
- **Evidence model:** Research-based commercial roundups plus exact-manual and authoritative-guidance support articles; no hands-on testing

This is the final cluster-level editorial sync. It does not grant publication approval. The intimate-area and underarm guides still require qualified medical review, and every page retains CMS and publication-day gates in its own handoff.

## Page inventory and ownership

| Page | Role and primary intent | Primary keyword owner | Status |
|---|---|---|---|
| `/skin-care/best-epilators/` | Commercial pillar; choose a mechanical epilator by area, head, power, package, and budget | `best epilator` | Ready for editorial review |
| `/skin-care/best-face-epilators/` | Commercial support; choose a dedicated electric or manual facial epilator | `best epilator for face` | Ready for editorial review |
| `/skin-care/can-you-use-an-epilator-on-pubic-hair/` | Informational safety support; establish exact-area and exact-function permission | `can you use an epilator for pubic hair` | Ready for medical and editorial review |
| `/skin-care/how-to-epilate-underarms/` | Informational technique support; follow exact-device underarm instructions and stop rules | `how to epilate underarms` | Ready for medical and editorial review |

No page duplicates another page's core job. The pillar owns broad product selection, the face page owns face-first commercial comparison, the pubic-hair guide owns exact-area permission, and the underarm guide owns technique and reaction actions.

## On-page SEO and human-writing result

All four pages pass the project on-page checklist at the editorial-file level:

- Unique title, H1, meta description, slug, primary intent, and page role
- Natural primary-keyword use in the opening and relevant page elements
- Valid H1/H2/H3 hierarchy and answer-first sections
- Evidence model and disclosure appropriate to commercial or informational intent
- Useful internal links without an arbitrary link quota
- Article-specific image plans, alt-text intent, and schema handoffs
- No banned generic-market opening, fake empathy, fake testing, inflated praise, question stack, catalog dump, or generic conclusion found in the final scan

Each current opening uses one question because it fits the page's actual decision. This is not a cluster template: the project rule now prefers a question only when it reads more naturally than a direct answer. Every question is answered immediately and carried through the article's decision order.

## Callout map

| Page | Callout | Job |
|---|---|---|
| Best epilators | `Type shortcut` | Orders the purchase decision as area, power, then head movement |
| Best facial epilators | `Electric or manual?` | Gives a format tie-breaker while preserving area approval as the first filter |
| Pubic-hair permission | `The three-yes check` | Prevents use until area, function, and current-skin checks all pass |
| Underarm technique | `Stop before you begin` and `Pause before switching sides` | Makes stop conditions visible at the points where the reader acts |

The callouts do not repeat surrounding prose solely for decoration. Their full meaning remains in HTML-friendly Markdown.

## Image and prompt map

| Page | Placement | Visual | Review boundary |
|---|---|---|---|
| Best epilators | Start of `Types of epilators` | Four-card mechanism, power, area, and head-motion decision graphic | Generic unbranded editorial illustration; product images still require exact-model verification |
| Best facial epilators | Start of `Types of facial epilators` | Two-card electric-versus-manual format graphic | Must not imply whole-face approval |
| Pubic-hair permission | After bikini-line terminology | Non-explicit orientation diagram | Qualified medical review required before production or publication |
| Underarm technique | Immediately before numbered steps | Four-panel manual check, taut skin, controlled movement, and cleaning sequence | Verify pose and device handling against exact cited instructions |

Generation-ready prompts, filenames, alt-text intent, prohibited content, and placement notes are synchronized in each `publisher-handoff.md`. Pexels and Unsplash are recommended only for optional neutral lifestyle context, with links to their official licenses; stock must not stand in for exact products, medical boundaries, or verified technique.

## Internal-link graph

```text
best epilators pillar
  <-> best facial epilators
  <-> pubic-hair exact-area permission
  <-> underarm technique and stop rules
```

- The pillar links to the face roundup inside the facial type explanation.
- The pillar links to the pubic-hair guide where bikini and precision names could be mistaken for permission.
- The pillar links to the underarm guide where treatment-area technique becomes relevant.
- Each support article returns to the pillar only for product selection.
- The three support pages do not cross-link merely to complete a mesh.
- CMS must verify the support URLs are live before activating the synchronized links.

## Cross-page consistency

- Mechanical epilators remain separate from IPL throughout the cluster.
- Product names, exact models, rankings, awards, and shared package distinctions remain unchanged.
- Facial, underarm, bikini-line, pubic-area, and genital permission is never inferred from a retailer category, attachment name, or neighboring body area.
- Philips manual examples remain exact-model evidence examples in the informational pages, not imported commercial winners.
- Commercial CTAs remain confined to the two roundups; the two support guides contain no product ranking or affiliate CTA.
- Shared evidence limitations and no-hands-on-testing disclosures remain consistent.

## Mechanical audit

| Article | Words | Headings | Flags |
|---|---:|---:|---:|
| Best epilators | 3,778 | 40 | 0 |
| Best facial epilators | 2,860 | 32 | 0 |
| Pubic-hair permission | 2,070 | 19 | 0 |
| Underarm technique | 2,035 | 27 | 0 |

All four were checked with:

```bash
python3 /mnt/c/Users/marif/.codex/skills/whoadvice-article-workflow/scripts/audit_article.py path/to/article.md
```

`git diff --check` passes after synchronization.

## Remaining gates

- Qualified medical review of the pubic-hair anatomy, permission, wound, reaction, and escalation wording
- Qualified medical review of the underarm technique, wound, reaction, and escalation wording
- Responsible human editorial approval for all four pages
- Exact product, variant, seller, fulfillment, stock, price, affiliate redirect, and recall refresh for both commercial roundups
- Individual image licensing or generated-image review, exact-model image checks, final captions, and composition-specific alt text
- Coordinated deployment so reciprocal internal links do not lead to missing or stale pages
- Canonical, metadata, schema, author/reviewer, indexability, sitemap, accessibility, mobile table, performance, and rendered-page checks

## Recommended next action

Send the two informational guides for qualified medical review and all four synchronized articles for responsible editorial review. After approval, complete each publisher handoff and deploy the cluster together.
