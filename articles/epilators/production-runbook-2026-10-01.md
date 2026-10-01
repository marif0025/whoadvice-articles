# Epilator cluster: production runbook, 2026-10-01

This runbook takes the three remaining pages to production: underarm, pubic hair and face. Then it restores the pillar's held links and checks the whole cluster.

- **Who runs what.** Arif runs every production command and every Studio action. Claude edits vault files only: `cms.yaml` approvals, the link-restore patches and the records.
- **Order.** Each page can go alone, in any order. Underarm is ready first.
- **Shell.** Run commands one block at a time, in WSL.

## 0. Before any page

1. The blog commit `19588be` ("Article page styles updated") must be deployed and Ready on Vercel. Without it, figures and caution callouts render with the old components.
   - **Also commit and deploy the 2026-10-01 layout:** `ArticleContent.tsx`, `ArticleHero.tsx`, the article `page.tsx` and `ProductReviewSlider.tsx`. The whole article shares one left edge with the header, and the review slide matches the container.
2. Set up the shell once per session:

```bash
cd ~/code/whoadvice/tools/sanity-import
```

```bash
export PATH=/home/arif/.nvm/versions/node/v24.15.0/bin:$PATH
```

3. **Author bio, production Studio.** Replace Emily Cooper's bio (author `76ed96f2-0cc6-42f9-af3b-e1c59223f73e`) with the version already on `dev` (changed 2026-10-01; Arif: "generic author profile, update as needed"). The old one claimed expertise and "clients" that nothing supports. The new bio has two paragraphs:
   - "Emily Cooper writes skin-care buying guides for WhoAdvice."
   - "Her guides are research-based. They compare manufacturer documentation, current retail listings, and recurring owner-reported patterns. WhoAdvice does not test products hands-on."

   The old `dev` copy is backed up in blog `backups/dev-author-emily-cooper-2026-10-01.json`.

## 1. Read each page on dev and give the go-ahead

| Page | dev Studio | State on dev |
|---|---|---|
| Underarm | already published | Complete |
| Pubic hair | `/studio/structure/article;3ae4a66e-1bdd-44d4-be1e-3ad8ef60e36a` | Draft. Three caution callouts added 2026-10-01. |
| Face | `/studio/structure/article;b7c5e669-eda9-4a3b-81ba-6436c4c42fc3` | Draft. Its 4 products are published on dev. |

For pubic hair and face:
1. Open the page in Studio on dev and publish it.
2. Press **Revalidate now**.
3. Read the page on the dev site.

Then tell Claude which pages are approved and their go-live date. Claude sets these in each `cms.yaml`:
- `status: approved_for_publication`
- `approved_by: Arif`
- `approved_at: <date>`
- the real `dates.published`

Claude then commits the vault. Production refuses a plan until the status is set.

## 2. Underarm

```bash
node src/cli.ts plan ../../articles/epilators/how-to-epilate-underarms --dataset production
```

Read the plan's output. It should show one article `create`, three images, and no warnings beyond the expected "must be published".

```bash
node src/cli.ts apply ../../articles/epilators/how-to-epilate-underarms --dataset production --confirm how-to-epilate-underarms
```

The apply uploads the three figures before writing the draft.

**In production Studio:**
1. Open the new draft.
2. Upload the OG image from `how-to-epilate-underarms/images/underarm-epilation-thumbnail-1200x630.png`.
3. Publish.
4. Press **Revalidate now**.

Then restore the pillar link (section 5).

## 3. Pubic hair

```bash
node src/cli.ts plan ../../articles/epilators/can-you-use-an-epilator-on-pubic-hair --dataset production
```

```bash
node src/cli.ts apply ../../articles/epilators/can-you-use-an-epilator-on-pubic-hair --dataset production --confirm can-you-use-an-epilator-on-pubic-hair
```

**In production Studio:**
1. Upload the OG image from `can-you-use-an-epilator-on-pubic-hair/images/pubic-hair-epilation-thumbnail-1200x630.png`.
2. Publish.
3. Press **Revalidate now**.

Then restore the pillar links (section 5).

## 4. Face

```bash
node src/cli.ts plan ../../articles/epilators/best-face-epilators --dataset production
```

What to expect from the plan:
- One article `create`.
- Two reused legacy products, which get `asin`, `link` and `brand`: `d6448c7e` (FaceSpa) and `f40521dd` (Remington).
- Two new products: Tweezerman and Bellabe.
- A warning that the legacy post `6131cf39` shares the slug. That's expected; step 5 below handles it.

```bash
node src/cli.ts apply ../../articles/epilators/best-face-epilators --dataset production --confirm best-face-epilators
```

```bash
node src/cli.ts publish-products ../../articles/epilators/best-face-epilators --dataset production --confirm products
```

**In production Studio:**
1. **Rename** product `d6448c7e`, "Braun Face Epilator Facespa Pro 911", to "Braun FaceSpa Pro 911". The importer never owns a reused title. Publish it. (It's already renamed on `dev`.)
2. **Upload product images** for "Tweezerman Smooth Finish Facial Hair Remover 5090-R" and "Bellabe Facial Hair Remover". Both are new and have no image. Publish both.
3. **Upload the OG image** from `best-face-epilators/images/best-face-epilators-thumbnail-1200x630.png` on the new article. Publish the article.
4. Press **Revalidate now**.
5. **Unpublish the legacy post** "Best Face Epilators To Get Smooth And Shiny Skin" (`6131cf39-d24e-4ab2-97fe-67d1ebe44436`). Unpublish it; don't delete it. Until then the sitemap lists the URL twice.

## 5. Restore the pillar's held links

Do this the same day each support page goes live. Claude applies the patch in the vault and commits. Then Arif re-applies the pillar.

| Page live | Patch | What it restores |
|---|---|---|
| Underarm | `best-epilators-at-home-hair-removal/link-restore-underarm.patch` | The guide's Treatment area card links "underarm epilation steps" |
| Pubic hair | `best-epilators-at-home-hair-removal/link-restore-pubic-hair.patch` | The Types bikini card and FAQ 5 link the pubic-hair page |

The same pillar apply also carries the Bellabe rename in the Types spring card ("Bellabe Facial Hair Remover").

```bash
node src/cli.ts plan ../../articles/epilators/best-epilators-at-home-hair-removal --dataset production
```

```bash
node src/cli.ts apply ../../articles/epilators/best-epilators-at-home-hair-removal --dataset production --confirm best-epilators
```

Then publish the pillar in Studio and press **Revalidate now**.

## 6. Check the live cluster (read-only)

The checker only sends GET requests. For each page it checks:
- the page answers 200;
- there is one H1;
- the canonical URL is right;
- every same-site link in the article answers 200;
- no link points at a held page;
- every Amazon link is `sponsored`.

It exits 1 on any failure.

List only the pages that are live. Pass `--held` for each support page that isn't live yet. For example, with underarm and face live and pubic hair not:

```bash
node scripts/check-cluster.mjs https://whoadvice.com /skin-care/best-epilators/ /skin-care/how-to-epilate-underarms/ /skin-care/best-face-epilators/ --held /skin-care/can-you-use-an-epilator-on-pubic-hair/
```

With all four live:

```bash
node scripts/check-cluster.mjs https://whoadvice.com /skin-care/best-epilators/ /skin-care/how-to-epilate-underarms/ /skin-care/can-you-use-an-epilator-on-pubic-hair/ /skin-care/best-face-epilators/
```

Also check by hand:
- the sitemap lists `/skin-care/best-face-epilators/` once;
- the face page shows 4 review cards, each with a product image.

## 7. After launch

- Request indexing in Search Console and Bing Webmaster Tools for each new or changed URL.
- `/skin-care/braun-epilator/` is still open: redirect it to the pillar, or keep it (cluster plan §6, audit S3). Check its Search Console clicks first.
- Record each launch in `cluster-publication-plan-2026-09-28.md`.
