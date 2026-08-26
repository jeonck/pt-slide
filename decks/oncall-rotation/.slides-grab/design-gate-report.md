# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-26T15:50:11.265Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/oncall-rotation/gate-preview/slide-01.png, decks/oncall-rotation/gate-preview/slide-02.png, decks/oncall-rotation/gate-preview/slide-03.png, decks/oncall-rotation/gate-preview/slide-04.png, decks/oncall-rotation/gate-preview/slide-05.png, decks/oncall-rotation/contact-sheets/sheet-01.png
Slide fingerprints: slide-01.html: 0e3572f9ac6b7a80bd0b88c00c84dc608862428d37e1b19cfa8366755b22f369, slide-02.html: 8db625564558ca08c85538b5c4067b89c8573ab25137e9a0b9b35b913cda104a, slide-03.html: c673926a268db7d7a29720748595541f6223b15ad04a9f6b056d4a033423dc9d, slide-04.html: fa475bd0c8bb656fc5d2e999f068096d02aac07ba1dcde5b5cfa352719c46408, slide-05.html: 155f3e9857db346a65071533dfbc349cb4d9de413e62ba8f3afb214f7f1a6c10
Unresolved Critical: 0
Blocking findings: None

## Checks
- [x] System consistency: PASS — All five sheets share one skeleton, verified by reading the
  five files and by the contact sheet `contact-sheets/sheet-01.png`: 56pt/40pt body padding,
  a header with a 12pt terracotta kicker left and a muted counter right, `main{flex:1;min-height:0}`,
  and a footer of 1pt `#D6CCB8` rule + 11pt caption. Because the footer is `main`'s sibling and
  never a child, the bottom rule lands at the same y on all five sheets — checked in the
  contact sheet, where the five rules line up across the row. Backgrounds: 1 (`#F2EBDF`; no
  sheet uses `surface`). Typefaces: 1 (Work Sans, four weights). Accent: 1 (terracotta), used
  exactly once per sheet as the dominant mark — cover arc, slide-02 rule, slide-03 emphasis
  line, slide-04 badges, slide-05 rule. Layout patterns are all drawn from the style's declared
  vocabulary: divider (01), TOC/node grid (02), comparison with a full-height hairline (03),
  process_flow (04), comparison cards (05).
- [x] Color discipline: PASS — `grep -ho '#[0-9A-Fa-f]\{6\}' slide-0*.html | sort -u` returns
  exactly six values: `#3D3528`, `#8A8170`, `#C2693F`, `#D6CCB8`, `#F2EBDF`, `#FBF7EF`. All six
  are verbatim `show-design ppt-warm-minimal-diagram-deck` tokens. **No palette extension was
  needed and none was invented.** `#FBF7EF` (surface) appears only as the digit colour inside
  terracotta badges. Two spec-sanctioned colours are used more sparingly than the spec assigns
  them, for contrast reasons recorded in `design-debt.md` items 1 and 2.
- [x] AI slop tropes: PASS — No gradient of any kind: `grep -i gradient slide-0*.html` returns
  nothing, and the only fills are flat token colours. No rounded-card-plus-left-stripe default
  container; the outline nodes are the style's declared `diagram.language` (no-fill, 1pt ink
  outline, 12px radius) and carry no stripe. No SVG illustration — the two SVGs are a rotation
  ring (four primitives) and a connector (path + arrowhead), both diagram, not decoration. No
  generic font stack: Work Sans is what the style spec names, embedded locally from
  `@fontsource/work-sans`; `grep -c http slide-0*.html` returns 0 on every file. No emoji. No
  3×2 icon grid — slide-02 is 2×2 and carries no icons.
- [x] Content discipline: PASS — There is not a single quantity in the deck.
  `grep -oE '[0-9]+' slide-0*.html` outside CSS returns only the sheet counters (01–05) and the
  step badge digits 1–4. No chart, no canvas, no percentage, no duration, no roster size, no
  benchmark. The levers on slide-02 are named and glossed but never priced; slide-04 describes
  what a ceiling does without ever stating one; slide-05 asks for the minimum roster as a
  decision rather than asserting a number. The cover ring deliberately carries **no countable
  markers standing for people** — two markers, and they mark the two handovers that bound one
  shift, which is definitional. The style's mandatory caption slot on all five sheets reads
  "No sourced figures: shift hours, page rates and roster sizes are unsourced." rather than a
  citation this repo cannot produce. Presenter is the placeholder `Presenter · Team`.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | 5 `sibling-overlap` warnings: the terracotta arc and the two handover markers each intersect the ink ring and each other in bounding box | Note | None — the intersection is the diagram's meaning | tracked in design-debt.md #4 |
| slide-01 | 12pt terracotta kicker on sand measures ~3.3:1 | Note | Kept per style spec; all prose is ink brown at 10.2:1 | tracked in design-debt.md #1 |
| slide-03 | Column heads `THE PAYLOAD` / `WHY IT CANNOT WAIT` in terracotta at 12pt, same ~3.3:1 | Note | Kept per style spec (`12pt terracotta small-caps header per column`) | tracked in design-debt.md #1 |
| slide-04 | Four modules on one sheet; the densest sheet against the style's ">50% empty" | Minor | Accepted — splitting needs a sixth sheet and the count is fixed at five | tracked in design-debt.md #5 |
| slide-02, slide-04 | Step badges sit inside the node outline rather than overhanging its corner | Note | Deliberate; overhang costs clearance the height budget had spent | tracked in design-debt.md #3 |
| all | Caption set in `#3D3528` where the spec's caption colour is `#8A8170` | Note | Legibility: muted measures 3.25:1 and the caption carries the no-data disclosure | tracked in design-debt.md #2 |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/oncall-rotation/gate-preview/slide-01.png, decks/oncall-rotation/gate-preview/slide-02.png, decks/oncall-rotation/gate-preview/slide-03.png, decks/oncall-rotation/gate-preview/slide-04.png, decks/oncall-rotation/gate-preview/slide-05.png, decks/oncall-rotation/contact-sheets/sheet-01.png
Slide fingerprints: slide-01.html: 0e3572f9ac6b7a80bd0b88c00c84dc608862428d37e1b19cfa8366755b22f369, slide-02.html: 8db625564558ca08c85538b5c4067b89c8573ab25137e9a0b9b35b913cda104a, slide-03.html: c673926a268db7d7a29720748595541f6223b15ad04a9f6b056d4a033423dc9d, slide-04.html: fa475bd0c8bb656fc5d2e999f068096d02aac07ba1dcde5b5cfa352719c46408, slide-05.html: 155f3e9857db346a65071533dfbc349cb4d9de413e62ba8f3afb214f7f1a6c10
Unresolved Critical: 0
Blocking findings: None

## Method
All five 1920×1080 PNGs were opened individually as images and read at full size, not skimmed
as thumbnails — twice: once on the first render, which turned up five defects `validate` had
passed, and again after the fixes. The 5-up contact sheet was then opened as a third pass to
check the deck as one system (constant furniture y, one accent per sheet, title baseline
drift). Every defect listed below was found by looking, not by a tool. Confidence is High
because the deck is five sheets and all five were examined at full resolution after the last
edit; the fingerprints above are the files those PNGs were rendered from.

## Checks
- [x] Composition & hierarchy: PASS — One job per sheet, one anchor per sheet. 01: the title,
  with the rotation ring as the visual anchor (a shift drawn as a terracotta arc between two
  hollow handover markers) — a real anchor, not a decorated bullet. 02: the 2×2 lever grid,
  anchored by the terracotta rule and the claim beneath it. 03: the payload list against the
  reason it cannot wait, anchored by the terracotta statement in the right column. 04: the
  three-node flow is the anchor; the lead line sets it up and the three consequences read off
  it. 05: two decision cards, anchored by the terracotta rule and the closing line. Cover and
  closing sheets both carry genuine anchors. In the contact sheet the four body titles sit on
  the same baseline and the five footer rules line up — nothing drifts.
- [x] Typography & legibility: PASS — Sizes present in the deck: 42, 30, 20, 18, 16, 15, 14,
  12, 11pt. Body prose is 14pt and above; the 11pt caption and 12pt labels are the only text
  under 14pt and both are furniture, not argument. **Nothing under 10pt.** Leading values used:
  1.2 / 1.25 / 1.3 / 1.35 / 1.4 / 1.45 / 1.5 — `line-height:1` appears nowhere, including
  inside the fixed-size circle badges, whose digits are set at 1.4. No clipped ascenders or
  descenders in any render (checked the 42pt cover line `people can survive`, which is the
  deck's most exposed descender row). Contrast at presentation distance: prose is `#3D3528` on
  `#F2EBDF` at 10.2:1; the terracotta labels at ~3.3:1 are the one soft spot and are recorded
  in `design-debt.md` #1 — they are labels, and no sentence depends on them.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — The deck is English-only and
  contains no CJK text; `lang="en"` on all five files and Pretendard was removed from
  `assets/fonts/`. Layer 1 (mid-word breaks) cannot occur. The Layer 2 analogue for English —
  ragged wrapping and orphan lines — was checked and one instance was found and fixed: the
  slide-03 emphasis rendered as `The person leaving the / shift / is the one who knows.`, a
  one-word orphan line. Fixed by rebalancing the columns 315/244 → 300/259 so the phrase
  before the `<br>` fits on one line. Re-checked in the new render: two clean lines.
- [x] Review Litmus: PASS — Read cold, the five sheets give up the argument in about four
  seconds: rotations are a staffing problem → here are the four levers → this is what a
  handover carries and why only the outgoing person has it → this is what a ceiling forces
  upstream → here are the two decisions. Strip the ornament and the deck still works: the
  ornament *is* the argument's shape (the ring is a shift, the flow is the causal chain).
  Lines that could be removed were: the slide-02 claim lost a clause, the slide-05 closing line
  lost four words, and slide-03's two right-hand paragraphs lost a sentence — all three read
  better shorter. What remains has no filler row.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-05 | **Both card body texts overflowed the card's bottom outline** — the third line of each sat across the 1pt border. `validate` passed it: the text is inside the frame and no siblings overlap, it is a child overflowing its parent | Major | The closing line had wrapped to two lines and stolen the cards' height. Shortened the closing line to one measured line (`Below the floor, something is given up — chosen or not.`, 547.5pt of 608pt), gap 24→20pt, card padding 14→12pt | fixed, re-rendered |
| slide-02 | **Card 1's gloss wrapped to a second line and collided with the card's bottom border**, and because the cards were `justify-content:center` that card's header dropped below its three neighbours' — the row's first lines did not align | Major | Shortened the gloss to one measured line; changed the cards to `justify-content:flex-start` so a future second line can never break the row's alignment again | fixed, re-rendered |
| slide-02 | The claim line wrapped to two lines, eating the grid's height budget | Major | Rewritten to `Encouragement moves none of them. Only the roster does.` — one line, and a better sentence | fixed, re-rendered |
| slide-03 | Emphasis rendered as a three-line block with a one-word orphan (`shift` alone on line 2), and the right column ran within ~15pt of the footer rule | Major | Columns rebalanced 315/244 → 300/259; two list rows reworded to fit the narrower left column; row padding 8→6pt | fixed, re-rendered |
| slide-01 | ~60pt of dead sand between the ring and its caption, and the ring floated small in its column | Minor | The `<svg>` box was 168pt around a 132pt ring, and `svg` is inline-level so a baseline gap sat under it. Tightened the viewBox to `14 14 140 140`, set `display:block`, caption margin 12→10pt | fixed, re-rendered |
| slide-04 | Connectors were centred on the node box, so each arrow floated in the empty band between the step badge and the label it connects | Minor | `.conn` aligned to the label line (`align-items:flex-end; padding-bottom:11pt`) | fixed, re-rendered |
| slide-04 | Densest sheet in the deck; four modules against the style's 2–4 and ">50% empty" | Minor | Accepted | tracked in design-debt.md #5 |
| all | Terracotta 12pt labels measure ~3.3:1 on sand | Note | Kept per style spec | tracked in design-debt.md #1 |
| slide-01 | 5 `sibling-overlap` warnings from the ring's own arc and markers | Note | None | tracked in design-debt.md #4 |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: 0e3572f9ac6b7a80bd0b88c00c84dc608862428d37e1b19cfa8366755b22f369
- slide-02.html: 8db625564558ca08c85538b5c4067b89c8573ab25137e9a0b9b35b913cda104a
- slide-03.html: c673926a268db7d7a29720748595541f6223b15ad04a9f6b056d4a033423dc9d
- slide-04.html: fa475bd0c8bb656fc5d2e999f068096d02aac07ba1dcde5b5cfa352719c46408
- slide-05.html: 155f3e9857db346a65071533dfbc349cb4d9de413e62ba8f3afb214f7f1a6c10
