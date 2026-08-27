# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-27T15:09:05.944Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/model-registry/gate-preview/slide-01.png, decks/model-registry/gate-preview/slide-02.png, decks/model-registry/gate-preview/slide-03.png, decks/model-registry/gate-preview/slide-04.png, decks/model-registry/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: e97cef945c3b055d8930bd1a2b581ef269f212e48d5ffc2cc187371bb9adffaf, slide-02.html: b13f4051a8c50b4398570c8e6cbd0479c9a836f3895e440d86de2555cbe16916, slide-03.html: 5cff7e6afa504765363fff8464b42c1c8502febee097b51af2f66e1bc5d081b6, slide-04.html: fa7ca2407271418e6e91e57036e6b2910de49606e4cf455d1f082986d982fdf5, slide-05.html: c5d32da2ce74eb03008700f527f791a1ce1e4369a85f67d27a8857c6bc8d0ea4
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

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/model-registry/gate-preview/slide-01.png, decks/model-registry/gate-preview/slide-02.png, decks/model-registry/gate-preview/slide-03.png, decks/model-registry/gate-preview/slide-04.png, decks/model-registry/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: e97cef945c3b055d8930bd1a2b581ef269f212e48d5ffc2cc187371bb9adffaf, slide-02.html: b13f4051a8c50b4398570c8e6cbd0479c9a836f3895e440d86de2555cbe16916, slide-03.html: 5cff7e6afa504765363fff8464b42c1c8502febee097b51af2f66e1bc5d081b6, slide-04.html: fa7ca2407271418e6e91e57036e6b2910de49606e4cf455d1f082986d982fdf5, slide-05.html: c5d32da2ce74eb03008700f527f791a1ce1e4369a85f67d27a8857c6bc8d0ea4
Unresolved Critical: 0
Blocking findings: None

Method: all five rendered PNGs were opened as images — the full set on a contact sheet built from this render, and slide 03 at full size after its emphasis row was realigned. Five sheets is small enough that the contact sheet shows each at a readable size.

## Checks
- [x] Composition & hierarchy: PASS — Each sheet is one table or ledger and nothing else, which is the right shape for an operating guide: the reader is being handed a record. slide-02.png and slide-04.png are four-row catalogues with an ink header; slide-03.png is the promotion ledger with the PRODUCTION row bearing the deck's only emphasis bar; slide-05.png is the same ruled grid carrying three questions. The cover states the thesis and then a ledger meta row, so even it reads as a catalogue card. Nothing decorative appears anywhere.
- [x] Typography & legibility: PASS — One scale: title 20pt/600 serif, cover thesis 19pt, discussion prompt 17pt, cell heading 15pt/600, body 14pt, index code and Fig. marker 11pt mono, small-caps header and footnote 10pt. **Nothing below 10pt, no body copy below 14pt.** Ink `#33302A` on paper beige is high contrast; muted `#7A7468` is reserved for the "who writes it" and "what breaks" columns, where it correctly reads as secondary. The inverse beige-on-ink header rows are legible at size.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — no Hangul or CJK in this deck. English wrapping was checked instead: the cover thesis breaks at the intended clause via an explicit `<br>`, table cells wrap to at most two lines with no stray one-word tail, and the titles do not wrap at all — each was written to the ≤50-character budget and the longest is 43.
- [x] Review Litmus: PASS — Three to five seconds per sheet, because each is a table whose column heads say what the reader is looking at. One idea each. There is no chrome to strip: rule lines and index numbers *are* the design. Nothing is removable — each rule is paired with what breaks without it, and dropping that column would leave four assertions with no argument.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-03 | The emphasis bar initially shifted its row 9pt right and broke the index column alignment | Note | Fixed before this report — every row now carries the same border width and only its colour changes | tracked |
| slide-04 | The RULE column wraps to two lines on three of four rows | Minor | Accepted — this style is explicitly dense, and the rows are equal height so the wrap does not disturb the grid | tracked |
| slide-01 | The cover's middle band is open compared with the content sheets | Note | Intentional; the ledger meta row anchors the foot and the sheet still reads as a catalogue card | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: e97cef945c3b055d8930bd1a2b581ef269f212e48d5ffc2cc187371bb9adffaf
- slide-02.html: b13f4051a8c50b4398570c8e6cbd0479c9a836f3895e440d86de2555cbe16916
- slide-03.html: 5cff7e6afa504765363fff8464b42c1c8502febee097b51af2f66e1bc5d081b6
- slide-04.html: fa7ca2407271418e6e91e57036e6b2910de49606e4cf455d1f082986d982fdf5
- slide-05.html: c5d32da2ce74eb03008700f527f791a1ce1e4369a85f67d27a8857c6bc8d0ea4
