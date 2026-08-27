# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-27T14:51:18.171Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/test-deck/gate-preview/slide-01.png, decks/test-deck/gate-preview/slide-02.png, decks/test-deck/gate-preview/slide-03.png, decks/test-deck/gate-preview/slide-04.png, decks/test-deck/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: bb691e80d94bbdcbedadc29d38b376c1b71e1db8836066e7281a9a405547d6ae, slide-02.html: f3c2bcae956000f00f7b8fd39f83b71d2375938eec53cfb94ad6971e1a0605c9, slide-03.html: e68d33a1e045922aab90838b0b65411837a746c686605b541aa8225d9e18f9c4, slide-04.html: daefa99c426e6d787dc94f94cc668d30098c5fc781a586941d721b3a99b0f0c8, slide-05.html: 57e299c9ed86e8113d1e4f15af9736d9425a9f1bb2eb5087f2593ab25e5e87ce
Unresolved Critical: 0
Blocking findings: None

Inputs reviewed: all five `slide-*.html` sources, the five rendered PNGs listed above, the green `slides-grab validate` summary (5 checked / 5 passed / 0 errors / 0 warnings), and the approved bundled style spec `ppt-korea-policy-navy` as printed by `slides-grab show-design ppt-korea-policy-navy`.

## Checks
- [x] System consistency: PASS — One declared system across the deck. Exactly two background colors: white `#FFFFFF` (slide-02/03/04) and navy `#0B2C5C` (slide-01/05, the poster bookends). Exactly one typeface, Pretendard, in four weights (400/600/700/800) loaded locally from `./assets/fonts/`. One accent, KRDS blue `#1B66C9`, used for the number chips, the info-callout left rule, the process connectors and the cover/closing vertical rule. All three content slides repeat the same header contract: 48.6pt navy band = 12% of the 405pt canvas, chapter number chip at left, slide page number at right (slide-02.png, slide-03.png, slide-04.png all show the band at identical height and the chip at identical position). The deck is text-led throughout as declared in `slide-outline.md`; no image-led slide is claimed and none appears.
- [x] Color discipline: PASS — Every color traces to the approved spec: bg `#FFFFFF`, surface `#E8F1FB`, text `#1A1A1A`, text-muted `#5C6470`, navy `#0B2C5C`, accent-1 `#1B66C9`, accent-2 `#E03B3B`, border `#C5D2E3`. Two navy-family tints are used and are **documented** extensions, not fresh standalone hues: `#3A5B87` (hairline on navy, ≈ `#0B2C5C`→`#C5D2E3` at 25%) and `#8FA6C4` (muted label on navy, same axis at ≈62%); the spec's own muted `#5C6470` is unreadable on navy, which is why the axis is extended rather than replaced. Both are recorded in `slide-outline.md` meta and `design-debt.md`. Accent-3 green `#1F9D57` is unused because the deck carries no positive-direction indicator — an omission, not a violation. Red `#E03B3B` appears exactly once, as the 4px left status border on the "미루면 위험한 것" card in slide-04.png, i.e. strictly as risk-direction encoding and never as decoration, which the style's Avoid list requires.
- [x] AI slop tropes: PASS — No gradients anywhere; every fill is flat (slide-01.png and slide-05.png are flat navy, not a gradient wash). No rounded corners and no shadows: the cards in slide-03.png/slide-04.png are square-cornered 1px `#C5D2E3` rules, matching the spec's `radius 2px`/no-shadow rule. The left-border stripe is not a decorative default — it appears only where the style spec defines it semantically (info callout, active process step, risk card). No inline-SVG illustration: the only SVG in the deck is the two process connectors on slide-03 (a line plus an arrowhead, no text, no drawn imagery). No generic font stack — Pretendard only, with `Noto Sans KR` as the sole fallback, both explicitly required by the style spec. No emoji. No 3×2 icon-plus-blurb grid: slide-02 is a 3-column hairline-divided report grid with numbered sections and a bottom "이동 방향" row, not icon cards.
- [x] Content discipline: PASS — Zero numbers are presented as data. There is no stat strip, no percentage, no chart and no cited figure anywhere in the deck; the only numerals are structural (chapter/step numbers 01–03, page numbers, the deck date 2026. 08). This was a deliberate constraint recorded in `slide-outline.md` ("출처를 댈 수 있는 실측 데이터가 없으므로 수치·그래프를 만들지 않는다"), so nothing invented is shown as real. Every slide matches its approved outline entry one-for-one; no slide, section or element was added beyond the outline. Korean body copy stays within the style's 7-line ceiling — the densest block is 3 lines (slide-02 column bodies, slide-03 node bodies). Placeholders are honestly marked as placeholders ("발표자 · 소속") rather than filled with an invented name.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01, slide-05 | Navy-surface tints `#3A5B87` / `#8FA6C4` are outside the literal spec palette; used because spec muted `#5C6470` fails contrast on navy | Note | Documented as harmonic navy-axis extensions in `slide-outline.md` meta and `design-debt.md` | tracked |
| slide-01, slide-05 | Presenter/affiliation reads "발표자 · 소속" — an intentional placeholder the user must fill before presenting | Note | Hand off to user; do not invent a name | tracked |
| slide-02, slide-03, slide-04 | Accent-3 green `#1F9D57` unused (no positive-direction indicator exists in this deck's content) | Note | None — using it decoratively would violate the style's Avoid list | tracked |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/test-deck/gate-preview/slide-01.png, decks/test-deck/gate-preview/slide-02.png, decks/test-deck/gate-preview/slide-03.png, decks/test-deck/gate-preview/slide-04.png, decks/test-deck/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: bb691e80d94bbdcbedadc29d38b376c1b71e1db8836066e7281a9a405547d6ae, slide-02.html: f3c2bcae956000f00f7b8fd39f83b71d2375938eec53cfb94ad6971e1a0605c9, slide-03.html: e68d33a1e045922aab90838b0b65411837a746c686605b541aa8225d9e18f9c4, slide-04.html: daefa99c426e6d787dc94f94cc668d30098c5fc781a586941d721b3a99b0f0c8, slide-05.html: 57e299c9ed86e8113d1e4f15af9736d9425a9f1bb2eb5087f2593ab25e5e87ce
Unresolved Critical: 0
Blocking findings: None

Method: every one of the five rendered PNGs above was opened and inspected as an image at 1920×1080 before this report was written. Findings below cite what is visible in those renders, not the HTML source.

## Checks
- [x] Composition & hierarchy: PASS — Each slide carries one job. slide-01.png reads as a poster: the 38pt ExtraBold title is by a wide margin the loudest element, anchored by the blue vertical rule, with only a kicker chip above and a hairline meta row below; the open right field is deliberate negative space, not an unfilled hole. slide-02.png presents one idea in three parallel numbered columns whose full-height hairlines carry the grid, with a single info callout as the takeaway. slide-03.png has a genuine visual anchor — the three-node process flow with directional arrows — and marks the current stage by fill and left rule, so the eye lands on "위임" first. slide-04.png is a clean two-card comparison whose asymmetry (blue vs. red status rule) tells the reader which side is risk before any word is read. slide-05.png mirrors the cover, closing the deck on the same system. Chrome is minimal: no shadows, no rounded cards; whitespace and the hairline grid do the structural work.
- [x] Typography & legibility: PASS — One reused scale across the deck: display 54/38pt, band heading 22pt, section heading 19/17/15pt, body 15pt, caption 12/11/10pt. Body copy is 15pt everywhere it appears (slide-02 columns, slide-03 node bodies, slide-04 list items), above the 14pt floor; the smallest text in the deck is the 10pt "발표/일자/구분" labels on slide-01.png, at the 10pt floor and not below it. Contrast checks out in the renders: white and `#E8F1FB` on navy `#0B2C5C` (slide-01.png, slide-05.png) and `#5C6470` / `#1A1A1A` on white (slide-02.png, slide-04.png) all read clearly at presentation distance; the muted `#8FA6C4` is used only for small non-essential labels. No tofu, no glyph drop: all Hangul renders correctly from the locally embedded Pretendard, verified in every render. No descender clipping — the "Q&A" display on slide-05.png was clipping at line-height 1.05 and was fixed to 1.2, and `slides-grab validate` now reports zero `text-clipped`.
- [x] Korean/CJK word-break integrity: PASS — Layer 1: `word-break: keep-all` is set on the body of all five slides, and no 어절 is split mid-word in any render; every wrap in slide-02.png, slide-03.png and slide-04.png falls on a word boundary. Layer 2: the earlier ragged output is gone. slide-04.png previously stranded single-syllable tail lines ("만든다", "다", "한다", "기") — the copy was shortened within the approved outline so all six bullets now sit on one line each. slide-02.png's three column bodies wrap to three lines of roughly even length (no line is a small fraction of its neighbors), and slide-03.png's node bodies wrap to three, three and two even lines. The cover title uses an explicit `<br>` at the phrase boundary ("인공지능의 미래와 / 업무 자동화") so the largest type in the deck breaks where intended rather than where the box runs out.
- [x] Review Litmus: PASS — Main point in 3–5 seconds on every slide: slide-01 the subject, slide-02 "세 가지가 이동하고 있다", slide-03 "자동화는 3단계", slide-04 "먼저 할 일 vs 위험", slide-05 "논의 세 가지". One dominant idea per slide, no competing blocks. One real anchor per slide (title block / hairline grid / process flow / two-card comparison / Q&A display). Strip the chrome and the deck survives — there is almost none to strip: no shadows, no rounded cards, no gradients; structure is carried by the navy band, hairlines and number chips. Nothing removable without loss: each callout states the slide's takeaway, each "이동 방향" and "사람의 역할" row adds information the heading does not.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | Roughly the right half of the cover is empty field | Note | Intentional poster negative space; the title block already dominates | tracked |
| slide-03 | Node bodies (2–3 lines) leave visible slack above the bottom "사람의 역할" row inside the taller boxes | Minor | Accepted — the pinned bottom row aligns across all three nodes and keeps the row baseline consistent; padding the copy would mean filler | tracked |
| slide-05 | Discussion list occupies the right column only; the left column below "함께 정하고 싶은 세 가지" is open | Note | Intentional, mirrors the cover's asymmetry | tracked |
| all | 프레임 하단 여백을 올려 최하단 텍스트가 아래 가장자리에서 38pt 위에 오게 했다. 파워포인트 text 엔진이 0.5in(36pt) 안전 여백을 요구한다 | Note | 편집 가능한 PPTX를 위한 변경. 넘침 0(실측), 컨택트 시트 재확인 결과 레이아웃 변화 없음 | fixed |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: bb691e80d94bbdcbedadc29d38b376c1b71e1db8836066e7281a9a405547d6ae
- slide-02.html: f3c2bcae956000f00f7b8fd39f83b71d2375938eec53cfb94ad6971e1a0605c9
- slide-03.html: e68d33a1e045922aab90838b0b65411837a746c686605b541aa8225d9e18f9c4
- slide-04.html: daefa99c426e6d787dc94f94cc668d30098c5fc781a586941d721b3a99b0f0c8
- slide-05.html: 57e299c9ed86e8113d1e4f15af9736d9425a9f1bb2eb5087f2593ab25e5e87ce
