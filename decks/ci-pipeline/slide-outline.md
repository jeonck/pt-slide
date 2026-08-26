# CI pipeline: what belongs in it, and what does not — slide outline

## meta
- deck: decks/ci-pipeline
- mode: html
- style: `ppt-precision-fintech-deck` (bundled) — **assigned, not chosen.** `show-design`
  output is treated as a contract; the `## Avoid` list is checked item by item in gate Pass A.
- slide-size: 720pt × 405pt
- language: English
- audience: the engineers who own the pipeline and the leads who decide what gates a merge
- tone: an argument about scope, not a tuning guide. Every claim is a mechanism, not a metric.
- slides: 6 (cover · what CI is for · the boundary · two policies · when it is slow · closing)
- charts: **none.** See "no figures" below.
- fonts: Inter 400 / 600 / 700, embedded from npm `@fontsource/inter` under
  `./assets/fonts/`. Pretendard removed by hand after scaffolding — there is no Hangul in
  this deck and four Pretendard faces are ~3MB of dead weight. No remote URL in any slide.

## no figures, no chart — recorded
The thesis is a claim about **scope**, and every number that would illustrate it (build
minutes, pass rates, flake percentages, "teams that do X ship Y times faster") would be
invented. The style's own Avoid list forbids amateur chart regressions; inventing data to
feed a chart would be the worse sin, and the gate treats fabricated data as Critical. So:
**no chart, no percentage, no duration anywhere in this deck.** The argument runs on
mechanism — what a stage's failure *means*, and what happens to the people at the gate when
it means nothing. The style's mandatory bottom-right `source_caption` slot therefore carries
sheet identity instead of a citation (see deviations).

## design tokens (from `slides-grab show-design ppt-precision-fintech-deck`)
- bg `#FFFFFF` · surface `#F6F9FC` · surface alt `#EBF0F6`
- text `#0A2540` · text muted `#5C6B7E`
- accent `#5A55E0` — **the only accent.** `accent light #7C78F0` and the two chart tints
  (`#A9A6F2`, `#C2CBD6`) are declared by the spec but go unused: no chart, and a second
  accent is on the Avoid list.
- hairline / border `#E3E8EE` — used only where the spec allows it (the process baseline and
  connectors), never to draw a card box
- radius 8px → **6pt** at this canvas scale · no shadow · no gradient · no border on cards —
  division is by surface step, per the Signature and the Avoid list
- diagram vocabulary used: comparison 2–3 cols (slide 03), horizontal process 3–5 steps with
  exactly one active step (slide 05), circular number badges (04, 06), 1.5pt `#5A55E0`
  connectors with triangle arrowheads (05)
- layout: 12 columns, asymmetric **7:5 alternating** — 7 left on 02 and 06, 5 left / 7 right
  on 04. Slides 03 and 05 are full-width diagram sheets (3-col comparison, 4-step process),
  which is the spec's own diagram vocabulary rather than the prose grid.

## budgets, computed before any slide HTML was written

### shared chrome
```
body padding      32pt top · 40pt right · 26pt bottom · 40pt left
content width     720 − 40 − 40                                    = 640pt
header (fixed)    kicker 10pt × 1.4                = 14.0
                  + gap                            =  5.0
                  + h1 24pt × 1.2                  = 28.8
                  + header margin-bottom           = 16.0          = 63.8pt
footer (fixed)    caption 10pt × 1.4 = 14 + margin-top 14          = 28.0pt
```

### vertical — what `main` actually gets
```
405 − 32 (pad top) − 26 (pad bottom) − 63.8 (header) − 28 (footer)  = 255.2pt
                                                        main budget = 255pt
```
The bottom-right source caption is **fixed furniture**: the spec pins it bottom-right on
every sheet. Anything `main` overflows slides under it silently — `validate` sees a child
overflowing its parent, not a sibling overlap, and passes. So every sheet's blocks are summed
against 255pt before it is written:

```
02   panel rows 3 × 62 = 186 + lead 44 + gaps 20                    = 250  ✓
03   cards 196 + gap 14 + decision rule strip 44                    = 254  ✓
04   two policy blocks 2 × 96 = 192 + gap 16 + anchor panel 46      = 254  ✓
05   lead 20 + 14 + process row 116 + 22 + closing strip 54         = 226  ✓ (slack, on purpose)
06   three question rows 3 × 56 = 168 + 16 + presenter strip 62     = 246  ✓
```
Cover (01) has no header band; it is budgeted separately:
`405 − 32 − 26 = 347` for kicker 14 + 18 + display 2 × 48 = 96 + 22 + thesis 2 × 26 = 52
+ auto space + presenter strip 62 → 264pt used, 83pt of deliberate air (the style is "airy").

### horizontal — the character ceiling for lines that must not wrap
Coefficient 0.48 from `references/slide-html.md`, measured on a Latin sans; Inter with the
spec's negative tracking runs a shade narrower, so 0.48 is used as a safe ceiling and the
render is the check.
```
h1 (24pt / 600 / -0.015em), max-width 560pt   → 560 ÷ (24 × 0.48) ≈ 48 chars → write ≤ 46
cover display (40pt / 700 / -0.025em), 600pt  → 600 ÷ (40 × 0.48) ≈ 31 chars/line → ≤ 30, <br> placed by hand
process node label (12pt / 600), inner 119pt  → 119 ÷ (12 × 0.48) ≈ 20 chars/line → ≤ 20, 2 lines allowed
comparison column header (11pt / 600), 176pt  → 176 ÷ (11 × 0.48) ≈ 33 chars → write ≤ 22, one line enforced
```
Why the h1 ceiling matters here: the h1 sets the y of everything below it, and the caption is
pinned to the bottom on every sheet. A two-line title would push `main` 29pt down into the
caption on that sheet alone, and the deck's whole claim to precision is that the sheets line
up. Actual titles: 31 / 39 / 40 / 33 / 22 characters — all inside 46.

## deviations from the spec, recorded
1. **Type sizes are scaled 0.75, then floored.** The spec targets 13.33 × 7.5in; this canvas
   is 10 × 5.625in. Its display 54 → 40pt, title 32 → 24pt, card_header 15 → 11pt, kpi 46 →
   unused. But kicker 12 → 9pt and caption 10 → 7.5pt fall under the framework's absolute
   10pt floor, and body 18 → 13.5pt under the 14pt body floor. Kicker and caption are set at
   **10pt**, body at **14pt**. Larger than the scaled spec, never smaller.
2. **Title leading 1.15 → 1.20.** The spec's 1.15 clips descenders at 24pt in this renderer;
   `references/slide-html.md` requires ≥1.2 for large titles. Cover display 1.05 → 1.20 for
   the same reason.
3. **The bottom-right source caption carries sheet identity, not a source.** The spec makes
   the slot fixed; there is no data to cite and inventing one would be a Critical finding.
4. **No gradient anywhere**, including the spec's permitted same-hue two-stop. Repo rule:
   flat fills only.
5. **`accent light` and both chart tints go unused.** One accent only, per Avoid.
6. **Margins 40 / 32pt rather than the spec's 0.75in / 0.6in.** Those are 54 / 43pt literal,
   which at 0.75 scale are 40.5 / 32.4pt — this is the scaled value, not a departure.

## visual thesis
Near-white sheets with quiet blue-grey planes stepping out of them, one indigo accent doing
all the pointing, deep-navy type set tight and left. Nothing is boxed by a border; things are
separated because they sit on a different plane. The reader should feel they are being shown
a boundary that already exists, not sold a process.

## content plan
cover → the one question CI answers, and the three ways it gets diluted → the boundary
(in CI / after the merge / on a schedule) and the test that decides → the two policies that
keep the signal honest → what to do when it is already slow → what we need to decide

---

## slide-01 — cover
- Layout: no header band. Kicker, display title in two hand-broken lines, thesis, then a
  surface strip at the bottom carrying the presenter placeholder. Left-aligned, airy.
- Display: `CI pipeline: what belongs` / `in it, and what does not`
- Thesis: a pipeline does not get slow because there are too many tests. It gets slow because
  nothing defines what belongs in it.
- Strip: `PRESENTED BY — PRESENTER · TEAM` / `SCOPE — every commit to main` (placeholder, not
  a name).
- Intent: the anchor is the display title itself, set at 40pt with the accent rule beside it.

## slide-02 — "What CI answers on every commit" (31)
- Layout: 7:5. Left (7) the question and why it is one question. Right (5) a `#F6F9FC` panel,
  three hairline-separated rows: how the question gets diluted.
- Left: **"Can main be released with this commit in it?"** set at title scale, accent bar.
  Body: CI is not a place to run tests. It is that question, answered on every commit — and
  the answer is only useful if a red build means exactly one thing.
- Right panel — "Three ways the question gets diluted":
  - Work that answers a different question — nightly soak runs, full browser matrices
  - Work nobody reads the answer to — reports produced, archived, never opened
  - Work that answers nothing — a suite retried until it happens to pass
- Closer (added after the first render — the left column was ~100pt short and left a void
  under the header): *every stage that answers something else makes a red build mean a
  little less.* It is also the bridge into slide 03.
- Intent: establish the single question, so slides 03–05 can all be measured against it.

## slide-03 — "The boundary: CI, post-merge, scheduled" (39)
- Layout: full-width 3-column comparison, the spec's own comparison diagram. Cards on
  `#F6F9FC`, header row `#EBF0F6`, and the **one** highlighted column header in `#5A55E0`
  with white text — the IN CI column, because that is the one being defended.
- IN CI (highlighted): failure means *this commit must not merge*.
  build and compile · unit and fast integration · lint and type checks
- AFTER THE MERGE: only answerable once the merged result exists.
  deploy to staging · end-to-end on a real env · post-deploy smoke tests
- ON A SCHEDULE: the answer does not change commit to commit.
  full OS and browser matrix · licence and CVE audits · long soak and fuzz runs
  (bullets are held to 25 characters — see the render fixes below)
- Bottom strip — the deciding test: *ask what a failure here would mean. If the answer is not
  "do not merge this commit", it is not a CI stage.*
- Intent: one sheet, one boundary, and a test the reader can apply to their own pipeline
  tomorrow without any number from us.

## slide-04 — "Two policies that keep the signal honest" (40)
- Layout: 5:7 (alternates against 02). Left (5) a `#F6F9FC` anchor panel with the reason both
  policies exist. Right (7) two numbered policy blocks, circular accent badges 01 / 02.
- Anchor panel: the gate's only asset is that a red build means something. Both policies
  exist to protect that one asset.
- 01 **A flaky test is a broken test.** A test that fails without a cause teaches everyone to
  read failures as noise. Quarantine it out of the gate the day it flakes, then fix it or
  delete it — a retry is not a fix, it is a louder way of ignoring the result.
- 02 **A pipeline nobody trusts gets bypassed.** Not by rebellion — by batching commits,
  merging on "probably green", and handing out override rights. The gate holds only what
  people will actually wait for; everything else moves out of it.
- Intent: both policies are about the *reader of the result*, not the test.

## slide-05 — "When the pipeline is already slow" (33)
- Layout: full-width horizontal process, 4 pill nodes, 1.5pt accent connectors with triangle
  arrowheads, circular number badges. **Exactly one active step** in `#5A55E0` with white
  text — step 2, because it is the thesis of the deck.
- Lead: a slow pipeline is a scope problem before it is a speed problem.
- 01 Attribute the time — per stage, not per pipeline; a total tells you nothing to act on
- 02 **Ask what the stage is for** *(active)* — which question does its failure answer?
- 03 Move it or delete it — if the answer is not "do not merge", it leaves the gate
- 04 Then optimise the rest — cache, shard, parallelise what actually has to be there
- Closing strip: optimising first only makes a stage that should not exist finish sooner.
- Intent: the sequence is the argument; the highlighted step is where the deck's thesis lands.

## slide-06 — "What we need to decide" (22)
- Layout: 7:5. Left (7) three numbered questions with circular accent badges. Right (5)
  `#F6F9FC` panel restating the thesis, with the presenter placeholder beneath it.
- Q1 What is our pipeline's one question — and which stages do not answer it?
- Q2 Who is allowed to quarantine a flaky test, and how fast?
- Q3 What is the longest wait we will defend before a stage leaves the gate?
- Panel: none of this is a tuning problem until the boundary is written down — plus one
  supporting line added after the first render (*the pipeline is slow because nothing says
  what belongs in it; decide that first, the rest really is tuning*), which closed a ~100pt
  void between the thesis and the presenter block.
- Presenter: `PRESENTER · TEAM` placeholder.
- Intent: closes on decisions we owe each other, not on a summary.

---

## what the render changed (the budget did not catch these)

Both budgets held — 6/6 on the first `validate`, nothing overflowed `main` into the fixed
caption on any sheet. What the PNGs showed instead was **alignment and emptiness**:

1. **slide-03 — two bullets wrapped, breaking the row grid across the three columns.**
   The horizontal budget forgot the 11pt bullet indent: the real inner width is 165pt, not
   176pt, so the ceiling at 12pt is ~25 characters, not 28. "Smoke on the deployed build"
   and "Dependency and licence audit" both went to two lines while their neighbours stayed
   on one. Rewritten to "Post-deploy smoke tests" and "Licence and CVE audits".
2. **slide-05 — node labels 02 and 04 wrapped to two lines while 01 and 03 did not**, so the
   gloss under each pill started at a different y. Fixed by reserving two label lines in
   *every* node (`min-height:30pt` on `.node h3`), not by shortening only the two that wrapped
   — the same reason the skill gives for putting the border on every row and only changing
   its colour.
3. **slide-05 — the pills stretched to ~193pt around ~115pt of content**, leaving a dead band
   under every gloss. Centring the content made it worse: node 02's gloss runs a line longer,
   so centring lifted its badge 8pt above its neighbours'. Final answer: pills hug their
   content (`.flow { flex:none }`), content stays top-aligned so all four badges sit on one
   line, and the closing strip takes `margin-top:auto` so its bottom edge lands on 351pt like
   every other sheet.
4. **slide-02 — the left column held ~150pt of content in a 255pt column**, so vertically
   centring it opened a void under the header. The accent bar became a full-height spine
   (leftover space reads as structure) and a closing line was added.
5. **slide-06 — ~100pt void** between the panel thesis and the presenter block; closed with
   one supporting line, not with padding.
6. **slide-01 — the thesis broke mid-sentence** ("too many / tests"). Hand `<br>` at the
   sentence boundary; `max-width` widened 470 → 530pt so the first sentence fits one line.

Verified after the fixes, by measuring the live DOM rather than by eye: `main` ends at
351.0pt on all six sheets, no descendant of `main` overflows it by even 0.01pt, no text is
under 10pt, and slide-05's four badges share one top edge to the pixel.
