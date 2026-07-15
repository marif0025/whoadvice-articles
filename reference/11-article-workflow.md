# WhoAdvice: Article Workflow

## Operating principle

Research, evidence review, product selection, ranking, writing, and editing are separate stages.

Do not begin polished article prose before the evidence and ranking logic are reviewable.

Every stage should produce a concrete artifact that can be approved, corrected, or regenerated without restarting the entire project.

## Stage 0: Intake and article classification

### Required inputs

Collect or infer:

- Working title or topic
- Primary keyword
- Search intent
- Article type
- Category
- Target audience
- Region and currency
- Desired product count
- Product candidates or retailer links
- Competitor URLs
- Reddit communities or threads
- Required sections
- Word-count range
- Publication deadline
- Affiliate retailers
- Whether genuine hands-on testing exists

### Output

```yaml
article_type:
topic:
primary_keyword:
search_intent:
audience:
region:
evidence_model:
required_sections:
constraints:
assumptions:
```

### Gate 0

Confirm that the evidence model is truthful.

If no testing records exist, the project must classify the article as research-based.

## Stage 1: Search-intent and reader-problem brief

Define:

- The main decision the reader must make
- Secondary questions
- User groups
- Common mistakes
- Safety considerations
- What a satisfactory answer must include
- What the article will not claim

### Output

A one-page intent brief.

### Gate 1

Reject a brief that merely lists keywords. It must describe an actual decision.

## Stage 2: Competitor coverage analysis

Analyze strong ranking pages and specialist sources.

For each competitor, capture:

- Products
- Structure
- Claimed methodology
- Evaluation criteria
- Experts
- Useful original sources
- Missing questions
- Unsupported claims
- Stale products
- Differentiation opportunity

Do not copy prose.

### Output

```markdown
| Competitor | Useful coverage | Weakness | Source to verify | WhoAdvice opportunity |
```

### Gate 2

The final article plan must improve coverage or clarity rather than reproduce the average competitor outline.

## Stage 3: Reddit and audience-language research

Research relevant discussions to identify:

- Questions
- Complaints
- Use cases
- Technique issues
- Product alternatives
- Long-term concerns
- Language real users employ
- Gaps between marketing and experience

Separate:

- Product issue
- Technique issue
- Seller issue
- Individual reaction
- Unsupported medical claim

### Output

A theme map with source links and dates.

### Gate 3

Reddit findings must be labeled anecdotal and converted into research questions, not automatic conclusions.

## Stage 4: Product discovery and normalization

Create a product record for every candidate while it remains under active consideration.

For a standalone article, archive raw evidence at `articles/{article}/products/{product}.md`. For a content cluster that shares exact products, use one cluster-level archive such as `articles/{cluster}/products/{product}.md` and reference it from each article. Use a stable exact-model slug. Record source URL, source type, access date, market, exact identity, price and availability observations, raw specifications or relevant excerpts, and blocked or conflicting fields. Separate raw capture from interpretation and append dated snapshots instead of overwriting earlier research so the product can be re-analyzed later.

After final selection, keep standalone files only for products that remain active in at least one article unless the project explicitly requests an exclusion archive. Record rejected candidates and reasons in `research.md`; do not leave excluded product files that can be mistaken for approved records.

For every active product with a normalized Amazon destination, append an `Affiliate link record — {research date}` section to the product file during research. Use this schema even when publisher approval is still pending:

```yaml
affiliate_key: "stable-exact-model-key"
amazon_url: "https://www.amazon.com/dp/EXACTASIN"
asin: "EXACTASIN"
affiliate_link: null
affiliate_status: "pending_publisher_confirmation"
exact_model_status: "exact_model_or_package_status"
```

Populate `affiliate_link` only with the Special Link supplied or confirmed by the publisher, then change `affiliate_status` to `publisher_confirmed`. Never invent, shorten, or derive an affiliate link. Add a plain-language confirmation note immediately after the block stating the variation, package contents, or availability detail the publisher must recheck. When a shared exact package is used across a cluster, maintain one canonical affiliate record in the shared product file and synchronize the cluster destination register after publisher confirmation.

Normalize:

- Product name
- Model
- Variant
- Size
- Region
- Product generation
- Bundle
- Seller
- Price
- Units
- Current availability

Remove duplicates and mismatched variants.

### Output

A normalized product list and evidence packets.

### Gate 4

No product advances when its identity is materially ambiguous.

## Stage 5: Source collection and claim ledger

Collect sources according to `07-fact-checking-policy.md` and `08-approved-claims-and-sources.md`.

For each product and general section:

- Record direct facts
- Record brand claims
- Record independent evidence
- Record review patterns
- Record Reddit signals
- Record unknowns
- Record conflicts
- Check warnings and recalls

### Output

- Source ledger
- Claim ledger
- Evidence packets

### Gate 5

Every ranking criterion must have enough evidence to evaluate or be marked unknown.

## Stage 6: Criteria and scoring plan

Define the criteria before assigning awards.

For each criterion, state:

- Definition
- Weight
- Evidence accepted
- Scoring scale
- Disqualifiers

Example:

```yaml
criterion: sensitive_skin_fit
weight: 20
evidence:
  - fragrance status
  - product warnings
  - relevant formulation facts
  - review patterns
scoring:
  10: strong verified fit with no major recurring issue
  7: generally suitable with a clear caveat
  4: mixed evidence or relevant irritant concern
  1: poor fit or explicit warning
  null: insufficient evidence
```

### Gate 6

The criteria must match the article’s search intent. Do not score irrelevant features because data is easy to find.

## Stage 7: Product evaluation and ranking

For each product:

1. Score only supported criteria.
2. Add evidence beneath each score.
3. Record missing evidence.
4. Identify disqualifiers.
5. Write a one-sentence provisional verdict.
6. Assign an award only after comparison.

### Output

- Product scorecards
- Ranking table
- Award-label rationale
- Exclusion list with reasons

### Gate 7

Manual editorial review is required before drafting.

The reviewer should challenge:

- Unsupported scores
- Null values converted to assumptions
- Weak “Best Overall” logic
- Too many artificial award categories
- Products included only because of affiliate availability
- Unfair comparison across variants

## Stage 8: Article outline

Build the outline from intent and evidence.

### Roundup default structure

1. Title
2. Deck or short description
3. Disclosure
4. Introduction
5. Quick picks
6. Product reviews
7. Comparison table
8. How products were selected
9. Buying guide
10. Relevant safety or use guidance
11. FAQs
12. Conclusion
13. Sources or editorial notes where required

Adjust the sequence to the topic. Do not include every section by habit.

### Product-card outline

For each roundup product, specify exactly:

- Title
- Slug
- Editorial badge
- Brand
- ASIN, when the approved contract exposes exact retailer identity
- Affiliate link, when the publisher has completed the commercial approval gate
- Summary
- Verdict
- Pros
- Cons

The Summary and Verdict must carry the reader fit, key evidence, distinction, and tradeoff. Do not require a paragraph after Cons unless the approved article contract allows one.

ASIN and affiliate-link fields are optional contract fields, not universal defaults. Never infer or manufacture them. When present, validate them against the normalized product record and keep the same destination for a shared exact package across the cluster.

### Gate 8

Approve the outline before drafting. Remove sections that duplicate one another.

## Stage 9: Drafting

Follow all project files.

Drafting rules:

- Use the approved ranking.
- Do not introduce new facts from memory.
- Keep attribution attached to claims.
- Do not write fake first-person experience.
- Vary product-section structure.
- Connect features to consequences.
- Include meaningful drawbacks.
- Use the primary keyword naturally.
- Write original prose.

When a needed fact is missing, insert:

`[FACT CHECK: specific missing item]`

Do not guess.

### Output

First complete draft with inline source markers or claim IDs.

## Stage 10: Fact-check pass

Fact check separately from style editing.

Verify:

- Names
- Models
- Ingredients
- Specifications
- Prices
- Claims
- Quotes
- Expert credentials
- Review counts
- Dates
- Recalls
- Tables
- Pros and cons
- Ranking consistency

### Output

A resolved claim ledger and a list of changes.

### Gate 10

No unresolved high-risk claim may remain in publishable copy.

## Stage 11: Editorial and voice pass

Edit against:

- `02-voice-and-tone.md`
- `03-writing-style-rules.md`
- `05-banned-ai-patterns.md`
- `16-human-centered-writing-and-editing.md`

Check:

- Opening specificity
- Paragraph rhythm
- Repetition
- Generic transitions
- Empty adjectives
- Identical product templates
- Keyword stuffing
- Excessive disclaimers
- Weak conclusions
- Fake empathy
- Fake authority

### Output

Clean editorial draft.

## Stage 12: SEO pass

SEO follows editorial accuracy.

Review:

- Search intent satisfaction
- Primary keyword placement
- Related subtopics
- Title specificity
- Meta title and description
- Heading clarity
- Internal links
- Product and FAQ structured-data eligibility
- Image alt text
- Cannibalization with existing WhoAdvice pages

Do not add unsupported sections merely for topical coverage.

### Output

- Final article
- Meta title
- Meta description
- Suggested slug
- Internal-link suggestions
- Schema notes
- Image brief and alt text

## Stage 13: Final Article Audit

Run this only after the complete draft exists and Stages 10–12 have completed. It is not part of intake, search-intent research, competitor or Reddit research, keyword strategy, product extraction or verification, research synthesis, ranking, or article-contract generation.

Required inputs are the completed article, approved article contract or outline, approved research packet and claim ledger, verified product records, product-to-affiliate-link mapping where applicable, and the approved keyword and reader-intent strategy. Do not audit a partial draft or an upstream artifact. If an input is missing, report `blocked` rather than guessing.

Run independent passes for:

1. Article-contract compliance
2. Product and factual accuracy
3. Claim and evidence support
4. Search intent and topic coverage
5. Product differentiation
6. Readability and editorial quality
7. On-page SEO
8. Final publication risks

Use `blocker` when publication must stop, `critical` when revision is required before editorial approval, `warning` for a material improvement that does not prevent review, and `suggestion` for optional polish. Any blocker produces `blocked`; otherwise any critical produces `needs_revision`; otherwise use `ready_for_editorial_review`. Scores are secondary and never override this gate.

Each finding should include severity, category, section, article quote when available, issue, reason, recommended action, and a research or contract reference where available. Unsupported facts remain unsupported; do not infer missing specifications. The audit reports findings and does not silently rewrite the article.

### Audit checklist

### Evidence

- [ ] The article states the correct evidence model.
- [ ] No hands-on testing is implied without records.
- [ ] Brand claims are attributed.
- [ ] Reviews and Reddit are presented as experience evidence.
- [ ] Health claims use authoritative sources.
- [ ] Unknowns remain visible.
- [ ] Recall checks are complete.

### Products

- [ ] Names, models, sizes, and variants match.
- [ ] Product links point to the intended item.
- [ ] Prices have a check date.
- [ ] Award labels are meaningful.
- [ ] Rankings follow the stated criteria.
- [ ] Pros and cons are specific and supported.

### Writing

- [ ] The introduction reaches the problem quickly.
- [ ] Paragraphs are concise.
- [ ] Benefits are connected to features.
- [ ] Drawbacks are not hidden.
- [ ] Product sections are not formulaic.
- [ ] Banned AI phrases have been reviewed.
- [ ] The conclusion makes a decision.
- [ ] The prose is original.

### SEO and publishing

- [ ] Title and metadata match the article.
- [ ] Internal links are useful.
- [ ] Tables match the prose.
- [ ] Images correspond to the correct products.
- [ ] Affiliate disclosure is clear.
- [ ] Date-sensitive claims are current.

### Audit output and revision loop

Report overall status, severity counts, findings grouped by category, topic coverage, unsupported or contradicted claims, verified critical facts, and one next action: `return_to_writer`, `manual_fact_review`, or `manual_editorial_review`.

When the result is `blocked` or `needs_revision`, return the article to writing with explicit instructions. Revise only affected copy and synchronized tables or records, then rerun the audit. Do not use keyword density, power words, numbers in titles, generic minimum word counts, or a perfect SEO score as publication requirements.

## Stage 14: Manual editorial review and publication handoff

A responsible human editor reviews the completed article and Final Article Audit report. `ready_for_editorial_review` is not publication approval. The editor may approve, return the article for revision, request manual fact review, or require another audit. Finalize the CMS handoff only after approval, including disclosure, links, metadata, schema notes, images, canonical and indexability settings, and time-sensitive checks.

## Stage 15: Update cycle

At the scheduled review:

1. Recheck availability and current variants.
2. Recheck prices.
3. Review formula or model changes.
4. Check recalls.
5. Sample new reviews.
6. Revisit Reddit for emerging issues.
7. Rerun competitor discovery.
8. Recalculate rankings.
9. Update copy and metadata.
10. Record material changes.

Do not refresh the date without substantive verification.

## Standard ChatGPT project behavior

When asked to create an article:

1. Identify the workflow stage requested.
2. Use completed outputs from earlier stages rather than recreating them.
3. Do not skip evidence review to produce polished copy faster.
4. State assumptions in working documents.
5. Mark missing evidence instead of inventing it.
6. Provide the requested stage output in a structured, reviewable format.
7. Wait for approval only when the user explicitly wants a manual gate; otherwise continue through the requested scope while preserving separate stage outputs.

## Suggested article request format

```yaml
task: create a research-based roundup
topic:
primary_keyword:
category:
region:
audience:
product_count:
candidate_products:
competitors:
reddit_sources:
required_sections:
word_count:
affiliate_retailers:
special_constraints:
```

## Definition of done

An article is complete only when:

- The ranking is evidence-based.
- The evidence model is transparent.
- The claims are verified or attributed.
- The article gives a useful decision.
- The voice is warm, direct, and specific.
- The prose does not rely on AI filler.
- The final copy is original.
