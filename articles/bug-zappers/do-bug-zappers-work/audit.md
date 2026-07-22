# Audit: Do bug zappers work?

**Audit period:** July 20–21, 2026  
**Status:** `manual_editorial_review_complete`  
**Outcome:** `ready_for_prepublication_validation`  
**Contract:** `article-contract.md`  
**Draft:** `article.md`

```yaml
serp_title_review: complete
part4_final_article_audit: complete
technical_fact_review: complete
manual_editorial_review: complete
blockers: 0
critical: 0
warnings: 0
mechanical_flags: 0
technical_re_review_needed: false
expert_reviewed_label_allowed: false
next_gate: prepublication_validation
```

This is the canonical review and audit record for the article. It consolidates the former SERP/title review, Part 4 audit, technical fact review, and manual editorial review files.

## Gate history

| Date | Gate | Outcome | Next action at that point |
|---|---|---|---|
| July 20, 2026 | US SERP and title review | Scope, H1, title tag, slug, and FAQ direction approved | Finalize article contract |
| July 21, 2026 | Part 4 Final Article Audit | `part4_audit_complete`; 0 blockers, critical findings, warnings, or mechanical flags | Technical fact review |
| July 21, 2026 | Technical fact review | `technical_fact_review_complete`; no factual conclusion reversed | Manual editorial review |
| July 21, 2026 | Manual editorial review | `manual_editorial_review_complete`; all 4 required copy edits resolved | Prepublication validation |

## 1. US SERP and title review

**Market:** United States  
**Queries checked:** `do bug zappers work`; `do bug zappers work mosquitoes`; `do bug zappers attract more mosquitoes to your yard`; `do bug zappers work flies`

### Decision

Keep the page broad enough to answer the primary query, but lead with the mosquito-bite distinction. The result set mixes broad explainers, mosquito-specific guidance, insect-by-insect questions, and product roundups. The article therefore defines “work” by outcome and then separates mosquitoes, indoor flies, small flies, and non-target insects.

- **Approved H1:** Do Bug Zappers Work? What They Kill—and What They Don’t Control
- **Approved title tag:** Do Bug Zappers Work? What They Kill—and Don’t Control
- **Canonical slug:** `/home-gadgets/do-bug-zappers-work/`
- **Primary job:** Distinguish killing an insect that reaches a mechanism from controlling bites or populations.
- **Dominant sub-intent:** Whether conventional outdoor UV-only zappers reduce mosquito bites.
- **Excluded intent:** Product rankings, exact-product recommendations, universal placement or cleaning instructions, and unsupported disease-risk conclusions.

### Result-set signals

| Result/source | Search-intent signal | Article consequence |
|---|---|---|
| Kansas State University Extension, “Bug Zappers” | Mosquitoes, biting flies, and non-target insects | Put the bite-control answer and non-target tradeoff near the top |
| Colorado State University Extension, “West Nile Virus and Mosquito Management” | Separates UV-only zappers from CO2/octenol-assisted traps and evaluates biting rates | Preserve mechanism and endpoint boundaries |
| University of Kentucky Entomology, “Mosquitoes: Practical Advice for Homeowners” | Covers outdoor population, biting activity, and lure-assisted systems | Qualify every yard-level claim |
| University of Florida archived zapper article | Supplies the strong “attract more mosquitoes” framing repeated in search | Use a narrower FAQ answer rather than inherit the broad claim |
| Commercial and publisher results | Mix broad explainers with product roundups and insect-specific pages | Keep this page informational and product-neutral |

### FAQ and differentiation decision

Retain “Do bug zappers attract more mosquitoes to your yard?” with this approved answer:

> A conventional UV light may draw some nearby insects toward the device, and individual mosquitoes may approach it. The evidence does not establish that this increases mosquitoes across the yard. Conventional outdoor UV-only zappers also have not been shown to reduce biting rates.

Also retain the patio, indoor-fly, fungus-gnat, and EPA-establishment-number questions. The distinguishing structure is the outcome ladder: attraction, entry/contact, kill/capture, nearby abundance, human landing, biting rate, population, and disease risk.

Recheck leading results, title wording, and FAQ phrasing during prepublication validation because SERPs can change.

## 2. Part 4 Final Article Audit

### Corrections resolved

1. Replaced the drifted UC IPM indoor-light-trap attribution with current Texas A&M AgriLife Extension guidance for UV trap mechanism and house-fly use, plus Oregon State Extension guidance for placement and competing light.
2. Added visible inline support for the fragment-scatter warning from Texas A&M and Urban and Broce’s peer-reviewed *Current Microbiology* study.
3. Narrowed the category wording from `fan-assisted traps` to `fan-only traps` so combination devices are not covered by an unsupported universal claim.

The corrected language was synchronized across `article.md`, `article-contract.md`, `content-brief.md`, `research.md`, `sources.md`, and `publisher-handoff.md`.

### Contract pass

- Approved title, H1, slug, evidence model, and 12-part answer path are preserved.
- The answer-first opening remains product-neutral.
- Both contracted decision tables and the compact eight-outcome mosquito ladder remain intact.
- All five approved FAQs remain direct and evidence-bounded.
- No products, rankings, awards, affiliate links, marketplace names, or Flowtron recommendation were added.
- Commercial internal links remain CMS holds behind the contradiction safeguard.

### Evidence pass

- Mosquito conclusions remain separated across attraction, contact, kill, abundance, landing, biting, population, and disease-risk outcomes.
- Indoor fly claims use directly applicable extension sources.
- Fragment scatter and microorganism release are visibly cited and limited to high-voltage electrocution evidence.
- Glue-board and fan-only wording does not overgeneralize combination devices.
- Gnat, midge, moth, bee, wasp, non-target, CDC-prevention, and EPA-establishment-number boundaries match the research packet.
- The source register records the UC IPM source drift and prevents restoration of the removed attribution.

### Voice, SEO, and structure pass

- No fake testing, fake expert participation, unsupported consensus, promotional language, or generic AI opening was found.
- Paragraphs remain short, and consequential claims have nearby attribution.
- Primary keyword placement, title, H1, opening, useful H2, meta description, slug, and heading hierarchy pass.
- The comparison and decision tables remain useful without collapsing evidence boundaries.

## 3. Technical fact review

This gate reopened the primary sources supporting entomology, integrated pest management, mosquito public-health, food-area sanitation, non-target, and regulatory claims. It was an evidence-verification pass, not a named-expert endorsement.

### Claim verification

| Claim area | Sources reopened | Result and boundary |
|---|---|---|
| Conventional outdoor UV-only zappers and mosquitoes | Colorado State University Extension; University of Kentucky Entomology | Supported: these devices have not been shown to reduce outdoor mosquito biting rates; catches do not establish population or bite reduction |
| Lure-assisted mosquito traps | Colorado State University Extension | CO2 and octenol may improve attraction or trapping, but greater catch has not established fewer bites under natural conditions |
| Mosquito prevention | CDC, “Preventing Mosquito Bites” | Supports registered repellents used as directed, covering clothing, screens or air conditioning, and weekly water-container management; no zero-risk promise |
| Integrated mosquito management | CDC | Supported as a layered professional framework; the drifted CDC URL was replaced with the current official page |
| Indoor fly light traps | Texas A&M AgriLife Extension; Oregon State Extension | Some indoor UV traps may suit larger flies such as house flies; placement and competing light matter |
| Food-area electrocution warning | Texas A&M AgriLife Extension; Urban and Broce, *Current Microbiology* | High-voltage electrocution can disintegrate flies and release fragments, particles, and microorganisms; the article does not generalize risk to every device or room |
| Fungus gnats | University of Minnesota Extension; UC IPM | Moist potting media sustains the problem; sticky cards catch adults but do not replace source management |
| Drain or moth flies | Penn State Extension | Moist, decomposing organic material, including drain deposits, is a breeding source |
| Fruit or vinegar flies | University of Minnesota Extension | Fermenting food, liquids, and waste are relevant sources; UC IPM is retained only for identification and management context |
| Non-biting midges | University of Minnesota Extension | Chironomid midges may resemble mosquitoes, are attracted to light, and do not bite |
| Moths | Penn State Extension | Moths include pollinators, and artificial light can interfere with normal activity; no zapper kill rate is claimed |
| Bees and wasps | University of Georgia Extension | Many bees pollinate and many wasps are predators; no quantified UV-attraction or zapper-mortality claim |
| EPA establishment number | US EPA | Identifies the producing establishment and does not indicate approval, registration, certification, endorsement, or safety/efficacy review |

### Technical-review corrections

1. Replaced the obsolete CDC integrated-mosquito-management URL in `research.md` and `sources.md`.
2. Added direct inline support for drain/fruit flies, midges, bees, and wasps.
3. Narrowed the UC IPM fruit-fly source note and attributed the fermenting-source statement to University of Minnesota Extension.

No factual conclusion required reversal or material narrowing. Technical re-review is not required for the subsequent copy edits.

## 4. Manual editorial review

**Outcome:** All required copy edits resolved; no blockers.

### Required edits resolved

1. Narrowed the meta description from a definite mosquito-bite claim to “haven’t been shown to reduce.”
2. Removed the redundant `still` from `still remain central`.
3. Replaced 2 internal editorial instructions with reader-facing statements.
4. Rewrote the first FAQ answer to address nearby attraction directly before the yard-wide and biting-rate boundaries.

### Non-blocking refinements applied

- Made the *Current Microbiology* link text descriptive.
- Changed the non-target heading to “Can bug zappers kill beneficial insects?”
- Paraphrased the comparison-section mosquito conclusion to reduce exact repetition.

## 5. Current mechanical verification

- `wc -w`: 2,393 words, within the 1,800–2,400 contract.
- Workflow audit script: 2,320 parsed words, 17 headings, `Flags: 0`.
- Meta description: 154 characters.
- `git diff --check`: clean at consolidation time.

## 6. Prepublication validation still required

- Confirm article metadata and all `CMS INTERNAL-LINK HOLD` comments are excluded from rendered public content.
- Verify every proposed internal-link destination against the contradiction safeguard; remediate conflicting commercial claims or keep the link inactive.
- Reopen consequential mosquito, non-target, food-area, CDC, EPA, and other authoritative sources on publication day.
- Add and verify author, reviewer, publication/update dates, disclosure, breadcrumbs, canonical, schema, sitemap, indexability, and 200 response.
- Test mobile tables, accessibility, image dimensions/compression/alt text, and page performance.
- Complete the final cluster SEO and cannibalization review.

This audit does not authorize an `expert-reviewed` label or publication.
