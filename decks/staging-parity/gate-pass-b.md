# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/staging-parity/gate-preview/slide-01.png, decks/staging-parity/gate-preview/slide-02.png, decks/staging-parity/gate-preview/slide-03.png, decks/staging-parity/gate-preview/slide-04.png, decks/staging-parity/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 9d143486542e9ea559250f037954fb7c438e12c9639713cfc2a624079a346066, slide-02.html: dbac969a6f967f498f0b082f17339bdf917e56e26a9d34379d3f8d4082e2ff4c, slide-03.html: 3083addd800b35336d1927c9bfde5554309cdbda9491e17c9d4e0cdf6ed0c0e0, slide-04.html: df8b453201de64ac89037eebda44fd1e487ffadabc491f6b8f276d44745f73c4, slide-05.html: 6894e8fa43123b4528c37d82be19d711d274216b8f34a668dd85e87f0ea6eb82
Unresolved Critical: 0
Blocking findings: None

## Method

All five PNGs were rendered at 1920×1080 and opened individually as images — not skimmed as a
contact sheet — in two rounds. The first round found three render-only defects that `validate`
had reported clean (below); they were fixed, the deck re-validated, re-rendered, and all five
were opened again. Geometry claims that the eye cannot settle (child-overflows-parent, wrapped
line counts, footer y-position) were measured in the browser with a Playwright probe rather
than estimated, and that probe reported `no child overflow` on all five sheets and
`footer top y=359pt` on all five. Confidence is High because every sheet was viewed at full
size after the final edit, and the fingerprints above are the files that produced those PNGs.

## Checks

- [x] Composition & hierarchy: PASS — one job per sheet, one anchor each. **01**: the 44pt
  `Why staging lies` is the only large element on the canvas, with a 44pt accent rule above
  it; nothing competes. **02**: three-node process reading left to right with accent arrows,
  the third node ringed in accent because that is where the error enters, closed by a
  full-width strip carrying the thesis sentence. **03**: 2×2 of four equal cards — no card is
  emphasised, because the argument is that all four are the same failure. **04**: two columns
  of identical weight with an accent strip beneath, which is the anchor. **05**: three
  numbered questions on a mono rail with the closing line in an accent-bordered strip at the
  bottom; verified in the PNG that the strip is the last thing the eye lands on.
- [x] Typography & legibility: PASS — smallest type in the deck is the 10pt source caption,
  which is the absolute floor and is the style's own caption size; body copy runs 14–17pt.
  No `line-height` below 1.2 anywhere in the deck and none at 1 (inventory: 1.2, 1.25, 1.3,
  1.35, 1.4, 1.45, 1.5). Checked in the PNGs specifically for the failure this repo has hit
  before: no descender is clipped on the 44pt cover title, and the `01`–`04` mono numerals
  are fully formed. Contrast at presentation distance: `#F4F4F5` and `#9CA3AF` on `#0E0E11`
  both read easily in the renders, including where the corner wash lightens the ground; the
  one ink that would not (`#6B7280`) is kept out of the washed corner by placement.
- [x] Korean/CJK word-break integrity: PASS — vacuously, and checked rather than assumed:
  there is no Hangul or CJK character in any of the five slides, so `word-break: keep-all` is
  deliberately not set and neither Layer 1 (words split mid-어절) nor Layer 2 (ragged
  keep-all side effects) can occur. The English equivalent was checked in its place: every
  line that must not wrap was measured before writing and confirmed one line in the render,
  and the one instance of a runt line — two single-word orphans on slide 04 — was found in
  the first render pass and fixed. See findings.
- [x] Review Litmus: PASS — the point of each sheet lands inside 3–5 seconds: 02 "the test
  measured the model", 03 "here are the four differences", 04 "two options, pick one",
  05 "these are the three questions". Strip the hairlines and the accent and the argument
  still stands, which is the test for whether the decoration is carrying the content. Nothing
  is on a sheet twice; the longest single block in the deck is two lines.

## Findings

All three render-only defects below passed `validate` cleanly before they were found by eye.

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| all | The flat corner wash rendered as a hard-edged circular object — a "planet" sitting on the canvas, with its full arc visible inside the frame. The style's Avoid list forbids the glow from becoming a shape. Most obvious on 01 and 05; on 03 and 04 the arc cut across a card and dimmed its border | Major | Moved the disc centre off-canvas past the top-right corner (`background-position: right -170pt top -230pt`, size 460pt) so only a shallow arc is cropped in by two frame edges, and lowered alpha 0.12 → 0.10. Re-rendered and re-checked: reads as a corner wash | fixed |
| slide-04 | Both price lines wrapped to two lines with a single-word runt on the second (`staffed.` / `yet.`), in two side-by-side columns where the runts sat next to each other | Minor | Shortened both to one measured line (`Price: a second production, fully staffed.` / `Price: production tooling we do not have.`); browser probe confirms 1L each | fixed |
| slide-04 | The in-card hairline divider was invisible in the render — 1px `#26262C` inside a card already framed in `#26262C` | Minor | Moved to the spec's `surface bar` token `#2E2E36`; visible and aligned across both columns in the re-render | fixed |
| slide-02 | Node 03's body was 2 lines against 3 in its siblings, leaving that card visibly emptier | Minor | Rewrote to `We report the result as if it were a fact about production.` — 3 lines, and a truer sentence | fixed |
| slide-05 | The third decision's note nearly abutted the closing strip while the gaps between decisions were much larger | Minor | Strip `margin-top` 12pt → 20pt; rhythm is even in the re-render | fixed |
| all | A flat fill has a visible edge where a gradient would not; on the sparsest sheets (01, 05) the wash arc is discernible | Note | Accepted — the alternatives are a forbidden gradient or no style signature at all | design-debt.md §1 |
| slide-03 | Cards carry roughly a line and a half of empty space below the body text | Note | Accepted — the style's declared mood is "airy", and the alternative is inventing copy to fill boxes | tracked |
