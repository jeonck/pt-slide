# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/feature-store/.slides-grab/gate-preview/slide-01.png, decks/feature-store/.slides-grab/gate-preview/slide-02.png, decks/feature-store/.slides-grab/gate-preview/slide-03.png, decks/feature-store/.slides-grab/gate-preview/slide-04.png, decks/feature-store/.slides-grab/gate-preview/slide-05.png, decks/feature-store/.slides-grab/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: f94db05cf46fd8a96ec42b502b78b4b95b98f948e45c453585fed7e076c3820c, slide-02.html: d71762e5c0b8a69a2785783ef1d27aa1f226f874b5ee80b06f8c5df85aa419eb, slide-03.html: a1663b1bcc783a10f8b17ba79c33e08972854632a97c7f46633e3358a1ea9fe6, slide-04.html: 5d7b15ecc1683b5b2a63a9b204603dd937336ddd2ed6e9e6ec902e49df59417e, slide-05.html: cba30d151b1958d3cece892e8a727af4020e24136640b985c609cb6c36a5fbdb, slide-06.html: bab73c081326b41671cbc909d31fdd06863961bd7b15d784fc4df537b315a620
Unresolved Critical: 0
Blocking findings: None

Inputs reviewed: all six `slide-*.html` sources, the six rendered PNGs above, the green `slides-grab validate` summary (6 checked / 6 passed / 0 errors / 0 warnings), `slide-outline.md` with its two-axis budget, and the approved style spec from `slides-grab show-design ppt-mckinsey-ghost-deck`.

## Checks
- [x] System consistency: PASS — Every sheet carries the same band: a one-line action title, the kicker directly beneath it, and the footnote bottom-right. The band is a fixed 50pt, so the body starts at the same y on all six — verifiable across the contact sheet. One typeface, Inter, in four weights. The canvas is pure white on every sheet; the spec sets bg and surface to the same `#FFFFFF`, so depth comes from hairlines rather than fills, and that holds throughout. Everything is left-aligned; the spec forbids centring and nothing here is centred. Diagrams sit right with text left on slides 02 and 04, which is the asymmetry the spec asks for.
- [x] Color discipline: PASS — text `#1A1A1A`, body `#3D4350`, muted `#7A828F`, border `#C9CDD3`, accent `#1F3A5F`. Nothing else appears. The spec forbids emphasising with colour, so the accent is spent in exactly two roles: the number badges, which are its own diagram language, and **one** filled quadrant on slide-04.png. Every other emphasis in the deck is weight — the action titles at 600, the "you need it when" lines at 500. No coloured body text anywhere.
- [x] AI slop tropes: PASS — Radius 0 on every box, no shadow, no gradient. No emoji, icons or stock imagery: the only SVG is the chevron connector on slide 02, which is the spec's named connector shape. Inter is the typeface the spec names, so the generic-stack rule's style-specified exemption applies. No icon-plus-blurb grid; the cells carry sentences. The spec also forbids naming real consulting firms or copying their slides — the deck uses the generalised framework only and names no firm.
- [x] Content discipline: PASS — No figure is presented as measured. The 2×2 on slide 04 is deliberately a framework with **no plotted bubbles**: quadrant labels only, because any bubble position would be an invented data point, and `slide-outline.md` records that as the reason. The spec makes the footnote mandatory; with nothing to cite it carries the sheet identity and says `FRAMEWORK ONLY, NO EXTERNAL DATA` rather than naming a source that does not exist. Every slide matches its outline entry, and the presenter line is a marked placeholder.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | The cover's title band is the deck name rather than a declarative sentence | Note | Recorded in `slide-outline.md`; every other sheet obeys the rule, and a cover that argues before introducing itself reads wrong | tracked |
| deck-wide | Type sizes are not the spec's absolute points (18pt body, 10pt footnote on a 13.33in canvas) | Note | Scaled values fall under the 14pt body / 10pt floors; body is 14–15pt and the footnote 10pt | tracked |
| deck-wide | The footnote carries sheet identity rather than a citation | Note | No data in the deck; inventing a source would be worse than repurposing the slot | tracked |
| slide-01, slide-06 | Presenter reads `PRESENTER · TEAM` | Note | Intentional placeholder | tracked |
