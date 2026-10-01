# Epilator cluster: publication and internal-link plan, 2026-09-28

This plan covers how the four epilator pages reach production, and how their internal links go live without ever pointing at a page that doesn't exist.

It extends phase 5 of `audits/sanity-import-plan-2026-09-28.md`. The pillar's own fixes are in `best-epilators-at-home-hair-removal/audit-2026-09-28-pre-production.md`.

## 1. Where each page stands

| Page | URL | In the CMS today | Package state | Gate before production |
|---|---|---|---|---|
| Pillar: best epilators | `/skin-care/best-epilators/` | **Live** since 2026-09-28 | Three links held. Restore patches are ready (2026-10-01). | None. Re-apply when a support page goes live (runbook §5). |
| Best face epilators | `/skin-care/best-face-epilators/` | Production: the legacy **post** is live. `dev`: the new article is a draft and its 4 products are published (2026-10-01). | Rewritten 2026-10-01 with an evidence recheck. `cms.yaml` done and rehearsed. OG card made. | Arif's read on `dev`, his go-ahead, 2 product images (Tweezerman, Bellabe), the FaceSpa rename, unpublishing the legacy post |
| Pubic-hair permission | `/skin-care/can-you-use-an-epilator-on-pubic-hair/` | Production: nothing (404). `dev`: a draft, re-applied 2026-10-01. | Three `[!CAUTION]` callouts and an OG card added 2026-10-01. | Arif's read on `dev`, the real `dates.published`, his go-ahead |
| Underarm technique | `/skin-care/how-to-epilate-underarms/` | Production: nothing (404). `dev`: **published and complete**. | Complete. Committed `b247b7b`. | The real `dates.published`, his go-ahead |

**The production steps for all three pages are in `production-runbook-2026-10-01.md`.**

Also live: the legacy article `/skin-care/braun-epilator/` ("Best Braun Epilator For Quick And Easy Hair Removal"). It overlaps with the pillar; see audit finding S3.

## 2. Recommended order: pillar first, with two links held

**Recommendation:** publish the pillar as soon as its audit fixes are done. Hold its two links to the medical-review pages. Restore each link on the day its page goes live.

- **Why:**
  - The two support pages wait on a medical review that has no date.
  - Meanwhile the live URL still serves the old legacy article.
  - The sync doc (L72) forbids links to pages that aren't live, and holding them satisfies that.
- **What it trades away:** the pillar goes live without the two sideways links for a while. The support pages still link back to it the day each one launches.
- **The alternative:** publish all four together, as the site audit (L283) suggests. That is cleaner in one sense: one crawl sees the whole cluster. But the pillar would wait on the medical review.
- **Decided by Arif on 2026-09-28:** the pillar goes first, with the two links held.

## 3. Internal-link map

| From | To | Where | Anchor now | State | Action |
|---|---|---|---|---|---|
| Pillar | Face page | L239 (Types, facial card) | "facial epilator guide" | Live (legacy post) | Make the URL relative like the other two (it's absolute today). Keep it. |
| Pillar | Pubic-hair page | L243 (Types, bikini card) | "pubic-hair and bikini-line permission" | 404 | **Hold** until live |
| Pillar | Underarm page | L265 (guide, Treatment area card) | "underarm epilation steps" | 404 | **Hold** until live |
| Pillar | Face page and pubic-hair page | L321 (FAQ 5) | none | — | When both are live, replace the FAQ's face and bikini-line sentences with one link to each (audit duplication fix). |
| Face page | Pillar | face L167 | "guide to epilators for face and body" | Pillar is live | The anchor promises face-and-body guidance the pillar doesn't give. Reword it, or add coverage to the pillar (audit S4). |
| Pubic-hair page | Pillar | pubic L53 | promises a comparison "by intended treatment area" | — | Same as above |
| Underarm page | Pillar | underarm L22 | — | — | Check the anchor against what the pillar says about underarms |
| Support pages | Each other | — | none | — | Keep it that way (sync doc L71) |
| Established pages | Pillar | — | — | — | After launch, list the site's other epilation mentions (search the dataset for "epilat") and add links only where they help (checklist `18` §8). `/skin-care/braun-epilator/` is the first candidate if it's kept. |

**How a hold works.**
- **Today:** the importer strips HTML comments silently. So a hold is just the anchor text left unlinked, followed by a comment:
  `underarm epilation steps<!-- INTERNAL-LINK HOLD: /skin-care/how-to-epilate-underarms/ -->`
- **Proposed change:** have `plan` print every `INTERNAL-LINK HOLD` comment as an open task, so a hold can't be forgotten. It's small: `stripComments` already sees every comment.
- **Restoring:** when the page goes live, put the Markdown link back and re-apply the pillar.
- **Built on 2026-09-28:** `plan` now prints one `INTERNAL-LINK HOLD` note per held link. The test for it passes, and it fails when the pattern is broken. Three holds are in place, and each has its restore text:

| Held at | Page | Restore to |
|---|---|---|
| Types, "Bikini and precision formats" card | pubic-hair | "Check the manual for [pubic-hair and bikini-line permission](/skin-care/can-you-use-an-epilator-on-pubic-hair/)." |
| Guide, "Treatment area" card | underarm | Add after the Braun sentence: "Our [underarm epilation steps](/skin-care/how-to-epilate-underarms/) cover the technique." |
| FAQ 5 | pubic-hair | "For the underarms and bikini line, check the manual, use the specified cap, and see [where an epilator can be used safely](/skin-care/can-you-use-an-epilator-on-pubic-hair/)." |

## 4. Steps

1. **Pillar fixes.**
   - Do the audit's evidence work first (B3 prices, B4 manufacturer sources).
   - Then make the copy fixes and hold the two links.
   - Apply to `dev`. Arif publishes and checks it there.
2. **Production, pillar only.**
   - **Progress on 2026-09-28** (Claude ran this under Arif's one-off exception):
     - Backed up the touched documents to blog `backups/pre-migration-2026-09-28-best-epilators.json`: the article and 4 products.
     - Applied the drafts (9 actions, read back field for field).
     - Published the 7 products. The 4 reused products' links changed short code only; each old and new link was checked to redirect to the same ASIN.
     - Arif deployed the blog (`4672d80`), added the three images, and published the products and the article.
     - **Live-page check, 2026-09-28: passed.**
       - Head: title, description, canonical, `index, follow`, one H1.
       - 51 article headings with no skipped levels.
       - 7 review cards, a 7-row table, 6 FAQs.
       - 17 affiliate links (7 unique; the SE7-041 goes to `3VTOEmF`).
       - All 7 content links render. None of the 3 held URLs is linked. All 19 internal links return 200.
       - The disclosure carries the Associates statement. No "TOP RATED" sticker.
       - JSON-LD: BlogPosting, BreadcrumbList and 7 Products. Published date kept (2026-06-12).
       - One sitemap entry.
       - All product images load.
       - Layouts checked at 375, 866, 1280 and 1440 px.
     - **Fixed the same day:** two reused products still carried their legacy titles ("Braun Silk-épil 9 Flex SES9-041 3D", "Braun Silk-épil 9 Epilator SES9-441"). The importer doesn't own a reused product's title, so Arif renamed both in Studio to "Braun Silk-épil 9 Flex SES9-041" and "Braun Silk-épil 9 SES9-441". Publishing the products revalidated the page by itself (checked live). The SES9-441 rename also shows on `/skin-care/braun-epilator/`.
     - **Left open:** the SES9-041 image is the legacy 488×488.
     - **Blog changes deployed the same day** (Arif): the Sanity image loader (images now request their slot width), a Check Price button in the table's hover preview, and the Studio "Revalidate now" fix (it sent `type: "content"`, which the manual route has rejected since 2026-09-19).
   - Apply it to the production dataset as a draft (`--dataset production --confirm best-epilators`, `status: approved_for_publication`).
   - Publish the products (`publish-products`), then publish the article in Studio.
   - Revalidate, then check the live page:
     - every internal link returns 200;
     - 7 cards and 17 affiliate links;
     - the canonical is right;
     - there's one sitemap entry for the URL.
   - Arif runs the production commands. I don't run anything against production.
3. **Face page.**
   - Write `cms.yaml` with the contract tool (`draft`, then review `needs_review`, then `validate`).
   - Rehearse on `dev`. Add images.
   - Publish the new article at the same slug. The article takes precedence over the legacy post, so the URL doesn't change.
   - Then **unpublish the legacy post.** The sitemap lists posts and articles without removing duplicates (`sitemap.ts` and `getAllPosts`), so leaving it listed would put the URL in the sitemap twice.
4a. **Medical-review gate resolved, 2026-09-29 (Arif: "nobody does, and nobody will").** No qualified medical reviewer is available for either support page. Rather than publish unreviewed clinical judgment, or strip the pages down to vague pointers, both were rewritten under a new **attribution rule**, added to each `article-contract.md`:
   - Every anatomy, wound-care, or escalation claim is attributed to one named, currently live, already-reviewed source (NCI, ACOG, AAD, MedlinePlus, NHS) in the sentence that states it — never blended across sources into a WhoAdvice-authored tier or decision tree.
   - All cited sources were re-checked live on 2026-09-29 and are current (AAD 2/11/22; MedlinePlus reviewed 10/14/2025; NHS reviewed 09/2026, resolving the July freshness flag; NCI vulva/perineum/penis/scrotum/anus and ACOG's two pages unchanged/current).
   - The pubic-hair page's planned anatomical orientation diagram is **dropped**. A bespoke illustration is original artwork, not an attribution to an existing reviewed source, so it can't be resolved the same way. A licensed illustration or its own review would be needed later.
   - Both `audit.md` files and both `article-contract.md` files are updated to record this; both are back to `ready_for_editorial_review` with no medical-reviewer field.
5. **Pubic-hair and underarm pages.**
   - **Progress on 2026-09-29:** `cms.yaml` written for both (`article_format: editorial`, no products, `status: ready_for_editorial_review`). Both `validate` clean (0 errors, 0 warnings).
     - Underarm's single-column "Device branch" table doesn't fit the decision-table block (needs 2–6 data columns), so it's now a bulleted list; the contract is updated to match.
     - Both `plan` on `dev` passed the Studio schema check. Both `apply` to `dev` succeeded and were verified field for field: pubic-hair has its 2 decision tables (4 and 5 rows) and 8 FAQs; underarm has its 1 table (5 rows) and 7 FAQs, confirmed by a direct read-back of the draft documents.
     - Both are drafts only, so they 404 on the public `dev` site (the live route reads published content only). **Arif: open each in Studio to review, then publish on `dev` to check the rendered page** before I touch production.
     - **2026-09-29, underarm redesign.** Arif checked underarm on `dev` and found it thin: no images, and "callouts too dry, add types or guide cards for steps." Two importer features added and tested (39 pass, 1 pre-existing unrelated fail): a `**Title:**` blockquote now auto-promotes to a styled callout card, and a `**Tip:**` line inside a guide card becomes that card's EXPERT TIP box. Underarm's 11 steps now render as guide cards; its "Pause before switching sides" note is step 9's tip. Applied to the `dev` draft, verified field for field. **2026-09-29, card length:** Arif then found several cards ran 4–6 lines (steps 2, 5, 7, 9), stretching each row to the tallest card. All 11 trimmed to 83–150 characters (2–3 lines); content moved out went to that step's tip where still worth keeping (steps 2, 5, 7 gained new tips; step 9 kept its existing one), not dropped. Applied, verified: all 11 bodies ≤150 chars, 4 tips present. **Arif needs to publish it again on `dev` to see the cards** — the published copy he already checked is still the old plain version. The image gap is still open: he's generating the two planned illustrations himself from the prompts in `publisher-handoff.md`; I wire them in once he has files.
     - **2026-09-29, underarm images and page design.** Arif published underarm on `dev` and asked for images, captions and better callouts. Now done and published on `dev`:
       - **Three captioned figures.** The technique sequence is Arif's GPT render with its empty caption row cropped off. The water-symbol and hair-below-skin diagrams are hand-drawn SVG, because GPT's symbol card crossed out the whole device. The files and SVG sources are in `images/`, and each caption is the markdown image title.
       - **Thumbnail.** It's panels 2–3 of the technique image at 1200x630, uploaded by Arif as the OG image. GPT's own cover was rejected because it drew three arms.
       - **Stop rule.** "Stop before you begin" is a `> [!CAUTION]` callout, which renders as a warm caution card instead of green checks.
       - **External links** site-wide are `nofollow` "for now" (Arif).
       - **Blog, uncommitted, Arif commits:**
         - the `ArticleFigure` component, plus a caption field on images;
         - the callout redesign, with a `caution` tone;
         - a centred 896px reading column, with cards, tables and carousels kept full width;
         - a centred header when there is no hero image;
         - the disclosure redesigned, and hidden on `editorial` articles.
         The page needs that deploy before production looks like `dev`.
       - **Importer and packages** committed as vault `b247b7b`.
   - Write the real `dates.published` value before production; `cms.yaml` currently holds a placeholder (2026-09-29, the rehearsal date).
   - Publish, then restore that page's held link in the pillar and re-apply the pillar.
6. **Legacy cleanup.**
   - `/skin-care/braun-epilator/`: redirect it (a `next.config.mjs` entry and a deploy) or keep it, per audit S3.
   - Request indexing for each new or changed URL.
7. **Cluster check after each launch:**
   - all cluster links return 200;
   - anchors match what the destination delivers;
   - no page links to a held URL.

## 5. Open questions (Arif)

1. ~~Publish order~~: decided on 2026-09-28. The pillar goes first, with the links held.
2. ~~Who does the qualified medical review~~: resolved 2026-09-29 — nobody, and the attribution rule (§4a) replaces the gate.
3. ~~Hold reporting~~: built on 2026-09-28 (section 3).
4. `/skin-care/braun-epilator/`: redirect to the pillar or keep it (step 6). Check its Search Console clicks first.
5. ~~Recheck the three NCI penis/scrotum/anus entries~~: done 2026-09-29, unchanged.

## 6. Start here next time

State on 2026-10-01, end of day:
- **The pillar is live.** Its three holds stay until each support page goes live. The restore patches are ready: `best-epilators-at-home-hair-removal/link-restore-underarm.patch` and `link-restore-pubic-hair.patch`. Both dry-run clean against today's `article.md`. The pillar's Types card also now says "Bellabe Facial Hair Remover". That ships with the next pillar apply.
- **Underarm is complete on `dev`** and waits only on the go-live date and Arif's go-ahead.
- **Pubic hair is a `dev` draft, re-applied 2026-10-01.**
  - Its stop rules are now three `[!CAUTION]` callouts: the three-yes check, "Stop and ask first", and "Stop epilating immediately if".
  - Inline-code terms became quoted text, because the schema has no code mark and the backticks were being dropped.
  - Its OG card is `images/pubic-hair-epilation-thumbnail-1200x630.png`. It's typographic, with no anatomy.
- **The face page is rewritten and rehearsed on `dev`** (2026-10-01):
  - The copy follows the amended contract (Amendments section in its `article-contract.md`).
  - The evidence was rechecked live: `research/best-face-epilator-evidence-refresh-2026-10-01.md`.
  - Dated manufacturer prices: Remington $20.99 and Tweezerman $22.00. No US price was found for the FaceSpa or Bellabe.
  - Bellabe is renamed "Bellabe Facial Hair Remover".
  - Types and How to choose are grouped cards. The L167 link is relative, with an accurate anchor.
  - `cms.yaml` reuses the two exact-model legacy products (FaceSpa `d6448c7e`, Remington `f40521dd`) and creates Tweezerman and Bellabe.
  - Its 4 products are published on `dev`; the article is a draft (`b7c5e669`).
  - OG card: `images/best-face-epilators-thumbnail-1200x630.png`.
  - **Later the same day, after Arif's review on `dev`:**
    - **Content audit:** one ranking weight renamed, because the article shows no independent testing. The technique line now cites Braun's US manual. One keyword use in the conclusion, and one long sentence split.
    - **Writing-guideline pass:** verdict openings vary, summaries no longer repeat the pros, and the guide cards dropped their jargon.
    - **Shorter elements:** top-pick descriptions are one line, and awards drop "Facial Epilator".
    - **Comparison table rebuilt from decision fields only:** Best for, Maker's US price (dated), How it removes hair, Approved facial areas, Main drawback. Amazon US prices couldn't be read from here, so the FaceSpa and Bellabe show "Not listed".
    - All recorded in the face contract's Amendments.
    - The `dev` draft holds all of it. **Arif must publish it again on `dev` to see it.**
  - **On `dev` only so far:**
    - Emily Cooper's bio is rewritten. The old one claimed expertise and "clients" that nothing supports; Arif: "generic author profile, update as needed".
    - The FaceSpa product title is "Braun FaceSpa Pro 911".
    - Both are production Studio steps in the runbook. Backups are in blog `backups/`.
  - **The legacy Remington image** is a text banner that crops badly in the cards. Worth replacing when Arif uploads the Tweezerman and Bellabe images.
- **Blog layout (uncommitted, Arif commits).** Four files, 2026-10-01: `ArticleContent.tsx`, `ArticleHero.tsx`, the article `page.tsx` and `ProductReviewSlider.tsx`.
  - The whole article shares one left edge with the header. Text keeps an 896px reading width, and cards, tables and sliders use the full container.
  - The header is full width without a hero image.
  - The review slide is exactly the container's width.
  - Verified at 390, 1280, 1440 and 1920px. Typecheck, lint and the impeccable layout detector are clean.
  - **This reverses the 2026-09-29 "text in the centre" ruling** at Arif's request: "fix alignment of all sections".
  - It needs deploying with `19588be` before production.
- **`dev` server trap:** the Turbopack cache `.next/dev` grew to 3.6 GB, and the server ran out of memory within 20 minutes of each start. It's moved to `~/backups-tmp/next-dev-cache-2026-10-01`, safe to delete. If it recurs, move `.next/dev` aside again.
- **Laser posts:** `articles/laser-hair-removal/update-plan-2026-10-01.md`. They become one post updated in 2026, later (Arif).
- **`production-runbook-2026-10-01.md`** holds every production command and Studio step for the three pages, the pillar restores and the live check.
- **Live check:** `tools/sanity-import/scripts/check-cluster.mjs` (read-only GETs). It was shown passing (underarm on `dev`) and failing (the pubic-hair 404 on `dev`, and a held link) on 2026-10-01.
  - The `dev` pillar's published copy still links both support pages, because it predates the holds. Production's pillar was checked holding them on 2026-09-28.

**Waiting on Arif:**
1. Commit the blog layout files, then deploy them with `19588be`.
2. Publish pubic hair and face on `dev` (Studio), revalidate, and read both. The `dev` server is `NEXT_PUBLIC_SANITY_DATASET=dev npx next dev -p 4000` in `~/personal/blog`.
3. Optional: give Amazon US prices for the FaceSpa and Bellabe, dated, to fill the two "Not listed" cells. Also decide whether the pillar's table gets the same decision-field treatment.
4. Give the go-ahead and the go-live date per page. Claude then sets the approvals in `cms.yaml` and commits.
5. Run the runbook. On the face page that includes: rename the FaceSpa product, upload the Tweezerman and Bellabe product images, upload the OG images, and unpublish the legacy post `6131cf39`.
6. Decide `/skin-care/braun-epilator/`: redirect or keep (§5 question 4).
