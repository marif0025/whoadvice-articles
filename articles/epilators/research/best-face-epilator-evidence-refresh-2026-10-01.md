# Best Facial Epilators - Evidence Refresh

- **Date:** 2026-10-01
- **Replaces nothing.** It checks the 2026-07-20 sheet `best-face-epilator-product-refresh-2026-07-20.md` against the live web.
- **Method:** WebFetch of each Amazon US page, manufacturer page and source link. WebSearch restricted to `site:cpsc.gov` for recalls. One plain curl retry for the two pages that returned HTTP 429. No captcha or bot wall was bypassed.
- **Rule:** every line below is from a page loaded on 2026-10-01. Where a page failed or did not show something, the line says "not verifiable" and why.
- **Amazon limit:** all four Amazon pages loaded (no captcha), but the fetched HTML was truncated before the buy box. Price, stock and the "Item model number" field never came through. That means no Amazon price or availability could be date-stamped today.

---

## 1. Braun FaceSpa Pro 911 (B07HFHY6RH)

| Check | Result | Source URL |
|---|---|---|
| Amazon page loads | Yes. Not a captcha page. | https://www.amazon.com/dp/B07HFHY6RH |
| Amazon title | "Braun Face Epilator Facespa Pro 911, Facial Hair Removal for Women, Hair Removal Device, 3-in-1 Epilating, Cleansing Brush and Skin Toning with 3 Extras" | https://www.amazon.com/gp/product/B07HFHY6RH |
| Amazon price | Not verifiable: page content truncated before the price. | same |
| Amazon availability | Not verifiable: page content truncated before the buy box. | same |
| Amazon item model number | Not verifiable: field not in the truncated content. (Canonical URL is `/Braun-FaceSpa-Facial-Epilator-Bronze/dp/B07HFHY6RH`.) | same |
| US support page live | Yes. Lists FaceSpa Pro models 910, 911, 912, 913, 921, 922, with accessories and spare parts. | https://us.braun.com/en-us/service/products/5366 |
| US support page: manual | Shows a "User Manuals" heading, but no manual link came through in the fetch. | same |
| US support page: claims | Does not mention dry use, rinsing, wet/dry, upper lip, eyebrows or eyelashes. | same |
| Manual: epilation head dry-only, do not rinse | Not verifiable from a loaded page. manualslib.com (3 URLs), manuals.plus (2 URLs) and device.report all returned HTTP 403. | https://www.manualslib.com/manual/1491572/Braun-Facespa-Pro-911.html ; https://manuals.plus/braun/5366-facespa-pro-911-facial-epilating-cleansing-and-skin-manual ; https://device.report/manual/10446720 |
| Manual: upper lip, isolated hairs around eyebrows | Not verifiable: same 403s. | same |
| Manual: not for eyelashes or eyebrow shaping | Not verifiable: same 403s. | same |
| manua.ls "manual" page | Loaded, but it is a generic summary, not the Braun text. It says "Rinse the detachable head with warm water and mild soap". That contradicts the July manual finding. Do not cite it. | https://www.manua.ls/braun/facespa-pro-911/manual |
| Braun UAE product page: rechargeable | Confirmed: "Rechargeable battery". (Non-US Braun page.) | https://ae.braun.com/en-ae/skin-care/facespa-pro/braun-facespa-pro-911-facial-epilator |
| Braun UAE product page: wet use | The brush is "100% waterproof". No statement about the epilation head and water. | same |
| Braun UAE product page: areas | "Perfect for Chin, upper lip, forehead, and to maintain eyebrows in shape" | same |
| CPSC recall | None found. `site:cpsc.gov Braun epilator recall` returned only old Braun espresso maker notices and hair dryer items. `site:cpsc.gov facial epilator recall` returned no epilator recall. | https://www.cpsc.gov/Recalls |

---

## 2. Remington Smooth & Silky Facial Epilator EP1050FCDN (B00935AXAU)

| Check | Result | Source URL |
|---|---|---|
| Amazon page loads | Yes. Not a captcha page. | https://www.amazon.com/dp/B00935AXAU |
| Amazon title | "Remington Smooth and Silky Facial Epilator, Pink, Long-Lasting Hair Removal \| Cordless and Travel-ready, Gentle on Delicate Areas, 1 Count, Model EP1050FCDN, Includes Protective Cap and Cleaning Brush" | https://www.amazon.com/gp/product/B00935AXAU |
| Amazon model | "Model EP1050FCDN" appears in the title and meta description. (Not the "Item model number" field, which did not come through.) | same |
| Amazon: protective cap, cleaning brush | Named in the Amazon title: "Includes Protective Cap and Cleaning Brush". | same |
| Amazon price | Not verifiable: page content truncated. | same |
| Amazon availability | Not verifiable: page content truncated. | same |
| Manufacturer page live / sold / price | Not verifiable: HTTP 429 Too Many Requests on four WebFetch tries and one curl try. July price $20.99 cannot be reconfirmed. | https://remingtonproducts.com/products/rem-epilator-pink |
| Six tweezers | Not verifiable: manufacturer page 429. | same |
| One AA battery included | Not verifiable: manufacturer page 429. | same |
| Two-year limited warranty | Not verifiable: manufacturer page 429. | same |
| For the face | Amazon title says "Facial Epilator". Manufacturer wording not verifiable (429). | Amazon URL above |
| CPSC recall | None for an epilator. `site:cpsc.gov Remington epilator recall` returned hair dryer recalls (2001, 2002, and a 2025 Empower Brands Remington hair dryer recall), a 1978 women's shaver repair program, leaf blowers and chainsaws. None is the EP1050. | https://www.cpsc.gov/Recalls/2025/Empower-Brands-Recalls-Remington-Hair-Dryers-Due-to-Risk-of-Serious-Injury-or-Death-from-Electrocution-and-Shock-Hazards |

---

## 3. Tweezerman Smooth Finish Facial Hair Remover 5090-R (B00JVOU89E)

| Check | Result | Source URL |
|---|---|---|
| Amazon page loads | Yes. Not a captcha page. | https://www.amazon.com/dp/B00JVOU89E |
| Amazon title | "Tweezerman Smooth Finish Facial Hair Remover Assorted Colors" | https://www.amazon.com/gp/product/B00JVOU89E |
| Amazon model 5090-R | Not shown: "5090" does not appear in the truncated content. | same |
| Amazon price | Not verifiable: page content truncated. | same |
| Amazon availability | Not verifiable: page content truncated. | same |
| Manufacturer page live / sold / price | Not verifiable: HTTP 429 Too Many Requests on three WebFetch tries and one curl try. July price $22.00 cannot be reconfirmed. | https://tweezerman.com/products/smooth-finish-facial-hair-remover |
| Manual stainless-steel coil | Not verifiable: manufacturer page 429. | same |
| Areas: neck, chin, cheeks, upper lip | Not verifiable: manufacturer page 429. | same |
| Clean coil with alcohol wipe after each use | Not verifiable: manufacturer page 429. | same |
| CPSC recall | None found. `site:cpsc.gov Tweezerman recall` returned only general CPSC recall guidance pages. | https://www.cpsc.gov/Recalls |

---

## 4. Bellabe Original Facial Hair Remover (B001RPL902)

| Check | Result | Source URL |
|---|---|---|
| Amazon page loads | Yes. Not a captcha page. | https://www.amazon.com/dp/B001RPL902 |
| Amazon title | "Bellabe Spring Facial Hair Remover for Women, Chin & Upper Lip, 1 Unit" | https://www.amazon.com/gp/product/B001RPL902 |
| Amazon price | Not verifiable: page content truncated. | same |
| Amazon availability | Not verifiable: page content truncated. | same |
| Amazon item model number | Not shown in the truncated content. | same |
| Brand site live | Yes. | https://www.bellabe.com/ |
| Where it is sold | The brand's shop page shows no price. It links "Buy now on Amazon" to `https://www.amazon.com/dp/B001RPL902`, the same ASIN. | https://www.bellabe.com/shop |
| Manual spring | Confirmed: "a manual, handheld device that doesn't use batteries or electricity". Also "hypoallergic spring no nickel" (sic). | https://www.bellabe.com/ |
| Areas: upper lip, chin, cheeks, jawline | Confirmed on the home page: "ideal for use on the upper lip, chin, cheeks, and jawline". | https://www.bellabe.com/ |
| Areas on the FAQ | Different list: "upper lip, chin, cheeks, and neck". No "jawline". Face only: "designed exclusively for the face". | https://www.bellabe.com/faqs |
| Temporary results | Confirmed: smooth skin "anywhere from three days to four weeks", depending on hair growth cycle. | https://www.bellabe.com/faqs |
| CPSC recall | None found. `site:cpsc.gov Bellabe facial hair remover recall` returned unrelated beauty items (a 2006 Dove cleansing massager, 2004 eyelash curlers, a 2026 beard serum). | https://www.cpsc.gov/Recalls |

---

## Sources used in article.md

| Check | Result | Source URL |
|---|---|---|
| Braun India technique article loads | Yes. Title: "How to use a face epilator? Know its effects, uses & tips for face epilation \| Braun IN". No published or updated date shown. Still says "Hold the epilator perpendicular to your face". | https://in.braun.com/en-in/female-hair-removal/all-about-beautiful-skin/how-to-use-facial-epilator |
| NHS ingrown hairs loads | Yes. "Page last reviewed: 01 September 2026". "Next review due: 01 September 2029". | https://www.nhs.uk/conditions/ingrown-hairs/ |
| AAD hair removal loads | Yes. Title "6 ways to remove unwanted hair". Last updated 9/7/23. It covers shaving, waxing, depilatories, threading, laser and electrolysis. It does not mention epilators. | https://www.aad.org/public/everyday-care/skin-care-basics/hair/remove-unwanted-hair |

---

## Changes the article needs

1. **No Amazon prices or stock can be date-stamped from today's pass.** All four Amazon pages truncated before the buy box. Get price and stock from the publisher's affiliate dashboard or a manual browser check before publishing any price.
2. **Remington and Tweezerman manufacturer pages could not be read (HTTP 429).** Every claim for both (six tweezers, AA battery, warranty, price $20.99; steel coil, areas, alcohol wipe, price $22.00) is unconfirmed today. Recheck from a normal browser before publication. Do not repeat the July prices as current.
3. **Braun manual claims are unconfirmed today.** Dry-only epilation head, do-not-rinse, upper lip and isolated eyebrow hairs, and the eyelash/eyebrow-shaping warning all rest on the July reading. Every manual mirror returned 403, and the US support page shows no manual link in the fetch. Get the manual PDF from the Braun US support page in a browser.
4. **Braun eyebrow wording needs care.** Braun's UAE product page says "to maintain eyebrows in shape". The July manual reading says not for shaping eyebrows. If the article keeps "not for shaping eyebrows", source it to the manual only, and confirm that line once the manual is in hand.
5. **Bellabe areas: brand site lists two versions.** The home page says jawline. The FAQ says neck and drops jawline. The article's "upper lip, chin, cheeks, jawline" matches the home page. Either cite the home page for it, or use only the areas both pages share: upper lip, chin, cheeks.
6. **Bellabe Amazon title differs from the article name.** Amazon calls it "Bellabe Spring Facial Hair Remover for Women, Chin & Upper Lip". The brand site calls it "Bellabe Facial Hair Remover for Women". Neither says "Original" in what loaded today.
7. **Tweezerman model 5090-R is not on the Amazon page.** The Amazon title is "Assorted Colors" with no model. Tie 5090-R to the manufacturer page only, once it loads.
8. **AAD does not mention epilators.** If the article cites AAD for anything about epilating, that citation does not support it. The page is fine for general hair-removal methods (last updated 9/7/23).
9. **NHS date can be stamped:** last reviewed 01 September 2026.
10. **Recalls:** no CPSC recall found for any of the four products today. Repeat on publication day.

## Browser recheck, same day (closes most gaps above)

The rate-limited and truncated pages were re-read in a real browser on 2026-10-01. Every line below is from a page loaded that day.

| Product | Check | Result | Source |
|---|---|---|---|
| Braun FaceSpa Pro 911 | US manual | Braun US support links the North American manual `S5366_4_NA.pdf` (91283802, effective 30 Oct 2017), covering models 911 and 921. | https://us.braun.com/en-us/service/products/5366 |
| Braun FaceSpa Pro 911 | Epilation head and water | "Using the epilation head (dry use only)". "Do not clean the epilation head under running water." Clean the tweezers with the brush, optionally dipped in 70% ethanol. | Manual p. 7–8 |
| Braun FaceSpa Pro 911 | Cleansing brush | "Using the cleansing brush (wet & dry use)". "Only this attachment can be rinsed under running water." The appliance is suitable for bath or shower only with the cleansing brush attached. | Manual p. 6, 8 |
| Braun FaceSpa Pro 911 | Facial areas | Not on eyelashes. Individual hairs "between or above the eyebrows, but not for shaping eyebrows". Upper lip: stretch it with the tongue. | Manual p. 6–7 |
| Braun FaceSpa Pro 911 | Power | Charge 1 hour, then unplug; "it can only be operated cordless". Li-ion rechargeable. | Manual p. 6, 9 |
| Braun FaceSpa Pro 911 | Warranty | 1 year limited (USA). | Manual p. 10 |
| Braun FaceSpa Pro 911 | Amazon | Title matches; "Model Number SE911"; In Stock. Price shown only in AED for a UAE delivery address, so no US price. | https://www.amazon.com/dp/B07HFHY6RH |
| Remington EP1050FCDN | Manufacturer page | Live, $20.99, Add to cart. Six automatic tweezers, one AA battery, cleaning brush, protective cap, "face and other detail areas", 2 Year Limited Warranty. | https://remingtonproducts.com/products/rem-epilator-pink |
| Remington EP1050FCDN | Amazon | "Model Number EP1050FCDN"; In Stock; sold by Amazon (merchant ATVPDKIKX0DER). | https://www.amazon.com/dp/B00935AXAU |
| Tweezerman 5090-R | Manufacturer page | Live, $22.00, Add to bag, "#5090-R". Areas: "neck, chin, cheeks, and upper lip". Stainless steel coil spring. Flat side for larger areas, curved part for precise areas. "Clean coil spring after each use with alcohol wipe." Tweezerette is a free gift. | https://tweezerman.com/products/smooth-finish-facial-hair-remover |
| Tweezerman 5090-R | Amazon | "Model Number 5090-R"; "Only 1 left in stock" (UAE delivery view). | https://www.amazon.com/dp/B00JVOU89E |
| Bellabe | Amazon | Title "Bellabe Spring Facial Hair Remover for Women, Chin & Upper Lip, 1 Unit"; "Model Number 118"; sold by Bellabe USA; add-to-cart present. | https://www.amazon.com/dp/B001RPL902 |

**What this settles:**
- Braun's dry-only head, rinse rule, eyebrow and eyelash limits, and cordless-only use are confirmed from the US manual. The UAE page's "maintain eyebrows in shape" does not override the US manual, which forbids shaping.
- The FaceSpa manual (2017 print) gives a 1-year US warranty. Braun may offer different terms today, so the article does not state it. Remington states 2 years on its current page.
- Remington and Tweezerman claims and prices are confirmed on the manufacturer sites, dated 2026-10-01: Remington $20.99, Tweezerman $22.00.
- All four exact models are listed and buyable on Amazon. Amazon US prices were not visible (UAE delivery address), so the article dates manufacturer prices only.
- Bellabe model 118 now shows in the Amazon listing's model field. The contract asks for packaging, an invoice, the affiliate record or Seller Central, so the public name stays without the number.
- Bellabe areas: the brand home page (rechecked in the browser) says "best for use on the upper lip, chin, cheeks, and jawline", and that is the area cell. The FAQ's "neck" variant is noted here, not published.
- "Original" is not in Bellabe's name anywhere. The brand site's title is "Bellabe Facial Hair Remover for Women", so the public name becomes "Bellabe Facial Hair Remover".
- Bellabe's home page also says "Do not slide Bellabe on your face" and to roll the handles outward, then inward.
