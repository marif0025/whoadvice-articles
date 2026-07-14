# WhoAdvice: Step-by-Step Article Production Guide

## Purpose

For normal product roundups handled by one agent, use `15-fast-roundup-workflow.md` as the default four-part path. Use this longer guide only when the assignment needs granular human approval, separate owners, high-risk evidence review, or extensive product scoring.

This guide explains how to use the WhoAdvice editorial project files to produce accurate, useful, search-focused articles in skin care, hair care, and personal care.

The process is designed for:

- Product roundups
- Single-product reviews
- Product comparisons
- Buying guides
- How-to articles
- Ingredient or technique explainers
- Problem-and-solution articles

The workflow separates research, evidence evaluation, planning, drafting, editing, and SEO. Do not collapse all stages into one prompt.

---

# 1. Core operating rules

## 1.1 Use the project files as a hierarchy

When instructions appear to conflict, apply this order:

1. Factual accuracy, safety, and honest disclosure
2. Fact-checking and approved-source rules
3. Editorial positions and product-review methodology
4. Brand, audience, voice, and writing rules
5. SEO optimization
6. Formatting preferences

SEO must never override truthfulness or safety. Voice must never turn uncertainty into confidence. A polished sentence is not acceptable when its underlying claim is weak.

## 1.2 Do not ask ChatGPT to write the article in one pass

A one-pass article tends to produce:

- Weak or invented comparisons
- Unsupported rankings
- Repetitive product sections
- Generic buying advice
- Keyword repetition
- Missing caveats
- Fake first-hand language
- Facts copied from merchant listings without verification

Instead, create and approve the evidence and decision logic before polished prose.

## 1.3 Use one master chat for each article

Create one primary chat inside the WhoAdvice project for each article.

Recommended chat name:

`[Article Type] Primary Keyword — YYYY-MM`

Examples:

- `Roundup — Best Epilators — 2026-06`
- `Guide — How to Use Curl Cream — 2026-06`
- `Review — Braun Silk-épil 9 — 2026-06`

Keep the article's approved outputs in that chat. For unusually large research projects, a separate research chat may be used, but its final evidence summary must be brought into the master article chat.

## 1.4 Use manual review gates

A review gate is a point where the editor checks the output before the next stage.

The most important mandatory gates are:

- Search intent and scope approval
- Source and evidence approval
- Product ranking approval
- Article outline approval
- Final factual and editorial approval

Do not approve a stage only because its formatting looks complete. Review the logic and evidence.

---

# 2. One-time ChatGPT project setup

## Step 1: Create the project

Create a ChatGPT project named:

`WhoAdvice Editorial Project`

Add all editorial files to the project:

- `01-brand-and-audience.md`
- `02-voice-and-tone.md`
- `03-writing-style-rules.md`
- `04-editorial-positions.md`
- `05-banned-ai-patterns.md`
- `06-product-review-guidelines.md`
- `07-fact-checking-policy.md`
- `08-approved-claims-and-sources.md`
- `09-good-writing-examples.md`
- `10-bad-writing-examples.md`
- `11-article-workflow.md`
- `12-seo-content-checklist.md`
- `13-article-production-guide.md`
- `16-human-centered-writing-and-editing.md`

## Step 2: Add project-level instructions

Use the following as the main project instruction:

```text
You are the editorial research and writing assistant for WhoAdvice, covering skin care, hair care, and personal care.

Treat all uploaded WhoAdvice editorial files as binding project instructions. Apply them according to this priority: factual accuracy and safety; source and claim policies; editorial positions and product-review rules; brand voice and writing style; SEO; formatting.

WhoAdvice articles are research-based unless genuine testing records are provided. Never imply that WhoAdvice, its editors, or its writers personally tested, tried, wore, used, measured, or experienced a product without documented first-hand testing.

Work stage by stage. Keep research, evidence evaluation, rankings, outlines, drafting, fact-checking, editorial editing, and SEO QA separate. Produce a structured artifact for every stage. Mark missing or conflicting evidence instead of guessing.

Use customer reviews, Reddit discussions, and competitor articles as discovery and experience evidence, not as automatic proof. Attribute brand claims and verify important facts using stronger sources.

Use keywords naturally. Do not target a fixed keyword-density percentage. Search intent, reader usefulness, evidence quality, and original decision support take priority over SEO-tool scores.

Write in the established WhoAdvice voice: warm, direct, practical, specific, and reader-centered. Avoid banned AI patterns, repetitive product templates, inflated claims, fake empathy, and generic filler.
```

## Step 3: Prepare reusable article inputs

For each article, collect the following before starting:

```yaml
topic:
working_title:
article_type:
category:
primary_keyword:
target_country:
target_reader:
reader_problem_or_decision:
product_count:
candidate_products:
competitor_urls:
reddit_sources:
required_sections:
approximate_word_count:
affiliate_retailers:
internal_pages_to_link:
known_expert_or_authoritative_sources:
special_constraints:
hands_on_testing_available: false
```

Unknown fields may remain blank. ChatGPT must record assumptions rather than silently filling them.

---

# 3. Article production workflow

# Phase A: Define the article

## Step 4: Classify the article and evidence model

Determine the correct article type:

- **Product roundup:** Compares multiple products and assigns recommendations.
- **Single-product review:** Evaluates one product for specific users and use cases.
- **Comparison:** Helps the reader choose between two or more products, methods, or categories.
- **Buying guide:** Explains how to evaluate and select a product category.
- **How-to:** Teaches a process or technique.
- **Explainer:** Clarifies an ingredient, method, concern, or concept.
- **Problem-and-solution article:** Helps readers understand and address a specific concern.

Also label the evidence model:

- `research_based`
- `hands_on_tested`
- `expert_reviewed`
- `mixed_evidence`

For the current WhoAdvice workflow, the normal value is:

`research_based`

### Prompt

```text
Use the WhoAdvice project files to classify this assignment.

Do not draft article prose yet.

Produce:
1. Article type
2. Evidence model
3. Primary reader
4. Main decision or problem
5. Primary search intent
6. Required scope
7. Out-of-scope topics
8. Safety or claim risks
9. Missing inputs
10. Assumptions

Assignment:
[Paste the completed article input template]
```

### Required output

A concise article intake brief.

### Approval gate

Confirm that:

- The article type matches the query.
- The reader's decision is specific.
- The evidence model is honest.
- The scope is not too broad.

---

## Step 5: Analyze search intent and the current results page

Research the current search results for the primary keyword and important variations.

Record:

- Dominant intent
- Dominant article format
- Common title patterns
- Typical product count or article depth
- Major subtopics
- Recurring questions
- Current products or product generations
- Freshness requirements
- Strong domains and specialist sources
- Weaknesses in existing results
- Opportunities for WhoAdvice to add more value

Do not treat competitor structure as a template that must be copied. The purpose is to understand reader expectations and identify missing value.

### Prompt

```text
Research the current search intent and SERP for:

Primary keyword: [keyword]
Target country: [country]
Article type: [type]

Follow `12-seo-content-checklist.md`.

Produce:
1. Dominant search intent
2. Dominant content format
3. SERP features
4. Common subtopics
5. Common product or brand coverage
6. Important long-tail and question patterns
7. Freshness signals
8. Content gaps
9. Risks of intent mismatch
10. Recommended WhoAdvice angle

Do not write the article or copy competitor phrasing.
```

### Required output

- Search-intent memo
- Preliminary keyword map
- Differentiation statement

### Approval gate

The planned article must satisfy the current intent and add something more useful than a generic summary.

---

# Phase B: Build the evidence

## Step 6: Analyze competitors

Analyze a focused set of relevant ranking pages. Usually five to ten strong pages are sufficient; do not analyze dozens without a clear reason.

For each page, record:

- Page type and angle
- Products or subtopics covered
- Claimed methodology
- Evaluation criteria
- Experts cited
- Primary evidence used
- Useful source links discovered
- Strong sections
- Missing or weak sections
- Unsupported or overconfident claims
- Stale product information
- How WhoAdvice can improve on it

### Prompt

```text
Analyze these competitor pages for research and planning only:

[URLs]

Follow the WhoAdvice source, originality, and competitor rules.

Return a comparison table with:
- Competitor
- Search intent and angle
- Products or topics covered
- Methodology claimed
- Useful coverage
- Weaknesses or unsupported claims
- Sources worth verifying independently
- Missing reader questions
- WhoAdvice opportunity

Then provide a synthesis. Do not copy phrases, headings, or product verdicts.
```

### Required output

A competitor coverage matrix.

### Approval gate

There must be a clear reason for the WhoAdvice article to exist beyond rewriting what already ranks.

---

## Step 7: Research customer discussions and Reddit

Use customer reviews and Reddit to discover:

- Real use cases
- Recurring complaints
- Product failures
- Technique mistakes
- Expectations versus experience
- Skin- or hair-type differences
- Long-term concerns
- Useful reader vocabulary
- Questions absent from commercial pages

Classify every finding:

- Recurring review pattern
- Isolated experience
- Product issue
- Technique or usage issue
- Seller, delivery, or counterfeit issue
- Possible formula or model change
- Unsupported health claim
- Research question needing verification

### Prompt

```text
Analyze the supplied customer-review summaries and Reddit discussions for this article.

Treat them as anecdotal experience evidence, not established fact.

Create a theme map containing:
- Theme
- Frequency or strength of pattern
- User context
- Positive experiences
- Negative experiences
- Whether the issue concerns the product, technique, seller, or individual reaction
- Questions requiring verification
- How the theme may affect product criteria or article sections
- Source links and dates

Do not convert isolated comments into general claims.
```

### Required output

A dated audience-language and experience theme map.

### Approval gate

Every Reddit or customer-review conclusion must remain proportional to the available evidence.

---

## Step 8: Normalize products or subtopics

For product articles, create a clean record for every candidate.

Verify:

- Exact product name
- Brand
- Model number
- Generation
- Size or capacity
- Color or formula variant
- Bundle contents
- Target region
- Official product page
- Retailer page
- Current availability
- Price and date checked
- Whether multiple listings are actually the same product

Remove:

- Duplicates
- Obsolete versions without a valid reason for inclusion
- Mismatched variants
- Products that cannot be verified
- Marketplace listings with uncertain identity

For non-product articles, normalize the concepts, methods, ingredients, or subtopics being compared.

### Prompt

```text
Normalize these product candidates before evaluation:

[List products and URLs]

For each candidate, return:
- Canonical product name
- Model or generation
- Exact variant
- Size
- Region
- Official source
- Retail source
- Current availability
- Price with check date
- Duplicate or mismatch risk
- Identity confidence
- Missing information

Do not merge products unless their identity is verified.
```

### Required output

A normalized candidate list.

### Approval gate

No product with materially ambiguous identity should move to ranking.

---

## Step 9: Build source and claim ledgers

This is the most important research stage.

For each important statement, record:

- Claim ID
- Exact claim or fact
- Subject or product
- Source URL
- Source type
- Publication or update date
- Date accessed
- Whether it is a direct fact, brand claim, expert guidance, review pattern, or anecdote
- Confidence
- Conflicting evidence
- Allowed wording
- Whether another source is required

Recommended source hierarchy:

1. Regulators, medical organizations, standards bodies, and official public agencies
2. Peer-reviewed research and strong academic sources
3. Qualified expert or specialist organizations
4. Official manufacturer documents for specifications and brand claims
5. Reliable independent editorial testing or specialist publications
6. Major retailer listings for availability, package contents, and current pricing
7. Customer-review patterns
8. Reddit and forums
9. Competitor articles as discovery sources

A lower-level source may help identify a question, but it may not support a high-risk factual or health claim.

### Suggested claim-ledger format

```markdown
| Claim ID | Product/topic | Proposed claim | Source | Source type | Status | Allowed wording | Notes |
|---|---|---|---|---|---|---|---|
```

### Prompt

```text
Build a source ledger and claim ledger for this article using `07-fact-checking-policy.md` and `08-approved-claims-and-sources.md`.

Separate:
- Verified facts
- Manufacturer claims
- Independent evidence
- Expert guidance
- Customer-review patterns
- Reddit signals
- Unknowns
- Conflicts
- High-risk claims

For every proposed claim, provide safe wording and identify whether corroboration is required.

Do not draft the article yet.
```

### Required output

- General-topic evidence packet
- Product evidence packets, when applicable
- Source ledger
- Claim ledger
- Conflict and unknown list

### Approval gate

Do not proceed when central conclusions depend on weak, missing, or contradictory evidence.

---

# Phase C: Make the editorial decision

## Step 10: Define evaluation criteria before ranking

For product roundups and comparisons, define the criteria before assigning scores or awards.

Criteria must reflect the reader's decision, not whichever specifications are easiest to collect.

For each criterion, define:

- Name
- Reader relevance
- Weight
- Evidence accepted
- Scoring scale
- Disqualifiers
- Treatment of missing evidence

Example criteria for epilators may include:

- Hair-removal effectiveness evidence
- Comfort and skin-management features
- Wet-and-dry capability
- Ease of handling
- Useful attachments
- Cleaning and maintenance
- Battery or power design
- Suitability for specific body areas
- Recurring durability concerns
- Value relative to features

Do not use the same criteria for every product category.

### Prompt

```text
Based on the approved search-intent brief, audience research, and evidence packets, define a scoring framework for this product roundup.

For each criterion, provide:
- Definition
- Why it matters to the target reader
- Weight
- Evidence accepted
- Scoring rules
- Disqualifiers
- How missing evidence is handled

The total weight must equal 100.

Do not score products yet.
```

### Required output

An approved scoring rubric.

### Approval gate

Check that the rubric:

- Matches the reader's intent
- Does not reward irrelevant features
- Does not hide missing data
- Allows meaningful tradeoffs

---

## Step 11: Evaluate, rank, and select products

Score products using only approved evidence.

For each product:

- Show criterion score
- Cite the evidence behind the score
- Record missing data
- Record conflicting evidence
- Identify its best user
- Identify its main tradeoff
- Write a provisional verdict
- State why it ranks above or below close alternatives

Award labels must describe real distinctions.

Good award examples:

- Best Overall
- Best Value
- Best for Sensitive Skin
- Best for Beginners
- Best for Fine Hair
- Best for Travel

Avoid creating awards merely to ensure every product wins something.

Also maintain an exclusion list explaining why candidates were removed.

### Prompt

```text
Evaluate the normalized candidates using the approved scoring rubric and evidence packets.

Rules:
- Score only supported criteria.
- Use null for insufficient evidence.
- Do not treat missing evidence as a positive.
- Show evidence beneath each score.
- Identify conflicts and disqualifiers.
- Compare close products directly.
- Propose award labels only after ranking.

Return:
1. Product scorecards
2. Ranking table
3. Award rationale
4. Best user and main tradeoff for each product
5. Exclusion list
6. Weaknesses in the ranking that require editorial judgment
```

### Required output

- Scorecards
- Approved ranking
- Award labels
- Exclusion rationale

### Mandatory approval gate

Manually review:

- Best Overall logic
- Unsupported scores
- Products with many null values
- Affiliate bias
- Variant mismatches
- Artificial awards
- Rankings contradicted by the prose evidence

Do not draft product verdicts until this ranking is approved.

For informational articles, replace Steps 10 and 11 with an evidence-based content framework that prioritizes the reader's questions and the strength of available guidance.

---

# Phase D: Plan and draft the article

## Step 12: Build the SEO content brief and keyword map

Use the approved intent and evidence to finalize:

- Primary keyword
- Search intent
- Secondary keywords
- Long-tail queries
- Question keywords
- Relevant entities and semantic terms
- Keyword-to-section mapping
- Internal-link opportunities
- Information-gain statement
- Proposed title direction
- Proposed URL slug

Do not set a target keyword-density percentage.

### Prompt

```text
Create the final SEO content brief using `12-seo-content-checklist.md` and the approved research.

Include:
- Primary keyword
- Search intent
- Target reader
- Reader decision
- Secondary and long-tail keywords
- Question keywords
- Relevant semantic terms and entities
- Keyword-to-section map
- Competitor gaps
- WhoAdvice information gain
- Internal-link targets
- Suggested title directions
- Suggested slug
- Freshness requirements

Do not add a keyword to a section unless that section genuinely addresses it.
```

### Required output

An approved SEO brief and section keyword map.

---

## Step 13: Create the evidence-led outline

Build the outline from the reader's decision, not from a generic article template.

A product-roundup outline may contain:

1. SEO title and H1 direction
2. Deck or short summary
3. Affiliate and methodology disclosure
4. Direct introduction
5. Quick recommendations
6. Comparison table
7. Individual product sections
8. Selection methodology
9. Buying guide
10. Relevant use or safety guidance
11. FAQs supported by real search or audience questions
12. Final recommendation
13. Sources or editorial notes when needed

For each section, specify:

- Reader purpose
- Main point
- Claims or claim IDs used
- Keyword or query mapped to it
- Internal links
- Approximate length

For every product section, specify:

- Award label
- One-sentence verdict
- Best user
- Main benefit
- Main tradeoff
- Evidence to mention
- Facts to include
- Comparison with another option
- Pros and cons

### Prompt

```text
Create an evidence-led outline for the article.

Use:
- Approved search-intent brief
- Approved ranking or content framework
- Claim ledger
- SEO brief
- WhoAdvice editorial files

For every section provide:
- Heading
- Reader purpose
- Main answer or decision
- Evidence or claim IDs
- Keyword mapping
- Approximate word count
- Internal-link opportunity

Remove sections that duplicate one another. Do not write polished prose yet.
```

### Required output

A detailed outline tied to evidence.

### Mandatory approval gate

Confirm that:

- Every major section serves the reader
- The sequence is logical
- Product sections will not repeat the same points
- All intended claims have evidence
- SEO coverage is natural
- The conclusion will make a decision

---

## Step 14: Draft in controlled sections

Do not generate a large product roundup without an approved research packet and article contract. In the fast four-part workflow, the complete draft may be written in one pass after both are approved. Use controlled section batches only for long, high-risk, or multi-writer assignments.

Recommended drafting sequence:

1. Introduction, disclosure, and quick picks
2. Comparison table
3. Two to four product sections at a time
4. Methodology
5. Buying guide or explanatory sections
6. Safety or use guidance
7. FAQs
8. Conclusion
9. Metadata and publishing assets

Drafting in controlled sections makes it easier to catch repetition, unsupported facts, and style drift.

Every draft must:

- Use only approved evidence
- Keep attribution attached to claims
- Distinguish verified facts from brand claims and review patterns
- Avoid fake first-person experience
- Connect features to reader consequences
- Include meaningful limitations
- Vary product-section rhythm
- Use keywords naturally
- Preserve claim IDs or source markers during drafting
- Mark missing facts instead of guessing

Use this marker when information is missing:

`[FACT CHECK: describe the missing fact]`

### Prompt for each drafting batch

```text
Draft the following approved sections:

[Paste section names from the approved outline]

Use the WhoAdvice project files and only the approved outline, ranking, and claim ledger.

Requirements:
- Preserve the WhoAdvice voice.
- Do not add facts from memory.
- Do not imply first-hand testing.
- Attribute manufacturer claims.
- Describe review patterns proportionally.
- Include meaningful drawbacks.
- Avoid identical product-section templates.
- Use mapped keywords naturally.
- Retain inline claim IDs in the working draft.
- Insert a fact-check marker instead of guessing.
```

### Required output

A complete working draft with source or claim markers.

---

# Phase E: Verify and improve the draft

## Step 15: Run a dedicated fact-check pass

Fact-checking must be separate from style editing.

Verify:

- Product and brand names
- Model numbers and generations
- Sizes and variants
- Ingredients
- Specifications
- Package contents
- Prices and check dates
- Availability
- Health, safety, and performance claims
- Expert names and credentials
- Quotes
- Review counts or ratings, when stated
- Recall or warning information
- Dates
- Comparison tables
- Pros and cons
- Award and ranking consistency
- Links

### Prompt

```text
Fact-check the working draft against the approved claim ledger and source packets.

Do not perform a style rewrite yet.

Return:
1. Verified claims
2. Incorrect claims
3. Overstated claims
4. Claims missing attribution
5. Unsupported claims
6. Stale or date-sensitive facts
7. Table inconsistencies
8. Ranking inconsistencies
9. Required corrections
10. Unresolved high-risk items

Then produce a corrected factual draft while preserving claim markers.
```

### Required output

- Fact-check report
- Corrected factual draft
- Updated claim ledger

### Mandatory approval gate

No unresolved high-risk claim may remain in publishable copy.

---

## Step 16: Run the editorial voice and anti-AI pass

Now edit using:

- `01-brand-and-audience.md`
- `02-voice-and-tone.md`
- `03-writing-style-rules.md`
- `04-editorial-positions.md`
- `05-banned-ai-patterns.md`
- `09-good-writing-examples.md`
- `10-bad-writing-examples.md`

Review for:

- Generic opening language
- Repetitive sentence structure
- Repeated product descriptions
- Empty adjectives
- Marketing language
- Fake authority or empathy
- Unnecessary throat-clearing
- Formulaic transitions
- Excessive bullets
- Vague pros and cons
- Weak or indecisive conclusions
- Overuse of the primary keyword
- Paragraphs that do not advance the reader's decision

### Prompt

```text
Edit the fact-checked draft for WhoAdvice voice and editorial quality.

Use files 01 through 05 and the good/bad writing examples.

Priorities:
- Preserve all verified meaning and attribution.
- Make the prose warm, direct, practical, and specific.
- Remove AI-like filler and generic transitions.
- Reduce repetition across product sections.
- Replace empty adjectives with concrete consequences.
- Keep limitations visible.
- Improve paragraph rhythm.
- Make the introduction reach the reader's problem quickly.
- Make the conclusion give a useful decision.

Do not introduce new facts during editing.
```

### Required output

A clean editorial draft.

---

## Step 17: Run the SEO and information-gain pass

SEO editing occurs after factual and editorial approval.

Check:

- Search-intent satisfaction
- Primary keyword in key locations
- Natural variations
- Relevant long-tail coverage
- Heading clarity
- Answer-first passages
- Internal links
- Descriptive anchor text
- External citations where appropriate
- Metadata
- Slug
- Image filenames and alt text
- FAQ usefulness
- Cannibalization risk
- Product or article schema eligibility
- Information gain
- Freshness signals

Do not add filler sections to cover more keywords.

### Prompt

```text
Audit the clean editorial draft using `12-seo-content-checklist.md`.

Do not rewrite solely to increase keyword frequency.

Return:
1. Search-intent assessment
2. Keyword-placement assessment
3. Missing useful subtopics
4. Repetition or stuffing risks
5. Heading improvements
6. Internal-link recommendations
7. External-source recommendations
8. Information-gain assessment
9. Cannibalization risk
10. Metadata and slug
11. Image and alt-text recommendations
12. Schema notes

Then apply only changes that improve reader usefulness, clarity, or discoverability without weakening the voice or evidence.
```

### Required output

- SEO audit
- SEO-adjusted final draft
- Metadata package

---

# Phase F: Publish and maintain

## Step 18: Build the publication package

Prepare all assets required by the CMS.

Recommended package:

```yaml
article_title:
seo_title:
meta_description:
slug:
short_excerpt:
primary_keyword:
secondary_keywords:
category:
tags:
featured_image_brief:
featured_image_alt:
product_image_alts:
internal_links:
external_sources:
affiliate_disclosure:
methodology_note:
schema_recommendations:
last_fact_checked:
next_review_date:
```

Also provide:

- Final article without internal claim markers
- Source list or editorial notes
- Comparison-table data
- Product links verified against exact variants
- Image-to-product mapping
- Change log

### Prompt

```text
Prepare the final WhoAdvice publication package from the approved article.

Include:
- Final clean article
- H1
- SEO title
- Meta description
- Slug
- Excerpt
- Category and tags
- Internal-link placements and anchor text
- External-source list
- Image brief and alt text
- Affiliate disclosure
- Methodology disclosure
- Schema notes
- Fact-check date
- Recommended review date

Remove internal claim IDs from public copy, but keep a separate editorial source record.
```

---

## Step 19: Perform final human QA in the CMS

Before publishing, manually verify:

### Content

- The opening answers the right problem.
- The article delivers what the title promises.
- Recommendations remain consistent throughout.
- Product names and variants are correct.
- Pros, cons, table entries, and verdicts agree.
- No first-hand testing is implied.
- Disclosures are visible.

### Links

- Affiliate links open the correct product and variant.
- Internal links are relevant.
- External citations work.
- No competitor tracking links remain.
- No broken or redirected product URLs are used without review.

### SEO

- One H1 is present.
- Heading hierarchy is logical.
- SEO title and meta description are populated.
- Slug is concise.
- Canonical and index settings are correct.
- The article does not compete unnecessarily with an existing WhoAdvice page.

### Images

- Every image matches the correct product.
- Image rights and source rules are satisfied.
- Filenames are descriptive.
- Alt text describes the actual image.
- Image dimensions and compression are appropriate.

### Page experience

- The comparison table works on mobile.
- Buttons are clearly labeled.
- Affiliate disclosures are not hidden.
- Paragraphs are readable.
- Ads do not obscure important content.
- Structured data matches visible content.

---

## Step 20: Schedule the update cycle

Do not change the article date without meaningful review.

Recommended review cadence:

- Deal or sale article: while the event is active and immediately after it ends
- Fast-changing product roundup: every three months
- Standard product roundup: every three to six months
- Single-product review: after major model, price, formula, or availability changes
- Evergreen guide: every six to twelve months
- Safety-sensitive article: whenever authoritative guidance changes

At every update:

1. Recheck search intent and current ranking pages.
2. Recheck product availability.
3. Recheck exact variants, models, and formulas.
4. Recheck prices.
5. Recheck recalls and warnings.
6. Sample recent customer reviews.
7. Check new Reddit themes without treating them as proof.
8. Recalculate rankings when evidence changes.
9. Update internal links.
10. Record material changes.

---

# 4. Recommended workflow by article type

## 4.1 Product roundup

Use every phase:

1. Intake
2. SERP analysis
3. Competitor analysis
4. Customer and Reddit research
5. Product normalization
6. Source and claim ledgers
7. Criteria design
8. Product scoring and ranking
9. SEO brief
10. Outline
11. Section-by-section drafting
12. Fact check
13. Editorial edit
14. SEO audit
15. Publication package
16. CMS QA
17. Update schedule

This is the most evidence-intensive article type.

## 4.2 Single-product review

Use:

1. Intake and evidence-model disclosure
2. Search intent
3. Product identity and variant verification
4. Source and claim ledgers
5. Customer-review pattern analysis
6. Evaluation framework
7. Verdict and best-user definition
8. Outline
9. Draft
10. Fact check
11. Editorial edit
12. SEO audit
13. Publication package

Do not use a numerical score unless the scoring model is defined and consistently applied across WhoAdvice reviews.

## 4.3 Product comparison

Use:

1. Intake
2. Search intent
3. Exact product normalization
4. Comparison criteria
5. Evidence packet for every criterion
6. Side-by-side evaluation
7. Decision tree: who should choose which option
8. Outline
9. Draft
10. Fact check
11. Editorial and SEO passes

The conclusion should not merely declare one universal winner. It should explain which product is better for which reader.

## 4.4 Informational or how-to article

Use a lighter workflow:

1. Intake and intent
2. SERP and question research
3. Authoritative source collection
4. Reddit or audience research for questions, not factual proof
5. Claim ledger
6. Evidence-led outline
7. Draft
8. Fact check
9. Editorial edit
10. SEO audit
11. Publication package

Do not create product rankings unless the article's intent requires them.

---

# 5. Recommended approval checklist

## Gate 1: Brief approved

- [ ] The article type is correct.
- [ ] The reader and decision are clear.
- [ ] The search intent is verified.
- [ ] The scope is manageable.
- [ ] The evidence model is honest.

## Gate 2: Research approved

- [ ] Strong sources support important claims.
- [ ] Brand claims are clearly labeled.
- [ ] Reddit and customer reviews remain anecdotal.
- [ ] Product identities are verified.
- [ ] Conflicts and unknowns are visible.

## Gate 3: Ranking or framework approved

- [ ] Criteria were set before rankings.
- [ ] Scores have evidence.
- [ ] Missing information was not treated as positive.
- [ ] Awards are meaningful.
- [ ] Affiliate availability did not determine rank.

## Gate 4: Outline approved

- [ ] Every section serves the reader.
- [ ] The article adds information gain.
- [ ] Claims are mapped to sources.
- [ ] Keywords are mapped naturally.
- [ ] Product sections are differentiated.

## Gate 5: Draft approved

- [ ] No invented facts appear.
- [ ] No fake testing language appears.
- [ ] Tradeoffs are meaningful.
- [ ] The prose matches the WhoAdvice voice.
- [ ] Repetition and AI patterns are removed.

## Gate 6: Publication approved

- [ ] Fact-checking is complete.
- [ ] Metadata matches the page.
- [ ] Links and variants are correct.
- [ ] Images are correct and accessible.
- [ ] Disclosures are visible.
- [ ] An update date is scheduled.

---

# 6. Minimum viable workflow for smaller articles

When a topic does not justify the full product-ranking workflow, do not skip research entirely. Use this minimum process:

1. Define the reader question and search intent.
2. Collect authoritative sources.
3. Create a short claim ledger.
4. Review relevant audience questions.
5. Create an evidence-led outline.
6. Draft from the approved outline.
7. Fact-check separately.
8. Edit for WhoAdvice voice.
9. Run the SEO checklist.
10. Complete publication QA.

This process is suitable for straightforward explainers and how-to articles. It is not sufficient for a major product roundup.

---

# 7. Common workflow mistakes

## Mistake 1: Drafting before product identity is verified

This causes mixed models, incorrect features, and links to the wrong variant.

## Mistake 2: Choosing awards before defining criteria

This creates post-hoc logic where evidence is selected to justify a preferred product.

## Mistake 3: Treating every competitor statement as a verified fact

Competitor pages are discovery sources. Important claims still require independent verification.

## Mistake 4: Turning Reddit comments into product facts

Reddit is valuable for discovering questions and experience patterns, but individual comments do not prove general performance.

## Mistake 5: Asking for a complete 5,000-word article in the first prompt

This encourages repetition, hidden assumptions, and unsupported transitions.

## Mistake 6: Running SEO optimization before the evidence is stable

This polishes and amplifies weak claims.

## Mistake 7: Using a keyword-density target

This creates unnatural writing. The goal is clear topic coverage and intent satisfaction.

## Mistake 8: Removing every caveat during editing

A confident voice should not conceal uncertainty, limitations, or differences between users.

## Mistake 9: Publishing the AI output without CMS review

Links, tables, metadata, images, and structured data require manual verification in their final environment.

## Mistake 10: Updating only the publication date

A freshness update should involve real verification and material changes.

---

# 8. Best practical workflow summary

For most WhoAdvice product articles, use this sequence:

```text
ARTICLE INPUT
    ↓
INTENT AND SCOPE BRIEF
    ↓ manual approval
SERP + COMPETITOR + AUDIENCE RESEARCH
    ↓
PRODUCT NORMALIZATION
    ↓
SOURCE AND CLAIM LEDGERS
    ↓ manual approval
CRITERIA AND SCORING MODEL
    ↓
PRODUCT EVALUATION AND RANKING
    ↓ manual approval
SEO BRIEF AND KEYWORD MAP
    ↓
EVIDENCE-LED OUTLINE
    ↓ manual approval
SECTION-BY-SECTION DRAFT
    ↓
FACT-CHECK PASS
    ↓
EDITORIAL VOICE / ANTI-AI PASS
    ↓
SEO AND INFORMATION-GAIN PASS
    ↓
PUBLICATION PACKAGE
    ↓
HUMAN CMS QA
    ↓
PUBLISH AND SCHEDULE UPDATE
```

The central rule is simple:

**Decide from evidence first. Write from the approved decision second. Optimize the verified article last.**
