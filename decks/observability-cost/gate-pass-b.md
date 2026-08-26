# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/observability-cost/gate-preview/slide-01.png, decks/observability-cost/gate-preview/slide-02.png, decks/observability-cost/gate-preview/slide-03.png, decks/observability-cost/gate-preview/slide-04.png, decks/observability-cost/gate-preview/slide-05.png, decks/observability-cost/gate-preview/slide-06.png, decks/observability-cost/contact-sheets/sheet-01.png
Slide fingerprints: slide-01.html: 363a9ad247ef3db855876c904bc940e9459349461b73901464dc69844383c4e3, slide-02.html: b303808fceeaea96183c8bf99125f9650faceacadf1056f95256c9eedaa5556f, slide-03.html: 5582ded43c13c6cd44f316bf83889d165680837280ffc805a8f25658d683d653, slide-04.html: cd525e4c0d029029eba5a5080f5df1a7e129e345188c769bfd90c2e4e4f85c8a, slide-05.html: 56e411dd5b0b4918c45fa00b2182d7bd41f7d0fb176b9600aec85a4bcc29aa63, slide-06.html: 2d8e4d93f2672b0ca13c66f09e701debc77f6a2282d263bf1bb190c8b21bee1f
Unresolved Critical: 0
Blocking findings: None

## Method
**All six sheets were opened individually as 1920×1080 images and looked at**, not skimmed
from a contact sheet — twice: once on the first render, and again after fixes. The
six-up contact sheet (`contact-sheets/sheet-01.png`) was then read a third time to judge the
deck as one object. Seven render-only defects were found this way and all seven were fixed;
they are listed in full in `slide-outline.md` under "what the render caught that `validate`
did not". `validate` reported **6/6 passing, 0 errors, 0 warnings** while five of them were
on screen. Box geometry quoted below was read out of headless Chromium against the built
files, not estimated. Confidence is High because every sheet was inspected at full
presentation resolution and every claim below names what was looked at.

## Checks

- [x] Composition & hierarchy: PASS — One job and one anchor per sheet.
  **01** the anchor is 56pt of Source Serif 4 over two lines occupying the top half; nothing
  else on the sheet competes, and the single terracotta rule points at the one supporting
  sentence. **02** the anchor is the terracotta bar and terracotta word over the *Logs*
  column — in the render your eye lands there before it reads the grid, which is the intent,
  since Logs is the deck's subject. **03** the anchor is the two facing panels, and the
  contrast between a column of `×` operators and a column with none carries the argument
  before a word is read. **04** the anchor is the two-row ledger with `WHAT IT KEEPS` against
  `WHAT IT SPENDS`; the terracotta-ruled line below it is the sting. **05** the anchor is the
  single wide `Observability` strip, deliberately one undivided block above three divided
  ones — the shape of the sheet *is* the argument about bundling. **06** the anchor is 44pt
  of display over three lines facing three numbered decisions. Reading order is unambiguous
  on every sheet (top-left kicker → heading → content → bottom-right caption), and the
  fixed furniture holds the same y on all six, which the contact sheet confirms at a glance.
  No sheet is a wall of undifferentiated text; the longest prose block in the deck is two
  lines.
- [x] Typography & legibility: PASS — Grepped every `font-size` in the deck: the complete
  set is 11, 12, 14, 16, 18, 20, 24, 26, 44, 56pt. **Nothing is below 11pt**, so the 10pt
  floor is cleared with a point to spare, and the smallest text in the deck (the 11pt kicker
  and source caption) is legible in the render at full size. That set is a real scale, not
  drift: 11 for labels/captions, 14 for secondary, 16 for body, 18/20/24/26 for headings,
  44/56 for display, applied consistently across sheets. The complete set of `line-height`
  values is **1.35, 1.4, 1.5** — `line-height: 1` appears nowhere, and no glyph is clipped
  (`validate` 0 errors after the serif leading was raised from the spec's 1.15 to 1.35;
  the first build clipped descenders on every serif heading at every size). Contrast at
  presentation distance: argument prose is `#1F1B16` on `#F7F4EE` at roughly 15:1;
  supporting text is `#7A7164` at 4.39:1 and is confined to labels, captions and
  qualifiers; the accent is 4.58:1 and is almost entirely rule rather than ink. Checked
  specifically for the "panel text painted the same colour as its surface" failure — the
  `#FCFAF5` panels on 03 and 05 carry `#1F1B16` and `#7A7164` text, both plainly readable
  against that surface in the render.
- [x] Korean/CJK word-break integrity: PASS — **This deck contains no Hangul and no CJK
  text of any kind**; it is English-only, which was verified by reading all six rendered
  images and by the absence of any CJK codepoint in the source. Pretendard was deleted from
  `assets/fonts/` after scaffolding for that reason, so there is also no tofu risk. Layer 1
  and Layer 2 are therefore vacuous here, and English wrap quality was assessed in their
  place — where the same failure mode does exist as runt lines. Two were found in the render
  and fixed: slide 05's first axis column broke as `Metrics, logs and traces have / different
  curves. Price them / apart.`, leaving `apart.` alone on line three, and slide 02's Metrics
  cost cell left `traffic` alone on line two. `text-wrap: balance` was applied to those two
  rules; in the current render all three columns on 05 break on sentence boundaries
  (`Metrics, logs and traces / have different curves. / Price them apart.`) and every cell on
  02 breaks evenly. No orphan or widow remains anywhere in the deck.
- [x] Review Litmus: PASS — Three to five seconds per sheet gets the point on all six:
  01 "logs cost the most, get read the least"; 02 "the three answer different questions";
  03 "one side multiplies, the other does not"; 04 "these are bets, and here is what each
  spends"; 05 "one line item, three ways to split it"; 06 "three decisions". Strip the
  decoration and the deck survives — the decoration is six hairlines, three no-fill circles
  and one terracotta rule, and every one of them is doing structural work rather than
  filling space. Lines that could be cut were cut: slide 04's closing was 172 characters and
  is now 118, which reads better, and slide 02's row label went from `COST GROWS WITH` to
  `GROWS WITH`. The one thing an audience will press on — "where are the numbers?" — is
  answered in the same place on every sheet rather than dodged.

## Findings

| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| 02 | The 3pt accent mark was applied to every grid cell, striping the Logs column with four terracotta bars instead of marking it once. Render-only; `validate` passed it. | Major | Mark moved to the signal-header row; all three headers reserve a transparent 3pt border, only the Logs colour changes | fixed, re-rendered |
| 02 | `GROWS WITH` wrapped in the 100pt row-label rail — the label needs 87.2pt and the rail's *available* width was 84pt after its own 16pt padding-right. Render-only. | Major | Rail widened to 112pt (96pt available); label verified one line in the render | fixed, re-rendered |
| 02 | Row labels sat ~11pt below the first line of the cells they label, because `.compare .col { padding: 0 16pt }` out-specified `.cell { padding-top: 11pt }` and zeroed the cells' top padding. Render-only. | Major | Shorthand split; row padding restated at matching specificity, labels +1pt to cap-align 11pt caps against 14pt prose | fixed, re-rendered |
| 03 | A ~70pt hollow band above the footer rule — panels sat at content height in a taller `main`. Render-only. | Major | `.panels{flex:1}`, `.panel` a flex column, `.factors` on `space-between`; filled by layout, no content invented | fixed, re-rendered |
| 04 | The closing callout ran to three lines and its descenders touched the footer hairline — zero clearance. Render-only. | Major | Copy cut 172 → 118 chars (two lines); `margin-top:auto` pins it to `main`'s bottom with the footer's 16pt margin as clearance | fixed, re-rendered |
| 06 | The 6pt accent rule was twice the height of the single line it ruled, because `padding-top` sat on the same element as the `border-left`. Render-only. | Minor | Padding removed; `margin-top:auto` alone does the spacing | fixed, re-rendered |
| 06 | The two columns ended at different heights with ~45pt of dead air under both. Render-only. | Minor | Both closing elements pinned with `margin-top:auto`; standfirst and terracotta line now share a bottom edge | fixed, re-rendered |
| 05, 02 | Runt lines: `apart.` alone on line 3 of the first axis column; `traffic` alone on line 2 of a slide-02 cell. | Minor | `text-wrap: balance` on both rules; verified in the re-render | fixed, re-rendered |
| all | Serif leading raised from the spec's 1.15 to 1.35 (the face clips below it), point sizes floored rather than scaled to 8.25/7.5pt, cover and closing display set above the scaled value. | Note | Deliberate deviations | recorded in design-debt.md §1–3 |
| all | Style chart tokens `#C8BFAD` / `#9B917F` and the 40pt `kpi` token left unused — there is no chart and no figure in this deck. | Note | Intentional; stated to the audience in the fixed source caption on all six sheets | recorded in design-debt.md §4 |
