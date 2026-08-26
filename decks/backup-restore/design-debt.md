# design-debt — decks/backup-restore

Accepted Minor/Note findings and documented departures from
`ppt-heritage-luxury-deck`. Everything here was seen in the render and kept on purpose.

## Palette extension — `#6B5D46`
One tone added, on the spec's hue, between `text #3A2E1F` and `text-muted #8A7C63`.

| tone | contrast on bg `#EDE6D6` |
|---|---|
| `#3A2E1F` (spec text) | 11.8:1 |
| **`#6B5D46` (extension)** | **5.15:1** |
| `#8A7C63` (spec muted) | 3.28:1 |

The spec's muted tone fails the 4:1 the skill sets for secondary text and is visibly thin at
10–12pt from presenting distance. `#6B5D46` carries every sub-line, kicker and the fixed source
caption. `#8A7C63` is not used anywhere in the deck — kept in the token list for reference only.
Recorded in `slide-outline.md` too.

## Notes accepted, not fixed

| Slide | Note | Why it stands |
|---|---|---|
| slide-03 | The left column runs about 110pt shorter than the right, so the divider hairline extends past the left column's last line. | The asymmetry *is* the argument: the sample restore has less to prove. The whole comparison block is vertically centred so the sheet still reads balanced, and both column kickers and their 34pt rules sit on the same baseline. Padding the left column would mean inventing a third claim. |
| slide-01 | The cover's second gold rule is 200pt, not the 34pt kicker rule used on sheets 2–5. | The cover has no kicker beneath it — this rule separates title from thesis, a different job. The 34pt kicker rule is present above the title, so both widths appear on the sheet with distinct roles. |
| slide-05 | The gold lozenge separating the three decisions is an extension of the spec's `gold ◆` from its comparison diagram into a section separator. | Reusing the 34pt hairline here made the header rule and the item separators identical, so the sheet lost its header/body distinction — caught in the render, not by `validate`. The lozenge is the same accent, unmistakably a different mark. |
| slide-04 | The step badge is a 22pt circle with a 12pt numeral, against the spec's 0.36in (≈19pt at this canvas) and 16pt numeral. | 19pt with a 16pt numeral clips the numeral — a failure the skill records by name. The badge is a circle as the spec's `diagram.step_badge` requires; the style's `radius 0` rule governs panels, and every panel on the sheet has square corners. |
| slide-04 | Step IV is marked by a `#F4EFE3` surface fill while I–III are unfilled; all four keep the identical 1px gold border. | Emphasis that changes no box metric. A heavier border on one node would push that node's contents inward and break the label baseline shared by all four — the skill's "emphasise all, vary the value" rule. |
| all | The spec's `slide.source_caption` slot carries a statement of fact rather than a citation. | There is nothing to cite: the deck asserts no figures. Leaving the mandatory slot empty or inventing a source would both be worse. See `slide-outline.md` → "no numbers". |
| all | Type sizes are not the spec's absolute points. | The spec targets 960 × 540pt; this canvas is 720 × 405pt. Scaling its 17pt body and 10pt caption by 0.75 lands under the framework's 14pt / 10pt floors, so small type is held at or above the floors and the display sizes are scaled down instead (52pt → 44pt, 34pt → 26pt). |
