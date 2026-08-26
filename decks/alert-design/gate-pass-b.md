# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/alert-design/gate-preview/slide-01.png, decks/alert-design/gate-preview/slide-02.png, decks/alert-design/gate-preview/slide-03.png, decks/alert-design/gate-preview/slide-04.png, decks/alert-design/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 00d33e7e028788b881e897262a0e89c6ad4cb1c3882cd2f6e65790ac641845e2, slide-02.html: 2766d3754b83b44ba48e4e329fb702e880d15d18ce77dd753d1d619e6abf7fb2, slide-03.html: 48fefd3a6e27b1e6b553330a806e7e49775edef4fbc016cd441be03b44e28fa1, slide-04.html: ee8055f04efd0a33db02f62de3b2dd7a680fc9d909f090afe580f3dc7b29c063, slide-05.html: 065f55cda3086cdbedfb56857e4460e28b386422cd3c097225239af5b5ad24c3
Unresolved Critical: 0
Blocking findings: None

Method: **all five PNGs were opened as images and looked at, at full 1920x1080, not skimmed from
a thumbnail.** Two regions were additionally cropped and magnified because the full-frame view
was ambiguous: `slide-04.png` at (520,720)-(720,960) to confirm the new white column rule on the
inverted row spans the whole row height rather than only the content height, and `slide-03.png`
at (100,340)-(1830,800) to read the three gate nodes at text size and confirm no runt lines. The
contact sheet `decks/alert-design/contact-sheets/sheet-01.png` was then used to judge the five as
a set — which is where the cross-sheet rule alignment is actually visible. The renders were
opened four times across four rounds of fixes; the descriptions below are of the final render.

## Checks
- [x] Composition & hierarchy: PASS — One job per sheet, one anchor per sheet, and every anchor
  is the same device so the deck reads as one system. 01: the 40pt two-line headline over a
  full-width black thesis block between two rules — unmistakably a cover. 02: the black PAGE
  column standing against two white ones, which *is* the argument (one of the three wakes
  someone) made visible before a word is read. 03: three bordered gate nodes with numbered black
  chips, joined left to right by arrows, closed by a black bar — the eye runs 01, 02, 03, verdict.
  04: a three-row ledger where the row that matters, FIX, is punched out in black. 05: the black
  rule block as the closing anchor, then three numbered questions. The cover's spare height was
  stacked entirely above the headline in the first render, leaving a dead band under the top
  rule; `justify-content: center` now splits it, and the cover reads balanced. No sheet has a
  hollow middle: on 02 and 04 the tables take `flex:1` and fill the frame, on 03 the "if no"
  strip is pinned to each node's floor with `margin-top:auto` so the three strips share one
  baseline.
- [x] Typography & legibility: PASS — Nothing under 10pt anywhere in the deck; `grep` over the
  sources returns 10, 12, 14, 15, 16, 17, 22, 24, 40pt only. The 10pt occurrences are the footer
  captions, the gutter labels on 02 and the "IF NO" strips on 03 — all at the floor, none under
  it. Body copy is 14pt everywhere: slide 03's gate questions were 13pt in an earlier render and
  were raised to 14pt (narrowing the connectors and cutting each question to 43 characters to pay
  for it), because those questions are the slide's whole argument and should not sit under the
  body minimum. One scale, one family, two weights. Contrast at presentation distance: `#0A0A0A`
  on `#FFFFFF` and `#FFFFFF` on `#0A0A0A` are ~19.8:1; `#3D3D3D` on `#FFFFFF` (sublines, gutter
  labels) ~10.4:1; `#3D3D3D` on the `#E6E6E6` strips (slide 03) ~8.2:1; `#767676` on `#FFFFFF`
  ~4.5:1 and used only for 10pt footer captions and the two gutter labels, which is secondary
  text against the 4:1 bar. Nothing is painted its own background colour and vanishes — the
  inverted regions were checked one by one in the renders and every one carries white text.
  Line-heights are 1.2 on the 40pt cover headline and the 24pt titles, 1.3–1.45 on everything
  else, and 1.4 inside the fixed-size chips; `line-height: 1` appears nowhere, and `validate`
  reports no `text-clipped`, so no ascender or descender is cut.
- [x] Korean/CJK word-break integrity: PASS — vacuously on Layer 1 and checked in substance on
  Layer 2. This is an English deck: there is no Hangul or CJK text in any of the five sheets, and Pretendard was removed from `assets/fonts/`. The analogous
  Latin failure, the one-word runt line, was checked instead and found in three places in the
  first renders: TICKET's cell ending on "day.", PAGE's ending on "wait.", and gate 03's question
  ending on "step?". All three are fixed with `text-wrap: balance` on the wrapping paragraphs of
  slides 02 and 03 — visible in the final `slide-02.png`, where all six cells now set as three
  even lines, and in the slide-03 crop, where all three questions set as two even lines. The
  titles and sublines are held to one line by `white-space: nowrap` plus the character budget, so
  they cannot wrap and drag the 4px rule to a different y.
- [x] Review Litmus: PASS — Three-to-five-second read on each: 01 "alert design, what deserves a
  page"; 02 "three destinations, PAGE is the loud one"; 03 "three gates, then it earns a page";
  04 "delete, downgrade, fix — fix is the one"; 05 "here is the rule, here are three decisions".
  Strip the decoration and the deck still works, because the decoration is rules and inversion,
  both of which carry meaning rather than dress. Lines that could go were cut rather than kept:
  slide 04 lost a summary line (the subline already says it), slide 03's questions each lost five
  to nine words in the 14pt pass and read sharper for it, and no sheet exceeds the spec's
  six-line body ceiling — the densest is slide 02 at three lines per cell.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | First render: all ~86pt of the cover's spare height sat between the top rule and the headline, none below the thesis block | Minor | `justify-content: flex-end` changed to `center` | fixed |
| slide-02 | First render: cell text was vertically centred, so the first lines of the three columns did not align — in a strict-grid style that is the style breaking | Minor | Cells and gutter labels top-aligned | fixed |
| slide-02 | First render: runt last lines ("day.", "wait.") | Minor | `text-wrap: balance` on the cell paragraphs; gutter narrowed 92pt to 78pt to give the columns 14pt back | fixed |
| slide-03 | First render: gate questions were 13pt, above the 10pt floor but below the 14pt body minimum | Minor | Raised to 14pt; connectors narrowed 20pt to 16pt and each question cut to 43 characters to keep two lines | fixed |
| slide-03 | Runt line "step?" after the 14pt raise | Minor | `text-wrap: balance` on the question paragraphs | fixed |
| slide-03 | The connectors touch the node borders they point at | Note | That is what an arrow into a node means; `validate` reports no sibling-overlap here | tracked |
| slide-04 | First render: the new column rule spanned only the content height, reading as a floating stub rather than a table rule | Minor | Row set to `align-items: stretch`; the cells centre their own contents | fixed |
| slide-04 | First render: "DOWNGRADE" at 18pt touched that rule | Minor | 17pt at 0.02em tracking rather than widening the column, which would have pushed row B onto a third line | fixed |
| slide-05 | First render: "Q1"/"Q2"/"Q3" at 12pt nearly filled the 22pt chips | Minor | Single digits `1` `2` `3`, which is what the spec's number chip is for | fixed |
| deck-wide | The deck contains no figure of any kind | Note | Deliberate; recorded in `slide-outline.md` and stated on every content sheet's footer | tracked |
