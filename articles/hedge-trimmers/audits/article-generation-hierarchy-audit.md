# Hedge-trimmer article generation and hierarchy audit

**Audit date:** July 14, 2026  
**Scope:** Generation readiness and parent/leaf intent separation for the three `article.md` drafts  
**Result:** **Pass with minor structural cleanup recommended.**

## Intended hierarchy

```text
Best hedge trimmers — broad commercial hub
├── Best corded hedge trimmers — corded commercial leaf
└── Best cordless hedge trimmers — cordless commercial leaf
```

The hub should answer **which power/reach format fits the garden and which mixed-market products are strongest**. A leaf should assume the reader is interested in that format and answer **which exact product within the format fits the job**.

## Page-role audit

| Article | Canonical role | Primary keyword | Main decision | Current coverage | Verdict |
|---|---|---|---|---|---|
| `best-hedge-trimmers/article.md` | Parent hub | `best hedge trimmer` | Choose corded, cordless, standard handheld, or pole reach, then select a representative exact model | Mixed-format ranking; power types; hedge size, reach, cord route, battery package, and blade/capacity guidance | **Pass — broad parent intent is clear** |
| `best-corded-hedge-trimmers/article.md` | Corded leaf | `best corded hedge trimmer` | Confirm a cord is practical, then compare blade size, stated capacity, weight, handles, cord retention, and complete extension-cord cost | Corded-only ranking; standard 22-inch, rotating-handle 24-inch, compact, and saw-tip formats; outlet route and cord requirements | **Pass — specific leaf intent is clear** |
| `best-cordless-hedge-trimmers/article.md` | Cordless leaf | `best cordless hedge trimmers` | Compare complete kits by hedge condition, loaded weight, controls, battery platform, runtime evidence, and ownership cost | Cordless-only ranking; kit identity; loaded weight; battery/runtime/platform; jam and support considerations | **Pass — specific leaf intent is clear** |

## Generation-readiness audit

| Check | Hub | Corded leaf | Cordless leaf |
|---|---:|---:|---:|
| `article.md` exists and is nonempty | Pass | Pass | Pass |
| One H1 | Pass | Pass | Pass |
| Primary keyword and unique slug | Pass | Pass | Pass |
| Product order matches approved brief/contract | Pass | Pass | Pass |
| Top picks precede comparison and reviews | Pass | Pass | Pass |
| Product cards use approved fields | Pass | Pass | Pass |
| Methodology precedes types/buying guide | Pass | Pass | Pass |
| Buying guide follows page role | Pass | Pass | Pass |
| FAQs answer format-appropriate questions | Pass | Pass | Pass |
| Conclusion follows approved decision logic | Pass | Pass | Pass |
| Length fits contract | 2,589 / 2,400–3,000 | 2,332 / 2,200–3,000 | 4,012 / 3,600–4,300 |
| Links support parent/leaf movement | Pass | Pass | Pass |

## Parent-versus-leaf boundaries

### Main hub: what it should own

- The first decision between corded, cordless, gas, standard handheld, and pole reach.
- A deliberately mixed shortlist representing distinct garden constraints.
- Broad checks: hedge size, hedge height, cord route, blade length versus capacity, handle/head design, and complete battery package.
- Short answers that help a reader choose a format or recognize when another cutting tool is needed.
- Descriptive links to the corded and cordless leaves once the reader has chosen a direction.

### Main hub: what it should not absorb

- A full cordless battery-platform tutorial.
- Detailed runtime, charger-speed, loaded-weight, or gearbox comparisons across many cordless products.
- A full cord-gauge and outlet-layout guide repeated from the corded leaf.
- A second five-product corded or cordless ranking.
- Long maintenance instructions better handled by future supporting articles.

### Corded leaf: what it should own

- Whether the outlet-to-hedge route makes corded power practical.
- Extension-cord cost and exact-manual requirements.
- Direct comparisons among corded blade lengths, weights, handles, cord retention, and saw-tip designs.
- Corded-specific value: continuous runtime and lower entry cost balanced against cable management.

### Cordless leaf: what it should own

- Exact kit versus tool-only identity.
- Loaded weight, battery capacity, charger speed, platform compatibility, and total ownership cost.
- Attributed runtime claims and conflicts.
- Cordless-specific controls, jam/transmission features, support, and battery availability.
- Direct comparisons among cordless products without implying voltage alone determines cutting performance.

## Internal-link hierarchy

| From | To | Purpose | Status |
|---|---|---|---|
| Hub | Corded leaf | Continue after confirming a simple cable route | Present |
| Hub | Cordless leaf | Continue after choosing cable-free movement or comparing complete kits | Present twice with varied anchors |
| Corded leaf | Hub | Return readers who have not chosen a format | Present |
| Corded leaf | Cordless leaf | Alternative when cable routing is impractical | Present |
| Cordless leaf | Hub | Return readers still comparing power/reach formats | Present |
| Cordless leaf | Corded leaf | Lower-cost alternative when every hedge is near an outlet | Present |

The topology is sound. Keep the hub links near the format decision and keep leaf cross-links conditional; do not add product-name anchors to category pages.

## Cannibalization check

### Controlled overlap

- Shared products are acceptable because the hub compares formats while leaves compare products within one format.
- Shared specifications must remain identical, but summaries and verdicts should answer different decisions.
- The hub may mention battery cost, cord route, and runtime at a high level; the corresponding leaf owns the detailed explanation.
- Similar FAQ topics are acceptable when the hub gives a short routing answer and the leaf gives the format-specific decision rules.

### Query ownership

| Query family | Canonical owner |
|---|---|
| best hedge trimmer | Main hub |
| corded vs cordless hedge trimmer | Main hub until a dedicated comparison article is published |
| best corded hedge trimmer | Corded leaf |
| best cordless hedge trimmer | Cordless leaf |
| lightweight cordless hedge trimmer | Cordless leaf |
| corded hedge trimmer extension cord | Corded leaf or future safety support article |
| best pole hedge trimmer | Future pole-trimmer leaf; hub retains interim coverage |
| hedge trimmer blade length / cutting capacity | Hub for concise guidance; future informational article for full treatment |

## Minor structural cleanup

### 1. Completed — hub CMS meta-tag block moved out of article flow

`best-hedge-trimmers/article.md` contains an H2 named `Meta tags for CMS` and a long HTML block. This is publishing metadata, not reader content. Move it to `publisher-handoff.md` or represent it as non-rendered front matter. It currently causes the hub’s only mechanical density flag.

**Status:** Completed.

### 2. Completed — corded transition into product reviews tightened

The thin `Our five recommended corded hedge trimmers` H2 was removed; its useful transition paragraph remains before the ranked reviews.

**Status:** Completed.

### 3. Completed — cordless heading capitalization

General H2 and H3 headings now use sentence case. Exact product names and award labels remain unchanged.

**Status:** Completed.

## Article-generation rules for future revisions

1. Read `content-brief.md`, then `research.md`, then `article-contract.md` before generating or materially revising `article.md`.
2. Do not generate from `sources.md` alone; it is a source register, not an editorial plan.
3. Use the shared `../products/` archive for exact identity and specifications.
4. Do not change products, order, awards, comparison fields, or major sections without updating research and contract approval first.
5. Keep the hub broad and routing-oriented; place format depth in the matching leaf.
6. Keep shared facts synchronized but write original intent-specific reviews.
7. After generation, audit article → brief → contract → sources → shared product file consistency.
8. Run the mechanical article audit and report CMS-owned work separately.

## Final decision

All three `article.md` files are correctly positioned for the cluster hierarchy and can remain the canonical drafts for their assigned intents. No page needs to be merged, split, or reclassified. All identified structural cleanups are complete. Future revisions should preserve the current parent/leaf boundaries and reciprocal links.
