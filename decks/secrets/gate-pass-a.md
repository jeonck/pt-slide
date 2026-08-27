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
