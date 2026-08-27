# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-27T14:50:45.151Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/postmortem/gate-preview/slide-01.png, decks/postmortem/gate-preview/slide-02.png, decks/postmortem/gate-preview/slide-03.png, decks/postmortem/gate-preview/slide-04.png, decks/postmortem/gate-preview/slide-05.png, decks/postmortem/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 1778bbf5ae5f58f44b236463590762a74692b516c6df20f8cf85ca3540d05704, slide-02.html: 3ada86ed69100ce36c7badfc7f7a2c507fd3e7db8d3bde44c81d32bbd2903019, slide-03.html: a227a24b7b1945eb522a49fbaa1f8222f477bbcbf38cf1479ec6b70dce8f8357, slide-04.html: bc267124918985e34133e31278799a5d39a3827e2dae75b5ef8a4e5d49f2bb9a, slide-05.html: 0b3e190c271d1d1a6d6d22e8afbb310f89e26c8c55e0a7cd351315a8c10017f4, slide-06.html: 8123c6beb83dcbbd1c5dd6f73ff90eb84681db92644a8cf6b35165370854e3f3
Unresolved Critical: 0
Blocking findings: None

Method: the six slide sources were read in full, every declared `font-size`, `line-height`
and colour literal was enumerated with grep, and the rendered PNGs listed above were opened
individually to confirm that what the CSS declares is what the sheet shows.

## Checks
- [x] System consistency: PASS — One layout system across the deck: masthead kicker row, 2pt
  section rule, `main`, 0.5pt hairline, folio row, in that order on all six sheets, with
  `main{flex:1;min-height:0}` pinning the furniture to the same y everywhere (verified with
  getBoundingClientRect: `main` bottom is 346.1pt and the footer top 365.6pt on every sheet).
  One background (`#F4F1E8`) and no second surface — there is no filled panel anywhere, which
  is what the style's "구획은 룰 라인으로" clause asks for. Two serif families in fixed roles
  (Playfair Display for masthead/headline/subhead, Noto Serif for prose) plus Inter for meta
  type only; the three-family count is the contract's own, recorded in design-debt.md. One
  accent, used once per sheet. Column division varies 2 · 3 · 3 · 2 · 2 · 3 as the spec
  requires of a magazine, but the column mechanics (16pt gap, 0.5pt full-height rule as a grid
  item, kicker → subhead → prose) are identical everywhere.
- [x] Color discipline: PASS — grep over all six files returns exactly four hex literals and
  all four are spec tokens: `#F4F1E8` (bg), `#1C1B17` (text/border/rules), `#2E2C26`
  (text body), `#A8231B` (accent). No fifth colour, no harmonic extension was needed, no
  gradient, no fill. The accent appears as one kicker on slides 01–05 and as the 2pt closing
  rule on slide 06 — never as body text and never as a fill, per the Avoid list.
- [x] AI slop tropes: PASS — No gradient (grep for `gradient` returns nothing), no rounded
  corner (no `border-radius` anywhere), no shadow, no card container, no left stripe, no SVG
  illustration, no icon, no emoji, no 3×2 icon grid. The visual vocabulary is type, hairline
  rules and column measure only. The fonts are the ones the style names, embedded locally from
  `@fontsource/*`; there is no generic Inter/Roboto/Arial stack standing in for a decision —
  Inter appears because the contract assigns it to caption type, and only there.
- [x] Content discipline: PASS — There is no number in this deck. No percentage, count, rate,
  duration, benchmark or stat strip appears on any sheet, and there is no chart or fake chart
  (no `canvas`, no div-bar). Every claim is a mechanism the audience can check against their
  own last review. The style's mandatory source/dateline slot is used to say so rather than to
  carry a fabricated citation: the cover byline column reads "Source — none. No metric, rate or
  duration appears in this deck; the argument is mechanical," and every sheet's folio repeats
  it. The presenter is the placeholder "Presenter · Team"; no name or organisation is invented.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Masthead set at 64pt, above the 42pt the spec's display size scales to | Note | Accepted and recorded in design-debt.md — one word, the cover's only anchor, measured to fit the 656pt measure | tracked |
| all | Three type families where the Pass A heuristic prefers two | Note | Accepted — the style contract itself declares three and reserves the sans for meta type. Recorded in design-debt.md | tracked |
| all | Spec texture (paper grain 5%) not applied | Note | Accepted — the gradient-free implementation read as compression noise at 1080p. Recorded in design-debt.md | tracked |
| all | Spec's halftone photograph vocabulary unused | Note | Accepted — no photograph would be evidence for this argument; columns carry the sheets instead | tracked |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/postmortem/gate-preview/slide-01.png, decks/postmortem/gate-preview/slide-02.png, decks/postmortem/gate-preview/slide-03.png, decks/postmortem/gate-preview/slide-04.png, decks/postmortem/gate-preview/slide-05.png, decks/postmortem/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: 1778bbf5ae5f58f44b236463590762a74692b516c6df20f8cf85ca3540d05704, slide-02.html: 3ada86ed69100ce36c7badfc7f7a2c507fd3e7db8d3bde44c81d32bbd2903019, slide-03.html: a227a24b7b1945eb522a49fbaa1f8222f477bbcbf38cf1479ec6b70dce8f8357, slide-04.html: bc267124918985e34133e31278799a5d39a3827e2dae75b5ef8a4e5d49f2bb9a, slide-05.html: 0b3e190c271d1d1a6d6d22e8afbb310f89e26c8c55e0a7cd351315a8c10017f4, slide-06.html: 8123c6beb83dcbbd1c5dd6f73ff90eb84681db92644a8cf6b35165370854e3f3
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
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: 1778bbf5ae5f58f44b236463590762a74692b516c6df20f8cf85ca3540d05704
- slide-02.html: 3ada86ed69100ce36c7badfc7f7a2c507fd3e7db8d3bde44c81d32bbd2903019
- slide-03.html: a227a24b7b1945eb522a49fbaa1f8222f477bbcbf38cf1479ec6b70dce8f8357
- slide-04.html: bc267124918985e34133e31278799a5d39a3827e2dae75b5ef8a4e5d49f2bb9a
- slide-05.html: 0b3e190c271d1d1a6d6d22e8afbb310f89e26c8c55e0a7cd351315a8c10017f4
- slide-06.html: 8123c6beb83dcbbd1c5dd6f73ff90eb84681db92644a8cf6b35165370854e3f3
