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
