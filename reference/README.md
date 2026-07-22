# WhoAdvice Editorial Reference Map

## Purpose

This file is the control plane for the WhoAdvice editorial system. Use it to decide which reference owns a rule, which workflow applies to an assignment, and which documents should be loaded for the current stage.

Do not treat every file in this directory as an independent workflow or load every file by default. The workflow skill should route progressively from this map.

## Instruction precedence

When two instructions appear to conflict, apply this order:

1. Factual accuracy, safety, legal obligations, and honest disclosure
2. Approved-source, claim, recall, and exact-identity requirements
3. The canonical lifecycle and the selected article-type profile
4. The approved research packet and article contract
5. Brand, voice, human-centered writing, and style rules
6. SEO policy and the operational on-page checklist
7. Formatting preferences and optional prompt recipes

The more specific approved article contract may narrow a general default, but it cannot weaken accuracy, safety, sourcing, disclosure, or required review gates.

## Document roles

| File | Role | Authority | Load when |
|---|---|---|---|
| `01-brand-and-audience.md` | Brand scope, audience, and trust contract | Normative | Intake and research planning |
| `02-voice-and-tone.md` | Voice and tone | Normative | Contract, drafting, and editorial review |
| `03-writing-style-rules.md` | Prose and section-writing rules | Normative | Contract, drafting, and editing |
| `04-editorial-positions.md` | Editorial positions and evidence-model boundaries | Normative | Research, ranking, and claim decisions |
| `05-banned-ai-patterns.md` | Prohibited writing patterns | Normative | Contract, drafting, and audit |
| `06-product-review-guidelines.md` | Product and category evaluation rules | Normative | Product research, reviews, comparisons, and ranking |
| `07-fact-checking-policy.md` | Claim ledger and verification policy | Normative | Research, drafting, fact-checking, and audit |
| `08-approved-claims-and-sources.md` | Source-to-claim permissions | Normative | Research, claim wording, and audit |
| `09-good-writing-examples.md` | Approved examples | Illustrative | Only when a voice distinction needs an example |
| `10-bad-writing-examples.md` | Failure examples | Illustrative | Only when diagnosing or revising a known pattern |
| `11-article-workflow.md` | Canonical lifecycle, gates, audit status, handoff, and refresh cycle | Normative | Workflow classification and stage transitions |
| `12-seo-content-checklist.md` | Canonical SEO policy, planning standard, and rule values | Normative | SEO brief, ambiguity resolution, and policy updates |
| `13-article-production-guide.md` | Detailed human operator handbook | Explanatory | High-risk, multi-owner, or unusually granular work |
| `14-article-prompt-library.md` | Optional prompt recipes indexed by workflow stage and article type | Optional | When a stage needs a reusable prompt or separate owner |
| `15-fast-roundup-workflow.md` | Default four-part profile for a normal one-agent product roundup | Normative profile | Normal research-based product roundups |
| `16-human-centered-writing-and-editing.md` | Human-centered structural and editorial standard | Normative | Contract, drafting, editing, and audit |
| `17-final-cluster-sync.md` | Final multi-page cluster synchronization | Normative profile | After every included page passes its individual audit |
| `18-on-page-seo-checklist.md` | Compact operational SEO and page QA checklist derived from `12` | Normative execution checklist | Contract review, final audit, refresh, and cluster sync |
| `on-page-seo-checklist.md` | Compatibility pointer for older article records | Deprecated pointer | Follow its link to `18`; do not add new rules there |

## Article-type routing

### Normal product roundup

Use `11` for lifecycle and gate meanings, then use `15` as the controlling format profile. The workflow skill should run its four parts and pause after research/ranking and article-contract approval unless the user explicitly requests one uninterrupted run.

### High-risk or unusually complex roundup

Use `11`, the relevant normative policy files, and the detailed handbook in `13`. Pull only the needed prompt recipes from `14`. Use this route when evidence conflicts are extensive, medical or legal review is material, separate owners control stages, or independent scoring needs granular approval.

### Single-product review

Use `11`, `06`, the article-type route in `13` section 4.2, and `14` section 42 only when a prompt recipe is useful. Do not force ranked-roundup cards or awards onto a single review.

### Product comparison

Use `11`, `06`, the article-type route in `13` section 4.3, and `14` section 43 only when needed. Compare equivalent fields and make winners conditional on a defined reader or criterion.

### Informational, how-to, or problem-and-solution article

Use `11`, the lighter route in `13` section 4.4, and `14` section 41 only when needed. Build a claim ledger and evidence-led outline, but do not create product rankings unless the search intent requires them.

### Existing-article revision or refresh

Use `11` Stage 15 and the workflow skill's revision routing. Repeat live research only for time-sensitive or evidence-changing feedback. Do not rerun stable stages for a local prose or structure edit.

### Final cluster synchronization

Run `17` only after every included article has passed its own factual, human-centered, on-page SEO, and mechanical checks and reached the required manual editorial gate.

## Rule ownership

- `11` owns lifecycle stages, approval behavior, audit status, manual review, handoff, and refresh sequencing.
- The selected article-type profile owns section order, format-specific fields, and format-specific length ranges.
- `03` owns general prose defaults; a more specific approved profile or article contract may narrow them.
- `12` owns SEO policy and numeric SEO rule values. `18` is the compact execution form and must remain aligned with `12`.
- `07` and `08` own claim and source decisions. No workflow, prompt, SEO rule, or article contract may weaken them.
- The reusable skill owns tool routing, live-research requirements, workspace artifacts, and mechanical commands. It should reference project rules instead of restating them.

## Maintenance rule

When a durable workflow rule changes:

1. Update the owning normative file.
2. Update any derived profile, compact checklist, prompt recipe, skill route, or validator affected by that rule.
3. Search this directory and the workflow-skill package for stale wording, numbers, stage names, and paths.
4. Keep article-specific files out of a workflow-system update unless the user separately requests an article migration.
5. Run formatting and targeted consistency checks before completion.
