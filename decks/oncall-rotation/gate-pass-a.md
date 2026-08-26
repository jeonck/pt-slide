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
