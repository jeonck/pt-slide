# Logs cost the most and get read the least — slide outline

## meta
- deck: `decks/observability-cost`
- mode: html
- style: **`ppt-editorial-product-deck`** (bundled) — chosen, see "why this style". `show-design`
  output treated as a contract; the `## Avoid` list is reproduced under "contract" below.
- slide-size: 720pt × 405pt
- language: English
- audience: the people who sign the observability invoice and the platform engineers who
  generated it. Both have been told "it's observability" and had no way to push back.
- tone: an argument, not a scolding and not a report. Every claim has to survive
  "why does that follow?" without a number behind it.
- slides: 6 (cover · three signals · the divergence · the two bets · the bundle · decide)
- charts: **none.** See "no figures, and why". The style's two chart tokens `#C8BFAD` and
  `#9B917F` are therefore **declared and never used**, and no `<canvas>` appears anywhere.
- fonts: **Source Serif 4** 400/600 and **Inter** 400/500/600, all `@fontsource/*` woff2
  copied into `./assets/fonts/`. The four Pretendard faces the scaffold installs were deleted
  by hand — this deck has no Hangul and they are ~3MB of dead weight. No `http(s):` URL
  appears in any saved slide.

## why this style
Three were on the shortlist. `ppt-editorial-product-deck` wins on three specific counts:

1. **This deck has no data, and this style does not need any.** Its stated hierarchy comes
   from *typeface contrast* — serif headings against sans body — not from colour, KPI tiles
   or chart blocks. `ppt-every-golden-grid-keynote` carries a 55pt `kpi` token and eight
   chart tokens and its Avoid list forbids leaving a golden block holding one element, which
   pushes toward figures I cannot source. `ppt-expressive-material` is four accents, 28pt
   blobs and "playful" — the wrong register for an invoice nobody can argue with.
2. **It has exactly one accent.** The argument has exactly one villain (the log line), so one
   terracotta marks it and nothing else competes.
3. **It has a mandatory `slide.source_caption: fixed bottom-right` slot.** That is the slot
   the brief asks me to fill with the fact instead of a citation, and this is the only one of
   the three styles that defines one.

The cream `#F7F4EE` also does not collide with the decks already in this repo.

## no figures, and why
There is no chart, no bar, no cost-per-GB and no retention curve in this deck, and there is
no repository or citable source behind any such number. A cost argument *pulls* hard toward a
figure — "logs are N× the metrics bill", "retention costs $X/GB/month" — and every one of
those numbers exists in vendor marketing and nowhere I can cite. Inventing one is Critical
under the gate's content-discipline check, and it would also be the weakest part of the
argument, because the thesis is **structural**, not empirical:

- log volume is a *product* (traffic × lines-per-request × replicas × days retained) while
  log readership is a *constant* (incidents × engineers × a window of minutes), and a product
  beats a constant regardless of what the constants happen to be;
- the three signals answer different questions, so they are not substitutes at any price.

Neither claim needs a magnitude to be true, and neither is weakened by not having one. The
fact is recorded in the fixed bottom-right source caption on **every one of the six sheets**:
`Source: none — this deck cites no cost figures; the argument is structural.`

## contract (from `npx slides-grab show-design ppt-editorial-product-deck`)
- bg `#F7F4EE` · surface `#FCFAF5` · text `#1F1B16` · text-muted `#7A7164`
- accent `#B5503A` · border `#DAD3C4` · chart `#C8BFAD`, `#9B917F` (**unused**)
- display **Source Serif 4** 44pt w600 −0.01em leading 1.15 · heading SS4 30pt w600 −0.005em
- kicker **Inter** 11pt w500 +0.10em · body Inter 18pt w400 leading 1.5 · card_header Inter
  15pt w600 · kpi SS4 40pt (**unused** — no KPI figures) · caption Inter 10pt w400
- spacing unit 8 · margin_x 0.8in · margin_y 0.65in · gutter 0.18in · 12 columns
- header_band 0.65–1.7in · hairline 0.75pt `#DAD3C4` (rule left 0.12in `#B5503A`)
- **source_caption fixed bottom-right** · radius 4px · border 0.75pt `#DAD3C4` · shadow none
- diagram: hairline document graphic, no-fill nodes 4px radius, 0.34in no-fill step badges
  with SS4 numerals, 2–3 column comparison with 0.75pt vertical dividers and no column fill
- **Avoid:** never pure white `#FFFFFF` — cream only · never serif body / sans heading ·
  never two accents, never colour on body text · no radius ≥8px, no shadow, no gradient,
  no glow · no 3D / rainbow / gridline-heavy / boxed / truncated-axis / div-block charts ·
  nothing centre-aligned — body is left-aligned and snapped to the 12 columns · no emoji
  bullets, clipart or stock icons · never more than 7 lines of prose on a sheet

## design decisions recorded against the contract
1. **Point sizes are scaled, then floored.** The spec targets 13.33 × 7.5in; this canvas is
   10 × 5.625in, a 0.75 factor. Straight scaling puts kicker at 8.25pt, body at 13.5pt and
   caption at 7.5pt — all under the framework's floors. So sizes are scaled where scaling
   stays legal and floored where it does not: display 44 → **56pt on the cover / 44pt on the
   closing sheet** (scaled *up*: a cover with no image needs a type anchor and the strings
   measured short enough to afford it), heading 30 → **26pt**, body 18 → **16pt**, secondary
   body **14pt**, kicker/labels/caption held at **11pt** rather than scaled to 8.25/7.5.
   **Nothing anywhere in this deck is below 11pt.**
2. **Margins rounded to the 8pt spacing unit.** 0.8in × 0.75 = 43.2pt and 0.65in × 0.75 =
   35.1pt → **40pt horizontal, 32pt vertical**. Content width is therefore **640pt**: 12
   columns of 46pt with 8pt gutters (0.18in × 0.75 = 9.7 → 8, the spacing unit).
3. **`#7A7164` is secondary ink only.** Measured against `#F7F4EE` it is **4.39:1** — over the
   4:1 bar for supporting text, under the 4.5:1 bar for body. It is used for kickers, micro
   labels and the source caption, never for a sentence the audience has to read. All body
   prose is `#1F1B16`.
4. **`#B5503A` at 4.58:1 clears 4.5:1**, so it is legal as text, but it is still used almost
   entirely as *rule*, not as ink: the 6pt left rule on the cover lede, on slide 04's closing
   and on slide 06's last line, plus the 3pt top rule that marks the Logs column on slide 02.
   Two accent-coloured words exist in the whole deck (slide 03's `product` / `constant`).
   Never below 16pt, per the Avoid list's "no colour on body text" read conservatively.
5. **"rule left 0.12in #B5503A" is read as a left-edge rule, not a segment of the hairline.**
   0.12in × 0.75 = 6.5pt, rounded to **6pt**, applied as `border-left` on callouts. This is
   the standard editorial callout idiom and the only reading that makes the measurement
   meaningful.
6. **The header band is interpreted as 32pt → ~106pt** (spec 0.65–1.7in × 0.75 = 35.1 →
   91.8pt). Kicker + hairline sit at the top of it and the 26pt heading finishes ~14pt below
   its nominal bottom. Recorded rather than forced: pulling the heading up would put it
   inside the rule.
7. **Emphasis never changes a box.** Slide 02's three signal columns all carry
   `border-top: 3pt solid transparent` and `border-left: 0.75pt solid #DAD3C4`; only the Logs
   column's *top-border colour* changes. Slide 04's two ledger rows are identical boxes. This
   is the "emphasise one and only that one shifts" trap, avoided by giving every peer the
   space and varying only the value.
8. **No icons.** The Avoid list bans stock icons and clipart; the only marks in the deck are
   the spec's own step badges (slide 06), hairline rules and the `×` operators on slide 03,
   which are text in semantic tags, not graphics.
9. **Radius 4px only, shadow nowhere.** The two panels on 03 and the strip on 05 are
   `#FCFAF5` on `#F7F4EE` with a 0.75pt `#DAD3C4` border and 4px radius — the spec's exact
   "one tone brighter, stepped without shadow" device.
10. **Leading floors override the spec.** The spec gives display 1.15; the framework floor is
    1.2 for large display and 1.4 for body. Applied: **1.2** display, **1.25** headings,
    **1.5** body, **1.4** on every label including the single-numeral step badges.
    `line-height: 1` appears nowhere.

## budget — computed before any slide HTML was written

### measured advance coefficients
Measured, not estimated, with `_measure-obs.mjs` (the skill's snippet, extended to sweep every
probe string at once) against this deck's own woff2 files in headless Chromium. All-caps
labels were measured **separately** from mixed-case prose, and the spread is the whole reason
to measure:

```
width ÷ (chars × font-size)                          coef        pt per char
  Source Serif 4 600, mixed case, −0.01em, 46pt      0.455–0.482  20.9–22.2
  Source Serif 4 600, mixed case, −0.01em, 40pt      0.496–0.590  19.9–23.6   (short strings)
  Source Serif 4 600, mixed case, −0.005em, 26pt     0.483–0.493  12.57–12.81
  Source Serif 4 600, mixed case, −0.005em, 18–24pt  0.505–0.568   9.48–12.11
  Inter 400, mixed case, 14pt                        0.454–0.518   6.35–7.25
  Inter 400, mixed case, 15–16pt                     0.469–0.483   7.21–7.73
  Inter 400, mixed case, 11pt                        0.495–0.499   5.44–5.49
  Inter 500, ALL CAPS +0.10em, 11pt                  0.693–0.792   7.62–8.72
```

**The caps row is 1.4–1.7× the prose row of the same face.** `Cannot answer` set as a tracked
uppercase label is 0.792 where the same face setting a sentence is 0.47. Budgeting the micro
labels off the prose coefficient would have under-read them by ~60%, and it changed a layout:
slide 02's row-label rail was planned at 88pt off an estimate and **`COST GROWS WITH` measures
125.3pt**, so the label was cut to `GROWS WITH` and the rail widened to 100pt.

### vertical — what `main` actually gets
Fixed furniture on all six sheets, both **siblings of `main`** in the body flex column so they
sit at a constant y: a kicker + 0.75pt hairline `header`, and a 0.75pt hairline + caption row
`footer` carrying the mandatory bottom-right source caption. The live risk is `main`'s own
children overflowing under that footer, which `validate` passes silently.

```
405
  − body padding 32 top + 32 bottom                     = 341
  − kicker 11pt × 1.4 = 15.4                            = 325.6
  − kicker→rule margin 8 + hairline 0.75                = 316.85
  − main margin-top 20                                  = 296.85
  − footer margin-top 16 + hairline 0.75                = 280.1
  − footer padding-top 8 + caption 11 × 1.4 = 15.4      = 256.7
→ main = 256.7pt on every sheet

content sheets, inside main:
  − h2 26pt × 1.25 = 32.5 + margin-bottom 14            = 46.5
→ content region = 210.2pt
```

**Render-verified**: `main` measures **256.74pt** on all six sheets (top 76.13 → bottom
332.87), matching the 256.7 above. Final spend, measured off the built slides:

- **01** h1 151.2 (2 × 75.6) + 22 + lede 47.98 (2 lines) = 221.2; presenter rail 15.4 pinned
  to 332.87 by `margin-top:auto` → **236.6** of 256.74
- **02** signal row 44 + three grid rows 54.55 each = 163.7 → **207.7**, filling the full
  210.2 content region exactly; rows are `minmax(min-content, 1fr)` so they stay equal and
  cannot clip
- **03** panels stretch to fill (`flex:1`, items on `space-between`) + closing 23.99 at the
  bottom → **210.2** of 210.2, no trailing air
- **04** ledger 130.75 + closing 47.98 (2 lines) pinned by `margin-top:auto` to 332.87 →
  **207.6** of 210.2
- **05** strip 56.4 + 18 + three columns 84.4 + closing 23.99 pinned by `margin-top:auto` →
  **207.6** of 210.2
- **06** no h2: left column h1 178.21 + standfirst 42 pinned to 332.87; right column three
  rows 199.4 + accent closer 21 pinned to 332.87. **Both columns' last elements share the
  same bottom edge** — that alignment is deliberate and is what closes the sheet

### horizontal — character ceilings for lines that must not wrap
```
content width 640pt.

h2 heading   SS4 600 26pt, 12.81 pt/char worst → 640 ÷ 12.81 = 49 chars; longest written = 47
             ("Volume grows with traffic. Readership does not." = 597.6pt, 42pt spare)
cover disp   SS4 600 56pt, 20.9 pt/char → 640 ÷ 20.9 = 30 chars
             "and get read the least" = 22 ch = 560pt ✓ (measured 460.1 at 46pt, scaled)
closing disp SS4 600 44pt in the 260pt left column → 260 ÷ 23.6 × (40/44) = 10 chars;
             "What we" = 181.7pt ✓ / "need to" = 152.9 ✓ / "decide" = 137.6 ✓
kicker       Inter 500 CAPS +0.10em 11pt, 7.64 pt/char → the 43-char kicker = 328.6pt of 640 ✓
caption      Inter 400 11pt, 5.49 pt/char → 74-char source caption = 406pt; footer left cell
             "01 / 06" = 40pt; 406 + 40 + gap ≪ 640 ✓
02 rail      Inter 500 CAPS +0.10em 11pt, 8.72 pt/char worst → 100pt rail ÷ 8.72 = 11 chars.
             `ANSWERS` 7 · `BLIND TO` 8 · `GROWS WITH` 10. `COST GROWS WITH` (15) does not fit
             and was cut — this is the ceiling that actually bit.
02 cell      Inter 400 14pt, 6.83 pt/char worst → column inner 147pt = 21 chars/line, 2 lines
             = 42 chars. Every cell written ≤ 40.
03 item      Inter 400 14pt → panel inner 282pt = 41 chars, one line each. Longest written
             ("Days retained, indexed, replicated" = 34) = 230pt ✓
04 cell      Inter 400 14pt → cell inner 208pt = 30 chars, one line each. Longest written
             ("The shape of normal traffic" = 27) = 184pt ✓
05 column    Inter 400 14pt → column inner 180.5pt = 26 chars/line, 3 lines = 78 chars
06 question  SS4 600 18pt, 9.66 pt/char → 330pt cell = 34 chars; longest = 18
06 sub       Inter 400 14pt, 7.25 pt/char worst → 330pt = 45 chars; longest = 45
             ("One named owner for each window we pay for" = 304.5pt ✓)
```

## what the render caught that `validate` did not

Six defects, all found by opening the 1920×1080 PNGs. `validate` reported **6/6 passing, 0
errors, 0 warnings** while five of these were on screen. (The sixth — serif leading — was the
one thing `validate` did catch, and it is listed here because the *cause* was a spec value.)

| Sheet | Defect | Fix |
|---|---|---|
| 02 | **The 3pt accent mark repeated on every grid cell.** I put `border-top: 3pt` on `.compare > *` so every peer would reserve the space, then coloured the Logs cells — which produced four separate terracotta bars striping the Logs column instead of one mark, and made that column read as a boxed table nobody else was in. | The mark moved to the signal-header row only: `.signal { border-top: 3pt solid transparent }` on all three, `.signal.col-mark { border-top-color: #B5503A; color: #B5503A }` on Logs. Every header keeps the same box; one bar, one coloured word. |
| 02 | **`GROWS WITH` wrapped to two lines** in the 100pt row-label rail, so that row's label block was taller than the other two and the label column read ragged. Measured cause: the label needs 87.2pt but the rail's *available* width was 84pt — I budgeted against the 100pt box and forgot its own 16pt `padding-right`. Exactly the "available width is not box width" trap. | Rail widened 100 → **112pt** (96pt available). Columns absorbed the 12pt. |
| 02 | **Row labels sat ~11pt below their cells' first lines**, so nothing in the label rail lined up with anything it labelled. Cause was CSS specificity, not layout: `.compare .col { padding: 0 16pt }` (two classes) beat `.cell { padding-top: 11pt }` (one class) and zeroed the cells' top padding, while the labels kept theirs. | Shorthand split into `padding-left`/`padding-right`, and the row padding restated at matching specificity: `.compare .cell { padding-top: 11pt }`, `.compare .rowlab { padding-top: 12pt }` (the extra 1pt cap-aligns 11pt uppercase against 14pt prose). |
| 03 | **A ~70pt hollow band above the footer rule.** The two panels sat at their content height in a `main` that had more to give, so the whole sheet floated in the top two-thirds. | `.panels { flex:1 }`, `.panel { display:flex; flex-direction:column }`, `.factors { flex:1; justify-content:space-between }`. The panels now fill and the four factors distribute — the sheet is filled by *layout*, with no invented content. |
| 04 | **The closing callout ran to three lines and its descenders touched the footer hairline** — zero clearance. The copy was 172 characters against a measured 2-line ceiling of ~159 at 16pt in the 618pt ruled column. | Copy cut to 118 characters (2 lines, 47.98pt), and `.close-04` given `margin-top:auto` so it pins to `main`'s bottom edge with the footer's own 16pt margin as clearance. The shorter line is also the better sentence. |
| 06 | **The accent rule was twice the height of the text it ruled.** `.close-06` carried both `margin-top:auto` and `padding-top:16pt` on the same element as `.accent-note`'s `border-left`, so the 6pt bar spanned the padding as well and hung above the line. | Padding dropped; `margin-top:auto` alone does the spacing, and margins are outside the border box. |
| 06 | **The two columns ended at different heights** with ~45pt of dead air under both. | Both closing elements pinned with `margin-top:auto` (`.left` made a flex column for it). The standfirst and the terracotta line now share a bottom edge, and the freed space becomes one deliberate gap in each column rather than trailing air. |

`validate` also flagged one thing worth recording because the *spec* caused it: **Source Serif 4
clips at the leading the style specifies.** `display: leading 1.15` produced `text-clipped` on
every serif heading in the deck at 18, 20, 24, 26, 44 and 56pt — the face's ascent+descent
exceeds 1.15em, so descenders left the line box at every size, not just the large ones. All
serif type in this deck is set at **1.35**, the framework floor applied upward. Recorded in
`design-debt.md` as a deliberate deviation from the style spec.

## visual thesis
A finance memo that happens to be about telemetry. Warm cream paper, a serif that argues and
a sans that itemises, one terracotta rule pointing at the log line, and a hairline grid that
never moves between sheets. The reader should feel they are being handed something they can
mark up — not a dashboard, and not a vendor pitch.

## content plan
cover states the claim → what the three signals actually answer, so nobody can call them
substitutes → why the log bill is a product and log readership is a constant → what sampling
and retention actually trade, including the fact that you settle the trade at 03:00 → why one
line item cannot be argued with, and the three axes that unbundle it → the three decisions

---

## slide-01 — cover
- Layout: kicker rail + hairline. `h1` 56pt Source Serif 4 in two lines, `and get read the
  least` carrying the turn. Lede below on a 6pt terracotta left rule. Presenter placeholder
  pinned to the bottom of `main` by `margin-top:auto`. Fixed footer with the source caption.
- Key message: the claim, stated flat, with the reason it matters in one sentence under it.
- Intent: the type anchor the gate requires on a cover. There is no image and no figure, so
  56pt of serif is the anchor, and the terracotta rule is the only colour on the sheet.

## slide-02 — Three signals answer three different questions
- Layout: a 100pt row-label rail (`ANSWERS` / `BLIND TO` / `GROWS WITH`) and three equal
  comparison columns — Metrics, Logs, Traces — separated by 0.75pt vertical dividers with no
  fill, per `diagram.comparison`. Every column carries `border-top: 3pt solid transparent`;
  only the Logs column's is `#B5503A`.
- Key message: the three are not substitutes and not one product. Each answers a question the
  others cannot, and each has a different thing that makes it expensive.
- Intent: kill the "just turn observability down" move before the cost argument starts. If
  they were substitutes, the cheapest one would win and there would be nothing to decide.

## slide-03 — Volume grows with traffic. Readership does not.
- Layout: two `#FCFAF5` panels, 0.75pt border, 4px radius, no shadow. Left, `WHAT MULTIPLIES`
  — four factors, the last three prefixed with a terracotta `×` in a fixed 14pt marker column
  so every row's text starts on the same x. Right, `WHAT DOES NOT` — four bounded quantities
  in the same grid with the marker cell empty. One closing line beneath both.
- Key message: the log bill is a product of four decisions; log readership is bounded by how
  many incidents there are and how many people read logs during one. A product beats a
  constant, and that gap is the entire cost story.
- Intent: **this is the sheet that would have carried a chart.** It makes the magnitude
  argument structurally instead — what multiplies against what does not — so no figure is
  needed and none is implied.

## slide-04 — Sampling and retention are bets, not savings
- Layout: a three-column ledger — term (18pt serif) / `WHAT IT KEEPS` / `WHAT IT SPENDS` —
  two identical rows split by a 0.75pt hairline. Beneath it, a closing block on a 6pt
  terracotta left rule.
- Key message: neither is a saving. Sampling keeps the shape and spends the specific instance;
  retention keeps now and spends the comparison to last time. You discover which bet you took
  at 03:00, from a query that returns nothing, and the bet was placed months earlier in a
  budget review where nobody wrote down that it was a bet.
- Intent: the brief's "you find out only during an incident" case, and the reason the closing
  decisions have to be made deliberately rather than by whoever last tuned a config.

## slide-05 — You cannot argue with one line item
- Layout: a full-width `#FCFAF5` strip holding `Observability` at 24pt serif with the
  one-question line beside it, then three comparison columns — `BY SIGNAL`, `BY VERBOSITY`,
  `BY WINDOW` — then one closing line.
- Key message: a single line item admits only approval or refusal. Split it along the three
  axes that actually drive it and each becomes a negotiation with a right answer.
- Intent: turn the diagnosis into something actionable, and set up the three decisions on 06
  so the closing sheet asks for decisions the audience has already been shown how to make.

## slide-06 — What we need to decide
- Layout: no h2. Left column (260pt) carries the 44pt serif display over three lines plus a
  standfirst. Right column (360pt) carries three numbered rows, each a 0.34in-scaled no-fill
  step badge with a Source Serif 4 numeral, an 18pt question and a 14pt qualifier, split by
  0.75pt hairlines. A final terracotta-ruled line pinned with `margin-top:auto`.
- Key message: what gets sampled, what gets dropped, who owns retention — and none of the
  three is a tooling decision.
- Intent: the closing sheet asks for exactly the three decisions the brief names, each phrased
  so that "we'll look into it" is not one of the available answers.
