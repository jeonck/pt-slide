# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-25T18:06:55.183Z
Slide mode: presentation
Resolution: 1080p

## Pass A: System Contract / Constraint Integrity

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

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/feature-store/.slides-grab/gate-preview/slide-01.png, decks/feature-store/.slides-grab/gate-preview/slide-02.png, decks/feature-store/.slides-grab/gate-preview/slide-03.png, decks/feature-store/.slides-grab/gate-preview/slide-04.png, decks/feature-store/.slides-grab/gate-preview/slide-05.png, decks/feature-store/.slides-grab/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: f94db05cf46fd8a96ec42b502b78b4b95b98f948e45c453585fed7e076c3820c, slide-02.html: d71762e5c0b8a69a2785783ef1d27aa1f226f874b5ee80b06f8c5df85aa419eb, slide-03.html: a1663b1bcc783a10f8b17ba79c33e08972854632a97c7f46633e3358a1ea9fe6, slide-04.html: 5d7b15ecc1683b5b2a63a9b204603dd937336ddd2ed6e9e6ec902e49df59417e, slide-05.html: cba30d151b1958d3cece892e8a727af4020e24136640b985c609cb6c36a5fbdb, slide-06.html: bab73c081326b41671cbc909d31fdd06863961bd7b15d784fc4df537b315a620
Unresolved Critical: 0
Blocking findings: None

Method: all six rendered PNGs were opened as images. Slides 02 and 04 — the two diagram sheets — were inspected at full size at this exact final state; all six were inspected together on a contact sheet built from the same render, where the cross-sheet checks were made: band alignment, footnote placement, and that the accent appears on only one filled box in the whole deck.

## Checks
- [x] Composition & hierarchy: PASS — This is a ghost deck and it behaves like one: the six action titles read as a complete recommendation on their own, and each body is evidence for the title above it. One structure per sheet — two parallel chains, three service cards, a 2×2, four cost cells, three prompts. slide-04.png has the deck's only visual emphasis and it lands on the conclusion, the one quadrant where adoption is justified. There is no chrome to speak of: hairlines on white.
- [x] Typography & legibility: PASS — One scale throughout: action title 20pt/600, cover thesis 18pt, discussion prompt 17pt, cell heading 16pt/600, body 14pt, kicker and label 11pt/500, footnote 10pt. **Nothing below 10pt, no body copy below 14pt.** `#3D4350` body and `#7A828F` muted on white both read at presentation distance, and muted is reserved for supporting lines. White on the `#1F3A5F` filled quadrant is comfortably legible.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — no Hangul or CJK in this deck. English wrapping was checked instead: the cover thesis breaks at the intended phrase boundary via an explicit `<br>`, no block leaves a stray one-word tail, and the action titles do not wrap at all, by construction — each was written to the ≤64-character budget and the longest is 62.
- [x] Review Litmus: PASS — Three to five seconds per sheet, because the title states the conclusion and the body is the reason. One dominant idea each. Strip the hairlines and the argument survives, which is the point of the style. Nothing is removable: each service card pairs what the service is with the test for whether you need it, and dropping either half leaves a glossary.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-02 | The chevron connectors read small between the wide chain boxes | Minor | Accepted — the spec specifies a 1pt filled chevron rather than a heavy arrow, and direction is still unambiguous | tracked |
| slide-01 | The cover's middle band is largely open | Note | Intentional; this style's cover is a title page on a white canvas, not a poster | tracked |
| slide-04 | The 2×2 carries no plotted items, which is unusual for a matrix | Note | Deliberate: plotting anything would invent positions. The quadrants are the argument | tracked |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: f94db05cf46fd8a96ec42b502b78b4b95b98f948e45c453585fed7e076c3820c
- slide-02.html: d71762e5c0b8a69a2785783ef1d27aa1f226f874b5ee80b06f8c5df85aa419eb
- slide-03.html: a1663b1bcc783a10f8b17ba79c33e08972854632a97c7f46633e3358a1ea9fe6
- slide-04.html: 5d7b15ecc1683b5b2a63a9b204603dd937336ddd2ed6e9e6ec902e49df59417e
- slide-05.html: cba30d151b1958d3cece892e8a727af4020e24136640b985c609cb6c36a5fbdb
- slide-06.html: bab73c081326b41671cbc909d31fdd06863961bd7b15d784fc4df537b315a620
