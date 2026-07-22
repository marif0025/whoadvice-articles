# Flowtron SLZ-10 Solar Bug Zapper (FLWSLZ10)

**Record status:** Conditional active candidate; manual and stock conflict unresolved  
**First captured:** July 21, 2026  
**Price/availability snapshot consolidated:** July 21, 2026, 13:36 PKT  
**Market:** United States

## Normalized identity

| Field | Value |
|---|---|
| Brand / manufacturer | Flowtron |
| Display model | SLZ-10 |
| Manufacturer part number | FLWSLZ10 |
| UPC | 198869008135 |
| Package | Solar zapper/LED lamp, USB-C cable, and user manual per retailer package listing |
| Primary mechanism | Solar-powered guarded grid zapper |
| Secondary function | Adjustable LED lamp |
| Power | Integrated solar panel, 4000mAh rechargeable battery, USB-C backup charging |
| Intended location | Manufacturer says indoor/outdoor and weather-resistant; retailer fields conflict on power/location details |
| Maintenance | Removable bottom collection chamber |
| Provisional Amazon ASIN | B0FQPMV7B5 |

## Source snapshot: July 21, 2026

### Manufacturer product page

- URL: https://flowtron.com/products/battery-zapper-solar-lamp
- Source type: Exact-model manufacturer page
- Availability observed: $49.99 with sold-out/email-notification messaging.
- Raw facts captured: Display model SLZ-10; part number FLWSLZ10; integrated solar and USB-C charging; 4000mAh battery; manufacturer runtime, coverage, weather, and location statements.
- Review signal: The single visible manufacturer-site review reported a handle failure and awkward controls. One review is anecdotal and cannot establish a pattern.

### US retail routes

- Lowe's: https://www.lowes.com/pd/Flowtron-Solar-Bug-Zapper-530-Sq-Ft-USB-C-and-Solar-Rechargeable-4000mAh-UV-Insect-Killer-Lamp/5018578695
- Best Buy: https://www.bestbuy.com/product/solar-bug-zapper-530-sq-ft-usb-c-solar-rechargeable-4000mah-uv-insect-killer-lamp/JJGRRXH67P/sku/12266407
- Newegg: https://www.newegg.com/flowtron-slz10-bug-zapper/p/07A-004Z-000F0
- Availability observed: Each exposed a $49.99 purchase route; marketplace sellers were involved on Best Buy and Newegg.
- Package consistency: Model/part number, dimensions, battery, and UPC are consistent across the official page and major retailers.

### Manual and Amazon status

- Retailer copy says a user manual is included, but no publicly accessible exact manual was located.
- A third-party catalog maps ASIN B0FQPMV7B5 to FLWSLZ10 and the matching UPC. Direct Amazon retrieval failed, so the ASIN is provisional rather than normalized for publication.
- Best Buy structured fields conflict by describing the product as both outdoor and plug-in despite the solar/USB-C package. Do not use those fields without the manual.

## Availability assessment

```yaml
manufacturer_status: current_product_page_sold_out
official_product_page: current
manual_status: included_but_public_exact_manual_not_located
current_us_retailers:
  - Lowe's
  - Best Buy marketplace
  - Newegg marketplace
amazon_exact_match: provisional_third_party_match
package_consistency: medium_high
listing_conflicts:
  - official direct page sold out while retailers show purchase routes
  - retailer structured location and power fields conflict
availability_confidence: medium
```

## Claim controls

- Allowed now: Exact identity, dual solar/USB-C charging, integrated battery, LED-lamp secondary function, and removable chamber, all attributed where appropriate.
- Hold pending manual: Charge-time conditions, runtime, weather exposure, mode behavior, storage, battery warnings, and cleaning instructions.
- Exclude: Coverage as performance, mosquito protection, eco-friendly, waterproof, and all-night claims.

## Recall check

- CPSC searches for `SLZ-10`, `FLWSLZ10`, Flowtron solar zappers, and general bug-zapper recalls were checked July 21, 2026.
- No exact-model recall was located. The product is new and evidence depth is limited.

## Affiliate link record — July 21, 2026

```yaml
affiliate_key: flowtron-flwslz10-amazon-us
raw_amazon_url: https://www.amazon.com/dp/B0FQPMV7B5
asin: B0FQPMV7B5
affiliate_link: null
affiliate_status: pending_publisher_confirmation
exact_model_status: provisional_third_party_match
```

Publication-day note: Do not use the Amazon destination until the publisher confirms the exact FLWSLZ10 package and Special Link. The solar recommendation remains conditional on obtaining the exact manual or equivalent manufacturer instructions.
