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
