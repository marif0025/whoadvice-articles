# WhoAdvice Article Prompt Library

## Purpose

This file contains reusable prompts for researching, planning, writing, checking, and publishing WhoAdvice articles.

This is an optional prompt cookbook, not a competing workflow specification. Use `reference/README.md` to select the canonical lifecycle, article-type profile, and normative policy files before choosing a prompt.

Keep one authoritative article workspace package. A chat, task, or agent session may help execute a stage, but approved artifacts in the active project remain the durable source of truth.

Use only the prompt needed for the routed stage. Do not run the long sequence for a normal one-agent roundup when `15-fast-roundup-workflow.md` applies.

---

# 1. How to use this prompt library

## 1.1 Do not run everything as one giant prompt

The recommended order is:

1. Assignment intake and classification
2. Search-intent research
3. Competitor research
4. Audience and community research
5. Product discovery and normalization
6. Evidence collection
7. Product classification
8. Evaluation criteria
9. Scoring and ranking
10. SEO brief
11. Article outline
12. Section-by-section drafting
13. Fact-checking
14. Editorial editing
15. SEO quality assurance
16. Final Article Audit
17. Manual editorial review and publication package

A human editor should approve the important outputs before the next stage begins.

## 1.2 Reuse the article context block

Complete this block once in the article workspace. Keep it updated when decisions change.

```yaml
ARTICLE_CONTEXT:
  site: WhoAdvice
  topic:
  working_title:
  article_type: product_roundup
  category:
  primary_keyword:
  secondary_keywords: []
  target_country:
  target_reader:
  reader_problem:
  reader_decision:
  target_word_count:
  desired_product_count:
  candidate_products: []
  required_products: []
  excluded_products: []
  competitor_urls: []
  retailer_urls: []
  manufacturer_urls: []
  reddit_urls: []
  expert_sources: []
  internal_links: []
  required_sections: []
  affiliate_retailers: []
  publication_date:
  hands_on_testing_available: false
  expert_review_available: false
  special_constraints: []
```

## 1.3 Reuse the evidence rules block

Add this block to prompts that involve products, claims, ranking, or prose:

```text
EVIDENCE RULES

- This is a research-based WhoAdvice article unless documented testing evidence is provided.
- Never imply that WhoAdvice or the writer personally tested, used, wore, measured, or experienced a product.
- Distinguish verified specifications, manufacturer claims, expert guidance, retailer information, customer-review patterns, Reddit anecdotes, and competitor statements.
- Treat customer reviews and Reddit as experience evidence, not proof of universal performance.
- Do not copy competitor wording, selection logic, headings, ratings, or conclusions.
- Mark missing, conflicting, outdated, or variant-dependent information.
- Do not invent specifications, ingredients, prices, testing results, awards, quotations, or expert opinions.
- Use `unknown` or `not verified` when evidence is insufficient.
- Do not make medical, therapeutic, safety, or regulatory claims beyond the approved evidence.
```

## 1.4 Output discipline

At every stage, ask the workflow agent to:

- Work only on the requested stage
- Avoid drafting later sections prematurely
- Show evidence and uncertainty
- Separate observations from editorial decisions
- Preserve reusable structured data
- End with a short `EDITOR REVIEW NEEDED` section

---

# 2. Prompt 0 — Start the article workspace

Use this once at the beginning of the article workspace.

```text
You are starting a new WhoAdvice article project.

Read `reference/README.md`, classify the assignment, and load only the routed normative files for this stage. Apply the precedence defined in that map.

Create an `ARTICLE WORKSPACE` using the context below. Do not research or draft the article yet.

Tasks:
1. Normalize the supplied context without changing its meaning.
2. List missing inputs.
3. List assumptions that must not be treated as facts.
4. Create a stage tracker with these statuses: not started, in progress, approved, needs revision.
5. Create an empty decision log.
6. Create an empty source register.
7. Create an empty product register if products are involved.
8. State the next recommended prompt from this library.

[PASTE ARTICLE_CONTEXT]

Do not fill missing facts by guessing.
```

### Expected output

- Normalized article context
- Missing-input list
- Assumptions
- Workflow tracker
- Decision log
- Source register
- Product register

---

# 3. Prompt 1 — Classify the assignment

Use this before research.

```text
Classify this WhoAdvice assignment using the uploaded editorial files.

Do not perform competitor research and do not draft prose.

[PASTE ARTICLE_CONTEXT]

Produce:

1. Recommended article type
   - product roundup
   - single-product review
   - product comparison
   - buying guide
   - how-to article
   - explainer
   - problem-and-solution article

2. Evidence model
   - research based
   - hands-on tested
   - expert reviewed
   - mixed evidence

3. Primary reader profile
4. Reader's immediate problem
5. Reader's final decision or desired outcome
6. Primary search intent
7. Secondary search intents
8. Required scope
9. Explicitly excluded scope
10. Likely claim or safety risks
11. Freshness requirements
12. Recommended article components
13. Missing information
14. A concise assignment statement in this format:

`Create a [article type] for [reader] that helps them [decision/outcome] using [evidence model], without [important limitation].`

End with `EDITOR REVIEW NEEDED` and list decisions that need approval.
```

### Approval gate 1

Approve:

- Article type
- Evidence model
- Target reader
- Reader decision
- Scope

---

# 4. Prompt 2 — Search-intent and SERP research

Use current web research for this step.

```text
Research the current search intent and search-results landscape for this WhoAdvice article.

Follow `12-seo-content-checklist.md` and the approved assignment classification.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED CLASSIFICATION]

Research requirements:

- Use the target country's current search results where possible.
- Review the highest-ranking relevant pages, not just title snippets.
- Record publication or update dates when visible.
- Distinguish editorial pages, retailer pages, forums, videos, brand pages, and medical or expert sources.
- Do not copy competitor structures automatically.

Produce:

1. Primary intent
2. Secondary intents
3. Dominant page type
4. Dominant content format
5. Common title patterns
6. Common product count or content depth
7. Recurring subtopics
8. Recurring questions
9. Commonly mentioned products, brands, ingredients, methods, or concerns
10. SERP features
11. Freshness signals
12. Reader expectations implied by the results
13. Weaknesses in current results
14. Information-gain opportunities for WhoAdvice
15. Topics that appear popular but are outside the approved scope
16. Recommended final angle
17. Search-intent confidence: high, medium, or low

Include a source table with:

- URL
- Domain
- Page title
- Page type
- Last updated or published date
- Main intent served
- Why it matters

Do not draft the article.
End with `EDITOR REVIEW NEEDED`.
```

---

# 5. Prompt 3 — Competitor research

Use this for a detailed comparison of selected competing articles.

```text
Analyze the supplied competitor pages for the approved WhoAdvice assignment.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SEARCH-INTENT REPORT]
[PASTE COMPETITOR URLS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

For each competitor, extract and evaluate:

1. Search intent served
2. Article type and format
3. Heading structure
4. Product selection
5. Award or classification system
6. Evaluation criteria
7. Claimed testing or research methodology
8. Sources and expert attribution
9. Product-section structure
10. Buying-guide topics
11. FAQ topics
12. Internal and external linking patterns
13. Strengths
14. Weaknesses
15. Unsupported, vague, stale, or overly promotional claims
16. Missing reader questions
17. Information that should be independently verified
18. Useful concepts WhoAdvice may cover in original language
19. Elements WhoAdvice should not imitate

Then produce a cross-competitor synthesis:

- Products covered by most competitors
- Products unique to one or two competitors
- Common evaluation criteria
- Common content gaps
- Common evidence weaknesses
- Repetitive industry talking points
- Opportunities for better classification
- Opportunities for better comparison
- Opportunities for more honest caveats
- Opportunities for original information gain

Create a `COMPETITOR GAP MATRIX` with these columns:

| Topic or feature | Competitor coverage | Evidence quality | Reader value | WhoAdvice opportunity |

Do not reproduce competitor wording, headings, ratings, or rankings.
Do not recommend final products yet.
End with `EDITOR REVIEW NEEDED`.
```

---

# 6. Prompt 4 — Reddit and community research

Use this to learn reader language, problems, and real-world concerns.

```text
Research relevant Reddit discussions and other suitable community conversations for this WhoAdvice topic.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SCOPE]
[PASTE REDDIT URLS OR SUBREDDITS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Research goals:

- Find recurring reader problems, decision factors, mistakes, frustrations, questions, and product experiences.
- Capture variation by skin type, hair type, sensitivity, routine, climate, budget, and experience level where relevant.
- Separate repeated patterns from isolated anecdotes.
- Do not treat votes, popularity, or repetition as scientific proof.
- Do not expose usernames unless a direct quotation is specifically approved.
- Prefer paraphrase over quotation.

Produce:

1. Communities and threads reviewed
2. Recurring questions
3. Recurring frustrations
4. Product-selection criteria readers actually use
5. Common technique or usage mistakes
6. Frequently mentioned products
7. Frequently reported strengths
8. Frequently reported complaints
9. Conflicting experiences
10. Important user segments
11. Language readers use to describe the problem
12. Myths or questionable claims requiring verification
13. Potential FAQ questions
14. Potential buying-guide topics
15. Potential product pros and cons that require stronger verification
16. Safe editorial conclusions
17. Conclusions that must not be made from this evidence

Create a `COMMUNITY EVIDENCE TABLE`:

| Theme | Frequency | Representative paraphrase | Relevant user segment | Evidence limit | Possible article use |

Use frequency labels only:

- isolated
- occasional
- recurring
- widespread within reviewed sample

Do not invent numerical prevalence.
End with `EDITOR REVIEW NEEDED`.
```

---

# 7. Prompt 5 — Customer-review research

Use retailer and brand-review sources carefully.

```text
Analyze customer-review patterns for the candidate products in this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE CANDIDATE PRODUCTS AND RETAILER URLS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

For each product:

1. Identify the exact product and variant reviewed.
2. Record retailer, region, displayed rating, review count, and access date when available.
3. Examine recent, critical, positive, and detailed reviews rather than relying only on aggregate scores.
4. Separate product-performance complaints from shipping, seller, counterfeit, packaging, or wrong-variant complaints.
5. Look for recurring patterns across more than one source where possible.
6. Flag likely incentivized, suspicious, irrelevant, or duplicated reviews.
7. Do not convert customer experiences into guaranteed outcomes.

Produce one record per product:

- Exact product name
- Variant or model
- Sources reviewed
- Positive themes
- Negative themes
- Suitability themes
- Usability themes
- Durability or reliability themes
- Comfort, texture, scent, noise, heat, or irritation themes where relevant
- Variant or seller confusion
- Conflicting experiences
- Confidence level
- Safe claims supported by review patterns
- Claims not supported
- Questions needing stronger sources

Create a table:

| Product | Recurring positive themes | Recurring complaints | Best-suited users suggested by reviews | Evidence limits | Confidence |

Do not rank the products yet.
End with `EDITOR REVIEW NEEDED`.
```

---

# 8. Prompt 6 — Authoritative and expert research

Use this for medical, cosmetic, ingredient, safety, or technique context.

```text
Build an authoritative research brief for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SCOPE]

Follow `07-fact-checking-policy.md` and `08-approved-claims-and-sources.md`.

Prioritize, as relevant:

- Government and regulatory sources
- Professional medical or scientific organizations
- Peer-reviewed research
- Official ingredient databases
- Product manuals and manufacturer documentation for specifications
- Qualified expert guidance from reputable publications

Produce:

1. Concepts requiring authoritative support
2. Safety statements
3. Usage guidance
4. Ingredient or mechanism explanations
5. Who should use caution
6. Contraindications or escalation advice appropriate to the article
7. Claims that can be made
8. Claims that require attribution
9. Claims that should be avoided
10. Important evidence limits or disagreements
11. Definitions in reader-friendly language
12. Source list with publication dates and authority assessment

Create a `CLAIM SUPPORT TABLE`:

| Proposed claim | Source | Source type | Support level | Required wording | Caveat |

Use support levels:

- verified
- reasonably supported
- manufacturer claim only
- anecdotal only
- conflicting
- unsupported

Do not draft polished article sections yet.
End with `EDITOR REVIEW NEEDED`.
```

---

# 9. Prompt 7 — Product discovery

Use this when the final product list has not been chosen.

```text
Discover candidate products for this WhoAdvice product article.

[PASTE ARTICLE_CONTEXT]
[PASTE SERP REPORT]
[PASTE COMPETITOR SYNTHESIS]
[PASTE COMMUNITY FINDINGS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Discovery requirements:

- Include products that match the target market and are currently available.
- Consider category leaders, specialist options, different budgets, and distinct user needs.
- Do not select products only because competitors include them.
- Do not treat marketplace search prominence as product quality.
- Avoid duplicate models, renamed variants, and bundles presented as separate products.
- Flag discontinued, region-limited, frequently counterfeited, poorly documented, or unclear products.

Produce a candidate longlist with:

- Exact product name
- Brand
- Model or identifier
- Product type
- Primary use case
- Distinguishing features
- Approximate price band, not a fixed price unless verified live
- Availability by target country
- Official source
- Major retailers
- Reason for inclusion
- Evidence available
- Evidence gaps
- Potential risks
- Candidate status: include, investigate, exclude

Then recommend a research shortlist. Do not assign Best Overall or other awards yet.
End with `EDITOR REVIEW NEEDED`.
```

---

# 10. Prompt 8 — Product identity normalization

This step prevents model, bundle, and regional confusion.

```text
Normalize the candidate-product list for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE PRODUCT LONGLIST]
[PASTE PRODUCT URLS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

For each candidate:

1. Verify the official product name.
2. Verify brand spelling.
3. Record model number, SKU, ASIN, UPC, or other useful identifier when available.
4. Distinguish product generation, color, size, formula, fragrance, kit, and regional variant.
5. Identify whether retailer listings refer to the same item.
6. Identify discontinued or replaced models.
7. Identify bundle-only differences.
8. Flag marketplace listings that may combine reviews across variants.
9. Record target-country availability.
10. Record all unresolved identity conflicts.

Produce a normalized product register:

| Product ID | Canonical product name | Brand | Model/identifier | Variant | Region | Official URL | Retailer URLs | Status | Identity notes |

Assign an internal ID such as `P01`, `P02`, and so on.

Do not evaluate quality or rank products.
End with `EDITOR REVIEW NEEDED`.
```

---

# 11. Prompt 9 — Product fact extraction

Use this to build a structured record for every product.

```text
Extract and verify product facts for the normalized WhoAdvice product register.

[PASTE ARTICLE_CONTEXT]
[PASTE NORMALIZED PRODUCT REGISTER]
[PASTE OFFICIAL AND RETAILER URLS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

First, define a category-specific extraction schema. Include only fields that help readers compare or choose products.

Possible field groups:

- Product type
- Intended use
- Skin or hair suitability
- Key ingredients or materials
- Size or capacity
- Power source
- Runtime and charging
- Speeds, modes, or settings
- Attachments
- Waterproof or wet/dry status
- Fragrance
- Finish or texture
- Certifications or regulatory status
- Warranty
- Maintenance
- Replaceable parts
- Current availability
- Price band

For each product, provide:

1. Verified facts
2. Manufacturer claims
3. Retailer-only information
4. Conflicts between sources
5. Missing facts
6. Variant-dependent facts
7. Source for every material fact
8. Access date for changeable facts

Use this table:

| Product ID | Field | Value | Evidence type | Source | Confidence | Notes |

Do not fill absent values by inference.
Do not write marketing prose.
End with `EDITOR REVIEW NEEDED`.
```

---

# 12. Prompt 10 — Source and claim ledger

Use this before any scoring or drafting.

```text
Create a consolidated source and claim ledger for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE PRODUCT FACTS]
[PASTE CUSTOMER-REVIEW FINDINGS]
[PASTE COMMUNITY FINDINGS]
[PASTE AUTHORITATIVE RESEARCH]
[PASTE COMPETITOR FINDINGS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Assign each source a source ID and each usable claim a claim ID.

Source register fields:

- Source ID
- URL or reference
- Publisher
- Source type
- Publication or update date
- Access date
- Products or topics covered
- Authority assessment
- Limitations

Claim ledger fields:

- Claim ID
- Product ID or topic
- Proposed factual statement
- Evidence type
- Source IDs
- Verification status
- Safe wording
- Attribution required: yes/no
- Caveat
- Article section where it may be used

Use verification statuses:

- verified
- partially verified
- manufacturer claim
- review pattern
- anecdotal observation
- conflicting
- outdated
- unsupported

Exclude unsupported claims from the usable-claim set.
End with:

1. `APPROVED CLAIMS`
2. `CONDITIONAL CLAIMS`
3. `PROHIBITED OR UNSUPPORTED CLAIMS`
4. `EDITOR REVIEW NEEDED`
```

### Approval gate 2

Approve:

- Normalized product identities
- Evidence set
- Source quality
- Approved claims
- Unresolved conflicts

---

# 13. Prompt 11 — Product classification framework

This prompt classifies products before ranking them.

```text
Create a category-specific product-classification framework for this WhoAdvice roundup.

[PASTE ARTICLE_CONTEXT]
[PASTE NORMALIZED PRODUCT REGISTER]
[PASTE APPROVED CLAIM LEDGER]
[PASTE COMMUNITY AND REVIEW FINDINGS]

Do not rank products yet.

Classify products using reader-relevant dimensions, such as:

- Product mechanism or type
- Intended body area or use
- Skin or hair type
- Sensitivity level
- Beginner versus experienced user
- Routine complexity
- Portability
- Budget band
- Maintenance burden
- Feature depth
- Formula or finish
- Main tradeoff

Tasks:

1. Choose only classification dimensions supported by the category and evidence.
2. Define each class clearly.
3. Assign every product to applicable classes.
4. Explain ambiguous assignments.
5. Identify products that are too similar to justify separate inclusion.
6. Identify missing classes or reader needs.
7. Identify products that do not fit the article scope.
8. Recommend a balanced shortlist, without assigning awards.

Produce:

A. Classification definitions
B. Product classification matrix
C. Overlap and duplication report
D. Coverage-gap report
E. Recommended shortlist
F. Exclusion candidates with reasons

End with `EDITOR REVIEW NEEDED`.
```

---

# 14. Prompt 12 — Evaluation criteria and weighting

Define the rules before scoring.

```text
Design an evidence-based evaluation framework for this WhoAdvice product roundup.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED PRODUCT CLASSIFICATION]
[PASTE APPROVED CLAIM LEDGER]
[PASTE SEARCH-INTENT REPORT]
[PASTE COMMUNITY AND REVIEW FINDINGS]

Follow `06-product-review-guidelines.md`.

Requirements:

- Criteria must reflect the reader's actual decision.
- Criteria must be measurable or assessable from available evidence.
- Do not reward products for undocumented claims.
- Do not give every product the same generic criteria if the category requires conditional evaluation.
- Separate universal criteria from use-case-specific criteria.
- Define how missing evidence is handled.
- Do not hide missing evidence behind a neutral score.

For every criterion, provide:

- Criterion key
- Reader-facing name
- Why it matters
- Evidence accepted
- Evidence rejected
- Scoring scale
- Weight
- Applicability conditions
- Missing-evidence treatment
- Disqualifiers or caps

Then verify that weights total 100% for each scoring profile.

Create profiles where necessary, such as:

- General user
- Sensitive skin
- Curly hair
- Budget buyer
- Frequent traveler
- Beginner

Do not score products yet.
End with `EDITOR REVIEW NEEDED`.
```

---

# 15. Prompt 13 — Product scoring

```text
Score the approved WhoAdvice product shortlist using the approved evaluation framework.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED PRODUCT SHORTLIST]
[PASTE APPROVED EVALUATION FRAMEWORK]
[PASTE APPROVED CLAIM LEDGER]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Scoring rules:

- Use only approved evidence.
- Cite claim IDs or source IDs for every non-null criterion score.
- Use `null` when material evidence is missing.
- Do not silently convert `null` to zero.
- Do not award points for popularity alone.
- Do not use customer-review aggregates as a direct quality score.
- Explain deductions and uncertainty.
- Apply disqualifiers and score caps exactly as defined.

For each product, produce:

- Criterion scores
- Evidence supporting each score
- Missing evidence
- Weighted score where calculable
- Confidence level
- Main strengths
- Main tradeoffs
- Suitable users
- Unsuitable users
- Disqualifiers or cautions

Then produce:

1. Score table
2. Confidence-adjusted interpretation
3. Sensitivity analysis showing whether small weight changes alter the leading products
4. Products that cannot be ranked confidently
5. Evidence gaps that could change the result

Do not assign editorial awards yet.
End with `EDITOR REVIEW NEEDED`.
```

---

# 16. Prompt 14 — Rankings and editorial awards

```text
Convert the approved product evaluation into transparent WhoAdvice rankings and editorial awards.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SCORE REPORT]
[PASTE PRODUCT CLASSIFICATION]
[PASTE SEARCH-INTENT REPORT]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Award rules:

- Every award must represent a distinct reader need.
- Do not invent awards merely to include more products.
- Do not use `Best Overall` unless the product performs well across the most important general criteria with acceptable evidence confidence.
- A specialist product may outrank the overall leader for a defined user segment.
- Do not call a product `Best Value` using price alone; consider relevant capability and tradeoffs.
- Avoid `Best Budget` when the product's weaknesses make it a poor recommendation.
- Do not use retailer popularity labels as editorial awards.

For every selected product, provide:

- Editorial award
- One-sentence award definition
- Award rationale
- Evidence IDs
- Best for
- Not for
- Main advantage
- Main compromise
- Confidence level

Also produce:

1. Final ranked or categorized product list
2. Products excluded from publication and reasons
3. Duplicate or redundant award check
4. Award wording check
5. Ranking limitations statement
6. Changes needed if new evidence appears

End with `EDITOR REVIEW NEEDED`.
```

### Approval gate 3

Approve:

- Evaluation criteria
- Scores
- Product shortlist
- Awards
- Exclusions

---

# 17. Prompt 15 — SEO content brief

```text
Create the SEO content brief for this approved WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SEARCH-INTENT REPORT]
[PASTE APPROVED COMPETITOR GAP REPORT]
[PASTE APPROVED PRODUCT RANKINGS OR CONTENT SCOPE]

Follow `12-seo-content-checklist.md`.

Requirements:

- Do not prescribe a fixed keyword-density percentage.
- Map keywords to reader questions and article sections.
- Use exact-match phrases only where natural.
- Prevent cannibalization with existing WhoAdvice pages.
- Prioritize information gain over competitor imitation.

Produce:

1. Primary keyword
2. Search intent
3. Recommended page type
4. Primary reader outcome
5. Secondary keywords
6. Long-tail keywords
7. Close variations
8. Semantic terms and entities
9. Questions to answer
10. Terms requiring definitions
11. Product or category entities to cover
12. Suggested SEO title options
13. Suggested H1 options
14. Suggested slug
15. Suggested meta-description direction
16. Recommended heading topics
17. Keyword-to-section map
18. Internal-link opportunities
19. External-source needs
20. Featured-answer opportunities
21. FAQ opportunities
22. Image and alt-text needs
23. Schema candidates
24. Information-gain statement
25. Cannibalization risks
26. SEO risks or over-optimization warnings

End with `EDITOR REVIEW NEEDED`.
```

---

# 18. Prompt 16 — Evidence-led outline

```text
Create an evidence-led article outline for this WhoAdvice assignment.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SEO BRIEF]
[PASTE APPROVED RANKINGS OR CONTENT SCOPE]
[PASTE APPROVED CLAIM LEDGER]

Do not draft full prose.

For every proposed section include:

- Heading level
- Working heading
- Section purpose
- Reader question answered
- Key points
- Claim IDs or source IDs
- Relevant products
- Primary or secondary keyword target
- Internal-link opportunity
- Visual or table need
- Approximate word count
- Required caveat

For product roundups, consider this order when appropriate:

1. H1
2. Reader-centered introduction
3. Quick picks
4. Comparison table
5. Product recommendations
6. How the products were researched and evaluated
7. Buying guide
8. Usage or care advice where relevant
9. FAQs
10. Conclusion or final decision summary
11. Affiliate disclosure or methodology note as required

Requirements:

- Do not create headings solely to insert keywords.
- Avoid overlapping sections.
- Put the most decision-critical information early.
- Keep the article within approved scope.
- Mark sections that lack sufficient evidence.
- Ensure every selected product has a distinct editorial role.

Then produce:

1. Full outline
2. Evidence-coverage check
3. Keyword-coverage check
4. Reader-journey check
5. Redundancy check
6. Missing-research list

End with `EDITOR REVIEW NEEDED`.
```

### Approval gate 4

Approve:

- SEO brief
- Heading architecture
- Section order
- Evidence mapping
- Target length

---

# 19. Prompt 17 — Comparison table content

```text
Create the comparison-table content for this WhoAdvice product roundup.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED PRODUCT AWARDS]
[PASTE APPROVED PRODUCT FACTS]
[PASTE APPROVED EVALUATION RESULTS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

First choose no more than 5 to 7 comparison columns that genuinely help this reader decide. Avoid overcrowding.

Possible columns:

- Product
- Editorial award
- Best for
- Product type
- Key distinguishing feature
- Important specification
- Main tradeoff
- Price band

Requirements:

- Use verified, comparable values.
- Do not compare incompatible fields.
- Do not insert long promotional sentences.
- Keep award wording consistent with the approved rankings.
- Use `Not verified` where necessary.
- Do not place a precise live price unless the publishing system will update it.

Produce:

1. Recommended columns with reasons
2. Final table data
3. Footnotes or caveats
4. Mobile-layout recommendation
5. Facts that should not be included because they are uncertain or misleading

Do not draft product sections.
```

---

# 20. Prompt 18 — Product content brief for one product

Run this once per product before drafting its section.

```text
Create a product-content brief for one approved WhoAdvice recommendation.

Product ID: [PRODUCT ID]

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED AWARD AND RATIONALE]
[PASTE PRODUCT FACT RECORD]
[PASTE RELEVANT CLAIM LEDGER ENTRIES]
[PASTE RELEVANT REVIEW AND COMMUNITY FINDINGS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Produce:

1. Exact product name
2. Editorial award
3. Award promise: what reader need it solves
4. One-sentence verdict
5. Best for
6. Not ideal for
7. Three to five differentiating facts
8. Performance or experience patterns that may be described with attribution
9. Main limitation
10. Secondary limitations
11. Verified specifications worth showing
12. Facts that must not be mentioned
13. Claims requiring attribution
14. Safe language for uncertain evidence
15. Recommended pros
16. Recommended cons
17. How this section must differ from the other product sections
18. Relevant keyword variations, if natural
19. Claim IDs to use
20. Target length

Do not write polished product prose yet.
End with `EDITOR REVIEW NEEDED`.
```

---

# 21. Prompt 19 — Write one product section

```text
Write one product recommendation section for the WhoAdvice article.

Product ID: [PRODUCT ID]

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED ARTICLE OUTLINE]
[PASTE APPROVED PRODUCT CONTENT BRIEF]
[PASTE APPROVED CLAIMS]

Follow the approved article contract and the routed normative files, especially when applicable:

- `02-voice-and-tone.md`
- `03-writing-style-rules.md`
- `05-banned-ai-patterns.md`
- `06-product-review-guidelines.md`
- `07-fact-checking-policy.md`
- `08-approved-claims-and-sources.md`
- `12-seo-content-checklist.md`

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Required section structure:

1. Title
2. Slug
3. Editorial badge
4. Brand
5. Summary
6. Verdict
7. Pros
8. Cons

Put the reader fit, evidence, distinction, and main drawback inside those fields. Do not add a paragraph after Cons unless the approved article contract explicitly allows it.

Writing rules:

- Do not claim first-hand experience.
- Do not begin every product section with the brand name.
- Do not reuse the same sentence template as other products.
- Do not list features without explaining why they matter.
- Avoid empty praise such as excellent, amazing, game-changing, top-notch, or must-have.
- Do not hide meaningful weaknesses at the end.
- Use the primary keyword only if natural; product sections should prioritize product-specific relevance.
- Keep pros and cons specific and non-duplicative.
- Do not mention unsupported facts.

Keep claim IDs in the claim ledger rather than appending a private audit to every product card.
```

---

# 22. Prompt 20 — Write several product sections without repetition

Use this in batches of two to four products.

```text
Write the next [NUMBER] product recommendation sections for the WhoAdvice roundup.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED OUTLINE]
[PASTE APPROVED PRODUCT CONTENT BRIEFS]
[PASTE APPROVED CLAIMS]
[PASTE ALREADY WRITTEN PRODUCT SECTIONS]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

Before drafting, create a small differentiation plan showing for each product:

- Reader need
- Opening approach
- Main proof point
- Main tradeoff
- Closing decision

Then write the sections.

Requirements:

- Preserve a consistent editorial standard without using a rigid template.
- Vary sentence rhythm and section openings naturally.
- Do not repeat generic benefit explanations.
- Do not reuse the same pros or cons with minor wording changes.
- Compare products only when the approved evidence supports the comparison.
- Make every award defensible and distinct.
- Avoid first-hand testing language.

After drafting, provide a private cross-section audit:

1. Repeated phrases
2. Repeated sentence structures
3. Overlapping awards
4. Contradictory claims
5. Uneven section depth
6. Unsupported comparative language
7. Recommended revisions
```

---

# 23. Prompt 21 — Write the introduction

Write the introduction after the research, rankings, and outline are approved.

```text
Write the introduction for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SEARCH INTENT]
[PASTE APPROVED ARTICLE ANGLE]
[PASTE APPROVED PRODUCT RANKINGS OR CONTENT CONCLUSIONS]
[PASTE APPROVED OUTLINE]

Follow the WhoAdvice voice and banned-pattern files.

Requirements:

- Prefer an interesting, decision-bearing first question when it naturally exposes the reader's real choice, boundary, misconception, or tradeoff. Use a direct answer when question phrasing would feel forced.
- When a question is used, begin answering it in the next sentence; do not delay the answer for suspense.
- Explain why the choice is difficult or what variables matter.
- State how WhoAdvice approached the article honestly.
- Preview the practical value of the guide.
- Use the primary key phrase naturally, preferably within the opening paragraph when it reads well.
- Do not define an obvious term only to insert a keyword.
- Do not open with broad history, fake empathy, a generic statement such as `In today's world`, a question stack, or a decorative curiosity hook.
- Do not claim testing if no testing occurred.
- When the approved design includes separate top-pick cards, do not name, rank, describe, or link individual products in the introduction.
- Reserve product recommendations for the quick-picks or top-pick card block immediately after the introduction.
- Do not reveal every conclusion before the quick-picks section.
- Keep the introduction proportionate to the article.
- When the introduction uses a controlling question, ensure the approved outline answers it section by section and the conclusion closes it directly.

Provide the final introduction only. Create alternatives or an audit only when the editor asks for them.
```

---

# 24. Prompt 22 — Write quick picks

```text
Write the quick-picks section for this WhoAdvice product roundup.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED PRODUCT AWARDS]
[PASTE APPROVED ONE-SENTENCE VERDICTS]

For every quick pick include:

- Award
- Exact product name
- One original short description that explains reader fit
- One meaningful limitation when space permits
- Copy written separately from the introduction, comparison table, product Summary, and Verdict

Requirements:

- Make distinctions clear.
- Do not repeat product-section copy.
- Do not use unsupported superlatives.
- Keep each item scannable.
- Preserve approved award wording.
- Do not include products that were not approved.

Provide both:

1. A compact bullet version
2. A short-card version

Recommend which version better fits the article and explain why.
```

---

# 25. Prompt 23 — Write the methodology section

```text
Write the WhoAdvice research and evaluation methodology section for this article.

[PASTE ARTICLE_CONTEXT]
[PASTE ACTUAL SOURCES USED]
[PASTE APPROVED EVALUATION FRAMEWORK]
[PASTE APPROVED PRODUCT-SELECTION PROCESS]

Requirements:

- Describe only work that was actually completed.
- Clearly state that the article is research based when no hands-on testing occurred.
- Explain how products were discovered, verified, classified, evaluated, and selected.
- Explain the role and limitations of manufacturer information, customer reviews, Reddit discussions, competitors, and authoritative sources.
- Do not suggest a laboratory, panel, expert review, or physical test that did not happen.
- Do not overstate rigor with meaningless numbers.
- Keep the explanation useful to readers rather than defensive.
- Mention update or availability checks where relevant.

Produce:

1. Public methodology section
2. Short methodology note for a product card or disclosure box
3. Private accuracy check comparing every methodology statement with the actual workflow
```

---

# 26. Prompt 24 — Write the buying guide

```text
Write the buying-guide section for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED OUTLINE]
[PASTE SEARCH-INTENT FINDINGS]
[PASTE COMMUNITY FINDINGS]
[PASTE AUTHORITATIVE RESEARCH]
[PASTE APPROVED EVALUATION CRITERIA]

Requirements:

- Cover checks made before purchase only; keep usage, maintenance, and safety in separate approved sections.
- Organize the guide around the reader's need, full budget, power format, blade and capacity, handle or head, and battery or charger cost where relevant.
- Explain which features matter, for whom, and why.
- Distinguish essential criteria from optional extras.
- Include meaningful tradeoffs.
- Correct common misunderstandings where authoritative evidence exists.
- Use semantic terms and long-tail phrases naturally.
- Avoid repeating detailed product recommendations.
- Do not make medical or safety claims beyond approved evidence.
- Do not state that one feature is universally better when suitability depends on the reader.

For each subsection, state the check, why it matters, and the tradeoff in a short reader-facing passage. Do not append a private audit unless requested.
```

---

# 27. Prompt 25 — Write usage, maintenance, or safety guidance

Use only when the topic warrants it.

```text
Write the practical usage, maintenance, and safety guidance for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED AUTHORITATIVE RESEARCH]
[PASTE APPROVED PRODUCT MANUAL INFORMATION]
[PASTE COMMUNITY-IDENTIFIED MISTAKES]

Requirements:

- Prioritize manufacturer instructions and authoritative guidance.
- Separate general advice from product-specific instructions.
- Do not present Reddit techniques as established safety guidance.
- State when readers should consult a qualified professional.
- Avoid diagnosing conditions.
- Avoid absolute guarantees.
- Keep advice actionable and proportionate to the article.
- Include warnings only when relevant and supported.

Produce:

1. Reader-facing guidance
2. Common mistakes box
3. When to stop or seek professional advice, if appropriate
4. Private source map
```

---

# 28. Prompt 26 — Write FAQs

```text
Write the FAQ section for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED SEO BRIEF]
[PASTE COMMUNITY QUESTIONS]
[PASTE AUTHORITATIVE RESEARCH]
[PASTE ARTICLE OUTLINE]

FAQ selection rules:

- Include only questions that readers genuinely ask or need answered.
- Do not add questions merely to repeat keywords.
- Do not duplicate answers already fully covered unless a concise standalone answer provides clear value.
- Use direct, self-contained answers.
- Put the answer in the first sentence.
- Add nuance, conditions, or safety context after the direct answer.
- Do not make unsupported health or product claims.
- Do not invent a question volume or `People Also Ask` placement.

For each FAQ provide:

- Question
- Concise answer
- Supporting claim or source IDs
- Whether it is suitable for FAQ schema

Then identify:

1. Questions rejected as redundant
2. Questions rejected for weak evidence
3. Questions better handled in the main article
```

---

# 29. Prompt 27 — Write the conclusion

```text
Write the conclusion for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED ARTICLE CONCLUSIONS]
[PASTE APPROVED PRODUCT AWARDS OR MAIN RECOMMENDATIONS]

Requirements:

- Help the reader make a final choice.
- Summarize the decision framework rather than repeating the introduction.
- Mention the leading options only where useful.
- Reinforce that suitability depends on the reader's needs.
- Include the main limitation or caution where material.
- Avoid generic endings such as `The right product can make all the difference`.
- Avoid introducing new claims, products, or advice.
- Do not force the primary keyword.
- Keep the ending concise.

Provide one final conclusion of 80-150 words. Follow the article's decision order and do not append alternatives or a private audit unless requested.
```

---

# 30. Prompt 28 — Assemble the complete first draft

Use this only after all sections have been approved or drafted.

```text
Assemble the complete first draft of this WhoAdvice article from the approved components.

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED OUTLINE]
[PASTE INTRODUCTION]
[PASTE QUICK PICKS]
[PASTE COMPARISON TABLE]
[PASTE PRODUCT SECTIONS]
[PASTE METHODOLOGY]
[PASTE BUYING GUIDE]
[PASTE USAGE OR SAFETY SECTION]
[PASTE FAQS]
[PASTE CONCLUSION]

Assembly rules:

- Preserve approved factual wording and evidence limits.
- Improve transitions only where necessary.
- Do not add new facts or claims during assembly.
- Do not change approved product awards.
- Remove private audits and internal notes from the public draft.
- Resolve duplicated explanations.
- Keep heading hierarchy valid.
- Keep lists and tables readable.
- Do not overuse the primary keyword.
- Preserve the WhoAdvice voice.

Produce:

1. Complete public draft
2. `ASSEMBLY ISSUES` listing missing sections, unresolved placeholders, repetition, and transition problems
3. Current approximate word count
4. Sections that exceed or fall below their planned length

Do not perform the final fact-check or SEO rewrite in this step.
```

---

# 31. Prompt 29 — Factual verification audit

Run this against the assembled article.

```text
Perform a strict factual verification audit of this WhoAdvice draft.

[PASTE ARTICLE_CONTEXT]
[PASTE COMPLETE DRAFT]
[PASTE SOURCE REGISTER]
[PASTE CLAIM LEDGER]
[PASTE PRODUCT REGISTER]

Follow `07-fact-checking-policy.md` and `08-approved-claims-and-sources.md`.

Audit every material statement, including:

- Product names
- Models and variants
- Specifications
- Ingredients
- Sizes and quantities
- Availability
- Prices or price bands
- Warranty
- Safety claims
- Health or cosmetic claims
- Comparative claims
- Popularity claims
- Customer-review claims
- Reddit-derived observations
- Expert statements
- Product awards
- Pros and cons
- Table entries
- FAQ answers
- Methodology statements

Create a fact-check table:

| Draft location | Claim | Status | Source ID | Problem | Required correction |

Use statuses:

- verified
- acceptable with attribution
- requires qualification
- conflicting
- outdated
- unsupported
- incorrect

Then provide:

1. Critical errors
2. Material corrections
3. Minor corrections
4. Claims to remove
5. Facts requiring a live check before publication
6. Corrected wording for every failed claim
7. A factual-confidence assessment

Do not silently rewrite the full article.
End with `EDITOR REVIEW NEEDED`.
```

---

# 32. Prompt 30 — Apply fact-check corrections

```text
Apply only the approved factual corrections to this WhoAdvice draft.

[PASTE CURRENT DRAFT]
[PASTE APPROVED FACT-CHECK CORRECTIONS]

Rules:

- Do not add new claims.
- Do not change product rankings unless the correction explicitly requires it.
- Preserve source attribution and uncertainty.
- Remove claims marked unsupported.
- Use the exact approved replacement wording where supplied.
- Flag any correction that creates a contradiction elsewhere.

Produce:

1. Corrected draft
2. Change log
3. Remaining factual issues
```

---

# 33. Prompt 31 — Product consistency and ranking audit

```text
Audit the complete WhoAdvice product article for internal product consistency.

[PASTE CORRECTED DRAFT]
[PASTE APPROVED PRODUCT REGISTER]
[PASTE APPROVED SCORES AND AWARDS]

Check:

1. Product names and variants are consistent.
2. Awards match the approved ranking.
3. Quick picks, table, headings, product sections, and conclusion agree.
4. Pros and cons do not contradict the main text.
5. Price descriptions are consistent.
6. One product is not described as superior on a criterion where another scored higher without explanation.
7. `Best Overall`, specialist awards, and budget/value labels remain defensible.
8. Excluded products do not appear accidentally.
9. Similar products are differentiated accurately.
10. Section lengths do not imply unsupported preference.

Produce:

- Contradictions
- Ranking inconsistencies
- Product-identity inconsistencies
- Misleading comparisons
- Required fixes
- Optional clarity improvements

Do not rewrite unrelated prose.
```

---

# 34. Prompt 32 — Editorial voice and AI-pattern edit

```text
Perform the WhoAdvice editorial edit on this fact-checked draft.

[PASTE FACT-CHECKED DRAFT]

Apply:

- `01-brand-and-audience.md`
- `02-voice-and-tone.md`
- `03-writing-style-rules.md`
- `04-editorial-positions.md`
- `05-banned-ai-patterns.md`
- `09-good-writing-examples.md`
- `10-bad-writing-examples.md`

Do not alter factual meaning, evidence strength, approved rankings, or source attribution.

Edit for:

1. Reader-centered clarity
2. Natural, approachable authority
3. Specific language
4. Sentence rhythm
5. Concision
6. Logical transitions
7. Non-repetitive product sections
8. Honest limitations
9. Reduced marketing language
10. Removal of generic filler
11. Removal of fake empathy
12. Removal of rhetorical-question openings
13. Removal of empty intensifiers
14. Removal of symmetrical AI-style lists where they feel mechanical
15. Removal of repeated conclusions
16. Consistent terminology

First provide an `EDITORIAL DIAGNOSIS` with the main patterns found.
Then provide the edited draft.
Finally provide a `CHANGE SUMMARY` grouped by:

- Voice
- Clarity
- Repetition
- Structure
- AI-pattern removal
- Claims preserved unchanged
```

---

# 35. Prompt 33 — SEO quality-assurance audit

```text
Perform the final on-page SEO audit for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE EDITED DRAFT]
[PASTE APPROVED SEO BRIEF]
[PASTE INTERNAL LINK OPTIONS]

Follow `12-seo-content-checklist.md`.

Audit:

1. Search-intent satisfaction
2. Primary keyword placement
3. Natural keyword usage
4. Keyword stuffing or awkward exact-match repetition
5. Secondary and long-tail coverage
6. Semantic terms and entities
7. Title and H1 alignment
8. Introduction relevance
9. Heading hierarchy
10. Heading usefulness
11. Topic completeness
12. Information gain
13. Answer-first passages
14. Internal links
15. External authoritative links
16. Product entity clarity
17. Image opportunities and alt text
18. FAQ value
19. Potential schema
20. Slug
21. Meta description
22. Cannibalization risk
23. Freshness signals
24. Thin or redundant sections
25. Affiliate-value risk

Do not use a fixed keyword-density target.
Do not recommend inserting a keyword where it harms readability.
Do not rewrite the entire article automatically.

Produce:

A. Passed checks
B. Priority fixes
C. Optional improvements
D. Keyword map showing where major phrases appear
E. Internal-link plan
F. Suggested SEO title
G. Suggested H1
H. Suggested slug
I. Suggested meta description
J. Suggested image alt text
K. Schema recommendations
L. Final SEO readiness: ready, ready with minor edits, or not ready
```

---

# 36. Prompt 34 — Apply approved SEO edits

```text
Apply the approved SEO corrections to the WhoAdvice article.

[PASTE EDITED DRAFT]
[PASTE APPROVED SEO CHANGES]

Rules:

- Preserve the approved WhoAdvice voice.
- Preserve factual wording and evidence strength.
- Do not add unsupported claims.
- Do not force exact-match keywords.
- Do not expand the article with filler.
- Keep headings useful to readers.
- Add internal links only where contextually relevant.
- Do not change product awards unless explicitly approved.

Produce:

1. Final SEO-edited article
2. SEO change log
3. Any recommendation that could not be applied safely
```

---

# 37. Prompt 35 — Final publication package

```text
Prepare the final publication package for this WhoAdvice article.

[PASTE ARTICLE_CONTEXT]
[PASTE FINAL ARTICLE]
[PASTE APPROVED SEO AUDIT]
[PASTE PRODUCT REGISTER]
[PASTE INTERNAL LINK PLAN]

Produce:

1. Final article title
2. SEO title
3. H1
4. Slug
5. Meta description
6. Short excerpt
7. Category
8. Suggested tags
9. Primary keyword
10. Secondary keywords
11. Internal links with suggested anchor text and insertion location
12. External citations with suggested anchor text and insertion location
13. Product affiliate links mapped to exact products and variants
14. Featured image brief
15. Product image briefs
16. Image filenames
17. Image alt text
18. Social share title
19. Social share description
20. Affiliate disclosure
21. Methodology note
22. Author or reviewer requirements
23. Suggested schema types
24. Publication date
25. Recommended review date
26. Freshness-sensitive facts to recheck before publishing
27. CMS formatting checklist
28. Final unresolved issues

Do not alter the article body in this step.
```

---

# 38. Prompt 36 — Final Article Audit

```text
Perform the Final Article Audit only after the complete WhoAdvice article and its factual, editorial, and SEO passes are finished.

[PASTE FINAL ARTICLE]
[PASTE APPROVED ARTICLE CONTRACT AND OUTLINE]
[PASTE APPROVED RESEARCH PACKET AND CLAIM LEDGER]
[PASTE VERIFIED PRODUCT RECORDS AND AFFILIATE MAPPING]
[PASTE APPROVED INTENT, KEYWORD, COMPETITOR, AND COMMUNITY FINDINGS]
[PASTE FINAL FACT-CHECK REPORT]
[PASTE FINAL SEO REPORT]

If the article is partial or a required approved input is unavailable, return `blocked` and identify the missing input. Never run this prompt during research, extraction, verification, synthesis, article-contract generation, or drafting.

Run independent analyzers for:

1. Article-contract compliance
2. Product and factual accuracy
3. Claim and evidence support
4. Search intent and topic coverage
5. Product differentiation
6. Readability and editorial quality
7. On-page SEO
8. Final publication risks

Use deterministic checks where practical for metadata, heading hierarchy, placeholders, duplicate headings, table structure, and affiliate mapping. Use evidence-led editorial judgment for claims, differentiation, intent coverage, and readability.

Do not draft or rewrite the full article. Do not introduce new products. Do not infer unsupported specifications. Do not treat manufacturer marketing as independent testing. Do not mark an article ready merely because SEO and readability checks pass.

Return:

1. `STATUS`
2. `SEVERITY COUNTS`
3. `FINDINGS`, grouped by category with blockers and critical findings first
4. `TOPIC COVERAGE`
5. `UNSUPPORTED OR CONTRADICTED CLAIMS`
6. `VERIFIED CRITICAL FACTS`
7. `LIVE CHECKS REQUIRED TODAY`
8. `RECOMMENDED NEXT ACTION`

Every finding must include an id, severity (`blocker`, `critical`, `warning`, or `suggestion`), category, section, article quote when available, issue, reason, recommended action, and source reference when available.

Resolve status as follows:

- Any blocker: `blocked`
- No blockers and any critical finding: `needs_revision`
- Warnings or suggestions only: `ready_for_editorial_review`

Use `return_to_writer`, `manual_fact_review`, or `manual_editorial_review` as the recommended next action. Scores may be included as secondary diagnostics, but a high score never overrides a blocker or critical finding. Do not use keyword density or a perfect SEO/readability score as a publication gate.

A blocker includes:

- Unsupported material claim
- Wrong product or variant
- Misleading testing language
- Unsafe health or usage advice
- Broken ranking logic
- Missing disclosure
- Missing required source
- Serious search-intent mismatch
- Duplicate or copied competitor wording

Keep audit and revision separate. Manual editorial review remains required after `ready_for_editorial_review` and before publication approval.
```

---

# 39. Complete product-roundup sequence

Use the following sequence for articles such as `Best Epilators`, `Best Curl Creams`, `Best Body Oils`, or `Best Hair Dryers`.

## Phase 1: Scope

1. Prompt 0 — Start the workspace
2. Prompt 1 — Classify the assignment
3. Human approval gate

## Phase 2: Market and audience research

4. Prompt 2 — Search-intent and SERP research
5. Prompt 3 — Competitor research
6. Prompt 4 — Reddit and community research
7. Prompt 5 — Customer-review research, after product candidates exist
8. Prompt 6 — Authoritative and expert research

## Phase 3: Products and evidence

9. Prompt 7 — Product discovery
10. Prompt 8 — Product identity normalization
11. Prompt 9 — Product fact extraction
12. Prompt 5 — Customer-review research, using the normalized shortlist
13. Prompt 10 — Source and claim ledger
14. Human evidence approval gate

## Phase 4: Classification and ranking

15. Prompt 11 — Product classification
16. Prompt 12 — Evaluation criteria and weighting
17. Prompt 13 — Product scoring
18. Prompt 14 — Rankings and editorial awards
19. Human ranking approval gate

## Phase 5: SEO and structure

20. Prompt 15 — SEO content brief
21. Prompt 16 — Evidence-led outline
22. Human outline approval gate

## Phase 6: Drafting

23. Prompt 17 — Comparison table
24. Prompt 18 — Product content brief, once per product
25. Prompt 19 or 20 — Product-section writing
26. Prompt 21 — Introduction
27. Prompt 22 — Quick picks
28. Prompt 23 — Methodology
29. Prompt 24 — Buying guide
30. Prompt 25 — Usage or safety guidance, where relevant
31. Prompt 26 — FAQs
32. Prompt 27 — Conclusion
33. Prompt 28 — Assemble first draft

## Phase 7: Quality assurance

34. Prompt 29 — Factual verification audit
35. Human correction approval
36. Prompt 30 — Apply factual corrections
37. Prompt 31 — Product consistency and ranking audit
38. Prompt 32 — Editorial voice and AI-pattern edit
39. Prompt 33 — SEO QA
40. Human SEO approval
41. Prompt 34 — Apply approved SEO edits

## Phase 8: Final audit, manual review, and publication

42. Prompt 36 — Final Article Audit
43. Revise and rerun Prompt 36 until no blocker or critical finding remains
44. Manual editorial review and approval
45. Prompt 35 — Publication package
46. Manual CMS and link check
47. Publish

When several related pages form a cluster, run `17-final-cluster-sync.md` after every included article has completed its individual audit and before the CMS publication steps. Do not use cluster syncing to hide an unresolved page-level blocker.

---

# 40. Master orchestration prompt

Use this prompt when you want a workflow agent to manage the routed process while still pausing at approval gates.

```text
Manage this WhoAdvice article through the route selected from `reference/README.md`. Use `11-article-workflow.md` for lifecycle and gates, the selected article-type profile for format, and only the necessary prompt recipes from `14-article-prompt-library.md`.

[PASTE ARTICLE_CONTEXT]

Operating rules:

1. Work on only one stage at a time.
2. Do not skip required research, evidence, ranking, outline, fact-checking, editorial, or SEO stages.
3. Use the correct stage prompt from the prompt library.
4. At the end of each stage, provide:
   - stage completed
   - artifact produced
   - unresolved issues
   - editor decisions required
   - recommended next stage
5. Pause at these mandatory approval gates:
   - assignment classification
   - source and claim ledger
   - product rankings
   - article outline
   - factual corrections
   - final SEO changes
6. Do not treat silence as approval.
7. Keep an updated decision log, source register, product register, and stage tracker.
8. Never imply hands-on testing without documented test evidence.
9. Never fill missing product evidence by guessing.
10. Never copy competitor wording or structure.
11. Follow the routed normative files and approved contract; do not load every reference by default.

Begin with Prompt 0, then Prompt 1. Do not research or draft the article until the assignment classification is approved.
```

---

# 41. Fast workflow for smaller informational articles

For a how-to, explainer, or problem-and-solution article with no product ranking, use:

1. Prompt 0 — Start workspace
2. Prompt 1 — Classification
3. Prompt 2 — Search intent
4. Prompt 3 — Competitor research
5. Prompt 4 — Community research
6. Prompt 6 — Authoritative research
7. Prompt 10 — Claim ledger
8. Prompt 15 — SEO brief
9. Prompt 16 — Outline
10. Draft individual sections using the custom prompt below
11. Prompt 26 — FAQs
12. Prompt 27 — Conclusion
13. Prompt 28 — Assembly
14. Prompt 29 — Fact check
15. Prompt 32 — Editorial edit
16. Prompt 33 — SEO audit
17. Prompt 36 — Final Article Audit
18. Manual editorial approval
19. Prompt 35 — Publication package

## Informational-section writing prompt

```text
Write this approved section of a WhoAdvice informational article.

Section: [HEADING]
Section purpose: [PURPOSE]
Reader question: [QUESTION]
Target length: [LENGTH]

[PASTE ARTICLE_CONTEXT]
[PASTE APPROVED OUTLINE ENTRY]
[PASTE APPROVED CLAIMS AND SOURCES]
[PASTE RELEVANT COMMUNITY FINDINGS]

Requirements:

- Answer the reader's question directly.
- Use only approved facts and claims.
- Translate technical information into clear reader language without oversimplifying it.
- Attribute expert, study, regulatory, or manufacturer claims where required.
- Distinguish established guidance from anecdotal experience.
- Include practical implications.
- Avoid generic filler, keyword forcing, fake empathy, and repetitive summaries.
- Do not introduce information assigned to another section.
- Follow the WhoAdvice voice and style files.

After the section, include a private audit with:

- Claims used
- Source IDs
- Important caveats
- Keyword usage
- Overlap risk with other sections
```

---

# 42. Single-product review sequence

For a research-based single-product review:

1. Prompt 0 — Workspace
2. Prompt 1 — Classification
3. Prompt 2 — Search intent
4. Prompt 3 — Competitor review analysis
5. Prompt 4 — Community research
6. Prompt 5 — Customer-review analysis
7. Prompt 6 — Authoritative research
8. Prompt 8 — Product normalization
9. Prompt 9 — Product fact extraction
10. Prompt 10 — Claim ledger
11. Prompt 12 — Evaluation criteria without cross-product weighting unless comparisons are included
12. Prompt 15 — SEO brief
13. Prompt 16 — Outline
14. Use the single-review prompt below
15. Prompts 29, 32, and 33 — Fact-check, editorial, and SEO passes
16. Prompt 36 — Final Article Audit, followed by manual editorial approval
17. Prompt 35 — Publication package

## Single-product review writing prompt

```text
Write the complete research-based WhoAdvice review of this product from the approved outline and evidence.

[PASTE ARTICLE_CONTEXT]
[PASTE NORMALIZED PRODUCT RECORD]
[PASTE APPROVED CLAIM LEDGER]
[PASTE CUSTOMER-REVIEW FINDINGS]
[PASTE COMMUNITY FINDINGS]
[PASTE EVALUATION FRAMEWORK]
[PASTE APPROVED OUTLINE]

EVIDENCE RULES
[PASTE EVIDENCE RULES BLOCK]

The review must include, where supported:

1. Clear verdict
2. Best-suited users
3. Users who should skip it
4. Important design, formula, or feature facts
5. Practical implications of those facts
6. Recurring customer-review strengths
7. Recurring complaints
8. Meaningful limitations
9. Comparison with relevant alternatives using verified evidence
10. Value assessment without relying on price alone
11. Pros and cons
12. Research methodology
13. Buying decision

Do not imply personal testing.
Do not disguise manufacturer claims as editorial findings.
Do not describe isolated reviews as broad consensus.
Do not use a numeric rating unless an approved rating framework exists.

After the review, provide a private claims audit.
```

---

# 43. Product-comparison sequence

Use the core research prompts, then this writing prompt.

```text
Write a WhoAdvice comparison between:

- [PRODUCT A]
- [PRODUCT B]
- [OPTIONAL PRODUCT C]

[PASTE ARTICLE_CONTEXT]
[PASTE NORMALIZED PRODUCT RECORDS]
[PASTE APPROVED CLAIM LEDGER]
[PASTE APPROVED COMPARISON CRITERIA]
[PASTE SCORE OR EVIDENCE MATRIX]
[PASTE APPROVED OUTLINE]

Requirements:

- Compare only equivalent or clearly explained fields.
- Identify shared features without overstating similarity.
- Explain practical differences.
- Name a winner only for a defined user or criterion.
- Allow different products to win for different users.
- Discuss missing evidence.
- Do not use unsupported superiority language.
- Do not rely on price alone.
- Include a decision table.
- End with `Choose X if...`, `Choose Y if...`, and `Consider another option if...` guidance.
- Do not imply hands-on testing.

Follow the routed normative editorial and SEO files plus the approved comparison contract.
After the article, include a private comparative-claims audit.
```

---

# 44. Revision prompt for editor feedback

```text
Revise the WhoAdvice article using the editor feedback below.

[PASTE CURRENT ARTICLE OR SECTION]

EDITOR FEEDBACK:
[PASTE FEEDBACK]

Rules:

- Apply only changes supported by the feedback and project files.
- Preserve verified facts, evidence strength, and approved product rankings unless the feedback explicitly changes them.
- Do not add new factual claims without sources.
- Do not increase keyword repetition merely because SEO is mentioned.
- Resolve feedback conflicts according to the project instruction hierarchy.
- If a requested change would create an unsupported or misleading claim, do not apply it silently; explain the conflict and suggest safe wording.

Produce:

1. Revised text
2. Change log mapping each edit to the feedback
3. Feedback not applied and reason
4. New issues introduced by the revision, if any
```

---

# 45. Article update prompt

Use this when refreshing an existing page.

```text
Audit and update this existing WhoAdvice article for freshness and accuracy.

[PASTE OR LINK EXISTING ARTICLE]
[PASTE CURRENT ARTICLE_CONTEXT]

Use `reference/README.md` to load only the refresh route and references affected by the change. Preserve approved, stable stages.

Check:

- Search intent changes
- SERP format changes
- Product discontinuations or replacements
- Formula or model changes
- Availability changes
- Price-band changes
- New safety or regulatory information
- Broken links
- Stale expert guidance
- Review-pattern changes
- New Reddit questions
- Competitor content improvements
- Ranking validity
- Internal-link opportunities
- Metadata and CTR opportunities
- Unsupported legacy claims
- Old first-hand or testing language

Produce:

1. Keep, update, remove, and add recommendations
2. Product replacement table
3. Claim re-verification table
4. Ranking changes with reasons
5. SEO changes
6. Section-level update plan
7. Facts needing live checks
8. Recommended new review date

Do not rewrite the full article until the update plan is approved.
```

---

# 46. Minimal prompt set

For normal product roundups, the minimal process is the four-part workflow in `15-fast-roundup-workflow.md`:

1. Research and rank
2. Approve the article contract
3. Draft the complete article
4. Audit and hand off

Use the individual prompts in this library only when a stage needs a separate owner, a high-risk fact review, independent scoring, or unusually granular approval. Do not run the former 17-prompt sequence by default.

# 47. Final operating principle

The prompts should produce a chain of reviewable editorial decisions:

`Reader intent → evidence → classification → criteria → ranking → outline → prose → verification → editing → SEO → individual audit → cluster sync when applicable → publication`

A later stage must not conceal weaknesses from an earlier stage. Better prose cannot repair weak evidence, and SEO optimization cannot justify an unsupported claim.
