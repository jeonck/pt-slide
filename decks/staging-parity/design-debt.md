# design debt — decks/staging-parity

Accepted deviations and Minor/Note findings, carried forward rather than discarded.
Style contract: `ppt-engineered-dark-deck`.

## 1. The signature glow is a flat fill (accepted, Note)

The style's identity cue is one radial glow per sheet, `#8B7BF0 → #3FB8C4`, centre 18%
opacity to edge 0%. This repo forbids gradients outright, and the skill's rule for that case
is to use the first stop as a flat fill and record it. So the glow is a single flat-alpha
region of the accent token at `fill-opacity: 0.10`, carried as a base64 data-URI SVG
background (not a positioned sibling, which would have tripped `sibling-overlap`).
No second colour, one per sheet.

The first implementation put the disc centre on the slide's top-right corner. It validated
clean and rendered as a hard-edged planet: an unmistakable circular object sitting on the
canvas, which is the one thing the style's own Avoid list says the glow must never become.
Fixed by moving the disc centre off-canvas (`background-position: right -170pt top -230pt`,
`background-size: 460pt`), so only a shallow arc is cropped into the top-right corner by two
frame edges. It now reads as a corner wash.

Residual debt: a flat fill still has a visible edge where a gradient would have none. On the
two sparsest sheets (01 and 05) that arc is discernible. Accepted — the alternative is either
a gradient (forbidden) or no signature at all.

Contrast check: the wash lifts the background from `#0E0E11` to roughly `#1A1822`. Body ink
`#9CA3AF` stays about 5.9:1 over it, and `#F4F4F5` far higher. `#6B7280` muted ink would fall
to ~3.4:1, so nothing in `#6B7280` is placed inside the washed corner — the kicker is
top-left, the source caption is bottom-right, and slide-04's price line was moved from
`#6B7280` to `#9CA3AF` for exactly this reason.

## 2. Type scale is not uniformly scaled to the canvas (accepted, Note)

The spec targets a 960×540pt stage; this canvas is 720×405pt, a 0.75 scale. Scaling the
spec's 17pt body gives 12.75pt and its 10pt caption gives 7.5pt — both below this repo's
floors. Display, title and kicker are scaled (50→44 on the cover, 30→23, kicker held at 11);
body, card header, mono and caption are held at or above spec size. Nothing is below 14pt
except the source caption and the mono numerals, which sit at 10pt and 11pt respectively.
Debt: the sheets are therefore slightly denser in type relative to the stage than the spec
intends. The alternative was illegible type.

## 3. Uniform 1px borders, emphasis by colour only (accepted, Note)

The spec marks an active process node and a recommended comparison column with a 1.5px
border while siblings keep 1px. Changing one sibling's border width moves that sibling's
content by the delta and breaks the column alignment this style is built on. Every node and
column keeps `1px solid #26262C`; the highlighted node on slide 02 changes only
`border-color` to `#8B7BF0`. Debt: emphasis is one notch quieter than the spec asks for.

## 4. No recommended column on slide 04 (accepted, Note)

The spec's comparison pattern marks a recommended column. Neither column is marked. The
deck's whole point is that the choice is the room's, and slide 05 asks for it explicitly;
pre-answering it on slide 04 would undercut the closing sheet.

## 5. `.rule` uses `#2E2E36`, not the `#26262C` border token (accepted, Note)

The in-card divider on slide 04 was first drawn with the `#26262C` border token. On render it
was effectively invisible: a 1px `#26262C` line sitting inside a card that is itself framed in
`#26262C` reads as absent. Moved to `#2E2E36`, the spec's `surface bar` token — still a
spec colour, one step lighter. Debt: two neutral hairline values now exist in the deck
instead of one.

## 6. `accent teal #3FB8C4` is unused

The spec allows it for chart series only. There are no charts, and the Avoid list caps the
deck at one accent. Not debt so much as a deliberate non-use, recorded so a later editor does
not "restore" it.

## 7. Root README not updated

The skill asks for a row in the root README's deck table. This deck was built under a brief
that forbids touching any file outside `decks/staging-parity/`, so that row is not written.
Whoever integrates this deck should add it.
