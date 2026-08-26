# Who gets into production — slide outline

## meta
- deck: `decks/prod-access`
- mode: html
- style: **`ppt-goldman-ir-deck`** (bundled) — chosen from a shortlist of three. Reasoning under
  "why this style" below. `show-design` output is treated as a contract and reproduced under
  "contract".
- slide-size: 720pt × 405pt
- language: English
- audience: platform / security / infrastructure engineers and the people who own the IAM roles
  they are asked to justify. Everyone in the room already has production access they cannot
  remember being granted.
- tone: mechanism, not compliance theatre. Every claim has to survive "why does that happen?"
- slides: 6 (cover · how access accrues · the price of real least privilege · the record's
  schema · the read · decide)
- charts: **none.** See "no figures" below.
- fonts: **Source Serif 4** 400/600 (headings, display, claims) and **Inter** 400/500/600 (body,
  labels, footline), embedded locally under `./assets/fonts/` from `@fontsource/*` — 136KB total.
  Pretendard was deleted by hand after scaffolding: this deck has no Hangul, and four Pretendard
  faces are ~3MB of dead weight. No `http(s):` URL appears in any saved slide.
- neighbour deck: `decks/iac-drift` slide 04, row 02 states the whole rule in one line —
  *"BREAK-GLASS EXPIRES — elevation is one click, time-boxed, and writes a record: who, what,
  why, and when it lapsed."* **This deck is that one line unfolded.** It is deliberately not
  restated as a bullet anywhere here; slide 04 is the four fields of that record given a sheet
  each, and slide 05 is the part the one-liner cannot carry — that writing a record is not the
  same as the record doing anything.

## why this style
Shortlist: `ppt-dark-luxury-keynote`, `ppt-prismatic-dark-deck`, `ppt-goldman-ir-deck`.

**Chosen: `ppt-goldman-ir-deck`.** Three reasons, in order of weight.

1. **Its mandatory furniture is this deck's subject.** The style requires a bottom-right
   disclaimer + pagination footline on every sheet and a source footnote on every body sheet.
   A deck arguing that an access grant is only real when it is *recorded, attributable and
   dated* should itself be recorded, attributable and dated on every page. The footline is not
   decoration here; it is the thesis applied to the artefact.
2. **Its native module is a ruled financial table.** The core of this deck (slide 04) is a
   record schema — four fields and what each has to say. The style's `chart.table` vocabulary
   (11pt uppercase header, 0.5pt gold bottom rule, 1px navy row rules, gold-ruled total row) is
   exactly the right shape, so the argument gets to use the style's strongest asset rather than
   fight it. `ppt-prismatic-dark-deck`'s native module is a glowing node diagram, which this
   argument does not have.
3. **The other two were rejected on their own Avoid lists, not on taste.**
   - `ppt-dark-luxury-keynote`: *"사진 없이 텍스트만으로 채우지 말 것 — 풀블리드 비주얼이
     정체성"* and *"빈 골드 헤어라인 플레이스홀더 프레임 금지"*. Its identity is full-bleed
     product photography, which this repo cannot source; a text-only build of it would violate
     the spec on the first sheet, and its remedy for dead space (*"따뜻한 조명톤 그라디언트
     필드"*) is a gradient, which the repo bans outright.
   - `ppt-prismatic-dark-deck`: mood `gradient`; its signature is prism glow supplied as
     rasterized PNG/Sharp assets, with `no CSS gradients` repeated on every line. Without those
     generated assets the style degrades to flat-token fallback everywhere, which is the style
     with its identity removed. Also: three accent colours against a governance topic that has
     exactly one axis.

Colour/tone overlap with existing decks was checked: no deck in this repo uses deep navy +
metallic gold. `ppt-dark-tech` (incident-response) is the only other dark deck and is a
different hue family and a sans-serif identity.

## no figures, and why
There is no chart, no percentage, no duration and no benchmark anywhere in this deck.
"X% of breaches involve standing credentials", "mean time to revoke", "N over-privileged roles
per engineer" are all figures that exist in vendor marketing and nowhere this repo can cite.
Inventing one would be Critical under the gate's content-discipline check, and it would also be
the weakest part of the argument: the thesis is **mechanical** — a credential that never expires
is a credential you are relying on nobody misusing — and a mechanism does not need a percentage
to be true.

Per the brief, this fact is recorded **in the style's mandatory source-caption slot** rather
than a citation. Every sheet's footline reads:

> `SOURCE — none. No figures in this deck: the argument is mechanical, not measured.`

That is honest reporting in the slot the style reserves for provenance, and it is the same
string on all six sheets so the footline baseline does not drift.

## contract (from `npx slides-grab show-design ppt-goldman-ir-deck`)
- bg `#0A1A33` · surface `#1F3A5F` · text `#E8E5DE` · text-muted `#9AA6BC`
- accent `#C8A24B` (gold) · data navy light `#3A5A85`
- display **Source Serif 4** 26pt w600 tracking 0 · section_label **Inter** 11pt w500 +0.08em
- body **Inter** 17pt w400 leading 1.4 · table_header Inter 11pt w600 +0.06em
- table_number Inter 14pt w400 · kpi Source Serif 4 40pt w600 · disclaimer Inter 8pt w400
- spacing unit 8 · margin_x 0.65in · margin_y 0.55in · footer_zone 0.75in · strict 12-column
- grid: 26pt serif heading + 0.5pt gold hairline divider, gold uppercase section label,
  **bottom-right disclaimer + pagination footline mandatory on every slide**
- table: header row 11pt uppercase + 0.5pt gold bottom rule, 1px navy row rules,
  total row 0.5pt gold top rule + bold
- diagram: angular navy panels `#1F3A5F` + 0.5pt gold hairline border, thin restrained
  chevron connectors, small gold step numbers, emphasis = gold hairline or gold text
- **Avoid:** gold never as a large fill or button background — 0.5pt hairlines and labels only ·
  no sans-serif headings (transitional serif is the identity) · **no gradient, glow, shadow,
  rounded corner or emoji** · never omit the bottom-right disclaimer footline · no truncated
  y-axis, no missing source · **never float one chart or table in a huge navy void — every body
  sheet carries 3+ modules plus a source footnote and the disclaimer footline** · no dead navy
  corner, no empty placeholder block, no oversized word inside a heading, **no drift of the
  outer margin, footline baseline or heading baseline across slides**

## design decisions recorded against the contract
1. **Point sizes are scaled up from the spec, not copied.** The spec targets 13.33 × 7.5in;
   this canvas is 10 × 5.625in, a 0.75 factor. Scaling the spec literally gives heading 19.5pt,
   body 12.75pt and disclaimer 6pt — the last two are below this framework's 14pt body floor and
   10pt absolute floor. Applied instead: cover display 46pt, closing display 34pt, heading
   **24pt**, panel claim 16pt, ledger claim 15pt, primary body 15pt, secondary body **14pt**,
   labels 11–12pt caps, footline **10pt**. Nothing anywhere is below 10pt.
2. **The 8pt disclaimer is raised to 10pt.** *Deviation from the spec, deliberate.* The spec's
   `disclaimer: Inter 8pt` is below the framework's absolute 10pt floor, which is a Critical at
   the gate. The footline is set at 10pt Inter 500 `#9AA6BC`. The IR identity (a disclaimer +
   pagination footline pinned bottom-right on every sheet) is preserved; only the size moved.
3. **Margins rounded to the 8pt spacing unit.** 0.65in × 0.75 = 35.1pt and 0.55in × 0.75 =
   29.7pt → **40pt horizontal, 32pt vertical.** Content measure is a clean 640pt: 12 columns of
   46.67pt with 8pt gutters. Identical on all six sheets — the spec forbids outer-margin drift.
4. **Two typefaces exactly, and the spec's monospace is not a third.** The style's diagram
   vocabulary asks for "monospace small gold step numbers" and "monospace 10pt" date labels, but
   its own Typography block declares only Source Serif 4 and Inter, and Pass A wants a maximum
   of two faces. *Deviation:* step numbers are set in **Inter 600 12pt with `font-variant-numeric:
   tabular-nums` and +0.06em tracking**, gold, which keeps the tabular, wide-tracked reading the
   spec is after without adding a face.
5. **Palette used verbatim; no harmonic extension was needed.** All six colours in the deck are
   spec tokens: `#0A1A33`, `#1F3A5F`, `#E8E5DE`, `#9AA6BC`, `#C8A24B`, `#3A5A85`. No new hex
   was invented anywhere.
6. **`#3A5A85` never carries text** — see the contrast table below. It appears only as 0.5pt /
   1px rule lines and panel hairlines.
7. **Gold is never a fill.** `#C8A24B` appears as 0.5pt hairlines, uppercase labels, step
   numbers, and one emphasised word on the cover and the closing sheet. No gold panel, no gold
   button, no gold block. Per the Avoid list, a gold fill "looks cheap".
8. **Radius 0 everywhere, no shadow, no gradient, no glow, no emoji, no icon.** The visual
   vocabulary is serif type, navy panels, and gold hairlines.
9. **Emphasis never changes an element's box.** On the ledger sheets every row carries the same
   rule element and only its colour changes, so no row is nudged out of column — the
   "emphasise one and only that one shifts" trap from the skill.
10. **`main { flex:1; min-height:0 }`** with header and footer as siblings, so the gold divider
    and the footline sit at the same y on all six sheets, as the spec's no-drift rule demands.

## contrast — computed numerically before the first render
This is a dark deck, so the ratios were computed rather than eyeballed (WCAG relative
luminance, `scratchpad/contrast.mjs`):

```
ink                  on bg #0A1A33     on surface #1F3A5F
text      #E8E5DE       13.81:1              9.13:1
muted     #9AA6BC        7.08:1              4.68:1
gold      #C8A24B        7.22:1              4.77:1
navy-lt   #3A5A85         2.47:1             1.63:1     ← never used for text
surface   #1F3A5F         1.51:1                –       ← panel fill vs canvas
```

Decisions taken from those numbers:

- `#9AA6BC` is safe for secondary prose on the canvas (7.08) and **marginal on a navy panel
  (4.68)**, so inside panels the mechanism copy is `#E8E5DE` (9.13) and `#9AA6BC` is used on
  panels only for the ≥14pt "why" line, which clears 4.5.
- `#C8A24B` clears 4.5 on both surfaces, so it is legitimate for the 11–12pt uppercase labels
  as well as hairlines. It is still never used for running prose.
- **`#3A5A85` is 2.47:1 on the canvas** — this is the "muted grey that reads fine on white and
  lands near 2.7:1 on charcoal" case the brief warns about. It is a rule colour only.
- `#1F3A5F` panels are only 1.51:1 against the canvas, so **panel edges cannot be read from the
  fill alone.** Every panel therefore carries the spec's 0.5pt gold hairline border, which is
  what makes it a panel. This is why the style specifies the hairline in the first place.
- The presenter line (`PRESENTER · TEAM`, cover and closing) is `#9AA6BC` on the canvas at
  7.08:1 — checked specifically, because this is the line that went invisible last round.

## budget — computed before any slide HTML was written, then re-measured against the render

Both budgets were computed before writing, and the horizontal one was **measured, not
estimated**, with `_measure-prodaccess.mjs` (deleted after use) running headless Chromium
against the deck's own woff2 files and the exact strings that went on the slides.

The measuring had to be done **twice**, and the reason is worth recording because it is a trap
the skill's own snippet does not warn about.

1. **Pre-write pass — wrong, by 10–20%.** A standalone probe page declared the deck's
   `@font-face` rules and then measured hidden `<span>`s. `await document.fonts.ready`
   resolved *immediately*, because at that moment no element on the page used either face, so
   there was nothing pending to wait for. The probe spans then triggered the load and were
   measured synchronously, **against the fallback metrics**. Every number from that pass was
   too small: Inter prose read 0.376–0.427 when it is really 0.43–0.50, and Source Serif 4 read
   0.412–0.480 when it is really 0.47–0.55.
2. **Render-verified pass — the numbers below.** The same tool was pointed at the real
   `slide-0*.html` files, where both faces are in use and therefore genuinely loaded, and read
   the widest rendered line box of every `p`/`h1`/`h2`/`h3` plus each container's
   `scrollHeight` against its `clientHeight`. These are the numbers to reuse.

The cost of the first pass was **five overflow defects that `validate` reported as clean** —
listed under "what the render caught" below. If you take one thing from this file: a probe page
that only *declares* a face measures the fallback. Measure the real slide, or use the face on
the page before calling `document.fonts.ready`.

### measured advance coefficients (widest rendered line ÷ (chars × font-size))
```
Source Serif 4 600, mixed case, 46pt         0.466 – 0.511   → budget at 0.52
Source Serif 4 600, mixed case, 24pt         0.469 – 0.547   → budget at 0.55
Source Serif 4 600, mixed case, 15–16pt      0.450 – 0.531   → budget at 0.53
Inter 400/500, mixed-case prose, 10–15pt     0.430 – 0.500   → budget at 0.48
Inter 500/600, ALL CAPS +0.06/0.08em         0.594 – 0.894   → budget at 0.80
```
The caps/prose spread is **roughly 2×** on the same face at the same size — `WHO` at 12pt caps
measures 0.894 while `Access follows the team…` at 14pt measures 0.436. Caps labels were
measured separately from prose throughout and no prose coefficient was ever applied to a label.
Short caps strings are the worst case: the coefficient rises as the string gets shorter, because
letter-spacing is a fixed addition per character and the wide letters stop averaging out.

### vertical — what `main` actually gets
Fixed furniture on every sheet, all siblings of `main` in the body flex column:
```
405
− body padding 32 top + 32 bottom                                = 341
− header: section-label row 11pt × 1.4 = 15.4 + margin-bottom 6  = 319.6
          + h2 24pt × 1.3 = 31.2 + margin-bottom 10              = 278.4
          + 0.5pt gold divider                                   = 277.9
− main margin-top 14                                             = 263.9
− footer: 10pt × 1.4 = 14 + margin-top 12                        = 237.9
→ main = 237.8pt on content sheets 02–05   (measured off the render: 237.8)
→ main = 285.8pt on 01 and 06 (label row kept; h2 + divider absent)
```
Final spend, as built, read out of the render rather than estimated — every sheet's
`main.scrollHeight` now equals its `clientHeight` exactly, and no descendant container
overflows:
- **01** 285.8 of 285.8 (slack absorbed by `margin-top:auto` on the presenter line)
- **02** header row 22.9 + 3 rows × 58.1 + gold total row 34.3 = 231.6 of 237.8
- **03** panel triptych 192.7 + gold-ruled note 34.3 = 227 of 237.8
- **04** 2 × 2 grid, 108.8 per panel + 12 row gap = 229.6 of 237.8
- **05** panel triptych 172.4 + gold-ruled note 34.3 = 206.7 of 237.8
- **06** decision ledger 263.7 of 285.8; left column 271.9 of 285.8

### horizontal — character ceilings for lines that must not wrap
```
content measure 640pt on every sheet.

h2 heading   Source Serif 4 600 24pt over 640pt at 0.55 → 48 chars
             longest title "What the elevation record has to capture" = 40 ch / 417.7pt ✓
cover        Source Serif 4 600 46pt over 640pt at 0.52 → 26 chars
             "Who gets into production"    24 ch = 564.0pt ✓
             "Standing access is the risk" 27 ch = 578.3pt ✓  (0.466 — measured, not assumed)
closing      Source Serif 4 600 34pt in a 280pt column, hand-broken to three lines
ledger 02    columns 28 | 12 | 140 | 12 | 448
             label  Inter 600 12pt CAPS +0.06em at 0.80 → 140 ÷ 9.6  = 14 chars (longest = 13)
             claim  Source Serif 4 600 15pt at 0.53     → 448 ÷ 7.95 = 56 chars (longest = 51)
             mech   Inter 400 14pt at 0.48              → 448 ÷ 6.72 = 66 chars (longest = 65)
triptych     panels 200pt, gaps 20pt, inner measure 174.5pt after the 0.5pt borders
             kicker Inter 600 11pt CAPS at 0.80 → 19 chars
             claim  Source Serif 4 600 16pt at 0.53 → 20 chars per line, hand-broken to 2
             mech   Inter 400 14pt at 0.48 → 25 chars per line; written to 4 lines (03), 3 (05)
2×2 (04)     panels 312pt, inner measure 291pt
             claim  Source Serif 4 600 16pt at 0.53 → 34 chars (longest written = 30)
             why    Inter 400 14pt at 0.48 → 43 chars per line, written to 2 lines
closing 06   right column 336pt; question Inter 400 15pt at 0.48 → 46 chars per line, 2 lines
footline     source Inter 400 10pt over 397pt at 0.50 → 79 chars (written to 66)
             disclaimer Inter 500 10pt CAPS +0.06em over 219pt = 35 chars, `white-space:nowrap`
```

**One wrap was caught before a line of HTML existed**, by the pre-write pass, and it was real
even with the bad numbers: the slide-02 table header `HOW IT WAS GRANTED` needs **142pt in a
140pt label cell** at 11pt caps — the exact `READ-ONLY BY DEFAULT` failure from
`decks/iac-drift`, which would have pushed the header row to two lines and dropped the gold
total row past the footline. Rewritten as `THE GRANT` (73.2pt measured). Estimating the
coefficient at the skill's 0.48 starting point would have predicted 95pt and missed it by 50%.

## what the render caught that `validate` did not

Ten defects, all found by opening the PNGs. `validate` reported **6/6 passing while every one
of them was on screen.**

| Sheet | Defect | Fix |
|---|---|---|
| all | **The footline source caption wrapped to two lines on every sheet**, growing the footer and pushing `main`'s content down onto it | Both footline items were flex-shrinkable, so the caption was squeezed below its natural width. `flex:none` on both, and the caption cut from 80 to 66 characters |
| 01 | **The gold hairline under the cover display rendered as nothing at all** — the rule was simply absent from the PNG | `main` was overflowing, and the flex algorithm shrank the 0.5pt rule (a flex item with the default `flex-shrink:1`) to zero height. `flex:none` on `.rule-gold` and `.panel .hair` pins every hairline in the deck. **This one is worth remembering: a sub-point-height flex item does not overflow, it vanishes.** |
| 02 | The gold total row slid out of `main` and printed on top of the footline | Two of three mechanism lines wrapped, on the bad coefficient. All three rewritten to ≤66 characters; row padding 11 → 6pt |
| 03 | The closing note wrapped to two lines and printed on top of the footline | Note cut 98 → 79 characters; panel mechanism copy cut so each panel takes four lines, not five |
| 04 | The WHAT panel's requirement wrapped and the WHY panel's reason ran to three lines, so both burst their gold-hairline panels onto the sheet below | Serif requirements cut to ≤30 characters (the real 291pt measure is 34, not the 38 the bad probe implied); the WHY reason cut 84 → 57 |
| 05 | The closing note wrapped to two lines and printed on top of the footline | Note cut 92 → 76 characters |
| 06 | Both columns were vertically centred but are different heights, so their first lines sat **~26pt apart** | Both columns top-aligned, and the left column given a closing recap line so it fills its share instead of leaving a dead navy band above the presenter line |
| 01 | The left prose and the right panel started at different y, because the panel's 12pt inner padding offsets its first line | Matching `padding-top:12pt` on the premise |
| 02 | The last row's 1px navy rule sat ~4pt above the gold total rule and read as one doubled line | The border is coloured `transparent` rather than removed, so every row keeps an identical box — removing it would have made the last row 0.75pt shorter than its siblings |
| 03, 05 | Three panels ended on a one-word runt line (`most.`, `awake.`, `does.`) | All three rewritten; panels on 05 now take three lines each and on 03 four lines each |

Two more were caught by `validate` rather than the eye, and both were leading: `line-height:1.3`
clipped descenders on the 46pt cover display and the 34pt closing display. Both went to 1.35.
Nothing was made smaller to fix a clip.

## visual thesis
An investment-bank control memo, not a security-awareness deck. Deep navy pages, one metallic
gold hairline doing all the dividing, a transitional serif carrying every claim, and a
disclaimer footline on every page saying who this is for and what it is not. The reader should
feel the deck is *on the record*, because being on the record is the argument.

## content plan
cover → why permanent access accumulates (three grants that never ended) → what real least
privilege costs (the honest bill) → the four fields an elevation record has to capture → why an
unread record is the same as no record → what we need to decide

---

## slide-01 — cover
- Layout: gold section label `ACCESS GOVERNANCE · INTERNAL` left, `PROD-ACCESS · 01 / 06` right.
  Two display lines: `Who gets into production` in off-white over `Standing access is the risk`
  in gold, both 46pt Source Serif 4. Full-width 0.5pt gold hairline. Below it a two-column row:
  left, the premise in 16pt Inter; right, a navy panel with a 0.5pt gold hairline carrying the
  mechanism in serif. Presenter placeholder above the footline.
- Key message: the risk is not who is allowed in, it is who is *permanently* allowed in.
- Intent: the visual anchor the gate demands on a cover — two lines of giant serif and one gold
  rule, with the mechanism already visible so the deck's answer is on screen from sheet one.
- `PRESENTER · TEAM` is a **placeholder**. No name is invented.

## slide-02 — "Why permanent access accumulates"
- Layout: the style's financial table. Header row (`#` / `THE GRANT` / `WHAT MAKES IT
  PERMANENT`) with a 0.5pt gold bottom rule, three ledger rows separated by 1px `#3A5A85` rules,
  and a **total row** under a 0.5pt gold top rule — the spec's own table vocabulary.
- `01 NEVER REVOKED` — Granted for an incident, and the incident ended. *The role outlives the
  reason, and nothing in the system knows the reason has ended.*
- `02 INHERITED` — Granted to a group, and the group kept growing. *Access follows the team, not
  the task, so joining inherits all of it.*
- `03 THE EXCEPTION` — Granted to unblock a launch, and the launch shipped. *Removing it costs a
  conversation. Keeping it costs nothing anyone feels.*
- Total row: **Access is the only thing we add without a review date.**
- Intent: nobody decides to hold production forever. Three ordinary grants, each reasonable at
  the moment it was made, and no mechanism anywhere that ends them. Accrual is the default state,
  not a lapse of discipline.

## slide-03 — "What least privilege actually costs"
- Layout: three navy panels (0.5pt gold hairline, no fill emphasis), each a gold kicker, a serif
  claim, a 0.5pt gold hairline, and the mechanism in 14pt Inter. Gold-ruled closing note below.
- `LATENCY` — The fix waits on a question. *The person who can repair it is the person who has
  to ask first, and 03:00 is when asking costs most.*
- `ATTENTION` — Someone has to be awake. *A permission that expires is a permission requested
  again, and every request needs an approver who is reachable.*
- `THE MISSING MAP` — You have to know what is needed. *Granting only what is needed means
  knowing it per service and per role, and that map goes stale fast.*
- Closing note: **Least privilege priced honestly is not free — which is exactly why standing
  access wins by default.**
- Intent: take the cost seriously. A deck that treats least privilege as obviously correct
  cannot explain why nobody has it. Naming the bill is what makes break-glass an answer rather
  than a slogan.

## slide-04 — "What the elevation record has to capture"
- Layout: 2 × 2 grid of navy panels with 0.5pt gold hairlines. Each panel: gold uppercase field
  name, the requirement in 16pt serif, the reason in 14pt Inter. This is the schema sheet.
- `WHO` — A named human, never a shared role. *A record that names a role names nobody. There is
  no one left to ask what happened.*
- `WHAT` — The account, the role and the resource. *"Production" is a place, not a scope. Written
  wide, it proves only that something happened.*
- `WHY` — The ticket, written before the grant. *A reason supplied afterwards is a reason
  invented afterwards, and it always sounds fine.*
- `WHEN IT LAPSED` — The expiry, and who or what ended it. *A grant with no observed end is
  standing access with a form attached.*
- Intent: this is the `iac-drift` one-liner unfolded. Each of the four fields has a way of being
  filled in that satisfies an auditor and tells you nothing, and each panel names that failure
  rather than the field.

## slide-05 — "A record nobody reads is not a record"
- Layout: the same triptych module as 03, with restrained gold chevrons in the gutters — the
  three conditions are sequential, not parallel. Gold-ruled closing note below.
- `A NAMED READER` — "Someone reviews it" means no one does. *A review with no owner is a review
  that is always about to happen.*
- `A FIXED CADENCE` — On a schedule, or never. *Read weekly, the record is a control. Read after
  the incident, it is only evidence.*
- `A CONSEQUENCE` — The read must change something. *If it cannot revoke a role, narrow a scope
  or close a gap, it is a reading exercise.*
- Closing note: **A log with no reader, no cadence and no consequence audits as compliant and
  controls nothing.**
- Intent: the part the one-line rule cannot carry. Writing the record is the cheap half; the
  expensive half is the read, so the read is what gets quietly dropped — and the result passes
  audit, which is why nobody notices.

## slide-06 — closing / what we need to decide
- Layout: two columns. Left, `DECISIONS` kicker over `What we / need to / decide` at 34pt with
  `decide` in gold, a gold hairline, and the `PRESENTER · TEAM` placeholder. Right, three
  decision prompts on a gold-hairline ledger.
- `01 · STANDING ACCESS` — Can standing access go to zero, or is there a floor — and who owns
  what is left?
- `02 · THE WINDOW` — How long does the glass stay broken: a fixed window, or the length of the
  incident?
- `03 · THE READER` — Who reads the record, how often, and what are they allowed to change?
- Intent: a closing sheet with a real visual anchor that ends on the three questions this deck
  is not entitled to answer for the room.
