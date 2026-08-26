# design-debt — decks/slo

Minor and Note findings accepted at the design gate rather than fixed. Each is a deliberate
trade, not an oversight. Nothing on the colour axis appears here: the deck uses four of the
style's five tokens verbatim and extends the palette nowhere, so there was no harmonic
extension to justify.

| # | Sheet | What | Why it was accepted | What would resolve it |
|---|---|---|---|---|
| 1 | slide-05 | No card carries the spec's 3px emphasis border, so this is the only body sheet with no marked element | The three failure modes are equal. Marking one would assert that a target nobody chose is worse than a budget with no teeth, which is a ranking this deck has no basis for — and the gate's own content-discipline rule is that you do not dress a claim you cannot support. Uniform treatment is the honest reading, and the three cards map one-to-one onto the three decisions on 06 | Evidence that one failure mode is the common one. There is none available here, and inventing it would be Critical |
| 2 | slide-03 | The two column bodies run to four lines each and leave about 24pt of unused height above the closing band | The columns carry a top hairline and the band carries its own, so the gap reads as the block's internal padding rather than as a hole. The alternative was inventing a third claim to fill it | A third column with something true in it, or a taller process row. Neither was worth the copy |
| 3 | slide-04 | The head-row mono labels sit at `#666666` on the `#F2F2F2` fill, about 5.3:1, rather than at full ink | Above the 4.5:1 body threshold, and it keeps the 3pt bar as the single emphasis signal on that row. Full-ink head labels were in fact tried and are the defect Pass B logs: two of three columns then read as emphasised | Nothing — full ink was the bug |
| 4 | slide-01 | The rule above the presenter placeholder stops 24pt short of the vertical column divider | It is the left column's own rule and the 24pt is the grid gutter, so it is consistent with every other gutter on the sheet rather than short | Running the rule under the gutter, which would make the two columns read as one |
| 5 | all | `#999999` (text disabled) is never used | This deck has exactly two text roles — prose and label. A third grey would be a distinction with no job, and it would weaken the label grey it sits next to | A third role. There isn't one |
| 6 | all | Point sizes and line heights depart from the spec's absolute values | The spec targets 13.33 × 7.5in and this canvas is 10 × 5.625in, so every size is scaled 0.75 and then floored at the framework's 14pt body / 10pt absolute minima and its 1.2/1.4 leading floors. Recorded in slide-outline.md decisions 1 and 2 | Nothing; the floors win |
