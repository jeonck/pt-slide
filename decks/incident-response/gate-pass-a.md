# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/incident-response/gate-preview/slide-01.png, decks/incident-response/gate-preview/slide-02.png, decks/incident-response/gate-preview/slide-03.png, decks/incident-response/gate-preview/slide-04.png, decks/incident-response/gate-preview/slide-05.png, decks/incident-response/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: dc6912e8f7e4f0fa289939d04343be42426d77e387c167c226dca2dbe4b0284c, slide-02.html: d3c2279cad244bc11fe77cfd38fdf21989476a96ffde991db50224165935a895, slide-03.html: 17542e5bd6c1422abca89953c6ecb77619c6f31f3d2d34c34becbc12d2db5cf2, slide-04.html: e70433fb72902cc2f2db2b7baad60cf253df89ebd8182451c6ab0d17bc76aef9, slide-05.html: 3965401d24103f60fc7e6a7f0db818a5c2d0d85cb1ce12505aeefc52f98bd048, slide-06.html: 547dbdac989eaf80f7ea8e501a9f9b02ba8d9c3de7bfa8c61b904a10133a8b7c
Unresolved Critical: 0
Blocking findings: None

Method: the six slide sources were read against the `slides-grab show-design ppt-dark-tech`
output, and every colour literal, font declaration and container in them was grepped and
listed. The six PNGs above were then opened as images to confirm the source matches what
renders — in particular that the grid tile, the glows and the muted rows appear as intended.

## Checks
- [x] System consistency: PASS — One declared shell, reused verbatim on every sheet: a mono
  kicker row (`// NN — SECTION` left, `[ NN / 06 ]` right), a one-line 26pt H1, a 0.75pt
  `#2A2D35` hairline, `main`, and a mono footer. Sheets 01 and 06 swap the footer for the
  same meta strip so the cover and the close are a matched pair. **Two backgrounds only**
  (`#0C0D10` canvas, `#16181D` code-block surface) — nothing else is filled anywhere.
  **Two type families only** (Space Grotesk, JetBrains Mono), with mono reserved without
  exception for metadata: kickers, indices, tier labels, column heads, captions, the
  presenter line. **One accent does the work** (cyan `#3DF5E0`); violet `#9D7BFF` appears
  only where it carries a fixed meaning — the `// DOES NOT` heads on 03, the SEV-2 label on
  05, the `[ BLOCKS … ]` tags on 06. Every container in the deck is the same code-block node:
  `#16181D`, 1px `#2A2D35`, radius 4px. slide-02, -03 and -06 share one three-part grid;
  slide-04 and -06 share one row rhythm.
- [x] Color discipline: PASS — Grepping every colour literal across the six files yields
  exactly the seven spec tokens plus `rgba(61,245,224,…)`, which is accent 1 at reduced alpha
  used only as the `box-shadow` glow the spec prescribes in place of a diffuse shadow. No
  eighth hue, no palette extension, and therefore no colour entry in `design-debt.md`.
  Radius is 4px everywhere, under the spec's 8px ceiling. No pastel, no light background.
- [x] AI slop tropes: PASS — No gradient of any kind: the 0.5in machine grid the spec offers
  is a 36pt base64 data-URI SVG tile with 1px `#16181D` strokes, chosen precisely because the
  usual `repeating-linear-gradient` route would be a gradient. No rounded card with a left
  accent stripe used as a default container — the emphasis on slide-04's DECLARE row is a
  full 1px border plus glow, and *every* sibling row declares the same 1px border so nothing
  shifts. No SVG illustration, no emoji, no clip art, no icon set at all. No generic font
  stack: Space Grotesk and JetBrains Mono are the faces the style spec names, embedded
  locally from npm. No 3×2 icon-and-caption grid; the three-column sheets are text nodes.
- [x] Content discipline: PASS — **There is no chart, no KPI card and no number presented as
  measured anywhere in the deck.** Grepping the sources for digits returns only sheet indices
  (`01`–`06`), checkpoint numbers (`// 01`–`// 05`), severity labels (`SEV-1`–`SEV-4`), and
  the phrase "the first 30 minutes" in the title and footers — the name of the window, not a
  measurement of it. The style's `diagram.kpi_card` with its 44pt cyan value was deliberately
  left unused because any figure it could hold would have to be invented. Sheet 04 is an
  ordered sequence with **no time markers at all**, and its caption row says so in the render
  (`EACH ONE IS PASSED, NOT SCHEDULED` / `// NO CLOCK, NO MINUTE MARKERS`). Sheet 05's ladder
  is footnoted `LADDER PROPOSED FOR DISCUSSION` so it cannot be read as measured practice, and
  it carries no response-time SLA or frequency. Sheet 02's footer reads `NO CHART · MECHANISM
  ONLY`. The reasoning is recorded in full under "charts and figures" in `slide-outline.md`.
  `PRESENTER · TEAM` is a placeholder on both 01 and 06; no name is invented.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-04 | Uses the spec's vertical `diagram.hierarchy` node/connector form rather than the horizontal `diagram.process_flow` it nominally calls for | Minor | Not fixed — deliberate. Five columns across 652pt allow ~13 characters a line at the 14pt body floor; the alternative is type under 14pt, which is a Critical. Recorded as deviation 1 in `slide-outline.md` and in `design-debt.md` | tracked |
| slide-05 | Severity tiers hold a common width instead of narrowing, as `diagram.hierarchy_funnel` specifies | Minor | Not fixed — deliberate. The tiers carry four aligned columns and narrowing would destroy the row-to-row comparison that is the point of the sheet. Rest of the funnel vocabulary kept, including the cyan top edge and glow. Recorded as deviation 2 | tracked |
| slide-05 | Column heads initially rendered at 14pt because `.head p` outranked `.cap`, flattening the hierarchy against the rows | Note | Fixed before this report — heads are now 13pt mono muted | tracked |
| all | Type sizes are the framework's floors, not the spec's absolute points (its 17pt body and 11pt caption scale to ~12.75pt and ~8.25pt on a 10in canvas) | Note | Body 14pt, mono labels 13pt, captions 11pt, H1 26pt, cover display 38pt. Recorded as deviation 3 | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
