# Epilator pillar: pre-production audit, 2026-09-28

The page audited is `/skin-care/best-epilators/` as it renders from the `dev` dataset on the local site, plus this package's `article.md`, `cms.yaml`, `sources.md`, contract, brief and the product records.

Rules used: reference `02`, `03`, `05`, `06`, `07`, `12`, `16`, `17` and `18`.

How the evidence was gathered:
- **SEO and UX:** checked in the browser at 375, 866, 1024, 1280 and 1440 px. That covered head tags, JSON-LD, the heading outline, every link and every image.
- **Writing rules and duplication:** two read-only reviews did the line-by-line pass.
- **Spot checks:** I re-checked their high-impact claims against the files. Each one I confirmed is marked ✓. Anything unmarked is the reviewer's reading and has not been re-checked.

Each finding is labelled as one of four kinds:
- **Fact** — seen in a file or on the page.
- **Measured** — a number read from the rendered page.
- **Judgment** — an opinion about quality.
- **Decision** — Arif's call.

---

## 1. Already fixed in this session

- **Wrong affiliate link (fact).** The SE7-041 link `amzn.to/4gIcrP5` redirected to ASIN `B0CQBWLSY4`. The researched ASIN is `B0CWJF37L8`.
  - Replaced it with `amzn.to/3VTOEmF`. Its redirect was checked and lands on `B0CWJF37L8`.
  - The change is in five files: the product record, `cms.yaml`, `sources.md`, `publisher-handoff.md` and `article.md`. The old link is kept in the notes of `sources.md` and the product record.
  - Applied to `dev`, and the product is published there.
  - The other six links redirect to their contract ASINs.
- **Affiliate disclosure (fact).** The box under the hero now carries the Amazon Associates statement and the editorial-independence line.
  - The file is blog `src/components/Post/AffiliateDisclosure.tsx`. It is uncommitted and Arif commits it.
  - It shows a "Learn more" link only once `EDITORIAL_DISCLOSURE_URL` is set.
- **Layout (measured).**
  - **Review cards:** a slider from 1280 px. Below that they stack, with a "View more" toggle on phones.
  - **Top picks:** a snap slider. Controls appear only where the cards overflow.
  - **Card links (S9):** links inside type, guide and FAQ cards now render as links.

---

## 2. Blockers before production

Ranked by impact.

| # | Finding | Kind | Fix |
|---|---|---|---|
| B1 | The pillar links to `/skin-care/can-you-use-an-epilator-on-pubic-hair/` (L243) and `/skin-care/how-to-epilate-underarms/` (L265). Neither page exists in the dataset, and both return 404 on `dev` ✓. The cluster sync doc (L72) says support URLs must be live before these links go live. | Fact | Hold both links until the pages are live. See `../cluster-publication-plan-2026-09-28.md`. |
| B2 | BRE708/00, SE7-041 and BRE728/00 have no image ✓. Two of them are top picks 2 and 3, so the first cards on the page are grey boxes, and their Product JSON-LD has no `image`. | Fact | Add exact-model images in Studio before production. |
| B3 | **No price is on file for any of the 7 ranked products ✓.** The only two dollar figures in the records belong to type-only products. Yet the copy makes 12 price comparisons: "costs more" (L22, L62, L329), "below Flex pricing" (L30), "Premium price" (L36), "lower-cost" (L176), "cost less" (L231). Two badges also rest on price ("Best Wet/Dry Braun Value", "Best Budget Braun Kit"). So does the 10% value weight. | Fact | Record a dated price in each `products/*.md` at the publication-day check. If an order doesn't hold (for example, the SE7-041 not being below the SES9-041), rewrite L30, L94 and L176 and the affected badge. |
| B4 | **Specs with no source on file ✓:** <ul><li>SE7-041 "massage rollers" and "wide head" (L38, L92, L99, L253). Neither the product record nor `sources.md` mentions them.</li><li>SES9-441 "precision handle" (L40).</li><li>Braun 3-270: its only sources are Good Housekeeping (listed as competitor discovery) and the Amazon listing. There's no Braun page or manual.</li><li>BRE227/00: its specs aren't in its product record.</li></ul> | Fact | Add the manufacturer page or manual to `sources.md` for each model and confirm the spec, or cut it. If SE7-041 stays unconfirmed: <ul><li>L38 becomes "40 tweezers; two speeds".</li><li>L99 becomes "Two speeds allow a cautious first pass."</li><li>L253 drops ", as with the SE7-041".</li><li>L40 becomes "Wide pivoting head".</li></ul> |
| B5 | L209 tells readers that "Unresolved catalog or regional-source limitations remain in the private evidence record rather than appearing as artificial buyer drawbacks" ✓. It's internal wording, it says limitations are withheld, and it would publish. | Fact | Replace it with: "Where retailer listings conflicted with the manufacturer, we used the manufacturer's documentation." |
| B6 | The hero shows a "2026 TOP RATED" sticker. It's hard-coded in `ArticleHero.tsx:175` ✓. The page has no ratings, and its evidence model is research without testing. | Fact | Remove the sticker, or replace it with something the page supports, such as "Updated 2026". It's a template change and applies to every article. |

---

## 3. SEO

**Passes (measured):**
- **Head fields:**
  - The title is 56 characters, and the meta description is 148.
  - "best epilator" appears in the title, H1, first 100 words and meta description.
  - There's a single H1.
  - The canonical is `https://whoadvice.com/skin-care/best-epilators/`, and robots is `index, follow`.
  - Open Graph and Twitter tags are present.
- **Structured data:** BlogPosting (author, dates, image) and BreadcrumbList are present.
- **Links:**
  - All 25 in-page `#` links resolve to an element.
  - All 17 Amazon links carry `rel="sponsored noopener noreferrer"`.
  - Every internal link returns 200, except the two in B1.
- **Slug:** the article takes precedence over any post with the same slug (`getContentBySlug`). Publishing replaces the live page at the same URL. `dev` holds one document with this slug.

**Defects:**

| # | Finding | Kind | Fix |
|---|---|---|---|
| S1 | **Heading outline.** The page has 74 H1–H3 headings.<ul><li>Each product title is an H2 inside the "Best epilator reviews" H2. That gives 7 extra H2s.</li><li>"Why we love it" and "Points to consider" are H3s in every card. That's 14 identical headings.</li><li>Type and guide card titles are H3, the same level as the group headings above them.</li></ul> | Measured | Blog template changes: <ul><li>review title H2 → H3;</li><li>pros/cons labels H3 → a styled `<p>`;</li><li>card titles become H4 when their block follows an H3 group heading.</li></ul> |
| S2 | **Product markup.** The page emits 7 Product objects, each with a nested Review (author, body, pros/cons). None has `reviewRating`, `offers` or `aggregateRating`, and 3 have no image. There's no ItemList for the ranked list, which checklist `18` §10 asks for. | Fact (markup). Eligibility is unverified. | Run the page through Google's Rich Results Test. Don't add ratings the page doesn't publish. **Decision:** keep Product/Review, or replace it with an ItemList of the seven ranked products that links to each card anchor. |
| S3 | The legacy article `/skin-care/braun-epilator/` ("Best Braun Epilator For Quick And Easy Hair Removal") is live (200 on `dev` ✓). It competes with the pillar, which ranks four Braun models. The publish plan doesn't deal with it. | Fact (exists); judgment (competes) | **Decision:** 301 it to the pillar through `next.config.mjs` redirects, or keep it as a distinct "best braun epilator" page. Check its Search Console clicks first. |
| S4 | **Treatment-area gap.** The cluster gives the pillar underarm, bikini and face-and-body buying intent (keyword-cluster L148 and L186; underarm brief L50–54; pubic brief L63–67). But the pillar has no per-product area data. All three support pages link back with anchors that promise that comparison. | Fact (reviewer, cited lines) | **Decision:** <ul><li>Option A: add the sourced Philips permissions to the pillar and mark the Braun area permissions as unconfirmed. The sources: underarm `research.md` L59–60 (BRE708/00 and BRE728/00 underarms; BRE227/00 underarms with the delicate-area cap) and pubic `research.md` L88 and L200 (BRE708/BRE728 bikini line).</li><li>Option B: reword the three return anchors.</li></ul> |
| S5 | "Best epilator(s)" appears in 4 of 9 H2s. Two of those (L193, L259) are required by the contract. | Judgment | Leave it. It's low impact. |

---

## 4. User experience

| # | Finding | Kind | Fix |
|---|---|---|---|
| U1 | On a 375 px phone, the comparison table is 2,136 px wide inside a 354 px scroller. That's about six screens of sideways scrolling, and the product column doesn't stick. The cells are already short (2–9 words), so the width comes from the table component. | Measured | `ComparisonTable`: make the product column `position: sticky; left: 0` and lower the minimum column widths. Alternatively, show one card per product on phones. |
| U2 | There's no table of contents. The hero has two jump links (Top Picks, Compare Models). The page reads as 16 minutes across 8 H2 sections. | Measured; judgment | Add a compact "On this page" list of H2s. The query already returns `headings`. |
| U3 | "Why we love it" sounds personal on a page that says it did no hands-on testing. | Judgment | Use "Strengths" and "Points to consider". This is in the template (`ProsCons.tsx`). |
| U4 | Related posts at the bottom show legacy titles with typos, for example "Blackhead Removal Tool T0 Get Rid of Blackheads". | Fact | Fix it sitewide, separately from this article. |

---

## 5. Writing rules

**Strengths:**
- There's no invented testing or first-person experience.
- The opening question is answered in its next sentence.
- Health copy is attributed where the claim is made (Philips manual, Philips troubleshooting, NHS).
- Every card names a buyer, a deciding drawback and a direct sibling comparison.
- Punctuation, sentence length and banned-phrase checks pass.

**Defects.** The first 7 rows are high and medium impact. The low-impact rows follow them.

| Line | Finding | Replacement |
|---|---|---|
| Throughout | **Two voices ✓.** The Types and buying-guide cards use contractions, because I rewrote them to rule `03` §6. The rest of the article doesn't (for example "does not" at L293 and L317, "Do not" at L299 and L305). | Contract the prose everywhere except in warnings. |
| L287 | "Don't use an epilator on broken, inflamed, or infected skin" is a safety warning, and rule `03` §6 keeps warnings uncontracted. I introduced this. | "Do not use an epilator on broken, inflamed, or infected skin, and get professional advice if a condition affects your skin." |
| Throughout | The key comparison rests on two codes one digit apart: SES9-041 (12 times) and SES9-441 (8 times). This is a judgment call. | Keep the codes in titles and the table. In prose use "Silk-épil 9 Flex", "Silk-épil 9 body-grooming kit", "Series 8000", "Series 9000", "Series 2000", "Silk-épil 7" and "Silk-épil 3". **Decision.** |
| L26, L37, L71 | "ProGuide" is never explained, and neither is why ceramic tweezers matter. Nothing on file says what ProGuide does (L77). | Define ProGuide once, from the Philips spec sheet. Until then, L26 becomes: "This Philips kit gives you wet/dry use and up to 60 minutes of stated runtime without storing the Series 9000's nine attachments." |
| L16, L195, L211 | Internal register: "current retailer identities", "exact-model manufacturer documentation", "Retailer eligibility determined whether", "Scores were comparative within this approved lineup". | L16: "WhoAdvice checked each model's manufacturer documentation and current retail listing, and reviewed recurring owner-reported patterns."<br>L211: "We judged each model against the other six, not against a fixed standard." |
| L50, L56, L251 | A manufacturer design claim is stated as fact: "a fully flexible head designed to maintain contact". L209 promises that design claims are attributed. | "Braun pairs 40 MicroGrip tweezers with a fully flexible head that it says keeps contact around curved body areas." |
| L289 | IPL is the only unexplained acronym on the page. | "IPL (intense pulsed light) uses light to reduce regrowth and has eligibility limits." (Nothing is added about who is eligible; there's no source for it.) |
| L293 | "It may become more manageable…". Here "It" refers to epilation. The sentence also repeats L317 ✓. | Cut this sentence and keep the FAQ version at L317. |
| L299 | "remains useful for comparing general hair-removal methods, not for proving epilator-specific effects" is a note about the source, left in the published copy. | "To compare epilation with other hair-removal methods, see the American Academy of Dermatology's overview." |
| L309 | "dry use improves visibility and cleanup" states an experience as fact. | "Recurring owner-reported patterns split: some owners find dry use shows hairs better and cleans up faster, while others find approved wet use more comfortable. Try wet use only if the manual approves it." |
| L329 | The opening asks about the lowest-cost route. The conclusion never answers it. | Answer it once B3's prices are on file. |
| L157, L176 | "simple plug-in reliability" and "older head design" have no source. | Cut "reliability" and "older". |
| L94, L115, L136, L157, L178 | Trailing filler ("for body use", "at home", "during body epilation", "during regular body sessions"). The contract's 25–30-word minimum for verdicts forces it. | Cut the filler. **Decision:** change the contract's verdict range to a maximum. |
| L233, L239, L243, L269, L295, L305, L321 | Low-impact wording: an unclear "it", an unsourced design intent ("deliberately slower"), and hedges about the page itself. L321's "bikini line generally refers to external skin" has no source in this package. | Take them one by one from the writing review. Cut L321's clause and link to the pubic-hair page once it's live. |

---

## 6. Duplication

Across the three support pages there is no cannibalization: each has a different search intent. The problem is restating inside the pillar, where each product's limitation appears 4–6 times.

| # | Repeated idea | Where | Keep | Fix |
|---|---|---|---|---|
| D1 | SES9-041 cost and missing body trimmer | L22, L36, L52, L62–63, L329 | Table and con | Top pick and conclusion: say who should choose the SES9-441 instead. |
| D2 | BRE708/00 has fewer attachments than BRE728/00 | L26, L37, L71, L73, L79, L84 | Table, pro, con | Cut the top pick's second sentence (it matches con L84). Cut the last sentence of the L71 summary. |
| D3 | Philips spec block | L37, L39 (identical cells), L71, L78, L113, L120–121 | Both table rows | L113: say it's the same epilator as the BRE708/00, then name the nine attachments (from the spec sheet). Merge the duplicate pros at L120–121. |
| D4 | "Wet/dry isn't better; corded is the value choice" | L269, L325 (FAQ 6), L231, L293, L309 | Guide card L269 | Cut FAQ 6 or reword it. **Decision:** the contract fixes the six FAQs (article-contract L221–228). |
| D5 | Top picks restate their table rows and verdicts | L22, L26, L30 | — | Each top pick should give one buyer-fit line and one tradeoff clause, with no spec list. Brief L64 already requires this. |
| D6 | FAQs 1, 3 and 4 repeat "What to expect" | L305 vs L299; L313 vs L297; L317 vs L293 | The sourced body text | Keep the FAQ's first sentence as the answer and cut the rest. For FAQ 4, see L293 above. |
| D7 | Types cards repeat each other, and the guide repeats Types | L241 vs L253; L243 vs L255; L225 vs L235; guide L273 vs Types L247–253; L267 vs L223–235 | Types describes the kinds; the guide gives the rules | Cut the repeated first sentences. Move L257 ("Neither head width is universally better…") into the guide's Head design card. |
| D8 | The "Type shortcut" callout repeats the guide intro | L217 vs L261 | Callout sentence 1 (required by the contract) | Cut the callout's second sentence. |
| D9 | The package-contents list appears in the summaries | L50, L92, L134 vs table | Table | Keep what the list means ("covers shaving and trimming without a large kit") and drop the list. |

**Contract lines that block some of these fixes:** article-contract L90, L140–141 (summary and verdict minimums), L214, L221–228 (the fixed FAQ list), L232 and L243–246 (conclusion shape). **Decision:** amend them, or accept the repetition.

---

## 6a. Evidence check results (2026-09-28)

This research was done after the audit, from manufacturer pages, the NA manuals and US retailers. It corrects B3 and B4.

**B4 was overstated.** Most of the specs were true; they just weren't in the source files yet.
- **Now confirmed:**
  - SE7-041: massage roller cap, and a "wide" head ("40% wider" than the Silk-épil 5). Braun Nordics/CA pages and the Silk-épil 7 NA manual.
  - SES9-441: wide pivoting head; "Precision handle" (Silk-épil 9 range page); body trimmer included.
  - 3-270: massaging rollers, corded, dry only, shaver head with trimmer cap. The NA manual names the 3-270. The 20-tweezer count is stated for the range only.
  - BRE227/00: corded, dry only, massage cap, one speed.
- **Not supported:** the BRE227/00 "fixed head". Philips never describes its head type. This affects:
  - the table cell "Compact fixed head";
  - the Types "Fixed heads" card, which uses the Series 2000 as its example;
  - the card's con "Dry-only fixed-head design".
- **Conflict:** Braun sources disagree on the SES9-041's box. uk.braun.com says skin contact cap. braunshop.co.uk says roller massage cap and trimmer cap.
- **Settled:**
  - BRE708/00's three items are the epilator head, ProGuide and a pouch.
  - BRE728/00's nine are: body exfoliation brush, pouch, bikini trimmer head, bikini trimmer comb, trimming comb, epilator head, ProGuide, pedicure head and shaving head.
  - ProGuide, in Philips' words: it "helps to stretch the skin during epilation and to keep the epilating head at the correct 75° angle".

**B3 prices (US, 2026-09-28):**
- **Found:**
  - BRE708/00: $79.95 (Philips, Walmart).
  - BRE728/00: $149.95 (Philips) and $119.95 (Walmart).
  - BRE227/00: $39.95 (Walmart) and $39.99 (Best Buy).
  - 3-270: $49.94 (Walmart) and $49.99 (Target).
- **Not found:** SES9-041, SES9-441 and SE7-041. Braun US sells none of them, and Best Buy lists the SE7-041 as no longer available new.
- **Consequences:**
  - Claims ranking Braun models by price can't be verified: "costs more", "below Flex pricing", "Premium price", and the "Value" badge.
  - "Corded is cheaper" holds against the Philips cordless picks only.
  - "Budget Braun" is supported only as the cheapest Silk-épil on Target.

**Housekeeping:**
- The Philips spec-sheet PDFs listed in `sources.md` now return 404.
- Braun's model pages are regional. The NA manuals come from us.braun.com service pages.

## 7. Decisions

Arif decided these on 2026-09-28:
1. **Publish order:** the pillar goes first, with the two links held. Each link is restored when its page goes live.
2. **Contract:** amend it.
   - Verdict length becomes a maximum.
   - FAQs 1, 3, 4 and 6 are trimmed to their answers.
   - The conclusion answers the question instead of restating the badges.
3. **Treatment areas (S4):** add the sourced Philips permissions to the pillar, and mark the Braun area permissions as unconfirmed.
4. **Model names:** use short names in prose. Codes stay in titles and the table.

Still open:
5. **Structured data (S2):** run Google's Rich Results Test first, then choose between Product/Review and ItemList.
6. **Legacy `/skin-care/braun-epilator/` (S3):** check its Search Console clicks, then redirect it or keep it.

## 7a. Status after the copy pass (2026-09-28)

The draft has been applied to `dev`. It's waiting for Arif to publish it in Studio.

**Done:**
- **B1:** the three pillar links to the two unpublished pages are held. `plan` lists them.
- **B3:** every price claim that can't be checked is gone. Comparisons stay only where a dated US price supports them:
  - the Series 9000 costs more than the Series 8000;
  - the Series 2000 costs less than the cordless Philips picks;
  - the Silk-épil 3 is a budget Braun kit.
- **SE7-041 badge:** renamed to "Best Wet/Dry Braun for Legs" in `article.md`, `cms.yaml` and the contract.
- **B4:** the confirmed specs are recorded in `sources.md`. The unsupported BRE227/00 "fixed head" is removed everywhere.
- **B5:** the "private evidence record" sentence is gone.
- **B6, S1, U1, U3:** done in the blog template. It's uncommitted, and Arif commits it.
- **Section 5 (writing rules), all addressed:**
  - short model names in prose;
  - contractions everywhere except warnings;
  - ProGuide is now explained;
  - IPL is spelled out;
  - the internal research wording is gone.
- **Section 6 (duplication):** fixed within the amended contract.
  - Summaries run 33–51 words and verdicts 24–28.
  - Each drawback now appears in the table and its con, plus at most one pointer to a sibling model.

**Still open:**
- **B2:** images for the three products. Arif is uploading them.
- **S2:** run the Rich Results Test.
- **S3:** the legacy `/skin-care/braun-epilator/` page.
- **U2:** an "On this page" list.
- **Publication day:** confirm the SE7-041 is still sold new on Amazon US. Best Buy lists it as no longer available new.
- **Contract:** "non-permanent results" in What to expect still needs a source before a sentence is added.

## 8. Order of work once decided

1. Evidence first. Record prices and manufacturer sources (B3, B4). This decides which copy changes are needed.
2. Make the copy fixes (B5, sections 5 and 6) in one pass on `article.md`, then apply to `dev` and have Arif publish.
3. Template fixes in the blog (B6, S1, U1–U3). Arif commits them.
4. Add images (B2) in Studio.
5. Re-run this audit's measured checks on `dev`, then move to production as the cluster plan describes.
