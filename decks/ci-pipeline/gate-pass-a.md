# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/ci-pipeline/gate-preview/slide-01.png, decks/ci-pipeline/gate-preview/slide-02.png, decks/ci-pipeline/gate-preview/slide-03.png, decks/ci-pipeline/gate-preview/slide-04.png, decks/ci-pipeline/gate-preview/slide-05.png, decks/ci-pipeline/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: dfc092ce588eb59f7c4b375b9f35d259b1ea8fc8df977d764481342ce4ffdbed, slide-02.html: 9f39c4f0ed96720d94d2a37d1af3115d691dc1ba2f2cc72db0304723d2fa9bef, slide-03.html: 8a618c600e55a4944bf482a1b50519cb9450ed279fa9d1bab014d68d3d54793b, slide-04.html: bc8740c114e8665f4391b9bc65a2175b204b72307ed627f0976897c274c3d489, slide-05.html: 7efa70675f0ccbdf2de5b135e9bc4843ab171531ce7a5a9046b351bf2b42ce3a, slide-06.html: 6ac2ba16392fc353b1234ffb80fcaff69f5b3defdd8e2ad69d024c63eb6b6fe3
Unresolved Critical: 0
Blocking findings: None

Style under contract: bundled `ppt-precision-fintech-deck` (assigned, not chosen). Checked
against the `show-design` output item by item, including every line of its `## Avoid` list.

## Checks

- [x] System consistency: PASS — One shared chrome across all six sheets, verified by measuring
  the live DOM, not by eye: `main` runs 95.8pt → 351.0pt on sheets 02–06 and the bottom-right
  caption sits at 365.0pt on all six. Two layout patterns only — the spec's 7:5 asymmetric prose
  grid (02 at 7:5, 04 at 5:7, 06 at 7:5, alternating as `slide.layout` requires) and the spec's
  own diagram vocabulary (3-column comparison on 03, horizontal 4-step process on 05). One
  typeface (Inter 400/600/700), two background planes (`#FFFFFF` canvas, `#F6F9FC` surface with
  `#EBF0F6` as the single step above it), one accent. Radius is 6pt everywhere; no borders, no
  shadows — division is by surface step, which is this style's stated Signature.
- [x] Color discipline: PASS — `grep -oh '#[0-9A-Fa-f]\{6\}'` over all six files returns exactly
  six values: `#0A2540`, `#5A55E0`, `#5C6B7E`, `#EBF0F6`, `#F6F9FC`, `#FFFFFF`. Every one is a
  literal token from the spec. **No harmony extension was needed and none was invented.**
  `#5A55E0` is the only accent and appears only as structure or emphasis — the cover rule, the
  slide-02 spine, the number badges, the single highlighted comparison header on 03, the single
  active process step on 05, and the 1.5pt connectors. The spec's `accent light #7C78F0` and both
  chart tints are deliberately unused: a second accent is on the Avoid list and there is no chart.
  Body text is never coloured with the accent, which the Avoid list names explicitly.
- [x] AI slop tropes: PASS — `grep` for `gradient` and `box-shadow` over the six files returns
  nothing, so no full-bleed gradient and no shadow (the spec permits a same-hue two-stop gradient
  and a CTA shadow; both are declined, per the repo's flat-fill rule). No SVG illustration — the
  only SVG in the deck is three 18pt process connectors on slide-05, which is the spec's
  `diagram.connector` verbatim. No emoji anywhere. No 3×2 icon grid; no icons at all. The font
  stack is Inter because `typography.display/title/body` all name Inter — the framework's
  generic-stack ban exempts a spec-named face. The rounded card + left stripe pattern appears
  twice (slides 03 and 05 closing strips) as the spec's own emphasis device on a callout, never
  as the default container for ordinary content.
- [x] Content discipline: PASS — **There is not one number in this deck.** No build times, no
  pass rates, no flake percentages, no "teams that do X ship Y faster", no stat strip dressed up
  as information, no chart. Every claim is a mechanism: what a stage's failure *means*, and what
  the people at the gate do once it means nothing. `slide-outline.md` records the decision and
  why (any such figure here would have to be invented). The mandatory bottom-right
  `source_caption` slot carries sheet identity and the words "NO CHART, NO EXTERNAL DATA" rather
  than a fabricated citation. The presenter line is the literal placeholder `PRESENTER · TEAM`
  on both the cover and the closing sheet; no name was invented.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | No blocking findings | Note | None | tracked |
| slide-02 | No blocking findings | Note | None | tracked |
| slide-03 | No blocking findings | Note | None | tracked |
| slide-04 | No blocking findings | Note | None | tracked |
| slide-05 | No blocking findings | Note | None | tracked |
| slide-06 | No blocking findings | Note | None | tracked |
| all | Type scale is the spec's, scaled 0.75 for a 10in canvas and then floored: kicker 12→9pt and caption 10→7.5pt would breach the framework's 10pt floor and body 18→13.5pt the 14pt body floor, so kicker and caption are set at 10pt and body at 14pt — larger than the scaled spec, never smaller | Note | Intentional; recorded in slide-outline.md under "deviations" | tracked |
| all | Title leading raised from the spec's 1.15 to 1.20 (cover display 1.05 → 1.20) because tight leading clips descenders in this renderer | Note | Intentional; required by references/slide-html.md | tracked |
| all | `source_caption` carries sheet identity instead of a citation; `accent light` and both chart tints go unused | Note | Intentional; recorded in slide-outline.md | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
