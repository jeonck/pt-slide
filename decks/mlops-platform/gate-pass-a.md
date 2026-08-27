# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/mlops-platform/gate-preview/slide-01.png, decks/mlops-platform/gate-preview/slide-02.png, decks/mlops-platform/gate-preview/slide-03.png, decks/mlops-platform/gate-preview/slide-04.png, decks/mlops-platform/gate-preview/slide-05.png, decks/mlops-platform/gate-preview/slide-06.png, decks/mlops-platform/gate-preview/slide-07.png
Slide fingerprints: slide-01.html: 69b92ab4e2e9eb7ab4a04b3c9672efc1ed44cd3def92aab79cf9c1db32047be9, slide-02.html: 92b494cd1d48bdf7aff3a28c13659ca244d27f91347b19286d2b90c1df36a18a, slide-03.html: a6e09e2b9cea4746b74e83c9423f29db48c65e085e6c1080010c2b261619b713, slide-04.html: b495e9fa175e1a4aa14b078a6da951b685f028913a104b82fc65944faa907186, slide-05.html: cf23d716ff5c29de78935bb2d7ad394117f347e874a0be2d001161d9b3f00192, slide-06.html: 5fb9d2cacd598db9ff4ed95d5127847d47e29bce0f2f0d05eed0b1adcf26bcb7, slide-07.html: 6fa05318e73efbca35fc1d2c103cc3bd43ef35edb58094099e02b9017be5f241
Unresolved Critical: 0
Blocking findings: None

Inputs reviewed: all seven `slide-*.html` sources, the seven rendered PNGs above, the green `slides-grab validate` summary (7 checked / 7 passed / 0 errors / 0 warnings), `slide-outline.md` with its height budget, and the approved style spec from `slides-grab show-design ppt-consulting-precision-grid`.

## Checks
- [x] System consistency: PASS — Every sheet carries the same three pieces of furniture in the same place: a kicker plus a one-line action title, a 1px `#D1D5DB` rule beneath it, and the source caption bottom-right. The header band is a fixed 54pt, so the rule lands at an identical y on all seven — visible across the contact sheet, and the reason four action titles were shortened until they fit one line. Two backgrounds only: white and the `#F4F5F7` surface used for table headers and the active phase. One typeface, Arimo, in two weights. Body is left-aligned everywhere; the spec explicitly forbids centring and nothing here is centred.
- [x] Color discipline: PASS — bg `#FFFFFF`, surface `#F4F5F7`, text `#1A1A1A`, muted `#6B7280`, border `#D1D5DB`, accent `#0B5FFF`. Nothing else. The spec allows exactly one accent and forbids it on text, so the accent appears in precisely two places in the whole deck: the 4px rule on the cover and the 4px left border on the active phase in slide-04.png. Every numeral, code and label is grey — no coloured type anywhere.
- [x] AI slop tropes: PASS — Radius 0 on every box, no shadow, no gradient, as the Avoid list demands. No emoji, no icons, no decorative shapes: the deck contains no imagery at all, and its only SVG is the two straight connectors on slide-04 with 4px triangle heads, which is the spec's own diagram language. Arimo is a metric-compatible stand-in for the Arial the spec names — the framework's generic-stack rule exempts the style-specified typeface, and Arial cannot be embedded. No icon-plus-blurb grid: the cells are numbered hairline boxes carrying sentences.
- [x] Content discipline: PASS — No figure is presented as measured. There is no adoption rate, cycle-time gain or cost number anywhere, and slide-04 states outright that phases are gates rather than quarters because no dates can be sourced. The style makes a source caption mandatory; with no data to cite, the caption carries the sheet identity and says `NO EXTERNAL DATA CITED` rather than naming a source that does not exist. Every slide matches its outline entry. The presenter line is a marked placeholder.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| deck-wide | Arimo substitutes for the spec's Arial | Note | Metric-compatible and open; Arial cannot be embedded, and the spec's own fallback chain expects an Arial-metric face | tracked |
| deck-wide | Type sizes are not the spec's absolute points (16pt body, 9pt caption on a 13.33in canvas) | Note | Recorded in `slide-outline.md`; scaled values would fall under the 14pt body / 10pt floors, so body is 14pt and caption 10pt | tracked |
| deck-wide | The source caption carries sheet identity rather than a citation | Note | The deck presents no data. Dropping the caption would break the signature; inventing a source would be worse | tracked |
| slide-01, slide-07 | Presenter reads `PRESENTER · TEAM` | Note | Intentional placeholder | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
