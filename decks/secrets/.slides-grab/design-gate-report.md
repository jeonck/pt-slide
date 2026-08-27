# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-27T16:15:30.024Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/secrets/gate-preview/slide-01.png, decks/secrets/gate-preview/slide-02.png, decks/secrets/gate-preview/slide-03.png, decks/secrets/gate-preview/slide-04.png, decks/secrets/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 1fc728fa9444928895f1f7b6e76c3766e99d10359a87f7ba1f64f530f0aa3ffa, slide-02.html: bd55839b3ace68cf1bed684a256b5a90efeb8f8b01182c3c256ae660d0c8266a, slide-03.html: 4b92db34020e86081ad09002f2a6e3549d77d16b53ef7bf77420d7b63eb32b08, slide-04.html: 64f435e8d54bf522db7d5969d07ae22b45b4af8fdbee77dc1527cf9971fb95ba, slide-05.html: 14a8f6a19fca71a2c1e87c9ad2bc7d0edfd9810ceb99dd90230a35f379b3e63f
Unresolved Critical: 0
Blocking findings: None

Style: `ppt-pattern-bold-poster-keynote` (bundled), spec read via
`npx slides-grab show-design ppt-pattern-bold-poster-keynote`.

## Checks

- [x] System consistency: PASS — Two layout patterns are declared in `slide-outline.md` and
  each is used twice: COLUMN (three equal white-outline modules, sheets 02 and 04) and
  LEDGER-ROW (three full-width label-plus-prose rows, sheets 03 and 05). The cover is the third
  and only other layout. **Two background colours** (`#1F3DFF`, `#FF4D2E`), alternating on a
  fixed 01–05 sequence; never two fields on one sheet. **Two font families** (Anton for
  display, Archivo for everything else) and no third. One accent — vermilion is simultaneously
  the spec's `bg alt` and its `accent`, so the accent is never a fifth colour floating on top
  of a field. Fixed furniture verified by measuring the rendered DOM rather than by eye
  (`_geom-secrets.mjs`, since deleted): on all five sheets `main` occupies top 36pt to 350.3pt
  and `footer` 368.3pt to 383pt, identical to the pt. On all four content sheets `h1` occupies
  57.4pt–135.4pt and the module strip 143.4pt–350.3pt, identical to the pt. That is the
  no-drift rule in the spec's Avoid list, satisfied by construction rather than by inspection.
- [x] Color discipline: PASS — Four values appear in the CSS of all five slides and nothing
  else: `#1F3DFF`, `#FF4D2E`, `#FFFFFF`, `#0E0E0E`. Every one is a named token of this style
  (`bg`, `bg alt`/`accent`, `text`, `ink`). No tint, no rgba, no gradient (checked: no
  `gradient` string appears in any slide file), no shadow, no border radius. The one departure
  is a *substitution between two spec tokens*, not a new colour: sheets 02 and 04 use `ink`
  where the spec's signature would use `text`, because white on vermilion measures 3.31:1 and
  ink on vermilion measures 5.84:1. Recorded in `design-debt.md` §1 and in `slide-outline.md`.
  The white-solid emphasis module is the spec's own "white solid … on solid color page"
  vocabulary, spent on the same role on all four content sheets (the sheet's thesis module).
- [x] AI slop tropes: PASS — No gradient of any kind: the fields are flat solids and the only
  pattern-adjacent element is a 4pt straight rule on the cover. No rounded corners anywhere
  (`radius: 0` throughout, per spec). No left-stripe cards: the modules carry a uniform 1.5pt
  outline on all four sides, and the emphasised one differs only by fill, so its content does
  not shift by a hair relative to its siblings — the repo's "emphasis moves only that row" trap
  was designed out rather than discovered. No SVG illustration, no icon, no emoji, no clipart.
  No generic font stack: Anton and Archivo are the faces this style's spec names, embedded
  locally from `@fontsource/*`; `grep -n "http" decks/secrets/slide-0*.html` returns nothing,
  so no remote asset survives in saved HTML. No 3×2 icon grid; the 3×1 module strip is the
  spec's own prescribed data-sheet treatment ("흰 윤곽 모듈 3개 이상").
- [x] Content discipline: PASS — **There is not a single number in the body of this deck.** The
  only digits that appear are page numbers (01–05) and the decision indices on sheet 05. No
  percentage, no duration, no interval, no count, no benchmark, no stat strip, no chart, no KPI
  block — which on a rotation-and-revocation topic is the whole discipline, since every one of
  those would have had to be invented. The style's mandatory source slot carries the reason
  verbatim on all four content sheets: "No sourced figures in this deck — the mechanism is
  argued, not priced." Reasoning recorded in `slide-outline.md` § "no numbers, and why". A
  related rule was held throughout: **no credential, real or fake, appears anywhere.** Secrets
  are named by role only ("a credential", "the secret", "what the workload reads at run time").
  No presenter name or organisation was invented; the cover footline is `Presenter · Team`.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-02, slide-04 | Spec signature puts white text on the vermilion field; measured 3.31:1, under the 4.5:1 body bar and visibly hazy in the first render | Major | Both sheets switched to the spec's `ink` token, 5.84:1. Token substitution, not a new colour | fixed |
| slide-01 | Spec display leading `0.95`; `validate` reports `text-clipped` on Anton at 1.25, 1.4 and 1.45 | Major | Anton set to 1.5 everywhere. Leaves the cover headline airy — two alternatives tried and rejected | fixed / debt §2 |
| all | `kpi` token and the whole chart vocabulary unused | Note | None — no sourceable figure exists | debt §5 |
| slide-02, slide-04 | Short column bodies leave a tail of empty field inside their outline | Note | Footline gap opened 12pt → 18pt; bodies written to fill ≥5 of 6 lines. Not closed with invented copy | debt §3 |
| slide-04 | Label wraps at the hyphen in `LOAD-BEARING` | Note | Accepted — real hyphen, legitimate break | debt §4 |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/secrets/gate-preview/slide-01.png, decks/secrets/gate-preview/slide-02.png, decks/secrets/gate-preview/slide-03.png, decks/secrets/gate-preview/slide-04.png, decks/secrets/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 1fc728fa9444928895f1f7b6e76c3766e99d10359a87f7ba1f64f530f0aa3ffa, slide-02.html: bd55839b3ace68cf1bed684a256b5a90efeb8f8b01182c3c256ae660d0c8266a, slide-03.html: 4b92db34020e86081ad09002f2a6e3549d77d16b53ef7bf77420d7b63eb32b08, slide-04.html: 64f435e8d54bf522db7d5969d07ae22b45b4af8fdbee77dc1527cf9971fb95ba, slide-05.html: 14a8f6a19fca71a2c1e87c9ad2bc7d0edfd9810ceb99dd90230a35f379b3e63f
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
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: 1fc728fa9444928895f1f7b6e76c3766e99d10359a87f7ba1f64f530f0aa3ffa
- slide-02.html: bd55839b3ace68cf1bed684a256b5a90efeb8f8b01182c3c256ae660d0c8266a
- slide-03.html: 4b92db34020e86081ad09002f2a6e3549d77d16b53ef7bf77420d7b63eb32b08
- slide-04.html: 64f435e8d54bf522db7d5969d07ae22b45b4af8fdbee77dc1527cf9971fb95ba
- slide-05.html: 14a8f6a19fca71a2c1e87c9ad2bc7d0edfd9810ceb99dd90230a35f379b3e63f
