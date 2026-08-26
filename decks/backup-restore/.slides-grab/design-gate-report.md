# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-26T15:46:27.996Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/backup-restore/.slides-grab/gate-preview/slide-01.png, decks/backup-restore/.slides-grab/gate-preview/slide-02.png, decks/backup-restore/.slides-grab/gate-preview/slide-03.png, decks/backup-restore/.slides-grab/gate-preview/slide-04.png, decks/backup-restore/.slides-grab/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: eb856228adc80e06e586e21fa931c61ad699da6689574eff3918ccbc98f37d25, slide-02.html: d6236cec051ba37679a02959f1be3a7fafbcf8ae5e8c88e6481385038bc8b906, slide-03.html: 3971d70cc79c3b3942bebe9ab07e7268cfc1f8ddc55f9c705b43d42b4767e2b0, slide-04.html: 4c202413769f881638203a10fca17aa4636513469fa1b8ce60baa2da9124b804, slide-05.html: 5a0387bc6f481a14e5702be833e745fd72a113b461c3a03dd62147f10d115806
Unresolved Critical: 0
Blocking findings: None

## Checks

- [x] System consistency: PASS — Every sheet is the same frame: `body` padding 32/62/26pt, a
  centred header of kicker → 26pt Playfair title → 34pt gold rule, and the fixed bottom-right
  italic source caption. Verified by reading the five files: the `<style>` block is byte-identical
  across all five, and `grep` confirms one `background:#EDE6D6` and one `color:#3A2E1F` per file.
  Backgrounds: 2 (`#EDE6D6` bg, `#F4EFE3` surface — surface appears only on slide-04's step IV).
  Faces: 2 (Playfair Display for h1/h2/h3 and the step numerals; EB Garamond for everything else).
  Accent: 1 (`#A8893E`), and it appears only as a 1px rule, a 1px node/badge border, an arrowhead
  stroke and a 5pt lozenge — never as a fill of any size. Layout patterns are declared in
  `slide-outline.md` and reused: header block on 02–05, centre-axis stack on 01, and the three
  body treatments are the spec's own `diagram.matrix` (02), `diagram.comparison` (03) and
  `diagram.process` (04).

- [x] Color discipline: PASS — Enumerated every colour literal in the five files:
  `#EDE6D6`, `#F4EFE3`, `#3A2E1F`, `#A8893E`, `#6B5D46`, plus `transparent`. The first four are
  spec tokens verbatim from `slides-grab show-design ppt-heritage-luxury-deck`. `#6B5D46` is the
  one documented harmonic extension, sitting between the spec's `text` and `text-muted` on the
  same hue, added because the spec's `#8A7C63` measures 3.28:1 on the background and fails the
  4:1 the skill sets for secondary text; recorded in `slide-outline.md` and `design-debt.md` with
  the measured ratios. No untracked colour exists. No gradient of any kind: `grep -c gradient`
  over the deck returns 0, and there is no `radial-gradient` pattern tile either. No shadow:
  `grep -c box-shadow` returns 0. `border-radius` appears exactly four times, all on the 22pt
  step badges the spec defines as circles; every panel corner is 0.

- [x] AI slop tropes: PASS — No full-bleed gradient (no gradient at all). No rounded card with a
  left stripe used as a default container; the only bordered containers are slide-04's four
  process nodes, which are the spec's `diagram.node` (square, hairline, no stripe). No SVG
  illustration — the single inline SVG per connector is a 16pt line plus a chevron, three of them
  on one sheet, and they carry no text. No generic font stack: the two faces are the ones the
  style names, embedded locally from `@fontsource`, with only `Georgia, serif` behind them as a
  fallback. Assets are all local and self-contained: `grep -o 'https\?:' slide-0*.html` returns
  nothing across the five files — the SVG connectors' `xmlns` attribute was stripped, since the
  HTML parser puts inline `<svg>` in the SVG namespace on its own and the attribute was the only
  `http:` left in the deck. The arrowheads were re-rendered and confirmed still drawn. No emoji: the source files contain no literal non-ASCII byte in any rendered text node (checked by stripping tags and scanning for codepoints > 127 — the set is empty); the only non-ASCII glyphs that reach the screen are `·`, `—` and `’`, written as HTML entities.
  No 3×2 icon-and-caption grid; slide-02 is a 2×2 hairline cross with no icons.

- [x] Content discipline: PASS — This is the deck's central constraint and it was checked
  literally: `grep -nE '[0-9]' slide-0*.html` returns only CSS values, the `©`-free font
  filenames, and the Roman numerals I–IV. **There is not one Arabic numeral in any rendered
  string in the deck** — no hours, no percentages, no durations, no counts, no dates. No chart,
  no canvas, no stat strip, nothing shaped like data. RPO and RTO are named four times and are
  always described as a commitment the audience sets; the fixed source caption states this on
  every sheet. The presenter line is the placeholder `PRESENTER · TEAM`; no name is invented.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Cover's second rule is 200pt, not the 34pt kicker rule | Note | None — different role, both widths present with distinct jobs | tracked in design-debt.md |
| slide-04 | Step badge is a 22pt circle vs the spec's 0.36in (~19pt), numeral 12pt vs 16pt | Note | None — 19pt/16pt clips the numeral | tracked in design-debt.md |
| slide-05 | Gold lozenge separator extends the spec's `gold ◆` out of its comparison-diagram context | Note | None — reusing the 34pt hairline made header and item rules indistinguishable | tracked in design-debt.md |
| all | Source caption carries a statement of fact, not a citation | Note | None — the deck asserts no figures; an invented source would be worse | tracked in slide-outline.md |
| all | `#6B5D46` is not a spec token | Note | Documented harmonic extension with measured contrast | tracked in design-debt.md |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/backup-restore/.slides-grab/gate-preview/slide-01.png, decks/backup-restore/.slides-grab/gate-preview/slide-02.png, decks/backup-restore/.slides-grab/gate-preview/slide-03.png, decks/backup-restore/.slides-grab/gate-preview/slide-04.png, decks/backup-restore/.slides-grab/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: eb856228adc80e06e586e21fa931c61ad699da6689574eff3918ccbc98f37d25, slide-02.html: d6236cec051ba37679a02959f1be3a7fafbcf8ae5e8c88e6481385038bc8b906, slide-03.html: 3971d70cc79c3b3942bebe9ab07e7268cfc1f8ddc55f9c705b43d42b4767e2b0, slide-04.html: 4c202413769f881638203a10fca17aa4636513469fa1b8ce60baa2da9124b804, slide-05.html: 5a0387bc6f481a14e5702be833e745fd72a113b461c3a03dd62147f10d115806
Unresolved Critical: 0
Blocking findings: None

## Method
All five PNGs were opened as images at full size, one at a time — not skimmed from a contact
sheet — and a contact sheet was then read once more as a set to check that the five sheets look
like one deck. The images actually opened were the 1080p renders written to
`decks/backup-restore/gate-preview/` (that directory is gitignored working evidence); the gate
re-rendered the identical fingerprints at 3840x2160 into
`decks/backup-restore/.slides-grab/gate-preview/`, which is what is committed and what the
Evidence line cites. Two full render rounds were done: the first round's images produced
three render-only defects (listed under Findings), the files were edited, and the second round's
images are the evidence cited above. In addition, a Playwright pass reported, for every element
on every sheet, `scrollHeight − clientHeight` and the rendered line count of every text node —
this is what confirms the "one line" and "two lines" claims below rather than eyeballing them.

## Checks

- [x] Composition & hierarchy: PASS — One job per sheet. slide-01: the claim, and nothing else;
  the anchor is a 44pt Playfair line filling the middle third of the canvas, which at
  presenting distance is the only thing on the sheet. slide-02: four silent failures on a gold
  hairline cross — the cross itself is the anchor, and the four cells are read as one object.
  slide-03: a two-column comparison split by a full-height gold hairline; the anchor is that
  divider. slide-04: four square hairline nodes in a row with chevron connectors — an unmistakable
  left-to-right sequence. slide-05: three questions stacked on the centre axis, separated by gold
  lozenges; the anchor is the vertical rhythm of numeral → question → sub. Cover and closing
  sheets both have a real visual anchor, not just text. Checked in the images that the four
  slide-04 node labels sit on one baseline and the four sub-lines sit on another (they do — the
  active step is marked by fill only, so no box metric changed), and that slide-03's two column
  kickers and their 34pt rules sit at identical y (they do).

- [x] Typography & legibility: PASS — Sizes present in the deck, read off the source and confirmed
  in the render: 44pt cover title, 26pt sheet titles, 19pt closing questions, 16pt cell headings,
  15pt cover thesis, 14pt body and node labels, 12pt node subs and decision subs, 11pt kickers,
  10pt closing numerals and the source caption. **Nothing is below 10pt.** Body copy is 14pt or
  larger everywhere. `line-height` values in the deck are 1.3, 1.35, 1.4, 1.5, 1.55 and 1.6 —
  there is no `1` and no `1.05`; the first validate run failed with `text-clipped` on the 44pt
  h1 and all four 26pt h2 at 1.25/1.3 leading, and the fix was to raise the leading, not to shrink
  the type. Contrast on the `#EDE6D6` ground: body ink `#3A2E1F` at 11.8:1, secondary `#6B5D46` at
  5.15:1. The gold `#A8893E` measures 2.66:1 and is therefore used for **no text at all** — only
  rules, borders, an arrowhead and a lozenge. Checked in the images that the 10pt italic caption
  and the 10pt Roman numerals are actually readable at full size; they are.

- [x] Korean/CJK word-break integrity: PASS — Not applicable in the ordinary sense: the deck is
  English-only and contains no Hangul or CJK codepoint (verified — no rendered text node holds any
  character above U+007F). Pretendard and its licence were deleted from `assets/fonts/` after
  scaffolding, so there is no CJK face to fall back to and no tofu risk. The equivalent English
  hazard — ragged or orphaned wraps — was checked instead, and one was found and fixed: slide-03's
  right column left the single word "promised." alone on a line. `text-wrap: balance` on the
  column paragraphs and on the cover thesis fixed it; every wrapped paragraph in the deck now
  breaks into lines of comparable length, confirmed in the round-two images. No line anywhere in
  the deck ends with a one-word orphan.

- [x] Review Litmus: PASS — Read cold at three seconds a sheet: 01 "a backup you have never
  restored is not a backup", 02 "four ways it fails quietly", 03 "a sample proves nothing",
  04 "the output is a corrected runbook", 05 "three decisions". That is the argument, in order,
  with no sheet needing a second look. Strip the decoration and the deck survives — the gold is
  four hairlines and a lozenge, and removing them would cost structure, not meaning. Lines that
  could be cut were cut: slide-02's cell bodies are two-sentence pairs of ≤40 characters, and each
  sheet carries one closing italic line rather than a summary block. The deck holds 5 sheets, 5
  titles, 16 short body lines and 3 questions in total.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-03 | Round 1 render: the two-column block was stretched to full height, so a ~230px dead zone opened under the shorter left column and the sheet read as bottom-heavy. `validate` passed it 5/5. | Major | Comparison block made auto-height and vertically centred inside `main`; the divider now stretches to the taller column only. | fixed, re-rendered |
| slide-03 | Round 1 render: right column wrapped "…in the time you promised." leaving "promised." alone on a line. | Minor | `text-wrap: balance` on the column paragraphs. | fixed, re-rendered |
| slide-05 | Round 1 render: the item separators were the same 34pt gold hairline as the header rule, so the header rule read as the first item's separator and the sheet lost its header/body distinction. | Major | Separators changed to a 5pt gold lozenge (the spec's `◆`); header rule left as the only hairline on the sheet. | fixed, re-rendered |
| slide-04 | Round 1 render: three nodes were bordered `#C4B79A` and the active one `#A8893E`, making the border colour do two jobs at once and pulling the chart token into a border role. | Minor | All four nodes take the identical 1px `#A8893E` border; step IV is marked by a `#F4EFE3` fill, which changes no box metric. | fixed, re-rendered |
| slide-04 | Round 1 render: the step badge was a square, against the spec's `diagram.step_badge: 0.36in circle`. | Minor | Badge made a circle at 22pt with a 12pt numeral at leading 1.4. | fixed, re-rendered |
| slide-05 | Round 2 render: only ~19pt separated the header rule from the first Roman numeral. | Minor | Separator height reduced 19pt → 14pt and sub margin 5pt → 4pt to free budget; the list's top margin raised 6pt → 18pt. | fixed, re-rendered |
| slide-03 | The divider hairline runs about 110pt past the left column's last line. | Note | None — the asymmetry is the argument, and padding it would mean inventing a claim. | tracked in design-debt.md |
| slide-01 | Cover thesis balances to two lines of which the second is slightly the longer. | Note | None — `text-wrap: balance` chose it; both lines are full and neither orphans. | accepted |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: eb856228adc80e06e586e21fa931c61ad699da6689574eff3918ccbc98f37d25
- slide-02.html: d6236cec051ba37679a02959f1be3a7fafbcf8ae5e8c88e6481385038bc8b906
- slide-03.html: 3971d70cc79c3b3942bebe9ab07e7268cfc1f8ddc55f9c705b43d42b4767e2b0
- slide-04.html: 4c202413769f881638203a10fca17aa4636513469fa1b8ce60baa2da9124b804
- slide-05.html: 5a0387bc6f481a14e5702be833e745fd72a113b461c3a03dd62147f10d115806
