# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/ci-pipeline/gate-preview/slide-01.png, decks/ci-pipeline/gate-preview/slide-02.png, decks/ci-pipeline/gate-preview/slide-03.png, decks/ci-pipeline/gate-preview/slide-04.png, decks/ci-pipeline/gate-preview/slide-05.png, decks/ci-pipeline/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 9bd35fbd28f33620a2ecf6b2036e06ffe3596fa706e711e953dc061643279920, slide-02.html: 3939a43de7ddf0718ed46851a2309273c670dbfc93f138abd8412fa6db35b8c1, slide-03.html: f4766cb519d99ec4109c58e81678bd19a97775c23424354c05fc8fdf56f85f62, slide-04.html: fe961f51d07b667f02d9b977b8346784b7acef326ebf3ce34c031509acd7e456, slide-05.html: e2217577a629d3678b216fc8092f7e1691a0fd43bd70eedce2ac0edf8d695580, slide-06.html: 3f4acc431ddd23306b4d2d8800f0b1942795696f228f081bf6d1950d91629dc5
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
