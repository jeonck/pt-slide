# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/staging-parity/gate-preview/slide-01.png, decks/staging-parity/gate-preview/slide-02.png, decks/staging-parity/gate-preview/slide-03.png, decks/staging-parity/gate-preview/slide-04.png, decks/staging-parity/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 9d143486542e9ea559250f037954fb7c438e12c9639713cfc2a624079a346066, slide-02.html: dbac969a6f967f498f0b082f17339bdf917e56e26a9d34379d3f8d4082e2ff4c, slide-03.html: 3083addd800b35336d1927c9bfde5554309cdbda9491e17c9d4e0cdf6ed0c0e0, slide-04.html: df8b453201de64ac89037eebda44fd1e487ffadabc491f6b8f276d44745f73c4, slide-05.html: 6894e8fa43123b4528c37d82be19d711d274216b8f34a668dd85e87f0ea6eb82
Unresolved Critical: 0
Blocking findings: None

Style contract: `ppt-engineered-dark-deck`, read from `npx slides-grab show-design` and
reproduced in `slide-outline.md` under "contract". Method: read all five slide sources, then
grepped the full colour, font-size and line-height inventory out of them (below) rather than
judging by eye.

## Checks

- [x] System consistency: PASS — one layout skeleton is declared once and reused on all five
  sheets: `body{padding:32pt 40pt; flex column}` → kicker row (kicker left, mono counter
  right) → `h2` → `main{flex:1; min-height:0; margin-top:18pt}` → `footer` source caption.
  Because header and footer are siblings of a `flex:1` main, the caption lands at the same y
  on every sheet; measured in the browser, `footer` top is **y=359pt on all five**. Two
  backgrounds only (`#0E0E11` bg, and no filled surfaces at all — every box is an unfilled
  1px hairline frame, which is the style's stated card treatment). Two faces only: Inter and
  JetBrains Mono. One accent: `#8B7BF0`. Sheet-specific CSS is additive to the shared block,
  never a redefinition of it.
- [x] Color discipline: PASS — the complete colour inventory across all five files is
  `#0E0E11` (bg), `#F4F4F5` (text strong), `#9CA3AF` (text), `#6B7280` (text muted),
  `#26262C` (border), `#2E2E36` (surface bar), `#8B7BF0` (accent), which is also the corner
  wash — the wash is the accent token at `fill-opacity: 0.10`, carried in a base64 data-URI
  SVG so it is a background rather than a sibling element. Every one is a
  token from the style spec; nothing else appears. `#2E2E36` is the spec's `surface bar`
  token used as an in-card divider because the `#26262C` border token was invisible inside a
  `#26262C`-framed card; recorded in `design-debt.md` §5. The wash alpha is recorded in
  `design-debt.md` §1. `#3FB8C4` is deliberately unused: `grep` finds five hits and all five are
  inside the CSS comment quoting the spec's glow definition, never in a property value.
- [x] AI slop tropes: PASS — no gradient of any kind. `grep -c "gradient"` returns 1 per file, and all
  five hits are the word inside the CSS comment that explains why there is no gradient — no
  `linear-gradient`/`radial-gradient`/`conic-gradient` function appears anywhere
  (`grep -c "\-gradient("` = 0 in all five). The style's radial glow is rendered as a
  flat-alpha fill, per the skill's rule for gradient-specifying specs. No shadow (`box-shadow` absent; the spec sets
  `shadow: none`). No SVG illustration — the only SVG is two 35×10 connector arrows on
  slide 02, which is the style's declared diagram connector. No emoji, no icon font, no stock
  icon. No generic font stack: Inter and JetBrains Mono are the faces this style names, both
  embedded locally. No 3×2 icon grid. The rounded card with a left stripe appears exactly
  twice, on the two closing strips, where the spec's own vocabulary assigns it meaning ("one
  highlight border `#8B7BF0`"); it is not the deck's default container — the default is an
  unfilled hairline box with no stripe.
- [x] Content discipline: PASS — there is no number anywhere in this deck other than the
  slide counters and the `01`–`04` step/index numerals. No percentage, no duration, no cost,
  no benchmark, no chart, no KPI tile, no stat strip. `grep -E "[0-9]+%|[0-9]+x|\\$"` returns
  nothing. The reasoning is recorded in `slide-outline.md` under "no figures, and why", and
  the style's mandatory bottom-right `source_caption` slot carries that disclosure verbatim on
  all five sheets instead of a citation. The presenter line is the placeholder
  `Presenter · Team`; no name, team or company is invented.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| all | Style's radial glow rendered as a flat fill; repo forbids gradients | Note | First stop used as flat fill, disc centre moved off-canvas so it reads as a corner wash rather than an object | fixed, logged in design-debt.md §1 |
| all | Type scale not uniformly scaled 0.75 to the canvas | Note | Body/caption/mono held at or above spec size so nothing falls under the 14pt body / 10pt absolute floors | accepted, logged §2 |
| slide-02 | Spec marks the active node with a 1.5px border; siblings would misalign by the delta | Note | All nodes keep 1px; the active node changes `border-color` only | accepted, logged §3 |
| slide-04 | Spec's comparison pattern marks a recommended column; none is marked | Note | Deliberate — slide 05 asks the room to choose | accepted, logged §4 |
| slide-04 | `#26262C` divider inside a `#26262C`-framed card rendered as absent | Minor | Moved to the spec's `surface bar` token `#2E2E36` | fixed, logged §5 |
| all | `accent teal #3FB8C4` unused | Note | Spec permits it for chart series only; there are no charts | accepted, logged §6 |
