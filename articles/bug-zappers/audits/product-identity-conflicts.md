# Bug-zapper product identity conflict register

**Status:** Preliminary identity discovery; no exact model or placement approved
**Date:** July 20, 2026
**Scope:** Conflicts visible across current WhoAdvice copies and initial primary-source discovery

## Rules

- A spelling, punctuation, wattage, or retailer-title resemblance is not enough to merge records.
- Normalize only after brand, product line, exact model, region, generation, and package agree.
- Keep aliases in one record only after a primary source establishes that they refer to the same product.
- A current brand page proves that a model is marketed; it does not approve ranking, efficacy, availability at the required retailer, or page placement.
- Dual-rated products follow the strongest-verified-use-case rule in `topology-audit.md`.
- Manufacturer coverage is stored as a claim with an interpretation limit, not as independently verified performance.

## Conflict register

| Candidate identity | Observed location(s) | Conflict/risk | Preliminary evidence | Current status | Next required check |
|---|---|---|---|---|---|
| Flowtron `FC8800` / `FC-8800` / `FLWFC8800` | Flowtron page; mosquito-killer page | Punctuation and SKU alias; current article omits hyphen in one location | Flowtron's current site uses `FLWFC8800` on the product/SKU side and `FC-8800` in compatible-parts and warranty language | Likely aliases; unresolved package/market record | Open exact product page and manual; confirm official display model, voltage, package, and current status |
| Flowtron `FC7600` / `FC-7600` | Flowtron page | Same punctuation/alias risk | Flowtron current product content shows both forms and SKU `FLWFC7600` | Likely aliases; identity not approved | Exact manual, product label, and current package |
| Flowtron `BK-15` / `BK-15D` | Flowtron page | Current article ranks `BK-15`; current brand collection uses `BK-15D` | Flowtron collection and warranty list `BK-15D` | Material model-name conflict | Determine whether `BK-15` is shorthand, obsolete, or a distinct model |
| Flowtron `BK-40D` | Outdoor and Flowtron pages | Same exact candidate across two page jobs | Current Flowtron collection lists `BK-40D` as a 40W outdoor model | Shared candidate; placement locked | Exact manual/package plus later shared-product placement approval |
| Flowtron `BK-80D` | Flowtron page | Article claims must match current outdoor model, package, and manual | Current Flowtron collection lists `BK-80D` as an outdoor model | Current-model candidate only | Manual, retailer eligibility, recalls, and exact package |
| `SOBZ-01` under Kiies and Evolpol | Solar page | Same identifier is assigned to different brands | No primary-source resolution collected | High identity-conflict risk | Brand/manufacturer pages, manuals, packaging images, ASIN/UPC, and seller/variant histories |
| Wulyno `SJZ-071` | Outdoor and solar pages | Possible exact same solar model duplicated across category pages | Current production text only | Shared candidate; identity and ownership unresolved | Manufacturer/manual and power-source verification; later page-job decision |
| BLACK+DECKER `BDPC971`, `BDPC972`, `BDPC973` | Mosquito-killer page | Closely numbered family may represent materially different sizes/packages or stale variants | Current production text only | Family conflict | Official model pages/manuals and package mapping for each number |
| DynaTrap `DT2000XLPSR`, `DT152`, `DT1050` | Pillar, indoor, mosquito killer | Same brand but distinct model numbers and potentially different mechanisms/locations | Current production text only | Keep separate candidates | Exact primary source and mechanism/location classification for each |
| Zevo “Model 4” / “Model 5” | Indoor page | Consumer-facing labels may not be durable exact model/package identifiers | Current production text only | Identity insufficient | Packaging/model number, refill compatibility, generation, and current US listing |
| “New Fi 24MW” | Outdoor page | Product title may contain wattage but no durable model identifier | Current production text only | Identity insufficient | Brand, exact model, package, manufacturer/manual, and retailer variation |
| “GOOTOP Zap T6 Pro” | Outdoor page | Brand/model string requires confirmation against exact listing and manual | Current production text only | Candidate only | Manufacturer/manual, ASIN/variant integrity, and current US availability |

## Preliminary Flowtron lineup evidence

The current [Flowtron bug-zapper collection](https://flowtron.com/collections/bug-zappers) presents a material product family, including BK-15D, BK-40D, BK-80D, higher-wattage outdoor products, and multiple indoor/commercial formats. Flowtron's [warranty page](https://flowtron.com/pages/warranty) and [FC-series transformer page](https://flowtron.com/products/flowtron-replacement-transformer-for-fc-7600-fc-7800-fc-8800) corroborate several model aliases.

This supports a provisional **product-depth signal**, not retention. The existing WhoAdvice page still mixes outdoor, indoor, and commercial decisions and must prove a distinct job beyond the outdoor page.

## Coverage storage template

```yaml
advertised_coverage:
  value: null
  unit: null
  source_url: null
  source: manufacturer
  accessed: null
  evidence_type: manufacturer_claim
  interpretation_limit: Does not establish mosquito attraction, entry, kill rate, abundance, human landing rate, bite rate, population reduction, or disease-risk reduction
```
