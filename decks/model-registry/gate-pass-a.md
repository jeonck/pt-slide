# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/model-registry/gate-preview/slide-01.png, decks/model-registry/gate-preview/slide-02.png, decks/model-registry/gate-preview/slide-03.png, decks/model-registry/gate-preview/slide-04.png, decks/model-registry/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: ff29b895dbd07ae23e1f68ee468d223733cb9bf2b96b46f6ae256503618035ac, slide-02.html: 049b85e24694a3e230a065984d3a264da4d3047ed18f5dcca64d3b9922abbe64, slide-03.html: 44b5b05a6413b8379b1554b22f4a8c3722d0145064033cde78f790a436d2c5f6, slide-04.html: 569f2cee71e5ee242f3c40517ecb4ef9f585b4e33f68c64f3dad28f0950f5bd4, slide-05.html: e07b02caa5ddfb646bafddbb12a75c6e5765077c70deeb4c45a29ba5471332f4
Unresolved Critical: 0
Blocking findings: None

Inputs reviewed: all five `slide-*.html` sources, the five rendered PNGs above, the green `slides-grab validate` summary (5 checked / 5 passed / 0 errors / 0 warnings), `slide-outline.md` with its two-axis budget, and the approved style spec from `slides-grab show-design ppt-archival-index-deck`.

## Checks
- [x] System consistency: PASS — Every sheet carries the same catalogue furniture: a one-line title with `Fig. NN / 05` at the top right, a rule beneath, and the footnote at the foot. Because the titles are all one line, the rule lands at the same y across the five. One serif (Source Serif 4) for prose and one monospace (IBM Plex Mono) for index codes, values and captions — the spec calls that mix the signature, and it is applied consistently: no body copy is monospace, no index code is serif. Two surfaces, `#EFE9DD` canvas and `#F6F2E8` cells, exactly as specified.
- [x] Color discipline: PASS — bg `#EFE9DD`, surface `#F6F2E8`, ink `#33302A`, muted `#7A7468`, index `#5A5448`, border `#C9C0AC`, rule `#9A9180`. Nothing else. **This spec defines no accent colour at all**, and the deck has none: the only emphasis is the ink-brown solid fills — the table header rows and the left bar on the PRODUCTION row of slide-03.png. There is no coloured text anywhere.
- [x] AI slop tropes: PASS — Radius 0, no shadow, no gradient. **No arrow connectors anywhere**, which this spec explicitly forbids: the promotion sequence on slide 03 reads through monospace number continuity and rule lines instead, which is what the spec asks for. The deck contains no SVG, no icons, no emoji, no imagery. Source Serif 4 and IBM Plex Mono are the faces the spec names, so the generic-stack rule's style-specified exemption applies. The Avoid list also warns against leaving sheets empty; the four content sheets are ledgers and tables that fill the frame.
- [x] Content discipline: PASS — No figure is presented as measured. There is no chart, no count, no date. The spec makes a figure number and source footnote mandatory *for charts*; with no chart the footnote carries the sheet identity and states `NO CHART, NO EXTERNAL DATA` rather than naming a source that does not exist. Every slide matches its outline entry, and the presenter line is a marked placeholder.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| deck-wide | Type sizes are not the spec's absolute points (16pt body, 13pt index, 10pt caption on a 13.33in canvas) | Note | Scaled values land at 12pt / 9.75pt / 7.5pt, under the 14pt body and 10pt floors; body is 14pt, index 11pt, captions 10pt | tracked |
| deck-wide | The footnote carries sheet identity rather than a citation | Note | No chart and no data in the deck; the slot is kept because dropping it would break the signature | tracked |
| slide-01, slide-05 | Presenter reads `PRESENTER · TEAM` | Note | Intentional placeholder | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| slide-05 | 테두리·배경을 가진 `<ul>`/`<li>`를 `<div>`로 바꿨다. text 엔진은 텍스트 요소의 장식을 거부하고, 텍스트는 이미 `<p>` 안에 있다 | Note | 시맨틱 손실을 감수한 교환. 렌더 픽셀 차이 0 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
