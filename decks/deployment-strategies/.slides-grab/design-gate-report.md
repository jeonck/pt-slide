# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-27T16:13:53.525Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/deployment-strategies/gate-preview/slide-01.png, decks/deployment-strategies/gate-preview/slide-02.png, decks/deployment-strategies/gate-preview/slide-03.png, decks/deployment-strategies/gate-preview/slide-04.png, decks/deployment-strategies/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: d7388373969a8941c03f5aa8aa5b94da77b6cd2aaa8f32d1de824ce72af183fb, slide-02.html: 63ad02239185416dd74200ee026f81e317f045c0763caa6a69d19b4695114385, slide-03.html: 2e2dd273e5b1dc517ae05051c260b930fe1147c472aec5d1f427204f63dd187b, slide-04.html: e2ad0673c988cfa7966418f2fa22cef51c52332ec52bce4916d5a550bf9a3da8, slide-05.html: ea2e995d7735a77d22b3796e2a71e10f25278c2dc0b356b8e2625cdccb707886
Unresolved Critical: 0
Blocking findings: None

Method: the five slide sources were read against the `slides-grab show-design ppt-bold-block-infographic-deck` output, and every declared colour was grepped out of the HTML and compared with the spec's token list. The five PNGs from this render were opened as images to confirm the sources render as the contract describes.

## Checks
- [x] System consistency: PASS — Every sheet is built from the same primitive: an angular, radius-0, border-free, shadow-free solid colour block separated from its neighbours by a 4–6pt white gutter. Backgrounds: two — white canvas and charcoal surface. Typefaces: two — Archivo 700/800 for display, numbers and the sheet marker, Inter 400/600/700 for everything else. Accent: one — amber, one block per sheet. Content sheets 02–04 share one header contract (h1 at 24pt on the left, a 27pt charcoal sheet square on the right, 14pt below it), and the render confirms the h1 baseline and the sheet square sit at the same y on slide-02.png, slide-03.png and slide-04.png. The block *arrangement* deliberately differs on every sheet, as the Avoid list demands: 62/38 vertical split (01), label rail + three columns (02), 2×2 quadrants with an axis rail (03), three horizontal bands (04), quote block over three columns (05). Nothing is centred twice.
- [x] Color discipline: PASS — Exactly five values appear in the deck: `#FFFFFF`, `#2A2D34`, `#E8A317`, `#1F8A82`, `#6B6F76`. All five are named tokens in the spec (bg, surface/text/accent 1, accent 2, accent 3, text muted). No sixth colour, no tint, no gradient, no `rgba()`, no shadow, no border — the block edges in slide-02.png and slide-03.png are white gutters, not strokes. `#C0392B` (delta down) is in the spec and is not used: there are no deltas. Two colour-application rules depart from the spec's own wording and are recorded in `slide-outline.md` and `design-debt.md`: amber blocks carry charcoal ink rather than white inversion (white on amber is 2.17:1, charcoal on amber is 6.46:1), and no running prose is set on teal (4.19:1).
- [x] AI slop tropes: PASS — No gradient of any kind, including in patterns; the only fills are flat. No rounded cards and no left-stripe container: every corner is radius 0, and the one left bar in the deck is the spec's own `0.18in amber left bar` on the slide-05 quote block, used for the purpose the spec assigns it. No SVG illustration, no icons, no emoji, no clip art — the deck contains no graphics at all beyond the colour blocks themselves. No 3×2 icon-plus-caption grid. The fonts are Archivo and Inter, both **named by the style spec's Typography section**, embedded locally from npm as woff2 — this is the "style-specified face" exception to the generic-stack rule, not a default sans reach.
- [x] Content discipline: PASS — There is not a single figure anywhere in the deck: no durations, no percentages, no failure rates, no cost multiples, no vendor benchmark, no stat strip. The only numerals are ordinals (01, 02, 03) and the sheet markers. Every claim is mechanical and checkable from how the technique works — "switching a router back", "deploying the old build again, batch by batch", "all three serve two versions at once, if only for a moment". No chart appears, and `slide-outline.md` records why: every number that would fill the spec's detailed chart contract would have to be invented. The presenter line is the literal placeholder `PRESENTER · TEAM` on slide-01 and slide-05.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Amber ink on the charcoal eyebrow is the one place amber is used as type rather than as a block fill | Note | Accepted — 6.46:1, and it is a single unpaired element, so there are no siblings for it to be inconsistent with. All other amber is block fill | tracked |
| slide-02 | The spec's `diagram.comparison` reserves amber for a recommended column; this deck gives it to the `HOW IT ROLLS BACK` row label instead | Note | Intentional. Recommending one of the three would contradict the deck's thesis; recorded in `slide-outline.md` deviation 3 | tracked |
| slide-03 | The spec's `matrix_2x2` calls the top-right quadrant the "recommended" one; here amber marks the most *demanding* quadrant | Note | Intentional, and the sheet's caption says so in as many words: "Amber marks the most demanding cell here, not the best strategy" | tracked |
| whole deck | The spec's chart tokens (bar geometry, value labels, delta colours, gridline rules) are entirely unused | Note | Correct outcome — no sourceable data exists. Moved to `design-debt.md` | tracked |
| whole deck | The spec's 200pt section number is never used | Note | Nothing on a 405pt-tall canvas can carry a 200pt numeral; the largest display type is the 40pt cover title. Recorded in `slide-outline.md` deviation 4 | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/deployment-strategies/gate-preview/slide-01.png, decks/deployment-strategies/gate-preview/slide-02.png, decks/deployment-strategies/gate-preview/slide-03.png, decks/deployment-strategies/gate-preview/slide-04.png, decks/deployment-strategies/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: d7388373969a8941c03f5aa8aa5b94da77b6cd2aaa8f32d1de824ce72af183fb, slide-02.html: 63ad02239185416dd74200ee026f81e317f045c0763caa6a69d19b4695114385, slide-03.html: 2e2dd273e5b1dc517ae05051c260b930fe1147c472aec5d1f427204f63dd187b, slide-04.html: e2ad0673c988cfa7966418f2fa22cef51c52332ec52bce4916d5a550bf9a3da8, slide-05.html: ea2e995d7735a77d22b3796e2a71e10f25278c2dc0b356b8e2625cdccb707886
Unresolved Critical: 0
Blocking findings: None

Method: **all five PNGs were opened individually at full 1920×1080 size**, not only on a contact sheet — slide-01 through slide-05 from the first render, then slide-03 and slide-05 again at full size after the two layout fixes below, then the whole set once more on a contact sheet built from this render to compare the sheets against each other. Two measurements were taken off the pixels rather than judged by eye: a colour-transition scan down slide-02 confirmed the three comparison rows are 194px each (equal, not squeezed) and that the amber rail block spans exactly the same y range as the row it labels; a scan down slide-05 confirmed the amber quote bar runs the full 64–430px height of its block rather than stopping short, which it appeared to do at reading size.

## Checks
- [x] Composition & hierarchy: PASS — One job per sheet and one anchor each. slide-01.png: the anchor is the 40pt Archivo title reversed out of a charcoal block that owns 62% of the canvas, with the three numbered strategy blocks stacked beside it — the deck's spine is visible before a word of argument. slide-02.png: one table, and the amber row label pulls the eye straight to the row the whole deck turns on. slide-03.png: four quadrants, one of them amber; the anchor is that single amber cell. slide-04.png: three bands with 34pt numerals, the amber band second — the eye lands on ROLLBACK. slide-05.png: the anchor is the 22pt pull-quote in a full-width charcoal block with the amber bar, and the three decision blocks read as the work that follows. The cover and the closing both have real anchors; neither is a text list.
- [x] Typography & legibility: PASS — One scale across the deck: cover title 40pt, pull-quote 22pt, sheet titles 24pt, block numbers 32–34pt, quadrant names 20pt, thesis 16pt, body 14pt, card headers 11–13pt, eyebrow/caption/chip/presenter 10pt. **Nothing below 10pt anywhere; no body copy below 14pt.** Contrast measured, not guessed: white on charcoal 21:1, charcoal on white 16.9:1, charcoal on amber 6.46:1, amber on charcoal 6.46:1, white on teal 4.19:1. The last is the weakest pairing and is why teal carries only short ≥14pt semibold labels and values — visible in slide-02.png where the teal column holds single clauses, never a paragraph. The initial draft had `#6B6F76` muted text on charcoal at 2.77:1 for the two presenter lines; that was caught and changed to white before this render, so no low-contrast text survives. Line-heights are 1.2 on the display faces, 1.35–1.5 on everything else; no value of 1 appears, and the 40pt cover title's descenders in slide-01.png ("p", "g", "y") are clear of the box.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — the deck is English only, no Hangul and no CJK; Pretendard was deleted from `assets/fonts/`. English wrapping was inspected in its place. The cover title is split at the intended point with an explicit `<br>` ("Deployment" / "strategies"). No line anywhere ends in a one-word orphan: the three slide-05 questions were each brought to exactly three lines, and slide-03's two axis-rail labels to exactly two lines each, by widening the rail from 110 to 130pt and trimming one question. The three sheet titles do not wrap at all — they are held to one line by the ≤42-character budget, which matters because the 27pt sheet square sits on that row and would drop if the title took two lines.
- [x] Review Litmus: PASS — Three to five seconds per sheet, because on every sheet the amber block *is* the point: it says "the rollback question" on all five. slide-02 in particular resolves at a glance — three columns, three rows, and the amber row is the one that differs. Strip the decoration and nothing is lost, because there is no decoration: every block is a strategy, a quadrant, a prerequisite or a decision. Lines that could go, went — slide-05's first question lost four words, slide-03's caption was cut from two clauses to one, and slide-04's labels were cut to one word each ("HEALTH CHECKS", "ROLLBACK", "SESSIONS") with the full demand carried by the prose beside them.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-03 | First render left a large void under the text in all four quadrants — content was top-aligned in a 127pt cell it did not fill | Major | Fixed before this report — quadrants now centre their content vertically. Confirmed in the re-render | tracked |
| slide-03 | First render broke both axis-rail labels into three ragged lines ending in a single word ("ONCE", "REDEPLOY") | Minor | Fixed before this report — rail widened 110 → 130pt, both labels now break cleanly in two | tracked |
| slide-05 | First render left ~110px of dead space under each decision block, and question 01 wrapped to four lines while 02 and 03 took three, so the three blocks did not read as a set | Major | Fixed before this report — question 01 trimmed to three lines and all three blocks centre their content. Confirmed in the re-render | tracked |
| slide-01, slide-05 | Both presenter lines were `#6B6F76` on charcoal — 2.77:1, effectively unreadable at presenting distance | Major | Fixed before the first render, caught by computing the ratio rather than by eye; both are white now | tracked |
| slide-04 | Airier than 02 and 03 — a wide white prose column runs between the tag blocks and the chips | Note | Accepted; the sheet still carries six colour blocks, the most in the deck, and narrowing the column would push every band to four lines and break the vertical budget. Moved to `design-debt.md` | tracked |
| slide-02, slide-03 | The two left rails align their labels differently (left on 02, right on 03) | Note | Accepted — different roles: a table row header versus an axis label outside the matrix. Moved to `design-debt.md` | tracked |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: d7388373969a8941c03f5aa8aa5b94da77b6cd2aaa8f32d1de824ce72af183fb
- slide-02.html: 63ad02239185416dd74200ee026f81e317f045c0763caa6a69d19b4695114385
- slide-03.html: 2e2dd273e5b1dc517ae05051c260b930fe1147c472aec5d1f427204f63dd187b
- slide-04.html: e2ad0673c988cfa7966418f2fa22cef51c52332ec52bce4916d5a550bf9a3da8
- slide-05.html: ea2e995d7735a77d22b3796e2a71e10f25278c2dc0b356b8e2625cdccb707886
