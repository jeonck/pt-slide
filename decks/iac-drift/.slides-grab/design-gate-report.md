# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-26T14:34:12.001Z
Slide mode: presentation
Resolution: 1080p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/iac-drift/gate-preview/slide-01.png, decks/iac-drift/gate-preview/slide-02.png, decks/iac-drift/gate-preview/slide-03.png, decks/iac-drift/gate-preview/slide-04.png, decks/iac-drift/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 6b2c7601d14580c47efb61f81f7898e0ebec4b7517e05ab1486cfc3ff4519abf, slide-02.html: 253aa0ca4d691f10cd2c9d31e1e489a6afc4d3d185ca9ba0105ea47fe3518604, slide-03.html: 48639675edf816920da2c316b6d16884727fe52010d1a897b5a5c6d33eeba5e4, slide-04.html: a6263325c35936706cc851b5e2852b72ce795eff238f6389e1d6ca358694855f, slide-05.html: 99259cd8e64a75364ecaf5c49c22fd6fb4a19b4a87901dc83539775819b31d73
Unresolved Critical: 0
Blocking findings: None

Method: the five slide sources were read against the `show-design ppt-swiss-editorial-bold` output, every hex literal in the deck was extracted with grep and matched to the spec token list, and the five rendered PNGs above were opened as images to confirm the contract holds on screen and not only in CSS.

## Checks
- [x] System consistency: PASS — One furniture system on all five sheets: an 11pt caption rail, a 3pt rule, `main`, a 3pt rule, an 11pt caption rail, inside 40/32pt margins on a 640pt/12-column measure. Because both rails are siblings of `main` rather than children, the rules land at an identical y on all five PNGs — checked by flipping between slide-02.png and slide-04.png. Two backgrounds (`#F2F0EB` canvas, `#111111` blocks and badges), two typefaces (Archivo Black for display and labels, Inter for body and captions), one accent. Three layout patterns, each reused deliberately: number-badged boxes in a row (02), parallel columns (03), and a ruled ledger (04, and again for the prompts on 05). Nothing drifts sheet to sheet.
- [x] Color discipline: PASS — `grep -o '#[0-9A-Fa-f]\{6\}'` over all five files returns exactly four values: `#F2F0EB` (bg / text-invert), `#111111` (text / surface / border), `#FF4A1C` (accent 1). Every one is a spec token verbatim; no harmonic extension was needed and none was invented. `#0047FF` (accent 2) is deliberately unused so the deck reads with one spot colour rather than one per sheet — recorded in slide-outline.md decision 3. The Avoid list's "never two spot colours on one slide" is satisfied trivially: there is one in the whole deck.
- [x] AI slop tropes: PASS — No gradient of any kind (`grep gradient` returns nothing, including the radial-gradient dot-grid trick). No shadow, no border-radius: `shape.radius: 0px` holds literally — every block, badge and box is a hard rectangle. No rounded card with a left stripe as a container. No SVG illustration; the only SVG on the deck is slide 02's connectors and return loop, which is the spec's own `diagram.render: svg` vocabulary. No emoji, icon or clipart anywhere, per the Avoid list — the step markers are the spec's square number badges. No 3×2 icon grid. The font stack is not generic: Archivo Black and Inter are the two faces the spec names, embedded locally from `@fontsource`, which the framework explicitly exempts from the generic-stack prohibition.
- [x] Content discipline: PASS — **There is no number anywhere in this deck** other than sheet numbers and step ordinals. No chart, no stat strip, no percentage, no incident count, no "X% of outages". The argument on every sheet is mechanical: slide 02 names a feedback loop and shows how it closes; slide 03 gives three causes and what each one actually is; slide 04 gives three moves and what each one takes away. slide-outline.md records under "no figures, and why" that drift rates and outage attribution are unsourceable here and that inventing one would have been the weakest part of the case. Nothing on screen is dressed to look like data.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Cover display is 132pt where the spec's scaled value is 97.5pt | Note | Intentional — one short word, and the Avoid list forbids setting type meekly small. Recorded in slide-outline.md decision 1 | tracked |
| slide-01 | Body sizes do not equal the spec's absolute points (24pt body → 18pt) | Note | Intentional — the spec targets a 13.33in canvas, this is 10in; everything is scaled 0.75 and floored at the framework's 10pt/14pt minima | tracked |
| slide-04 | Ledger labels are 13pt caps, below the spec's 44pt heading and 24pt body | Minor | Accepted — they are labels in a 200pt cell, not headings; 13pt Archivo Black caps is well above the 10pt floor and the sheet's giant type is the 34pt title. Carried to design-debt.md | tracked |
| slide-02 | Body leading is 1.45 where the spec says 1.35 | Note | Intentional — the framework's 1.4 body floor exists because tighter leading clips descenders. Recorded in slide-outline.md decision 8 | tracked |
| all | Accent 2 `#0047FF` is never used | Note | Intentional single-accent system, recorded in slide-outline.md decision 3 | tracked |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/iac-drift/gate-preview/slide-01.png, decks/iac-drift/gate-preview/slide-02.png, decks/iac-drift/gate-preview/slide-03.png, decks/iac-drift/gate-preview/slide-04.png, decks/iac-drift/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 6b2c7601d14580c47efb61f81f7898e0ebec4b7517e05ab1486cfc3ff4519abf, slide-02.html: 253aa0ca4d691f10cd2c9d31e1e489a6afc4d3d185ca9ba0105ea47fe3518604, slide-03.html: 48639675edf816920da2c316b6d16884727fe52010d1a897b5a5c6d33eeba5e4, slide-04.html: a6263325c35936706cc851b5e2852b72ce795eff238f6389e1d6ca358694855f, slide-05.html: 99259cd8e64a75364ecaf5c49c22fd6fb4a19b4a87901dc83539775819b31d73
Unresolved Critical: 0
Blocking findings: None

Method: all five PNGs from this render were opened individually as full-size images, not skimmed on a contact sheet — five sheets is few enough to look at each one properly. Earlier renders were opened the same way; that is how the five defects listed below were found, three of which `validate` reported as passing. Element geometry on slide 02 was additionally read out of headless Chromium with `getBoundingClientRect` to confirm the return-loop connector clears the station boxes rather than merely looking as if it does.

## Checks
- [x] Composition & hierarchy: PASS — One job per sheet and one anchor per sheet. slide-01.png: the anchor is "DRIFT" at 132pt in the deck's only orange, with the thesis in a black rect block beside it — a real visual anchor, not a title in a text box. slide-02.png: the anchor is the four-station row with the orange return rule closing the loop underneath, so the argument that the loop feeds itself is *shown*, not asserted. slide-03.png: three parallel columns under one question, closed by an inverted black band carrying the turn ("not a failure of discipline"). slide-04.png: a bounded ledger of three moves, the third marked by the only coloured rule, which is precisely the move the closing line says gets skipped. slide-05.png: the closing anchor is "WHAT WE / HAVE TO / DECIDE" at 60pt with DECIDE in orange, balanced against a ruled ledger of three questions. Both the cover and the closing sheet carry a genuine anchor.
- [x] Typography & legibility: PASS — One scale across the deck: display 132/60pt, heading 34pt, body 18pt, secondary body 14–16pt, ledger label 13pt caps, badge numeral 12pt, caption rail 11pt caps. `grep` over every `font-size` in the deck returns a minimum of **11pt** — nothing is near the 10pt floor and no body copy is below 14pt. Contrast: `#111111` on `#F2F0EB` is about 16:1, and inside the black blocks the ink is inverted to `#F2F0EB` for the same ratio, so the callout on slide-03.png and the thesis block on slide-01.png both read at presentation distance. `#FF4A1C` on the canvas is about 3.4:1 and is therefore used only at 60pt and 132pt display sizes and as 3pt rules — never for body copy. Checked on the renders: the orange rules on slide-03.png and the marked rule on slide-04.png are clearly visible without being asked to carry words.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — this is an English deck; there is no Hangul or CJK and Pretendard was removed. English wrapping was inspected in its place, and the equivalent faults were found and fixed: "SOMEONE MADE" broke across two lines in the cover's black block (fixed by dropping that block to 17pt), and "WHAT WE" broke into "WHAT" / "WE" on the closing sheet (fixed by widening the giant column to 320pt). In the current render no line anywhere ends in an orphan word, no title wraps, and the three station boxes on slide-02.png that used to be uneven now all take two lines.
- [x] Review Litmus: PASS — Three to five seconds per sheet. slide-02.png reads as "console change → unordered diff → apply waits → next change skips the pipeline, and back to the start" before any sentence is read, because the boxes are numbered and the return rule is the only coloured thing on the sheet. slide-04.png reads as three numbered moves with the third marked. Stripping decoration is not available: there is no decoration — the visual vocabulary is type, blocks and rule lines, exactly as the spec's Avoid list requires. On removable lines: two were in fact removed during the render pass (the slide-04 closing line lost twelve words, the cover subline lost a clause) and both sentences improved.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-04 | The closing line overflowed `main`, slid under the bottom rule and collided with the footer caption — `validate` passed it, because a child overflowing its parent is neither an overflow nor a sibling overlap. **This was Critical-class when found** (unreadable collision on a content sheet); it is logged Major because the gate's table only accepts Major/Minor/Note and it was resolved before this report was written | Major | Fixed before this report: ledger labels 15 → 13pt so they stop wrapping, row padding 10/12 → 5/5, closing line cut 84 → 72 chars. Verified in the current slide-04.png | resolved |
| slide-05 | "WHAT WE" broke to two lines, making four lines of giant type whose last ran into the bottom rule | Major | Fixed: giant column 300 → 320pt; 60pt now fits on one line with 15pt of margin | resolved |
| slide-01 | The black thesis block broke "SOMEONE MADE" across two lines | Minor | Fixed: block type 19 → 17pt, three clean phrase lines | resolved |
| slide-01 | The cover subline ran to two lines whose line box overflowed `main`, clearing the bottom rule only by half-leading | Minor | Fixed: rewritten to 71 characters, one line, 9pt of real clearance | resolved |
| slide-02 | Station 2 wrapped to three lines while the others took two, leaving a hollow band inside all four boxes and a second gap above the closing line | Minor | Fixed: copy shortened and `min-height:102pt` on the boxes so the diagram block fills its share | resolved |
| slide-03 | The inverted callout's text is inset 20pt from the block edge, so it does not start on the same grid line as the columns above it | Note | Accepted — a colour block's internal padding is not grid drift; the block itself starts and ends on the grid. Carried to design-debt.md | tracked |
| slide-04 | Ledger labels sit at 13pt, small for a style whose identity is giant type | Minor | Accepted — the sheet's giant type is its 34pt title; these are labels in a 200pt cell and the alternative was a two-line wrap that broke the row grid. Carried to design-debt.md | tracked |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: 6b2c7601d14580c47efb61f81f7898e0ebec4b7517e05ab1486cfc3ff4519abf
- slide-02.html: 253aa0ca4d691f10cd2c9d31e1e489a6afc4d3d185ca9ba0105ea47fe3518604
- slide-03.html: 48639675edf816920da2c316b6d16884727fe52010d1a897b5a5c6d33eeba5e4
- slide-04.html: a6263325c35936706cc851b5e2852b72ce795eff238f6389e1d6ca358694855f
- slide-05.html: 99259cd8e64a75364ecaf5c49c22fd6fb4a19b4a87901dc83539775819b31d73
