# Epilator cluster: publication and internal-link plan, 2026-09-28

This plan covers how the four epilator pages reach production, and how their internal links go live without ever pointing at a page that doesn't exist.

It extends phase 5 of `audits/sanity-import-plan-2026-09-28.md`. The pillar's own fixes are in `best-epilators-at-home-hair-removal/audit-2026-09-28-pre-production.md`.

## 1. Where each page stands

| Page | URL | In the CMS today | Package state | Gate before production |
|---|---|---|---|---|
| Pillar: best epilators | `/skin-care/best-epilators/` | A legacy article at this slug is live. The new version is rehearsed on `dev`. | Contract done; audit fixes pending | The audit's blockers B1–B6 |
| Best face epilators | `/skin-care/best-face-epilators/` | A legacy **post** ("Best Face Epilators To Get Smooth And Shiny Skin") is live | Article, handoff and 4 product records ready. No `cms.yaml` yet. | Editorial review. Then `cms.yaml`, a `dev` rehearsal and images. |
| Pubic-hair permission | `/skin-care/can-you-use-an-epilator-on-pubic-hair/` | Nothing (404) | Part 4 complete. No `cms.yaml`. | **Qualified medical review** (sync doc L102) |
| Underarm technique | `/skin-care/how-to-epilate-underarms/` | Nothing (404) | Part 4 complete. No `cms.yaml`. | **Qualified medical review** (sync doc L103) |

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
     - **Left open:**
       - Two reused products still carry their legacy titles, "Braun Silk-épil 9 Flex SES9-041 3D" and "Braun Silk-épil 9 Epilator SES9-441". They show on the cards, the top picks, the table and in JSON-LD, while the table labels and the prose say "Braun Silk-épil 9 Flex SES9-041" and "Braun Silk-épil 9 SES9-441". The importer doesn't own a reused product's title, so this is a Studio edit. The SES9-441 rename also shows on `/skin-care/braun-epilator/`.
       - The SES9-041 image is the legacy 488×488.
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
4. **Medical review** of the pubic-hair and underarm pages. This is outside the tooling and needs a named reviewer.
5. **Pubic-hair and underarm pages, each after its review.**
   - Write `cms.yaml`. Their tables become decision-table blocks.
   - Rehearse on `dev`, then publish.
   - The same day, restore that page's held link in the pillar and re-apply the pillar.
6. **Legacy cleanup.**
   - `/skin-care/braun-epilator/`: redirect it (a `next.config.mjs` entry and a deploy) or keep it, per audit S3.
   - Request indexing for each new or changed URL.
7. **Cluster check after each launch:**
   - all cluster links return 200;
   - anchors match what the destination delivers;
   - no page links to a held URL.

## 5. Open questions (Arif)

1. ~~Publish order~~: decided on 2026-09-28. The pillar goes first, with the links held.
2. Who does the qualified medical review for the two informational pages, and when.
3. Whether to add the importer's hold reporting (step 3 of section 3) now.
