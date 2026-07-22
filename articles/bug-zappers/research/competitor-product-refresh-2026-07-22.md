# Competitor and product-availability refresh: Bug zappers

**Research date:** July 22, 2026  
**Market:** United States  
**Scope:** Current commercial SERP, brand breadth, exact-product turnover, and Amazon eligibility

## Executive finding

The first WhoAdvice expansion over-indexed on Flowtron, PIC, and BLACK+DECKER because those brands exposed usable manuals or model identifiers. Current competitors cover more brands, but often trade exact-model certainty for a current retailer destination. WhoAdvice should copy the breadth and use-case structure, not the loose identity practice.

## Competitor handling

| Competitor | Freshness observed | Product handling | Useful lesson | Risk WhoAdvice should avoid |
|---|---|---|---|---|
| HGTV | Updated June 16, 2026 | Nine use-case awards across GOOTOP, Flowtron, BLACK+DECKER, Aspectek, OnBeam, Buzbug, Livin' Well, Pure Garden, and ZAP IT!; most route to Amazon | Refresh by use case and diversify brands | Several headings omit model numbers and rely on retailer title/ASIN for identity |
| Outdoor Life | Current 2026 page | Mixes mosquito traps, zappers, lanterns, and solar products; highlights testing for selected items | Explain mechanism and tested scope | Broader `mosquito trap` intent is not interchangeable with `bug zapper` intent |
| Popular Mechanics | 2024 update still ranking | Mixes Black Flag, Livin' Well, DynaTrap, BLACK+DECKER, Flowtron, and PIC | Brand breadth and ownership factors | Stale update and cross-mechanism comparisons can hide route/model drift |
| Forbes Vetted | Available current URL; product set previously surfaced in the SERP | ASPECTEK, Flowtron, Black Flag, DynaTrap, Katchy, a generic solar selection, and The Executioner | Covers indoor, outdoor, solar, and handheld jobs | Generic solar and title-level identities are difficult to audit later |

## Current competitor product map

HGTV's current nine-product set is the clearest availability benchmark:

| Use case | Product/brand | Amazon identity found | WhoAdvice decision |
|---|---|---|---|
| Overall/outdoor | GOOTOP Zap T6 Pro | B09PQF39PG | Add; exact identity strong, manual provenance limited |
| High coverage | Flowtron BK family | Existing exact BK records | Retain exact model variants, not generic family title |
| Porch | BLACK+DECKER hanging zapper | B084T5C68S | Do not add: public model is only `1`, too weak for exact-model workflow |
| Indoor | Aspectek 20W | B01LWLFB5U | Add conditionally; verify current unit label says HR292-5 |
| Solar | OnBeam SE566 | B0DWSJ9KX2 | Add conditionally; exact manual still missing |
| Portable | Buzbug portable | B0CNT5BQC3 | Screened; MA015C and later MO-005B failed availability, so use current exact MO-008C only as a plug-in indoor/outdoor replacement—not a portable equivalent |
| High voltage | Livin' Well | B0B61YYMM8 | Screened; stable public model number not found |
| Solar stakes | Pure Garden set | Non-Amazon routes on HGTV | Exclude under the current Amazon gate |
| Handheld | ZAP IT! battery racket | B0859NZM5H | Add conditionally as exact ASIN package; do not invent model number |

## Brand expansion result

The active research set now includes eleven brands/manufacturers instead of being dominated by three or four:

1. Flowtron
2. Safer Home / Woodstream
3. BLACK+DECKER
4. PIC
5. Aspectek
6. Buzbug
7. GOOTOP
8. OnBeam
9. The Executioner
10. ZAP IT! as a retail brand, conditional on public model-number evidence
11. YISSVIC

LiBa was screened and briefly normalized, but its selected WD-942 Amazon route failed the publisher availability check. It remains in the unavailable register rather than the active brand count.

## Replacement policy adopted

1. Amazon US exact-route availability is now a commercial screening gate because the publisher is supplying Amazon affiliate destinations.
2. A current Amazon page alone is not enough: the model, package, brand page/manual, and ASIN must reconcile.
3. If an older product from the same company lacks Amazon availability, prefer a current same-company exact model when one passes. BLACK+DECKER BDPC959 replaces older unresolved BLACK+DECKER indoor records; current Flowtron Amazon models remain where available.
4. If the company has no qualifying current Amazon model for the format, replace it with a different manufacturer rather than retain a dead card for brand loyalty.
5. Products found only through competitor retailer links can enter as conditional research candidates, never as approved recommendations, until the exact manual and model are archived.
6. Preserve old products and reasons in `products/unavailable-products.md`; do not silently rewrite history.

## Claims and evidence boundary

- Competitor inclusion is discovery evidence, not product-performance evidence.
- Retailer stars, bestseller labels, voltage, acreage, UV wavelengths, and target-insect lists do not establish fewer bites or population control.
- Current prices and stock are volatile and must be rechecked at publication.
- No competitor's `tested` wording is transferred to WhoAdvice; this project remains research-based with no hands-on testing.
