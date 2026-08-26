# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-26T14:28:35.381Z
Slide mode: presentation
Resolution: 1080p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/ci-pipeline/gate-preview/slide-01.png, decks/ci-pipeline/gate-preview/slide-02.png, decks/ci-pipeline/gate-preview/slide-03.png, decks/ci-pipeline/gate-preview/slide-04.png, decks/ci-pipeline/gate-preview/slide-05.png, decks/ci-pipeline/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 9bd35fbd28f33620a2ecf6b2036e06ffe3596fa706e711e953dc061643279920, slide-02.html: 3939a43de7ddf0718ed46851a2309273c670dbfc93f138abd8412fa6db35b8c1, slide-03.html: f4766cb519d99ec4109c58e81678bd19a97775c23424354c05fc8fdf56f85f62, slide-04.html: fe961f51d07b667f02d9b977b8346784b7acef326ebf3ce34c031509acd7e456, slide-05.html: e2217577a629d3678b216fc8092f7e1691a0fd43bd70eedce2ac0edf8d695580, slide-06.html: 3f4acc431ddd23306b4d2d8800f0b1942795696f228f081bf6d1950d91629dc5
Unresolved Critical: 0
Blocking findings: None

Style under contract: bundled `ppt-precision-fintech-deck` (assigned, not chosen). Checked
against the `show-design` output item by item, including every line of its `## Avoid` list.

## Checks

- [x] System consistency: PASS — One shared chrome across all six sheets, verified by measuring
  the live DOM, not by eye: `main` runs 95.8pt → 351.0pt on sheets 02–06 and the bottom-right
  caption sits at 365.0pt on all six. Two layout patterns only — the spec's 7:5 asymmetric prose
  grid (02 at 7:5, 04 at 5:7, 06 at 7:5, alternating as `slide.layout` requires) and the spec's
  own diagram vocabulary (3-column comparison on 03, horizontal 4-step process on 05). One
  typeface (Inter 400/600/700), two background planes (`#FFFFFF` canvas, `#F6F9FC` surface with
  `#EBF0F6` as the single step above it), one accent. Radius is 6pt everywhere; no borders, no
  shadows — division is by surface step, which is this style's stated Signature.
- [x] Color discipline: PASS — `grep -oh '#[0-9A-Fa-f]\{6\}'` over all six files returns exactly
  six values: `#0A2540`, `#5A55E0`, `#5C6B7E`, `#EBF0F6`, `#F6F9FC`, `#FFFFFF`. Every one is a
  literal token from the spec. **No harmony extension was needed and none was invented.**
  `#5A55E0` is the only accent and appears only as structure or emphasis — the cover rule, the
  slide-02 spine, the number badges, the single highlighted comparison header on 03, the single
  active process step on 05, and the 1.5pt connectors. The spec's `accent light #7C78F0` and both
  chart tints are deliberately unused: a second accent is on the Avoid list and there is no chart.
  Body text is never coloured with the accent, which the Avoid list names explicitly.
- [x] AI slop tropes: PASS — `grep` for `gradient` and `box-shadow` over the six files returns
  nothing, so no full-bleed gradient and no shadow (the spec permits a same-hue two-stop gradient
  and a CTA shadow; both are declined, per the repo's flat-fill rule). No SVG illustration — the
  only SVG in the deck is three 18pt process connectors on slide-05, which is the spec's
  `diagram.connector` verbatim. No emoji anywhere. No 3×2 icon grid; no icons at all. The font
  stack is Inter because `typography.display/title/body` all name Inter — the framework's
  generic-stack ban exempts a spec-named face. The rounded card + left stripe pattern appears
  twice (slides 03 and 05 closing strips) as the spec's own emphasis device on a callout, never
  as the default container for ordinary content.
- [x] Content discipline: PASS — **There is not one number in this deck.** No build times, no
  pass rates, no flake percentages, no "teams that do X ship Y faster", no stat strip dressed up
  as information, no chart. Every claim is a mechanism: what a stage's failure *means*, and what
  the people at the gate do once it means nothing. `slide-outline.md` records the decision and
  why (any such figure here would have to be invented). The mandatory bottom-right
  `source_caption` slot carries sheet identity and the words "NO CHART, NO EXTERNAL DATA" rather
  than a fabricated citation. The presenter line is the literal placeholder `PRESENTER · TEAM`
  on both the cover and the closing sheet; no name was invented.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | No blocking findings | Note | None | tracked |
| slide-02 | No blocking findings | Note | None | tracked |
| slide-03 | No blocking findings | Note | None | tracked |
| slide-04 | No blocking findings | Note | None | tracked |
| slide-05 | No blocking findings | Note | None | tracked |
| slide-06 | No blocking findings | Note | None | tracked |
| all | Type scale is the spec's, scaled 0.75 for a 10in canvas and then floored: kicker 12→9pt and caption 10→7.5pt would breach the framework's 10pt floor and body 18→13.5pt the 14pt body floor, so kicker and caption are set at 10pt and body at 14pt — larger than the scaled spec, never smaller | Note | Intentional; recorded in slide-outline.md under "deviations" | tracked |
| all | Title leading raised from the spec's 1.15 to 1.20 (cover display 1.05 → 1.20) because tight leading clips descenders in this renderer | Note | Intentional; required by references/slide-html.md | tracked |
| all | `source_caption` carries sheet identity instead of a citation; `accent light` and both chart tints go unused | Note | Intentional; recorded in slide-outline.md | tracked |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/ci-pipeline/gate-preview/slide-01.png, decks/ci-pipeline/gate-preview/slide-02.png, decks/ci-pipeline/gate-preview/slide-03.png, decks/ci-pipeline/gate-preview/slide-04.png, decks/ci-pipeline/gate-preview/slide-05.png, decks/ci-pipeline/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 9bd35fbd28f33620a2ecf6b2036e06ffe3596fa706e711e953dc061643279920, slide-02.html: 3939a43de7ddf0718ed46851a2309273c670dbfc93f138abd8412fa6db35b8c1, slide-03.html: f4766cb519d99ec4109c58e81678bd19a97775c23424354c05fc8fdf56f85f62, slide-04.html: fe961f51d07b667f02d9b977b8346784b7acef326ebf3ce34c031509acd7e456, slide-05.html: e2217577a629d3678b216fc8092f7e1691a0fd43bd70eedce2ac0edf8d695580, slide-06.html: 3f4acc431ddd23306b4d2d8800f0b1942795696f228f081bf6d1950d91629dc5
Unresolved Critical: 0
Blocking findings: None

## Method

All six PNGs were rendered at 1920×1080 and **opened individually as images** — not skimmed on a
contact sheet — across three render passes: an initial pass, a pass after the first round of
fixes, and a final pass on the fingerprints above. Sheets 01, 02, 03, 05 and 06 were re-opened
full-size after their last edit; sheet 04 was unchanged after its first inspection and its
column geometry was re-checked by measuring the live DOM instead. Two claims that the eye got
wrong were settled by measurement rather than by looking harder: slide-04's two columns looked
unequal in the PNG and are in fact both 255.3pt, and slide-05's four badges were confirmed to
share a single top edge (146.1pt) rather than merely looking aligned. Confidence is High because
every sheet was viewed at full size on its final fingerprint and the geometric claims are
measured, not estimated.

## Checks

- [x] Composition & hierarchy: PASS — One job per sheet, one anchor each. **01** the 40pt display
  title with the accent rule above it; **02** the question set at 20pt against a full-height
  accent spine; **03** the single `#5A55E0` column header, which is the whole argument of the
  sheet in one mark; **04** the pull-quote panel on the left with two badged policies opposite;
  **05** the one active step in the four-step process — the deck's thesis, and the only filled
  node; **06** the three badged questions with the restated point beside them. The cover and the
  closing sheet both carry a real visual anchor, not just text. Slide-05's active step is the
  only highlight in its row, as `diagram.process` requires.
- [x] Typography & legibility: PASS — Measured in the DOM: **no text below 10pt on any sheet.**
  Body 14pt, glosses 12pt, card headers and process labels 11pt, kickers and captions 10pt,
  titles 24pt, cover display 40pt — one scale reused on every sheet. Contrast at presentation
  distance: `#5C6B7E` on `#F6F9FC` is 5.1:1 and on `#FFFFFF` 5.4:1 (both over the 4.5:1 body
  bar); white on the `#5A55E0` fills of slide-03's header and slide-05's active node is 5.4:1;
  `#EBF0F6` gloss on that same accent fill is 4.8:1. Nothing is painted close to its own
  background — checked specifically on the active node and the highlighted column header, which
  are the two places in this deck where that failure would hide.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — This is an English deck. Pretendard
  was deleted from `assets/fonts/` after scaffolding and there is no Hangul in any sheet, so
  neither Layer 1 (breaking inside a word) nor Layer 2 (`keep-all` raggedness) can occur.
  Latin wrapping was still inspected for the equivalent faults and two were found and fixed: the
  cover thesis broke mid-sentence ("too many / tests", now a hand `<br>` at the sentence
  boundary), and two slide-03 bullets wrapped to a second line while their neighbours did not,
  breaking the row grid across the three columns (rewritten to fit the real 25-character ceiling).
  No orphan or one-word last line survives on any sheet.
- [x] Review Litmus: PASS — Each sheet lands in 3–5 seconds: 03 reads as one highlighted column
  against two, 05 as one filled step in a row of four, 04 as two numbered rules. Strip the
  decoration and the argument still stands, because the decoration *is* the argument — the
  highlight marks what belongs in the gate. Lines that could be cut were cut: slide-03's bullets
  are three per column at 25 characters, and no sheet exceeds the style's seven-line ceiling.
  Two lines were *added* rather than removed, both to close a measured void rather than to fill
  space with padding — a closing line on 02 that also bridges into 03, and a supporting line on
  06. Neither introduces a figure.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Thesis broke mid-sentence ("too many / tests") | Minor | Hand `<br>` at the sentence boundary; `max-width` 470 → 530pt | fixed |
| slide-02 | Left column held ~150pt of content in a 255pt column; vertical centring opened a void under the header | Minor | Accent bar made a full-height spine so the leftover reads as structure; closing line added | fixed |
| slide-03 | Two bullets wrapped to a second line while their neighbours stayed on one, breaking the row grid across the three columns. The horizontal budget had missed the 11pt bullet indent — real ceiling is ~25 chars at 12pt, not 28 | Major | Rewritten to "Post-deploy smoke tests" and "Licence and CVE audits"; all nine bullets are now one line | fixed |
| slide-04 | Columns appeared unequal in the render | Note | Measured: both 255.3pt. No change made — the eye was wrong, not the layout | tracked |
| slide-05 | Node labels 02 and 04 wrapped to two lines while 01 and 03 did not, so the gloss under each pill started at a different y | Major | Two label lines reserved in **every** node (`min-height:30pt`), not just the two that wrapped — same discipline as giving every row the border and changing only its colour | fixed |
| slide-05 | Pills stretched to ~193pt around ~115pt of content, leaving a dead band under every gloss. Centring the content made it worse — node 02's gloss runs a line longer, so centring lifted its badge above its neighbours' | Major | Pills hug their content, content stays top-aligned (all four badges now share one top edge at 146.1pt), closing strip takes `margin-top:auto` so its bottom lands on 351.0pt like every other sheet | fixed |
| slide-06 | ~100pt void between the panel thesis and the presenter block | Minor | One supporting line added — closed with content, not padding | fixed |
| all | No content overflows `main` under the fixed bottom-right caption on any sheet (measured: worst-case overflow 0.00pt) | Note | None | tracked |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: 9bd35fbd28f33620a2ecf6b2036e06ffe3596fa706e711e953dc061643279920
- slide-02.html: 3939a43de7ddf0718ed46851a2309273c670dbfc93f138abd8412fa6db35b8c1
- slide-03.html: f4766cb519d99ec4109c58e81678bd19a97775c23424354c05fc8fdf56f85f62
- slide-04.html: fe961f51d07b667f02d9b977b8346784b7acef326ebf3ce34c031509acd7e456
- slide-05.html: e2217577a629d3678b216fc8092f7e1691a0fd43bd70eedce2ac0edf8d695580
- slide-06.html: 3f4acc431ddd23306b4d2d8800f0b1942795696f228f081bf6d1950d91629dc5
