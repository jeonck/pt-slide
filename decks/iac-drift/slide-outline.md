# Infrastructure drift — slide outline

## meta
- deck: decks/iac-drift
- mode: html
- style: `ppt-swiss-editorial-bold` (bundled) — **assigned, not chosen.** `show-design` output
  treated as a contract; the `## Avoid` list is reproduced under "contract" below.
- slide-size: 720pt × 405pt
- language: English
- audience: platform / infrastructure engineers and the people who own the pipeline they are
  asked to use. They have all made a console change during an incident.
- tone: mechanism, not scolding. Every claim has to survive "why does that happen?"
- slides: 5 (cover · what drift costs · why the console wins · one path · decide)
- charts: **none.** See "no figures" below.
- fonts: Archivo Black 400-file used at weight 900, and Inter 400/500/600/700, all embedded
  locally under `./assets/fonts/` from `@fontsource/*`. Pretendard deleted by hand after
  scaffolding — this deck has no Hangul, and four Pretendard faces are ~3MB of dead weight.
  No remote URL appears in any saved slide.

## no figures, and why
There is no chart and there are no numbers anywhere in this deck. Drift rates, "% of outages
caused by manual change", incident counts and mean-time-to-detect figures are all things that
exist in vendor marketing and nowhere we can cite. Inventing one would be Critical under the
gate's content-discipline check and, worse, would be the weakest part of the argument: the
thesis here is **mechanical** — the console is a valid write path, so writes go through it —
and a mechanism does not need a percentage to be true. Slide 02 therefore names a feedback
loop rather than sizing it.

## contract (from `npx slides-grab show-design ppt-swiss-editorial-bold`)
- bg `#F2F0EB` · surface / bg-invert `#111111` · text `#111111` · text-invert `#F2F0EB`
- accent 1 `#FF4A1C` · accent 2 `#0047FF` · border `#111111`
- display **Archivo Black** 130pt w900 tracking −0.03em · heading Archivo Black 44pt w900 −0.02em
- body **Inter** 24pt w400 leading 1.35 · caption Inter 14pt w500 tracking 0.08em
- spacing unit 8 · margin_x 0.7in · margin_y 0.6in · 12 columns · body_lines_max 6
- radius **0px** · border 1–3pt solid `#111111` · shadow **none** · spot_color_per_slide **1**
- decor: rect-color-block, rule-line, cropped-giant-type
- diagram: svg render, rectangle nodes, radius 0, 3pt solid rule connectors,
  filled-triangle arrowheads, square number badges with Archivo Black invert numerals
- **Avoid:** no gradient / shadow / curve / rounded corner · never two spot colours on one
  slide · never set type meekly small — giant type is the identity · no arbitrary drift off
  the grid (cropped giant type excepted) · **no emoji, icon, clipart or illustration — the
  visual vocabulary is type, blocks and rule lines** · no centred body text — left-aligned
  and asymmetric

## design decisions recorded against the contract
1. **Point sizes are scaled, not copied.** The spec targets 13.33 × 7.5in; this canvas is
   10 × 5.625in, a 0.75 factor. Display 130 → 97.5, heading 44 → 33, body 24 → 18, caption
   14 → 10.5. Applied: cover display 132pt (larger than the scaled value — it is a single
   short word and giant type is the identity), closing display 60pt, heading 34pt, body 18pt,
   secondary body 14–16pt, ledger labels 13pt caps, caption **11pt** (rounded *up* from 10.5
   to stay clear of the framework's 10pt floor). Nothing on any sheet is below 11pt.
2. **Margins rounded to the 8pt unit.** 0.7in × 0.75 = 37.8pt and 0.6in × 0.75 = 32.4pt →
   **40pt horizontal, 32pt vertical**, both multiples of the spec's 8pt spacing unit.
   Content width is therefore 640pt: 12 columns of 46.67pt with 8pt gutters.
3. **One spot colour for the whole deck, not one per slide.** The spec allows a different
   spot per slide; Pass A's system-consistency check wants a single accent. `#FF4A1C` is
   used on every slide and **`#0047FF` is never used.** Deliberate, recorded here.
4. **No accent-coloured text below 16pt.** `#FF4A1C` on `#F2F0EB` is roughly 3.4:1 — fine for
   display type and rules, not for body. Small emphasis is weight and rule lines instead.
5. **Two backgrounds only** — `#F2F0EB` canvas and `#111111` blocks. Invert text inside black
   blocks is `#F2F0EB` (about 16:1).
6. **No icons anywhere**, per the Avoid list. The step markers on 02, 04 and 05 are square
   number badges, which the spec's diagram vocabulary explicitly defines.
7. **Connectors are inline SVG** (`diagram.render: svg`) with filled-triangle arrowheads.
   The spec's `div`/table-bar prohibition is about charts, but the same reasoning applies to
   connectors, so no CSS-border triangles are used. The return-loop arrowhead is an SVG
   `<marker>` rather than a separate `<polygon>`, which also removes a `sibling-overlap`
   warning that the arrowhead would otherwise raise against its own line.
8. **Line-height floors override the spec's leading.** The spec gives body leading 1.35; the
   framework's floor is 1.4 for body and 1.2 for large display, because tighter leading clips
   ascenders and descenders. This deck uses 1.45 for body, 1.2 for display, and 1.4 even
   inside the fixed 22pt number badges.
9. **Emphasis never changes an element's box.** On slide 04 all four ledger rules are the same
   3pt element and only row 3's colour changes, so no row is nudged out of column — the
   "emphasise one and only that one shifts" trap.

## budget — computed before any slide HTML was written

Both budgets below were computed before the first slide was written, from **measured** advance
widths rather than the skill's 0.48 rule of thumb, which is a sans-serif average and is wrong
for this style in both directions. Two rounds of measurement were needed:

1. **Pre-write pass** — the deck's own woff2 files loaded in headless Chromium, advance widths
   read off `getBoundingClientRect`. This set the plan.
2. **Render-verified pass** — the same strings measured off the actual 1920×1080 PNGs. The
   skill is explicit that estimation is not the end of the job (*"추정으로 끝내지 말고 렌더에서
   실제로 한 줄인지 확인한다"*), and it was right to be: the headless pass under-read Archivo
   Black by ~29% and Inter prose by ~17%, because the sample strings were letter-light
   (`"The pipeline is measured in minutes."` is nearly all i/l/t). The numbers below are the
   render-verified ones and are the numbers to reuse.

```
measured advance coefficients  (width ÷ (chars × font-size)), from the rendered PNGs
  Archivo Black 900, mixed case,  −0.02em, 34pt     0.568
  Archivo Black 900, ALL CAPS,    −0.02em, 13–19pt  0.70
  Archivo Black 900, ALL CAPS,    −0.03em, 46pt     0.71
  Archivo Black 900, ALL CAPS,    −0.03em, 54–60pt  0.67–0.73  (letter-dependent: W is very wide)
  Archivo Black 900, ALL CAPS,    −0.03em, 132pt    0.64
  Inter 400, mixed case, 14pt                       0.477
  Inter 400, mixed case, 18pt                       0.466
  Inter 500, mixed case, 16pt                       0.486
  Inter 500, ALL CAPS,   11pt, +0.08em              0.669
```

### vertical — what `main` actually gets
Fixed furniture on every sheet: a caption rail + 3pt rule at the top, and a 3pt rule +
caption rail at the bottom. Both are **siblings of `main`** in the body flex column, so
`main { flex:1; min-height:0 }` keeps them at a constant y on all five sheets. The risk that
remains — and the one that actually fired — is `main`'s own children overflowing and sliding
under the bottom rail. `validate` passes that silently.

```
405
  − body padding 32 top + 32 bottom          = 341
  − top caption rail 11pt × 1.4 = 16         = 325
  − top rule 3 + its margin 8                = 314
  − main margin-top 16                       = 298
  − bottom rule 3 + its margin-top 12        = 283
  − bottom caption rail 16 + margin-top 8    = 259
→ main = 259pt on every sheet

inside main, content sheets:
  − heading 34pt × 1.2 = 41 + margin-bottom 16   = 57
→ content region = 202pt
```
Final spend, as built:
- **01** no heading row: 46pt line 55 + 2 + 132pt block row 158 + subline 26 + margin 12 = **253** of 259
- **02** stations 102 + return svg 24 + margin 6 + closing 2 lines 52 + margin 12 = **196** of 202
- **03** three columns 137 + callout 55 + margin 12 = **204** of 202 — absorbed by `margin-top:auto`
  on the callout and confirmed clear in the render (10pt of air above the bottom rule)
- **04** three rows 3 × 53 + closing rule 3 + closing line 23 + margin 12 = **200** of 202
- **05** no heading row: giant type 3 × 72 = 216 of 259; prompt ledger 197 of 259

### horizontal — character ceilings for lines that must not wrap
```
content width 640pt.

heading   Archivo Black 34pt mixed, 0.568  → 640 ÷ 19.3 = 33 chars  → all three titles ≤ 29
cover L1  Archivo Black 46pt CAPS,  0.71   → "INFRASTRUCTURE" = 14 chars = 457pt ✓
cover L2  Archivo Black 132pt CAPS, 0.64   → "DRIFT" = 5 chars = 422pt, leaving 200pt (of 640,
          less the 20pt gutter) for the black thesis block beside it
cover blk Archivo Black 17pt CAPS,  0.70   → inner width 164pt ÷ 11.9 = 13 chars → longest line
          "SOMEONE MADE" = 12  (at the spec-scaled 19pt this was 162pt of 164 and wrapped)
closing   Archivo Black 60pt CAPS,  0.727  → 320pt column ÷ 43.6 = 7.3 chars → "WHAT WE" = 7
ledger    Archivo Black 13pt CAPS,  0.70   → 200pt cell ÷ 9.1 = 22 chars → longest label = 20
caption   Inter 500 11pt CAPS +0.08em, 0.669 → 7.36pt/char; rails written to ≤ 42 chars
body 18   Inter 400 18pt, 0.466 → 640 ÷ 8.39 = 76 chars per full-width line
body 16   Inter 500 16pt, 0.486 → 640 ÷ 7.78 = 82 chars  → slide-04 closing line = 72
body 14   Inter 400 14pt, 0.477 → 6.68pt/char: 121pt station = 18 · 200pt column = 30 · 394pt cell = 59
```

Two ceilings actually bit, and both were arithmetic, not taste:

- **"INFRASTRUCTURE" at the spec's scaled display size of 78pt is 695pt wide and does not fit a
  640pt canvas at all.** Measuring first turned that from a render-and-retry into a decision:
  the word is set at 46pt and "DRIFT" at 132pt carries the giant-type identity instead.
- **The slide-04 ledger label cell.** At the planned 15pt, `READ-ONLY BY DEFAULT` needs 210pt in
  a 200pt cell, so it wrapped to two lines, which pushed the row heights past the vertical
  budget and dropped the closing line under the bottom rail. Fixed at 13pt (182pt), one line.

## what the render caught that `validate` did not

Five defects, all found by opening the PNGs. `validate` reported 5/5 passing while three of
these were on screen.

| Sheet | Defect | Fix |
|---|---|---|
| 04 | **The closing line slid under the bottom rule and collided with the footer caption.** The label cell was too narrow at 15pt, so `READ-ONLY BY DEFAULT` wrapped, every row grew, and `main` overflowed by ~29pt. This is the exact child-overflows-parent case the skill warns about. | Labels to 13pt (one line), row padding 10/12 → 5/5, closing line cut from 84 to 72 chars |
| 05 | `WHAT WE` at 60pt broke to `WHAT` / `WE`, making four lines of giant type whose last line ran into the bottom rule | Giant column widened 300 → 320pt; after the fix 60pt fits on one line with 15pt to spare |
| 01 | The black thesis block broke `SOMEONE MADE` across two lines — an orphan break, 162pt of a 164pt inner width | Block type 19 → 17pt; three clean phrase lines |
| 01 | The cover subline ran to two lines and its line box overflowed `main`, clearing the bottom rule only by half-leading | Subline rewritten to 71 chars, one line, 9pt of real clearance |
| 02 | Station 2 wrapped to three lines while the others took two, so all four boxes stretched and left a hollow band; a second hollow band opened between the return loop and the closing line | Copy shortened to `Plan shows a diff nobody ordered`; boxes given `min-height:102pt` so the diagram block fills its share |

One more, found by `validate` and fixed rather than accepted: the return-loop arrowhead drawn
as a separate `<polygon>` overlapped the `<polyline>`'s bounding box and raised
`sibling-overlap`. The skill says to record that class of warning as a Note rather than fix
it — but here it was genuinely removable: the arrowhead is now a `<marker>` in `<defs>`, which
is one element with the line instead of two. **Final validate is 0 warnings, not 1.**

## visual thesis
Bloomberg Businessweek, not a deployment diagram. A strict 12-column grid holding one
enormous word, black rule lines doing the work arrows usually do, and exactly one orange.
The reader should feel the deck is *arguing*, not *reporting*.

## content plan
cover → the loop drift creates and why it feeds itself → why the console keeps winning, taken
seriously → the three moves that make one path the only path → what we have to decide

---

## slide-01 — cover
- Layout: top rail `PLATFORM ENGINEERING · INTERNAL` / `01 / 05`. Main: "INFRASTRUCTURE" at
  46pt over a row of "DRIFT" at 132pt in `#FF4A1C` beside a `#111111` rect block carrying the
  subtitle in invert caps. Subline in 18pt Inter. Bottom rail: `PRESENTER · TEAM`.
- Key message: drift has a name and this deck is about its cause, not its symptom.
- Intent: the giant-type anchor the gate requires on a cover sheet. One word does it.

## slide-02 — "The plan stops being true"
- Layout: four square-badged boxes across the 12 columns, 3pt SVG rule connectors with
  filled-triangle arrowheads between them, and a return rule beneath running right-to-left
  back into box 1 — the loop closes on the sheet rather than being asserted in words.
- The four stations: a change is made in the console → `plan` shows a diff nobody ordered →
  apply is now risky, so it waits → the next change skips the pipeline too.
- Closing line names it: **the drift loop**, and says why it is self-feeding — every lap makes
  the next hand change more reasonable than the last.
- Intent: the cost is not the diff. The cost is that `apply` stops being trusted.

## slide-03 — "Why the console keeps winning"
- Layout: three columns, each a square badge, a claim in Inter 600, a 3pt rule, and the
  mechanism underneath. Inverted `#111111` callout block across the full width at the bottom.
- Faster during an incident — the pipeline is measured in minutes, the pager in seconds.
- The pipeline is blocked — queued behind unrelated changes, waiting on a reviewer asleep.
- The module has no field — the abstraction is behind the provider; there is no code to write.
- Callout: every one of these is a gap in the paved path, not a failure of discipline.
- Intent: take the reasons seriously. A deck that scolds here loses the room.

## slide-04 — "Make one path the only path"
- Layout: three ledger rows, each with a 3pt rule above it (all three carry the rule; only the
  colour would ever change — the "emphasise one and only that one shifts" trap), a square
  badge, a caps label cell of 200pt, and the mechanism in the remaining 388pt.
- `01 READ-ONLY BY DEFAULT` — human roles in production carry read and describe; write belongs
  to the pipeline's identity and to nothing else.
- `02 BREAK-GLASS EXPIRES` — elevation is one click, time-boxed, and writes a record: who,
  what, why, and when it lapsed.
- `03 CLOSE THE GAP` — every use of the glass files a ticket against the paved path: the slow
  step, the missing field, the review nobody could give at 03:00.
- Closing line: do the first two without the third and the drift just moves out of sight.
  A fourth 3pt rule closes the ledger under row 3.
- Intent: the order is the argument. Two of these without the third is just friction.

## slide-05 — closing / decide
- Layout: two columns, vertically centred. Left, giant type `WHAT WE / HAVE TO / DECIDE` at
  60pt in a 320pt column, with DECIDE in `#FF4A1C`. Right, three badged discussion prompts on
  a ledger of 3pt rules, bounded top and bottom.
- Who holds the break-glass, and how long before it lapses?
- Which gap do we close first: the slow step or the missing field?
- What do we do with the drift that is already in production?
- Bottom rail carries `PRESENTER · TEAM` again.
- Intent: a closing sheet with a real visual anchor, ending on questions we owe an answer to.
