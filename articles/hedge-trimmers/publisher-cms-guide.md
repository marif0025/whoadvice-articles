# Publisher note: publishing the hedge-trimmer cluster in the CMS

**Prepared:** July 16, 2026  
**Scope:** The seven completed hedge-trimmer articles listed below  
**Current state:** Editorial drafts and article audits are complete. Responsible human approval, CMS implementation, and publication-day freshness checks remain required.

## Which files to use

For each page, use only these two files during CMS entry:

1. `article.md` is the authoritative reader-facing copy.
2. `publisher-handoff.md` is the authoritative CMS instruction sheet for metadata, canonical URL, affiliate destinations, internal links, images, schema, and final checks.

Do not publish copy from `research.md`, `sources.md`, `content-brief.md`, `article-contract.md`, a product record, or an audit. Those files explain evidence and editorial decisions but are not public article copy.

Do not regenerate, paraphrase, or “improve” the final article inside the CMS. Preserve the approved H1, headings, product order, awards, tables, summaries, verdicts, pros, cons, FAQs, links, evidence wording, and conclusions. If a CMS limitation requires a material change, return it to editorial review rather than silently rewriting it.

## Completed pages

| Page | Reader copy | CMS instructions |
|---|---|---|
| Best hedge trimmers | `best-hedge-trimmers/article.md` | `best-hedge-trimmers/publisher-handoff.md` |
| Best corded hedge trimmers | `best-corded-hedge-trimmers/article.md` | `best-corded-hedge-trimmers/publisher-handoff.md` |
| Best cordless hedge trimmers | `best-cordless-hedge-trimmers/article.md` | `best-cordless-hedge-trimmers/publisher-handoff.md` |
| Best pole hedge trimmers | `best-pole-hedge-trimmers/article.md` | `best-pole-hedge-trimmers/publisher-handoff.md` |
| Corded vs cordless hedge trimmer | `corded-vs-cordless-hedge-trimmer/article.md` | `corded-vs-cordless-hedge-trimmer/publisher-handoff.md` |
| What size hedge trimmer do I need? | `what-size-hedge-trimmer-do-i-need/article.md` | `what-size-hedge-trimmer-do-i-need/publisher-handoff.md` |
| Hedge trimmer vs loppers vs pruning saw | `hedge-trimmer-vs-loppers-vs-pruning-saw/article.md` | `hedge-trimmer-vs-loppers-vs-pruning-saw/publisher-handoff.md` |

The sharpening, cleaning, and safe-use folders are not included in this publishing batch because they are still at brief or research stages.

## CMS entry procedure

### 1. Create or update the page record

- Use the slug, canonical URL, SEO title, H1, meta description, category, tags, excerpt, and editorial badge from that page's `publisher-handoff.md`.
- Use the visible H1 from `article.md` as the page heading. Do not render a second H1 from the CMS theme.
- Set the author, responsible reviewer, publication date, and updated date accurately.
- Keep the page in draft or staging until the checks in this note are complete.

### 2. Import the reader-facing article

- Copy the article body from `article.md` without the Markdown metadata lines that belong in CMS fields.
- Convert Markdown headings, tables, lists, blockquotes, and links into the site's normal semantic components.
- Do not display HTML comments such as `CMS TOP 3 PICKS COMPONENT` or `CMS IMAGE`; use them as placement instructions and remove the comments from rendered output.
- Convert `<callout>` blocks into the site's accessible callout or decision-box component. Keep the visible wording unchanged unless editorial approves a revision.
- Preserve comparison tables as HTML tables with responsive horizontal scrolling on small screens. Do not replace the only copy of decision information with an image.

### 3. Build roundup product components

- Keep the exact ranked order and editorial awards recorded in `article.md` and `publisher-handoff.md`.
- Map Title, Slug, Editorial badge, Brand, Summary, Verdict, Pros, and Cons into the matching CMS fields.
- Where the article includes ASIN and Affiliate link fields, treat them as CMS data rather than prose if the template supports that separation.
- Do not substitute a neighboring model, tool-only package, battery kit, blade length, or retailer variation.
- Do not add star ratings, review scores, hands-on labels, or Product rich-result claims that are not present in the approved copy.

### 4. Add affiliate buttons and disclosures

- Use only the publisher-confirmed affiliate destination listed in that page's `publisher-handoff.md` and the shared `products/destination-register.md`.
- Do not create, shorten, infer, or replace an affiliate link during CMS entry.
- Keep the Amazon Associate disclosure before the first commercial link on every roundup.
- Render commercial links with the site's approved `rel="sponsored"` treatment and any required disclosure attributes.
- For informational pages marked `affiliate_links: false`, do not add product buttons merely because related roundups contain affiliate links.

### 5. Implement internal and external links

- Preserve internal links already present in `article.md`.
- Add any CMS-only opportunities listed in the page handoff only when the destination is live.
- Publish or update reciprocal links among the hub, corded, cordless, pole, size, power-format, and tool-selection pages.
- Use descriptive anchors and do not repeat one exact anchor mechanically across the cluster.
- Keep authoritative source links only where the handoff says they materially support public claims. Do not expose raw marketplace, community, or affiliate-research URLs as editorial evidence.

### 6. Add images and decision graphics

- Follow each handoff's filename, alt-text, exact-model, licensing, and package requirements.
- Use exact-model licensed product images for ranked products. Do not use AI-generated images to depict an exact selected product.
- Brand-neutral diagrams are acceptable where the handoff requests them, including the corded-versus-cordless property-layout graphic, blade-length-versus-gap diagram, tool-selection graphic, and pole tool-length-versus-user-inclusive-reach diagram.
- Keep measurements, warnings, and decision rules in HTML. Visuals supplement the article; they do not replace accessible text.
- Set image dimensions, compress files, use modern formats where supported, and prevent layout shift.

### 7. Add structured data

- Use `Article` or `BlogPosting` with accurate headline, author, reviewer, dates, and lead image.
- Add `BreadcrumbList` only when matching breadcrumbs are visible.
- Use `ItemList` only for the numbered products in a roundup and preserve their visible order. For the pole article, include the seven ranked homeowner products; keep the unnumbered Husqvarna specialist alternative outside the numbered ItemList.
- Do not add Google Product rich-result markup to these multi-product roundups unless a later eligibility review approves it.
- Do not assume an FAQ section qualifies for FAQ rich results. Visible FAQ content must remain useful even without special search treatment.

## Checks immediately before publication

Complete and record these checks for every page:

- Responsible human editor approves the final rendered page.
- Canonical, slug, title, H1, meta description, excerpt, product count, product order, and awards match the handoff.
- Every affiliate redirect reaches the recorded exact ASIN, model, variation, and package.
- Seller, fulfillment, US availability, stock, price presentation, kit contents, warranty wording, and discontinued status are rechecked.
- The current CPSC recall database and relevant manufacturer notices are rechecked for selected exact models.
- Internal and external links resolve to the intended live pages.
- Affiliate disclosure and `rel="sponsored"` behavior are present.
- Tables, callouts, buttons, jump links, breadcrumbs, and images work on mobile and keyboard navigation.
- Image licenses, exact-model identity, alt text, dimensions, compression, and captions are correct.
- Structured data validates and matches visible content.
- The page returns `200`, is indexable, uses the intended canonical, and is included in the XML sitemap.
- Page speed, layout shift, accessibility, and Core Web Vitals receive a final staging check.

If a product is unavailable or a redirect lands on a different variation, do not substitute another product in the CMS. Pause that page and return the issue to editorial so the article, comparison table, product record, sources, and handoff can be updated together.

## Suggested publication order

Publish the cluster in one coordinated release when possible. If pages must go live sequentially, use this order so supporting destinations exist before the commercial hub sends readers to them:

1. Hedge trimmer vs loppers vs pruning saw
2. What size hedge trimmer do I need?
3. Corded vs cordless hedge trimmer
4. Best corded hedge trimmers
5. Best cordless hedge trimmers
6. Best pole hedge trimmers
7. Best hedge trimmers hub

After the final page is live, verify reciprocal links from the hub to every branch and from each branch back to the hub or the appropriate decision guide.

## Publisher completion record

Record the following in the CMS ticket or publication log for each URL:

```text
Page:
CMS draft URL:
Live URL:
Publisher:
Human editor/reviewer:
Article file version or commit:
Publication-day product and affiliate check completed:
Recall check completed:
Links checked:
Images and licenses checked:
Structured data validated:
Mobile/accessibility check completed:
Published or returned to editorial:
Notes:
```

Publishing is complete only when the live page matches `article.md`, the CMS implementation follows `publisher-handoff.md`, and the completion record documents the time-sensitive checks.

