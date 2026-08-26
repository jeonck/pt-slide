# Blameless postmortems — what the word actually costs · slide outline

## meta
- deck: decks/postmortem
- mode: html
- style: `ppt-print-first-newspaper` (bundled) — **chosen**, see "why this style". `show-design`
  output is treated as a contract; the `## Avoid` list is reproduced under "contract" below.
- slide-size: 720pt × 405pt
- language: English
- audience: engineers and the managers who sign off on incident reviews. Everyone in the room
  has been in a review that ended with a person instead of a change.
- tone: mechanism, not sermon. No scolding, no "psychological safety" vocabulary. Every claim
  has to survive "why does that happen?"
- slides: 6 (cover · purpose vs. use · three concessions · candour · how it quietly fails · decide)
- charts: **none.** No number, rate, duration, count or benchmark appears anywhere. See
  "no figures" below.
- fonts: Playfair Display 900/400, Noto Serif 400/700, Inter 500 — all embedded locally under
  `./assets/fonts/` from `@fontsource/*`. Pretendard deleted by hand after scaffolding: this
  deck has no Hangul and four Pretendard faces are ~3MB of dead weight. No `http(s):` URL
  appears in any saved slide.

## why this style
Three candidates were on the table: `ppt-print-first-newspaper`, `ppt-minimal-mono-note`,
`ppt-editorial-infographic-deck`. Picked the newspaper.

- The subject **is a document.** A postmortem is a written, filed, published account of an
  event, and the argument of this deck is about what that document is allowed to say — what
  goes in the cause field, whose name appears, what the last paragraph commits to. Newsprint
  is the one visual language where "who gets named in print" is the native question.
- `ppt-editorial-infographic-deck` is a data-journalism style: big serif numerals, KPI cells,
  emphasis bars, direct-labelled charts. With no numbers permitted, more than half of its
  signature vocabulary would go unused, and the temptation to invent a figure to fill a
  54pt numeral slot is exactly the failure this deck is arguing against.
- `ppt-minimal-mono-note` is single-column by contract ("다단 레이아웃 금지") and caps the body
  at 8 lines with a 60% content width. The core sheets here are comparisons — what a review is
  for *versus* what it is used for, three concessions side by side — which want parallel
  columns. Forcing them into one column would make them read as a sequence, not a contrast.
- Also checked against the ten decks already in this repo: none uses a cream newsprint ground
  with a serif masthead. `iac-drift` (swiss-editorial) is the nearest neighbour and is
  sans-serif, black/orange, giant-type — no collision.

## no figures, and why
There is no chart and no number in this deck. "X% of incidents are caused by human error",
"teams that run blameless reviews resolve N% faster", mean-time-to-anything — these exist in
vendor decks and conference slides and nowhere this repo can cite. Inventing one would be
Critical under the gate's content-discipline check, and it would be the weakest joint in the
argument: the thesis is **mechanical** — a name in the cause field ends the search, an action
item without an owner has no one to be late — and a mechanism does not need a percentage to
be true. The style's mandatory source/dateline slot therefore carries that fact instead of a
citation: every sheet's footer reads `SOURCE — NONE. EVERY CLAIM HERE IS MECHANICAL, NOT
MEASURED.`, and the cover's byline block states it in full.

## contract (from `npx slides-grab show-design ppt-print-first-newspaper`)
- bg / surface `#F4F1E8` · text `#1C1B17` · text-body `#2E2C26` · accent `#A8231B` ·
  border `#1C1B17` · chart-3 (muted ink) `#8E8B82`
- display **Playfair Display** 56pt w900 tracking −0.01em · heading Playfair Display 36pt w900
- deck Playfair Display 22pt w400 · body **Noto Serif KR** 20pt w400 leading 1.4 ·
  caption **Inter** 13pt w500 tracking 0.12em
- spacing unit 8 · margin_x 0.6in · margin_y 0.5in · **3–4 columns** · column_gap 0.25in
- radius **0px** · rule_hairline 0.5pt `#1C1B17` · rule_section 2pt `#1C1B17` · shadow none
- texture paper-grain 5%
- step_number: Inter 13pt uppercase 0.12em kicker, **no badge shape**
- **Avoid:** no gradient / colour fill / rounded corner / shadow · **no colour other than the
  red, and never red as body text** · no sans-serif headline — headlines are serif, sans is
  for meta type only · **no single-column or centred layout — multi-column is the identity** ·
  no emoji, icon, illustration or clipart · **do not leave the sheet sparse — fill the columns**

## design decisions recorded against the contract
1. **Point sizes scaled by 0.75, not copied.** The spec targets 13.33 × 7.5in; this canvas is
   10 × 5.625in. Display 56 → 42 (masthead set larger at 72pt: it is one short word and the
   masthead is the identity), heading 36 → 27 (**set at 28pt**, see budget below), deck 22 →
   16.5 (**17pt**), body 20 → 15, caption 13 → 9.75 → **raised to 11pt**, which is above the
   framework's 10pt floor. Nothing anywhere is below 11pt; nothing prose-sized is below 14pt.
2. **Margins rounded to the 8pt unit.** 0.6in × 0.75 = 32.4 → **32pt**; 0.5in × 0.75 = 27 →
   **24pt**. Content box is therefore 656 × 357pt. Column gap 0.25in × 0.75 = 13.5 → **16pt**.
3. **Body face is Noto Serif (Latin), not Noto Serif KR.** The spec names the KR family
   because the source deck is bilingual; this deck has no Hangul, and the Latin cut is the
   same design at a fraction of the weight.
4. **Three families, where Pass A prefers two.** The style contract declares three roles —
   serif display (Playfair Display), serif body (Noto Serif), sans meta (Inter) — and
   explicitly requires the sans for meta type only. The contract wins over the two-face
   heuristic; recorded here and in `design-debt.md` rather than passed over in silence.
5. **Red is one point per sheet.** `#A8231B` appears exactly once on each slide — as a single
   kicker, or as the 2pt rule above the closing line on slide 06 — and never on body text,
   never as a fill. No colour outside the spec token list is used anywhere.
6. **Paper-grain texture omitted.** The spec asks for 5% paper grain. A tiled data-URI SVG
   was the only gradient-free way to get it, and at 5% over `#F4F1E8` it read as compression
   noise in the 1080p render rather than as paper. Dropped deliberately; logged in
   `design-debt.md`.
7. **Column bodies never centre, never sit alone.** Every content sheet runs 2–3 columns
   divided by full-height 0.5pt hairline rules, per the "multi-column is the identity" clause.
   Column count and division change from sheet to sheet (3 · 3 · 2 · 2 · 3) so the deck reads
   as a paper, not as one template repeated.

## height budget (computed before the first slide was written)
Canvas 405pt − body padding 24 + 24 = **357pt** of vertical content.

Fixed furniture, identical on every sheet:
- masthead kicker row 11pt × 1.4 = 15.4
- 2pt section rule + 6pt margin = 8
- footer: 12pt margin + 0.5pt hairline + 7pt margin + 11pt × 1.4 = 34.9

`main` therefore has 357 − 15.4 − 8 − 34.9 − 14 (its own top margin) = **≈ 284.7pt**.

Inside `main` on a three-column sheet: headline 28 × 1.25 = 35 + 10 margin = 45; hairline
+ 10 margin = 10.5; the column band gets ≈ 229pt. Each column spends 21.4 on its kicker,
50 on a two-line subhead block (`min-height` applied to **all** columns so their first body
lines sit on the same baseline — a subhead that wraps on one column only would push that
column's prose down and break the grid), leaving ≈ 157pt ≈ **7 body lines**.

## width budget (measured, not estimated)
Measured with `_measure-postmortem.mjs` against a probe carrying the real strings at the real
sizes, in the real faces. Coefficients came out:

| face / role | sample string | coefficient |
|---|---|---|
| Playfair Display 900, mixed-case headline | `What a review is for, and what it gets used for` | **0.435** |
| Playfair Display 900, mixed-case headline | `What we need to decide` | **0.484** |
| Playfair Display 900, **all caps** masthead | `POSTMORTEM` | **0.751** |
| Inter 500 11pt caps, tracking 0.12em | `SHEET 02 / 06` | **0.650** |
| Inter 500 11pt caps, tracking 0.12em | `CONCESSION ONE` | **0.763** |
| Noto Serif 400 body | `Blameless costs three concessions…` | **0.482** |

So: headline budget **0.49**, all-caps kicker budget **0.78**, body budget **0.50**. The
all-caps kicker runs ~60% wider per character than the serif prose at the same nominal size —
`HOW YOU TELL WHICH ONE YOU ARE IN` needed 260pt in a 197pt column and was cut to
`HOW TO TELL THEM APART`. Headlines are set at **28pt**, where the longest one
(`What a review is for, and what it gets used for`) needs 572pt of the 656pt measure — 13%
slack, enough to survive a copy edit. Column measure is 197pt, so 15pt body wraps at ≈ 26
characters and a column body is written to ≈ 180 characters.

## visual thesis
A front page about a document. Cream newsprint, ink-black serif masthead, hairline column
rules running the full height of the sheet, one red kicker per page and nothing else in
colour. Nothing here is illustrated, because the subject is text: what a review is permitted
to write down.

## content plan
cover → what a review is for vs. what it gets used for → the three concessions the word asks
for → what makes people tell the truth in one → how an org keeps the word and drops the bill
→ the three decisions we owe an answer to.

---

## slide-01 — Cover: POSTMORTEM / What the word actually costs
- 레이아웃: masthead kicker row · 2pt rule · `POSTMORTEM` 72pt Playfair 900 · 2pt rule ·
  full-width headline `What the word actually costs` · hairline · 2 columns: standfirst
  (Playfair 400 17pt) | byline + dateline + source block.
- 핵심 메시지: "Don't blame people" is not a tone. It is a set of concessions an organisation
  has to make, and mostly does not.
- 의도: the anchor. The masthead does the visual work; the byline column carries the
  presenter placeholder and the no-figures disclosure in the style's source slot.

## slide-02 — What a review is for, and what it gets used for
- 레이아웃: headline · hairline · 3 columns divided by full-height hairlines.
- 핵심 메시지: the review answers two questions, and the second one is cheaper. What it is
  for: changing the system. What it gets used for: settling whether one person was careless.
  How to tell which one you were in: read the last paragraph.
- 의도: the reframe. Both readings are legitimate meetings; only one of them changes anything.

## slide-03 — Three concessions the word actually asks for
- 레이아웃: headline · hairline · 3 columns, kickers `CONCESSION ONE/TWO/THREE`.
- 핵심 메시지: (1) no names in the cause field — a name is not a mechanism; (2) an owner and
  a date, or it is a wish — one person, a calendar date; (3) a repeat without a review is a
  new incident, not the old one.
- 의도: the spine of the deck. These are the three things the word costs.

## slide-04 — What makes people tell the truth in one
- 레이아웃: headline · hairline · 2 columns (narrow prose | wide rule-divided list of four
  conditions). Column count changes here on purpose.
- 핵심 메시지: the person who knows most has the most to lose by saying it, and is estimating
  what the transcript gets used for. Four conditions make the estimate come out honest.
- 의도: candour is a consequence of conditions, not of a facilitator's tone.

## slide-05 — Keeping the word, dropping the bill
- 레이아웃: headline · hairline · 2 columns (standfirst | three rule-divided tells).
- 핵심 메시지: the word is free to say and the concessions are not, so the concessions are
  what gets dropped. Three tells: the cause field says "human error"; items are owned by a
  team; the same failure is filed twice under two titles.
- 의도: give the audience a way to audit their own last review from memory.

## slide-06 — What we need to decide
- 레이아웃: headline · hairline · 3 columns (one decision each) · 2pt red rule · closing line.
- 핵심 메시지: who writes it; what the deadline is; what happens when the action items are
  not done. "Nothing" is a permitted answer to the third — it just has to be chosen out loud.
- 의도: the closing sheet is a decision sheet, not a Q&A. The red rule is the deck's last
  point of colour.
