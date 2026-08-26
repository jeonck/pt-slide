# Alert design: what deserves a page — slide outline

## meta
- deck: decks/alert-design
- mode: html
- style: `ppt-monochrome-risk` (bundled) — **assigned, not chosen.** Spec read from
  `npx slides-grab show-design ppt-monochrome-risk` and treated as a contract, `## Avoid` included.
- slide-size: 720pt × 405pt
- language: English
- audience: the engineers who carry the pager and the leads who decide what may ring it
- tone: a risk review. Sober, mechanical, no reassurance. Every claim argues from how paging
  works on a human, never from a statistic.
- slides: 5 (cover · three destinations · the test · what fails the test · what we must decide)
- **charts: none, and no figures at all.** Alert volumes, MTTA/MTTR, page-per-shift counts and
  vendor benchmarks are all unsourceable here, and this style's Avoid list treats a fabricated
  chart as a first-class failure ("값 레이블 누락·출처 누락"). The whole argument is mechanical:
  a page interrupts a person, interruption has a cost whether or not anyone measures it, so the
  bar is set by what the interruption buys. No number is needed to run that argument, and any
  number put on these sheets would be invented.
- fonts: **Arimo 400/700**, embedded at `./assets/fonts/Arimo-400.woff2`, `Arimo-700.woff2`.
  The four Pretendard files the scaffolder copied were deleted — there is no Hangul in this deck
  and 3MB of Korean outlines is dead weight. Staged via
  `npm install --no-save --no-audit --no-fund --prefix .font-staging-alert @fontsource/arimo`,
  copied in, staging removed. No remote URL appears in any saved slide.

## design tokens (from `slides-grab show-design ppt-monochrome-risk`)
- bg `#FFFFFF` · surface `#E6E6E6`
- text `#0A0A0A` · text muted `#767676` · accent `#0A0A0A` · border `#0A0A0A`
- gray scale: `#0A0A0A` / `#3D3D3D` / `#767676` / `#B0B0B0` / `#E6E6E6`
- **There is no colour in this spec at all** — five achromatic steps and nothing else. Emphasis
  is black-fill block + white text (inversion), never a hue. Red is banned even for warnings.
- radius 0 everywhere, no shadow, no gradient.
- Sections are divided by **thick rules, not whitespace** — 4px under the header, 2px between rows.
- Headlines must be Bold or heavier. Body must not run past six lines.
- Diagram grammar used here: `diagram.comparison` (slide 02), `diagram.process_flow` (slide 03),
  `diagram.hierarchy` rows with 0.4in black number chips (slides 04, 05).

## scale conversion
The spec targets a 13.33in × 7.5in slide; this canvas is 720pt × 405pt, i.e. **54pt per inch**,
0.75× the spec's own point sizes. Applied to the spec's furniture:

```
margin_x 0.7in  → 37.8pt  → 38pt left/right
margin_y 0.55in → 29.7pt  → 30pt top, 26pt bottom
0.4in number chip → 21.6pt → 22pt square
```

Applied to its type, the spec's sizes fall through this repo's floors — body 17pt → 12.75pt,
label 12pt → 9pt, caption 10pt → 7.5pt, all under the 14pt body / 10pt absolute floors. So type
is **not** scaled: body 14pt, labels 10–12pt, captions 10pt, subhead 18–20pt, display 40pt.
Recorded as a deviation below.

## budgets — computed before any slide HTML was written

### vertical (content sheets 02–05)
```
405
 − body padding                       30 top + 26 bottom      =  56   → 349 left
 − header eyebrow  10pt × 1.4 = 14   + margin 6               =  20
 − header title    24pt × 1.2 = 29   + margin 8               =  37
 − header subline  14pt × 1.4 = 20   + margin 12              =  32
 − header rule     4px ≈ 3           + margin 14              =  17     (fixed furniture)
 − footer rule     2px ≈ 2           + margin 10              =  12     (fixed furniture)
 − footer caption  10pt × 1.4 = 14   + padding-top 4          =  18
                                                              -----
main gets 349 − 105.4 − 29.5                                  = 214pt
```
Everything on a content sheet must fit 215pt or it slides under the footer rule — `validate`
passes that, because it is a child overflowing its parent, not two siblings colliding.

Per-sheet spend against the 215:
- 02 — header row 38 + 3px rule 2 + two body rows (81 + 81) + 2px rule 2 = **204**
- 03 — gate node row 159 + margin 14 + black terminal bar 40 = **213**
- 04 — three ledger rows at 61 + two 2px rules + 2px outer border = **192**
- 05 — black rule block 77 + margin 14 + three question rows at 38 + rules = **211**

### vertical (cover, sheet 01 — its own furniture)
```
405 − 30 − 26 = 349
 eyebrow 14 + rule 3 + margins 24            =  41
 display title 40pt × 1.2 × 2 lines          =  96
 black thesis block 14 + 2 × 25 + 14         =  78
 presenter rule 2 + caption 17 + margins 26  =  45
                                              ----
 spent 260 of 349 — the remaining 89pt is split evenly above and below the title group by
 `justify-content:center`, which is what a cover in this style is: one enormous headline
 between two rules. (First render put all of it above the headline; see "render fixes".)
```

### horizontal — the character ceiling for lines that must not wrap
Content width = 720 − 38 − 38 = **644pt**. Arimo is metric-compatible with Helvetica/Arial, so
the repo's measured coefficient 0.48 applies directly (it was measured on Arimo in this repo).

```
chars per line ≈ available width ÷ (font-size × 0.48)

header title    24pt over 644pt → 644 ÷ 11.52 = 55  → written to ≤ 50   [MUST NOT WRAP:
                                                                         it sets the y of the
                                                                         4px rule on every sheet]
header subline  14pt over 644pt → 644 ÷  6.72 = 95  → written to ≤ 80   [MUST NOT WRAP]
02 column cell  14pt over 152pt → 152 ÷  6.72 = 22  → 3 lines, ≤ 56 chars per cell
02 col header   22pt uppercase over 152pt, uppercase runs ≈0.58em → 11   → ≤ 10 ("DASHBOARD")
03 node label   12pt uppercase + 0.08em tracking over 177pt → ≈ 15      → ≤ 11 ("ACTIONABLE")
03 node body    14pt over 177pt → 177 ÷ 6.72 = 26  → 2 lines, ≤ 44 chars
04 row verb     17pt uppercase over 130pt → ≈ 12   → ≤ 9  ("DOWNGRADE") [MUST NOT WRAP]
04 row body     14pt over 413pt → 413 ÷ 6.72 = 61  → 2 lines, ≤ 122 chars
05 question     14pt over 590pt → 590 ÷ 6.72 = 87  → 1 line, ≤ 80       [MUST NOT WRAP]
cover title     40pt over 644pt → 644 ÷ 19.2 = 33  → manual <br>, ≤ 24 per line
```

Longest title actually written: `Three destinations, and only one wakes anyone` — 44 chars.
Longest subline: 75 chars. Both inside budget, and confirmed one line in every render: the 4px
rule sits at the same y on sheets 02–05.

Slide 02's cells sit at the top of the character budget (55 chars over a 22-char line = 3 lines),
so `text-wrap: balance` is set on them — without it the third line was a two-word runt.

## deviations, recorded
- **Arimo substitutes for Helvetica Neue.** The spec names Helvetica Neue with Arial Black /
  Arial fallbacks. None of the three can be embedded — they are not distributable and are not on
  npm. Arimo is metric-compatible with Helvetica and Arial, and it is the substitution already
  used by `decks/mlops-platform` for the same reason. The "no generic font stack" rule exempts
  the face a style names, and this is that face by metrics. Arimo has no Black weight, so the
  display headline is Arimo 700; the spec's hard requirement is "Bold or heavier", which 700 meets.
- **Type sizes are not the spec's absolute points.** See "scale conversion" — the spec's sizes,
  scaled to this canvas, land under this repo's 14pt body / 10pt absolute floors.
- **Diagram nodes are HTML boxes; only the connectors are SVG.** `diagram.render` says "SVG
  precise, no div blocks". This repo requires slide text to live in semantic tags so the PPTX
  text engine and screen readers can reach it — text baked into SVG would be neither editable nor
  searchable. So the nodes are bordered boxes with `<h3>`/`<p>` inside, drawn to the spec's
  geometry (0px radius, 2px `#0A0A0A` border, 22pt black number chip), and the right-angle
  connectors with their sharp triangle heads are inline SVG. The look the spec describes is
  preserved; the mechanism differs.
- **Slide 03's process flow is three gates plus a terminal bar, not the spec's "4–5 horizontal
  steps".** The argument has exactly three tests; padding it to five would mean inventing a test.
  The full-width black-fill bar underneath is the fourth stage — the outcome — and is the spec's
  own black-fill inversion.
- **`#E6E6E6` surface is used once**, as the de-emphasis fill on slide 03's "if the answer is no"
  strip inside each gate node. Two background values total (`#FFFFFF`, `#E6E6E6`); black fills are
  the spec's declared emphasis-inversion, not a third background.
- No new colour was invented. Nothing outside the five achromatic steps appears anywhere.

## render fixes — found by opening the PNGs, not by `validate`
`validate` was clean (5/5, 0 errors, 0 warnings) on the very first run and stayed clean through
every one of these. None of them would have been caught without looking.

1. **slide-02 — the 4px divider between PAGE and TICKET was invisible.** It was a `border-left`
   on the TICKET column, which put it flush against the black-filled PAGE block, so it merged
   into the fill. The TICKET/DASHBOARD divider was visible and the PAGE/TICKET one was not — the
   grid read as asymmetric. Fixed by promoting both dividers to their own 4px flex items with
   8pt of white on each side, so neither can be swallowed by a neighbouring fill.
2. **slide-02 — cell text was vertically centred, so the first lines of the three columns did
   not align.** In a strict-grid style that is the style breaking. Changed the cells and the
   gutter labels to top-align.
3. **slide-02 — runt lines.** "…until the next working day." and "…teaches people to wait."
   each ended on a two-word last line. `text-wrap: balance` on the cell paragraphs evened them.
   The gutter was also narrowed 92pt → 78pt to give the columns back 14pt.
4. **slide-01 — all the cover's spare height stacked above the headline.** `justify-content:
   flex-end` left ~86pt of blank between the top rule and the title and nothing below the thesis
   block. Changed to `center`.
5. **slide-04 — the verb column and the body column were divided by whitespace only**, which is
   on this style's Avoid list ("구획은 두꺼운 룰로 명시"). Added a 2px vertical rule, inverted to
   white on the black row, and applied to every row so no row shifts.
6. **slide-04 — that new rule only spanned the content height, not the row height**, because the
   row was `align-items:center`. It read as a floating stub instead of a table rule. Row is now
   `align-items:stretch` with the cells centring their own contents.
7. **slide-04 — "DOWNGRADE" touched the new divider.** 18pt at 0.04em tracking filled the
   180pt verb column to its padding. Dropped to 17pt / 0.02em rather than widening the column,
   which would have pushed row B's body copy onto a third line.
8. **slide-05 — the question chips were cramped.** "Q1" at 12pt nearly filled the 22pt square.
   Changed to single digits `1` `2` `3`, which is what the spec's chip is for anyway.
9. **slide-05 — the creed block and the question list were separated by whitespace only.** Same
   Avoid item as (5). Added a 2px rule at the top of the question block.
10. **slide-03 — the gate questions were 13pt**, above the 10pt hard floor but below the 14pt
   body minimum, and these questions are the slide's whole argument. Raised to 14pt by narrowing
   the connectors 20pt → 16pt (nodes gain 4pt of inner width each) and cutting each question to
   ≤43 characters so it still sets on two lines. `text-wrap: balance` removes the "step?" runt
   the longest one produced.

## visual thesis
An audit finding, not a talk. White paper, black ink, thick rules cutting the sheet into
declared regions, one enormous bold headline per page. Where something matters it is not
coloured — it is **inverted**, punched out as a black block with white text, the way a redaction
or a stamp reads. The reader should feel the deck is stating a standard, not proposing an idea.

## content plan
a page wakes a human → so an alert has three possible destinations and only one of them rings →
here is the three-question test that earns the ring → here is what happens to everything that
fails it → here is what we still have to agree on

---

## slide-01 — cover
- Layout: eyebrow label, 4px rule, display title over two manual lines, black-fill thesis block
  with inverted text, 2px rule and presenter line at the foot.
- Eyebrow: `RISK REVIEW · ON-CALL`
- Title: `Alert design:` / `what deserves a page`
- Thesis block (white on black): "A page wakes a human. So the bar is not 'is this true' —
  it is 'is this worth someone's night'."
- Presenter: `PRESENTER · TEAM` — placeholder, no name invented.
- Anchor: the black thesis block against the white sheet, plus the 40pt headline.

## slide-02 — "Three destinations, and only one wakes anyone"
- Subline: "Every alert has three places it can land. The damage is done by landing in the wrong one."
  → trimmed to ≤80: "Every alert lands in one of three places. Most of the pain is landing wrong."
- Layout: `diagram.comparison` — three columns split by 4px vertical black rules, 22pt Bold
  uppercase column headers with a 3px rule under, 2px rule between the two body rows.
  **PAGE is the black-fill inverted column** (the winning/emphasised column in the spec's grammar).
- Rows: `WHAT IT IS FOR` / `WHAT GOES WRONG HERE`
  - PAGE — for: "Something is breaking now and only a person can stop it."
           wrong: "A page that could have waited teaches people to wait."
  - TICKET — for: "Real work that survives until the next working day."
             wrong: "Something urgent filed here is read after the outage."
  - DASHBOARD — for: "Context you read when you are already investigating."
                wrong: "A dashboard notifies nobody. At 3am it is a dark room."
- Intent: establish that the three are different *jobs*, so "which one" is a design decision and
  not a severity slider.

## slide-03 — "The test an alert must pass to earn a page"
- Subline: "Three questions. A no to any one of them means this is not a page."
- Layout: `diagram.process_flow` — three white gate nodes, 2px black border, 0px radius, a 22pt
  black square number chip with a white digit at the top-left of each, joined by 2pt right-angle
  connectors with sharp triangle heads. Under each question a `#E6E6E6` strip carries where a
  "no" sends it. Below the row, a full-width black-fill bar states the conjunction.
  - `01` URGENT — "Does waiting until morning make the damage worse?" → no: SEND IT TO A TICKET
  - `02` ACTIONABLE — "Is there a step the responder can take right now?" → no: DELETE OR FIX IT
  - `03` HUMAN-ONLY — "Is a person the only thing that can take that step?" → no: AUTOMATE IT
- Black bar: "All three, or it is not a page. Two out of three is still someone's night."
- Intent: hand over the rule they can apply tomorrow. It is three yes/no questions, in order.

## slide-04 — "What to do with the alerts that fail"
- Subline: "A failing alert is not left alone quietly. It is deleted, downgraded, or fixed."
- Layout: a three-row ledger inside a 2px black border, 2px rules between rows, each row led by a
  22pt black square chip with a white letter. Verb column is 18pt Bold uppercase; the body column
  states when to choose it and what it actually costs.
  - `A` DELETE — "It has never once changed what anyone did. Deleting it removes noise and
    removes nothing else — the check that produced it can stay."
  - `B` DOWNGRADE — "The condition is real and can wait. It moves to a queue with a named owner
    and a date, which is a promise; a silenced alert is not."
  - `C` FIX — "It fires because the system needs a human to survive. Repair the system and the
    alert deletes itself. This is the only one that reduces future pages."
- Intent: close the escape hatch. "Leave it, everyone knows to ignore that one" is not an option
  on this list, and the third row is where the pager count actually falls.

## slide-05 — "What we need to decide"
- Subline: "The rule is easy to write down and hard to hold. These are the open parts."
- Layout: a black-fill block restating the rule in inverted text (the closing anchor), then three
  numbered question rows on 2px rules.
  - `Q1` "Who may delete an alert, and what do they have to show to do it?"
  - `Q2` "How many pages in one shift is too many, and who makes that call?"
  - `Q3` "Which alerts do we agree to fix at the source before the next rotation?"
- Black block: "If it can wait, it is a ticket. If no one is needed, it is a script.
  If nobody is looking, it is a dashboard. What is left is a page."
- Footer carries `PRESENTER · TEAM`.
- Anchor: the inverted rule block.
