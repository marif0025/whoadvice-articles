# Hedge-trimmer cluster — Final Article Audit

**Audit date:** July 15, 2026  
**Scope:** Five completed hedge-trimmer articles, their approved contracts, research packets, source files, publisher handoffs, shared product records, destination register, and cluster-link architecture  
**Evidence model:** Local approved evidence and dated verification records; no new hands-on testing and no inference of missing specifications  
**Overall status:** `ready_for_editorial_review`  
**Recommended next action:** `manual_editorial_review`

> **Status addendum — July 16, 2026:** This file is a historical five-article audit and retains that original scope. The sizing, tool-selection, sharpening, cleaning, and safe-use packages were completed and audited afterward, bringing the cluster to ten complete article packages. References below to brief-only destinations or five completed articles describe the July 15 snapshot, not current workspace status. Current page status lives in each article's `audit.md` and `publisher-handoff.md`.

## Severity counts

| Severity | Count |
|---|---:|
| Blocker | 0 |
| Critical | 0 |
| Warning | 7 |
| Suggestion | 3 |

The gate is clear because no blocker or critical finding remains. This is readiness for a responsible human editor, not publication approval. The warnings below must remain visible in the CMS handoff and publication checklist.

## Articles audited

| Article | Contract and intent | Evidence and product consistency | Human-centered edit | SEO and mechanics | Gate |
|---|---|---|---|---|---|
| `best-hedge-trimmers/article.md` | Pass | Pass with dated live checks | Pass | 0 mechanical flags | `ready_for_editorial_review` |
| `best-corded-hedge-trimmers/article.md` | Pass | Pass with dated live checks | Pass | 0 mechanical flags | `ready_for_editorial_review` |
| `best-cordless-hedge-trimmers/article.md` | Pass | Pass with visible unknowns | Pass | 0 mechanical flags | `ready_for_editorial_review` |
| `best-pole-hedge-trimmers/article.md` | Pass | Pass with visible unknowns | Pass | 2 parser-only density notices | `ready_for_editorial_review` |
| `corded-vs-cordless-hedge-trimmer/article.md` | Pass | Pass | Pass | 0 mechanical flags | `ready_for_editorial_review` |

The mechanical audit counted 2,356, 4,024, 2,653, 3,165, and 1,888 words respectively. Each draft sits inside its approved target range. Inspection confirmed that the pole article's two density notices join list labels and the following affiliate link during Markdown parsing; they do not identify an actual overloaded prose sentence.

## Findings

### Final publication risks

#### HT-AUD-01

- **Severity:** warning
- **Category:** Final publication risk
- **Section:** Cluster internal links
- **Article quote:** `Our guide to choosing the right hedge-trimmer size...` and `compare a hedge trimmer with loppers and pruning saws...`
- **Issue:** Resolved in the workspace July 16: both destinations now have complete article packages. They still require live-CMS URL verification before publication.
- **Reason:** Complete local drafts prevent the former brief-only gap, but unpublished CMS destinations can still create dead navigation.
- **Recommended action:** Publish or stage both destinations and verify their live URLs before retaining the links.
- **Reference:** The completed sizing and tool-selection packages and `best-pole-hedge-trimmers/publisher-handoff.md`.

#### HT-AUD-02

- **Severity:** warning
- **Category:** Affiliate and destination freshness
- **Section:** All commercial product links
- **Article quote:** `Check price on Amazon`
- **Issue:** The shared register records publisher-confirmed links for 15 exact packages, but seller, fulfillment, stock, price, selected variation, package contents, and redirect behavior are time-sensitive.
- **Reason:** Gate 1 and Gate 2 approval do not guarantee that a marketplace destination remains correct on publication day.
- **Recommended action:** Recheck every destination immediately before publication; preserve tool-only and bare-tool labels for DCHT821B, WG252.9, and LPHT120B; apply `rel="sponsored"` in CMS.
- **Reference:** `products/destination-register.md` governance rules and each publisher handoff.

#### HT-AUD-03

- **Severity:** warning
- **Category:** Recall and current-status freshness
- **Section:** Methodology and publication checks
- **Article quote:** `No exact-model recall was identified in the CPSC search conducted on July 15, 2026.`
- **Issue:** Recall and manufacturer-status checks are dated research records, not evergreen facts.
- **Reason:** A clean dated search cannot be represented as permanent recall-free status.
- **Recommended action:** Repeat exact-model CPSC and manufacturer-status checks on publication day and preserve the search date in editorial records. Do not describe any model as recall-free.
- **Reference:** `best-pole-hedge-trimmers/article.md`, research methodology; all publisher handoffs.

#### HT-AUD-04

- **Severity:** warning
- **Category:** Human editorial gate
- **Section:** All five packages
- **Issue:** No responsible human approval is recorded for the complete cluster after this Final Article Audit.
- **Reason:** The workflow defines `ready_for_editorial_review` as an audit result, not publication approval.
- **Recommended action:** Have a responsible editor answer the six questions in `reference/16-human-centered-writing-and-editing.md`, approve or return each page, and record the decision before CMS publication.
- **Reference:** `reference/11-article-workflow.md`, Stage 14; `reference/16-human-centered-writing-and-editing.md`, Human editorial gate.

### Package synchronization

#### HT-AUD-05

- **Severity:** warning
- **Category:** Exact-package handoff
- **Section:** `best-hedge-trimmers/publisher-handoff.md`
- **Article quote:** `Verify the FF package against the researched BEHT350 before publication.`
- **Issue:** The handoff note shortens the approved exact model `BEHT350FF` to `BEHT350`.
- **Reason:** The article, product record, ASIN, and destination register consistently approve `BEHT350FF`; the shortened reference introduces avoidable variation risk at CMS entry.
- **Recommended action:** During the next approved synchronization pass, replace the note with an exact `BEHT350FF` package check. Do not change the selected product or link.
- **Reference:** `products/black-decker-beht350ff.md` and `products/destination-register.md`.

#### HT-AUD-06

- **Severity:** warning
- **Category:** Metadata consistency
- **Section:** `best-corded-hedge-trimmers/publisher-handoff.md`
- **Article quote:** Article meta: `Compare four corded hedge trimmers for small shrubs, broad hedge faces, and occasional thick branches, with advice on blade length, weight, and cords.`
- **Issue:** The handoff contains a different meta description: `Compare four corded hedge trimmers for broad hedge faces, compact shrubs, angled cuts, and occasional thick branches.`
- **Reason:** Both are defensible, but two approved-looking values create CMS ambiguity and the handoff version omits the useful blade, weight, and cord decision terms.
- **Recommended action:** Select one canonical description during editorial review and synchronize the article, handoff, and CMS. The article version is the stronger decision-led candidate.
- **Reference:** `best-corded-hedge-trimmers/article.md` and `publisher-handoff.md`.

#### HT-AUD-07

- **Severity:** warning
- **Category:** Audit record status
- **Section:** `corded-vs-cordless-hedge-trimmer/publisher-handoff.md`
- **Article quote:** `status: Part 3 draft complete; Part 4 audit pending`
- **Issue:** The handoff status predates this completed cluster audit.
- **Reason:** Leaving the old status in place after editorial acceptance could cause the audited comparison page to be treated as incomplete.
- **Recommended action:** After the responsible editor accepts this report, synchronize the handoff status to `Final Article Audit complete; manual editorial review/CMS checks pending` and reference this report.
- **Reference:** Approved article contract, completed article, and this Final Article Audit.

### Optional editorial polish

#### HT-AUD-08

- **Severity:** suggestion
- **Category:** Product differentiation
- **Section:** Shared EGO HT2601, WORX WG261, BEHT350FF, and DCPH820M1 coverage
- **Issue:** Shared facts are synchronized and the page roles differ, but future revisions could drift toward repeated wording because the same exact products appear in hub and branch pages.
- **Reason:** Search intent is currently separated by format decision versus within-format comparison; repeated sentence structure would weaken that distinction even if the facts remain correct.
- **Recommended action:** Preserve the current `same facts, different decision` rule in every future edit and run a cross-article phrase check when shared cards change.
- **Reference:** `cluster-audit.md`, Shared-review strengthening rules.

#### HT-AUD-09

- **Severity:** suggestion
- **Category:** Reader navigation
- **Section:** Cluster rollout
- **Issue:** Resolved July 16: `what-size-hedge-trimmer-do-i-need` and `hedge-trimmer-vs-loppers-vs-pruning-saw` now have complete, audited informational packages.
- **Reason:** These pages now own the explanations repeatedly needed by the commercial roundups without duplicating product rankings.
- **Recommended action:** Verify their live CMS destinations and preserve their informational scope.
- **Reference:** `article-generation-hierarchy-audit.md` and the two content briefs.

#### HT-AUD-10

- **Severity:** suggestion
- **Category:** Audit tooling
- **Section:** Mechanical audit
- **Issue:** The audit script reports two false density notices when a Pros/Cons list boundary is followed by an affiliate link in the pole article.
- **Reason:** False positives add manual inspection work and can hide a real density issue in larger batches.
- **Recommended action:** Improve the script later so Markdown list labels, bullets, and standalone links form separate sentence boundaries. Do not rewrite the pole prose to satisfy these parser artifacts.
- **Reference:** Mechanical output for `best-pole-hedge-trimmers/article.md` and its existing `audit.md`.

## Topic coverage

| Reader decision | Canonical owner | Audit result |
|---|---|---|
| Choose among standard corded, cordless, and pole formats | `best-hedge-trimmers` | Covered; broad hub role remains clear |
| Compare exact corded models | `best-corded-hedge-trimmers` | Covered; outlet route and full cord setup remain leaf-specific |
| Compare exact cordless kits | `best-cordless-hedge-trimmers` | Covered; loaded weight, package, runtime evidence, and platform cost remain leaf-specific |
| Compare pole and long-reach tools | `best-pole-hedge-trimmers` | Covered; homeowner ranking and specialist gas alternative are visibly separated |
| Choose corded versus cordless power | `corded-vs-cordless-hedge-trimmer` | Covered; direct outlet-route answer appears early and no product ranking was introduced |
| Choose blade length and normal stated capacity | `what-size-hedge-trimmer-do-i-need` | Complete package; separately audited |
| Choose hedge trimmer versus loppers/pruning saw | `hedge-trimmer-vs-loppers-vs-pruning-saw` | Complete package; separately audited |

No serious cannibalization was found. The hub owns the format decision, each commercial leaf owns exact-model comparison inside its format, and the comparison page owns the mains-versus-battery decision without creating a second ranking.

## Unsupported or contradicted claims

No blocker-level unsupported or contradicted public claim was found.

The drafts correctly preserve these evidence limits:

- EGO cordless loaded weights are labeled as editorial calculations from official component figures.
- Greenworks HT40B212 loaded weight remains unpublished or unverified.
- WORX WG261 runtime remains conflicting rather than converted into one promise.
- DEWALT DCPH820M1 complete working weight remains unpublished or independently unverified.
- CRAFTSMAN's tested working weight and handling observations remain attributed; the conflicting retailer figure is not averaged.
- Cutting capacity and maximum reach remain manufacturer-stated limits, not WhoAdvice performance results.
- WhoAdvice hands-on testing is not implied.

## Verified critical facts at the July 15 audit

- All five articles in this historical audit scope had approved contracts, complete drafts, research packets, source files, and publisher handoffs. Five additional packages were completed afterward.
- The shared destination register contains one normalized ASIN and publisher-confirmed affiliate link for every active exact package.
- Shared products use consistent identities, packages, and destinations across the cluster.
- Public affiliate disclosures appear before the first commercial link on all four commercial roundups; the comparison guide contains no affiliate links.
- Top-pick introductions remain product-neutral where separate top-pick cards are used.
- Product order, awards, summary/verdict boundaries, package labels, and comparison tables match the approved page-specific contracts.
- The pole article preserves four numbered homeowner recommendations and keeps Husqvarna outside that ranking.
- The comparison page contains no rankings, awards, product cards, retailer links, or universal format winner.
- Heading hierarchy, keyword placement, metadata, and target lengths pass the local mechanical and manual review.

## Human-centered editorial result

The five articles pass the six ordered editing passes in the current standard:

1. **Intent:** Each opening identifies the actual choice early and serves its canonical page role.
2. **Structure:** Sections follow the reader's decision order; the hub, leaves, pole guide, and format comparison do distinct jobs.
3. **Evidence:** Specifications are tied to consequences, important unknowns remain visible, and manufacturer or independent claims are attributed.
4. **Sentence craft:** Paragraphs are short, decision points appear near the start, and no material density failure was found.
5. **Voice:** Copy is direct, practical, US-oriented, and avoids fake empathy, fake experience, catalog praise, and forced personality.
6. **Proof:** Names, models, packages, units, headings, disclosures, and shared destinations are consistent apart from the two handoff synchronization warnings above.

## Live checks required today

Immediately before publication:

1. Resolve every affiliate redirect and confirm exact model, package, seller, fulfillment, stock, price, and eligibility.
2. Recheck CPSC recalls and current manufacturer status for every selected exact model.
3. Confirm the now-complete sizing and tool-selection destinations are live in the CMS; otherwise defer those links.
4. Add licensed exact-model images and verify alt text does not show or imply a neighboring package.
5. Apply canonicals, breadcrumbs, sitemap/indexability controls, responsive tables, and truthful `Article`, `BreadcrumbList`, and `ItemList` markup.
6. Apply `rel="sponsored"` to affiliate links and keep the Amazon Associate disclosure before the first commercial destination.
7. Record responsible human editorial approval.

## Final gate

**Status:** `ready_for_editorial_review`  
**Next action:** `manual_editorial_review`

No writing revision is required before human review. After the editor accepts or resolves HT-AUD-05 through HT-AUD-07, synchronize only the affected handoff and metadata fields. Publication remains conditional on the live checks above.
