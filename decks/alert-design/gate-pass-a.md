# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/alert-design/gate-preview/slide-01.png, decks/alert-design/gate-preview/slide-02.png, decks/alert-design/gate-preview/slide-03.png, decks/alert-design/gate-preview/slide-04.png, decks/alert-design/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: cf1826362f615c0a3193b6e75e69acb4e06e9e3431c3bed1a194511c2cf95624, slide-02.html: b1b0ef05910d9f8c1446f79a0cc94b66b15c327dd5f4feec219ffc9a99b28f85, slide-03.html: dbfc49e741ae94c7781b4448f7900ba61963f8b7af7bd6ca5c08161233806a2e, slide-04.html: d9b9004edec059242c1d32c63d5b3de2c90259ac42daa93c6f143d668bb973c6, slide-05.html: 13254b2722a32d7c2d68bf9772405e88f537624060bdc77c414ab41e028a2b64
Unresolved Critical: 0
Blocking findings: None

Inputs reviewed: all five `slide-*.html` sources; the five 1920x1080 PNGs listed above, opened as
images; the contact sheet `decks/alert-design/contact-sheets/sheet-01.png` for cross-sheet
consistency; the green `slides-grab validate` summary (5 checked / 5 passed / 0 failed / 0 errors
/ 0 warnings); `slide-outline.md` with its two-axis budget and its recorded deviations; and the
assigned style contract from `slides-grab show-design ppt-monochrome-risk`, `## Avoid` included.

Mechanical audits run over the sources rather than eyeballed:
- `grep -o '#[0-9A-Fa-f]\{6\}'` across all five slides returns exactly five distinct values:
  `#0A0A0A` (38), `#FFFFFF` (19), `#3D3D3D` (11), `#767676` (5), `#E6E6E6` (1). All five are
  literal spec tokens. No sixth value exists anywhere in the deck.
- `grep -o 'font-size:[0-9.]*pt'` returns 10, 12, 14, 15, 16, 17, 22, 24, 40. Nothing under 10pt.
- `grep http` across the five slides returns nothing. Fonts resolve to `./assets/fonts/`.

## Checks
- [x] System consistency: PASS — Sheets 02–05 carry identical furniture: eyebrow label, one-line
  24pt title, one-line 14pt subline, a 4px black rule, then main, then a 2px rule and a 10pt
  footer caption. Because every title and subline is a single line (enforced with `white-space:
  nowrap` and written to the character budget in `slide-outline.md`), the 4px rule lands at the
  same y on all four — visible in `contact-sheets/sheet-01.png`, where the four rules line up
  across the row. Slide 01 is the cover and deliberately carries different furniture (eyebrow,
  rule, display headline, thesis block, rule, presenter). One typeface throughout, Arimo, in two
  weights, 400 and 700. Two background values, `#FFFFFF` and `#E6E6E6`; the black fills are the
  spec's declared emphasis-inversion, not a third background. Every sheet reuses one of the
  spec's own declared diagram patterns rather than inventing a layout: `diagram.comparison` on
  02, `diagram.process_flow` on 03, right-angle rows with 0.4in black number chips on 04 and 05.
- [x] Color discipline: PASS — The five values above and nothing else, all traceable to
  `show-design ppt-monochrome-risk`. **There is not one chromatic pixel in the deck.** This
  matters more here than in most styles: the Avoid list bans colour outright, red warning tones
  included, and requires emphasis to come from black-fill inversion and luminance. It does:
  the cover thesis block, slide 03's terminal bar, slide 04's row C and slide 05's rule block are
  all `#0A0A0A` fill with `#FFFFFF` text; slide 02's PAGE column is the same inversion, with its
  internal rules flipped to white so the column reads as one inverted object. `#E6E6E6` is used
  exactly once, as the de-emphasis strip carrying the "if no" branch inside each gate node on
  slide 03 — luminance de-emphasis, which is the spec's own mechanism. No harmony extension was
  needed and none was invented.
- [x] AI slop tropes: PASS — No gradient of any kind, including no `radial-gradient` pattern
  fill. No `border-radius` anywhere; every corner in the deck is 0px, as `slide-03.png` and
  `slide-04.png` show. No shadow. No rounded card with a left stripe used as a default container
  — slide 04's left bar is a full-height 2px column rule that every row carries, not a decoration
  on one row. No SVG illustration: the only SVG in the deck is the two 2pt right-angle connectors
  with sharp triangle heads on slide 03, which is the geometry `diagram.process_flow` specifies.
  No emoji, no icons, no clipart, no 3x2 icon grid. Arimo is the metric-compatible stand-in for
  the Helvetica Neue / Arial the spec names, so the generic-stack ban's style-specified exemption
  applies. The Avoid list's "no thin headlines" is met: every headline is weight 700. The "no
  dividing regions with whitespace alone" item was violated in the first render on two sheets and
  is now fixed — see the Findings table.
- [x] Content discipline: PASS — **There is no number in this deck at all.** No alert volume, no
  MTTA or MTTR, no page-per-shift count, no percentage, no vendor benchmark, no date, no chart,
  no stat strip, no fake canvas. The argument runs entirely on mechanism: a page interrupts a
  person; an interruption that buys nothing is a cost with no return; therefore urgency,
  actionability and human-necessity are the three things that can pay for it. Every sheet matches
  its entry in `slide-outline.md`, which records the absence of a chart and why. The footer
  caption states `NO CHART, NO EXTERNAL DATA` on every content sheet so the absence is declared
  rather than merely quiet. The presenter line is the literal placeholder `PRESENTER · TEAM` on
  both the cover and the closing footer; no name, team or date was invented.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-02 | First render: the 4px PAGE/TICKET divider was a `border-left` flush against the black fill and merged into it, so only one of the two dividers was visible | Minor | Both dividers promoted to standalone 4px flex items with 8pt of white either side | fixed |
| slide-04 | First render: verb column and body column were separated by whitespace only — the Avoid list requires thick rules, not whitespace, for region division | Minor | 2px vertical rule on every row, inverted to white on the black row so no row shifts | fixed |
| slide-05 | First render: the rule block and the question list were separated by whitespace only, same Avoid item | Minor | 2px rule added at the top of the question block | fixed |
| deck-wide | Arimo substitutes for Helvetica Neue | Note | Neither Helvetica Neue nor Arial is distributable or on npm; Arimo is metric-compatible with both, and is the same substitution `decks/mlops-platform` made. Arimo has no Black weight, so the display headline is 700, which satisfies the spec's "Bold or heavier" | tracked |
| deck-wide | Type sizes are not the spec's absolute points | Note | The spec targets 13.33in; this canvas is 10in, so its 17pt body / 12pt label / 10pt caption scale to 12.75 / 9 / 7.5pt, all under this repo's 14pt body and 10pt absolute floors. Body is 14pt, labels 10–12pt, captions 10pt | tracked |
| slide-03 | `diagram.render` says "SVG precise, no div blocks", but the gate nodes are HTML boxes | Note | This repo requires slide text in semantic tags so the PPTX text engine and screen readers can reach it. Nodes are drawn to the spec's geometry (0px radius, 2px `#0A0A0A` border, 22pt black chip); only the connectors are SVG | tracked |
| slide-03 | Three gates plus a terminal bar, not the spec's "4–5 horizontal steps" | Note | The argument has exactly three tests; a fourth would have to be invented. The full-width black bar is the fourth stage — the outcome | tracked |
| slide-01, slide-05 | Presenter reads `PRESENTER · TEAM` | Note | Intentional placeholder | tracked |
| all | 하단 여백을 26pt → 38pt로 올렸다. 파워포인트 text 엔진이 텍스트 상자를 아래 가장자리에서 0.5in(36pt) 이상 떼도록 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 렌더 재확인 결과 넘침·레이아웃 변화 없음 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
