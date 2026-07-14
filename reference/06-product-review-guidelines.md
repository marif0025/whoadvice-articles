# WhoAdvice: Product Review Guidelines

## 1. Declare the article’s evidence model

Before research begins, classify the article.

### A. Research-based roundup

Products are selected through specifications, ingredient research, credible expert guidance, reviews, Reddit discussions, and market comparison.

Use:

> We researched and compared...

Do not use:

> We tested...

### B. Research-based single-product review

The article evaluates one product without first-hand use.

Required sections normally include:

- What it claims to do
- Key specifications or ingredients
- Who it may suit
- Common positive feedback
- Common complaints
- Alternatives
- Verdict
- Evidence limitations

### C. Hands-on review

Use only when genuine notes are supplied, including:

- Tester identity or relevant characteristics
- Testing period
- Routine or protocol
- Comparison baseline
- Observations
- Limitations
- Photos or measurements when applicable

### D. Expert-led explainer

The central evidence comes from qualified professionals, regulators, systematic reviews, or authoritative organizations.

### E. Comparison

Two or more products are compared using identical criteria and current variants.

### F. Deal article

A time-sensitive article about products already supported by editorial evidence. Verify the price and seller at publication.

## 2. Build a product evidence packet

Create one structured packet per product before scoring or writing.

Required fields:

```yaml
product_name:
brand:
model_or_variant:
category:
official_url:
retailer_urls:
price_checked:
price_date:
size_or_quantity:
cost_per_unit:
availability:
intended_user:
key_features:
ingredients_or_materials:
included_accessories:
instructions:
warnings:
warranty:
brand_claims:
independent_evidence:
customer_review_sources:
review_count_and_date:
positive_review_patterns:
negative_review_patterns:
reddit_threads:
competitor_mentions:
recalls_or_safety_alerts:
unknowns:
source_conflicts:
```

Do not draft a recommendation from a retailer title and bullet list alone.

## 3. Separate evidence from interpretation

For every important criterion, record:

- Evidence
- Source
- Date
- Confidence
- Editorial interpretation

Example:

```yaml
criterion: wet_dry
evidence: "The official manual permits use in the shower."
source: manufacturer manual
confidence: high
interpretation: "Useful for readers who prefer epilating on softened, wet skin."
```

Unknown evidence remains unknown. Do not convert it into a neutral score.

## 4. Define ranking criteria before selecting winners

Criteria must match the search intent.

A generic weighting model may include:

- Performance fit: 25%
- User suitability: 20%
- Ease of use: 15%
- Safety and maintenance: 15%
- Review consistency: 10%
- Value: 10%
- Availability and support: 5%

Adjust weights by category and explain material changes.

Do not reverse-engineer criteria to make a preferred product win.

## 5. Category-specific evaluation

### Skin care

Evaluate:

- Intended concern
- Skin-type suitability
- Current ingredient list
- Fragrance and potential sensitizers
- Texture and finish
- Packaging
- Routine compatibility
- Brand claims and evidence
- Customer feedback by skin type
- Value per ounce
- Warnings and patch-test relevance
- SPF status when applicable

Do not score an ingredient merely because it is fashionable.

### Hair care

Evaluate:

- Hair types and textures served
- Moisture and conditioning
- Hold and definition
- Weight and buildup
- Slip and detangling
- Flaking or residue
- Heat-protection evidence
- Color-safe or sulfate-free status when verified
- Scent
- Packaging and amount needed
- Review patterns by hair type
- Cost per ounce

### Personal-care liquids and creams

Evaluate:

- Intended use
- Formula and active ingredients
- Sensitivity and fragrance
- Texture and absorption
- Application method
- Packaging hygiene
- Duration or reapplication claims
- Residue and staining
- Value
- Regulatory status when relevant

### Personal-care devices

Evaluate:

- Mechanism
- Power source
- Runtime and charge time
- Corded or cordless operation
- Wet/dry rating
- Speed or intensity settings
- Head size and maneuverability
- Attachments
- Grip and controls
- Noise
- Cleaning
- Replacement parts
- Warranty
- Safety instructions
- Recalls
- Review patterns for comfort and durability

## 6. Product eligibility rules

A product may be included when:

- The current variant can be verified.
- Enough evidence exists to judge the relevant criteria.
- It is available to the target audience or clearly labeled as limited availability.
- It offers a meaningful use case or advantage.
- No unresolved safety issue makes recommendation irresponsible.

Exclude or pause a product when:

- Listings combine multiple models and specifications cannot be separated.
- The official product appears discontinued.
- A recall or severe unresolved complaint is relevant.
- The only supporting source is affiliate content.
- The ingredient list or device specifications conflict materially.
- The award label would be invented to justify inclusion.

## 7. Award-label rules

Each label must express a real editorial reason.

Good labels:

- Best Overall
- Best Value
- Best for Fine Hair
- Best for Sensitive Skin
- Best Corded Option
- Best for Travel
- Best Fragrance-Free Formula
- Best for Beginners

Weak labels:

- Best Design
- Best Choice
- Best Premium
- Best Innovative
- Best Unique

unless the article defines and proves what those labels mean.

A product cannot receive two conflicting labels merely to improve commercial visibility.

## 8. Scoring rules

Scores are optional. When used:

- Publish the criteria or explain them.
- Use the same scale for all products.
- Use `null` or “not verified” when evidence is missing.
- Do not award full points for absent information.
- Record the reason for every score.
- Treat brand claims as lower-confidence evidence than independent testing.
- Do not create decimal precision unsupported by the method.

A score of 8.7/10 is inappropriate when the underlying judgments are broad and qualitative. Prefer whole numbers or category labels.

## 9. Product mini-review structure

A strong mini-review normally contains five elements.

For roundup product cards, cover these elements within the required Summary, Verdict, Pros, and Cons fields. A separate paragraph after the pros and cons is optional, not required. Add one only when it contributes material evidence or a decision point that does not fit those fields; do not repeat the summary or verdict to reach a word count.

### 1. Verdict lead

State why it earned the recommendation.

> This is the best fit for fine waves because it adds light hold without relying on the dense butters found in the richer creams.

### 2. Evidence

Use verified specifications, ingredients, or attributed review patterns.

### 3. Reader fit

Explain who should choose it.

### 4. Tradeoff

Name the most important drawback.

### 5. Distinction

Explain how it differs from a nearby alternative when useful.

Do not force these elements into the same order for every product.

## 10. Pros and cons rules

Every pro and con must be traceable to evidence.

Good pro sources:

- Verified specification
- Official manual
- Independent test
- Repeated review pattern
- Transparent price calculation

Good con sources:

- Missing feature
- Design limitation
- Recurring complaint
- High replacement cost
- Restrictive instructions
- Short warranty
- Conflicting results for a user type

Do not list price as a con without context. A product can be expensive and still offer good value.

## 11. Customer-review analysis protocol

For major retailers:

1. Record the total review count and date.
2. Read positive, critical, recent, and most-helpful reviews.
3. Search for criterion terms such as `scent`, `irritation`, `battery`, `broke`, `fine hair`, `buildup`, `pump`, or `pain`.
4. Separate product complaints from shipping, counterfeit, or seller complaints.
5. Note variant and region.
6. Record repeated patterns, not isolated anecdotes.
7. Identify user characteristics where available.
8. Compare patterns across more than one retailer when possible.

Do not claim statistical representativeness.

## 12. Reddit analysis protocol

1. Use relevant subreddits and recent threads.
2. Capture the original question and context.
3. Separate product discussion from technique problems.
4. Look for repeated experiences across independent threads.
5. Verify product facts elsewhere.
6. Paraphrase rather than copying comments.
7. Avoid exposing unnecessary personal details.
8. Record the thread date because formulas and models change.

Reddit evidence should normally be labeled low or medium confidence.

## 13. Competitor-analysis protocol

For each strong competitor article, record:

- Products included
- Claimed methodology
- Evaluation criteria
- Experts and original sources
- Useful questions
- Missing user groups
- Unsupported claims
- Stale products
- Structural strengths and weaknesses

Then verify facts independently. Competitors inform coverage; they do not determine WhoAdvice’s conclusions.

## 14. Comparison tables

A comparison table should contain only decision-relevant fields.

Possible fields:

- Best for
- Price
- Size
- Key feature
- Fragrance
- Wet/dry use
- Power source
- Runtime
- Attachments
- Main drawback

Avoid tables with 15 columns that become unreadable on mobile.

All products must use the same definition for a field. Do not mix official runtime for one product with reviewer-estimated runtime for another without labels.

## 15. Single-product verdict framework

Use one of these verdicts:

- Recommended
- Recommended for a specific user
- Worth considering with reservations
- Better alternatives exist
- Not recommended based on available evidence
- Evidence is insufficient

A verdict must answer:

- Who is it for?
- What does it do well?
- What is the main drawback?
- Is the price justified?
- What evidence is missing?

## 16. Medical and safety language

For skin, hair, and personal-care topics:

- Follow official warnings.
- Do not advise use on broken, infected, or severely irritated skin unless an authoritative source explicitly supports it.
- Do not call a cosmetic a treatment for disease.
- Distinguish cosmetic improvement from medical treatment.
- Include patch-test guidance only when supported by product instructions or a qualified source.
- Check recalls for devices and regulated products.

## 17. Update rules

Recheck an article when:

- A formula changes
- A model is replaced
- The price tier changes materially
- A product is recalled
- Availability drops
- New authoritative evidence affects a claim
- Review patterns reveal a recurring reliability problem
- The article is older than the project’s update interval

On update, do not simply change the publication date. Reverify the evidence packet and ranking.
