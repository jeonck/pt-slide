# design-debt — decks/incident-response

Minor and Note findings accepted at the design gate rather than fixed. Nothing here blocks.

## Colour
**No debt.** Every colour on every sheet is one of the seven tokens `slides-grab show-design
ppt-dark-tech` publishes — `#0C0D10`, `#16181D`, `#E4E6EB`, `#8A8F9A`, `#3DF5E0`, `#9D7BFF`,
`#2A2D35`. No harmonised extension was needed, so none is recorded.

The one non-token value in the source is `rgba(61,245,224,0.45)` / `rgba(61,245,224,0.30)`,
used only as the *glow* colour in `box-shadow`. That is accent 1 at reduced alpha, which is
how the spec asks for depth (`0 0 8px` neon glow instead of a diffuse shadow), not a new hue.

## Accepted findings

| Sheet | Finding | Severity | Why it is accepted |
|---|---|---|---|
| 01 | The cover carries a large area of empty charcoal below the thesis | Note | Deliberate. The slack is split 0.8 : 1 above and below the title block, so the display type sits just above centre with the meta strip on the foot rule. Negative space around a 38pt title is the cover's composition; filling it would mean inventing content. |
| 03 | Each role card leaves ~20pt of unused height below the `// DOES NOT` paragraph | Note | Uniform across all three cards because all six paragraphs run to three lines, so it reads as card padding, not as a hole. Pinning the lower block with `margin-top:auto` would simply move the same gap above the divider rule. |
| 05 | `SEV-3` and `SEV-4` rows are set in muted `#8A8F9A` rather than full-strength text | Minor | Intentional: the ladder should visibly fall away as the obligation falls away. Measured contrast of muted on `#16181D` is ~5.5:1, above the 4.5:1 body threshold, so nothing is hard to read at presentation distance. |
| 05 | The tier rows do not narrow downward the way `diagram.hierarchy_funnel` specifies | Minor | Recorded as deviation 2 in `slide-outline.md`. Narrowing tiers would misalign the four columns that make the ladder comparable row to row. Everything else in the funnel vocabulary is kept — code-block fill, 4px radius, mono tier labels, cyan top edge with glow. |
| 04 | The sheet uses the vertical hierarchy node/connector form, not the horizontal 4–5 step process flow | Minor | Recorded as deviation 1 in `slide-outline.md`. Five columns across 652pt give ~13 characters a line at the 14pt body floor; dropping below 14pt to fit would be a gate Critical. |
| 02, 05 | Two sheets carry a right-hand footer caption that is a disclaimer (`NO CHART · MECHANISM ONLY`, `LADDER PROPOSED FOR DISCUSSION`) rather than a title | Note | The style gives the footer no mandated content. Using the slot to mark what is *not* claimed is worth more here than repeating the deck name twice on a line. |
