# Best Facial Epilator Article Contract — Part 2

- **Page:** `/skin-care/best-face-epilators/`
- **Workflow stage:** Rewritten 2026-10-01 (see Amendments at the end); cms.yaml done and rehearsed on dev; waiting on Arif's read, then production
- **Contract date:** July 20, 2026
- **Part 1 source:** `articles/epilators/research/best-face-epilator-product-refresh-2026-07-20.md`
- **Drafting status:** Complete and editorially approved on July 20, 2026

```yaml
primary_keyword: best epilator for face
target_market: United States
page_role: dedicated commercial facial-epilator branch
evidence_model: research-based roundup; no hands-on testing claim
reader_decision: choose an exact facial epilator by manufacturer-approved areas, electric or manual format, head control, capture mechanism, power and attachment-specific wet/dry limits, cleaning, support, and value
public_marketplace_mentions_rule: Amazon may appear only in the required affiliate disclosure and approved CTA label
public_community_names_allowed: false
intro_length: 120-180 words
intro_product_mentions: none
top_pick_card_count: 3
top_pick_card_fields:
  - Editorial badge
  - Exact public product name
  - Original short description of buyer fit and main tradeoff
comparison_columns:
  - Rank and product
  - Editorial badge
  - Mechanism and power
  - Manufacturer-approved facial areas
  - Package or care
  - Main tradeoff
visible_product_card_fields:
  - Title
  - Editorial badge
  - Summary
  - Verdict
  - Pros
  - Cons
  - Check price on Amazon CTA
structured_product_record_fields:
  - Slug
  - Brand
  - ASIN
  - Raw affiliate URL
  - Affiliate link
  - Private model-verification status
extra_product_paragraphs: false
summary_length: 50-60 words
verdict_length: 25-30 words
type_description_pattern: practical benefit -> best fit -> main tradeoff
buying_guide_scope: pre-purchase checks only
faq_product_reference_rule: mention a selected product only when it directly answers the question
pros_per_product: 2-3
cons_per_product: 1-2
pros_cons_style: concise evidence-based phrases
maximum_product_card_length: 160 words excluding CTA
conclusion_length: 80-120 words
conclusion_pattern: electric convenience versus manual control -> leading facial pick -> distinct alternatives -> manufacturer-approved-area caveat
target_length: 2200-3200 words
public_affiliate_link: true
affiliate_retailer: Amazon
affiliate_link_label: Check price on Amazon
affiliate_link_source: publisher-confirmed normalized product record
affiliate_link_attributes:
  - sponsored
editorial_owned:
  - internal-link destinations and anchor intent
  - authoritative source selection for each supported claim
  - image-specific alt text
cms_implementation_owned:
  - render editorially selected internal and authoritative external links
  - render affiliate buttons and sponsored attributes
  - store and render exact-product images and editorial alt text
  - Article, BreadcrumbList, and truthful ItemList schema
  - canonical and metadata implementation
  - comparison-table mobile behavior
  - page-speed and published-page testing
```

## Approved ranking carried into the draft

1. **Braun FaceSpa Pro 911 — Best Overall Facial Epilator**
2. **Remington Smooth & Silky Facial Epilator EP1050FCDN — Best Budget Electric Facial Epilator**
3. **Tweezerman Smooth Finish Facial Hair Remover 5090-R — Best Manual Facial Epilator**
4. **Bellabe Original Facial Hair Remover — Best Minimalist Manual Facial Epilator**

The draft must not change this order, add a product, or alter an award without reopening Part 1.

Bellabe is conditionally approved under its public product name. Do not display model `118` unless packaging, an invoice, the affiliate record, or Seller Central confirms it. The affiliate destination and product identity do not independently verify that model number.

## Opening contract

- Start with one controlling question about which facial areas the manufacturer actually approves, then begin answering it immediately before moving to electric convenience versus manual control.
- Explain that facial suitability cannot be inferred from a body epilator, a retailer title, attachment count, or tweezer count.
- State that WhoAdvice researched exact products, manufacturer documentation, current retailer identities, and recurring owner-reported patterns.
- Keep the opening product-neutral because the Top 3 cards immediately provide recommendations.
- Use `best epilator for face` naturally within the first 100 words.
- Do not begin with a dictionary definition, beauty-confidence framing, or generic hair-removal history.

## Callout and types-visual contract

- Place one `Electric or manual?` callout at the start of `Types of facial epilators`.
- Give a direct tie-breaker based on automatic capture versus battery-free hand control, while retaining manufacturer-approved areas as the first filter.
- Place the two-card visual marker beside the callout and use the generation prompt in `publisher-handoff.md`.
- Keep the complete comparison in HTML and do not let the graphic imply whole-face approval.

## Top 3 cards

1. **Best Overall Facial Epilator — Braun FaceSpa Pro 911**
2. **Best Budget Electric Facial Epilator — Remington Smooth & Silky Facial Epilator EP1050FCDN**
3. **Best Manual Facial Epilator — Tweezerman Smooth Finish Facial Hair Remover 5090-R**

Each card receives one original short description covering buyer fit and the main tradeoff. Do not copy the comparison table, Summary, or Verdict. Do not add ASINs or affiliate links to the Top 3 cards.

## Comparison-table contract

Use the approved six columns exactly:

1. Rank and product
2. Editorial badge
3. Mechanism and power
4. Manufacturer-approved facial areas
5. Package or care
6. Main tradeoff

- Keep each facial-area cell aligned with the manufacturer evidence:
  - **Braun FaceSpa Pro 911:** Face; upper lip and isolated hairs around the eyebrows. Not for eyelashes or eyebrow shaping.
  - **Remington EP1050FCDN:** Face; exact facial subareas are not specified by the manufacturer.
  - **Tweezerman 5090-R:** Neck, chin, cheeks, and upper lip.
  - **Bellabe Original Facial Hair Remover:** Upper lip, chin, cheeks, and jawline.
- Keep evidence conflicts and publication checks out of the buyer-facing `Main tradeoff` column; record them in the product files and research notes.
- Keep cells concise enough for horizontal mobile scrolling.
- Do not add live prices or affiliate links to the table.

## Product-card contract

Use exactly these visible fields and this order for all four products:

1. Title
2. Editorial badge
3. Summary
4. Verdict
5. Pros
6. Cons
7. `Check price on Amazon` CTA

- Keep `slug`, `brand`, `ASIN`, raw affiliate URL, affiliate link, and private model-verification status in the structured product record; do not display them as editorial rows.
- Use the publisher-confirmed ASIN and affiliate link from the matching cluster product file behind the rendered card.
- Summary: 50–60 words.
- Verdict: 25–30 words.
- Use two or three concise, evidence-based Pros and one or two concise, evidence-based Cons per product.
- Keep each complete product card to no more than 160 words, excluding the CTA.
- Pros and cons: short, parallel, specific, and traceable to evidence.
- Put buyer fit, distinction, and the decisive drawback inside the approved fields.
- Do not add a paragraph after `Cons`.
- Render the affiliate CTA only after the editorial content, following `Cons`.
- Place the material-connection disclosure before the first affiliate CTA.

### Product-specific controls

- **Braun FaceSpa Pro 911:** Use the exact qualification `Rechargeable; facial epilation head is dry-use only; cleansing brush supports wet/dry use`. Do not call the facial epilator wet/dry, and do not tell readers to rinse the epilation head.
- **Remington EP1050FCDN:** Use only model-specific evidence: six tweezers, one AA battery, facial positioning, protective cap, cleaning brush, and two-year limited warranty. Ignore the unrelated generic 40-tweezer, two-speed, and corded specification block.
- **Tweezerman 5090-R:** Preserve the verified manual coil mechanism and stated areas; do not imply electric speed or automatic direction control.
- **Bellabe Original Facial Hair Remover:** Use that exact public name and the approved minimalist-manual badge. Keep model `118` private and conditional.

## Methodology contract

Add `## How we ranked the best facial epilators` after the product cards.

- State the research-only evidence model and lack of hands-on testing.
- Use the approved facial-specific ranking weights:
  - 25% — Verified facial-area suitability
  - 20% — Precision and control
  - 15% — Hair-capture mechanism and intended hair type
  - 15% — Comfort and safety controls
  - 10% — Power, cleaning, support, and replacement parts
  - 10% — Independent testing and recurring owner-feedback confidence
  - 5% — Current US value and availability
- Explain that affiliate eligibility established commercial inclusion but did not determine ranking order or verdicts.
- Describe review-derived observations only as `recurring owner-reported patterns`, not verified product performance or medical evidence.
- Do not award facial performance based on tweezer count alone.
- Do not convert the methodology weights into public numeric product scores unless every score is supported by a completed and auditable evidence ledger.

## Facial-epilator type contract

Use `## Types of facial epilators` and keep the taxonomy deliberately generic. Include only these two H3 groups:

### Electric facial epilators

- Explain powered hair capture, easier repeated passes over small areas, power requirements, and the need to verify exact approved facial areas.
- Use Braun FaceSpa Pro 911 and Remington EP1050FCDN as brief examples.

### Manual facial epilators

- Explain spring-coil control, portability, two-handed technique, and the learning curve.
- Use Tweezerman 5090-R and Bellabe Original Facial Hair Remover as brief examples.

Do not create separate type groups by battery, head format, facial subarea, or capture variation. Those belong in the buying guide.

## Buying-guide contract

Use `## How to choose the best facial epilator`. Keep every subsection focused on checks made before purchase and use these seven headings exactly:

1. **Start With the Areas the Manufacturer Actually Approves**
2. **Decide Whether You Need a Face-Only or Face-and-Body Epilator**
3. **Choose Between Electric and Manual Facial Epilators**
4. **Match Head Width and Direction Control to the Treatment Area**
5. **Check Power Type and Attachment-Specific Wet/Dry Approval**
6. **Match the Capture Mechanism to Fine, Short, or Coarser Hair**
7. **Check Cleaning, Replacement Support, and the Extras You Will Actually Use**

- Cover tweezer count within heading 6 as one design detail, not a standalone quality measure.
- Under heading 5, distinguish an attachment's wet/dry approval from the overall device or bundle. Use Braun FaceSpa Pro 911 as the key evidence example.
- Avoid duplicating the types section: the types section explains the two formats; the buying guide gives purchase rules.

## Expectation and safety contract

Add `## What to expect from facial epilation` after the buying guide.

- Cover discomfort, temporary irritation, ingrown-hair risk, broken hairs, and non-permanent results only with directly aligned authoritative sources or exact manuals.
- Do not promise that discomfort decreases for everyone; it may become more manageable for some users.
- Do not infer approval for eyelashes, eyebrow shaping, damaged skin, or any facial subarea absent from the exact manufacturer's instructions.
- For recurrent or severe ingrown hairs, irritation, or a skin condition, avoid individualized medical conclusions and direct the reader toward appropriate professional advice.
- Do not describe facial epilation as painless, irritation-free, permanent, or universally suitable.

## FAQ contract

Use `## Frequently asked questions about facial epilators` with these questions:

1. Can I use a body epilator on my face?
2. Should I buy a dedicated facial epilator or a body epilator with a facial cap?
3. Can an epilator be used on the upper lip, chin, and cheeks?
4. Does a facial epilator work on coarse facial hair?
5. What should sensitive or irritation-prone shoppers check before buying?
6. Is a facial epilator better than tweezing, shaving, waxing, or dermaplaning?

- Answer each question in the first sentence.
- Use exact manuals for intended areas, attachment cleaning, damaged-skin restrictions, and device-specific limits.
- Treat shaving, waxing, dermaplaning, IPL, electrolysis, and creams as separate comparison methods, not facial-epilator types.
- Mention a ranked product only when it is the clearest direct example.
- Do not mention Reddit, forums, or marketplace reviews in public copy.

## Conclusion contract

Use `## Which facial epilator should you choose?` and keep it between 80 and 120 words.

- Lead with the electric-versus-manual decision and exact manufacturer-approved areas.
- Recommend Braun FaceSpa Pro 911 as the strongest overall facial system in this lineup.
- Distinguish Remington EP1050FCDN as the budget electric choice, Tweezerman 5090-R as the stronger featured manual choice, and Bellabe as the minimalist manual option.
- Repeat one material caveat: a product approved for the face is not automatically approved for every facial subarea.
- Do not repeat all specifications or imply that a higher tweezer count wins.

## SEO contract

- **SEO title:** `Best Epilator for Face in 2026: 4 Precise Picks`
- **H1:** `4 Best Facial Epilators for Precise Hair Removal in 2026`
- **Meta description:** `Find the best epilator for face hair. Compare four researched electric and manual picks by approved areas, control, power, cleaning, and value.`
- **Slug:** `/skin-care/best-face-epilators/`
- Use the primary keyword naturally in the SEO title, opening, comparison context, buying-guide H2, and conclusion where useful.
- Preserve the live canonical URL.

## Affiliate and disclosure contract

- Keep each ASIN, raw Amazon URL, and affiliate link in the matching structured product record; do not expose ASINs or raw URLs in editorial copy.
- Render the `Check price on Amazon` CTA after `Cons` in each product card.
- Add a clear material-connection disclosure before the first public affiliate link.
- Include the retailer's required associate-identification wording in the published template.
- CMS must render affiliate destinations with `rel="sponsored"` and verify every redirect before publication.
- `Amazon` may appear only in the required disclosure and approved link label, not ordinary editorial prose.

## Internal links and ownership

- Editorial/SEO selects each internal-link destination and anchor intent; CMS implements it.
- Research/editorial selects the authoritative source supporting each claim; CMS renders the approved link.
- Editorial writes image-specific alt text; CMS stores and renders the exact-product image and alt text.
- Mandatory internal-link intents:
  - Link readers who need a broader face-and-body device to `/skin-care/best-epilators/` with a descriptive anchor such as `compare epilators for face and body`.
  - Link an IPL explainer or comparison page when available and useful for readers comparing mechanical epilation with light-based hair reduction.
  - Link directly helpful facial-hair-removal, irritation, ingrown-hair, or epilator-maintenance content when such a page exists and advances the decision or safe-use context.

## Section-level word allocation

The total target remains **2,200–3,200 words**. These ranges are allocation controls, not targets to maximize simultaneously; the overall ceiling takes precedence.

- Opening and Top 3: **220–300 words**
- Comparison table: **concise cells only**
- Four product cards: **500–650 words total**
- Methodology: **140–180 words**
- Types: **180–260 words**
- Buying guide: **480–650 words**
- Expectations and safety: **180–250 words**
- FAQs: **350–500 words**
- Conclusion: **80–120 words**

## Public wording exclusions

- No `we tested`, `our testers`, or implied first-hand use.
- No `painless`, `irritation-free`, permanent hair removal, guaranteed results, or all-skin-type claims.
- No body-device facial-use recommendation unless the exact manufacturer instructions approve it.
- No public Bellabe model `118` unless the private proof requirement is satisfied.
- No unrelated Remington generic specification block.
- No whole-device wet/dry claim when only a separate attachment is wet/dry approved.
- No marketplace conflicts, seller notes, regional-source limitations, or publication-day checks in buyer-facing tradeoff cells.
- No facial shaver, dermaplaning tool, IPL device, electrolysis device, or cream presented as an epilator.
- No undated evergreen prices or attachment-count praise without a buyer consequence.

## CMS and publication-day checks

- Recheck exact variation, seller, fulfillment, stock, price, affiliate redirect, and public product name for all four products.
- Repeat the CPSC recall search for all four exact products.
- Confirm that Braun's facial epilation head remains dry-use only and that only the cleansing brush carries wet/dry approval.
- Confirm Remington's exact `EP1050FCDN` identity and ignore the unrelated generic feature block.
- Verify whether private publisher evidence confirms Bellabe model `118`; omit it publicly if not.
- Add exact-product images only for ranked-product depictions and verify that packaging matches. A separate generic editorial electric-versus-manual type graphic may be used under the approved prompt.
- Implement mobile table scrolling, disclosure placement, sponsored links, canonical, metadata, and schema.
- Confirm that all four products were rechecked during 2026 before retaining `2026` in the SEO title and H1.
- In any later year, comprehensively refresh the article and update the year; otherwise remove the year from the SEO title and H1.

## Part 2 approval result

- Opening, Top 3, comparison table, product-card structure, two-type framework, seven-part buying guide, expectations, FAQs, SEO package, word allocation, and Bellabe conditional naming are approved.
- The July 20, 2026 minor contract corrections are applied.
- Part 3 drafting may begin without reopening product or structural research.

## Amendments, 2026-10-01

The article was rewritten on 2026-10-01 under the rules Arif set for the pillar on 2026-09-28, plus an evidence recheck. Where this list conflicts with the sections above, this list wins.

- **Lengths are maximums.** Summary at most 60 words, verdict at most 30. Don't pad to reach a range.
- **One statement of each drawback.** A drawback in the table and Cons isn't restated in the Summary, Verdict, Top 3 card or conclusion. Example: the FaceSpa's dry-only head sits in the table, Cons and the "Power and water" guide card only.
- **Short names in prose:** FaceSpa Pro, Smooth & Silky, Smooth Finish, Bellabe. Codes stay in titles and the table.
- **Plain method sentence** in the opening: "manufacturer documentation and current retail listing". No internal terms such as "retailer identities".
- **Bellabe's public name is "Bellabe Facial Hair Remover".** "Original" is in neither the brand's nor the retail name. Model 118 shows in the retail listing's model field, but that isn't one of the proofs this contract asks for, so it stays private.
- **Bellabe's areas** are from its home page: upper lip, chin, cheeks and jawline.
- **Types and How to choose render as grouped cards** (`cards: labelled_paragraphs`), each card 25–35 words, as on the pillar.
  - Types has one group (power) with the two formats.
  - How to choose has three groups and six cards: Approved areas, Face-only or face-and-body, Head size and placement, Hair type, Power and water, Cleaning and extras.
  - The "Choose between electric and manual" heading is dropped, because the Types cards already say it.
- **The type callout** is "Format shortcut:", because a callout title must end in a colon.
- **The electric-versus-manual graphic is dropped.** A card section can't hold an image, and the two cards already carry the comparison.
- **Prices:** dated manufacturer prices only (Remington $20.99, Tweezerman $22.00, both on 2026-10-01). No US price was found for the FaceSpa Pro or Bellabe, so neither shows one.
- **Warranty:** the FaceSpa's 1-year term comes from a 2017 manual and may not be current, so the article doesn't state it.
- **The pillar link** is relative, and its anchor says what the pillar delivers: "compare body epilators and their approved areas".
- **The conclusion** answers the opening question as conditions instead of restating badges.
- **Dev review fixes (2026-10-01, Arif):**
  - **Top 3 card text is one short line of fit, at most about 100 characters.** The card clamps at three lines, and the longer text was cut off.
  - **Awards drop "Facial Epilator":** Best Overall, Best Budget Electric, Best Manual, Best Minimalist Manual. The page is only about facial epilators.
  - **Table columns, decision fields only (Arif: "no useful information, only generic text"; per `06` §14, `12` "Comparison-table SEO" and `14` Prompt 17):** Best for, Maker's US price (Oct 1, 2026), How it removes hair, Approved facial areas, Main drawback. The award column is gone, because the cards already show it. "In the box" is gone too, because it didn't help anyone choose.
    - A price shows only where the maker publishes one, dated. The FaceSpa and Bellabe show "Not listed".
    - Amazon US prices couldn't be read, because Amazon keeps a UAE delivery address for this connection.
    - This replaces the column names in "Comparison-table contract".
- **Writing-guideline pass (2026-10-01, Arif: "fix readability, use our writing guidelines"):**
  - **Table cells** are short plain phrases, with no semicolons. "In the box" lists contents only; care steps stay in the pros.
  - **Verdict openings vary.** Before, all four opened with "Choose it", which breaks 03 §22 (no more than two cards with the same command verb).
  - **Summaries** say what the product means for the buyer and don't restate the pros or the table (05 §11, feature dumping).
  - **Weight labels** are plain words: "Approved facial areas", "What owners commonly report". The weights are unchanged.
  - **Jargon removed** from the guide cards ("isolates small zones", "water approval per attachment"). The 37-word sentence in "What to expect" is split.
  - **Ranking weight:** the 10% weight "Independent testing and recurring owner-feedback confidence" is now "Recurring owner-feedback confidence". The article cites no independent testing.
  - **Technique source:** the line now cites Braun's US manual instead of the Braun India guide, using the manual's own wording (stretch the skin, gentle pressure, against growth, don't press too hard). The "reduces breakage" claim went with the India page.
  - **Keyword:** "best epilator for face" appears once in the conclusion.
  - **Long sentence:** the NHS sentence is split in two.
  - **No laser link yet:** the two laser posts (`/skin-care/laser-hair-removal/`, `/skin-care/best-laser-hair-removal-2024/`) are two separate posts competing for one topic. Each has dated titles, unsourced permanence claims, and IPL devices labelled as laser. They're queued for a rewrite in `articles/laser-hair-removal/update-plan-2026-10-01.md`. Link the last FAQ ("better than tweezing, shaving...") to the rewritten page once it's live.
