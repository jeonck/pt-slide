# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/postmortem/gate-preview/slide-01.png, decks/postmortem/gate-preview/slide-02.png, decks/postmortem/gate-preview/slide-03.png, decks/postmortem/gate-preview/slide-04.png, decks/postmortem/gate-preview/slide-05.png, decks/postmortem/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 1778bbf5ae5f58f44b236463590762a74692b516c6df20f8cf85ca3540d05704, slide-02.html: 3ada86ed69100ce36c7badfc7f7a2c507fd3e7db8d3bde44c81d32bbd2903019, slide-03.html: a227a24b7b1945eb522a49fbaa1f8222f477bbcbf38cf1479ec6b70dce8f8357, slide-04.html: bc267124918985e34133e31278799a5d39a3827e2dae75b5ef8a4e5d49f2bb9a, slide-05.html: 0b3e190c271d1d1a6d6d22e8afbb310f89e26c8c55e0a7cd351315a8c10017f4, slide-06.html: 8123c6beb83dcbbd1c5dd6f73ff90eb84681db92644a8cf6b35165370854e3f3
Unresolved Critical: 0
Blocking findings: None

Method: the six slide sources were read in full, every declared `font-size`, `line-height`
and colour literal was enumerated with grep, and the rendered PNGs listed above were opened
individually to confirm that what the CSS declares is what the sheet shows.

## Checks
- [x] System consistency: PASS — One layout system across the deck: masthead kicker row, 2pt
  section rule, `main`, 0.5pt hairline, folio row, in that order on all six sheets, with
  `main{flex:1;min-height:0}` pinning the furniture to the same y everywhere (verified with
  getBoundingClientRect: `main` bottom is 346.1pt and the footer top 365.6pt on every sheet).
  One background (`#F4F1E8`) and no second surface — there is no filled panel anywhere, which
  is what the style's "구획은 룰 라인으로" clause asks for. Two serif families in fixed roles
  (Playfair Display for masthead/headline/subhead, Noto Serif for prose) plus Inter for meta
  type only; the three-family count is the contract's own, recorded in design-debt.md. One
  accent, used once per sheet. Column division varies 2 · 3 · 3 · 2 · 2 · 3 as the spec
  requires of a magazine, but the column mechanics (16pt gap, 0.5pt full-height rule as a grid
  item, kicker → subhead → prose) are identical everywhere.
- [x] Color discipline: PASS — grep over all six files returns exactly four hex literals and
  all four are spec tokens: `#F4F1E8` (bg), `#1C1B17` (text/border/rules), `#2E2C26`
  (text body), `#A8231B` (accent). No fifth colour, no harmonic extension was needed, no
  gradient, no fill. The accent appears as one kicker on slides 01–05 and as the 2pt closing
  rule on slide 06 — never as body text and never as a fill, per the Avoid list.
- [x] AI slop tropes: PASS — No gradient (grep for `gradient` returns nothing), no rounded
  corner (no `border-radius` anywhere), no shadow, no card container, no left stripe, no SVG
  illustration, no icon, no emoji, no 3×2 icon grid. The visual vocabulary is type, hairline
  rules and column measure only. The fonts are the ones the style names, embedded locally from
  `@fontsource/*`; there is no generic Inter/Roboto/Arial stack standing in for a decision —
  Inter appears because the contract assigns it to caption type, and only there.
- [x] Content discipline: PASS — There is no number in this deck. No percentage, count, rate,
  duration, benchmark or stat strip appears on any sheet, and there is no chart or fake chart
  (no `canvas`, no div-bar). Every claim is a mechanism the audience can check against their
  own last review. The style's mandatory source/dateline slot is used to say so rather than to
  carry a fabricated citation: the cover byline column reads "Source — none. No metric, rate or
  duration appears in this deck; the argument is mechanical," and every sheet's folio repeats
  it. The presenter is the placeholder "Presenter · Team"; no name or organisation is invented.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Masthead set at 64pt, above the 42pt the spec's display size scales to | Note | Accepted and recorded in design-debt.md — one word, the cover's only anchor, measured to fit the 656pt measure | tracked |
| all | Three type families where the Pass A heuristic prefers two | Note | Accepted — the style contract itself declares three and reserves the sans for meta type. Recorded in design-debt.md | tracked |
| all | Spec texture (paper grain 5%) not applied | Note | Accepted — the gradient-free implementation read as compression noise at 1080p. Recorded in design-debt.md | tracked |
| all | Spec's halftone photograph vocabulary unused | Note | Accepted — no photograph would be evidence for this argument; columns carry the sheets instead | tracked |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |
