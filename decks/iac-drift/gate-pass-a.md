# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/iac-drift/gate-preview/slide-01.png, decks/iac-drift/gate-preview/slide-02.png, decks/iac-drift/gate-preview/slide-03.png, decks/iac-drift/gate-preview/slide-04.png, decks/iac-drift/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 5ca5a8a26061566610df2731c027637af3a898da0f9c309a468aaf93f9d0c716, slide-02.html: 25bdbccf467999fe275a73f61a245c7aee6b1ad3422993c890eff92319b51eb2, slide-03.html: 9634695a8d7c4bb944e75713bd2376427e89909237d5fc64f607755c8d8a32fd, slide-04.html: bc446dc380e114649794a562da53ec1abb64b17fbe6c9bfbce241b7cdbb7e3be, slide-05.html: 10a10625968b4333de10e56e2aedaca115d43ec2fd440161fce426ea2991367e
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
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
