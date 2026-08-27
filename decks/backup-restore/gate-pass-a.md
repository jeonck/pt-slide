# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/backup-restore/gate-preview/slide-01.png, decks/backup-restore/gate-preview/slide-02.png, decks/backup-restore/gate-preview/slide-03.png, decks/backup-restore/gate-preview/slide-04.png, decks/backup-restore/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 70d34f13367d146479831384502a10defa38da8835effa5b3175446f767c62ca, slide-02.html: 5b24d4ceb2d22f40920eeb6805d455571bb55e980b9de0632bf595f5c6a53e7e, slide-03.html: fbc0bc60e5449f4ab4ffcf190d3b1cca233c9d271261d56376792e1f1c1efdf7, slide-04.html: af28097042a6bd1547a08f52a270e2fc0de12fe834f929281c637bf5bc75a49e, slide-05.html: 322f41f14b7769047fd002f50b4bd6fd5b28f6b3998f3b818922132d47dd090c
Unresolved Critical: 0
Blocking findings: None

## Checks

- [x] System consistency: PASS — Every sheet is the same frame: `body` padding 32/62/26pt, a
  centred header of kicker → 26pt Playfair title → 34pt gold rule, and the fixed bottom-right
  italic source caption. Verified by reading the five files: the `<style>` block is byte-identical
  across all five, and `grep` confirms one `background:#EDE6D6` and one `color:#3A2E1F` per file.
  Backgrounds: 2 (`#EDE6D6` bg, `#F4EFE3` surface — surface appears only on slide-04's step IV).
  Faces: 2 (Playfair Display for h1/h2/h3 and the step numerals; EB Garamond for everything else).
  Accent: 1 (`#A8893E`), and it appears only as a 1px rule, a 1px node/badge border, an arrowhead
  stroke and a 5pt lozenge — never as a fill of any size. Layout patterns are declared in
  `slide-outline.md` and reused: header block on 02–05, centre-axis stack on 01, and the three
  body treatments are the spec's own `diagram.matrix` (02), `diagram.comparison` (03) and
  `diagram.process` (04).

- [x] Color discipline: PASS — Enumerated every colour literal in the five files:
  `#EDE6D6`, `#F4EFE3`, `#3A2E1F`, `#A8893E`, `#6B5D46`, plus `transparent`. The first four are
  spec tokens verbatim from `slides-grab show-design ppt-heritage-luxury-deck`. `#6B5D46` is the
  one documented harmonic extension, sitting between the spec's `text` and `text-muted` on the
  same hue, added because the spec's `#8A7C63` measures 3.28:1 on the background and fails the
  4:1 the skill sets for secondary text; recorded in `slide-outline.md` and `design-debt.md` with
  the measured ratios. No untracked colour exists. No gradient of any kind: `grep -c gradient`
  over the deck returns 0, and there is no `radial-gradient` pattern tile either. No shadow:
  `grep -c box-shadow` returns 0. `border-radius` appears exactly four times, all on the 22pt
  step badges the spec defines as circles; every panel corner is 0.

- [x] AI slop tropes: PASS — No full-bleed gradient (no gradient at all). No rounded card with a
  left stripe used as a default container; the only bordered containers are slide-04's four
  process nodes, which are the spec's `diagram.node` (square, hairline, no stripe). No SVG
  illustration — the single inline SVG per connector is a 16pt line plus a chevron, three of them
  on one sheet, and they carry no text. No generic font stack: the two faces are the ones the
  style names, embedded locally from `@fontsource`, with only `Georgia, serif` behind them as a
  fallback. Assets are all local and self-contained: `grep -o 'https\?:' slide-0*.html` returns
  nothing across the five files — the SVG connectors' `xmlns` attribute was stripped, since the
  HTML parser puts inline `<svg>` in the SVG namespace on its own and the attribute was the only
  `http:` left in the deck. The arrowheads were re-rendered and confirmed still drawn. No emoji: the source files contain no literal non-ASCII byte in any rendered text node (checked by stripping tags and scanning for codepoints > 127 — the set is empty); the only non-ASCII glyphs that reach the screen are `·`, `—` and `’`, written as HTML entities.
  No 3×2 icon-and-caption grid; slide-02 is a 2×2 hairline cross with no icons.

- [x] Content discipline: PASS — This is the deck's central constraint and it was checked
  literally: `grep -nE '[0-9]' slide-0*.html` returns only CSS values, the `©`-free font
  filenames, and the Roman numerals I–IV. **There is not one Arabic numeral in any rendered
  string in the deck** — no hours, no percentages, no durations, no counts, no dates. No chart,
  no canvas, no stat strip, nothing shaped like data. RPO and RTO are named four times and are
  always described as a commitment the audience sets; the fixed source caption states this on
  every sheet. The presenter line is the placeholder `PRESENTER · TEAM`; no name is invented.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Cover's second rule is 200pt, not the 34pt kicker rule | Note | None — different role, both widths present with distinct jobs | tracked in design-debt.md |
| slide-04 | Step badge is a 22pt circle vs the spec's 0.36in (~19pt), numeral 12pt vs 16pt | Note | None — 19pt/16pt clips the numeral | tracked in design-debt.md |
| slide-05 | Gold lozenge separator extends the spec's `gold ◆` out of its comparison-diagram context | Note | None — reusing the 34pt hairline made header and item rules indistinguishable | tracked in design-debt.md |
| all | Source caption carries a statement of fact, not a citation | Note | None — the deck asserts no figures; an invented source would be worse | tracked in slide-outline.md |
| all | `#6B5D46` is not a spec token | Note | Documented harmonic extension with measured contrast | tracked in design-debt.md |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| slide-02/04 | 테두리를 가진 `<li>`·`<p>`의 장식을 안쪽 래퍼 `<div>`로 옮겼다. text 엔진은 텍스트 요소의 border/background를 거부한다 | Note | 바깥(flex·크기)/안쪽(장식) 속성을 나눠 옮김. 렌더 픽셀 차이 0 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
