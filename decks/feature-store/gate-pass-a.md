# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/feature-store/gate-preview/slide-01.png, decks/feature-store/gate-preview/slide-02.png, decks/feature-store/gate-preview/slide-03.png, decks/feature-store/gate-preview/slide-04.png, decks/feature-store/gate-preview/slide-05.png, decks/feature-store/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: a5b25f03d5ee7cb395c0c97c69d2b62d2395cf922a5cd0541ec936cec928ea40, slide-02.html: a121a7603dc1e4bbbbece52d8604ff0f0568af6aa70bfcdff53b1c33d30e4d53, slide-03.html: 6ad75c9bfc836dd017ace93ecb95e4bfde3435bc79e8d78a0c9eab09797b0c8a, slide-04.html: 7d1a138f0605c0acace558242be70514bd195d7fafffa661032f8b43a9f80128, slide-05.html: 35f57051b63a3cfeae66ead46b5b51a418bb8ef3fe063bc370187d8449fa43f2, slide-06.html: 892c331cf4076254e0a6ef2e9f7bf54dffb18b353489d456dc2452a503f62856
Unresolved Critical: 0
Blocking findings: None

Inputs reviewed: all six `slide-*.html` sources, the six rendered PNGs above, the green `slides-grab validate` summary (6 checked / 6 passed / 0 errors / 0 warnings), `slide-outline.md` with its two-axis budget, and the approved style spec from `slides-grab show-design ppt-mckinsey-ghost-deck`.

## Checks
- [x] System consistency: PASS — Every sheet carries the same band: a one-line action title, the kicker directly beneath it, and the footnote bottom-right. The band is a fixed 50pt, so the body starts at the same y on all six — verifiable across the contact sheet. One typeface, Inter, in four weights. The canvas is pure white on every sheet; the spec sets bg and surface to the same `#FFFFFF`, so depth comes from hairlines rather than fills, and that holds throughout. Everything is left-aligned; the spec forbids centring and nothing here is centred. Diagrams sit right with text left on slides 02 and 04, which is the asymmetry the spec asks for.
- [x] Color discipline: PASS — text `#1A1A1A`, body `#3D4350`, muted `#7A828F`, border `#C9CDD3`, accent `#1F3A5F`. Nothing else appears. The spec forbids emphasising with colour, so the accent is spent in exactly two roles: the number badges, which are its own diagram language, and **one** filled quadrant on slide-04.png. Every other emphasis in the deck is weight — the action titles at 600, the "you need it when" lines at 500. No coloured body text anywhere.
- [x] AI slop tropes: PASS — Radius 0 on every box, no shadow, no gradient. No emoji, icons or stock imagery: the only SVG is the chevron connector on slide 02, which is the spec's named connector shape. Inter is the typeface the spec names, so the generic-stack rule's style-specified exemption applies. No icon-plus-blurb grid; the cells carry sentences. The spec also forbids naming real consulting firms or copying their slides — the deck uses the generalised framework only and names no firm.
- [x] Content discipline: PASS — No figure is presented as measured. The 2×2 on slide 04 is deliberately a framework with **no plotted bubbles**: quadrant labels only, because any bubble position would be an invented data point, and `slide-outline.md` records that as the reason. The spec makes the footnote mandatory; with nothing to cite it carries the sheet identity and says `FRAMEWORK ONLY, NO EXTERNAL DATA` rather than naming a source that does not exist. Every slide matches its outline entry, and the presenter line is a marked placeholder.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | The cover's title band is the deck name rather than a declarative sentence | Note | Recorded in `slide-outline.md`; every other sheet obeys the rule, and a cover that argues before introducing itself reads wrong | tracked |
| deck-wide | Type sizes are not the spec's absolute points (18pt body, 10pt footnote on a 13.33in canvas) | Note | Scaled values fall under the 14pt body / 10pt floors; body is 14–15pt and the footnote 10pt | tracked |
| deck-wide | The footnote carries sheet identity rather than a citation | Note | No data in the deck; inventing a source would be worse than repurposing the slot | tracked |
| slide-01, slide-06 | Presenter reads `PRESENTER · TEAM` | Note | Intentional placeholder | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
| all | `<li>` 안에 블록 요소가 든 리스트를 `<div>`로 바꿨다. 엔진이 리스트 전체로 한 번, 안쪽 `<p>`로 또 한 번 텍스트 상자를 만들어 파워포인트에서 글자가 겹쳐 보였다 | Major | 실제 PPTX를 렌더해 발견. 태그 선택자는 클래스로 이전, 렌더 픽셀 차이 0 | fixed |
