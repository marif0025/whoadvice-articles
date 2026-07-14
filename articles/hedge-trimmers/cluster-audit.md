# Hedge-trimmer content-cluster audit and implementation plan

**Audit date:** July 14, 2026  
**Market:** United States / Amazon.com  
**Evidence model:** Local article, source, product-snapshot, contract, and handoff inspection plus current manufacturer and CPSC verification. No WhoAdvice hands-on testing.  
**Workflow status:** Part 1 audit/research packet. Phase 1 structural links and canonical paths were approved and implemented in Markdown on July 14, 2026. Product-ranking, award, package, and review-copy changes remain behind approval.

## Executive decision

Keep `best-hedge-trimmers` as the mixed-power hub and treat the corded and cordless pages as commercial-intent branches. The hub should help a reader choose a power/reach format, then send readers who have chosen corded or cordless to the deeper guide. Each branch should link back to the hub for readers still comparing formats, and corded and cordless should cross-link only where the copy explicitly discusses switching power formats.

The topology, canonical-path, shared-product evidence, and affiliate-approval gaps identified in the initial audit are resolved:

1. Shared product facts are synchronized for the three overlapping products. The BEHT350FF weight is 6.5 lb in both articles, and the WG261 runtime conflict is disclosed without an unsupported duration inference.
2. Amazon Gate 1 and publisher Gate 2 approval are complete for all eleven normalized ranked product records across the cluster.

## Local topology and intent map

| Page | Intended role | Primary intent | Current inbound/outbound cluster links | Required role boundary |
|---|---|---|---|---|
| `/garden-tools/best-hedge-trimmers/` | Hub / mixed-format roundup | Choose the best format and a broad-use winner | Links to both branches from types and package guidance | Own format selection, mixed shortlist, tall/pole need, and broad “best hedge trimmer” query |
| `/garden-tools/best-corded-hedge-trimmers/` | Corded commercial branch | Compare current corded models | Links to hub and cordless branch | Own outlet/cord-layout decision, extension-cord cost, compact vs 22-inch vs saw-tip corded models |
| `/garden-tools/best-cordless-hedge-trimmers/` | Cordless commercial branch | Compare current cordless kits | Links to hub and corded branch | Own battery platform, loaded weight, runtime evidence, kits, capacity, and cordless-only comparison |

### Canonical/taxonomy decision

The publisher approved `/garden-tools/` as the canonical category for hedge-trimmer content. All three Markdown drafts and publisher handoffs now use that path. If older `/home-garden/` or `/outdoor/` URLs were published, redirect each old URL once to its corresponding `/garden-tools/` canonical; do not leave multiple indexable versions.

## Internal-link placement and anchor map

These safe structural edits were implemented in the Markdown drafts after the publisher confirmed the `/garden-tools/` canonical. They do not change rankings, awards, packages, or product claims.

| Source | Exact placement | Suggested anchor | Destination | Reader purpose |
|---|---|---|---|---|
| Hub | `Which type...` → cordless paragraph, final sentence | `compare the best cordless hedge trimmers` | Cordless branch | Continue after choosing cable-free power |
| Hub | Existing corded paragraph | Keep `guide to the best corded hedge trimmers` | Corded branch | Continue after confirming a simple cable route |
| Hub | `How to choose...` → `Check what the cordless package includes` | `cordless hedge-trimmer kits` | Cordless branch | Deepen battery/package comparison without a second exact-match anchor |
| Cordless | Introduction after the power-format decision | `compare corded, cordless and pole hedge trimmers` | Hub | Return readers who have not actually chosen a format |
| Cordless | Buying guide → complete kit cost | `corded hedge trimmers` | Corded branch | Offer the lower-cost continuous-runtime alternative where outlet access is easy |
| Corded | Introduction after the outlet-route test | `compare all hedge-trimmer types` | Hub | Return uncertain readers to mixed-format guidance |
| Corded | Buying guide → outlet-to-hedge route decision rule | `best cordless hedge trimmers` | Cordless branch | Give a direct escape route when cable routing fails |

Implementation rules:

- Use one strong hub-to-branch link plus, at most, one secondary contextual link per branch.
- Do not place product-name anchors to the branch pages; the destination is a category comparison, not a single-product review.
- Do not repeat the exact primary keyword as every anchor.
- Add `BreadcrumbList` relationships consistently after the taxonomy decision.
- Keep affiliate buttons pointed at exact product/package destinations, never at internal branch pages.

## Product-overlap matrix

| Exact product/package | Hub | Corded branch | Cordless branch | Ranking/award consistency | Specification/package consistency | Review differentiation needed |
|---|---|---|---|---|---|---|
| EGO POWER+ HT2601 kit, 2.5 Ah battery + charger, ASIN `B0BRXK7NT2` | #1, Best Overall | — | #1, Best Overall | Consistent and defensible: broad mixed-format winner and broad cordless winner | Blade, 1.2-inch stated capacity, handle, package, and 6.92-lb bare weight agree. Cordless branch additionally calculates about 9.7 lb loaded from official component figures; hub does not. | Hub: explain why it beats other power formats for broad mature hedges. Cordless: compare directly with HT2501, Greenworks, and WG261 on loaded weight, controls, battery, and session tradeoffs. Do not reuse the same broad-hedge lead sentence. |
| WORX WG261 kit, 2.0 Ah battery + charger, ASIN `B07MVLYF7L` | #4, Best Lightweight Cordless Kit | — | #4, Best Lightweight Option | Consistent use case; label wording can differ by scope | 22-inch blade, 3/4-inch capacity, 5.5-lb loaded weight, and kit agree. Both articles now state or respect the manufacturer runtime conflict without promising a single duration. | Hub: position as the light mixed-format alternative. Cordless: quantify its weight advantage versus every cordless rival, disclose runtime conflict, and distinguish kit `WG261` from bare tool `WG261.9`. |
| BLACK+DECKER BEHT350FF, corded trimmer only, ASIN `B07CBYR1DN` | #3, Best Budget Corded / top-card “Best corded option” | #1, Best Overall | — | Scope-dependent and acceptable; the hub consistently uses Best Budget Corded while the corded branch uses Best Overall | Motor, blade, capacity, cord retention, and included trimmer agree. Both articles use the current official 6.5-lb figure. | Hub: compare corded economics and cable constraint against cordless/pole options. Corded: explain why it beats four corded peers on blade/weight/capacity/support/value. Keep the branch’s outlet and extension-cord analysis unique. |

### Shared-review strengthening rules

Use a “same facts, different decision” model:

- Maintain one normalized fact block per exact model/package and synchronize identity, blade, stated capacity, weight definition, included items, warranty, recall status, and retailer ASIN from it.
- Let awards vary only with declared page criteria. “Best Overall” for HT2601 in both hub and cordless is not cannibalization by itself; the supporting comparison must be scope-specific.
- Give the hub 60–90 words focused on format choice and why the model survives comparison against corded and pole alternatives.
- Give the branch 100–160 words across the approved card fields focused on within-format competitors, platform cost, loaded weight, controls, runtime evidence, and closest alternative.
- Reuse specifications, not sentences. Avoid matching verdict openings, pro ordering, and the same main drawback formulation.
- Add one explicit “choose this over X when...” distinction in each branch review. Keep the hub distinction at the format level.
- Do not turn manufacturer cut capacity or runtime into observed performance. Attribute runtime, and label capacity as stated/maximum.
- Do not assert recurring durability, comfort, or battery-life patterns until the review-analysis protocol has a dated sample from more than one source.

## Cross-article exact-model and Amazon destination audit

| Article | Exact model/package | Current recorded destination | ASIN/destination status | Required action before publication |
|---|---|---|---|---|
| Hub | EGO HT2601 kit | `https://www.amazon.com/dp/B0BRXK7NT2` | Exact kit recorded; local July 14 evidence saw no featured offer, while publisher later recorded manual commercial approval | Recheck exact variation, seller/fulfillment, stock, price, and affiliate eligibility at publication |
| Hub | DEWALT DCHT821B tool only | `https://www.amazon.com/dp/B0DVHTSWX6` | Exact bare-tool destination recorded | Button must say `tool only`; do not inherit P1-kit facts |
| Hub | BLACK+DECKER BEHT350FF | `https://www.amazon.com/dp/B07CBYR1DN` | Same ASIN as corded branch | Recheck seller, stock, price, and affiliate redirect before publication |
| Hub | WORX WG261 kit | `https://www.amazon.com/dp/B07MVLYF7L` | Exact kit recorded; local evidence observed out of stock before publisher approval | Confirm the selected variation includes 2.0 Ah battery and charger, not `WG261.9` bare tool |
| Hub | DEWALT DCPH820M1 kit | `https://www.amazon.com/dp/B084CZXM9V` | Exact kit recorded | Confirm 4.0 Ah battery, charger, strap, and sheath remain included |
| Corded | BLACK+DECKER BEHT350FF | `https://www.amazon.com/dp/B07CBYR1DN` | Exact destination recorded | Same identity/action as hub; avoid separate conflicting destination metadata |
| Corded | BLACK+DECKER BEHTS300 | `https://www.amazon.com/dp/B077ZC3NGZ` | Exact 20-inch sawblade model confirmed by publisher | Recheck seller, stock, price, and affiliate redirect before publication |
| Corded | Greenworks 22122 | `https://www.amazon.com/dp/B0069Z7JV8` | Exact model confirmed by publisher; older specification records conflict | Use manual values and confirm the 22122 variation, not 2200102 |
| Corded | BLACK+DECKER BEHT100 | `https://www.amazon.com/dp/B08LYYWBWN` | Exact compact model confirmed by publisher | Recheck seller, stock, price, and affiliate redirect before publication |
| Cordless | EGO HT2601 kit | `https://www.amazon.com/dp/B0BRXK7NT2` | Same exact ASIN as hub | Maintain one shared destination record and publication-day status check |
| Cordless | Greenworks HT40B212 kit | `https://www.amazon.com/dp/B086PSCXJT` | Exact ASIN recorded; loaded weight remains unknown | Confirm 2.0 Ah kit variation, seller/stock, and warranty; do not infer loaded weight |
| Cordless | EGO HT2501 kit | `https://www.amazon.com/dp/B09C2S51F5` | Exact 2.5 Ah kit recorded; earlier no featured offer, later publisher approval recorded | Recheck live commercial fields and exact kit contents |
| Cordless | WORX WG261 kit | `https://www.amazon.com/dp/B07MVLYF7L` | Same exact ASIN as hub | Maintain one shared destination record; prevent bare-tool variation drift |
| Cordless | BLACK+DECKER LHT2436 kit | `https://www.amazon.com/dp/B00602J4MM` | Exact ASIN recorded through dated marketplace evidence | Confirm current 1.5 Ah battery-and-charger package and manufacturer support before publication |

### Amazon approval model

The cluster uses two gates:

1. **Gate 1 — Codex research approval:** verify the exact model and package, valid Amazon.com US ASIN and live URL, battery/charger or tool-only configuration, current manufacturer support, variation integrity, discontinuation status, exact-model recalls, and enough evidence for comparison. A missing Buy Box or temporary stock issue becomes an availability warning rather than an automatic identity failure.
2. **Gate 2 — publisher commercial approval:** manually confirm the selected Amazon variation, current availability, seller/fulfillment as required, affiliate eligibility, and successful affiliate-link generation. Codex does not infer this status.

A publication-day price, stock, seller, and redirect check is a freshness check, not a third approval gate. All eleven normalized product records used across the three rankings have recorded exact Amazon and publisher-approved affiliate destinations; Gate 1 and Gate 2 are complete.

### Amazon governance recommendation

Create a single cluster-level destination register keyed by `brand + exact model + package`, with ASIN, canonical raw URL, included items, Gate 1 status, Gate 2 status, last checked date/time, seller, fulfillment, stock, and price. Article handoffs should reference that record rather than independently maintaining shared ASIN notes. Search-result URLs do not qualify as product destinations.

## Consistency findings by severity

### Fix before publication

1. **Completed — BEHT350FF weight:** the hub table, summary, pro, and claim ledger now use the current manufacturer-listed 6.5 lb.
2. **Completed — reciprocal topology:** the seven mapped hub/branch links are now in the Markdown drafts.
3. **Completed — canonical taxonomy:** all three drafts and handoffs now use `/garden-tools/`; redirects, sitemap, and breadcrumbs remain CMS work.
4. **Completed — WG261 runtime:** the hub now states that published runtime answers conflict and does not infer a single session length.
5. **Completed — corded retailer destinations:** the four selected corded models now have exact Amazon and affiliate destinations confirmed by the publisher.

### Strengthen during approved review revision

1. **Completed:** the BEHT350FF hub top card and product card now use the approved Best Budget Corded award.
2. Add HT2601 loaded weight to the hub only if the calculation and component source are recorded consistently; never mix it with the official bare-tool figure.
3. Give the hub’s shared reviews explicit cross-format distinctions; give branch reviews named within-format alternatives.
4. Record warranty consistently for shared models where it materially affects value.
5. Separate package identity from platform identity: `WG261` kit vs `WG261.9` tool only; `DCHT821B` bare tool vs `DCHT821P1` kit; `HT2601` kit vs `HT2600` bare tool.
6. **Completed:** the cordless source register retains the dated discovery warnings and appends the publisher Gate 2 confirmation.

## Recommended supporting articles

| Priority | Proposed article | Primary intent | Cluster value and internal-link role |
|---:|---|---|---|
| 1 | Corded vs cordless hedge trimmer: which should you buy? | Commercial comparison | Bridges all three commercial pages; owns format decision details so the hub can stay concise |
| 2 | What size hedge trimmer do I need? Blade length and tooth gap explained | Pre-purchase informational | Supports every roundup; resolves the repeated blade-length/capacity confusion without duplicating product rankings |
| 3 | Best pole hedge trimmers for tall hedges | Commercial investigation | Expands the hub’s reach intent and gives DCPH820M1 a dedicated competitive context |
| 4 | Hedge trimmer vs loppers vs pruning saw | Informational/comparison | Captures thick-branch intent and limits unsafe/overstated capacity claims across product pages |
| 5 | How to use a corded hedge trimmer without cutting the cable | Safety/how-to | Deep support for corded branch; source from manuals, CPSC, and extension guidance, not product marketing |
| 6 | How to clean, lubricate and store hedge-trimmer blades | Maintenance/how-to | Addresses recurring owner questions and links from both branches without bloating buying guides |
| 7 | Hedge-trimmer battery guide: voltage, Ah, Wh and platform costs | Pre-purchase informational | Supports cordless guide’s platform/cost intent and prevents voltage-as-performance claims |
| 8 | When to trim hedges without disturbing nesting birds | Seasonal/safety informational | Useful seasonal authority page; requires region-specific wildlife guidance and should not be generalized across markets |

Avoid launching model-vs-model pages until the three roundups are synchronized. Thin comparisons for shared products would compete with stronger branch reviews unless they answer a demonstrated head-to-head query and contain materially deeper evidence.

## Phased implementation plan and approval gates

### Phase 0 — CMS decision (required first)

- **Approved:** use `/garden-tools/` for all hedge-trimmer canonical paths.
- **Approved:** keep internal links in the Markdown drafts.
- **Approved retailer requirement:** Amazon. Every commercial button still requires an exact-model/package ASIN and publication-day seller, stock, variation, and affiliate verification.

### Phase 1 — safe structural implementation

- **Completed in Markdown:** added the seven mapped internal links with varied descriptive anchors.
- **Completed in drafts/handoffs:** synchronized the `/garden-tools/` slug and canonical records.
- **Pending CMS:** synchronize breadcrumbs, sitemap, related-content modules, and any redirects from older paths.
- **Pending publication freshness:** create the live cluster-level exact-package/ASIN destination register after each required exact listing passes publication-day checks.

### Phase 2 — objective fact corrections

- **Completed:** corrected BEHT350FF to 6.5 lb across the hub.
- **Completed:** reworded the unsupported WG261 recharge con.
- **Completed:** appended publisher confirmation without overwriting dated discovery notes.
- **Completed:** reran targeted consistency searches for shared models, packages, awards, claims, and ASINs.

These approved evidence corrections are reflected in the current drafts.

### Phase 3 — shared-review differentiation

- Rewrite only the three shared product cards and directly affected comparison/top-pick fields.
- Preserve approved product order unless fresh evidence changes eligibility.
- Use the hub-versus-branch differentiation rules above; do not rewrite unrelated products.
- Stop for approval of any award, ranking, inclusion, exclusion, or package change before drafting.

### Phase 4 — publication QA

- Recheck exact model, package, availability, seller, fulfillment, price, warranty, and recall status on the publication date.
- Run the project mechanical audit on all three articles.
- Validate links, canonicals, breadcrumbs, ItemList/Article schema, mobile tables, and redirect behavior.
- Record responsible human editorial review.

### Phase 5 — supporting-content rollout

- Publish priorities 1–4 first, then measure impressions, query overlap, internal-link clicks, and ranking changes before expanding maintenance and seasonal content.
- Assign one primary keyword and one canonical owner per intent; do not duplicate ranked product lists in informational support pages.

## Final audit status

The hub/branch topology, scope-specific awards, exact-model records, affiliate gates, and objective evidence corrections are approved and synchronized. Remaining work is publication-day freshness and CMS implementation: seller, stock, price, redirect, recalls, images, schema, mobile tables, breadcrumbs, sitemap, and human editorial review.
