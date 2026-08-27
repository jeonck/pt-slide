# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-27T16:15:45.978Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/staging-parity/gate-preview/slide-01.png, decks/staging-parity/gate-preview/slide-02.png, decks/staging-parity/gate-preview/slide-03.png, decks/staging-parity/gate-preview/slide-04.png, decks/staging-parity/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 1a669faaecdf1cdcf73eefc1622d2827d2cbddc94e1437af209c44a34de65351, slide-02.html: 30ad9b342126e3656fdcfbb510b3254c0b66a9f42287768fd242e8d8d35c19e9, slide-03.html: beb508e588c8c3cb12e95a7243c3f6d0aeba0440ba396a30cc23b8c522d49583, slide-04.html: 3dfc91bea4ea6bccdfe3cc3784570f7e73611048654540116d6e54e9c52db33b, slide-05.html: 7a0d5749abee3fcbf3241df09ec6ef6da7fb82bdb494c9bd93d90c20402f9a65
Unresolved Critical: 0
Blocking findings: None

Style contract: `ppt-engineered-dark-deck`, read from `npx slides-grab show-design` and
reproduced in `slide-outline.md` under "contract". Method: read all five slide sources, then
grepped the full colour, font-size and line-height inventory out of them (below) rather than
judging by eye.

## Checks

- [x] System consistency: PASS — one layout skeleton is declared once and reused on all five
  sheets: `body{padding:32pt 40pt; flex column}` → kicker row (kicker left, mono counter
  right) → `h2` → `main{flex:1; min-height:0; margin-top:18pt}` → `footer` source caption.
  Because header and footer are siblings of a `flex:1` main, the caption lands at the same y
  on every sheet; measured in the browser, `footer` top is **y=359pt on all five**. Two
  backgrounds only (`#0E0E11` bg, and no filled surfaces at all — every box is an unfilled
  1px hairline frame, which is the style's stated card treatment). Two faces only: Inter and
  JetBrains Mono. One accent: `#8B7BF0`. Sheet-specific CSS is additive to the shared block,
  never a redefinition of it.
- [x] Color discipline: PASS — the complete colour inventory across all five files is
  `#0E0E11` (bg), `#F4F4F5` (text strong), `#9CA3AF` (text), `#6B7280` (text muted),
  `#26262C` (border), `#2E2E36` (surface bar), `#8B7BF0` (accent), which is also the corner
  wash — the wash is the accent token at `fill-opacity: 0.10`, carried in a base64 data-URI
  SVG so it is a background rather than a sibling element. Every one is a
  token from the style spec; nothing else appears. `#2E2E36` is the spec's `surface bar`
  token used as an in-card divider because the `#26262C` border token was invisible inside a
  `#26262C`-framed card; recorded in `design-debt.md` §5. The wash alpha is recorded in
  `design-debt.md` §1. `#3FB8C4` is deliberately unused: `grep` finds five hits and all five are
  inside the CSS comment quoting the spec's glow definition, never in a property value.
- [x] AI slop tropes: PASS — no gradient of any kind. `grep -c "gradient"` returns 1 per file, and all
  five hits are the word inside the CSS comment that explains why there is no gradient — no
  `linear-gradient`/`radial-gradient`/`conic-gradient` function appears anywhere
  (`grep -c "\-gradient("` = 0 in all five). The style's radial glow is rendered as a
  flat-alpha fill, per the skill's rule for gradient-specifying specs. No shadow (`box-shadow` absent; the spec sets
  `shadow: none`). No SVG illustration — the only SVG is two 35×10 connector arrows on
  slide 02, which is the style's declared diagram connector. No emoji, no icon font, no stock
  icon. No generic font stack: Inter and JetBrains Mono are the faces this style names, both
  embedded locally. No 3×2 icon grid. The rounded card with a left stripe appears exactly
  twice, on the two closing strips, where the spec's own vocabulary assigns it meaning ("one
  highlight border `#8B7BF0`"); it is not the deck's default container — the default is an
  unfilled hairline box with no stripe.
- [x] Content discipline: PASS — there is no number anywhere in this deck other than the
  slide counters and the `01`–`04` step/index numerals. No percentage, no duration, no cost,
  no benchmark, no chart, no KPI tile, no stat strip. `grep -E "[0-9]+%|[0-9]+x|\\$"` returns
  nothing. The reasoning is recorded in `slide-outline.md` under "no figures, and why", and
  the style's mandatory bottom-right `source_caption` slot carries that disclosure verbatim on
  all five sheets instead of a citation. The presenter line is the placeholder
  `Presenter · Team`; no name, team or company is invented.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| all | Style's radial glow rendered as a flat fill; repo forbids gradients | Note | First stop used as flat fill, disc centre moved off-canvas so it reads as a corner wash rather than an object | fixed, logged in design-debt.md §1 |
| all | Type scale not uniformly scaled 0.75 to the canvas | Note | Body/caption/mono held at or above spec size so nothing falls under the 14pt body / 10pt absolute floors | accepted, logged §2 |
| slide-02 | Spec marks the active node with a 1.5px border; siblings would misalign by the delta | Note | All nodes keep 1px; the active node changes `border-color` only | accepted, logged §3 |
| slide-04 | Spec's comparison pattern marks a recommended column; none is marked | Note | Deliberate — slide 05 asks the room to choose | accepted, logged §4 |
| slide-04 | `#26262C` divider inside a `#26262C`-framed card rendered as absent | Minor | Moved to the spec's `surface bar` token `#2E2E36` | fixed, logged §5 |
| all | `accent teal #3FB8C4` unused | Note | Spec permits it for chart series only; there are no charts | accepted, logged §6 |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/staging-parity/gate-preview/slide-01.png, decks/staging-parity/gate-preview/slide-02.png, decks/staging-parity/gate-preview/slide-03.png, decks/staging-parity/gate-preview/slide-04.png, decks/staging-parity/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 1a669faaecdf1cdcf73eefc1622d2827d2cbddc94e1437af209c44a34de65351, slide-02.html: 30ad9b342126e3656fdcfbb510b3254c0b66a9f42287768fd242e8d8d35c19e9, slide-03.html: beb508e588c8c3cb12e95a7243c3f6d0aeba0440ba396a30cc23b8c522d49583, slide-04.html: 3dfc91bea4ea6bccdfe3cc3784570f7e73611048654540116d6e54e9c52db33b, slide-05.html: 7a0d5749abee3fcbf3241df09ec6ef6da7fb82bdb494c9bd93d90c20402f9a65
Unresolved Critical: 0
Blocking findings: None

## Method

All five PNGs were rendered at 1920×1080 and opened individually as images — not skimmed as a
contact sheet — in two rounds. The first round found three render-only defects that `validate`
had reported clean (below); they were fixed, the deck re-validated, re-rendered, and all five
were opened again. Geometry claims that the eye cannot settle (child-overflows-parent, wrapped
line counts, footer y-position) were measured in the browser with a Playwright probe rather
than estimated, and that probe reported `no child overflow` on all five sheets and
`footer top y=359pt` on all five. Confidence is High because every sheet was viewed at full
size after the final edit, and the fingerprints above are the files that produced those PNGs.

## Checks

- [x] Composition & hierarchy: PASS — one job per sheet, one anchor each. **01**: the 44pt
  `Why staging lies` is the only large element on the canvas, with a 44pt accent rule above
  it; nothing competes. **02**: three-node process reading left to right with accent arrows,
  the third node ringed in accent because that is where the error enters, closed by a
  full-width strip carrying the thesis sentence. **03**: 2×2 of four equal cards — no card is
  emphasised, because the argument is that all four are the same failure. **04**: two columns
  of identical weight with an accent strip beneath, which is the anchor. **05**: three
  numbered questions on a mono rail with the closing line in an accent-bordered strip at the
  bottom; verified in the PNG that the strip is the last thing the eye lands on.
- [x] Typography & legibility: PASS — smallest type in the deck is the 10pt source caption,
  which is the absolute floor and is the style's own caption size; body copy runs 14–17pt.
  No `line-height` below 1.2 anywhere in the deck and none at 1 (inventory: 1.2, 1.25, 1.3,
  1.35, 1.4, 1.45, 1.5). Checked in the PNGs specifically for the failure this repo has hit
  before: no descender is clipped on the 44pt cover title, and the `01`–`04` mono numerals
  are fully formed. Contrast at presentation distance: `#F4F4F5` and `#9CA3AF` on `#0E0E11`
  both read easily in the renders, including where the corner wash lightens the ground; the
  one ink that would not (`#6B7280`) is kept out of the washed corner by placement.
- [x] Korean/CJK word-break integrity: PASS — vacuously, and checked rather than assumed:
  there is no Hangul or CJK character in any of the five slides, so `word-break: keep-all` is
  deliberately not set and neither Layer 1 (words split mid-어절) nor Layer 2 (ragged
  keep-all side effects) can occur. The English equivalent was checked in its place: every
  line that must not wrap was measured before writing and confirmed one line in the render,
  and the one instance of a runt line — two single-word orphans on slide 04 — was found in
  the first render pass and fixed. See findings.
- [x] Review Litmus: PASS — the point of each sheet lands inside 3–5 seconds: 02 "the test
  measured the model", 03 "here are the four differences", 04 "two options, pick one",
  05 "these are the three questions". Strip the hairlines and the accent and the argument
  still stands, which is the test for whether the decoration is carrying the content. Nothing
  is on a sheet twice; the longest single block in the deck is two lines.

## Findings

All three render-only defects below passed `validate` cleanly before they were found by eye.

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| all | The flat corner wash rendered as a hard-edged circular object — a "planet" sitting on the canvas, with its full arc visible inside the frame. The style's Avoid list forbids the glow from becoming a shape. Most obvious on 01 and 05; on 03 and 04 the arc cut across a card and dimmed its border | Major | Moved the disc centre off-canvas past the top-right corner (`background-position: right -170pt top -230pt`, size 460pt) so only a shallow arc is cropped in by two frame edges, and lowered alpha 0.12 → 0.10. Re-rendered and re-checked: reads as a corner wash | fixed |
| slide-04 | Both price lines wrapped to two lines with a single-word runt on the second (`staffed.` / `yet.`), in two side-by-side columns where the runts sat next to each other | Minor | Shortened both to one measured line (`Price: a second production, fully staffed.` / `Price: production tooling we do not have.`); browser probe confirms 1L each | fixed |
| slide-04 | The in-card hairline divider was invisible in the render — 1px `#26262C` inside a card already framed in `#26262C` | Minor | Moved to the spec's `surface bar` token `#2E2E36`; visible and aligned across both columns in the re-render | fixed |
| slide-02 | Node 03's body was 2 lines against 3 in its siblings, leaving that card visibly emptier | Minor | Rewrote to `We report the result as if it were a fact about production.` — 3 lines, and a truer sentence | fixed |
| slide-05 | The third decision's note nearly abutted the closing strip while the gaps between decisions were much larger | Minor | Strip `margin-top` 12pt → 20pt; rhythm is even in the re-render | fixed |
| all | A flat fill has a visible edge where a gradient would not; on the sparsest sheets (01, 05) the wash arc is discernible | Note | Accepted — the alternatives are a forbidden gradient or no style signature at all | design-debt.md §1 |
| slide-03 | Cards carry roughly a line and a half of empty space below the body text | Note | Accepted — the style's declared mood is "airy", and the alternative is inventing copy to fill boxes | tracked |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: 1a669faaecdf1cdcf73eefc1622d2827d2cbddc94e1437af209c44a34de65351
- slide-02.html: 30ad9b342126e3656fdcfbb510b3254c0b66a9f42287768fd242e8d8d35c19e9
- slide-03.html: beb508e588c8c3cb12e95a7243c3f6d0aeba0440ba396a30cc23b8c522d49583
- slide-04.html: 3dfc91bea4ea6bccdfe3cc3784570f7e73611048654540116d6e54e9c52db33b
- slide-05.html: 7a0d5749abee3fcbf3241df09ec6ef6da7fb82bdb494c9bd93d90c20402f9a65
