# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/postmortem/gate-preview/slide-01.png, decks/postmortem/gate-preview/slide-02.png, decks/postmortem/gate-preview/slide-03.png, decks/postmortem/gate-preview/slide-04.png, decks/postmortem/gate-preview/slide-05.png, decks/postmortem/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 0ba175928c49217d01c4fa6cd93b35bdf0a17a99f28f209585be64bb52260748, slide-02.html: 7f2410d3258148927c89feabb5058d56a3f1b167d93f0120f9db2ad43a2e90d9, slide-03.html: c804f7e68d5f9700b08c83b07cdd22128981f321f67c5b275c82391100b0243f, slide-04.html: 46a63b9a505cdc1f841eda9e2ef153bdb8cc0686371768c935db65c1dbcd0c8e, slide-05.html: ca1d26be40cf1a2832919bcda5c7772d9d58768498c5d9da5236c5e042a32955, slide-06.html: c679f4b5d56a2715991e1051c39b0a784315b680d78df7a76470841dd1b4887f
Unresolved Critical: 0
Blocking findings: None

Method: the six slide sources were read in full, every declared `font-size`, `line-height`
and colour literal was enumerated with grep, and the rendered PNGs listed above were opened
individually to confirm that what the CSS declares is what the sheet shows.

## Checks
- [x] System consistency: PASS — One layout system across the deck: masthead kicker row, 2pt
  section rule, `main`, 0.5pt hairline, folio row, in that order on all six sheets, with
  `main{flex:1;min-height:0}` pinning the furniture to the same y everywhere (verified with
  getBoundingClientRect: `main` bottom is 346.1pt and the footer top 365.6pt on every sheet).
  One background (`#F4F1E8`) and no second surface — there is no filled panel anywhere, which
  is what the style's "구획은 룰 라인으로" clause asks for. Two serif families in fixed roles
  (Playfair Display for masthead/headline/subhead, Noto Serif for prose) plus Inter for meta
  type only; the three-family count is the contract's own, recorded in design-debt.md. One
  accent, used once per sheet. Column division varies 2 · 3 · 3 · 2 · 2 · 3 as the spec
  requires of a magazine, but the column mechanics (16pt gap, 0.5pt full-height rule as a grid
  item, kicker → subhead → prose) are identical everywhere.
- [x] Color discipline: PASS — grep over all six files returns exactly four hex literals and
  all four are spec tokens: `#F4F1E8` (bg), `#1C1B17` (text/border/rules), `#2E2C26`
  (text body), `#A8231B` (accent). No fifth colour, no harmonic extension was needed, no
  gradient, no fill. The accent appears as one kicker on slides 01–05 and as the 2pt closing
  rule on slide 06 — never as body text and never as a fill, per the Avoid list.
- [x] AI slop tropes: PASS — No gradient (grep for `gradient` returns nothing), no rounded
  corner (no `border-radius` anywhere), no shadow, no card container, no left stripe, no SVG
  illustration, no icon, no emoji, no 3×2 icon grid. The visual vocabulary is type, hairline
  rules and column measure only. The fonts are the ones the style names, embedded locally from
  `@fontsource/*`; there is no generic Inter/Roboto/Arial stack standing in for a decision —
  Inter appears because the contract assigns it to caption type, and only there.
- [x] Content discipline: PASS — There is no number in this deck. No percentage, count, rate,
  duration, benchmark or stat strip appears on any sheet, and there is no chart or fake chart
  (no `canvas`, no div-bar). Every claim is a mechanism the audience can check against their
  own last review. The style's mandatory source/dateline slot is used to say so rather than to
  carry a fabricated citation: the cover byline column reads "Source — none. No metric, rate or
  duration appears in this deck; the argument is mechanical," and every sheet's folio repeats
  it. The presenter is the placeholder "Presenter · Team"; no name or organisation is invented.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Masthead set at 64pt, above the 42pt the spec's display size scales to | Note | Accepted and recorded in design-debt.md — one word, the cover's only anchor, measured to fit the 656pt measure | tracked |
| all | Three type families where the Pass A heuristic prefers two | Note | Accepted — the style contract itself declares three and reserves the sans for meta type. Recorded in design-debt.md | tracked |
| all | Spec texture (paper grain 5%) not applied | Note | Accepted — the gradient-free implementation read as compression noise at 1080p. Recorded in design-debt.md | tracked |
| all | Spec's halftone photograph vocabulary unused | Note | Accepted — no photograph would be evidence for this argument; columns carry the sheets instead | tracked |
