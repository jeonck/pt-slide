# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/postmortem/gate-preview/slide-01.png, decks/postmortem/gate-preview/slide-02.png, decks/postmortem/gate-preview/slide-03.png, decks/postmortem/gate-preview/slide-04.png, decks/postmortem/gate-preview/slide-05.png, decks/postmortem/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: ebd15887af1420a53c07911945887c56225b4076cfc4bb40e4fd2c6e8bb738a2, slide-02.html: dcb79120c3ed60b889a9d611a4797e5b9f1eed7326a8d917f97b70b216d12531, slide-03.html: 0421f1a9746ff9dd5346e117be6533b3a7a83a03239a78f32bdf903b2411160d, slide-04.html: d623206ee341605cabb7c03917f712919cf17105bbd22864e5223aee6ec2711a, slide-05.html: c87c401e6d007dd62767cb4c71ce025de394d1f6624dd643d22a7d6b44a84885, slide-06.html: 1330949d8fc0c2261743c239fb9f846a9dea1cdb2f40bde85c3b903ba607eaa5
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
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
| all | `<li>` 안에 블록 요소가 든 리스트를 `<div>`로 바꿨다. 엔진이 리스트 전체로 한 번, 안쪽 `<p>`로 또 한 번 텍스트 상자를 만들어 파워포인트에서 글자가 겹쳐 보였다 | Major | 실제 PPTX를 렌더해 발견. 태그 선택자는 클래스로 이전, 렌더 픽셀 차이 0 | fixed |
