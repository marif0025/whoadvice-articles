# WhoAdvice: SEO Content Standard

## Purpose

Use this file as the canonical SEO policy, planning standard, and source of numeric SEO rule values for every WhoAdvice article. Use `18-on-page-seo-checklist.md` as the compact execution checklist during contract review, final audit, refreshes, and cluster sync.

When these two files drift, this file owns the policy value and `18` must be corrected. Do not add new policy to the deprecated `on-page-seo-checklist.md` compatibility pointer.

SEO must improve how clearly the article satisfies a reader's search. It must not distort the editorial voice, weaken factual accuracy, force keywords into sentences, or encourage unsupported product claims.

This checklist works alongside:

- `01-brand-and-audience.md`
- `02-voice-and-tone.md`
- `03-writing-style-rules.md`
- `05-banned-ai-patterns.md`
- `06-product-review-guidelines.md`
- `07-fact-checking-policy.md`
- `08-approved-claims-and-sources.md`
- `11-article-workflow.md`

When SEO advice conflicts with accuracy, safety, source quality, or honest disclosure, the editorial and fact-checking rules take priority.

---

## Core SEO principles

1. Write for the reader's decision or problem first.
2. Match the page to one clear primary search intent.
3. Optimize each article around one main key phrase or tightly defined topic.
4. Use the primary key phrase naturally in important locations.
5. Use long-tail phrases, related terms, entities, and natural variations where they help answer the topic.
6. Never insert a keyword where a normal editor would remove it.
7. Do not target a fixed keyword-density percentage.
8. Do not repeat the main phrase merely to reach a tool score.
9. Add information that is more useful, specific, current, or transparent than the existing search results.
10. Keep the article easy to scan without turning every sentence into a bullet point.
11. Use descriptive internal links to connect related WhoAdvice coverage.
12. Make claims easy to verify and sections easy to extract, summarize, and cite.
13. Avoid thin affiliate content. A page must remain useful even when every shopping link is removed.
14. Do not claim first-hand testing unless valid testing records exist.
15. Treat SEO as an ongoing process. Recheck search performance, links, product availability, and freshness after publication.

---

# Part 1: Required SEO brief before writing

Do not begin the full draft until the following fields are defined.

```yaml
article_topic:
article_type:
primary_keyword:
primary_search_intent:
secondary_intents:
target_reader:
reader_problem_or_decision:
content_format_expected_by_serp:
secondary_keywords:
long_tail_keywords:
question_keywords:
semantic_terms_and_entities:
products_or_subtopics_required:
internal_link_targets:
credible_external_sources:
competitor_content_gaps:
whoadvice_information_gain:
target_region:
search_freshness_requirements:
```

## Primary-keyword rule

Choose one primary keyword or one tightly unified key phrase for the page.

Good:

- best epilators
- best curl creams for fine hair
- how to use a cleansing balm
- Braun Silk-épil 9 review
- body oil vs body lotion

Too broad or mixed:

- best epilators, shaving tips, laser hair removal, skin care routine, and waxing guide

A page may rank for many variations, but it should have one clear central topic.

## Search-intent rule

Label the dominant intent:

- **Informational:** The reader wants an explanation, instructions, safety guidance, or an answer.
- **Commercial investigation:** The reader is comparing options before buying.
- **Transactional:** The reader is ready to find a product, price, seller, or deal.
- **Navigational:** The reader is looking for a specific brand, product, or page.

Most WhoAdvice product roundups have commercial-investigation intent. Most routines, ingredient explainers, and technique articles have informational intent. A single-product review usually combines informational and commercial-investigation intent.

Do not assume intent from the keyword wording alone. Review the current search results and record:

- Dominant page type
- Common title pattern
- Typical product count or content depth
- Questions answered by strong results
- Whether results favor guides, lists, comparisons, videos, retailer pages, tools, or category pages
- Important freshness signals such as current year, product generation, pricing, or reformulation

If the current search results overwhelmingly favor a different format, either change the planned format or document why WhoAdvice can satisfy the intent better with an alternative.

## User-intent questions

Before outlining, answer:

1. What is the reader trying to decide, fix, compare, or understand?
2. What would make the reader return to the search results unsatisfied?
3. What facts must appear near the top of the page?
4. What caveats could materially change the reader's decision?
5. What does the reader need after the initial answer?
6. Is the query sensitive to skin type, hair type, budget, routine, region, or safety?
7. Does the query imply a specific use case such as sensitive skin, fine curls, travel, beginners, or frequent use?

---

# Part 2: Keyword selection and mapping

## Keyword selection criteria

Evaluate candidate keywords using more than search volume.

Consider:

- Relevance to WhoAdvice's categories
- Match with reader intent
- Topical fit with existing site coverage
- Ranking difficulty relative to the site's authority
- Commercial or decision value
- Search volume and trend
- SERP competition
- Content quality required to compete
- Product availability in the target market
- Whether WhoAdvice can add meaningful information gain

A low-volume long-tail keyword can be more valuable than a broad high-volume term when it represents a clear reader problem and achievable intent.

## Keyword groups

Build a small, purposeful keyword map.

### 1. Primary keyword

The central query for the page.

Example:

- best curl creams

### 2. Close variations

Natural wording differences with the same intent.

Examples:

- best cream for curly hair
- top curl-defining creams
- curl cream recommendations

### 3. Long-tail keywords

More specific queries that reveal audience or use case.

Examples:

- best curl cream for fine curly hair
- best curl cream without heavy buildup
- curl cream for dry 3B curls
- affordable curl cream for beginners

### 4. Question keywords

Questions suitable for sections or FAQs.

Examples:

- What does curl cream do?
- Do you apply curl cream to wet or dry hair?
- Can curl cream weigh down fine hair?

### 5. Semantic terms and entities

Concepts, ingredients, attributes, methods, and product-category vocabulary required to cover the topic accurately.

Examples for curl cream:

- hold
- definition
- frizz
- moisture
- slip
- buildup
- curl pattern
- porosity
- fine hair
- coarse hair
- humectants
- oils
- silicones
- air-drying
- diffusing

Semantic coverage is not a reason to insert every related phrase. Include terms only when the article genuinely discusses the concept.

## Keyword-to-section mapping

Assign keyword groups to sections before drafting.

```markdown
| Section | Reader purpose | Primary or secondary phrase | Supporting terms | Evidence needed |
|---|---|---|---|---|
| Introduction | Confirm relevance and summarize the decision | best curl creams | curl definition, frizz | methodology |
| Best for fine hair | Find a lightweight option | curl cream for fine hair | buildup, lightweight hold | formula + review patterns |
| Buying guide | Understand selection criteria | how to choose curl cream | porosity, hold, finish | expert sources |
| FAQ | Resolve use questions | apply curl cream to wet or dry hair | styling routine | brand/expert guidance |
```

Do not assign the same exact phrase to every section. That creates repetition rather than topical depth.

---

# Part 3: Keyword usage rules

## Strategic placement

Use the primary key phrase, where natural, in:

- SEO title
- Meta description
- URL slug
- H1/article title
- First 100 words
- At least one relevant H2 or H3 when it accurately describes that section
- Body copy a few natural times
- Conclusion or verdict when it reads naturally
- Image filename or alt text only when the image genuinely represents the phrase

Not every placement is mandatory when it produces awkward language. The title, H1, introduction, and page topic must remain clear even if the exact phrase cannot fit every location.

## Keyword frequency and density

There is no required keyword-density percentage.

Balanced keyword use means:

- The article's topic is unmistakable.
- The main phrase appears in important locations.
- Exact-match repetition does not distract the reader.
- Variations replace unnecessary repetition.
- Relevant concepts are covered in depth.
- Product names do not replace useful category language entirely.

Do not:

- Aim for an arbitrary density such as 1%, 2%, or 3%.
- repeat the exact main phrase in consecutive paragraphs.
- force the phrase into every product heading.
- create grammatically unnatural headings to preserve exact-match wording.
- list keyword variations in a sentence with no editorial purpose.
- hide keywords in image alt text, tables, footers, or FAQs.

Read every exact-match use aloud. Remove or rewrite any occurrence that sounds inserted for a crawler rather than written for a person.

## Variations and pronouns

After the topic is established, use natural references:

- these epilators
- the devices in this guide
- curl creams
- the formulas we researched
- this type of cleanser
- these options

Do not replace every natural reference with the exact key phrase.

## Singular and plural forms

Use whichever form fits the sentence. Do not damage grammar to match a keyword tool.

Bad:

> These best epilator removes hairs from roots.

Good:

> The best epilators remove hair from the root, but the right model depends on where and how you plan to use it.

## Semantic-keyword rule

Use related terms to improve completeness, not to create a disguised keyword list.

A term should appear because the article:

- Explains it
- Uses it as an evaluation criterion
- Compares products by it
- Answers a reader question about it
- Needs it for technical or safety accuracy

---

# Part 4: SEO title, H1, meta description, and URL

## SEO title checklist

The SEO title should:

- Include the primary key phrase once.
- Place the phrase near the beginning when natural.
- Match the page's actual content and intent.
- Make the value or differentiator clear.
- Use a useful modifier only when accurate.
- Be unique across WhoAdvice.
- Usually remain around 50–60 characters, while prioritizing clarity over a rigid count.
- Avoid repeating the same word or phrase.
- Avoid unsupported superlatives or clickbait.

Useful modifiers include:

- Best
- Tested, only when genuinely tested
- Researched
- Review
- Comparison
- Guide
- For sensitive skin
- For fine hair
- Under a verified price threshold
- Current year, only when the article is actively maintained

Good:

> 8 Best Epilators for At-Home Hair Removal

> Best Curl Creams for Fine, Wavy, and Coily Hair

> Cleansing Balm vs. Cleansing Oil: Key Differences

Avoid:

> Best Epilators: Best Hair Removal Epilator Reviews & Top Epilators

> 10 Life-Changing Curl Creams You Need Right Now

## H1 checklist

- Use one clear H1.
- Include the primary phrase or a very close natural variation.
- The H1 may be more reader-friendly than the SEO title.
- Do not use an H1 that promises testing, expertise, or results the article cannot support.
- Do not make the H1 substantially broader than the content.

## Meta-description checklist

The meta description should:

- Include the primary key phrase naturally.
- Summarize what the reader will get.
- State a concrete selection basis, differentiator, or benefit.
- Match the article rather than baiting the click.
- Be unique.
- Place the most important information early.
- Usually stay around 140–160 characters; shorter copy may display more consistently on mobile.
- Avoid empty phrases such as “Read on to learn more.”

Good:

> We researched the best epilators for legs, the face, sensitive skin, and wet or dry use, comparing features, reviews, and value.

Avoid:

> Looking for the best epilators? Discover the best epilators in our ultimate best epilators guide today!

Meta descriptions can be rewritten by search engines. Write them for relevance and click clarity, not as a ranking trick.

## URL-slug checklist

The slug should:

- Be short and descriptive.
- Include the main topic.
- Use lowercase words separated by hyphens.
- Remove filler words when meaning remains clear.
- Avoid dates unless the date is essential to the content type.
- Avoid changing after publication without a redirect plan.
- Avoid product IDs, tracking parameters, and unnecessary category repetition.

Good:

- `/skin-care/best-body-oils/`
- `/hair-care/curl-cream-for-fine-hair/`
- `/personal-care/epilator-vs-waxing/`

Avoid:

- `/blog/2026/06/the-10-very-best-body-oils-that-you-should-buy-right-now/`

---

# Part 5: Article structure and headings

## Outline must follow the decision journey

For commercial articles, a useful sequence is often:

1. Direct answer or quick recommendations
2. Why the picks fit different needs
3. Comparison table
4. Individual product evaluations
5. How the products were researched and selected
6. Buying guidance
7. Safety, use, or maintenance guidance
8. FAQs
9. Final decision summary

For informational articles, a useful sequence is often:

1. Direct answer
2. Key distinction or definition
3. Step-by-step guidance or explanation
4. Exceptions and caveats
5. Common mistakes
6. Related questions
7. When professional guidance may be appropriate

Change the order when search intent requires it.

## Heading rules

- Use one H1.
- Use H2s for major reader questions or decisions.
- Use H3s for meaningful subtopics beneath an H2.
- Keep heading levels in logical order.
- Use descriptive headings that can stand alone.
- Include keywords or variations only where they accurately describe the section.
- Prefer question headings for real questions.
- Avoid generic headings such as “Introduction,” “Overview,” “More Information,” or “Step 1” when a descriptive heading is possible.
- Do not repeat the H1 as the first H2.
- Do not create thin sections merely to fit extra keywords.

Good:

- `## What to Look for in an Epilator`
- `### Wet-and-Dry Use`
- `## Is Epilating Suitable for Sensitive Skin?`

Weak:

- `## Best Epilators Best Features`
- `## More About This Topic`
- `## Why It Is Important`

## Semantic chunking

Each major section should work as a small, complete resource.

A strong section usually:

1. Answers the heading immediately.
2. Explains the answer.
3. Adds evidence, comparison, examples, or caveats.
4. Links to a deeper WhoAdvice page when useful.

This makes content easier for readers, search engines, and AI systems to understand and summarize.

---

# Part 6: Introduction checklist

The introduction must:

- Confirm the reader is on the right page within the first few sentences.
- Use the primary key phrase naturally within the first 100 words.
- Identify the central choice, problem, or confusion.
- Add one useful distinction rather than generic background.
- State the research or testing model honestly.
- Preview how recommendations or guidance are organized.
- Avoid delaying the answer with a long anecdote.
- Avoid broad statements such as “Beauty has been important for centuries.”
- Avoid repeating the title in several forms.

For a research-based roundup, include a transparent method statement such as:

> To identify the strongest options, we compared current specifications, ingredient or feature information, customer-review patterns, Reddit discussions, and competing recommendations. We did not conduct hands-on testing, so brand performance claims remain attributed.

Adjust the wording to the actual evidence collected.

---

# Part 7: Body-content optimization

## Answer-first writing

When a heading asks a question, begin with the answer.

Good:

> Curl cream is usually applied to damp or wet hair because water helps distribute the product more evenly. The ideal amount depends on hair density, length, and how rich the formula is.

Weak:

> There are many factors to consider when thinking about the right way to apply curl cream.

## Paragraph and readability rules

- Keep paragraphs focused on one main idea.
- Break up large text walls.
- Use bullets for genuine lists, comparisons, steps, or checks.
- Do not convert ordinary prose into excessive bullets.
- Use tables when readers need side-by-side comparison.
- Explain jargon on first use.
- Use specific examples where they clarify a choice.
- Make important caveats visible rather than burying them.
- Avoid filler transitions that add no meaning.

## Information-gain requirement

Every article must add value beyond a rewritten version of the current top-ranking pages.

Acceptable information gain includes:

- A clearer decision framework
- Better product normalization
- A transparent evidence table
- Cost-per-ounce or cost-per-use comparison
- Review-pattern analysis by skin or hair type
- Current product availability and model verification
- Conflicting-source analysis
- A useful limitation competitors omit
- Safety or maintenance guidance from authoritative sources
- Reddit-derived questions verified against stronger sources
- An original comparison table
- A more precise explanation of who should and should not choose each option
- Updated information on formulas, variants, warnings, or recalls

Not acceptable:

- Combining competitors' headings
- Rewording retailer bullet points
- Adding generic prose to increase word count
- Treating a longer article as automatically better
- Inventing observations to make the content seem original

## Content-depth rule

Cover the topic as deeply as the intent requires, not to reach an arbitrary word count.

The article is complete when it:

- Answers the central query
- Covers material subquestions
- Addresses important caveats
- Gives the reader enough evidence to act
- Does not leave obvious intent gaps compared with credible results

Do not add loosely related sections to make the page longer.

## Entity clarity

Use exact names for:

- Products
- Brands
- Models and generations
- Ingredients
- Techniques
- Regulators
- Professional organizations
- Skin and hair concerns

Define relationships clearly. Do not write vague copy such as “this powerful technology” when the reader needs the feature or ingredient name.

---

# Part 8: Product-roundup and review SEO

## Standalone-value rule

Every ranked roundup must provide enough original analysis to remain useful without separate product pages or retailer links.

Each product section should explain:

- Why the product earned its label
- Which verified criteria it meets
- Who it best suits
- The strongest evidence-backed advantage
- The most relevant limitation
- A meaningful comparison with another option when helpful
- The evidence model and confidence level

These requirements may be satisfied within the approved Summary, Verdict, Pros, and Cons fields. A separate narrative paragraph is optional and must not be added merely to lengthen the card.

Do not use interchangeable product paragraphs.

## Product-award headings

Awards should represent distinct reader needs.

Good:

- Best Overall
- Best for Fine Hair
- Best Budget Pick
- Best for Wet-and-Dry Use
- Best Fragrance-Free Option

Weak:

- Best Amazing Choice
- Best Premium Quality
- Best Powerful Option

Do not create awards only to place long-tail keywords. Each award must be supported by the evaluation criteria.

## Comparison-table SEO

The table should help the decision rather than repeat retailer data.

Use columns such as:

- Best for
- Key verified feature
- Important limitation
- Size or runtime
- Fragrance status
- Wet/dry status
- Cost per ounce or unit
- Evidence confidence

Do not overload the table with every available specification.

## Product-name usage

- Use the verified full name on first mention.
- Use a shorter unambiguous form afterward.
- Do not repeatedly use the full Amazon-style title for SEO.
- Do not combine specifications from different models, sizes, or regions.

## Affiliate-content safeguard

The article must add substantial editorial value beyond the merchant listing.

It should include:

- Independent comparison
- Transparent selection criteria
- Meaningful pros and cons
- Evidence limitations
- Useful alternatives
- Current identity and variant checks
- Reader-specific recommendations

Do not publish a page that consists mainly of product descriptions and affiliate buttons.

## Review-language rule

Because WhoAdvice currently relies on research, customer reviews, Reddit, and competitor research, use language such as:

- We researched
- We compared
- The brand states
- The manual confirms
- Reviewers frequently mention
- Across the discussions reviewed
- Available evidence suggests

Do not use:

- We tested
- We tried
- In our experience
- We found it comfortable
- It left our skin soft

unless genuine hands-on evidence exists.

---

# Part 9: Internal and external links

## Internal-link checklist

Each article should normally include several useful internal links, depending on length and available site coverage.

Link to:

- A parent category or hub
- Closely related buying guides
- Supporting informational articles
- Product comparisons
- Technique, ingredient, or safety explainers
- Relevant articles that help the next decision

Rules:

- Use descriptive anchor text.
- Make the linked destination predictable.
- Vary anchors naturally.
- Link only when the destination adds value.
- Do not use “click here” as the primary anchor.
- Do not force an exact-match anchor into every link.
- Do not add unrelated links merely to reach a number.
- Ensure new articles are linked from at least one relevant existing page so they do not become orphan pages.

Good:

> Learn how to choose an epilator for sensitive skin.

Weak:

> Click here for more.

## External-link checklist

Use external links when they help verify:

- Safety guidance
- Medical or cosmetic claims
- Regulations
- Product manuals
- Ingredient information
- Recalls
- Standards
- Original studies
- Expert or professional guidance

Rules:

- Prefer primary and authoritative sources.
- Link directly to the source supporting the claim.
- Do not cite a competitor roundup when a stronger original source exists.
- Do not use external links as decoration.
- Check that the linked page applies to the exact product, region, or claim.
- Keep attribution next to the claim.

Affiliate and sponsored links must follow the site's disclosure and link-qualification rules outside the writer's prose.

---

# Part 10: Images and visual SEO

For every meaningful image:

- Use a descriptive filename.
- Write concise, accurate alt text.
- Describe what the image shows in context.
- Include a keyword only when it naturally describes the image.
- Do not repeat the same alt text across images.
- Do not stuff product names and keyword variations into alt text.
- Do not use alt text as a caption, sales pitch, or hidden keyword field.
- Avoid text baked into images when the same information should be readable as HTML.
- Compress and size images appropriately before upload.
- Use original, licensed, or permitted visuals.
- Add captions when a caption provides product identity, context, source, or a useful explanation.

Good alt text:

> Braun Silk-épil 9 epilator with its shaver head and skin-contact cap

Bad alt text:

> best epilator best hair removal epilator top epilator for women smooth skin device

For comparison graphics, explain the key finding in nearby text so the information remains accessible and indexable.

---

# Part 11: Featured answers and AI-search visibility

The goal is not to write for a machine instead of a reader. The goal is to make strong answers easy to identify and cite.

Use:

- Clear question-based headings
- Direct first-sentence answers
- Short definition paragraphs
- Ordered steps for processes
- Tables for true comparisons
- Concise pros and cons
- Complete sentences that make sense without surrounding context
- Named sources and precise attribution
- Specific examples and measurable facts
- Clear distinctions between fact, brand claim, review pattern, and editorial interpretation

Do not:

- Write robotic “snippet bait” that lacks nuance.
- repeat the same answer in the introduction, body, FAQ, and conclusion.
- add fake quotations or statistics.
- create dozens of shallow question sections.
- assume special AI-only markup is required.

## Quotable-statement test

Important conclusions should be understandable when extracted alone.

Good:

> A higher tweezer count can speed up coverage, but head design, motor consistency, and technique also affect how efficiently an epilator removes hair.

Weak:

> This is why it is the better one.

---

# Part 12: FAQ checklist

Include an FAQ only when it answers genuine secondary questions not already resolved clearly in the main article.

FAQ questions may come from:

- Search-result questions
- Google autocomplete or related searches
- Semrush question keywords
- Reddit discussions
- Quora questions
- Relevant specialist and general-interest forums
- Customer-review confusion
- Brand instructions
- Expert guidance
- Search Console queries after publication

### Community-led FAQ research workflow

1. Search Reddit for the primary keyword and close variants. Prioritize recent, relevant threads, but retain older questions when the issue is still current.
2. Search Quora for the same topic and record only questions that can be viewed or reliably identified. If access is blocked, document the limitation; do not invent findings.
3. Search other relevant forums, including specialist communities, retailer Q&A pages, and established discussion boards.
4. Create a question list before drafting answers. Record the community, thread title or wording, URL, date when available, and the underlying reader concern.
5. Group duplicates and near-duplicates into one natural question. Repeated themes across independent communities deserve more consideration than isolated prompts.
6. Reject questions that are off-topic, unsafe, too personal, promotional, model-obsolete, or already answered fully in the main article.
7. Verify every factual or safety-sensitive answer with manufacturer instructions or a stronger authoritative source. Community anecdotes identify questions and experience patterns; they do not prove the answer.
8. Write the selected answers only after the research list is complete. Answer in the first sentence, then add concise conditions or safety context.
9. Preserve the research list and rejected questions in the article's source notes so the selection can be audited during refreshes.

Rules:

- Use real reader wording.
- Answer directly in the first sentence.
- Keep answers complete but concise.
- Avoid repeating product sections.
- Do not create a question only to insert an exact-match keyword.
- Do not provide medical diagnosis or treatment advice outside the approved policy.
- Do not assume FAQ content will receive an FAQ rich result.

---

# Part 13: Trust, authorship, and freshness

## Trust signals in the article

Where supported by the publishing system, include:

- Named author
- Relevant author biography
- Reviewer or fact-checker when applicable
- Published date
- Updated date
- Transparent research methodology
- Sources or citations
- Affiliate disclosure
- Correction process
- Clear contact or editorial-policy access

The writer must not invent credentials or imply expert review that did not occur.

## Freshness checklist

Reverify time-sensitive details before publication:

- Product availability
- Model or generation
- Formula or ingredient list
- Price and discount
- Retailer and seller
- Warranty
- Included accessories
- Safety warnings
- Recall status
- Regulatory guidance
- Expert recommendations

Use the current year in the title only when the article will be maintained and the year genuinely improves search clarity.

Do not change the publication date merely to make old content appear new. Update the article meaningfully and record what changed.

---

# Part 14: Technical handoff for the publisher

The article writer should provide the following SEO handoff with every completed draft.

```yaml
primary_keyword:
primary_intent:
secondary_keywords:
long_tail_keywords_used:
seo_title:
h1:
meta_description:
recommended_slug:
article_excerpt:
category:
recommended_tags:
internal_links_included:
additional_internal_link_opportunities:
external_authoritative_sources:
featured_image_filename:
featured_image_alt_text:
other_image_alt_text:
suggested_schema_types:
content_freshness_items:
claims_requiring_final_verification:
```

## Schema suggestions

The writer may recommend relevant schema types, but implementation belongs to the publishing system.

Common possibilities include:

- `Article` or `BlogPosting`
- `BreadcrumbList`
- `ItemList` for a genuine ranked list when technically appropriate
- `Product` only when the page and markup satisfy the applicable requirements

Rules:

- Structured data must match visible page content.
- Do not mark up ratings WhoAdvice did not collect or own.
- Do not add fake review counts.
- Do not recommend FAQ schema merely because the article has an FAQ.
- Do not promise a rich result.
- Do not recommend Google Product rich-result markup for a multi-product roundup or category list. Current Google product-snippet eligibility focuses on a single product or variants of the same product; use `Article`, `BreadcrumbList`, and a truthful ranked `ItemList` for these roundup pages.
- If a future single-product review qualifies for `Product`/`Review` markup, every marked-up claim, rating, offer, pro, and con must be visible and supported. Do not add an `Offer` from a retailer snapshot that the site cannot keep current.

Current primary references:

- Google reviews system: https://developers.google.com/search/docs/appearance/reviews-system
- High-quality review guidance: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews
- Product snippet requirements: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- Structured-data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

---

# Part 15: Final SEO quality gate

The article cannot be marked ready until the following checks pass.

## Search intent

- [ ] The article has one clear primary intent.
- [ ] The content format matches what the query requires.
- [ ] The main reader problem is answered early.
- [ ] Important secondary questions are covered.
- [ ] The page does not drift into unrelated intents.

## Keywords

- [ ] One primary key phrase is defined.
- [ ] The primary phrase appears naturally in the SEO title.
- [ ] The primary phrase appears naturally in the H1 or a close variation.
- [ ] The primary phrase appears in the first 100 words.
- [ ] The primary phrase appears in the slug where appropriate.
- [ ] At least one useful heading contains the phrase or a relevant variation.
- [ ] Long-tail terms are used only in relevant sections.
- [ ] Semantic terms reflect actual topic coverage.
- [ ] Exact-match repetition has been edited for naturalness.
- [ ] No numeric keyword-density target was used.
- [ ] No keyword stuffing appears in prose, headings, tables, links, or alt text.

## Titles and metadata

- [ ] The SEO title is unique, accurate, and click-worthy without clickbait.
- [ ] The title is usually within a practical display length.
- [ ] The meta description is unique and describes the page's value.
- [ ] The meta description includes the key phrase naturally.
- [ ] The slug is short, stable, and readable.

## Structure and readability

- [ ] The page uses one H1.
- [ ] H2 and H3 levels are logical.
- [ ] Headings are descriptive.
- [ ] Sections lead with an answer or conclusion where appropriate.
- [ ] Paragraphs are readable and focused.
- [ ] Lists and tables are used only when they improve comprehension.
- [ ] No section exists only to increase length or keyword coverage.

## Quality and information gain

- [ ] The article adds original analysis, synthesis, or decision support.
- [ ] It does more than summarize competitor pages and retailer listings.
- [ ] Product recommendations explain why each pick fits its award.
- [ ] Material limitations are included.
- [ ] The article remains useful without affiliate links.
- [ ] No first-hand testing is implied without evidence.
- [ ] Claims follow the fact-checking and source policies.

## Links

- [ ] Relevant internal links are included.
- [ ] Anchor text is descriptive and natural.
- [ ] The new article has a plan to receive internal links from existing pages.
- [ ] External citations use the strongest available sources.
- [ ] Every consequential external claim has nearby attribution.
- [ ] Links are not added merely to satisfy a quota.

## Images

- [ ] Filenames are descriptive.
- [ ] Alt text accurately describes each image.
- [ ] Alt text is concise and not stuffed with keywords.
- [ ] Product variants shown in images match the article.
- [ ] Important information in graphics is also available in text.

## Trust and freshness

- [ ] The research or testing method is stated honestly.
- [ ] Product identity and availability are current.
- [ ] Prices and deals include a check date where shown.
- [ ] Ingredient lists, warnings, and specifications are current.
- [ ] Author, update, disclosure, and editorial details are available to the publisher.
- [ ] The article has identified future update triggers.

## Final read-aloud test

Read the title, introduction, headings, product-award labels, conclusion, and every exact-match keyword use aloud.

Fail the article if:

- A keyword sounds inserted.
- Several headings repeat the same phrase.
- Product sections sound interchangeable.
- The introduction delays the answer.
- Claims sound more certain than the evidence.
- The copy reads like a search-engine template rather than WhoAdvice editorial content.

---

# Part 16: Article-type SEO patterns

## Best-product roundup

Primary intent: commercial investigation.

Required SEO elements:

- Main category phrase in title and introduction
- Need-based product awards
- Useful comparison table
- Selection methodology
- Individual evidence-backed evaluations
- Buying criteria
- Relevant use and safety questions
- Alternatives or limitations
- Internal links to supporting guides

## Single-product review

Primary intent: product-specific commercial investigation.

Required SEO elements:

- Exact verified product name
- Product and model in title, H1, and introduction
- Clear research-based or hands-on disclosure
- What it claims to do
- Key specifications or ingredients
- Review consensus and recurring complaints
- Who it may suit and who should skip it
- Alternatives
- Verdict
- Current availability and variant checks

## Comparison article

Primary intent: decision between options.

Required SEO elements:

- Both compared entities in title and introduction
- Direct verdict near the top
- Identical comparison criteria
- Side-by-side table
- Scenario-based winners
- Clear differences rather than separate mini reviews
- Final recommendation by user type

## Informational guide

Primary intent: learn, solve, or understand.

Required SEO elements:

- Direct answer near the top
- Step-by-step or concept-based structure
- Relevant expert or authoritative sources
- Definitions only where needed
- Common mistakes and caveats
- Related questions
- Internal links to deeper commercial or informational pages

## Deal article

Primary intent: time-sensitive transaction.

Required SEO elements:

- Exact event, retailer, category, or product
- Verified current price and discount
- Time and date checked
- Seller and variant verification
- Explanation of why the product is worth considering beyond the discount
- No expired deal language after the offer ends
- Update, redirect, archive, or removal plan

---

# Part 17: Prohibited SEO shortcuts

Never instruct the writer to:

- Reach an exact keyword-density target
- Repeat a phrase until an optimization tool turns green
- Copy competitor headings and rewrite them
- Add unrelated FAQs for keyword coverage
- Manufacture first-hand experience
- Invent expert quotes, survey data, testing, or statistics
- Use hidden text or misleading alt text
- Create multiple near-duplicate pages for minor keyword variations
- Publish thin product summaries with affiliate links
- Use the current year without a maintenance plan
- Add unsupported medical or performance claims for stronger keywords
- Use vague, sensational, or deceptive titles
- Write a long introduction to increase dwell time
- Mention every semantic term supplied by a tool
- add exact-match internal anchors where they sound unnatural
- Promise rankings, traffic, rich results, featured snippets, or AI citations

---

# Part 18: Post-publication SEO review

SEO work does not end at publication.

Review the page using Google Search Console and site analytics.

Check:

- Indexing status
- Queries generating impressions
- Click-through rate
- Average position trends
- Search intent mismatches
- Unexpected query variations
- Internal-link coverage
- Broken external links
- Product availability
- Stale prices, models, formulas, or warnings
- Sections readers exit before reaching
- New questions appearing in Search Console, Reddit, or customer reviews
- Cannibalization with another WhoAdvice URL

## Update actions

Based on evidence, consider:

- Improving the title or meta description when impressions are healthy but CTR is weak
- Expanding a section for a relevant query already receiving impressions
- Adding internal links from authoritative related pages
- Consolidating overlapping articles
- Updating products, prices, sources, and recommendations
- Rewriting sections that no longer match search intent
- Adding genuine information gain rather than padding word count
- Removing obsolete products or unsupported claims

Do not rewrite a stable page solely because a content tool suggests more keywords.

---

## Reference basis

This checklist adapts applicable principles from current Backlinko guidance on SEO checklists, on-page SEO, search intent, keyword analysis, SEO content, internal linking, helpful content, SEO copywriting, blog SEO, and affiliate reviews. It is also constrained by Google Search Central guidance on helpful content, keyword stuffing, title links, internal links, image SEO, structured data, AI search features, and high-quality product reviews.

These references inform the checklist; they do not override WhoAdvice's evidence, disclosure, medical-claims, or editorial policies.
