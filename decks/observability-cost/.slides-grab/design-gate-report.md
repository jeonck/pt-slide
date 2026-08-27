# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-27T16:14:55.535Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/observability-cost/gate-preview/slide-01.png, decks/observability-cost/gate-preview/slide-02.png, decks/observability-cost/gate-preview/slide-03.png, decks/observability-cost/gate-preview/slide-04.png, decks/observability-cost/gate-preview/slide-05.png, decks/observability-cost/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: e4574e1fb8f46de0d515d20359a482fbaae6a22f5088f3771f2629114b1d8bad, slide-02.html: 7b87610e0266362ae9a0a31e95d9aba5307fe5954bac9fde9da708f599464ba0, slide-03.html: 40f2aea5bdaeb9eb282db01d24d1304567202b4c93be97018fa3cc42ca2c5de3, slide-04.html: 435a4352137d2918d8624b3c79b061828dc6437042d2df9c623d473a96891cdb, slide-05.html: 0d2b6c811c4df75ac5bda3833cf3ddcd9ffca5ed6d9151e03faf2994ac3af410, slide-06.html: 6430ef160906588b2d2869a8932ce3ac03eaf35765a66b9c51d3e52b5f513546
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
| slide-02/04 | 그리드 자식이던 텍스트 요소를 래퍼 `<div>`로 감싸고, 배치·테두리 클래스는 래퍼로 서체 클래스는 안쪽에 남겼다. `.signal`은 상자와 글자로 쪼갰다 | Note | text 엔진이 텍스트 요소의 border를 거부한다. 렌더 픽셀 차이 0 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/observability-cost/gate-preview/slide-01.png, decks/observability-cost/gate-preview/slide-02.png, decks/observability-cost/gate-preview/slide-03.png, decks/observability-cost/gate-preview/slide-04.png, decks/observability-cost/gate-preview/slide-05.png, decks/observability-cost/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: e4574e1fb8f46de0d515d20359a482fbaae6a22f5088f3771f2629114b1d8bad, slide-02.html: 7b87610e0266362ae9a0a31e95d9aba5307fe5954bac9fde9da708f599464ba0, slide-03.html: 40f2aea5bdaeb9eb282db01d24d1304567202b4c93be97018fa3cc42ca2c5de3, slide-04.html: 435a4352137d2918d8624b3c79b061828dc6437042d2df9c623d473a96891cdb, slide-05.html: 0d2b6c811c4df75ac5bda3833cf3ddcd9ffca5ed6d9151e03faf2994ac3af410, slide-06.html: 6430ef160906588b2d2869a8932ce3ac03eaf35765a66b9c51d3e52b5f513546
Unresolved Critical: 0
Blocking findings: None

## Method
**All six sheets were opened individually as 1920×1080 images and looked at**, not skimmed
from a contact sheet — twice: once on the first render, and again after fixes. The
six-up contact sheet (`contact-sheets/sheet-01.png`) was then read a third time to judge the
deck as one object. Seven render-only defects were found this way and all seven were fixed;
they are listed in full in `slide-outline.md` under "what the render caught that `validate`
did not". `validate` reported **6/6 passing, 0 errors, 0 warnings** while five of them were
on screen. Box geometry quoted below was read out of headless Chromium against the built
files, not estimated. Confidence is High because every sheet was inspected at full
presentation resolution and every claim below names what was looked at.

## Checks

- [x] Composition & hierarchy: PASS — One job and one anchor per sheet.
  **01** the anchor is 56pt of Source Serif 4 over two lines occupying the top half; nothing
  else on the sheet competes, and the single terracotta rule points at the one supporting
  sentence. **02** the anchor is the terracotta bar and terracotta word over the *Logs*
  column — in the render your eye lands there before it reads the grid, which is the intent,
  since Logs is the deck's subject. **03** the anchor is the two facing panels, and the
  contrast between a column of `×` operators and a column with none carries the argument
  before a word is read. **04** the anchor is the two-row ledger with `WHAT IT KEEPS` against
  `WHAT IT SPENDS`; the terracotta-ruled line below it is the sting. **05** the anchor is the
  single wide `Observability` strip, deliberately one undivided block above three divided
  ones — the shape of the sheet *is* the argument about bundling. **06** the anchor is 44pt
  of display over three lines facing three numbered decisions. Reading order is unambiguous
  on every sheet (top-left kicker → heading → content → bottom-right caption), and the
  fixed furniture holds the same y on all six, which the contact sheet confirms at a glance.
  No sheet is a wall of undifferentiated text; the longest prose block in the deck is two
  lines.
- [x] Typography & legibility: PASS — Grepped every `font-size` in the deck: the complete
  set is 11, 12, 14, 16, 18, 20, 24, 26, 44, 56pt. **Nothing is below 11pt**, so the 10pt
  floor is cleared with a point to spare, and the smallest text in the deck (the 11pt kicker
  and source caption) is legible in the render at full size. That set is a real scale, not
  drift: 11 for labels/captions, 14 for secondary, 16 for body, 18/20/24/26 for headings,
  44/56 for display, applied consistently across sheets. The complete set of `line-height`
  values is **1.35, 1.4, 1.5** — `line-height: 1` appears nowhere, and no glyph is clipped
  (`validate` 0 errors after the serif leading was raised from the spec's 1.15 to 1.35;
  the first build clipped descenders on every serif heading at every size). Contrast at
  presentation distance: argument prose is `#1F1B16` on `#F7F4EE` at roughly 15:1;
  supporting text is `#7A7164` at 4.39:1 and is confined to labels, captions and
  qualifiers; the accent is 4.58:1 and is almost entirely rule rather than ink. Checked
  specifically for the "panel text painted the same colour as its surface" failure — the
  `#FCFAF5` panels on 03 and 05 carry `#1F1B16` and `#7A7164` text, both plainly readable
  against that surface in the render.
- [x] Korean/CJK word-break integrity: PASS — **This deck contains no Hangul and no CJK
  text of any kind**; it is English-only, which was verified by reading all six rendered
  images and by the absence of any CJK codepoint in the source. Pretendard was deleted from
  `assets/fonts/` after scaffolding for that reason, so there is also no tofu risk. Layer 1
  and Layer 2 are therefore vacuous here, and English wrap quality was assessed in their
  place — where the same failure mode does exist as runt lines. Two were found in the render
  and fixed: slide 05's first axis column broke as `Metrics, logs and traces have / different
  curves. Price them / apart.`, leaving `apart.` alone on line three, and slide 02's Metrics
  cost cell left `traffic` alone on line two. `text-wrap: balance` was applied to those two
  rules; in the current render all three columns on 05 break on sentence boundaries
  (`Metrics, logs and traces / have different curves. / Price them apart.`) and every cell on
  02 breaks evenly. No orphan or widow remains anywhere in the deck.
- [x] Review Litmus: PASS — Three to five seconds per sheet gets the point on all six:
  01 "logs cost the most, get read the least"; 02 "the three answer different questions";
  03 "one side multiplies, the other does not"; 04 "these are bets, and here is what each
  spends"; 05 "one line item, three ways to split it"; 06 "three decisions". Strip the
  decoration and the deck survives — the decoration is six hairlines, three no-fill circles
  and one terracotta rule, and every one of them is doing structural work rather than
  filling space. Lines that could be cut were cut: slide 04's closing was 172 characters and
  is now 118, which reads better, and slide 02's row label went from `COST GROWS WITH` to
  `GROWS WITH`. The one thing an audience will press on — "where are the numbers?" — is
  answered in the same place on every sheet rather than dodged.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| 02 | The 3pt accent mark was applied to every grid cell, striping the Logs column with four terracotta bars instead of marking it once. Render-only; `validate` passed it. | Major | Mark moved to the signal-header row; all three headers reserve a transparent 3pt border, only the Logs colour changes | fixed, re-rendered |
| 02 | `GROWS WITH` wrapped in the 100pt row-label rail — the label needs 87.2pt and the rail's *available* width was 84pt after its own 16pt padding-right. Render-only. | Major | Rail widened to 112pt (96pt available); label verified one line in the render | fixed, re-rendered |
| 02 | Row labels sat ~11pt below the first line of the cells they label, because `.compare .col { padding: 0 16pt }` out-specified `.cell { padding-top: 11pt }` and zeroed the cells' top padding. Render-only. | Major | Shorthand split; row padding restated at matching specificity, labels +1pt to cap-align 11pt caps against 14pt prose | fixed, re-rendered |
| 03 | A ~70pt hollow band above the footer rule — panels sat at content height in a taller `main`. Render-only. | Major | `.panels{flex:1}`, `.panel` a flex column, `.factors` on `space-between`; filled by layout, no content invented | fixed, re-rendered |
| 04 | The closing callout ran to three lines and its descenders touched the footer hairline — zero clearance. Render-only. | Major | Copy cut 172 → 118 chars (two lines); `margin-top:auto` pins it to `main`'s bottom with the footer's 16pt margin as clearance | fixed, re-rendered |
| 06 | The 6pt accent rule was twice the height of the single line it ruled, because `padding-top` sat on the same element as the `border-left`. Render-only. | Minor | Padding removed; `margin-top:auto` alone does the spacing | fixed, re-rendered |
| 06 | The two columns ended at different heights with ~45pt of dead air under both. Render-only. | Minor | Both closing elements pinned with `margin-top:auto`; standfirst and terracotta line now share a bottom edge | fixed, re-rendered |
| 05, 02 | Runt lines: `apart.` alone on line 3 of the first axis column; `traffic` alone on line 2 of a slide-02 cell. | Minor | `text-wrap: balance` on both rules; verified in the re-render | fixed, re-rendered |
| all | Serif leading raised from the spec's 1.15 to 1.35 (the face clips below it), point sizes floored rather than scaled to 8.25/7.5pt, cover and closing display set above the scaled value. | Note | Deliberate deviations | recorded in design-debt.md §1–3 |
| all | Style chart tokens `#C8BFAD` / `#9B917F` and the 40pt `kpi` token left unused — there is no chart and no figure in this deck. | Note | Intentional; stated to the audience in the fixed source caption on all six sheets | recorded in design-debt.md §4 |
| slide-02/04 | 그리드 자식이던 텍스트 요소를 래퍼 `<div>`로 감싸고, 배치·테두리 클래스는 래퍼로 서체 클래스는 안쪽에 남겼다. `.signal`은 상자와 글자로 쪼갰다 | Note | text 엔진이 텍스트 요소의 border를 거부한다. 렌더 픽셀 차이 0 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: e4574e1fb8f46de0d515d20359a482fbaae6a22f5088f3771f2629114b1d8bad
- slide-02.html: 7b87610e0266362ae9a0a31e95d9aba5307fe5954bac9fde9da708f599464ba0
- slide-03.html: 40f2aea5bdaeb9eb282db01d24d1304567202b4c93be97018fa3cc42ca2c5de3
- slide-04.html: 435a4352137d2918d8624b3c79b061828dc6437042d2df9c623d473a96891cdb
- slide-05.html: 0d2b6c811c4df75ac5bda3833cf3ddcd9ffca5ed6d9151e03faf2994ac3af410
- slide-06.html: 6430ef160906588b2d2869a8932ce3ac03eaf35765a66b9c51d3e52b5f513546
