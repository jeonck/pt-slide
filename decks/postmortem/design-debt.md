# design debt — decks/postmortem

Findings accepted rather than fixed, and deliberate departures from the style contract.
Recorded here so the next edit knows they were decisions, not oversights.

## Departures from `ppt-print-first-newspaper`

1. **Three type families where Pass A prefers two.** The contract declares serif display
   (Playfair Display), serif body (Noto Serif) and sans meta (Inter), and its Avoid list
   *requires* the sans for meta type only ("산세리프는 메타 활자에만"). Keeping the contract means
   three families. Accepted: the contract is the more specific rule, and the third face never
   appears above 11pt or outside kickers and folios.

2. **Body face is Noto Serif (Latin), not Noto Serif KR.** The spec names the KR family
   because the upstream style is bilingual. This deck has no Hangul; the Latin cut is the same
   typeface at a fraction of the file size. Pretendard was deleted after scaffolding for the
   same reason.

3. **Paper grain omitted.** `shape.texture: paper-grain 5% opacity` is in the spec. A tiled
   data-URI SVG was the only gradient-free way to produce it (a `radial-gradient` dot field
   would violate the no-gradient rule), and at 5% over `#F4F1E8` it read as JPEG noise in the
   1080p render rather than as paper. Dropped. If it is ever wanted, it needs a real
   halftone tile at a higher opacity, not a noise field.

4. **Halftone photography unused.** The spec's only permitted visual element is a grayscale
   halftone photograph. There is no image in this deck, because there is no photograph this
   argument would be honest with — a stock picture of people at a whiteboard is decoration
   pretending to be evidence. The columns carry the sheet instead.

5. **Caption size raised.** Spec caption is 13pt on a 960 × 540pt canvas; scaled to this
   720 × 405pt canvas that is 9.75pt, below the framework's 10pt floor. Kickers and folios are
   set at **11pt** instead.

6. **Masthead larger than the scaled display size.** Display 56pt scales to 42pt. The cover
   masthead is set at **64pt**: it is a single word, it is the deck's only visual anchor, and
   the measured caps coefficient (0.751) still leaves it inside the 656pt measure.

## Accepted findings

| Slide | Finding | Why it is accepted |
|---|---|---|
| slide-02, 03 | The two-line `min-height` on the column subhead leaves visible air under the one-line subheads | Deliberate. Without it, a subhead that wraps in one column only drops that column's prose off the shared first-line baseline, which is the failure this style is least able to hide. Air under a short subhead is the cheaper of the two costs |
| slide-01 | The masthead leaves roughly 170pt of clear paper to its right | Deliberate: it is a masthead, set from the left margin like a nameplate. Stretching it with letter-spacing would contradict the spec's −0.01em tracking |
| slide-04, 05 | The two columns are unequal (0.8fr / 1.2fr and 1fr / 1.4fr) rather than a regular 3-up | The spec asks a magazine to vary its column division sheet to sheet. Column counts across the deck run 2 · 3 · 3 · 2 · 2 · 3 |
| all | The `strong` lead-ins inside list rows are the only bold body type in the deck | They are the row's subject, and the style has no other device for it — a badge or a coloured bar is forbidden by the Avoid list |
