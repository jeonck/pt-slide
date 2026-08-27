# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/ci-pipeline/gate-preview/slide-01.png, decks/ci-pipeline/gate-preview/slide-02.png, decks/ci-pipeline/gate-preview/slide-03.png, decks/ci-pipeline/gate-preview/slide-04.png, decks/ci-pipeline/gate-preview/slide-05.png, decks/ci-pipeline/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: dfc092ce588eb59f7c4b375b9f35d259b1ea8fc8df977d764481342ce4ffdbed, slide-02.html: 9f39c4f0ed96720d94d2a37d1af3115d691dc1ba2f2cc72db0304723d2fa9bef, slide-03.html: 8a618c600e55a4944bf482a1b50519cb9450ed279fa9d1bab014d68d3d54793b, slide-04.html: bc8740c114e8665f4391b9bc65a2175b204b72307ed627f0976897c274c3d489, slide-05.html: 7efa70675f0ccbdf2de5b135e9bc4843ab171531ce7a5a9046b351bf2b42ce3a, slide-06.html: 6ac2ba16392fc353b1234ffb80fcaff69f5b3defdd8e2ad69d024c63eb6b6fe3
Unresolved Critical: 0
Blocking findings: None

## Method

All six PNGs were rendered at 1920×1080 and **opened individually as images** — not skimmed on a
contact sheet — across three render passes: an initial pass, a pass after the first round of
fixes, and a final pass on the fingerprints above. Sheets 01, 02, 03, 05 and 06 were re-opened
full-size after their last edit; sheet 04 was unchanged after its first inspection and its
column geometry was re-checked by measuring the live DOM instead. Two claims that the eye got
wrong were settled by measurement rather than by looking harder: slide-04's two columns looked
unequal in the PNG and are in fact both 255.3pt, and slide-05's four badges were confirmed to
share a single top edge (146.1pt) rather than merely looking aligned. Confidence is High because
every sheet was viewed at full size on its final fingerprint and the geometric claims are
measured, not estimated.

## Checks

- [x] Composition & hierarchy: PASS — One job per sheet, one anchor each. **01** the 40pt display
  title with the accent rule above it; **02** the question set at 20pt against a full-height
  accent spine; **03** the single `#5A55E0` column header, which is the whole argument of the
  sheet in one mark; **04** the pull-quote panel on the left with two badged policies opposite;
  **05** the one active step in the four-step process — the deck's thesis, and the only filled
  node; **06** the three badged questions with the restated point beside them. The cover and the
  closing sheet both carry a real visual anchor, not just text. Slide-05's active step is the
  only highlight in its row, as `diagram.process` requires.
- [x] Typography & legibility: PASS — Measured in the DOM: **no text below 10pt on any sheet.**
  Body 14pt, glosses 12pt, card headers and process labels 11pt, kickers and captions 10pt,
  titles 24pt, cover display 40pt — one scale reused on every sheet. Contrast at presentation
  distance: `#5C6B7E` on `#F6F9FC` is 5.1:1 and on `#FFFFFF` 5.4:1 (both over the 4.5:1 body
  bar); white on the `#5A55E0` fills of slide-03's header and slide-05's active node is 5.4:1;
  `#EBF0F6` gloss on that same accent fill is 4.8:1. Nothing is painted close to its own
  background — checked specifically on the active node and the highlighted column header, which
  are the two places in this deck where that failure would hide.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — This is an English deck. Pretendard
  was deleted from `assets/fonts/` after scaffolding and there is no Hangul in any sheet, so
  neither Layer 1 (breaking inside a word) nor Layer 2 (`keep-all` raggedness) can occur.
  Latin wrapping was still inspected for the equivalent faults and two were found and fixed: the
  cover thesis broke mid-sentence ("too many / tests", now a hand `<br>` at the sentence
  boundary), and two slide-03 bullets wrapped to a second line while their neighbours did not,
  breaking the row grid across the three columns (rewritten to fit the real 25-character ceiling).
  No orphan or one-word last line survives on any sheet.
- [x] Review Litmus: PASS — Each sheet lands in 3–5 seconds: 03 reads as one highlighted column
  against two, 05 as one filled step in a row of four, 04 as two numbered rules. Strip the
  decoration and the argument still stands, because the decoration *is* the argument — the
  highlight marks what belongs in the gate. Lines that could be cut were cut: slide-03's bullets
  are three per column at 25 characters, and no sheet exceeds the style's seven-line ceiling.
  Two lines were *added* rather than removed, both to close a measured void rather than to fill
  space with padding — a closing line on 02 that also bridges into 03, and a supporting line on
  06. Neither introduces a figure.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Thesis broke mid-sentence ("too many / tests") | Minor | Hand `<br>` at the sentence boundary; `max-width` 470 → 530pt | fixed |
| slide-02 | Left column held ~150pt of content in a 255pt column; vertical centring opened a void under the header | Minor | Accent bar made a full-height spine so the leftover reads as structure; closing line added | fixed |
| slide-03 | Two bullets wrapped to a second line while their neighbours stayed on one, breaking the row grid across the three columns. The horizontal budget had missed the 11pt bullet indent — real ceiling is ~25 chars at 12pt, not 28 | Major | Rewritten to "Post-deploy smoke tests" and "Licence and CVE audits"; all nine bullets are now one line | fixed |
| slide-04 | Columns appeared unequal in the render | Note | Measured: both 255.3pt. No change made — the eye was wrong, not the layout | tracked |
| slide-05 | Node labels 02 and 04 wrapped to two lines while 01 and 03 did not, so the gloss under each pill started at a different y | Major | Two label lines reserved in **every** node (`min-height:30pt`), not just the two that wrapped — same discipline as giving every row the border and changing only its colour | fixed |
| slide-05 | Pills stretched to ~193pt around ~115pt of content, leaving a dead band under every gloss. Centring the content made it worse — node 02's gloss runs a line longer, so centring lifted its badge above its neighbours' | Major | Pills hug their content, content stays top-aligned (all four badges now share one top edge at 146.1pt), closing strip takes `margin-top:auto` so its bottom lands on 351.0pt like every other sheet | fixed |
| slide-06 | ~100pt void between the panel thesis and the presenter block | Minor | One supporting line added — closed with content, not padding | fixed |
| all | No content overflows `main` under the fixed bottom-right caption on any sheet (measured: worst-case overflow 0.00pt) | Note | None | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
