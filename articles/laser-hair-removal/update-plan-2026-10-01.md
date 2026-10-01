# Laser hair removal posts: update plan, 2026-10-01

Two legacy **posts** cover the same topic. This file is the task list for replacing them with one researched article.

Found during the face-epilator content audit (2026-10-01). The face page's last FAQ links here once a rewritten page is live (`epilators/best-face-epilators/article-contract.md`, Amendments).

## 1. What exists (read from `dev`, a copy of production from 2026-09-28)

They are **two different articles with two slugs**, not one article published twice:
- the text differs, sharing about 21 of 75–93 distinct words in the body;
- the product lists don't overlap;
- both are Emily Cooper's posts in `skin-care`, with no SEO title or meta description set.

| | Post A | Post B |
|---|---|---|
| URL | `/skin-care/best-laser-hair-removal-2024/` | `/skin-care/laser-hair-removal/` |
| ID | `a52e70fc-adda-484b-a2cd-1b00f567786b` | `c9386ece-d093-459d-89bb-5033381f4d12` |
| Title | Best Laser Hair Removal 2024 For Smooth And Silky Skin | Best Laser Hair Removal  2025 To Get Hair-free Skin (double space in the title) |
| Published | 2024-08-07 | 2025-04-30 |
| Words | 1,264 in total: body 165, products intro 135, types 309, guide 241, 10 FAQs 394 | 1,264 in total: body 149, products intro 134, types 276, guide 275, 10 FAQs 410 |
| Products | 7: Finequin, Blex T033KW, Braun PL7387, Arsupen AP30, Braun 00069055889893, MY SHEEN SKIN, AMOTAOS PB2 | 9: Braun YT-OPUF-M3TN-TR, Finequin 144, Braun PL5157, IAEVGGA IPL, Braun IPL5347, Ubroo IPL, Braun IPL3221, FAUSTINA B08DHF4GZ9, ARTOLF B0CPPMSK2S |

## 2. Problems

1. **They compete for one search intent.** Two URLs target "best laser hair removal". Neither can rank well while both exist.
2. **The titles carry stale years** (2024, 2025).
3. **Permanence is stated as fact.** Post A says the device destroys follicles, "stopping future hair growth". Post B says it prevents hair "from growing back". The vault forbids permanent-result claims without a source.
4. **Laser versus IPL is muddled.** Post B's list includes devices named IPL (IAEVGGA IPL, Braun IPL5347, Braun IPL3221, Ubroo IPL) under a "laser" title. Most at-home devices are IPL. Check each model's technology from its manufacturer before reusing any of them.
5. **Product titles are catalogue codes,** not names: "Braun 00069055889893 Laser Hair Removal", "Braun YT-OPUF-M3TN-TR", "FAUSTINA B08DHF4GZ9", "ARTOLF B0CPPMSK2S".
6. **No SEO title or meta description** on either post.
7. **No sources, no method statement, no dated research,** on a health-adjacent topic. Skin tone and hair colour eligibility, eye safety and medical conditions are core to choosing a device.

## 3. Tasks

1. **Search Console:** compare both URLs' clicks, impressions and queries for the last 16 months. Pick the URL that keeps the page. Recommendation: `/skin-care/laser-hair-removal/`, which carries no year in the slug.
2. **Keyword and intent check:** does "at-home laser hair removal" mean IPL to searchers? Decide whether the page is "Best at-home IPL and laser hair removal devices", and how to name laser versus IPL honestly.
3. **Product research** under the vault's normal package workflow (`reference/README.md`):
   - exact current models;
   - manufacturer manuals for skin-tone and hair-colour limits, treatment areas and eye safety;
   - FDA clearance where claimed;
   - CPSC recall checks;
   - dated US prices.
   Reuse a legacy product only where its exact model is confirmed.
4. **Write the package:** `article.md`, contract, sources and `cms.yaml`, as a `product_guide` **article**. Health claims are attributed to named reviewed sources, as in the epilator support pages.
5. **Rehearse on `dev`.** Then production with Arif's go-ahead.
6. **Consolidate:** publish the new article at the kept URL. Unpublish both legacy posts. Add a redirect from the dropped URL in `next.config.mjs`; that needs a blog deploy, which Arif does.
7. **Link it in:**
   - from the face page's FAQ 6 ("better than tweezing, shaving, waxing, or dermaplaning");
   - from the pillar's "Epilator vs. IPL" guide card;
   - check `/skin-care/braun-epilator/` and other skin-care pages for mentions.

## 4. Decisions

- **Arif, 2026-10-01:** the two posts become one post, updated in 2026. It's scheduled for later, after the epilator cluster's production launches.
- Still open: which URL survives (decide after the Search Console check in task 1), and whether the page is IPL-first or laser and IPL together.
