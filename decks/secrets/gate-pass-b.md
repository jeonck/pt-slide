# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/secrets/gate-preview/slide-01.png, decks/secrets/gate-preview/slide-02.png, decks/secrets/gate-preview/slide-03.png, decks/secrets/gate-preview/slide-04.png, decks/secrets/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 2793474ad5c6ad5db6b0a1eef2e20a17cb4afd1ad136ea937f70bd3ce09c37f9, slide-02.html: 37725a3b6cd0c9c9b61f93c799c083291ad17175c8ca5f652845d147433fc4fe, slide-03.html: 98ef97c31b64005c6509dc2b7b557326e4574460886a297441e19b0ef4902e91, slide-04.html: 0ebb64ff056196a37a51041ffb80e2eec819521c22a192b9de3442ba811f461f, slide-05.html: 1b3161a574e3a3f05b005bc160ab00dfa61a52c7c595adda6443d94628c386c3
Unresolved Critical: 0
Blocking findings: None

## Method

All five slides were rendered with
`npx slides-grab png --slides-dir decks/secrets --output-dir decks/secrets/gate-preview --resolution 1080p`
and **each of the five 1920×1080 PNGs was opened and viewed at full size**, individually, not
as a contact sheet. Two full render passes were done: an earlier one that surfaced the findings
below, and this one after the fixes. Geometry claims in this report are not eyeballed — the
rendered DOM was measured in the browser (`_geom-secrets.mjs`, a throwaway script since
deleted) for element top/bottom in pt, child-overflows-parent, and actual line counts per
paragraph. String widths were measured the same way before any slide HTML was written
(`_measure-secrets.mjs`, also deleted).

## Checks

- [x] Composition & hierarchy: PASS — One job per sheet, and each has a real anchor. 01: a 66pt
  Anton headline over a full-bleed blue field with a 4pt rule under it — the largest thing in
  the deck, and unmistakably a cover. 02–05: a 52pt Anton sheet title on the top third with
  three modules under it, so the eye lands on the claim before the evidence. 05 is the only
  sheet with an index rail (28pt Anton `01`/`02`/`03`), which marks it as the closing decision
  sheet without a new layout. The colour alternation (blue → vermilion → blue → vermilion →
  blue) gives the deck a visible claim/counter-claim rhythm from the back of the room. On every
  content sheet exactly one module is white-filled, and it is always that sheet's thesis, so
  the emphasis means the same thing five times rather than decorating.
- [x] Typography & legibility: PASS — Smallest text in the deck is the footline at **10.5pt**;
  nothing is under the 10pt floor. Body prose is 15pt, labels 13pt, kicker/eyebrow 11pt, sheet
  titles 52pt, cover 66pt. Three sizes of running text, one scale, no drift between sheets.
  Every line-height is ≥ 1.4 (body 1.45, labels/kicker 1.4, Anton 1.5); `line-height: 1` appears
  nowhere in the deck. Contrast measured, not judged: white on `#1F3DFF` 6.63:1, ink on
  `#FF4D2E` 5.84:1, ink on white 19.3:1 — all clear of 4.5:1. The white-on-vermilion pairing
  the spec's signature implies measured 3.31:1 and was replaced, which is the single most
  consequential change in this deck (Pass A findings, `design-debt.md` §1).
- [x] Korean/CJK word-break integrity: PASS (not applicable) — the deck is English-only.
  Pretendard was removed from `assets/fonts/` and no Hangul appears in any slide, so neither
  Layer 1 (mid-word splits) nor Layer 2 (`keep-all` raggedness) can arise. Latin wrapping was
  checked instead, in the rendered PNGs: no one-word orphan line in any module, no mid-word
  split, and the only hyphen break is at a real hyphen (`LOAD-BEARING`, sheet 04).
- [x] Review Litmus: PASS — 3–5 second read on each sheet lands the point: 01 "revocability is
  the standard", 02 "the usual rule fails", 03 "what makes rotation cheap", 04 "unrotatable
  means permanent", 05 "what we need to decide". Strip the decoration and there is no
  decoration to strip — the only non-type elements in the deck are the module outlines and one
  4pt rule. Lines that could be pulled were pulled: two sheet titles were cut before any HTML
  existed because they measured past the frame and, being two claims each, read better as one;
  two module bodies were cut in the second pass because they wrapped to seven lines.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-02, slide-04 | **Render-only, `validate` clean 5/5.** The white-solid module's body wrapped to seven lines, not the six budgeted. Because the grid row is auto-sized to its tallest child, *all three* modules on each sheet grew and hung 16.7pt past the strip, sliding under the footline | Major | Both bodies cut to six lines; `grid-template-rows: minmax(0,1fr)` added as a guard. Re-measured: overflow none | fixed |
| slide-02, slide-04 | **Render-only.** White text on the vermilion field read hazy at presenting distance; measured 3.31:1 | Major | Both sheets switched to the spec's `ink` token (5.84:1) | fixed |
| all | **Render-only.** The footline sat ~5pt under the module boxes and read as a collision | Minor | `footer` margin-top 12pt → 18pt on all five sheets | fixed |
| slide-02, slide-04 | **Render-only.** With one-line and two-line labels side by side, the three column bodies would have started at different heights | Minor | Every column label reserves two lines (`min-height: 36.4pt`). Verified in the render: all three bodies start on the same baseline | fixed |
| slide-01 | Cover headline lines sit further apart than a poster headline normally would — Anton needs 1.5 leading to clear `text-clipped` | Note | Accepted; two alternatives tried and rejected | debt §2 |
| slide-02, slide-04 | Shorter column bodies leave a tail of empty field | Note | Mitigated, not filled with invented copy | debt §3 |
