# BLACK+DECKER Bug Zapper Racket BDPC976

**Record status:** Conditional active candidate; exact manual fetch pending  
**First captured:** July 21, 2026  
**Price/availability snapshot consolidated:** July 21, 2026, 13:36 PKT  
**Market:** United States

## Normalized identity

| Field | Value |
|---|---|
| Brand / manufacturer | BLACK+DECKER |
| Exact model | BDPC976 |
| Package | One battery-powered racket; retailer says 2 AA batteries required |
| UPC / GTIN | 850019456592 / 00850019456592 |
| Primary mechanism | Handheld electric racket |
| Power | Two replaceable AA batteries |
| Intended location | Active indoor/outdoor contact use; store indoors when not in use |
| Controls | Main switch plus press-to-energize button and indicator light |
| Amazon ASIN | B09V4D3BJ6 |

## Source snapshot: July 21, 2026

### Amazon US exact listing

- URL: https://www.amazon.com/dp/B09V4D3BJ6
- Source type: Current retailer, manufacturer storefront, identity, and package check
- Seller/fulfillment observed: World Wide Dist / Amazon
- Price observed: Hidden until cart; not used in ranking
- Availability observed: Add-to-cart control present, with seller information; the page also showed no featured offer in a later block, so availability confidence is medium.
- Raw facts captured: Model BDPC976; ASIN; GTIN; AA-battery power; handheld contact mechanism; product-resource manual link; one-year warranty claim.
- Identity conflict: An older accessible BLACK+DECKER manual covers BDPC974, not BDPC976. No BDPC974 fact has been imported into this record.

### Exact manual status

- The BDPC976 listing exposes a `User Manual (PDF)` resource, but the document fetch failed during this pass.
- Until the exact PDF is captured, do not publish voltage, detailed cleaning, storage, guard construction, or warning language beyond what is visible on the current exact listing.
- The retailer listing's `harmless-to-humans` and general human/pet safety wording is excluded.

## Availability assessment

```yaml
manufacturer_status: current_brand_store_listing_without_separate_official_product_page_located
official_product_page: not_located
manual_status: exact_listing_exposes_pdf_but_fetch_failed
current_us_retailers:
  - Amazon US
amazon_exact_match: verified
package_consistency: medium_high
listing_conflicts:
  - seller route present but no featured offer shown in another page block
  - older BDPC974 manual must not be applied to BDPC976
availability_confidence: medium
```

## Claim controls

- Allowed now: Exact model, replaceable-AA power, active racket contact, and visible controls.
- Hold pending exact manual: Cleaning method, storage conditions, detailed warnings, grid voltage, and guard construction.
- Exclude: Mosquito protection, unattended control, harmless/safe wording, and efficacy beyond direct contact.

## Recall check

- CPSC searches for `BDPC976`, BLACK+DECKER bug zappers, and electric-racket recalls were checked July 21, 2026.
- No BDPC976 recall was located. The July 24, 2025 iMirror BZ-001 racket recall is a different brand and exact model and is recorded in the rejected-product ledger.

## Affiliate link record — July 21, 2026

```yaml
affiliate_key: black-decker-bdpc976-amazon-us
raw_amazon_url: https://www.amazon.com/dp/B09V4D3BJ6
asin: B09V4D3BJ6
affiliate_link: null
affiliate_status: pending_publisher_confirmation
exact_model_status: verified
```

Publication-day note: Confirm BDPC976, one-racket package, seller, fulfillment, stock, and the exact manual. Do not substitute BDPC974 instructions.
