# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-26T14:27:57.032Z
Slide mode: presentation
Resolution: 1080p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/incident-response/gate-preview/slide-01.png, decks/incident-response/gate-preview/slide-02.png, decks/incident-response/gate-preview/slide-03.png, decks/incident-response/gate-preview/slide-04.png, decks/incident-response/gate-preview/slide-05.png, decks/incident-response/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 677fbca04fff015cbd843c5d1b0b268b3031ce9a2df615530ed2bfcbb3c17160, slide-02.html: fa75b29b43034b0c9d44c94ba9fa0a7d76a96a4c1249829c58f262b3607fb65c, slide-03.html: f6d67a2880c698faa0a84cd9a95714ea0a357dd2c5f9d3f6c0c96b58c313ed29, slide-04.html: b69b1ade2d0736502be7c930f37ff07a32ba241a862203f5526cca28906e2e99, slide-05.html: 98d990b26e570d21a760e8e2b6538dabb2d6a1f533a7439f7a2589b574d03530, slide-06.html: c20bd927106cbea7354cc179eb07023dda4e84e4875e81b1509c3da1b23e4fd5
Unresolved Critical: 0
Blocking findings: None

Method: the six slide sources were read against the `slides-grab show-design ppt-dark-tech`
output, and every colour literal, font declaration and container in them was grepped and
listed. The six PNGs above were then opened as images to confirm the source matches what
renders — in particular that the grid tile, the glows and the muted rows appear as intended.

## Checks
- [x] System consistency: PASS — One declared shell, reused verbatim on every sheet: a mono
  kicker row (`// NN — SECTION` left, `[ NN / 06 ]` right), a one-line 26pt H1, a 0.75pt
  `#2A2D35` hairline, `main`, and a mono footer. Sheets 01 and 06 swap the footer for the
  same meta strip so the cover and the close are a matched pair. **Two backgrounds only**
  (`#0C0D10` canvas, `#16181D` code-block surface) — nothing else is filled anywhere.
  **Two type families only** (Space Grotesk, JetBrains Mono), with mono reserved without
  exception for metadata: kickers, indices, tier labels, column heads, captions, the
  presenter line. **One accent does the work** (cyan `#3DF5E0`); violet `#9D7BFF` appears
  only where it carries a fixed meaning — the `// DOES NOT` heads on 03, the SEV-2 label on
  05, the `[ BLOCKS … ]` tags on 06. Every container in the deck is the same code-block node:
  `#16181D`, 1px `#2A2D35`, radius 4px. slide-02, -03 and -06 share one three-part grid;
  slide-04 and -06 share one row rhythm.
- [x] Color discipline: PASS — Grepping every colour literal across the six files yields
  exactly the seven spec tokens plus `rgba(61,245,224,…)`, which is accent 1 at reduced alpha
  used only as the `box-shadow` glow the spec prescribes in place of a diffuse shadow. No
  eighth hue, no palette extension, and therefore no colour entry in `design-debt.md`.
  Radius is 4px everywhere, under the spec's 8px ceiling. No pastel, no light background.
- [x] AI slop tropes: PASS — No gradient of any kind: the 0.5in machine grid the spec offers
  is a 36pt base64 data-URI SVG tile with 1px `#16181D` strokes, chosen precisely because the
  usual `repeating-linear-gradient` route would be a gradient. No rounded card with a left
  accent stripe used as a default container — the emphasis on slide-04's DECLARE row is a
  full 1px border plus glow, and *every* sibling row declares the same 1px border so nothing
  shifts. No SVG illustration, no emoji, no clip art, no icon set at all. No generic font
  stack: Space Grotesk and JetBrains Mono are the faces the style spec names, embedded
  locally from npm. No 3×2 icon-and-caption grid; the three-column sheets are text nodes.
- [x] Content discipline: PASS — **There is no chart, no KPI card and no number presented as
  measured anywhere in the deck.** Grepping the sources for digits returns only sheet indices
  (`01`–`06`), checkpoint numbers (`// 01`–`// 05`), severity labels (`SEV-1`–`SEV-4`), and
  the phrase "the first 30 minutes" in the title and footers — the name of the window, not a
  measurement of it. The style's `diagram.kpi_card` with its 44pt cyan value was deliberately
  left unused because any figure it could hold would have to be invented. Sheet 04 is an
  ordered sequence with **no time markers at all**, and its caption row says so in the render
  (`EACH ONE IS PASSED, NOT SCHEDULED` / `// NO CLOCK, NO MINUTE MARKERS`). Sheet 05's ladder
  is footnoted `LADDER PROPOSED FOR DISCUSSION` so it cannot be read as measured practice, and
  it carries no response-time SLA or frequency. Sheet 02's footer reads `NO CHART · MECHANISM
  ONLY`. The reasoning is recorded in full under "charts and figures" in `slide-outline.md`.
  `PRESENTER · TEAM` is a placeholder on both 01 and 06; no name is invented.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-04 | Uses the spec's vertical `diagram.hierarchy` node/connector form rather than the horizontal `diagram.process_flow` it nominally calls for | Minor | Not fixed — deliberate. Five columns across 652pt allow ~13 characters a line at the 14pt body floor; the alternative is type under 14pt, which is a Critical. Recorded as deviation 1 in `slide-outline.md` and in `design-debt.md` | tracked |
| slide-05 | Severity tiers hold a common width instead of narrowing, as `diagram.hierarchy_funnel` specifies | Minor | Not fixed — deliberate. The tiers carry four aligned columns and narrowing would destroy the row-to-row comparison that is the point of the sheet. Rest of the funnel vocabulary kept, including the cyan top edge and glow. Recorded as deviation 2 | tracked |
| slide-05 | Column heads initially rendered at 14pt because `.head p` outranked `.cap`, flattening the hierarchy against the rows | Note | Fixed before this report — heads are now 13pt mono muted | tracked |
| all | Type sizes are the framework's floors, not the spec's absolute points (its 17pt body and 11pt caption scale to ~12.75pt and ~8.25pt on a 10in canvas) | Note | Body 14pt, mono labels 13pt, captions 11pt, H1 26pt, cover display 38pt. Recorded as deviation 3 | tracked |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/incident-response/gate-preview/slide-01.png, decks/incident-response/gate-preview/slide-02.png, decks/incident-response/gate-preview/slide-03.png, decks/incident-response/gate-preview/slide-04.png, decks/incident-response/gate-preview/slide-05.png, decks/incident-response/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 677fbca04fff015cbd843c5d1b0b268b3031ce9a2df615530ed2bfcbb3c17160, slide-02.html: fa75b29b43034b0c9d44c94ba9fa0a7d76a96a4c1249829c58f262b3607fb65c, slide-03.html: f6d67a2880c698faa0a84cd9a95714ea0a357dd2c5f9d3f6c0c96b58c313ed29, slide-04.html: b69b1ade2d0736502be7c930f37ff07a32ba241a862203f5526cca28906e2e99, slide-05.html: 98d990b26e570d21a760e8e2b6538dabb2d6a1f533a7439f7a2589b574d03530, slide-06.html: c20bd927106cbea7354cc179eb07023dda4e84e4875e81b1509c3da1b23e4fd5
Unresolved Critical: 0
Blocking findings: None

Method: **all six PNGs were opened individually at full 1920×1080, not skimmed on a contact
sheet.** Sheets 01, 02, 05 and 06 were opened twice — once on the first render, which is where
their defects were found, and again on the render that matches the fingerprints above. Sheets
03 and 04 were opened once each; neither file has been edited since, so the image reviewed is
the image these fingerprints produce. Four defects were found only by looking, all of them
invisible to `validate`, and all four are fixed in the fingerprinted sources:

1. **slide-06 — a ~50pt void inside every question card.** This sheet has no footer, so `main`
   is 279.85pt while three stretched cards needed only ~153pt; the surplus opened between each
   question and its bottom-pinned tag. Enlarging the question type to fill it pushed the
   questions to four lines and overflowed instead. Rebuilt as three single-line rows in the
   sheet-04 rhythm — a vertically-centred line cannot open that void at any container height.
2. **slide-02 — card 3's title wrapped to three lines** where cards 1 and 2 took two, dropping
   that card's body a whole line below its siblings and breaking the row the three cards read
   as. `written from memory.` was cut to `reconstructed.` and the mechanism moved into the body.
3. **slide-05 — the column heads rendered at body size.** `.head p` outranked `.cap` on
   specificity and silently overrode 11pt with 14pt, so `LEVEL / WHEN IT APPLIES / WHAT IT
   OBLIGES / WHO IT WAKES` competed with the tier content instead of labelling it. Now 13pt.
4. **slide-01 — the cover's empty space was all in one place.** A single flex spacer put ~105pt
   of charcoal between the thesis and the foot rule, which reads as a hole rather than as
   composition. Split 0.8 : 1 above and below the title block; the block now sits just above
   centre. The thesis was also cut by one clause so it holds two lines instead of spilling a
   three-word third.

## Checks
- [x] Composition & hierarchy: PASS — One job per sheet, and each has a single anchor.
  slide-01.png: the 38pt two-line title over a short glowing cyan rule is unmistakably the
  anchor, with the thesis subordinate beneath it and the meta strip on the foot — the cover
  is not a bare title. slide-02.png: three equal cards, all three titles now two lines, so
  the `[ FAILURE 0N ]` tags, the titles and the body openings each sit on one shared line
  across the sheet; the single 14pt conclusion under them is the one full-width element and
  lands as the takeaway. slide-03.png: the split is the composition — `// DOES` in cyan over
  muted text, a hairline, `// DOES NOT` in violet over full-strength text, so the eye is
  pulled to the refusal, which is the sheet's argument. slide-04.png: the anchor is the
  glowing DECLARE row at the top of a cyan-connected rail, and nothing else on the sheet
  glows. slide-05.png: the cyan top edge on the ladder plus the cyan `SEV-1` label put the
  entry point exactly where reading starts, and the tiers visibly fade downward. slide-06.png:
  three rows, then a full-width glowing rule under a 26pt line — the loudest single sentence
  in the deck sits on the last sheet, which is where the audience should be left.
- [x] Typography & legibility: PASS — One scale end to end: cover display 38pt/700, H1 26pt/700,
  closing line 26pt/700, card titles 17pt/700, body and table cells 14pt/400, mono labels
  13pt, captions and column heads 11–13pt. **Nothing below 10pt and no body copy below 14pt**
  anywhere. Contrast on the charcoal ground is generous: text `#E4E6EB` on `#0C0D10` is far
  above 4.5:1, cyan `#3DF5E0` and violet `#9D7BFF` both clear it comfortably, and the muted
  `#8A8F9A` used for secondary copy measures ~5.9:1 on the canvas and ~5.5:1 on the `#16181D`
  node fill — checked specifically because a dark canvas is where muted text disappears. It
  is legible in the renders at the size shown. Leading is 1.4 or more on every mono label and
  body paragraph, 1.2 on the 26pt H1 and 1.25 on the 38pt cover; nothing in the deck uses
  `line-height: 1`, and no clipped ascender or descender appears in any of the six images.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — there is no Hangul or CJK in
  this deck; Pretendard was deleted after scaffolding and the embedded faces are Latin. English
  wrapping was inspected in its place. No one-word orphan line survives: the cover thesis breaks
  at its explicit `<br>` and both lines are full; slide-02's card titles break at the clause
  boundary the `<br>` sets and all three are two lines; slide-05's cells wrap to two lines with
  the shortest tail being `not chased.`; and every line that must not wrap — all six H1s, the
  five checkpoint names on 04, the four column heads on 05, the three questions on 06 — renders
  on one line, which was the horizontal budget's whole purpose. Longest H1 is 42 characters
  against a 46 cap.
- [x] Review Litmus: PASS — Three to five seconds per sheet. 02 reads "three failures, none
  technical" from the title alone and the cards only supply the mechanism. 03 reads as three
  columns each with a thing it must not do. 04 reads as a numbered rail. 05 reads left to right
  as level → when → obliges → wakes. 06 reads as three questions and a demand. Strip the
  decoration and nothing is lost, because there is barely any: the grid tile, two hairlines
  and two glows are the entire ornament budget. Nothing is removable either — every card pairs
  a claim with the mechanism that makes it true, and cutting the mechanism would leave five
  sheets of assertions.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-06 | A ~50pt void opened inside each question card between the question and its pinned tag | Major | Fixed before this report — rebuilt as three single-line rows in the sheet-04 rhythm | tracked |
| slide-02 | Card 3's title wrapped to three lines while cards 1 and 2 took two, dropping its body out of line with its siblings | Major | Fixed before this report — title shortened to `The timeline is / reconstructed.` and the mechanism moved into the body | tracked |
| slide-05 | Column heads rendered at 14pt instead of 11pt because `.head p` outranked `.cap`, flattening the hierarchy | Minor | Fixed before this report — heads are 13pt mono muted | tracked |
| slide-01 | All of the cover's slack sat in one block below the thesis and read as a hole | Minor | Fixed before this report — slack split 0.8 : 1 around the title block; thesis cut to hold two full lines | tracked |
| slide-01 | The cover still carries a large quiet area, by design | Note | Accepted — negative space around 38pt display type is the composition, and filling it would mean inventing content. In `design-debt.md` | tracked |
| slide-03 | ~20pt of unused height at the foot of each role card | Note | Accepted — uniform across all three cards, so it reads as padding rather than as a hole. In `design-debt.md` | tracked |
| slide-05 | `SEV-3` and `SEV-4` set in muted ink rather than full-strength text | Minor | Accepted — the ladder should visibly fall away as the obligation does; measured ~5.5:1 on the node fill, above the body threshold. In `design-debt.md` | tracked |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: 677fbca04fff015cbd843c5d1b0b268b3031ce9a2df615530ed2bfcbb3c17160
- slide-02.html: fa75b29b43034b0c9d44c94ba9fa0a7d76a96a4c1249829c58f262b3607fb65c
- slide-03.html: f6d67a2880c698faa0a84cd9a95714ea0a357dd2c5f9d3f6c0c96b58c313ed29
- slide-04.html: b69b1ade2d0736502be7c930f37ff07a32ba241a862203f5526cca28906e2e99
- slide-05.html: 98d990b26e570d21a760e8e2b6538dabb2d6a1f533a7439f7a2589b574d03530
- slide-06.html: c20bd927106cbea7354cc179eb07023dda4e84e4875e81b1509c3da1b23e4fd5
