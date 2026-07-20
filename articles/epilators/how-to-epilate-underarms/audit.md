# How to Epilate Underarms Final Article Audit

- **Audit date:** July 20, 2026
- **Article:** `/skin-care/how-to-epilate-underarms/`
- **Workflow stage:** Part 4 complete
- **Outcome:** `ready_for_editorial_review`
- **Evidence model:** Exact-model manufacturer instructions plus authoritative medical guidance; no hands-on testing

## Severity counts

| Severity | Count |
|---|---:|
| Blocker | 0 |
| Critical | 0 |
| Warning | 0 |
| Suggestion | 0 |

CMS implementation, qualified human review, and the recorded publication-day source checks remain pending. Under the workflow, these are publication gates rather than draft defects.

## Mechanical audit

Command:

```bash
python3 /mnt/c/Users/marif/.codex/skills/whoadvice-article-workflow/scripts/audit_article.py articles/epilators/how-to-epilate-underarms/article.md
```

Final result:

```text
Words: 1999
Headings: 27
Flags: 0
```

`git diff --check` passes.

## Contract audit

- Final editorial QA confirmed the `ready_for_editorial_review` outcome. The requested minor-cut sentence was revised to avoid implying that AAD and MedlinePlus prescribe one identical ordered sequence.
- The manual-first opening, compact device-branch table, 11 steps, two stop callouts, aftercare section, reaction pathway, short-lived-result explanation, five-method comparison, seven FAQs, and decision conclusion remain in the approved order.
- The standardized pain rule and urgent-help wording are consistent.
- Device cleaning, cosmetic aftercare, and wound care remain separate.
- Philips models appear only as exact-instruction examples, not recommendations.
- Braun technique instructions remain excluded.
- No prices, marketplace references, affiliate links, rankings, product cards, or commercial calls to action appear.
- Public article length remains within the 1,800–2,100-word contract.

## Claim and evidence audit

| Claim area | Controlling live source | Audit result |
|---|---|---|
| BRE708/BRE728 model coverage and manual revision | Philips manual `3000.139.6355.2`, June 16, 2026 | Directly aligned; both models remain listed |
| Underarm permission, 3–4 mm, 75°, ProGuide, wet/dry use, and aftercare | Same Philips manual | Directly aligned and kept model-specific |
| BRE227/00 corded identity | Current Philips US product page | Directly aligned; no wet-use permission inferred |
| BRE227/00 underarm cap | Philips attachment support applying to BRE227/00 | Directly aligned; no exact angle inferred |
| BRE227/00 reactions, three-day advice, alcohol-free lotion/deodorant, and technique | Philips irritation support applying to BRE227/00 | Correctly attributed as manufacturer guidance |
| Minor-cut pressure, cleaning, and covering | AAD and MedlinePlus | Directly aligned without importing conflicting ointment advice |
| Severe/uncontrolled bleeding and infection-warning escalation | MedlinePlus | Directly aligned and action-led |
| Ingrown-hair association, do-not-pick advice, and warning signs | NHS | Directly aligned; supplementary because its displayed review-due date has passed |
| Method comparison | AAD hair-removal overview plus approved editorial distinctions | Limited to general mechanism and risk context |

No unsupported public claim was located. The draft does not diagnose a condition, normalize bleeding, guarantee comfort or duration, or turn a manufacturer maximum into an expected outcome.

## Voice and readability audit

- The opening begins with the reader’s proceed-or-stop decision.
- No generic market framing, fake empathy, fake testing, manufactured consensus, decorative questions, inflated product language, or retailer-style feature dump appears.
- Paragraphs are short, actions lead safety explanations, and exact-model limitations are stated in consumer language.
- Repetition remains only where it protects the reader: before use, during movement, before switching sides, in reaction care, in the bleeding FAQ, and in the conclusion.
- The seven FAQs answer in their first sentence and refer back to fuller sections instead of reproducing them.

## SEO audit

- SEO title is 51 characters; meta description is 149 characters.
- One H1 and a valid H2/H3 hierarchy are present.
- `how to epilate underarms` appears naturally in the title, opening, one H2, meta description, and slug.
- The page remains a non-commercial support article and does not compete for `best epilator for underarms` rankings.
- The internal pillar link is limited to product selection.
- Article or BlogPosting plus visible BreadcrumbList are the default schema handoff. HowTo remains conditional on the final rendered page and current eligibility rules; Product schema is not appropriate.
- Internal editorial metadata is wrapped in a non-rendering HTML comment and must not appear in consumer-facing copy.

## Link and freshness audit

- The Philips manual PDF, Philips BRE227/00 support pages, AAD, MedlinePlus, NHS, and WhoAdvice pillar destination all resolve to the intended pages as of July 20, 2026.
- The public Philips PDF link is explicitly identified as a manufacturer manual and PDF.
- The NHS page remains live but displays `Next review due: 18 January 2026`; retain it as supplementary and recheck immediately before publication.
- The live WhoAdvice pillar still shows outdated products, IPL entries within the epilator roundup, and broad unsupported comfort wording. Publish the completed local pillar refresh before or alongside this guide.
- No validated live WhoAdvice IPL, irritation, ingrown-hair, or epilator-maintenance destination was added merely to satisfy a link quota.

## Remaining CMS and publication work

- Publish the refreshed best-epilator pillar before or alongside this guide and add the reciprocal underarm-technique link.
- Ensure the internal metadata comment is not rendered.
- Recheck the exact Philips manual revision, BRE227/00 support pages, AAD, MedlinePlus, and the overdue NHS page if publication occurs after July 20, 2026.
- Record the named author, qualified medical reviewer, responsible editor, and their review dates.
- Confirm canonical, metadata rendering, breadcrumbs, sitemap inclusion, indexability, and correction-history fields.
- Render and test approved external and internal links, including clear PDF behavior.
- Test the device table, method table, 11-step hierarchy, and both stop callouts for mobile scrolling, semantics, contrast, and screen-reader use.
- Implement and validate Article or BlogPosting and BreadcrumbList schema. Use HowTo only if the visible page and current requirements support it.
- Verify licensed images, dimensions, responsive formats, and editorial alt text if visuals are produced.
- Run accessibility, performance, broken-link, and final rendered-page checks.

## Recommended next action

Send the completed article and this audit to a qualified medical reviewer and responsible editor. After their approval, complete the listed CMS and publication-day checks; Part 4 readiness is not publication approval.
