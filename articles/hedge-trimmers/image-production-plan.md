# Hedge-trimmer cluster image production plan

**Status:** CMS image-production handoff  
**Applies to:** The eight unpublished hedge-trimmer drafts  
**Rule:** Generated images must remain brand-neutral. Exact selected products require licensed exact-model photography sourced from the manufacturer, approved retailer, or another licensed provider.

Every placement below names the exact article heading or CMS comment to use. Keep all measurements, warnings, and decision rules in HTML; images are supporting material.

## Supported production dimensions

Sanity does not enforce one fixed upload size for these image fields. The dimensions below match the aspect ratios reserved by the current WhoAdvice frontend and are the required production targets for this cluster.

| Image use | Production dimensions | Aspect ratio | CMS destination |
|---|---:|---:|---|
| Article hero / featured image | 1280 x 960 px | 4:3 | Article `thumbnail` |
| Separate social / OG image | 1200 x 630 px | 1.91:1 | `seo.open_graph_image`, when supplied |
| Product image | 1200 x 1200 px | 1:1 | Shared product document image |
| Type-card image | 1200 x 1200 px | 1:1 | `typesSection.items[].image` |
| Inline diagram or instructional image | 1280 x 720 px | 16:9 | Portable Text `iimage` block |

For a visual used as both the hero and an inline image, generate the 1280 x 960 px hero master with all essential content inside the centered 1280 x 720 px safe area, then export a separate 1280 x 720 px inline crop. Keep hero subjects centered enough to permit an optional 1200 x 630 px OG crop. Do not stretch one aspect ratio into another.

## Best cordless hedge trimmers

Source article: [`best-cordless-hedge-trimmers/article.md`](best-cordless-hedge-trimmers/article.md)

### Hero image

- Placement: Sanity `thumbnail`; before the article introduction.
- Filename: `best-cordless-hedge-trimmers-homeowners.webp`
- Output dimensions: `1280 x 960 px` (`4:3`), with the subject inside a centered `1200 x 630 px` social-safe area.
- Alt intent: `Homeowner using a cordless hedge trimmer on a maintained garden hedge`
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio. Editorial landscape photograph for a US homeowner buying guide. An adult homeowner uses a generic cordless hedge trimmer with both hands from stable ground beside a maintained residential hedge. The removable battery, blade guard, and balanced working position are visible. Natural daylight, realistic suburban garden, restrained green and charcoal palette, no logos, no recognizable product design, no packaging, no text, no ladder, no overhead cutting. Keep the operator and tool inside the centered 1200 x 630 px social-safe area.`

### Type-card images

Insert each asset in the matching Sanity `typesSection.items[].image` field under `## Types of cordless hedge trimmers`.

Output dimensions for every type-card image: `1200 x 1200 px` (`1:1`).

1. **Standard handheld hedge trimmers** — `Brand-neutral standard cordless hedge trimmer held at waist height beside a medium hedge, conventional straight blade and two-hand grip clearly visible, realistic editorial product-category illustration, no logo, no text, square 1:1 composition.`
2. **Lightweight and compact hedge trimmers** — `Compact generic cordless hedge trimmer beside small shaped shrubs, shorter blade and light battery proportions emphasized without measurements, clean garden setting, no brand cues or text, square 1:1.`
3. **Long-blade hedge trimmers** — `Generic long-blade cordless hedge trimmer aligned with a broad flat hedge face, visual emphasis on coverage and leverage while retaining two-hand control, no logos, no text, square 1:1.`
4. **Heavy-duty hedge trimmers for thick growth** — `Robust brand-neutral cordless hedge trimmer beside dense but maintained hedge growth, substantial blade and battery proportions, no claim that it cuts oversized wood, no logos or text, square 1:1.`
5. **Cordless pole hedge trimmers** — `Generic cordless pole hedge trimmer shown from stable ground facing a tall hedge, articulating head visible, no ladder or overhead hazard, no logos, no text, square 1:1.`
6. **Mini shrub shears and detail trimmers** — `Small generic cordless shrub shear used for close detail shaping on a compact ornamental shrub, gloved hand safely on the handle and away from the blade, no logos or text, square 1:1.`

### Exact-product image sourcing references

Do not generate these images. Add licensed exact-package photography to the shared product records, then reuse it in this article:

Required delivery for every product image: `1200 x 1200 px` (`1:1`), with the complete product centered, uncropped, and surrounded by comfortable neutral-background padding.

| Product | Article placement | Canonical evidence record |
|---|---|---|
| EGO HT2601 kit | `## 1. EGO POWER+ HT2601` | [`products/ego-ht2601.md`](products/ego-ht2601.md) |
| Greenworks HT40B212 kit | `## 2. Greenworks HT40B212` | [`products/greenworks-ht40b212.md`](products/greenworks-ht40b212.md) |
| EGO HT2501 kit | `## 3. EGO POWER+ HT2501` | [`products/ego-ht2501.md`](products/ego-ht2501.md) |
| WORX WG261 kit | `## 4. WORX WG261` | [`products/worx-wg261.md`](products/worx-wg261.md) |
| BLACK+DECKER LHT2436 kit | `## 5. BLACK+DECKER LHT2436` | [`products/black-decker-lht2436.md`](products/black-decker-lht2436.md) |

## Best pole hedge trimmers

Source article: [`best-pole-hedge-trimmers/article.md`](best-pole-hedge-trimmers/article.md)

### Hero image

- Placement: Sanity `thumbnail`; before the introduction.
- Filename: `best-pole-hedge-trimmers.webp`
- Output dimensions: `1280 x 960 px` (`4:3`), with the tool inside a centered `1200 x 630 px` social-safe area.
- Generated alternative alt intent: `Generic pole hedge trimmer positioned beside a tall residential hedge`
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio. Editorial landscape image for a pole hedge-trimmer buying guide. A brand-neutral cordless pole hedge trimmer rests beside a tall maintained residential hedge, with the long shaft and articulating head fully visible. Stable ground, realistic proportions, no operator on a ladder, no logos, no recognizable exact-product styling, no text, natural daylight. Keep the complete tool inside the centered 1200 x 630 px social-safe area.`
- Licensing note: if the published alt text continues to claim that selected exact models are shown, use licensed exact-model photography instead of the generated alternative.

### Type-card images

Insert in `typesSection.items[].image` under `## Pole hedge trimmer designs`.

Output dimensions for every type-card image: `1200 x 1200 px` (`1:1`).

1. **Fixed-length** — `Generic fixed-length pole hedge trimmer in full side profile, one continuous shaft and articulating head visible, white-to-light garden background, no logo or text, square 1:1.`
2. **Sectional** — `Brand-neutral pole hedge trimmer with two shaft sections shown connected and one separated inset, realistic mechanical joints, no brand details or text, square 1:1.`
3. **Telescopic** — `Generic telescopic pole hedge trimmer shown in compact and extended positions side by side, no numeric reach claim, no logos or text, square 1:1.`
4. **Attachment-capable and gas long-reach** — `Brand-neutral long-reach powerhead with detachable hedge-trimmer attachment beside a generic gas long-reach silhouette, category comparison only, no exact model, no logos or text, square 1:1.`

### Supporting reach graphic

- Placement: immediately after `## How to choose the best pole hedge trimmer for your yard`, before `### Measure the hedge and separate tool length from claimed reach`.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Clean two-panel technical diagram on a white background. Left panel shows a generic pole hedge trimmer in side profile with a measurement arrow only from rear handle to blade tip, labeled visually as physical tool length using an empty CMS label area. Right panel shows the same generic tool held by a neutral six-foot human silhouette at shoulder height, with a separate combined reach arrow indicating that user-inclusive claimed reach depends on body position. No universal numbers, no unsafe overreach, no ladder, no logos, no baked-in explanatory text, muted green and charcoal palette.`
- Alt intent: `Diagram comparing a pole hedge trimmer's physical tool length with a user-inclusive maximum-reach claim`

### Exact-product image sourcing references

Use licensed photography only. Match each image to its article review heading and canonical record:

Required delivery for every product image: `1200 x 1200 px` (`1:1`), with the complete product centered, uncropped, and surrounded by comfortable neutral-background padding.

- DEWALT DCPH820M1 — [`products/dewalt-dcph820m1.md`](products/dewalt-dcph820m1.md)
- CRAFTSMAN CMCPHT818D1 — [`products/craftsman-cmcpht818d1.md`](products/craftsman-cmcpht818d1.md)
- WORX WG252.9 — [`products/worx-wg252-9.md`](products/worx-wg252-9.md)
- Sun Joe SJH904E — [`products/sun-joe-sjh904e.md`](products/sun-joe-sjh904e.md)
- Earthwise CVPH43018 — [`products/earthwise-cvph43018.md`](products/earthwise-cvph43018.md)
- BLACK+DECKER LPHT120B — [`products/black-decker-lpht120b.md`](products/black-decker-lpht120b.md)
- GARCARE GPHT06 — [`products/garcare-gpht06.md`](products/garcare-gpht06.md)
- Husqvarna 122LKH — [`products/husqvarna-122lkh.md`](products/husqvarna-122lkh.md)

## Corded vs cordless hedge trimmer

Source article: [`corded-vs-cordless-hedge-trimmer/article.md`](corded-vs-cordless-hedge-trimmer/article.md)

### Hero

- Placement reference: `<!-- CMS LEAD IMAGE ... -->` before the opening callout.
- Output dimensions: `1280 x 960 px` (`4:3`), with both tools inside a centered `1200 x 630 px` social-safe area.
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio. Editorial landscape photograph for a US home-garden buying guide, one generic corded handheld hedge trimmer and one generic cordless handheld hedge trimmer resting side by side beside a neatly maintained residential hedge, corded tool visibly connected to a correctly routed outdoor extension cord, cordless tool visibly fitted with a removable battery, realistic proportions and safety guards, natural daylight, no people, no logos, no brand styling, no text, no packaging. Keep both complete tools inside the centered 1200 x 630 px social-safe area.`

### Property-layout diagram

- Placement reference: `<!-- CMS IMAGE 1 ... -->` after the comparison table.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Clean editorial isometric garden diagram split into two residential layouts. Left: hedge near an outdoor outlet with a simple unobstructed cord route. Right: several hedge areas separated by a gate, walkway, raised bed, and corner. Include generic corded and cordless hedge-trimmer silhouettes, restrained green and charcoal palette, high contrast, no brands, no decorative text.`

## What size hedge trimmer do I need?

Source article: [`what-size-hedge-trimmer-do-i-need/article.md`](what-size-hedge-trimmer-do-i-need/article.md)

### Hero and blade-measurement diagram

- Placement reference: `<!-- CMS IMAGE 1 ... -->` after `## Blade length versus cutting capacity`; also use as the featured image when the crop remains readable.
- Output dimensions: generate a `1280 x 960 px` (`4:3`) hero master, then export a separate `1280 x 720 px` (`16:9`) inline crop from its centered safe area.
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio, composed so all essential content remains inside a centered 1280 x 720 px safe area. Brand-neutral technical diagram of a generic hedge-trimmer blade on a clean white background. Show blade length as an arrow along the full blade and tooth gap as a separate short arrow between adjacent teeth. Use empty label zones for CMS-added accessible labels; no numeric values, formulas, logo, hands, or implied cutting-capacity promise. Muted green and charcoal linework.`

### Hedge-measurement diagram

- Placement reference: `<!-- CMS IMAGE 2 ... -->` after `### Select blade length and capacity separately`.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Editorial residential hedge-measurement diagram showing hedge-face length, a tight detail zone, far-side access, working height from stable ground, and a representative stem being measured separately. Include a neutral human silhouette only for scale, no ladder, no powered tool in motion, no universal measurements, no brands or baked-in text.`

## Hedge trimmer vs loppers vs pruning saw

Source article: [`hedge-trimmer-vs-loppers-vs-pruning-saw/article.md`](hedge-trimmer-vs-loppers-vs-pruning-saw/article.md)

### Hero and three-tool diagram

- Placement reference: `<!-- CMS IMAGE 1 ... -->` after `## Quick tool comparison`; may also supply the featured crop.
- Output dimensions: generate a `1280 x 960 px` (`4:3`) hero master, then export a separate `1280 x 720 px` (`16:9`) inline crop from its centered safe area.
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio, composed so all three panels remain legible inside a centered 1280 x 720 px safe area. Three-panel editorial comparison on a clean garden background. Panel one: generic hedge trimmer shaping repeated fine outer growth. Panel two: loppers making one controlled cut on a reachable woody stem. Panel three: pruning saw making one selective cut on a larger supported branch. Safe hand positions, stable ground, no diameter labels, no logos, no text, no ladders or utility hazards.`

### Two-stage overgrown-hedge diagram

- Placement reference: `<!-- CMS IMAGE 2 ... -->` after `## How to handle an overgrown hedge that needs more than one tool`.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Two-stage brand-neutral garden diagram. First panel shows selective removal of a few woody interior stems with loppers or a pruning saw. Second panel shows surface shaping of the remaining fine growth with a hedge trimmer. Same hedge in both panels, stable ground, no unsafe reach, no numeric cutting claims, no logos or text.`

## How to sharpen hedge trimmers

Source article: [`how-to-sharpen-hedge-trimmers/article.md`](how-to-sharpen-hedge-trimmers/article.md)

### Diagnose before sharpening

- Placement: featured image and immediately after `## Is the blade dirty, dull, damaged, or misaligned?`.
- Output dimensions: generate a `1280 x 960 px` (`4:3`) hero master, then export a separate `1280 x 720 px` (`16:9`) inline crop from its centered safe area.
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio, composed so all three panels remain legible inside a centered 1280 x 720 px safe area. Editorial technical triptych of a generic powered hedge-trimmer blade. Panel one shows resin buildup on intact teeth. Panel two shows a clean but gently rounded cutting edge. Panel three shows a bent or cracked tooth with a restrained caution symbol. Brand-neutral, realistic metal geometry, no hands, no powered motion, no text or measurements.`

### Hand file or professional service

- Placement: after `## Can you sharpen hedge trimmers with a Dremel or grinder?`.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Brand-neutral two-panel decision illustration. Left: disconnected intact hedge-trimmer blade secured against movement, with a hand file aligned to the existing factory bevel. Right: intact tool with blade cover fitted at a professional service counter. No numerical angle, grinder, exposed battery, logos, text, or hands near teeth.`

## How to clean hedge-trimmer blades

Source article: [`how-to-clean-hedge-trimmer-blades/article.md`](how-to-clean-hedge-trimmer-blades/article.md)

### Safe cleaning sequence

- Placement: featured image and before `## How to clean hedge-trimmer blades safely`.
- Output dimensions: generate a `1280 x 960 px` (`4:3`) hero master, then export a separate `1280 x 720 px` (`16:9`) inline crop from its centered safe area.
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio, composed so all five steps remain legible inside a centered 1280 x 720 px safe area. Five-step editorial maintenance sequence using the same generic hedge-trimmer blade: power source visibly separated, dry brushing of loose debris, controlled wiping of sticky residue with an unlabeled cloth, dry inspection, and light lubrication with a precision applicator. No brands, chemical labels, bare hands on teeth, water spray, housing contamination, or baked-in text.`

### Inspect before storage

- Placement: after `## Inspect the blade before storage or sharpening`.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Editorial close-up inspection diagram of a clean generic hedge-trimmer blade and sheath before storage. Show intact aligned teeth, dry blade surface, fastener and guard inspection points, plus a separate caution inset with one bent tooth and one crack. No brands, measurements, hands near teeth, or text.`

## How to use a hedge trimmer safely

Source article: [`how-to-use-a-hedge-trimmer/article.md`](how-to-use-a-hedge-trimmer/article.md)

### Pre-use work-area check

- Placement reference: `<!-- CMS IMAGE 1 ... -->`; use as the featured image.
- Output dimensions: generate a `1280 x 960 px` (`4:3`) hero master, then export a separate `1280 x 720 px` (`16:9`) inline crop from its centered safe area.
- Prompt: `Create a 1280 x 960 px image in a 4:3 aspect ratio, composed so all safety details remain legible inside a centered 1280 x 720 px safe area. Editorial residential-garden safety diagram before hedge trimming. Show a clear stable walkway, controlled outdoor cord route, visible fence wire, thick woody stem marked for another tool, and a small bird nest as a stop-work concern. No person operating machinery, no brands, text, or utility contact, muted green and amber style.`

### Controlled cutting zone

- Placement reference: `<!-- CMS IMAGE 2 ... -->` after the controlled cutting sequence.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Brand-neutral illustration of an adult homeowner using a standard hedge trimmer with both hands and stable ground-level footing beside a waist-to-chest-height hedge. Tool stays in front of the body; cord and bystanders remain outside the cutting area. No ladder, overhead cutting, blade contact, logo, or text.`

### Stop and isolate before clearing a jam

- Placement reference: `<!-- CMS IMAGE 3 ... -->` after the jam-isolation section.
- Output dimensions: `1280 x 720 px` (`16:9`).
- Prompt: `Create a 1280 x 720 px image in a 16:9 aspect ratio. Two-panel safety illustration. First: generic hedge trimmer stopped after a blade jam with hands on the handles and away from the teeth. Second: tool placed securely with its battery removed and visibly separated before inspection. No hand touches the blade, no brand, text, or implied restart.`

## CMS completion checklist

- Upload each `1280 x 960 px` hero to the article `thumbnail` field. If a separate social asset is supplied, upload its `1200 x 630 px` crop to `seo.open_graph_image`; otherwise confirm the thumbnail's focal point survives the social crop.
- Add generated diagrams as `iimage` blocks at the named heading or CMS comment.
- Add type images to the matching `typesSection.items[].image` field.
- Add licensed exact-model photography to the shared product document, not the article-specific product entry.
- Supply alt text, width, height, crop/hotspot, caption when useful, and licensing/source notes.
- Verify responsive crops, layout shift, keyboard flow, color contrast, and that every visual decision remains available in HTML.
