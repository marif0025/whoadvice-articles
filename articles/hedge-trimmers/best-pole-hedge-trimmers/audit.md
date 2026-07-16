# Best pole hedge trimmers — Part 4 audit

**Audit date:** July 15, 2026  
**Result:** Editorial package passed; CMS and publication-day checks remain.

## 1. Contract pass

- Product order remains DEWALT, CRAFTSMAN, WORX, and BLACK+DECKER, with Husqvarna outside the numbered homeowner ranking.
- Product headings contain only rank, exact brand, and model number. Awards are separate Editorial badge fields.
- Top-pick descriptions are limited to one compact fit-and-tradeoff sentence.
- Section order, design types, buying-guide factors, safety boundary, nine FAQs, and conclusion logic match the approved contract.
- Every review contains one Summary, one comparative-reasoning section, one Verdict, exactly three Pros, exactly two Cons, and an approved affiliate link.

## 2. Evidence pass

- Exact models and packages agree across `article.md`, `research.md`, `sources.md`, the shared product records, and `publisher-handoff.md`.
- WORX WG252.9 and BLACK+DECKER LPHT120B remain clearly identified as bare tools.
- DEWALT working weight remains labeled `Not published or independently verified` in prose.
- CRAFTSMAN's tested weight and handling observations remain attributed to Popular Mechanics; the conflicting retailer weight is not averaged.
- Husqvarna remains a specialist gas alternative, and attachments are described as approved and sold separately.
- No public claim implies WhoAdvice performed hands-on testing.
- The CPSC search was extended through July 16, 2026; no exact-model recall result was identified for the seven ranked homeowner selections or the specialist gas alternative.
- All publisher-confirmed affiliate URLs were checked July 15, 2026 and redirected to their recorded ASINs:

| Product | Redirected ASIN |
|---|---|
| DEWALT DCPH820M1 | `B084CZXM9V` |
| CRAFTSMAN CMCPHT818D1 | `B083WQ1LBC` |
| WORX WG252.9 | `B07W8RXJ8B` |
| BLACK+DECKER LPHT120B | `B00AZW9Y9G` |
| Husqvarna 122LKH | `B0DQ725L11` |

## 3. Voice and readability pass

- Removed duplicated specification lists and defensive evidence language during the editorial revision.
- Product summaries lead with buyer fit; comparison reasoning adds evidence instead of copying the table.
- Headings are direct and product-specific.
- No banned opening, fake empathy, fake hands-on authority, inflated praise, vague expert claim, or manufactured consensus was found.
- The conclusion follows distinct decision branches rather than listing every product mechanically.

## 4. SEO and mechanical pass

- SEO title: 49 characters.
- Meta description: 151 characters.
- Primary keyword appears naturally in the SEO title, H1, opening, buying-guide H2, meta description, and slug.
- One H1 and a valid H2/H3 hierarchy are present.
- All seven ranked homeowner cards and the specialist alternative retain the approved Summary, Verdict, Pros, and Cons structure.
- Every review has exactly three Pros and two Cons.
- Internal links use descriptive anchors. Confirm the sizing and pruning-tool pages are live before publication because their workspace packages currently contain briefs only.
- External links are limited to material manufacturer, independent-test, and CPSC sources.
- Recommended schema remains `Article`, `BreadcrumbList`, and a truthful four-item `ItemList`. Husqvarna must remain outside the ordered list.
- `Review` and `AggregateRating` schema are not recommended.
- The mechanical audit returned two density notices caused by its Markdown boundary parsing; inspection found no corresponding long prose sentence.
- `git diff --check` passed.

## Repeatable audit command

From the project root:

```bash
python3 /mnt/c/Users/marif/.codex/skills/whoadvice-article-workflow/scripts/audit_article.py articles/hedge-trimmers/best-pole-hedge-trimmers/article.md
```

Then perform the four passes above, synchronize `article.md`, `article-contract.md`, `research.md`, `sources.md`, `content-brief.md`, and `publisher-handoff.md`, and record CMS-only work separately.
# July 16, 2026 rescore update

**Result:** Pass with three parser-only density flags.

- Approved homeowner order: DEWALT DCPH820M1, CRAFTSMAN CMCPHT818D1, WORX WG252.9, Sun Joe SJH904E, Earthwise CVPH43018, BLACK+DECKER LPHT120B, GARCARE GPHT06.
- Husqvarna 122LKH remains an unnumbered specialist gas alternative.
- Sun Joe leads the corded subgroup on exact documentation and current publisher-confirmed demand; Earthwise follows as the documented value package; GARCARE remains the adjustment-focused choice with larger evidence gaps.
- Article, brief, research, contract, sources, publisher handoff, and destination register are synchronized to seven homeowner products plus the specialist alternative.
- Mechanical audit: 3,892 words and 51 headings. The remaining density flags join Markdown product-card boundaries after link stripping; they do not identify dense reader prose. Repeated Verdict-opening flag was cleared.
- `git diff --check`: pass after the rescore edits.
