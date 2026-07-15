# WhoAdvice Fast Roundup Workflow

## Purpose

Use this four-part workflow for research-based product roundups. It replaces the 17-prompt “minimal” sequence when one agent can research, write, and audit the article in the same workspace.

The long production guide and prompt library remain available for high-risk, medical, legal, or unusually complex assignments.

## Part 1: Research and rank

### User prompt

> Use $whoadvice-article-workflow Part 1 for [TOPIC]. Research current products, normalize exact models and packages, verify required retailer eligibility, build the source and claim records, define ranking criteria, and propose the ranked list. Stop for approval before drafting.

### Required output

- Search intent and target market
- Three useful editorial competitors
- Exact-model candidate register
- Raw per-product research snapshots saved to `articles/{article}/products/{product}.md`, or one shared `articles/{cluster}/products/{product}.md` archive when several cluster pages use the exact same package
- Eligibility and exclusion decisions
- Claim ledger with unknowns
- Ranking criteria and weights
- Proposed ranking and awards
- Raw retailer links kept in sources; public affiliate links appear only when the approved contract requires them and the publisher completes the commercial gate
- Approval gate: products, order, awards, and evidence gaps

Do not draft article prose.

Create each product file during research, before ranking. Record source URLs and access dates, exact identity and market, observed price and availability, raw specifications or relevant excerpts, and unresolved conflicts. Keep raw capture separate from normalized interpretation, and append dated snapshots on later research passes rather than overwriting prior evidence.

## Part 2: Approve the article contract

### User prompt

> Use $whoadvice-article-workflow Part 2 for the approved [TOPIC] ranking. Propose the article contract: opening angle, comparison fields, product-card format, type order, buying-guide factors, FAQ questions, conclusion logic, public wording exclusions, and CMS-owned tasks. Stop for approval.

### Article contract

Record these choices before prose:

```yaml
primary_keyword:
target_market:
evidence_model:
public_marketplace_names_allowed: false
public_community_names_allowed: false
product_card_fields:
  - Title
  - Slug
  - Editorial badge
  - Brand
  - Summary
  - Verdict
  - Pros
  - Cons
extra_product_paragraphs: false
comparison_columns:
type_order:
type_description_pattern: benefit -> best fit -> tradeoff
buying_guide_scope: pre-purchase only
buying_guide_factors:
faq_questions:
faq_product_reference_rule: mention a selected product only when it directly answers the question
intro_product_mentions: none when separate top-pick cards are used
top_pick_card_count: 3 unless the approved design specifies another count
top_pick_card_fields: [award, exact product name, original short description]
conclusion_pattern: main decision -> leading pick -> distinct alternatives -> material caveat
cms_owned:
  - internal links
  - external links
  - affiliate buttons
  - images
  - schema
  - canonical
  - mobile and page-speed testing
```

Optional commercial card fields may be added after `Brand` only when explicitly approved:

```yaml
public_product_identity_fields: [ASIN]
public_affiliate_link: true
affiliate_retailer: Amazon
affiliate_link_label: Check price on Amazon
affiliate_link_source: publisher-confirmed normalized product record
affiliate_link_attributes: [sponsored]
```

Do not add these fields by default. A shared exact package must use one ASIN and destination record across the cluster.

The underlying normalized product file must still contain a dated affiliate-link record for every active product with an Amazon destination, even when the public article contract does not expose ASIN or affiliate fields. Store the raw Amazon URL and ASIN immediately. Until the publisher supplies a Special Link, use `affiliate_link: null` and `affiliate_status: "pending_publisher_confirmation"`; after manual approval, replace the null value and use `affiliate_status: "publisher_confirmed"`. Never generate or infer the Special Link.

### Approval gate

Approve the complete contract. Later drafting must not change it silently.

## Part 3: Draft the complete article

### User prompt

> Use $whoadvice-article-workflow Part 3. Draft the complete article from the approved research packet and article contract. Apply the WhoAdvice voice and anti-AI rules. Do not add new products, facts, sections, public marketplace/community references, or post-card product paragraphs.

Apply `16-human-centered-writing-and-editing.md`. Define the reader situation and voice in the contract, draft around decisions, and do not treat generated prose as publication-ready.

### Section contracts

#### Introduction

- 120–200 words unless the contract says otherwise.
- Begin with the reader's decision, not background about the object being treated.
- Use the primary keyword naturally in the first 100 words.
- State the research-only evidence model.
- When the design includes separate top-pick cards, keep all product names and recommendations out of the introduction.
- Place the top-pick cards immediately after the introduction. Give each card its approved award, exact product name, and an original short description of fit and tradeoff.
- Do not copy card descriptions from the introduction, comparison table, Summary, or Verdict.

#### Product cards

Use exactly the approved fields. Put the use case, evidence, distinction, and drawback inside Summary, Verdict, Pros, and Cons. Do not add a paragraph after Cons unless the contract explicitly permits it.

- Summary: 50–60 words.
- Verdict: 25–30 words.
- Pros and cons: short, specific, and traceable.

#### Product types

Add a short description after the H2. Use the approved order. Each H3 description follows:

1. Practical benefit
2. Best-fit situation
3. Main tradeoff

Do not force product references.

#### Buying guide

Cover only checks made before purchase. Typical factors are:

- Reader need and job size
- Full budget
- Corded versus cordless layout
- Blade length and cut capacity
- Handle and head design
- Battery and charger cost

Move use, maintenance, and safety advice to a separate approved section or omit it.

#### FAQs

Use researched questions. Answer in the first sentence. Mention a selected product only when it is the clearest direct example. Do not force retailer or community names into public copy.

#### Conclusion

Use 80–150 words. Follow the same decision order as the buying guide. Name the leading recommendation, distinct alternatives, and one material caveat. Do not write a product roll call without decision logic.

## Part 4: Final Article Audit, manual review, and handoff

### User prompt

> Use $whoadvice-article-workflow Part 4. Run the Final Article Audit only on the completed draft, using the approved article contract, research packet, claim ledger, verified product records, affiliate mapping where applicable, and reader-intent strategy. Report gate-based findings before revisions. After approved revisions and a clean re-audit, prepare the draft for manual editorial review and CMS handoff.

Do not invoke Part 4 during research, product verification, synthesis, article-contract approval, or partial drafting. Run independent passes for contract compliance, product accuracy, claim evidence, intent coverage, differentiation, readability, on-page SEO, and publication risks. The audit must not invent facts, add products, or rewrite the full article.

Classify findings as `blocker`, `critical`, `warning`, or `suggestion`. Any blocker produces `blocked`; otherwise any critical produces `needs_revision`; otherwise use `ready_for_editorial_review`. Scores are secondary and cannot override this gate.

### Required checks

- Article contract compliance
- Exact models, packages, ranking, and table consistency
- Summary and verdict lengths
- No unapproved post-card paragraphs
- Types in approved order and pattern
- Buying guide contains purchase checks only
- FAQ answers are direct and product references are selective
- Conclusion follows article decision logic
- Public wording exclusions
- Affiliate disclosure, exact-destination consistency, and sponsored-link handoff when commercial links are approved
- Human-centered edit passes completed in order: intent, structure, evidence, sentence craft, voice, and proof
- No detector-driven errors, fake anecdotes, unsupported opinions, or manufactured irregularity
- Audit report includes status, severity counts, categorized findings, evidence references, unsupported claims, topic coverage, verified critical facts, and the recommended next action
- Blockers and critical findings are revised and the audit is rerun before manual review
- Responsible human editorial review recorded before publication; audit readiness is not publication approval
- SEO title, H1, meta, slug, opening, useful H2, and heading hierarchy
- CMS-owned work reported as pending, not counted as a draft failure
- Mechanical audit returns no material flags

Keep audit and revision separate. Show findings first, return affected copy to writing, synchronize changed files, and rerun the audit.

## Routing rules

Use the four-part workflow by default for a major roundup.

Use one combined run only when the user explicitly asks for a complete article without approval gates. Even then, create and follow the article contract internally before drafting.

For a local revision, read only the affected contract and references. Do not repeat SERP, product, or retailer research unless the requested change affects a time-sensitive fact.

Use the long prompt library only when:

- Different people or agents own separate stages
- The topic is medically or legally sensitive
- Evidence conflicts are extensive
- A large product set needs independent scoring
- The user requests granular approval at every stage
