# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/observability-cost/gate-preview/slide-01.png, decks/observability-cost/gate-preview/slide-02.png, decks/observability-cost/gate-preview/slide-03.png, decks/observability-cost/gate-preview/slide-04.png, decks/observability-cost/gate-preview/slide-05.png, decks/observability-cost/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 363a9ad247ef3db855876c904bc940e9459349461b73901464dc69844383c4e3, slide-02.html: b303808fceeaea96183c8bf99125f9650faceacadf1056f95256c9eedaa5556f, slide-03.html: 5582ded43c13c6cd44f316bf83889d165680837280ffc805a8f25658d683d653, slide-04.html: cd525e4c0d029029eba5a5080f5df1a7e129e345188c769bfd90c2e4e4f85c8a, slide-05.html: 56e411dd5b0b4918c45fa00b2182d7bd41f7d0fb176b9600aec85a4bcc29aa63, slide-06.html: 2d8e4d93f2672b0ca13c66f09e701debc77f6a2282d263bf1bb190c8b21bee1f
Unresolved Critical: 0
Blocking findings: None

Style contract: `ppt-editorial-product-deck`, read from `npx slides-grab show-design
ppt-editorial-product-deck` and reproduced in `slide-outline.md` under "contract". Method for
this pass: `grep` over all six saved HTML files for every colour literal, font-family, size
and leading declaration, cross-checked against that contract, plus a read of each file's
`<style>` block in full.

## Checks

- [x] System consistency: PASS — All six sheets are the same document. Identical body box
  on every sheet (`720×405pt`, `padding: 32pt 40pt`, 640pt content measure), identical
  `header` (11pt tracked kicker `Platform engineering · Observability budget` over a 0.75pt
  `#DAD3C4` hairline) and identical `footer` (0.75pt hairline over a `NN / 06` page cell and
  the fixed bottom-right source caption). Measured off the built files, `main` is **256.74pt
  on all six sheets** (top 76.13pt, bottom 332.87pt) and no sheet's content exceeds it.
  **Two backgrounds only**: `#F7F4EE` canvas everywhere, `#FCFAF5` surface on exactly three
  elements (the two panels on 03, the strip on 05). **Two typefaces only**: Source Serif 4
  for every heading and display, Inter for every body, label and caption — the hierarchy is
  the spec's typeface contrast, and it is never inverted (no serif body, no sans heading).
  **One accent**: `#B5503A`, appearing on five sheets and never twice in two roles on one
  sheet. Layout patterns are declared and reused, not drifting: 02 and 05 are both the spec's
  `diagram.comparison` (0.75pt vertical dividers, no column fill); 03 and 05 both use the
  4px-radius, shadowless surface panel; 01, 04 and 06 all use the same 6pt `border-left`
  callout.
- [x] Color discipline: PASS — Six colour literals exist in the entire deck and every one
  is a spec token: `#F7F4EE` (bg), `#FCFAF5` (surface), `#1F1B16` (text), `#7A7164` (text
  muted), `#B5503A` (accent), `#DAD3C4` (border). Verified by grepping every `#` in all six
  files — **there is no seventh value, and no harmonic extension was needed**, so there is
  nothing in this deck that is not traceable to the published spec. The two chart tokens
  `#C8BFAD` and `#9B917F` are declared by the spec and deliberately unused (no chart exists);
  that is recorded in `slide-outline.md` and `design-debt.md`. No `#FFFFFF` anywhere, which
  the Avoid list names explicitly. Contrast was computed rather than eyeballed: `#1F1B16` on
  `#F7F4EE` ≈ 15:1, `#B5503A` ≈ 4.58:1, `#7A7164` ≈ 4.39:1 — and `#7A7164` is confined to
  kickers, micro labels, captions and qualifiers, never to argument prose (`design-debt.md`
  N3).
- [x] AI slop tropes: PASS — No gradient of any kind: grepped for `gradient` across all
  six files, zero hits, and every fill is flat. No shadow: grepped for `shadow`, zero hits,
  which also satisfies the spec's `shape.shadow: none`. Radius is `4px` on the three surface
  panels and `50%` on the three step badges the spec itself defines
  (`diagram.step_badge: 0.34in circle`); nothing is a rounded card with a decorative left
  stripe — the 6pt left rules on 01/04/06 are the spec's own `rule left 0.12in #B5503A`
  callout idiom carrying a callout, not a container style. **No emoji, no icon, no clipart,
  no SVG illustration** — grepped for `<svg`, zero hits; the only marks in the deck are
  hairline rules, three no-fill badge circles and three `×` operators, all of which are text
  in semantic tags. **No generic font stack**: the two faces are the two the style specifies,
  embedded locally as woff2 from `@fontsource/*`, with only the spec's own fallbacks after
  them. **No 3×2 icon grid**; the two grids in the deck are a 3-column comparison and a
  2-row ledger, both spec vocabulary. Text lives only in `p`/`h1`–`h3`/`ul`/`li` — the only
  bare `div`/`span` elements are the hairlines, the badge circles, the panel wrappers and the
  empty marker cells on 03.
- [x] Content discipline: PASS — **There is no number anywhere in this deck** other than
  the page numbers `01/06`…`06/06`, the decision indices 1–3, and the string `03:00` on slide
  04, which is a time of night used rhetorically and is not presented as measured data. There
  is no chart, no `<canvas>`, no bar of any kind (div-drawn or otherwise), no KPI tile, no
  percentage, no cost-per-GB, no retention curve and no stat strip. This was the deck's single
  largest content risk — a cost argument pulls hard toward a figure — and the mitigation is
  structural rather than cosmetic: slide 03, the sheet that would have carried the chart,
  makes the magnitude argument as *what multiplies against what does not* (a four-term product
  versus four bounded constants), which is true without a magnitude and is the actual claim.
  The fact is stated to the audience on every sheet, in the style's mandatory fixed
  bottom-right source-caption slot: `Source: none — this deck cites no cost figures; the
  argument is structural.` The presenter line on the cover is the placeholder
  `Presenter · Team`; no name or organisation is invented.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| all | Source Serif 4 clips at the spec's `leading 1.15` at every size used (18/20/24/26/44/56pt), caught by `validate` as `text-clipped`. All serif type set at 1.35 instead — the framework floor applied upward against the style spec. | Note | Deliberate deviation, applied | recorded in design-debt.md §1 |
| all | Spec point sizes scaled by 0.75 for this canvas would put kicker at 8.25pt, body at 13.5pt and caption at 7.5pt, all under the framework floors. Held at 11pt / 16pt / 11pt instead. | Note | Deliberate deviation, applied | recorded in design-debt.md §2 |
| 01, 06 | Cover and closing display set *above* the scaled value (56pt and 44pt vs 33pt) so the sheets have the anchor the gate requires, given no image and no figure is available. | Note | Deliberate deviation, applied | recorded in design-debt.md §3 |
| all | Chart tokens `#C8BFAD` / `#9B917F` and the 40pt `kpi` token declared by the spec and never used. | Note | Intentional — no sourced data exists | recorded in design-debt.md §4 |
| all | `slide.header_band` scales to 35.1–91.8pt; the 26pt heading finishes at 111.2pt, ~19pt past its nominal bottom. | Note | Accepted — raising it would set the heading inside the hairline | recorded in design-debt.md §5 |
| 03 | Three `×` operators are accent-coloured at 14pt, against this deck's own "no accent ink below 16pt" rule. | Note | Accepted — operators, not prose; 4.58:1 clears the 4.5:1 body bar regardless | recorded in design-debt.md N1 |
| 05 | First axis column's inner measure is 196.6pt against 180.6pt for columns 2 and 3, because it carries no divider or left padding. | Note | Accepted — flush alignment to the 12-column grid judged more important than three identical measures | recorded in design-debt.md N2 |
