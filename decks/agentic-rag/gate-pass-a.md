# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/agentic-rag/gate-preview/slide-01.png, decks/agentic-rag/gate-preview/slide-02.png, decks/agentic-rag/gate-preview/slide-03.png, decks/agentic-rag/gate-preview/slide-04.png, decks/agentic-rag/gate-preview/slide-05.png, decks/agentic-rag/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 51b10785ee19952a28ad3eedc8cf2ed52771c2c280ae0b7b0c5591f4234e171e, slide-02.html: a009a097a84dd000c89ae1fb9719b07a1d33c894f0a779f35e24e3ae045e8d7b, slide-03.html: 76424aef99358362dbf97ee55b5afb23951ea1abb72814bb9599224614f220bf, slide-04.html: e3828a6ca8513eb99e92b3a405be32a127ebc99616a4a85e7ada89e260320e25, slide-05.html: b79b1747f485a24701fefdeb7f0380ffb1cad4f70298b4b93e3c8e0125e88ae2, slide-06.html: 19e06ff5b55d6599ad034021e6e56af0666b65111cf7367aa51e69630c968190
Unresolved Critical: 0
Blocking findings: None

Inputs reviewed: all six `slide-*.html` sources, the six rendered PNGs above, the green `slides-grab validate` summary (6 checked / 6 passed / 0 errors / 1 warning), `slide-outline.md`, and the approved style spec from `slides-grab show-design ppt-blueprint-schematic-deck`.

## Checks
- [x] System consistency: PASS — Every sheet carries the same furniture in the same place: full-bleed dot grid at a 24pt pitch, a 0.75pt cyan drawing frame inset 12pt with corner crop marks, and the title block bottom-right holding slide number, sheet title and `SHEET NN/06`. The style's spec names the exposed dot grid as the deck's identity and requires the title block per sheet; both hold on all six, cover and closing included. Two background values only — bg and surface are the same `#0E1B3D` in this spec, so depth comes from line weight, exactly as the signature describes. Two typefaces: Inter for prose, JetBrains Mono for every numeral, code and dimension label. One accent, cyan `#4FC8E8`.
- [x] Color discipline: PASS — Every value is from the spec: bg `#0E1B3D`, text `#E8EEF7`, muted `#8FA3C8`, accent/line/border `#4FC8E8`, grid `#2A4A8C`, hatch `#3A5DA0`. The one derived value is the emphasis fill `rgba(79,200,232,0.12)`, which is the accent at the 12% opacity the spec itself specifies for an active node. No other hue appears anywhere in the six files.
- [x] AI slop tropes: PASS — No gradients: the dot grid and frame are data-URI SVG backgrounds rather than the usual `radial-gradient` dot-grid idiom, precisely because the style's Avoid list forbids gradients. No rounded corners, no shadows. Shapes are unfilled 0.75pt cyan outlines, with exactly one filled element in the deck (the CRITIQUE node on slide-03) — the spec allows one emphasis fill. Fonts are Inter and JetBrains Mono, both named by the spec and embedded locally; Inter appears on the framework's generic-stack list but the gate's own wording exempts "the style-specified typeface", which this is. No emoji, no stock icons, no icon-plus-blurb grid. The only SVG is connector geometry — lines and arrowheads, no drawn imagery, no text.
- [x] Content discipline: PASS — No figure in this deck is presented as measured. There is no benchmark, no latency number, no accuracy claim; slide-05 deliberately says latency "becomes a distribution" rather than quoting one, and `slide-outline.md` records that choice as the reason there is no chart. Every slide matches its outline entry. The presenter line is a marked placeholder rather than an invented name.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| deck-wide | Type sizes are not the spec's absolute points — the spec targets a 13.33in canvas, this deck is 10in | Note | Recorded in `slide-outline.md`; body sits at 14–15pt to clear the framework's floor rather than at a literal 0.75× scale | tracked |
| deck-wide | Body weight is 400 where the spec says 300 | Note | Inter 300 at 14pt on this background is too thin to pass legibility; display type keeps 300 | tracked |
| slide-01, slide-06 | Presenter reads `PRESENTER · TEAM` | Note | Intentional placeholder; hand off to the user | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<li>` 안에 블록 요소가 든 리스트를 `<div>`로 바꿨다. 엔진이 리스트 전체로 한 번, 안쪽 `<p>`로 또 한 번 텍스트 상자를 만들어 파워포인트에서 글자가 겹쳐 보였다 | Major | 실제 PPTX를 렌더해 발견. 태그 선택자는 클래스로 이전, 렌더 픽셀 차이 0 | fixed |
