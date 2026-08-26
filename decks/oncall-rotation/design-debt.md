# design-debt — decks/oncall-rotation

Accepted Minor/Note findings from the design gate, kept here rather than dropped.

## 1. Terracotta on sand measures ~3.3:1 (Note, accepted per spec)
`#C2693F` on `#F2EBDF` computes to a contrast ratio of about **3.29:1**.

- Where that is fine and kept: the 1.5pt arc on the cover, the 1pt accent rules on slides 02
  and 05, the badge fills, and the 18pt emphasis line on slide 03 (large text).
- Where it is marginal: the **12pt uppercase column heads and kickers**. The style spec fixes
  these as "12pt terracotta small-caps header per column" and they are the signature of the
  comparison and divider patterns, so they were kept. They are labels, never the argument —
  every load-bearing sentence on every sheet is ink brown `#3D3528`, which measures **10.2:1**.
- Reference figures: bg `#F2EBDF` relative luminance 0.836; text `#3D3528` 0.037;
  accent `#C2693F` 0.220; muted `#8A8170` 0.223.

## 2. `text muted` is used once per sheet, not as the spec's caption colour (Note)
Spec assigns `#8A8170` to captions. On this background it measures **3.25:1**, below the 4:1
this repo targets for secondary text — and the caption on every sheet carries the deck's
no-data disclosure, which has to be readable from the back of a room. The caption is therefore
set in `#3D3528` at 11pt/500, and `#8A8170` is used only for the sheet counter and the
presenter placeholder, where nothing is lost if it recedes. No new colour was introduced.

## 3. Step badges sit inside the node outline (Note)
The style's `diagram.process_flow` puts the step number in a badge "floating top-left" of the
node, overhanging its corner. Here the badge sits inside the node's padding instead. An
overhanging absolutely-positioned badge either eats the vertical clearance the height budget
had already allocated, or pushes a bounding box into a neighbouring grid cell — the second of
which `validate` reports as `sibling-overlap`. Inside the outline costs nothing the diagram
needs, so it was preferred to fighting the frame.

## 4. Five `sibling-overlap` warnings on slide-01 (Note, expected)
`validate` reports 5 warnings, all on the cover ring: the terracotta arc and the hollow handover
markers sit on the ink circle, so their bounding boxes intersect it. That intersection **is**
the diagram — the markers mark points on the ring. Documented in the skill's troubleshooting
notes as a warning to leave alone, not an error.

## 5. Slide 04 carries more ink than the style's "over half the sheet empty" (Minor)
`ppt-warm-minimal-diagram-deck` asks for generous whitespace and 2–4 modules per sheet. Slide
04 has a lead line, a three-node flow and three consequence rows — four modules, and the
densest sheet in the deck. It was kept because splitting it would need a sixth slide, and the
brief fixes the count at five. Slides 01, 02, 03 and 05 all sit at or under the density the
style asks for, so the deck's average holds.
