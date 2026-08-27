# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/backup-restore/gate-preview/slide-01.png, decks/backup-restore/gate-preview/slide-02.png, decks/backup-restore/gate-preview/slide-03.png, decks/backup-restore/gate-preview/slide-04.png, decks/backup-restore/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 70d34f13367d146479831384502a10defa38da8835effa5b3175446f767c62ca, slide-02.html: 5b24d4ceb2d22f40920eeb6805d455571bb55e980b9de0632bf595f5c6a53e7e, slide-03.html: fbc0bc60e5449f4ab4ffcf190d3b1cca233c9d271261d56376792e1f1c1efdf7, slide-04.html: af28097042a6bd1547a08f52a270e2fc0de12fe834f929281c637bf5bc75a49e, slide-05.html: 322f41f14b7769047fd002f50b4bd6fd5b28f6b3998f3b818922132d47dd090c
Unresolved Critical: 0
Blocking findings: None

## Method
All five PNGs were opened as images at full size, one at a time — not skimmed from a contact
sheet — and a contact sheet was then read once more as a set to check that the five sheets look
like one deck. The images actually opened were the 1080p renders written to
`decks/backup-restore/gate-preview/` (that directory is gitignored working evidence); the gate
re-rendered the identical fingerprints at 3840x2160 into
`decks/backup-restore/.slides-grab/gate-preview/`, which is what is committed and what the
Evidence line cites. Two full render rounds were done: the first round's images produced
three render-only defects (listed under Findings), the files were edited, and the second round's
images are the evidence cited above. In addition, a Playwright pass reported, for every element
on every sheet, `scrollHeight − clientHeight` and the rendered line count of every text node —
this is what confirms the "one line" and "two lines" claims below rather than eyeballing them.

## Checks

- [x] Composition & hierarchy: PASS — One job per sheet. slide-01: the claim, and nothing else;
  the anchor is a 44pt Playfair line filling the middle third of the canvas, which at
  presenting distance is the only thing on the sheet. slide-02: four silent failures on a gold
  hairline cross — the cross itself is the anchor, and the four cells are read as one object.
  slide-03: a two-column comparison split by a full-height gold hairline; the anchor is that
  divider. slide-04: four square hairline nodes in a row with chevron connectors — an unmistakable
  left-to-right sequence. slide-05: three questions stacked on the centre axis, separated by gold
  lozenges; the anchor is the vertical rhythm of numeral → question → sub. Cover and closing
  sheets both have a real visual anchor, not just text. Checked in the images that the four
  slide-04 node labels sit on one baseline and the four sub-lines sit on another (they do — the
  active step is marked by fill only, so no box metric changed), and that slide-03's two column
  kickers and their 34pt rules sit at identical y (they do).

- [x] Typography & legibility: PASS — Sizes present in the deck, read off the source and confirmed
  in the render: 44pt cover title, 26pt sheet titles, 19pt closing questions, 16pt cell headings,
  15pt cover thesis, 14pt body and node labels, 12pt node subs and decision subs, 11pt kickers,
  10pt closing numerals and the source caption. **Nothing is below 10pt.** Body copy is 14pt or
  larger everywhere. `line-height` values in the deck are 1.3, 1.35, 1.4, 1.5, 1.55 and 1.6 —
  there is no `1` and no `1.05`; the first validate run failed with `text-clipped` on the 44pt
  h1 and all four 26pt h2 at 1.25/1.3 leading, and the fix was to raise the leading, not to shrink
  the type. Contrast on the `#EDE6D6` ground: body ink `#3A2E1F` at 11.8:1, secondary `#6B5D46` at
  5.15:1. The gold `#A8893E` measures 2.66:1 and is therefore used for **no text at all** — only
  rules, borders, an arrowhead and a lozenge. Checked in the images that the 10pt italic caption
  and the 10pt Roman numerals are actually readable at full size; they are.

- [x] Korean/CJK word-break integrity: PASS — Not applicable in the ordinary sense: the deck is
  English-only and contains no Hangul or CJK codepoint (verified — no rendered text node holds any
  character above U+007F). Pretendard and its licence were deleted from `assets/fonts/` after
  scaffolding, so there is no CJK face to fall back to and no tofu risk. The equivalent English
  hazard — ragged or orphaned wraps — was checked instead, and one was found and fixed: slide-03's
  right column left the single word "promised." alone on a line. `text-wrap: balance` on the
  column paragraphs and on the cover thesis fixed it; every wrapped paragraph in the deck now
  breaks into lines of comparable length, confirmed in the round-two images. No line anywhere in
  the deck ends with a one-word orphan.

- [x] Review Litmus: PASS — Read cold at three seconds a sheet: 01 "a backup you have never
  restored is not a backup", 02 "four ways it fails quietly", 03 "a sample proves nothing",
  04 "the output is a corrected runbook", 05 "three decisions". That is the argument, in order,
  with no sheet needing a second look. Strip the decoration and the deck survives — the gold is
  four hairlines and a lozenge, and removing them would cost structure, not meaning. Lines that
  could be cut were cut: slide-02's cell bodies are two-sentence pairs of ≤40 characters, and each
  sheet carries one closing italic line rather than a summary block. The deck holds 5 sheets, 5
  titles, 16 short body lines and 3 questions in total.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-03 | Round 1 render: the two-column block was stretched to full height, so a ~230px dead zone opened under the shorter left column and the sheet read as bottom-heavy. `validate` passed it 5/5. | Major | Comparison block made auto-height and vertically centred inside `main`; the divider now stretches to the taller column only. | fixed, re-rendered |
| slide-03 | Round 1 render: right column wrapped "…in the time you promised." leaving "promised." alone on a line. | Minor | `text-wrap: balance` on the column paragraphs. | fixed, re-rendered |
| slide-05 | Round 1 render: the item separators were the same 34pt gold hairline as the header rule, so the header rule read as the first item's separator and the sheet lost its header/body distinction. | Major | Separators changed to a 5pt gold lozenge (the spec's `◆`); header rule left as the only hairline on the sheet. | fixed, re-rendered |
| slide-04 | Round 1 render: three nodes were bordered `#C4B79A` and the active one `#A8893E`, making the border colour do two jobs at once and pulling the chart token into a border role. | Minor | All four nodes take the identical 1px `#A8893E` border; step IV is marked by a `#F4EFE3` fill, which changes no box metric. | fixed, re-rendered |
| slide-04 | Round 1 render: the step badge was a square, against the spec's `diagram.step_badge: 0.36in circle`. | Minor | Badge made a circle at 22pt with a 12pt numeral at leading 1.4. | fixed, re-rendered |
| slide-05 | Round 2 render: only ~19pt separated the header rule from the first Roman numeral. | Minor | Separator height reduced 19pt → 14pt and sub margin 5pt → 4pt to free budget; the list's top margin raised 6pt → 18pt. | fixed, re-rendered |
| slide-03 | The divider hairline runs about 110pt past the left column's last line. | Note | None — the asymmetry is the argument, and padding it would mean inventing a claim. | tracked in design-debt.md |
| slide-01 | Cover thesis balances to two lines of which the second is slightly the longer. | Note | None — `text-wrap: balance` chose it; both lines are full and neither orphans. | accepted |
| all | `body`의 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 30pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in 안전 여백을 요구하고, 엔진이 재는 값은 DOM보다 약 8pt 크다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 | fixed |
| slide-02/04 | 테두리를 가진 `<li>`·`<p>`의 장식을 안쪽 래퍼 `<div>`로 옮겼다. text 엔진은 텍스트 요소의 border/background를 거부한다 | Note | 바깥(flex·크기)/안쪽(장식) 속성을 나눠 옮김. 렌더 픽셀 차이 0 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
