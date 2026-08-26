# design-debt — decks/iac-drift

Minor and Note findings accepted at the design gate rather than fixed. Each is a deliberate
trade, not an oversight.

| # | Sheet | What | Why it was accepted | What would resolve it |
|---|---|---|---|---|
| 1 | slide-04 | Ledger labels are 13pt Archivo Black caps, well below the spec's 44pt heading and 24pt body | The label cell is 200pt wide and `READ-ONLY BY DEFAULT` needs 210pt at 15pt. Wrapping it to two lines pushed every row taller and dropped the closing line under the bottom rail — the defect this deck actually shipped once. The sheet's giant type is its 34pt title; these are labels. 13pt is 3pt clear of the framework's floor | Shorter labels. `READ-ONLY`, `BREAK-GLASS`, `CLOSE THE GAP` would run at 16pt, but they stop saying what the move is |
| 2 | slide-03 | The inverted callout's text starts 20pt inside the block, off the column grid the three columns above it sit on | A colour block with zero internal padding reads as a printing error. The block's own edges are on the grid, which is the alignment the style actually cares about | Hanging the text out of the block and leaving the block as a pure rule — but then it stops being a `rect-color-block` |
| 3 | all | Accent 2 `#0047FF` is never used anywhere in the deck | The spec permits one spot colour *per slide*, so alternating orange and blue would be legal; Pass A's system-consistency check wants a single accent across the deck, and one colour argues harder than two | Nothing — this is the intended reading of the two rules together |
| 4 | slide-02 | Body leading is 1.45 where the spec specifies 1.35 | The framework floors body leading at 1.4 because tighter values clip descenders, and that floor exists because it has already caught this repo out | Nothing; the floor wins |
| 5 | slide-01 | Cover display is 132pt against the spec's scaled 97.5pt | "Do not set type meekly small — giant type is the identity" is on the Avoid list, and `DRIFT` is five characters | Nothing |
