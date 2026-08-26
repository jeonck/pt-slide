# design debt — decks/deployment-strategies

Accepted Minor/Note findings from the design gate, and the recorded departures from
`ppt-bold-block-infographic-deck` that were made deliberately rather than by oversight.

## Accepted, not fixed

| # | Where | What | Why it was accepted |
|---|---|---|---|
| 1 | slide-04 | The sheet is airier than 02 and 03 — a wide white prose column runs between the tag blocks and the consequence chips. | The style's own `diagram.process_flow` puts the caption on white *below* the blocks; here it sits beside them. The sheet still carries six colour-block modules, the most of any sheet in the deck, so the "density is the identity" rule is met by block count. Making the prose column narrower would push every band to four lines and break the vertical budget. |
| 2 | slide-02 vs slide-03 | Both sheets use a left label rail, but slide-02's labels are left-aligned and slide-03's are right-aligned. | Different roles. On 02 the rail is a table row header and its amber cell is a block whose left edge must line up with the body margin. On 03 the rail is an axis label sitting *outside* the matrix, so it is set flush to the matrix it annotates, per the spec's "axis labels outside". |
| 3 | slide-01, slide-05 | White-on-teal measures 4.19:1 — above the 4:1 secondary-text bar, below the 4.5:1 body bar. | Teal blocks carry only short labels, numbers and single-clause values, all at ≥14pt weight 600–800, which clears the large-text threshold. No running body copy is set on teal anywhere in the deck. |
| 4 | whole deck | `#C0392B` (the spec's delta-down colour) and every chart token in the spec are unused. | There are no deltas and no chart — see `slide-outline.md`, "no chart, and why". Leaving the tokens unused is correct; inventing data to use them would not be. |

## Recorded departures from the style spec
These are argued in full in `slide-outline.md` under "deviations from the spec, recorded":

1. Charcoal ink, not white, on amber blocks (white on amber is 2.17:1).
2. No running prose on teal.
3. Amber never marks a *recommended* strategy, only the rollback thread.
4. Type sizes are the framework's floors, not the spec's absolute points (the spec targets a
   13.33in canvas; this is a 10in one).
5. Comparison columns have no separately coloured header band.
