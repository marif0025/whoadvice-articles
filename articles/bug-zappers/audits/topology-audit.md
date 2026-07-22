# Bug-zapper cluster topology audit

**Status:** In progress under `topology_audit_execution_approved`
**Audit date:** July 20, 2026
**Scope:** Seven existing WhoAdvice production URLs plus the approved effectiveness support page
**Production mutation:** None authorized

## Evidence lanes and current gaps

| Evidence lane | Current state | How it may be used |
|---|---|---|
| Current raw production copy | Direct HTTP capture completed for all seven pages on July 20, 2026 | Structure, product names, visible claims, dates, and overlap |
| Earlier extraction failures | Reproduced in the text extractor for outdoor and racket, then resolved with direct HTTP requests | Extraction failure was not an HTTP/indexability failure |
| Canonical paths | Seven existing `/home-gadgets/` paths recorded | Preserve throughout this audit; no redirect decision |
| Search Console queries/clicks | Pending external export/access | Required for independent demand and cannibalization decisions |
| Backlinks/referring pages | Pending external export/access | Required before consolidation or redirects |
| Affiliate clicks/revenue | Pending external export/access | Required for business-value and Flowtron decisions |
| Exact manufacturer/manual evidence | Not yet collected product by product | Required before rankings, awards, specs, safety, or availability approval |

Absence of Search Console, backlink, or affiliate data is an unresolved evidence gap—not proof of zero value.

## Formal page-ownership matrix

| URL | Primary keyword | Secondary families | Intent | Included mechanisms | Excluded mechanisms | Product eligibility | Claims allowed now | Required internal links | Competing WhoAdvice URLs |
|---|---|---|---|---|---|---|---|---|---|
| `/home-gadgets/best-bug-zapper/` | best bug zapper | bug zapper; best insect zapper; zapper types | Commercial format selection | Representative stationary indoor/outdoor, solar, and handheld formats after research | Full branch rankings; broad mosquito control | Exact current models that represent distinct formats; later Part 1 approval required | Mechanism, fit, and verified product facts; no reliable mosquito-bite or population-control promise | Indoor, outdoor, solar, racket, effectiveness, mosquito alternatives | All commercial branches |
| `/home-gadgets/best-indoor-bug-zapper/` | best indoor bug zapper | indoor bug zapper; fly zapper indoor; plug-in trap; indoor gnat queries | Indoor product selection | Enclosed indoor electric, UV glue-board, and fan-assisted traps; guarded grid only if explicitly indoor-rated | Outdoor-only, solar-only, handheld, CO2/propane | Exact indoor-rated model with verified manual and defined target/use environment | Indoor nuisance capture/killing only at the exact evidence level; no universal fly/gnat/mosquito claim | Pillar, effectiveness; outdoor only for location uncertainty | Pillar; mosquito killer; outdoor |
| `/home-gadgets/best-outdoor-bug-zapper/` | best outdoor bug zapper | outdoor bug/fly zapper; plug-in outdoor zapper | Outdoor product selection | Open or guarded outdoor electric grids; dual-rated products when verified | Solar-only ranking, handheld, indoor glue boards, non-UV mosquito traps | Exact outdoor-rated current model with manual, mounting/power/weather evidence | Direct-contact killing and verified operating facts; environmental and mosquito limitations required | Pillar, solar, effectiveness, mosquito alternatives | Pillar; solar; Flowtron |
| `/home-gadgets/best-solar-bug-zapper/` | best solar bug zapper | solar-powered bug/mosquito zapper | Off-grid outdoor product selection | Solar-powered grid zappers only | Mains-only, handheld, generic solar lights | Exact solar grid model with verified charge, battery, runtime, weather, and service evidence | Power/placement and direct-contact mechanism only; no “solar mosquito protection” inference | Pillar, outdoor, effectiveness | Outdoor; pillar |
| `/home-gadgets/best-bug-zapper-racket/` | best bug zapper racket | best electric fly swatter; fly-zapper racket; mosquito bat | Active handheld selection | Handheld electric rackets; verified base/light mode as secondary feature | Passive stationary traps/zappers | Exact current racket with verified model, guard, switch/lock, charging/battery instructions | Active contact-kill use and exact safety controls; no unattended protection claim | Pillar, effectiveness | Pillar; indoor |
| `/home-gadgets/best-flowtron-bug-zapper/` | best Flowtron bug zapper | Flowtron comparison/model terms | Brand/model-family comparison | Current verified Flowtron mechanisms only | Other brands; obsolete/unverifiable models | Multiple meaningfully distinct current models plus independent traffic/link/revenue/SERP value | Exact product differences only after Part 1; no broad mosquito/coverage inference | Outdoor, pillar, effectiveness | Outdoor; pillar |
| `/home-gadgets/best-mosquito-killer/` | best mosquito killer | mosquito control; mosquito traps; repellents; larval control | Choose an evidence-appropriate mosquito-control approach | Source reduction, larval control where appropriate, personal/spatial repellents, barriers, fans, targeted traps, conventional-zapper limitations | Unrelated pest control, ultrasonic devices, undifferentiated spray/exterminator lists | Mechanism categories first; any products require separate evidence and intent approval | No single best mechanism for every environment; evidence-specific mosquito outcomes only | Effectiveness, pillar where zapper limitations arise | Pillar; effectiveness; outdoor |
| `/home-gadgets/do-bug-zappers-work/` | do bug zappers work | work on mosquitoes/flies/gnats; beneficial insects; how they work | Informational expectation setting | All controlled mechanisms for comparison/explanation | Ranked products and commercial awards | Products only as non-ranked mechanism examples with verified facts | Evidence-backed, insect- and outcome-specific conclusions | Pillar, indoor, outdoor, solar, racket, mosquito alternatives | All cluster pages if they retain effectiveness sections |

## Current-copy and product capture

| Page | Copy evidence | Products observed in current production copy | Audit note |
|---|---|---|---|
| Pillar | Raw copy; dated May 23, 2024 | DynaTrap DT2000XLPSR; FVOAI Zap X3 Pro; Buzbug MA-005 (NEW); AMUFER 918CE; Evolpol BK28; LUOJIBIE JY-05 | Mixes grid, fan/suction, sticky, solar, handheld, and propane/CO2 concepts under “zapper” |
| Indoor | Raw copy; dated June 3, 2024 | ZEVO Model 4; Safer SH502-2SR; DynaTrap DT152; KATCHY mwd-06; Buzbug MA-009; Fooxem IT10; VEYOFLY VF01T_BRANCO; Raid 341900; Zevo Model 5 | Mechanisms require normalization; model/package and current availability unverified |
| Outdoor | Current indexed copy; raw extraction failed | Flowtron BK-40D; New Fi 24MW; GOOTOP Zap T6 Pro; Wulyno SJZ-071 observed | Recapture raw page before rewrite; disease-spread language is a priority claim issue |
| Solar | Raw copy; dated June 4, 2024 | PALONE LT808S; Kiies SOBZ-01; Evolpol SOBZ-01; Wulyno SJZ-071; GTERT BK21; GreenStrike 980 | Duplicate model string `SOBZ-01` across brands is an identity-conflict flag |
| Racket | Current indexed copy; raw extraction failed | YISSVIC WD-981-B; GeckoMan BUGZILLA2201; Mosiller EF009; ZAP IT! ZAPITRCHG-MTY; Mosiller WD-942; Buzbug WD-956A; YISSVIC WD-981-A1W; YISSVIC WP2011 | Recapture raw page and verify exact model/variant identifiers before Part 1 |
| Flowtron | Raw copy; dated June 3, 2024 | Flowtron FC8800; BK-40D; BK-80D; BK-15; FC7600 | BK-40D overlaps outdoor; current model depth and independent value unresolved |
| Mosquito killer | Raw copy; dated October 4, 2023 | VOLTORB BFT-52T; Flowtron FC-8800; Black+Decker BDPC973; BDPC971; PIC PFVT; SKEETER HAWK; BLACK+DECKER BDPC972; Flowtron MC9000; DynaTrap DT1050 | Current roundup is mostly UV/grid/fan devices and does not yet own the approved alternatives decision |

These are discovery records, not approved identities, placements, rankings, or awards.

## Initial product-overlap matrix

| Normalized candidate | Observed pages | Governance decision |
|---|---|---|
| Flowtron BK-40D | Outdoor; Flowtron | Keep one factual record; placement and verdict remain unapproved. Flowtron page must add a genuinely different comparison job or consolidate later. |
| Flowtron FC8800 / FC-8800 | Flowtron; mosquito killer | Treat punctuation as a possible variant of one model pending manufacturer confirmation. Do not duplicate specifications until resolved. |
| Wulyno SJZ-071 | Outdoor; solar | Verify whether the same exact solar model appears on both. Solar may own the full evaluation; outdoor may only use it as a routed example if approved. |
| DynaTrap family | Pillar DT2000XLPSR; indoor DT152; mosquito killer DT1050 | Distinct model candidates, not automatic duplicates. Classify mechanism and intended location separately. |
| BLACK+DECKER BDPC97x family | Mosquito killer | Resolve BDPC971/972/973 differences and current status before treating them as separate products. |

Shared-product rule: specifications and source evidence live once in `articles/bug-zappers/products/`; each page owns its contextual fit, caveats, verdict, and award. No cross-page placement is approved yet.

### Dual-rated product rule

A product verified for both indoor and outdoor use is assigned to the page where its strongest verified use case fits. A second page may mention it only when that page evaluates a materially different job. For example, indoor may evaluate guarding, enclosure, noise, and cleaning while outdoor evaluates weather rating, mounting, power routing, and non-target exposure. Never publish two nearly identical reviews of the same exact package.

### Manufacturer coverage data model

```yaml
advertised_coverage:
  value: null
  source: manufacturer
  evidence_type: manufacturer_claim
  interpretation_limit: Does not establish mosquito-bite, landing-rate, abundance, or population reduction
```

Use this model for outdoor, Flowtron, solar, mosquito-killer, and any dual-rated product record. A retailer-only coverage value remains unresolved until matched to the exact model and a primary source.

## Initial effectiveness-claim audit

| Page | Current claim pattern observed | Category | Required treatment |
|---|---|---|---|
| Pillar | “Bug-free” or equivalent whole-home outcome | Remove | Absolute outcome is not supported by mechanism or current evidence |
| Pillar | UV/grid devices described as highly effective for mosquitoes | Unsupported | Replace later with outcome-specific evidence; conventional UV-only devices must not imply bite reduction |
| Pillar | “Non-toxic,” “eco-friendly,” or safe for children/pets/environment | Unsupported | Do not infer broad safety or environmental benefit from no spray or a guard |
| Indoor | “Bug-free haven,” essential/healthy-home framing, broad mosquito/gnat/fly effectiveness | Unsupported | Identify insect and source; qualify capture/killing without promising elimination |
| Outdoor | Immediate relief from biting insects or reduced disease spread | Remove | High-risk health/effectiveness inference without direct evidence |
| Outdoor | Yard-wide protection or advertised coverage treated as performance | Needs qualification | Coverage is a manufacturer specification, not proof of bite/population reduction |
| Solar | “Bug-free,” “reliable protection,” broad mosquito control | Unsupported | Restrict later copy to verified power, mechanism, placement, and direct-contact function |
| Solar | “Eco-friendly” because it is solar | Unsupported | Solar power alone does not establish lifecycle or non-target impact |
| Racket | “Bug-free,” eco-friendly, universally safe around children/pets | Unsupported | Describe active contact use and exact design/manual controls only |
| Flowtron | Kills all insects/mosquitoes/pests, bug-free outcome, large-area protection | Unsupported | Identify target/attraction limits; do not convert advertised acreage into proven control |
| Mosquito killer | Devices framed as reliable mosquito killers or broad protection | Unsupported | Rebuild later around approved mosquito-control decisions and outcome-specific evidence |
| Any page | EPA establishment number treated as EPA approval, registration, safety, or efficacy certification | Remove | Explain device oversight accurately where relevant |

## Flowtron retention gate

**Current decision:** Pending; no redirect or retention approval.

Retain the standalone page only if at least one signal is meaningful and the page has a distinct comparison job: branded/non-branded traffic, valuable backlinks, affiliate clicks/revenue, multiple current models needing real comparison, or a SERP dominated by dedicated Flowtron comparisons. Before any consolidation, record destination ownership, redirect map, internal-link replacements, and backlink preservation.

## Next audit actions

1. Import Search Console query/page data, backlink data, and affiliate value when supplied.
2. Review `technical-indexing-audit-2026-07-20.md` and `exact-claim-locator-ledger.md`.
3. Review the expanded effectiveness endpoint matrix and claim categories.
4. Resolve items in `product-identity-conflicts.md` during preliminary identity discovery; do not approve products from that register.
5. Revisit Flowtron after Search Console, backlink, affiliate, and exact-lineup evidence is complete.
6. Request final topology approval before any URL, ranking, commercial contract, or production-copy change.
