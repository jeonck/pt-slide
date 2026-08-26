# Incident response — the first 30 minutes · slide outline

## meta
- deck: decks/incident-response
- mode: html
- style: ppt-dark-tech (bundled) — **assigned, not chosen.**
- slide-size: 720pt × 405pt
- language: English
- audience: the engineers and managers who get paged, plus whoever has to tell the rest of
  the company what is happening
- tone: a runbook someone can follow while adrenaline is high. Short imperative lines, no
  persuasion, every rule paired with the failure it prevents.
- slides: 6 (cover · what goes wrong · three roles · five checkpoints · severity ladder · decisions)
- fonts: Space Grotesk 400/500/700 and JetBrains Mono 400/500, embedded under
  `./assets/fonts/` from npm `@fontsource/*`. Pretendard removed by hand after scaffolding —
  no Hangul in this deck, and 3MB of it is dead weight. No remote URL anywhere in the HTML.
- presenter: `PRESENTER · TEAM` placeholder on the cover and the closing sheet. No name invented.

## thesis
The bottleneck in the first half hour is rarely diagnosis. It is that nobody said who is in
charge, and nobody told anyone outside the room. Every sheet argues from mechanism — what
breaks, and why it breaks that way — never from a statistic.

## charts and figures — **there is no chart, and here is why**
No chart, no KPI card, no number that claims to be measured. The style offers a rich chart
vocabulary (`slide.chart.*`) and a `diagram.kpi_card` with a 44pt cyan value, and both were
deliberately left unused:

- **MTTR, incident counts, "% of outages where…", industry benchmarks** — none of these exist
  for this audience, and none could be sourced. Rendering an unsourced number in 44pt neon is
  exactly the "made-up data shown as real" that the design gate treats as Critical.
- **No minute markers.** The subject invites `0:00 / 0:05 / 0:15` timeline ticks. Those are
  claimed durations dressed as measurement, and they are also wrong as advice — the first
  half hour is a set of checkpoints that are *passed*, not slots on a timer. Sheet 04 is
  therefore an ordered sequence with no times on it at all, and its caption says so.
- **The severity ladder on sheet 05 is a proposal, not a standard.** It states obligations
  and who gets woken; it carries no response-time SLA and no frequency count. The footer of
  that sheet marks it `LADDER PROPOSED FOR DISCUSSION` so it is not mistaken for policy or
  for measured practice.
- The one number in the deck is in the title — "the first 30 minutes" — and it is the
  framing everyone already uses for the window, not a measurement of anything.

## design tokens (from `slides-grab show-design ppt-dark-tech`)
- bg `#0C0D10` · surface `#16181D` · text `#E4E6EB` · muted `#8A8F9A`
- accent 1 (cyan) `#3DF5E0` · accent 2 (violet) `#9D7BFF` · border `#2A2D35`
- **No colour outside this list.** No palette extension was needed, so `design-debt.md`
  records no colour debt.
- Type: Space Grotesk display/subhead/body, JetBrains Mono for every meta label, kicker,
  index and column head. The style's Avoid list makes mono labels mandatory.
- Depth is neon glow (`0 0 8px` accent), never a diffuse shadow. Radius 4px, never above 8px.
- Background carries the spec's optional 0.5in grid: a 36pt base64 data-URI SVG tile in
  `#16181D`. **Not** a `repeating-linear-gradient` — that would be a gradient, which both the
  style's Avoid list and the repo's slide-html rules forbid.

## fixed furniture — the same on every sheet
Every sheet carries a header (mono kicker row + one-line H1 + hairline rule) and a footer
(mono caption). Both are fixed height, and both are why the budget below has to exist:
content that overruns `main` slides underneath the footer and `validate` does not catch it.

### budget, computed before a single slide was written
```
VERTICAL (content sheets 02–05; sheet 06 has no footer and so gets 26.4pt more)
  405
  − body padding 26 top + 20 bottom              =  46
  − kicker row: mono 13pt × 1.4 = 18.2 + mb 7    =  25.2
  − h1: 26pt × 1.2 = 31.2 + mb 9                 =  40.2
  − hairline 0.75 + mb 13                        =  13.75
  − footer: mt 11 + mono 11pt × 1.4 = 15.4       =  26.4
  ------------------------------------------------------
  main = 405 − 46 − 25.2 − 40.2 − 13.75 − 26.4   = 253.45pt   → write to ≤ 253pt

VERTICAL (cover 01, no h1 rule, meta strip replaces footer)
  405 − 46 padding = 359 for the column.
  kicker 18.2 + 7 · title 38pt × 1.25 × 2 lines = 95 + 18 · cyan rule 1 + 18
  · thesis 17pt × 1.45 × 2 = 49.3 · meta strip 0.75 + 12 + 15.4 = 28.15
  → 227.4 used, ~132pt of slack split 0.8 : 1 between a spacer above the title and one
    below it, so the title block sits just above centre and the meta strip pins to the
    foot. A single spacer put the whole void in one place and read as a hole.
  Cover leading is 1.25, not the 1.2 used for the 26pt H1: at 38pt the repo's rule wants
  more room under the descenders.

HORIZONTAL (the lines that must not wrap)
  content width = 720 − 34 − 34 = 652pt
  chars ≈ width ÷ (font-size × 0.48)
  · H1, Space Grotesk 700 @ 26pt over 652pt  → 652 ÷ 12.48 ≈ 52 chars → written to ≤ 46
  · cover title, 700 @ 38pt over 652pt       → 652 ÷ 18.24 ≈ 35 chars per line → ≤ 24
  · sheet 04 checkpoint prose, 400 @ 14pt over 442pt → ≈ 65 chars → written to ≤ 62
  · sheet 05 table cells, 400 @ 14pt: col2 216pt ≈ 32 ch/line, col3 158 ≈ 23, col4 140 ≈ 20
    → every cell written to fit 2 lines at those widths
  · three-column cards (02, 03, 06): (652 − 32) ÷ 3 = 206.7pt, −28 padding = 178.7pt
    → ≈ 26 chars per line at 14pt. Card copy budgeted at 5 body lines maximum.
```
Longest H1 written: `Three roles, defined by what they don't do` = 42 chars. Under the 46 cap.
The 0.48 coefficient is the repo's measured value for Latin sans; the render is still the check.

### deviations from the style spec, recorded
1. **Sheet 04 uses the vertical `diagram.hierarchy` node/connector form, not the horizontal
   `diagram.process_flow`.** The spec wants 4–5 horizontal steps; five columns across 652pt
   leaves 112pt per node, ≈ 13 characters per line at the 14pt body floor — a checkpoint's
   "passed when" clause cannot be written that narrow without dropping under 14pt, which is a
   gate Critical. The vertical form is the same vocabulary (code-block nodes, 1.5pt straight
   cyan connectors, mono `// 01`, one active node with a cyan glow) turned 90°.
2. **Sheet 05's severity tiers do not narrow downward.** `diagram.hierarchy_funnel` narrows
   each tier; these tiers carry three columns of prose, and narrowing them would break the
   column alignment that makes the ladder readable across rows. Kept: code-block fill, 4px
   radius, mono tier labels, cyan top edge on the top tier.
3. **Type sizes are the framework's, not the spec's absolute points.** The spec targets
   13.33in; this canvas is 10in. Its 17pt body and 11pt caption scale to ~12.75pt and ~8.25pt,
   both under the 14pt body / 10pt absolute floors. Body is 14pt here, mono labels 13pt,
   captions 11pt, H1 26pt, cover display 38pt.
4. **Emphasis borders are carried by every sibling.** A cyan border on only the active node
   would shift that row's content by its own width and break the left rail. Every node in a
   repeated set declares `border:1px solid #2A2D35`; only the colour and the glow change.

## visual thesis
A terminal at 3am. Charcoal ground with a faint machine grid, everything typeset as if it were
being read off a screen: mono for anything that is metadata, sans for anything that is an
instruction. Cyan marks the thing you must do; violet marks the thing you must not. Nothing
decorative, nothing rounded, no illustration — the deck should feel operable, not presented.

---

## slide-01 — cover
- kicker `// RUNBOOK` · `[ 01 / 06 ]`
- Display title, two lines by explicit `<br>`: `Incident response:` / `the first 30 minutes`
- Cyan glowing hairline as the anchor.
- Thesis, two lines: the bottleneck is rarely diagnosis — it is unclear roles and unclear comms.
- Meta strip at the foot: `PRESENTER · TEAM` · `INCIDENT RESPONSE RUNBOOK`.

## slide-02 — "Three failures, none of them technical" · `// 02 — WHAT GOES WRONG`
Three code-block cards, mono header `[ FAILURE 0N ]`, title, mechanism.
- `01` Everyone debugs. Nobody speaks. — the interesting problem pulls in every pair of hands;
  stakeholders go quiet, then arrive asking, and the asking is what slows the fix.
- `02` Nobody says who is in charge. — with no declared owner every call needs consensus; two
  people restart the same service and nobody owns the rollback.
- `03` The timeline is written from memory. — nobody writes while it happens, so the review
  argues about the order of events instead of the cause.
- Closing line: not one of these is a diagnosis problem; each is a decision nobody made.
- Footer marked `NO CHART · MECHANISM ONLY`.

## slide-03 — "Three roles, defined by what they don't do" · `// 03 — ROLES`
Three cards, each split `// DOES` (cyan head, muted body) over `// DOES NOT` (violet head,
full-strength body — the refusal is the point, so it carries the brighter ink).
- `[ COMMANDER ]` does: declares, names who does what, decides, keeps the running log.
  does not: touch a terminal — the moment the commander debugs, the incident has no commander.
- `[ COMMS ]` does: writes to stakeholders on the agreed cadence, including when nothing has
  changed. does not: diagnose or promise a fix time — "we don't know yet" is a complete update.
- `[ INVESTIGATOR ]` does: one hypothesis at a time, tested, result said out loud.
  does not: answer stakeholders, or change production without announcing it first.

## slide-04 — "Five checkpoints, not a clock" · `// 04 — SEQUENCE`
Caption row states the rule: checkpoints are passed, not scheduled — no minute markers.
Five code-block rows joined by 1.5pt straight cyan connectors. `// 01 DECLARE` is the active
node (cyan border + glow) because it is the one that unlocks the other four.
- `// 01` DECLARE — someone says the word out loud. Ambiguity ends there.
- `// 02` ASSIGN — commander, comms, investigator, named in the channel.
- `// 03` STABILISE — restore service first; the cause can wait for the review.
- `// 04` COMMUNICATE — the first update goes out before anyone knows the cause.
- `// 05` RECORD — the log is written while it happens, or it is fiction.

## slide-05 — "What each severity level obliges" · `// 05 — SEVERITY`
Four tiers × four columns: LEVEL / WHEN IT APPLIES / WHAT IT OBLIGES / WHO IT WAKES.
The last column is the punchline — a severity level is a permission to wake people.
- `SEV-1` no workaround, customers blocked — declare first, diagnose second — on-call, service
  owner, duty exec. (top tier: cyan label and cyan top edge)
- `SEV-2` degraded, a workaround exists and it costs someone — commander named, updates on
  cadence — on-call and service owner.
- `SEV-3` contained, no customer impact yet — one owner, no separate comms role — on-call only.
- `SEV-4` known and tolerated — a ticket, not a page — nobody until working hours.
- Footer marked `LADDER PROPOSED FOR DISCUSSION` — it is not a measured standard.

## slide-06 — "What we need to decide" · `// 06 — DECISIONS`
Three question **rows** — the sheet-04 rhythm, not three cards. Each row is one line:
`[ QN ]` cyan · the question · `[ BLOCKS … ]` violet, right-aligned.
- `[ Q1 ]` Who may declare — and must they ask first? `[ BLOCKS SEV-1 ]`
- `[ Q2 ]` What is our comms cadence, and who owns it? `[ BLOCKS COMMS ]`
- `[ Q3 ]` Where does the log live, and who writes it? `[ BLOCKS REVIEW ]`
- Anchor: full-width glowing cyan rule under a 26pt line — *None of this needs a tool.
  It needs a decision.* — then `PRESENTER · TEAM` and `// END`.
- **Why rows and not cards.** Cards were written first and rendered with a ~50pt void inside
  each one, between the question and its bottom-pinned tag: this sheet has no footer, so
  `main` is 279.85pt and three stretched cards only need ~153pt. Growing the question type
  to fill the card pushed it to four lines and overflowed. A single vertically-centred line
  per row cannot open that void at any container height, and it reuses a pattern the deck
  has already taught the reader on sheet 04. Questions were cut to ≤44 characters to hold
  one line at 17pt in the 395pt centre column.
