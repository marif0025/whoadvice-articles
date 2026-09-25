# WhoAdvice site audit - 2026-09-25

**Scope:** whoadvice.com (design, content, on-page SEO, technical SEO, accessibility, performance, trust), the Google Search Console and Bing Webmaster exports for 24 Jun to 23 Sep 2026, the site code in `~/personal/blog`, and the editorial rules in this vault.
**Page under the microscope:** `/skin-care/best-epilators/`.
**Evidence:** every finding cited here has an ID. The full text, evidence, fix and checker's notes for 366 of the 374 findings are in [[site-audit-2026-09-25-findings]]. The other 8 describe live security holes. This repo is public, so they are kept in the local, git-ignored `audits/private/` folder until they are fixed.

---

## 1. The answer

The writing rules in this vault are good. The site does not show their work.

Three problems explain most of what is wrong:

1. **Approved articles never reach the site.** The epilator pillar has been approved for editorial review since 20 July, but the live page is still the 2024 legacy version. The importer that would publish it was added to the site repo and deleted the same day (17 Sep, 12:54 and 16:29). The workflow in `11` has no publishing stage, so nothing flags the gap. (CON-01, SEO-01, PIPE-01, RULES-01)
2. **The site template makes claims the vault forbids.** Every product guide carries a "TOP RATED" sticker. Every legacy guide says "Expert Tested". The footer on every page says "We test". No page carries Amazon's required Associate statement. (TRUST-01 to TRUST-04, DES-02)
3. **Google sends no clicks, and Bing is the only working channel.** Google gave 481 impressions and 0 clicks in 92 days. Bing gave 1,876 impressions and 4 clicks, and epilator queries are 64% of Bing's keyword impressions. (DATA-01, DATA-09)

The live site also has security problems that need fixing this week. Section 3 points to where they are kept.

### Recommendation

Stop starting new article packages until the epilator pillar is live through a repeatable pipeline.

- **Why it fits:** about 15 approved packages are waiting, and writing more adds nothing a reader can see. The epilator pillar is the most complete package and matches the only query with measurable demand.
- **What holds it up:** an editor can approve the pillar, and the deleted importer can be restored from git (`9c80846`).
- **What it trades away:** new clusters wait 1 to 2 weeks.
- **Verified:** every defect in section 3, including the security findings, which were re-checked against the live site.
- **Uncertain:** whether Google starts sending clicks after the fixes. Bing is the realistic first win. The 3 to 5 day engineering estimate is the pipeline checker's estimate, not a measurement.
- **Next step:** the week-one list in section 3, then priority 2 in section 4.

---

## 2. How this was audited

Eleven agents each audited one area. A second agent per area then tried to disprove every finding by re-reading the cited file, page or data row.

| Result | Count |
|---|---|
| Findings that survived checking | 374 |
| Rejected by the checker | 1 |
| Could not be checked | 1 |
| Corrected in detail by the checker | 227 |
| Severity changed by the checker | 50 |
| Critical / high / medium / low | 20 / 90 / 162 / 102 |

I re-checked the critical findings myself against the code, the live site and git history. All of them held.

**Limits.** Google's PageSpeed API quota was used up, so performance findings come from code and browser measurements, not Lighthouse scores. Some competitor sites could not be fetched. The Search Console export covers 3 months, and 64% of its impressions are anonymised. Section 9 lists what the audit did not cover.

---

## 3. Fix this week

These are small, and each one is either a security hole, a compliance gap or a false statement to readers.

| # | Fix | Where | Findings |
|---|---|---|---|
| 1 | **Security fixes.** Eight findings, two of them urgent. They are not in this repo because it is public. Read them in the local file `audits/private/site-audit-2026-09-25-security.md`, which git ignores. | see that file | private |
| 2 | **Remove the newsletter form or connect it.** It shows "Thanks for signing up!" and sends the address nowhere. | `src/components/EmailSection/email-form.tsx`, siteLayout in Sanity | A11Y-01, DES-01, TRUST-13 |
| 3 | **Add Amazon's Associate statement.** "As an Amazon Associate, WhoAdvice earns from qualifying purchases." It belongs in the article disclosure and the footer. | `AffiliateDisclosure.tsx`, footer `legalContent` | TRUST-04, CON-22 |
| 4 | **Remove template claims.** Delete the "{year} TOP RATED" sticker. Change the "Expert Tested" fallback to "Research-Based Buying Guide". Rename "Why we love it" to "What stands out" and "EXPERT TIP" to "Tip". Fix the Sanity help text that suggests "Expert Tested". | `ArticleHero.tsx`, `ProsCons.tsx`, `GuideItemCard.tsx`, both schemas | TRUST-01, TRUST-02, DES-02, DES-03, DES-V01 |
| 5 | **Rewrite the footer.** Replace "We test, review, and curate" and "Our testing methodology" with research-based wording. | Sanity siteLayout, footer tab | TRUST-03 |
| 6 | **Hotfix false health claims on legacy pages.** Delete "A true epilator is completely painless". On the face page, remove "100% of dermatologists agree", "Dermatologist Recommended" and "painless". | Sanity post documents | CON-04, TRUST-20 |
| 7 | **Redirect the lost hedge-trimmer URL.** `/garden-tools/best-corded-hedge-trimmer/` ranked at 6.3 and now returns 404. Also redirect the singular cordless URL to the plural one, and unpublish its legacy post so it leaves the sitemap. | `next.config.mjs`, Sanity | DATA-02, DATA-03 |

---

## 4. Ranked plan

Ordered by impact for the effort, and by dependency. Nothing editorial matters until approved articles can reach the site.

| Rank | Work | Owner | Effort | Findings |
|---|---|---|---|---|
| 1 | The week-one list above | code, CMS | S | section 3 |
| 2 | **Build the publish path.** Restore the hardened importer from `9c80846` into the blog repo. Use UUID ids and patch-only writes, read `publisher-handoff.md`, and fail loudly on unresolved references. Fix the preview token and the "Revalidate now" 400. | code | M | PIPE-01 to PIPE-12 |
| 3 | **Publish the epilator pillar, then the face page.** First close four gaps in the approved article: specs resting on competitor or UK sources (CON-31), the owner-feedback claim with no recorded analysis (CON-32), the missing "intended areas" column (CON-33), and internal jargon (CON-27). Then follow the ordered plan in PIPE-27. | editorial, CMS | M | CON-01, SEO-01, PIPE-27 |
| 4 | **Add a publishing stage to the vault.** Approved means nothing until the live page matches the package. | vault | S | RULES-01, RULES-10, SEO-29 |
| 5 | **Write the design spec and make the template match it.** See section 5. | vault, code | L | RULES-03, DES-34 |
| 6 | **Fix the article template.** Readable column, heading weights, jump navigation, top-pick heading and award, card order, phone table, fewer CTAs, method and conclusion blocks, curated related posts. | code | M | DES-04 to DES-12, DES-07 |
| 7 | **Recover Google on pages that already reach page 1.** Merge the four string-trimmer URLs and the hedge-trimmer twins. Refresh best-smart-plugs (114 impressions at 8.6). Remove stale years from 26 titles. 301 `/skin-care/braun-epilator/` to the pillar. | editorial, code | M | DATA-05 to DATA-08, DATA-12, COMP-17 |
| 8 | **Crawlability and schema.** Paginated category URLs, because 72 of 216 posts have no internal link. Stop serving articles under any category segment. Fix the duplicate slug. Clean up the sitemap. Replace Product/Review nodes on roundups with ItemList. Fix the 404 publisher logo. | code | M | TECH-02 to TECH-07, TECH-16, SEO-10, SEO-12 |
| 9 | **Trust pages.** A "How we research" page, an About page that names the owner, rendered author bios, and a privacy policy that lists the real trackers. Consent handling for GA4 and Clarity. | editorial, code | M | TRUST-09 to TRUST-19 |
| 10 | **Performance.** Responsive images (every image is served at full size). Cache the category and author pages. Remove the unused Swiper bundle. | code | S–M | PERF-01, PERF-V01, PERF-06 |
| 11 | **Accessibility.** Guide text at 3.5:1 contrast, invisible focused heading links, unlabelled form fields, table caption and row headers. | code | S | A11Y-02 to A11Y-06, A11Y-13 |
| 12 | **Information gain on the pillar.** A spec matrix from manufacturer documents, an approved-areas table by exact model, cost against waxing, and a model-number decoder. | editorial | M | COMP-05, COMP-06, COMP-10, COMP-12 |

---

## 5. Recommended article design

This is the roundup anatomy the design, content and SEO findings jointly support. It is written for a publisher that researches but does not test, so every label must be true without hands-on work. The order applies to the blocks a page uses. Not every page needs every block.

| # | Block | Contract |
|---|---|---|
| 1 | Breadcrumb | As now. |
| 2 | Hero | Badge from an approved list (default "Research-Based Buying Guide"). H1. A one-sentence dek written for readers, not the meta description. Byline linked to a real author page. A "Reviewed" month that an editor sets, not Sanity's `_updatedAt`. No image overlay. On phones the first screen shows the picks, not the image. |
| 3 | Disclosure | One line, with the Amazon statement and a link to "How we research". Above the first CTA. |
| 4 | Intro | At most 120 words. State the decision and the evidence basis. |
| 5 | Our top picks | An H2. Three cards, each showing its award, a reason of at most 22 words that does not repeat the verdict, and one CTA. |
| 6 | Jump navigation | Sticky chips on phones and a contents rail on desktop. Anchors already exist. |
| 7 | Comparison table | Badges come from the same field as the cards. Include an "intended areas" column per manual. A table from `md` up, stacked cards on phones. No CTA column. |
| 8 | Which one is for you | A callout mapping reader situations to picks, such as "legs only, first epilator" or "Braun or Philips?". |
| 9 | Reviews | An H2 such as "The 7 epilators, reviewed", with each product as an H3. Order: name, award, verdict with its tradeoff, key specs, "What stands out" and "Tradeoffs", one recorded owner complaint, then one CTA naming the retailer. |
| 10 | Specifications | A matrix from manufacturer documents. Write "Not stated by manufacturer" for gaps, never an estimate. |
| 11 | How we chose | Criteria and weights, sources as external links, the research date, and a plain statement that no hands-on testing was done. |
| 12 | Buying guide | Prose in the reading column, including safety and an "epilator or IPL" paragraph. |
| 13 | What to expect | Aftercare and ingrown hairs, attributed to the manual, NHS or AAD. |
| 14 | FAQ | Real buyer questions from the query data. 40 to 80 words each, with no repeat of the body. |
| 15 | Bottom line | Answers the opening question in decision order. |
| 16 | Related | Three curated cluster links, not a random slice of the category. |

**Reading design.** Prose runs 65 to 75 characters per line. The live page runs about 123 because the prose container is `max-w-max` (DES-05). Headings render at their intended weight once the unlayered `font-weight: inherit` rule is fixed (DES-04). Tables and cards may use the full width.

**Structured data.** Article or BlogPosting, BreadcrumbList and ItemList. No Product or Review nodes on research roundups, which matches the vault's own schema decision (SEO-10, TECH-16).

---

## 6. Vault rule changes

In order. Each edit names the file it changes.

1. **Create `reference/19-article-design-and-rendering-spec.md`.** It owns the rendered page. It maps each markdown section to a Sanity block and a component, lists the headings and labels the template adds, sets content limits per block, image sizes per slot, CTA rules, approved and banned labels, date meanings and the reading column. The full outline is in RULES-03. Route it from `README.md` and the skill at Part 2 and Part 4. (RULES-03)
2. **`11-article-workflow.md`: add a publication and live-parity stage between 14 and 15.** Statuses become `approved_for_publication`, `published`, `live_verified` and `returned_to_editorial`. Record the approver, CMS id, publish date and parity result. Add a rule: a package waiting more than 14 days while a legacy page for the same keyword is live goes back to the editor, and false claims on the legacy page are hotfixed within 48 hours. "Done" means `live_verified`. Promote the completion record from `articles/hedge-trimmers/publisher-cms-guide.md`. (RULES-01)
3. **`18-on-page-seo-checklist.md` and `13`: add a live-page check run against the published URL.** It covers template labels, the Amazon statement, the heading outline, links that resolve (no 404 support pages), schema types matching the handoff, images, alt text and dates. (RULES-10, SEO-29, PIPE-V01)
4. **One handoff format, aligned with Sanity.** Update `12` Part 14 and the skill's `deliverables.md`. Add the article-level badge, evidence model, disclosure text, reviewed date, reviewer, and `approved_by` / `approved_at`. Retire the other five handoff shapes. (RULES-04, PIPE-13, PIPE-14, PIPE-16)
5. **Define dates.** "Published" and "Reviewed" are editor-set fields. `_updatedAt` never appears to readers. This needs a matching code change. (RULES-08, TRUST-06)
6. **Add missing rules.** How prices are shown (RULES-21). Award-label vocabulary, length and brand rules (RULES-22). FAQ answer length and format (RULES-23). Image specs and an owner per slot (RULES-24). The meta description is not the visible dek (RULES-25).
7. **Title separator: " - ", never a colon, plus the brand suffix.** This applies your 23 Sep ruling. The approved epilator title becomes "Best Epilator in 2026 - 7 Picks for At-Home Hair Removal", after recounting the characters. (RULES-29, SEO-31, CON-37)
8. **Inventory legacy slugs before any launch.** Before a new slug ships, check the sitemap and Search Console for singular, plural and dated twins, and redirect them in the same release. The hedge-trimmer launch lost a ranking URL this way. (DATA-04, PIPE-V02)
9. **Remove drift.** One roundup section order across `11`, `13`, `14` and `15` (RULES-14). Bring `12` and `18` back in line (RULES-16). One heading-case rule (RULES-17). One set of stage names (RULES-15). Resolve the clash between "no identical cards" and fixed word windows (RULES-27). Set the reading column (RULES-18). Move the hedge-trimmer specifics out of the generic documents (RULES-26).
10. **Make `audit_article.py` check what the rules say.** Card checks, `[FACT CHECK]` markers and banned template labels. Show each check failing on a deliberately broken fixture before trusting it. Today it reports "Flags: 0" on the epilator article without running any card checks. (RULES-11 to RULES-13)
11. **Clean up.** Remove the deprecated `on-page-seo-checklist.md` pointer and the four zero-byte files at the vault root (`best`, `distinct`, `leading`, `material`). Index or trim the 64 KB prompt library. (RULES-31, RULES-32)

---

## 7. What the search data says

| Measure | Value |
|---|---|
| Google impressions / clicks, 92 days | 481 / 0 |
| Named Google queries at position worse than 50 | 94 of 113 |
| Bing impressions / clicks, same window | 1,876 / 4 |
| Epilator share of Bing keyword impressions | 64% |
| "epilator hair removal" on Bing | 131 impressions, position 7.9 |
| Indexed pages on 21 Aug / 22 Aug / 21 Sep | 176 / 159 / 165 |
| Sitemap URLs with zero Google impressions | 103 of 222 |
| Titles still carrying 2024 or 2025 | 26 of 222 |

What to do with it:

- **Garden tools is the only category with real Google pull.** 95 of its 96 impressions were at position 10 or better, but they are split across duplicates and dated URLs. Consolidate it first. (DATA-05, DATA-06)
- **best-smart-plugs holds 15.6% of page impressions at position 8.6** on a 2024 page. It is the best single refresh target for Google. (DATA-07)
- **Epilators are a Bing opportunity.** Bing's long, conversational queries ask for a need-to-model answer: which epilator for underarms and legs, or for a first-time user. The decision box and the approved-areas table in section 5 answer those directly. (DATA-10, COMP-06)
- **Do not prune by traffic alone.** The corn roaster and callus pages earn every attributed Bing click. The Philips trimmer and Wahl clipper pages sit on page 1 of Bing. (DATA-22, DATA-V01)
- **Export 16 months of data before any prune or merge.** The UI export is 3 months and mostly anonymised. (DATA-01)
- **The brand name collides with "Which?".** Several impressions come from people looking for Which?, and no query contains "whoadvice". (DATA-21, TRUST-29)

---

## 8. Strengths to keep

- **The approved epilator article is better than most of the results page on transparency.** It has a weighted method, a plain "no hands-on testing" statement, and safety text tied to the exact Philips manual, the NHS and the AAD. (COMP, CON strengths)
- **The evidence model is consistent across `01`, `06`, `07`, `12` and `16`.** The problem is enforcement, not the rules.
- **The schema policy in `12` is current.** It already says no Product markup on roundups and makes no promises about FAQ rich results.
- **`README.md` is a real control plane,** with precedence, roles and a maintenance rule.
- **The site has the pieces a better page needs.** The article model already has top picks, a comparison table, callout groups and a decision table. Anchors and scroll margins exist. The hedge-trimmer page proves the "Research-Based Buying Guide" badge works in production.
- **The technical basics are sound.** Canonicals and redirects are correct, and CLS is 0. The CDN caches article pages. Every affiliate link carries `rel="sponsored"`.
- **The deleted importer already solved the hard parts:** UUID ids, field-scoped writes and ambiguity checks. It can be recovered with `git show 9c80846`.

---

## 9. What this audit did not cover

The run stopped before its extra review round to save time. That round would have looked for areas no auditor covered. These were not examined in depth:

- Amazon link health across the 200+ legacy pages
- Monetisation beyond Amazon (AdSense is switched off)
- Homepage and category page design, beyond what the design and trust auditors saw
- Analytics event design
- The products-audit admin tool

---

## 10. Where the evidence is

- **Findings register:** [[site-audit-2026-09-25-findings]], with 366 findings grouped by area. Each finding has its evidence, why it matters, the fix and the checker's correction.
- **Security findings:** the 8 held back are in `audits/private/site-audit-2026-09-25-security.md`. That file is local only, and `.git/info/exclude` keeps it out of git. Move each finding into the register once its fix is live.
- **Raw run output:** the session scratchpad (`audit/merged.json`). It is not kept long-term, so the findings register is the durable copy.
