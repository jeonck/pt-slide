# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/oncall-rotation/gate-preview/slide-01.png, decks/oncall-rotation/gate-preview/slide-02.png, decks/oncall-rotation/gate-preview/slide-03.png, decks/oncall-rotation/gate-preview/slide-04.png, decks/oncall-rotation/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 3b0e64f567b8c1fb2e6cc698ef5211439b25cf734db8a20537c34fc2960b9b83, slide-02.html: a4567b75a3366cc5c0499510e4a14c382b887cd911f024db82550a5a7ea15a10, slide-03.html: 2ab67912f6f4f7f88e9cb355b8af1a1908883cd560172d635ca741a8bc40131a, slide-04.html: 7f2a440efc936c70290a712512e38a8920317b350b3f769495113807acc58577, slide-05.html: e52393432c2314cdfe3e70cc9fb2421711a8807c0f6beee3d39bedc2d2962eb6
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
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
