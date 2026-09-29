# How to epilate underarms — publisher handoff

```yaml
handoff_status: AMENDED SEPTEMBER 29, 2026 — READY FOR EDITORIAL REVIEW AND CMS HANDOFF; NO MEDICAL REVIEWER REQUIRED
handoff_date: July 20, 2026; amended September 29, 2026
article_file: article.md
primary_keyword: how to epilate underarms
primary_intent: Informational post-purchase technique and reaction guidance
seo_title: How to Epilate Underarms Safely - Step-by-Step Guide
h1: How to Epilate Underarms Safely
meta_description: Learn how to epilate underarms using your exact device instructions, controlled technique, and clear stop signs for bleeding or worsening irritation.
recommended_slug: /skin-care/how-to-epilate-underarms/
recommended_canonical: https://www.whoadvice.com/skin-care/how-to-epilate-underarms/
target_market: United States
article_type: Expert-led research-based use and safety guide
affiliate_links: none
product_recommendations: none
internal_links_included:
  - /skin-care/best-epilators/
suggested_schema_types: [Article, BreadcrumbList]
howto_schema: conditional on visible-page and current eligibility requirements
qualified_human_review_required: medical and editorial review before publication
```

## Editorial status

- Part 1 research: approved after required corrections.
- Part 2 article contract: approved after minor amendments.
- Part 3 draft: approved after targeted section-length and sentence revisions.
- Part 4 final audit: complete with `ready_for_editorial_review` outcome; see `audit.md`.
- Final editorial QA: outcome confirmed; requested minor-cut source-alignment wording applied.
- Qualified human medical/editorial review: required before publication.

## Part 4 audit summary

- Severity counts: 0 blockers, 0 critical findings, 0 warnings, and 0 suggestions.
- Mechanical audit: 2,035 words, 27 headings, and 0 flags after the final cluster-sync additions; `git diff --check` passes.
- Contract, evidence, voice, readability, SEO, heading hierarchy, and public wording exclusions pass.
- Philips exact-model claims, AAD cut care, MedlinePlus escalation guidance, and NHS supplementary guidance were rechecked live on July 20, 2026.
- The NHS page remains past its displayed review-due date and requires another publication-day check.
- The live best-epilator pillar is outdated; deploy the completed refresh before or alongside this support page.

## Source and freshness gates

- Reopen the Philips BRE708/BRE728 manual and confirm revision `3000.139.6355.2`, its June 16, 2026 date, and model applicability.
- Recheck the BRE227/00 product, attachment, irritation, technique, and water-symbol support pages.
- Keep Braun operating instructions excluded unless a directly captured official manual is added through an approved research revision.
- Recheck AAD and MedlinePlus cut and escalation guidance.
- Recheck the NHS ingrown-hair page because its displayed review-due date had passed at research time.
- Verify that every external link still resolves to the intended source and claim boundary.

## Internal links

- `/skin-care/best-epilators/` — included for product selection only; verify the published destination and final anchor.
- Add a reciprocal link from the pillar using an intent such as `learn how to epilate underarms safely`.
- Add a relevant IPL explainer only if a useful live destination exists and it does not blur IPL with mechanical epilation.
- Add irritation, ingrown-hair, or epilator-maintenance support links only when the live page adds material help.

## Visual handoff

Three images, amended September 29, 2026. Each is in `article.md` as an image line pointing at a labelled placeholder PNG in `images/` (made with `tools/sanity-import/scripts/placeholder-png.mjs`), so the page already shows where it goes. To swap one in: save the generated image over the placeholder at the same path (PNG, 16:9, at least 1600x900), or save it as `.webp` or `.jpg` and change the extension in its `article.md` line. Then run plan and apply again; the importer uploads the new file as a new asset.

| # | File | Section, placement | Alt text (in article.md) |
|---|---|---|---|
| 1 | `images/underarm-epilation-four-step-technique.png` | Before you epilate your underarms, last thing before the numbered steps | Four-part underarm epilation sequence showing a manual check, taut skin, slow controlled movement, and device cleaning. |
| 2 | `images/epilator-manual-water-symbols.png` | Before you epilate your underarms, after the device-type list | Common epilator manual symbols distinguishing wet use, washable parts, and parts that must remain dry. |
| 3 | `images/underarm-hair-below-skin.png` | Why underarm hair may appear again within days, after the first paragraph | Skin cross-section with some hairs above the surface and others still below it or too short for an epilator to catch. |

**Final images, September 29, 2026.**
- Image 1 is Arif's GPT render, cropped to remove its empty caption row.
- Images 2 and 3 are hand-drawn SVG, kept beside each PNG as `.svg` for edits, in the same palette. GPT's version of image 2 crossed out the whole device, which reads as "don't use this device".
- The thumbnail is panels 2 and 3 of image 1 on a 1200x630 canvas. GPT's own cover was rejected because it drew three arms: `images/underarm-epilation-thumbnail-1200x630.png`. Upload it to SEO > Open Graph image in Studio; the importer never writes that field.

Shared rules: no brand, logo, or recognizable model; no injury, blood, redness, or pain; no before-and-after result; no text, letters, or numbers inside the image (anything that needs words goes in HTML). The same flat-vector style across all three.

### 1. Technique sequence

**Image-generation prompt — technique sequence:**

```text
Create a four-panel editorial process illustration for an adult underarm-epilation guide, landscape 16:9, clean flat-vector style, warm off-white background, charcoal outlines, muted teal and terracotta accents, inclusive medium skin tone, modest crop from shoulder to upper torso, no face required. Panel 1: hand checking an unbranded device and its manual side by side. Panel 2: arm raised while the free hand gently keeps underarm skin taut. Panel 3: a generic epilator held lightly against the underarm with one slow movement arrow and a second small arrow showing that hair direction can change; do not show a universal degree. Panel 4: device switched off beside a removable head being cleaned according to a manual symbol. No injury, blood, redness, pain expression, before-and-after result, brand, logo, model-specific likeness, product claim, text, letters, numbers, or watermark. Leave caption space below each panel for publisher-added HTML. Calm instructional health-editorial tone, not a beauty advertisement.
```

Verify the final pose and device handling against the exact instructions cited in the article. Keep every safety and technique step in HTML.

### 2. Manual water symbols

```text
Create a clean flat-vector editorial infographic, landscape 16:9, warm off-white background, charcoal outlines, muted teal and terracotta accents, matching a four-panel underarm-epilation illustration in the same style. Three equal side-by-side cards, each with one large simple pictogram and generous empty space below it for publisher-added HTML captions. Card 1: a generic unbranded handheld epilator under a shower spray, meaning the whole device may be used wet. Card 2: a generic removable epilating head held apart from its handle under a running tap, while the handle sits dry to one side, meaning only the removable part may be rinsed. Card 3: a generic epilator handle inside a circle with a single diagonal line through a water drop beside it, meaning this part must stay dry. Neutral instructional tone, not a beauty advertisement. No brand, logo, recognizable product model, person, skin, text, letters, numbers, or watermark.
```

These are illustrative pictograms, not copies of any manufacturer's symbols. The sentence just above the image already tells readers that their own model's symbols and instructions control. The site's image block has no caption field, so nothing else labels the image. Do not recreate a specific brand's official symbol artwork.

### 3. Hair above and below the skin

```text
Create a clean flat-vector editorial cross-section diagram, landscape 16:9, warm off-white background, charcoal outlines, muted teal and terracotta accents, matching a four-panel underarm-epilation illustration in the same style. A simplified horizontal slice of skin with a flat surface line near the top and soft layered tissue below. Five or six hair follicles in a row at slightly different angles: two hairs clearly above the surface at a moderate length, one hair only just breaking the surface and very short, and two or three hairs still fully below the surface inside their follicles. A small generic unbranded epilator head hovers just above the surface on the left, not touching the skin. Calm, schematic, textbook-simple, no medical detail beyond this. No blood, redness, inflammation, ingrown hair, bumps, wound, text, letters, numbers, labels, arrows with words, brand, or watermark. Leave space below for a publisher-added HTML caption.
```

Keep this diagram schematic. It illustrates the article's own wording (some hairs may be below the skin or too short to catch, then surface later) and must not add a growth-cycle claim, a timeline, or a percentage the article doesn't make.

**Optional free-stock route:** Use a neutral bathroom-context photo only as a secondary lifestyle image. One possible starting point is [Pexels personal-care bathroom photography](https://www.pexels.com/search/bathroom%20personal%20care/) or [Unsplash bathroom routine photography](https://unsplash.com/s/photos/bathroom-routine). Review the [Pexels license](https://www.pexels.com/license/) or [Unsplash license](https://unsplash.com/license), avoid photos that show an unverified device technique, irritated skin, or a recognizable person in a sensitive or misleading context, and verify the individual asset before use.

Editorial owns image-specific alt text and source selection. CMS owns licensing, dimensions, responsive formats, storage, rendering, and accessibility testing.

## CMS and publication tasks

- Confirm canonical, slug, indexability, breadcrumbs, sitemap entry, and metadata rendering.
- Record author, publication date, updated date, and correction history. No medical-reviewer field; every reaction/wound-care claim is attributed to one named source per the attribution rule in `article-contract.md`.
- Render and test approved internal and external links.
- Check the 11-step hierarchy, callouts, decision table, method table, and mobile scrolling.
- Use Article or BlogPosting and visible BreadcrumbList markup. Add HowTo only if the final visible page and current requirements support it; schema must match the page.
- Do not use Product schema, affiliate buttons, prices, rankings, or marketplace calls to action.
- Run accessibility, mobile, performance, and broken-link checks after rendering.

## Public-copy controls

- Keep the standardized stop rule: unusual, severe, or worsening pain.
- Treat bleeding as a stop signal, not a normal milestone.
- Keep device cleaning, cosmetic aftercare, and wound care separate.
- Do not add a universal wet/dry preference, deodorant delay, pain-reduction promise, smoothness duration, remedy, or diagnosis.
- Do not add competitor or community names as public proof.
