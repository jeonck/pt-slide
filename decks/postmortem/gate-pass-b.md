# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/postmortem/gate-preview/slide-01.png, decks/postmortem/gate-preview/slide-02.png, decks/postmortem/gate-preview/slide-03.png, decks/postmortem/gate-preview/slide-04.png, decks/postmortem/gate-preview/slide-05.png, decks/postmortem/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: ebd15887af1420a53c07911945887c56225b4076cfc4bb40e4fd2c6e8bb738a2, slide-02.html: dcb79120c3ed60b889a9d611a4797e5b9f1eed7326a8d917f97b70b216d12531, slide-03.html: 0421f1a9746ff9dd5346e117be6533b3a7a83a03239a78f32bdf903b2411160d, slide-04.html: e1f25da08d63ba7efd011057c53ac0cc92a09ce22812141adb31969bbd7d0bc0, slide-05.html: 20c2d57642f7f9a474b1fb040586da4a76e3129d8c3f1f5dbc9b78567642af75, slide-06.html: 1330949d8fc0c2261743c239fb9f846a9dea1cdb2f40bde85c3b903ba607eaa5
Unresolved Critical: 0
Blocking findings: None

Method: all six PNGs of the current render were opened individually as full-size images — six
sheets is few enough to look at each one properly — and the contact sheet at
`decks/postmortem/contact-sheets/sheet-01.png` was then read as a set to check that the deck
holds together. Earlier renders were opened the same way, and that is how the defects listed
below were found; three of them `validate` reported as clean. Element geometry (`main`
bottom, per-column content bottom, per-paragraph line counts) was additionally read out of
headless Chromium to confirm that columns share a first-line baseline and that nothing sits
under the footer furniture, rather than trusting the eye at 1080p.

## Checks
- [x] Composition & hierarchy: PASS — One job per sheet, one anchor per sheet. slide-01.png:
  the anchor is the 64pt "POSTMORTEM" nameplate between two 2pt rules, with the headline,
  standfirst and a ruled byline column beneath it — a real front page, not a title in a box.
  slide-02.png: three columns under one headline, the first kicker in the deck's only red, so
  the eye starts at "what it is for". slide-03.png: the three concessions read as three
  parallel articles, and the numbered kickers make the count legible before any prose is read.
  slide-04.png: the sheet splits — one column of argument, four ruled conditions beside it —
  so "conditions, not tone" is visible in the layout itself. slide-05.png: the same split
  inverted, with three tells the audience can check against their own last review.
  slide-06.png: three decisions on rules, closed by the deck's only red rule and a single
  serif line. Cover and closing sheet both carry genuine anchors.
- [x] Typography & legibility: PASS — One scale across the deck: masthead 64pt, headline 28pt,
  subhead 16pt, standfirst/closing 17pt, prose 15pt, list prose 14pt, meta 11pt. grep over
  every `font-size` in the deck returns a minimum of **11pt**; no prose is below 14pt, and
  nothing is near the 10pt floor. Leading: 1.45 for prose, 1.4 for meta, 1.3 for subheads,
  1.35 for the masthead, 1.25 for headlines — `line-height: 1` appears nowhere, and the
  masthead was raised from 1.2 to 1.35 because `validate` caught Playfair's descenders
  clipping at both 1.2 and 1.3. Contrast on `#F4F1E8`: `#1C1B17` is about 15:1 and
  `#2E2C26` about 12:1, so both read at presentation distance; `#A8231B` is about 6:1 and is
  used only for 11pt tracked kickers and a 2pt rule, never for prose.
- [x] Korean/CJK word-break integrity: PASS (not applicable) — This is an English deck; there
  is no Hangul or CJK anywhere and Pretendard was removed after scaffolding. The equivalent
  English checks were done in its place: no headline wraps (each was measured against the
  656pt measure before it was written — the longest, on slide-02, needs 572pt), no line ends
  in an orphan word, and the one bad break that did appear — "No names in the cause / field"
  on slide-03 — was fixed with `text-wrap: balance` applied to every subhead, not just that
  one, so the fix cannot pull a single column off the grid.
- [x] Review Litmus: PASS — Three to five seconds a sheet. slide-03.png reads as
  "one · two · three, and here is what each one costs" before a sentence is read. slide-05.png
  reads as "three things to look for" from the ruled rows alone. There is no decoration to
  strip: the whole visual system is type, hairlines and column measure, which is what the
  spec's Avoid list demands. On removable lines — several were in fact removed during the
  render pass (slide-03's three columns lost 30–45 characters each to fit a seven-line
  budget) and all three sentences got sharper for it.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | The byline column overflowed `main`, ran under the foot hairline and collided with the folio caption — the "SOURCE — NONE…" line and the byline paragraph were printed on top of each other. `validate` passed the sheet 6/6, because a child overflowing its parent is neither an overflow past the frame nor a sibling overlap. **Critical-class when found**; logged Major because the table accepts Major/Minor/Note and it was resolved before this report | Major | Fixed: masthead 72 → 64pt, cover columns re-proportioned 1.6fr/1fr → 1.1fr/1fr, the separate "Source" kicker folded into a `strong` lead-in, source sentence cut to two lines, block margins trimmed 10 → 6/8pt. Column content now ends at 345.9pt against a `main` bottom of 346.1pt | resolved |
| slide-03 | Every column ran 51pt past the bottom of `main` and under the foot rule — the first column's prose was ten lines against a seven-line budget. Again reported clean by `validate` | Major | Fixed: all three column bodies rewritten to the measured seven-line budget (≈165 characters at a 197pt measure). All three now end on the same line | resolved |
| slide-02 | The third column ran one line longer than the other two, so its prose ended 22pt below its neighbours and 8pt past `main` | Minor | Fixed: "Knowing better is not a control" → "That is not a control", bringing all three columns to seven lines and a shared bottom | resolved |
| slide-03 | The first subhead broke as "No names in the cause / field", leaving one word alone on the second line | Minor | Fixed: `text-wrap: balance` on `h3` in all six files; it now reads "No names in / the cause field" | resolved |
| slide-05 | A band of empty paper roughly 35pt deep sat at the foot of the left column while the right column ran on — the sheet read as unfinished, which this style specifically forbids ("듬성듬성 비우지 말 것") | Minor | Fixed: the standfirst gained its real closing claim ("Nobody decides to drop them; they are simply never paid") to reach the seven-line budget, and the list rows' padding went 11 → 12pt so the three tells fill their column | resolved |
| slide-01, 04 | The cover's standfirst column and slide-04's argument column both stopped a line short of their neighbours | Minor | Fixed: one sentence added to each ("What follows is what they cost, and who has to pay" / "Change the estimate, not the tone"), both of which the outline already implied | resolved |
| slide-02, 03 | The two-line `min-height` on subheads leaves visible air under the one-line ones | Note | Accepted — it is what keeps the three columns' first prose lines on one baseline. Carried to design-debt.md | tracked |
| slide-01 | The masthead leaves ~170pt of clear paper to its right | Note | Accepted — a nameplate is set from the left margin. Carried to design-debt.md | tracked |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
