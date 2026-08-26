# design-debt — decks/observability-cost

Accepted Minor/Note findings and deliberate deviations from
`npx slides-grab show-design ppt-editorial-product-deck`. Nothing here is Critical; nothing
here is undocumented.

## Deviations from the style spec

### 1. Serif leading is 1.35, not the spec's 1.15 — forced
The spec gives `display: leading 1.15`. Source Serif 4's ascent + descent exceeds 1.15em, so
**every** serif heading in the first build failed `validate` with `text-clipped` — at 18, 20,
24, 26, 44 *and* 56pt. This is not a large-type problem, it is a face-metrics problem, and
the framework's own floors (1.2 large display, 1.4 body, 1.3 for display faces) exist for
exactly this. All Source Serif 4 in this deck is set at **1.35**; Inter body is at **1.5**,
which is the spec's own body leading. `line-height: 1` appears nowhere in the deck.

### 2. Point sizes are scaled by 0.75, then floored
The spec targets a 13.33 × 7.5in slide; this canvas is 10 × 5.625in. Straight scaling puts
the spec's kicker at 8.25pt, body at 13.5pt and caption at 7.5pt — under the framework's
floors. Kicker, all micro labels and the source caption are therefore held at **11pt** rather
than scaled down, and body is **16pt** (secondary 14pt) rather than 13.5. Nothing in the deck
is below 11pt.

### 3. The cover display is set *above* the scaled value
44pt × 0.75 = 33pt. The cover is set at **56pt** and the closing sheet at **44pt**. The gate
requires a real visual anchor on cover and closing sheets, this deck has no image and no
figure to serve as one, and the measured strings fit (`and get read the least` = 560pt of a
640pt column at 56pt). Type is the anchor, so type carries it.

### 4. Two style tokens are declared and never used
- `chart: #C8BFAD` and `chart: #9B917F` — **there is no chart in this deck.** See the "no
  figures, and why" section of `slide-outline.md`. Leaving the tokens unused is the point,
  not an oversight.
- `kpi: Source Serif 4 40pt` — a KPI slot needs a figure. There is no sourced figure, so
  there is no KPI tile.

### 5. `slide.header_band: 0.65–1.7in` is only partly honoured
Scaled, the band is 35.1 → 91.8pt. The kicker (32 → 47.4pt) and its hairline (56.75pt) sit
inside it; the 26pt heading runs from 76.1 to 111.2pt and finishes ~19pt past the band's
nominal bottom. Pulling the heading up would set it inside the hairline. Recorded rather
than forced.

### 6. "rule left 0.12in #B5503A" read as a left-edge rule
0.12in × 0.75 = 6.5pt, rounded to **6pt**, applied as `border-left` on the cover lede, slide
04's closing and slide 06's closing line. The alternative reading — a 6.5pt terracotta
segment at the left end of each hairline — would be invisible at this scale.

## Accepted Notes

### N1. The `×` operators on slide 03 are accent-coloured at 14pt
Decision 4 in the outline says accent is not used as ink below 16pt. The three `×` glyphs on
slide 03 are the exception: they are operators carrying the multiplication argument, not
prose, and `#B5503A` on `#F7F4EE` measures 4.58:1, over the 4.5:1 body bar anyway. Accepted.

### N2. Slide 05's first axis column is 16pt wider than the other two
Columns 2 and 3 carry a 0.75pt divider plus 16pt of left padding; column 1 has neither, so
its text starts flush with the h2 and the 12-column grid. Inner widths are 196.6 / 180.6 /
180.6pt. Aligning the first column's text to the grid was judged more important than three
identical measures. The same pattern is used for the row-label rail on slide 02.

### N3. `#7A7164` measures 4.39:1 against the cream background
Over the 4:1 bar for supporting text, under 4.5:1 for body. It is used for kickers, micro
labels, the source caption, slide 05's strip subtitle and slide 06's decision qualifiers —
never for a sentence carrying an argument. All argument prose is `#1F1B16` (roughly 15:1).

### N4. The presenter line is a placeholder
`Presenter · Team` on slide 01. No name is invented.
