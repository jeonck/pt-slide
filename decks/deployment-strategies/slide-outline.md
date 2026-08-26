# Deployment strategies — rolling, blue-green, canary · slide outline

## meta
- deck: decks/deployment-strategies
- mode: html
- style: `ppt-bold-block-infographic-deck` (bundled). **Assigned, not chosen** — no style
  selection was made by this deck.
- slide-size: 720pt × 405pt
- language: English
- audience: the platform / SRE group that owns the release path, and the service teams whose
  releases go through it
- tone: a mechanism argument, not a recommendation. Every claim is about how the thing works,
  never about how well it performed somewhere.
- slides: 5 (cover · three strategies side by side · the two deciding questions · what each
  strategy demands · what we have to decide)
- charts: **none.** See "no chart, and why" below.
- fonts: Archivo 700/800 (display, block numbers) and Inter 400/600/700 (body, captions),
  embedded under `./assets/fonts/`. Pretendard deleted — no Hangul in this deck.

## no chart, and why
The style's spec is unusually chart-forward: it fixes bar geometry, value-label type, delta
colours and an emphasis rule, and its Avoid list is largely a list of chart regressions. **No
chart appears in this deck anyway.** Every number that would fill one — rollback duration,
change-failure rate, the cost multiple of running two environments, canary bake time — would
have to be invented or lifted from a vendor benchmark that does not describe this platform.
The deck argues from mechanism instead: what each strategy *does* to get the new version
serving traffic, and what it *does* to stop serving it. The spec's chart tokens are therefore
unused, and the block-diagram half of its vocabulary (comparison columns, 2×2 matrix,
colour-block bands, quote block) carries every slide.

## design tokens (from `slides-grab show-design ppt-bold-block-infographic-deck`)
- bg `#FFFFFF` · surface / accent 1 `#2A2D34` (charcoal) · accent 2 `#E8A317` (amber)
  · accent 3 `#1F8A82` (teal) · text `#2A2D34` · text muted `#6B6F76` · text inverse `#FFFFFF`
- Exactly these five values are used. No sixth colour, no tint, no gradient, no shadow,
  no border. `#C0392B` (delta down) is in the spec but unused — there are no deltas.
- Corner radius 0 everywhere. Blocks are separated by white gutters, never by rules or borders.
- Type: display Archivo 800; block numbers Archivo 800; card headers Inter 700 uppercase
  tracking 0.06em; body Inter 400/600; captions Inter 600.

### the amber rule this deck adopts
The spec allows **one** amber emphasis block per slide. This deck spends it on the same idea
every time — the rollback question, which is the deck's thesis:

| Slide | Amber block |
|---|---|
| 01 | the thesis block |
| 02 | the `HOW IT ROLLS BACK` row label |
| 03 | the quadrant where rollback speed and traffic splitting are both demanded |
| 04 | `A ROLLBACK THAT IS TESTED` |
| 05 | the bar on the closing quote |

Amber never marks a recommended strategy in this deck. That is a deliberate departure from the
spec (below), because the deck's thesis is that no strategy is recommended in the abstract.

### budget, computed before any slide HTML was written

```
VERTICAL — content sheets (02–04)
  405
  − body padding            27 top + 24 bottom      =  354
  − header row              h1 24pt × 1.3 = 31.2
                            + margin-bottom 14      =   45.2
  → main                                            =  308.8pt

  The 27pt sheet-number square sits on the header row beside h1, so it adds no height
  (max(31.2, 27) = 31.2). It is the fixed furniture whose y depends on h1 staying one line.

  slide-02  columns 259 (= 308.8 − amber strip 42 − gap 8)
            header band 38 + 3 rows × 73.7; a row needs 8+8 padding + label 14 + gap 2
            + value 14pt × 1.4 × 2 lines 39.2 = 71.2 ≤ 73.7  → values capped at 2 lines
  slide-03  matrix 258 (= 308.8 − caption 30 − x-axis label row 20)
            quadrant (258 − 4 gutter) / 2 = 127; needs 28 padding + name 25 + gap 6
            + 3 lines 58.8 = 117.8 ≤ 127
  slide-04  3 bands × 88 + 2 gutters × 6 = 276, + caption 30 = 306 ≤ 308.8
            band needs 24 padding + 3 lines 58.8 = 82.8 ≤ 88

VERTICAL — cover and closing (01, 05): no header row, padding 24 all round
  405 − 48 = 357pt for the block grid.
  01  left column: charcoal block flex:1 + amber thesis block (auto, padding 20)
      right column: 3 stacked blocks (357 − 12) / 3 = 115 each
  05  quote block 130 + gap 6 + 3 decision blocks 221

HORIZONTAL
  content width 720 − 60 = 660pt.
  h1 shares its row with the 27pt sheet square + 16pt gap → 617pt, take 584pt as the budget.
    Archivo 800 at 24pt → 584 ÷ (24 × 0.52) ≈ 46 chars.  Titles written to ≤ 42.
    Longest actual title: "What each strategy demands before it works" = 42.
  slide-02 column cell: (660 − rail 108 − 6 − 12) / 3 = 178pt block − 24 padding = 154pt.
    Inter 600 at 14pt → 154 ÷ (14 × 0.50) ≈ 22 chars/line → 2-line values capped at 44 chars.
  slide-01 cover title: block 417 − 56 padding = 361pt. Archivo 800 at 40pt →
    361 ÷ (40 × 0.52) ≈ 17 chars/line. "Deployment" / "strategies" split with an explicit <br>.
  slide-05 pull-quote: 672 − amber bar 10 − 56 padding = 606pt. Archivo 800 at 22pt →
    606 ÷ (22 × 0.52) ≈ 53 chars/line, 2 lines = 106. Quote written to 101.

  Coefficient: 0.52 for Archivo 800 and 0.50 for Inter 600, raised from the repo's measured
  0.48 (Arimo 700) because both faces here run wider at weight 700–800. Estimates only —
  every one-line element is checked in the render.

  MEASURED AFTER THE FIRST RENDER: Inter 400 at 14pt came out at 0.52, not 0.50 — "How long
  may a bad" measured 131pt for 18 characters on slide-05. That 4% error is why slide-05's
  first question wrapped to four lines while its siblings took three. Both budgets otherwise
  held: 5/5 on the first validate, no title wrapped, no block overflowed its furniture, and
  the only two fixes the render forced were vertical voids, not overflows. **Use 0.52 for
  Inter 400/600 and 0.52 for Archivo 800 next time.**
```

## deviations from the spec, recorded
1. **White-inverse text on the amber block is replaced by charcoal text.** The signature says
   text on colour blocks inverts to white. White on `#E8A317` measures **2.17:1** — under the
   gate's own legibility bar and unreadable at presenting distance. Charcoal `#2A2D34` on amber
   measures **6.46:1**. Every amber block in this deck carries charcoal ink. White inversion is
   kept on charcoal (21:1) and teal (4.19:1).
2. **Prose never sits on teal.** Teal/white is 4.19:1 — fine for the short bold labels and
   values the comparison columns carry (≥14pt at weight 600), short of 4.5:1 for running body
   copy. Teal blocks hold labels and values only; all multi-line prose sits on white or on
   charcoal. Logged in `design-debt.md`.
3. **No amber "recommended" column on slide 02 and no amber "recommended quadrant" meaning on
   slide 03.** The spec's comparison and matrix vocabularies both reserve amber for a
   recommended option. Recommending one of the three would contradict the thesis, so amber
   marks the *rollback* row and the *most demanding* quadrant instead, and slide 03 says so in
   its caption.
4. **Type sizes are not the spec's absolute points.** The spec targets a 13.33in canvas; this
   one is 10in, a 0.75 factor. Its body 18pt → 13.5pt, card header 13pt → 9.75pt and caption
   11pt → 8.25pt all fall under the framework's 14pt body / 10pt absolute floors. Body is 14pt,
   card headers 10–13pt, captions 10pt here. Display and block numbers are scaled down rather
   than up: display 32 → 24, block number 64 → 32–44, quote 28 → 22. The 200pt section number
   is not used at all — nothing on a 405pt-tall sheet can carry it.
5. **Comparison columns have no separate 0.7in header band colour.** The band is the same fill
   as its column, separated by the spec's white hairline. Giving three columns three different
   band colours would have needed a fourth colour or made amber non-singular.

## visual thesis
Solid charcoal, amber and teal blocks on white, angular, no borders and no shadows, packed
close with thin white gutters. The blocks are not decoration — a block *is* a strategy, a
quadrant, a prerequisite. Nothing floats and nothing is centred twice: the block placement is
different on every sheet. The audience should feel they are reading a wiring diagram of the
release path, not a slide about it.

## content plan
cover → the three mechanisms side by side → the two questions that select one → what each
strategy demands of you before it works → what we have to decide

---

## slide-01 — cover
- Layout: left column = charcoal block (flex:1) + amber thesis block (auto) beneath it; right
  column = three stacked blocks, teal / charcoal / teal, each a strategy with a 40pt number.
  Five blocks, asymmetric split ~62 / 38.
- Charcoal block: eyebrow `RELEASE ENGINEERING · PLATFORM`, title `Deployment<br>strategies`,
  subtitle `Rolling · Blue-green · Canary`, `PRESENTER · TEAM` pinned to the bottom.
- Amber block (charcoal ink): the thesis — the strategy is not a matter of taste; it is decided
  by how fast you must be able to roll back and by whether traffic can be split.
- Intent: the anchor is the 40pt Archivo title inside a charcoal block; the three numbered
  blocks on the right announce the deck's spine before a word of argument.

## slide-02 — "Three ways to replace a running version" (39 chars)
- Layout: `diagram.comparison`. Left label rail (108pt, three stacked cells) + three
  full-height colour-block columns; amber strip across the bottom.
- Rail cells: `HOW IT RELEASES` (white, charcoal ink) · `HOW IT ROLLS BACK` (**amber**,
  charcoal ink) · `WHAT IT COSTS YOU` (white, charcoal ink).
- Columns, each with a name band then three rows split by 0.75pt white hairlines:
  - **01 ROLLING** (charcoal) — releases: replacing instances in batches · rolls back:
    re-deploying the old build, batch by batch · costs: one fleet, with headroom for the surge
  - **02 BLUE-GREEN** (teal) — releases: switching a router to a second full stack · rolls
    back: switching the router back · costs: two full environments at once
  - **03 CANARY** (charcoal) — releases: sending a slice of traffic to the new build · rolls
    back: withdrawing the slice · costs: request routing and per-slice telemetry
- Amber strip: only one of the three undoes a release by deploying again; the other two undo it
  by routing. That is the difference the rest of the deck turns on.
- Intent: one row of this table — rollback — is the whole argument, and it is the amber one.

## slide-03 — "The two questions that actually decide it" (41 chars)
- Layout: `diagram.matrix_2x2`. Left rail carries the y-axis question and its two ends; four
  quadrants with a 4pt white gutter; x-axis labels beneath; caption line last.
- y-axis rail (130pt, widened from 110pt after the first render so both labels break in two):
  `A BAD RELEASE MUST STOP AT ONCE` (top) / `A BAD RELEASE CAN WAIT FOR A REDEPLOY` (bottom)
- x-axis: `TRAFFIC CANNOT BE SPLIT BY REQUEST` (left) / `TRAFFIC CAN BE SPLIT BY REQUEST` (right)
- Quadrants:
  - top-left, teal — **Blue-green.** Stopping at once needs a switch, and a switch does not
    need per-request routing: a whole second stack is the coarsest possible split.
  - top-right, **amber**, charcoal ink — **Canary, over blue-green.** Both answers demanded:
    exposure is bought a slice at a time and withdrawn the same way.
  - bottom-left, charcoal — **Rolling.** If a redeploy is a fast enough exit, one fleet does it
    and nothing else is needed.
  - bottom-right, charcoal — **Rolling, still.** Splitting traffic buys staged exposure, not a
    faster exit. It does not change the answer on its own.
- Caption: amber is not the best strategy here, it is the most demanding one — and only one
  pair of answers puts you in it.
- Intent: two answers, four cells, no scoring. Removes the strategy question from taste.

## slide-04 — "What each strategy demands before it works" (42 chars)
- Layout: three horizontal bands, each = colour block (170pt, number + name) + white prose cell
  + small consequence chip. Six modules. Caption line at the bottom.
- Bands:
  - **01 HEALTH CHECKS THAT MEAN SOMETHING** (charcoal) — a check that only proves the process
    is listening will pass a broken release, and every one of the three strategies promotes on
    that signal. Chip (teal): `A BAD BATCH IS PROMOTED`
  - **02 A ROLLBACK THAT IS TESTED** (**amber**, charcoal ink) — a rollback path that has never
    been run is a plan, not a capability; the strategies differ only in how fast a working one
    can be triggered. Chip (charcoal): `THE EXIT IS UNTESTED`
  - **03 SESSIONS THAT SURVIVE** (teal) — all three serve two versions at once, if only for a
    moment; state pinned to an instance dies with the instance. Chip (charcoal):
    `USERS LOSE THEIR STATE`
- Caption: without these, a strategy does not fail loudly — it quietly degrades into the
  slowest exit you own.
- Intent: the prerequisites are the same three for everyone; the strategy only changes how
  expensive it is to be missing one.

## slide-05 — closing / what we have to decide
- Layout: charcoal quote block with a 10pt amber left bar across the top; three decision blocks
  beneath (charcoal / teal / charcoal), each with a 32pt number.
- Quote (white, 22pt Archivo): two answers pick the strategy — how long a bad release may keep
  serving, and whether traffic can be split by request. `PRESENTER · TEAM` bottom-right.
- Decision blocks:
  - **01 THE EXIT BUDGET** — how long may a bad release serve before we call it an incident?
    (Cut to three lines after the first render, so all three blocks read as a set.)
  - **02 THE ROUTER** — can our ingress split by request today, and if not, is buying that
    cheaper than running a second environment?
  - **03 THE DRILL** — when did we last roll back on purpose, and what did it cost while
    nothing was wrong?
- Intent: closes on the two questions as work items, not as a summary. No answers invented.
