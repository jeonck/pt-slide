# SLO — what you promise, and what you refuse to promise · slide outline

## meta
- deck: decks/slo
- mode: html
- style: `ppt-monochrome-infrastructure-deck` (bundled). **Chosen, not assigned** — see
  "style choice" below. `show-design` output treated as a contract; the `## Avoid` list is
  reproduced under "contract".
- slide-size: 720pt × 405pt
- language: English
- audience: the people who would have to honour the promise — service owners, on-call, and
  the product manager whose roadmap is the thing that stops.
- tone: mechanism, not exhortation. Every claim has to survive "and then what happens?"
- slides: 6 (cover · switch not metric · the budget · the exclusions · how it stops being a
  switch · what we need to decide)
- charts: **none.** No numbers of any kind. See "no figures" below.
- fonts: **Geist** 400/600/700 and **Geist Mono** 400/500, embedded locally under
  `./assets/fonts/` from `@fontsource/geist-sans` and `@fontsource/geist-mono`. Pretendard
  (4 faces, ~3MB) was deleted by hand after scaffolding — this deck has no Hangul. No
  `http(s):` URL appears in any saved slide.

## style choice
Three candidates were on the shortlist: `ppt-strategy-navy-deck`, `ppt-bcg-exhibit-deck`,
`ppt-monochrome-infrastructure-deck`. Picked the third.

- **BCG exhibit** is built around exhibits: `Exhibit N.N` labels, marimekko/waterfall/bar
  chart grammar, and an explicit "실제 Exhibit은 빽빽하다" density rule aimed at data panels.
  This deck has no data at all. Wearing exhibit numbering over six argument sheets would be
  costume, and the style's identity would be the part we could not honour.
- **Strategy navy** is a good fit for the argument shape — mandatory action-title conclusion
  sentences, a hairline under each — but its hierarchy is built from two blues, and half its
  contract is chart discipline we would never exercise.
- **Monochrome infrastructure** is the only one of the three whose emphasis mechanism is not
  colour: "강조는 색이 아니라 굵기와 보더 두께 대비로만." That is the deck's own thesis in
  visual form — an SLO is not a richer description, it is a heavier rule. It is also a
  drafting language (1px hairlines, right-angle connectors, mono labels) which suits a sheet
  about a mechanism rather than a result, and it has a mandatory bottom-right source caption
  we can spend on the no-data disclosure. No existing deck in `decks/` uses it.

## no figures, and why
There are no percentages, no durations, no counts and no benchmarks anywhere in this deck,
and therefore no chart. "99.9% is the industry standard", "teams that adopt error budgets
ship N% faster", "MTTR drops by X" — all of these exist in vendor material and nowhere this
repo can cite. Inventing one would be Critical under the gate's content-discipline check,
and it would also be the weakest sentence on the slide: the thesis here is **mechanical** —
a budget with a stopping rule attached changes who decides what ships next — and a mechanism
does not need a percentage to be true. Slide 03 therefore names the loop instead of sizing it.

Per the brief, the style's mandatory `slide.source_caption` slot carries that fact rather
than a citation. Every sheet's bottom-right caption reads:

> `Source: none — no figures appear in this deck.`

## contract (from `npx slides-grab show-design ppt-monochrome-infrastructure-deck`)
- bg `#FFFFFF` · surface `#F2F2F2` · text `#000000` · text muted `#666666` ·
  text disabled `#999999` · border `#000000`
- display **Geist** 48pt w700 tracking −0.02em leading 1.1 · title Geist 30pt w600 −0.01em 1.2
- kicker **Geist Mono** 11pt w400 tracking 0.04em · body Geist 17pt w400 leading 1.45
- card_header Geist 14pt w600 · mono Geist Mono 13pt w400 · caption Geist Mono 10pt w400
- spacing unit 8 · margin_x 0.7in · margin_y 0.55in · 12 columns
- slide.header_band 0.55–1.6in · header_rule 1px `#000000` full width under title
- slide.source_caption fixed bottom-right mono
- radius **0px** · border 1px solid `#000000` · border_emphasis 3px solid `#000000` ·
  shadow **none**
- diagram: 0px-radius square modules, no fill, 1px hairline border, 1px right-angle
  connectors (no diagonals), mono step numbers `01`/`02`, emphasis by 3px border + bold
  text, **no colour**; process = horizontal 3–5 steps; comparison = 2–3 col table, 1px
  cells, header row `#F2F2F2` fill, emphasis col 3px outer border
- **Avoid:** any colour at all (accent, brand, chart) — emphasis only by weight and border
  thickness · rounded corners, shadow, gradient, texture, noise · labels/captions/numbers in
  sans (they must be mono) · amateur chart regressions · everything centred (body is
  left-aligned, pixel-snapped to the grid) · emoji bullets, clipart, stock icons, decorative
  shapes · filling a slide with more than 7 lines of prose

## design decisions recorded against the contract
1. **Point sizes are scaled, not copied.** The spec targets 13.33 × 7.5in; this canvas is
   10 × 5.625in, a 0.75 factor. Display 48 → 36, title 30 → 23 (22.5 rounded up), body
   17 → 12.75 which is **below the 14pt framework floor, so body is set at 14pt**, card
   header 14 → 10.5 → set at **15pt** so it stays above body, kicker/mono/caption 11/13/10 →
   8.25/9.75/7.5 which are all below the **10pt absolute floor**, so mono labels are set at
   **11pt** and captions at **10pt**. Nothing on any sheet is smaller than 10pt.
2. **Line-height floors override the spec's leading.** Spec display leading is 1.1 and title
   1.2; the framework floor is 1.2 for large display and 1.4 for body, because tighter
   leading clips ascenders and descenders. Applied: display 1.2, title 1.3, body 1.45, mono
   labels 1.4, card headers 1.35. `line-height: 1` appears nowhere, including inside the
   fixed-height step-number boxes on slide 03.
3. **Margins rounded to the 8pt unit.** 0.7in × 0.75 = 37.8pt and 0.55in × 0.75 = 22.3pt →
   **40pt horizontal, 24pt vertical**. Content width is therefore 640pt.
4. **No colour is used and none was needed.** Every value on every sheet is one of the five
   spec tokens: `#FFFFFF`, `#F2F2F2`, `#000000`, `#666666`, `#999999`. The palette was not
   extended, so there is nothing to record in `design-debt.md` on that axis.
5. **Emphasis never changes an element's box.** Where one item of a repeating set is
   emphasised — the switch panel on 02, step `04` on 03, the "out, by name" column on 04 —
   the 3px emphasis element exists on *every* sibling and only its colour changes
   (`transparent` → `#000000`). Nothing is nudged out of column. This is the
   "emphasise one and only that one shifts" trap from `references/slide-html.md`.
6. **Labels, captions and step numbers are all Geist Mono**, per the Avoid list. Body,
   titles and card headers are Geist sans.
7. **No icons anywhere.** The step markers on 03 and the row indices on 06 are mono numerals,
   which the spec's `diagram.number_badge` defines as `01`/`02` format.
8. **Connectors are inline SVG** with 1px black lines and 6px outline triangle arrowheads,
   per `diagram.connector`. All four process steps are on one horizontal axis, so the
   "right-angle bends only" rule is satisfied trivially — there are no bends.
9. **The header rule sits at the same y on all six sheets, cover included.** The cover does
   not get a special masthead; it takes the same kicker row and 1px rule as every body sheet
   and puts its display type below the rule. That is what makes the deck read as one system.

## budget — computed before any slide HTML was written

### vertical — what `main` actually has
```
405.0   canvas height
 −48.0  body padding (24 top + 24 bottom)
 −77.3  header block: kicker row 11pt×1.4 = 15.4
                    + 6 gap
                    + h1 23pt×1.3 = 29.9
                    + 10 pad
                    + 1px rule
                    + 16 margin-bottom
 −26.0  footer: 12 margin-top + caption 10pt×1.4 = 14.0
────────
=253.7  main
```
Every sheet's blocks were summed against 253.7 before it was written:

| sheet | blocks | sum |
|---|---|---|
| 01 | display 3×43.2 + 18 + body 2×21.8 + presenter row 15.4 + rule/pad 20 | ~232 |
| 02 | panels (flex:1, content 143.3) + band 34.8 + 18 margin | 196 min, panels stretch |
| 03 | process row 64 + 20 + two-col 106.6 + band 34.8 + 18 | 243.4 |
| 04 | table header 31.4 + 4 rows (flex:1) + band 34.8 + 16 | header+band 82.2, rows take 171.5 |
| 05 | 3 cards (flex:1, content 144.6) + band 34.8 + 16 | 195.4 min, cards stretch |
| 06 | 3 rows × 65.9 + band 37.4 + 16 | 251.1 |

Sheets 03 and 06 are the tight ones and were written to those numbers. Where a block is
`flex:1` its children are pinned with `margin-top:auto` or distributed with `flex:1 1 0` so
the spare height becomes even spacing rather than a hole at the bottom — the
"세로 여백이 가운데 뻥 뚫린다" failure.

### horizontal — measured, not estimated (and measured twice)

Measured with `_measure-slo.mjs` (a Playwright probe, deleted afterwards) against the
**actual strings** in the actual embedded faces, all-caps mono labels measured separately
from mixed-case prose. `getBoundingClientRect()` values were divided by 4/3 to get pt, and
the ceiling for each line is its **parent's** content box, not its own.

**The first measurement pass was wrong, and it is worth recording why.** The probe built its
test document with `page.setContent()`. In that document the base URL is `about:blank`, the
`file://` `@font-face` sources never loaded, and `document.fonts.ready` resolved anyway — so
it silently measured fallback faces. Geist prose came back **16–18% narrow** and Geist Mono
came back about 4% narrow. Two slide-02 lines were written to that budget, both wrapped in
the real render, and the two panels' item hairlines ended up at different y. The fix is in
the script now: **navigate to the real slide file** and measure the real elements there.

Real coefficients, from the real documents:

| class | face / size | measured coefficient |
|---|---|---|
| titles, body, cell prose, statement bands (mixed case) | Geist 400/600, 14–23pt | **0.434 – 0.534** |
| card headers, node labels, decision headings (mixed case) | Geist 600, 15–16pt | 0.492 – 0.528 |
| mono ALL-CAPS labels, tracking 0.04em | Geist Mono 500, 11pt | **0.654** (monospace, so constant) |
| mono captions (mixed case), tracking 0.04em | Geist Mono 400, 10pt | 0.640 |

The skill's 0.48 starting point is about right for Geist prose and **underestimates mono caps
by 36%** — the spread across this deck's own strings is 0.434 to 0.654, a factor of 1.51.
Two consequences fell straight out of the measurement:

- `OWNERSHIP` at 11pt mono caps needs **68.1pt** and the axis column at 14% of 640 gave only
  65.6pt. The column was widened to **17%** (84.8pt of ink) rather than shortening the word.
  A 0.48 estimate would have predicted 47.5pt and the label would have wrapped, taking the
  whole ledger row with it.
- `CALENDAR` needed 57.5pt in the same 65.6pt cell — 8pt of slack, which is not slack.

Lines that must not wrap, with measured slack at the width they actually get:

| line | size / width | needs | slack |
|---|---|---|---|
| `The error budget is the part that actually stops work` (longest h1) | 23pt / 639.8pt | 572.1 | 67.7 |
| `A declared maintenance window` (widest ledger cell) | 14pt / 240pt | 215.3 | 24.7 |
| `Spend the budget` (tightest node label) | 15pt / 140.3pt | 126.6 | 13.7 |
| `An exception each time` (tightest card header) | 15pt / 180pt | 168.5 | 11.5 |
| `Until these three are answered…` (closing band) | 16pt / 639.8pt | 586.3 | 53.5 |
| `Crossing it changes what ships next.` (tightest panel item) | 14pt / 278.7pt | 240.8 | 37.9 |
| `OWNERSHIP` (widest mono caps label) | 11pt / 84.8pt | 64.7 | 20.1 |

Three candidate lines were **rejected on measurement**. The slide-03 band
`A budget nobody spends was never a promise. A budget spent with no consequence was never a
budget.` needed 623.6pt of 640 in the first (narrow) pass alone, so it was cut to the first
sentence and the second idea moved into the right-hand column body. The slide-06 closing
statement and two slide-02 panel items were rejected in the render pass; all three are in
`gate-pass-b.md`. Paragraphs that are *allowed* to wrap (column bodies, card bodies, the
cover standfirst) were checked for line count, not for fit.

---

## slide-01 — cover
- 레이아웃: kicker row + 1px rule (same y as every sheet) · below it two columns split by a
  full-height 1px hairline. Left: 36pt display in three deliberately broken lines, a two-line
  standfirst, and the presenter placeholder pinned to the bottom. Right: a mono contents
  index, `02 / THE SWITCH` … `06 / THE DECISIONS`, one hairline-separated row each.
- 핵심 메시지: the title is the whole argument — a promise and a refusal are the same act.
- 의도: the visual anchor is the giant type against the mono index; the index also tells the
  room the shape of the next fifteen minutes. Presenter is `Presenter · Team`, a placeholder;
  no name is invented.

## slide-02 — An SLO is not a quality metric. It is a switch.
- 레이아웃: two equal panels, 1px hairline border each, each opened by a 3px bar that is
  `transparent` on the left panel and `#000000` on the right. Three hairline-separated items
  per panel, vertically distributed with `flex:1 1 0`. Bottom band above a 1px rule.
- 핵심 메시지: the same number read two ways. As a metric it describes; as a switch it
  decides. Only one of those changes what happens next week.
- 의도: the emphasis is carried entirely by the 3px bar and bold text — no colour — which is
  exactly the spec's emphasis mechanism and exactly the deck's claim.
- band: `A target that has never stopped anything is a dashboard with a threshold drawn on it.`

## slide-03 — The error budget is the part that actually stops work
- 레이아웃: horizontal 4-step process across the full 640pt — nodes 142pt wide, 1px hairline,
  no fill, mono `01`–`04` above a 15pt label, joined by 24pt inline-SVG connectors with 6px
  outline arrowheads. Step `04` carries the 3px emphasis bar; the other three carry the same
  bar in `transparent`. Below: two columns, mono caps label over body. Bottom band.
- 핵심 메시지: `Name the target → Spend the budget → Hit the floor → Stop the work`. The
  budget is what converts a stated target into a condition that fires on its own.
- 의도: the only sheet with a diagram, and it is the mechanism sheet. Left column says why it
  is a budget (one account, drawn down by every failure, so nobody has to agree things are
  bad). Right column says why it is a switch (zero is a condition on a pre-written rule, not
  a discussion item).
- band: `A budget nobody spends was never a promise.`

## slide-04 — The exclusions are the promise, written down
- 레이아웃: comparison table per the spec — header row `#F2F2F2` fill, 1px hairline cells,
  three columns (`AXIS` 17% / `IN THE PROMISE` 41.5% / `OUT, BY NAME` 41.5%), four rows at
  `flex:1`. The out column carries the 3px emphasis border; the in column carries the same
  border in `transparent`.
- 핵심 메시지: four axes on which an SLO draws a line — surface, fault, calendar, ownership —
  and what falls outside each on purpose. The refusals are the load-bearing half.
- 의도: this is the sheet the brief asks to weigh equally with the coverage. It is a ledger,
  not prose, because an exclusion is only real if you can point at the row.
- rows: SURFACE · FAULT · CALENDAR · OWNERSHIP
- band: `An exclusion you never wrote down becomes an argument during the incident.`

## slide-05 — Three ways an SLO stops being a switch
- 레이아웃: three equal cards, 1px hairline, mono `01`–`03` at top, 15pt card header, body
  pinned to the bottom of the card above a 1px internal rule so all three bodies share a
  baseline. Bottom band.
- 핵심 메시지: the target nobody chose · the budget with no teeth · the exception made every
  time. Each one leaves the number intact and removes the mechanism.
- 의도: no card is emphasised — these are three equal failure modes and marking one would be
  a claim the deck cannot support. Uniform treatment is the honest one, and it sets up the
  three decisions on 06 one-for-one.
- band: `Each of these is a decision nobody wrote down, showing up later as a habit.`

## slide-06 — What we need to decide
- 레이아웃: three full-width rows separated by 1px rules, each `mono 01` + 16pt question +
  14pt one-line elaboration. Closing band sits above a **3px** rule — the only 3px horizontal
  rule in the deck, marking the end.
- 핵심 메시지:
  - `01 What actually stops` — name the work that halts when the budget is gone, and the work
    that does not.
  - `02 Who declares it` — one role who can say the budget is gone without convening anyone.
  - `03 What we refuse to promise` — the exclusions, written down before the first incident
    asks for them.
- 의도: these are the three decisions the brief names, and they map one-to-one onto the three
  failure modes on 05, so the closing sheet reads as the answer to the previous one rather
  than a new list.
- band: `Until these three have answers, we have a metric — and metrics do not stop anything.`
