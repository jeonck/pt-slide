# A backup you have never restored is not a backup — slide outline

## meta
- deck: decks/backup-restore
- mode: html
- style: ppt-heritage-luxury-deck (bundled). Picked directly — see "style choice".
- slide-size: 720pt × 405pt
- language: English
- audience: the engineering and business owners who publish a recovery commitment and the
  on-call people who would have to honour it
- tone: a position paper. It argues one claim and asks for three decisions. No selling.
- slides: 5 (cover · silent failures · production-shaped · corrected runbook · decisions)
- charts: **none.** See "no numbers" below.
- fonts: Playfair Display 400 (roman + italic) and EB Garamond 400/600 (+ italic), from
  npm `@fontsource/*`, embedded under `./assets/fonts/`. Pretendard and its licence were
  deleted after scaffolding — this deck has no Hangul, and four Pretendard weights are
  3MB of dead weight. No `http(s):` anywhere in the saved HTML.

## style choice
Three styles were on the shortlist: `ppt-heritage-luxury-deck`,
`ppt-altezza-ultramodern-keynote`, `ppt-cinematic-keynote-deck`. Picked heritage luxury.

Reasons, in order:

1. **The other two are specified around imagery this deck does not have.** Altezza's identity
   is a 12–18° clip-path mask over *a photograph or tone field*, and its Avoid list names
   "빈 단색 플레이스홀더 클립 면 금지" — empty flat placeholder clip surfaces are forbidden
   outright. Cinematic requires "single key visual, 50–70% of canvas" on most sheets. With no
   images available, both would have to be broken at the point where they are most themselves.
   Heritage luxury asks for a centred axis, gold hairlines and big serif type — all of which
   type and colour blocking can carry honestly.
2. **The topic is a claim-versus-evidence argument, and this style is built out of ceremony.**
   A hairline rule and a centred Didone line read as something being *entered into a record*.
   The closing decision — who signs that the published numbers are the measured ones — lands
   harder on a sheet that already looks like a document that gets signed.
3. **It is unoccupied and tonally distinct.** The repo's existing decks are navy policy,
   blueprint dark, consulting grid, ghost white, archival index, monochrome risk, dark tech,
   block infographic, precision fintech and Swiss editorial. Sepia-and-gold sits apart from
   every one of them.

If the champagne-and-gold register reads as too soft for an operational argument, switching
style is a re-run, not a rewrite.

## no numbers — recorded decision
RPO and RTO are the *subject* of this deck, which is exactly why it prints no hours, no
percentages, no durations and no charts. The argument is that those two figures are a
commitment whose value the audience must set and then verify; asserting example figures here
would demonstrate the failure the deck is warning about. So:

- No target hours, no recovery percentages, no drill frequencies, no data volumes.
- No charts. Nothing that resembles a stat strip.
- RPO and RTO appear only as names of a commitment the audience owns.

The style makes a **source caption** mandatory (`slide.source_caption: fixed bottom-right
italic`). With nothing to cite, that fixed slot carries the fact instead of a citation, on
all five sheets, verbatim and identical:

> *No RPO or RTO figures are asserted in this deck — those numbers are yours to set and to measure.*

## design tokens (from `slides-grab show-design ppt-heritage-luxury-deck`)
- bg `#EDE6D6` · surface `#F4EFE3` · text `#3A2E1F` · text-muted `#8A7C63`
- accent = border = gold `#A8893E`, used **only** as 0.75pt (1px) hairline and node border —
  never as a large fill, never as body colour (spec Avoid).
- radius 0 · shadow none · gradient none · centre axis, generous side whitespace
- kicker rule 0.6in centred → 34pt at this canvas scale
- display/heading = Playfair Display (Didone serif); body = EB Garamond (humanist serif).
  Two faces total, one accent, one background + one surface.

### palette extension, recorded
`#6B5D46` — one tone, added for secondary text (sub-lines under the process nodes, the
decision sub-lines, the source caption). It sits **between** the spec's `text #3A2E1F` and
`text-muted #8A7C63`, on the same hue.

Why: the spec's muted `#8A7C63` measures **3.28:1** against bg `#EDE6D6` — under the 4:1 the
skill sets for secondary text, and visibly weak at 10–12pt from presenting distance.
`#6B5D46` measures **5.15:1**. `#8A7C63` is still used, unchanged, for the one place it works:
nothing at type sizes below 14pt. Also mirrored into `design-debt.md`.

### budgets, computed before any slide was written
Common frame on every sheet: body padding 32pt top / 26pt bottom / 62pt sides.
Content width = 720 − 124 = **596pt**.

```
vertical    405
            − padding 32 + 26                        = 347
            − source caption 10×1.5 = 15, margin 14  = 318
            → main = 318pt   (fixed furniture = the bottom-right source caption)

            slide-02 spend: kicker 24.5 + title 32.5 + rule 27 + 2×80.5 grid + 18 gap
                            + closing 38  = 301  ≤ 318
            slide-05 spend: header 74 + 3×69 rows + 2×14 gaps = 309 ≤ 318
```

**Horizontal budget was measured, not estimated** — `_measure-backup.mjs` (Playwright, per the
skill's "재는 법"), run from the repo root against the actual strings, on a probe page carrying
the real `@font-face` rules. Coefficients that came back:

| face / size | string | coef |
|---|---|---|
| Playfair Display 400 40pt | `A backup you have never` | 0.487 |
| Playfair Display 400 26pt | `What a backup fails at, silently` | 0.428 |
| Playfair Display 400 26pt | `The drill’s product is a corrected runbook` | 0.450 |
| Playfair Display 400 16pt | `Media nobody has read back` | 0.494 |
| EB Garamond 400 14pt | `The job reported success; the bytes were …` | 0.374 |
| EB Garamond italic 10pt | the source caption, full string | 0.392 |
| **EB Garamond 600 11pt, 0.18em caps** | `A SAMPLE RESTORE` | **0.768** |
| **EB Garamond 600 11pt, 0.18em caps** | `A PRODUCTION-SHAPED RESTORE` | **0.796** |
| **EB Garamond 600 14pt, 0.10em caps** | `CORRECT` | **0.804** |

The all-caps tracked labels run **more than twice as wide per character** as the same family's
prose. Budgets used, with headroom:

- Playfair headings, 596pt at 26pt → 596 ÷ (26 × 0.50) = **45 chars**; written to ≤ 44.
- Cover title, 596pt at 44pt → **27 chars per line**; written to 23 and 25, broken by hand.
- EB Garamond body, 14pt: 596 → 106 chars; in a 252pt grid cell → **45 chars**, written to ≤ 40
  so every cell body is one line.
- **All-caps kickers use 0.80, not 0.48.** `A PRODUCTION-SHAPED RESTORE` needs **236.5pt**. On the
  first column geometry (30pt inner gutters either side of the divider, 242pt of usable column)
  that left 2% headroom — unusable. The columns were widened to **267.8pt**, re-measured, and the
  string now sits at 88% of its line with 31pt spare, verified one line in the render. At the
  0.48 prose coefficient the same string budgets to 128pt and would have looked comfortable in a
  242pt column while actually needing 237pt — it would have wrapped, dropping the right column's
  34pt rule below the left's and breaking the only alignment this sheet has.

### deviations from the spec, recorded
1. **Type sizes are not the spec's absolute points.** The spec targets 13.33 × 7.5in (960 × 540pt);
   this canvas is 10 × 5.625in. At 0.75 scale the spec's 17pt body → 12.75pt and its 10pt caption
   → 7.5pt, both under the framework's 14pt body / 10pt absolute floors. So: body **14pt**,
   sub-lines 12pt, kickers and captions **10–11pt** (never below 10). Display is scaled *down*
   instead: 52pt display → **44pt** on the cover, 34pt heading → **26pt**. A 405pt-tall canvas
   cannot take a 52pt Didone headline plus a rule plus a subtitle without the sheet going airless.
2. **Margins are tightened.** The spec's 1.2in × 0.9in margins scale to 65 × 49pt, which leaves
   307pt of height; 32/26/62 keeps the wide side whitespace the style needs while giving the
   content room. Side whitespace (62pt) is still the larger of the two, as the style requires.
3. **`line-height: 1.12` for display is raised to 1.25.** The spec's leading clips Playfair's
   descenders in this renderer; the skill's floor for a display serif is 1.3, relaxed to 1.25 at
   44pt where the cover title has two hand-broken lines. `line-height: 1` appears nowhere.
4. **The mandatory source caption carries a statement, not a citation** — see "no numbers".
5. **The step badge is 22pt, not the spec's 0.36in (19pt at this scale), with a 12pt numeral at
   `line-height: 1.4`.** 19pt with a 16pt numeral clips, which is a failure the skill records
   by name. It is a circle, as `diagram.step_badge` requires; every panel corner stays at 0.
6. **slide-05's decision separator is a gold lozenge, extending the spec's `gold ◆` out of its
   comparison-diagram context.** Reusing the 34pt hairline there made the header rule and the item
   separators identical and the sheet lost its header/body distinction — a render-only defect.
7. **The SVG connectors carry no `xmlns`.** The HTML parser puts inline `<svg>` in the SVG
   namespace on its own, and the attribute was the only `http:` string left in the saved HTML.

## visual thesis
A sheet that looks like it is about to be signed. Champagne paper, sepia ink, one gold
hairline per sheet holding the centre axis. Nothing is boxed unless it earns a box; nothing is
coloured except a rule. The drama comes from a very large serif line sitting alone in a lot of
space — which is also the argument: the claim is short, and everything under it is the work of
proving it.

## content plan
the claim → what fails silently under it → why the drill needs real shape → what the drill is
actually for → the three things we have to decide

---

## slide-01 — cover
- Layout: centre axis. Kicker · rule · 44pt two-line title · gold rule · italic thesis ·
  presenter placeholder. Vertically centred with the caption fixed bottom-right.
- Kicker: `RESTORE DRILL · A POSITION PAPER`
- Title: "A backup you have never / restored is not a backup." (hand-broken)
- Thesis: "RPO and RTO written into a document are a claim. A restore drill is the only
  evidence — and the gap between the two is where recovery plans die."
- Presenter: `PRESENTER · TEAM` placeholder. No name is invented.
- Intent: the whole argument on one sheet, so the rest is elaboration.

## slide-02 — What a backup fails at, silently
- Layout: 2 × 2 cells divided by a gold hairline cross (spec's matrix language). Every cell
  carries the same transparent borders so no cell is pushed off the grid; only the colour
  differs — the skill's "emphasise all, vary the value" rule.
- Cells (Playfair 16pt heading + one 14pt line each, ≤ 40 chars so nothing wraps):
  - **Media nobody has read back** — The job succeeded. The bytes never did.
  - **A schema left out of the dump** — Rows come back. The database does not.
  - **A dependency that is down too** — The restore needs what the outage took.
  - **Credentials nobody on shift has** — The path exists. Nobody can walk it.
- Closing italic line: "None of these announce themselves. All of them wait."
- Intent: "backup succeeded" is a statement about a job, not about a recovery.

## slide-03 — A drill proves nothing against a toy dataset
- Layout: 2 columns, centre-symmetric, divided by a full-height 0.75pt gold vertical hairline.
  Each column: kicker + 34pt centred gold rule + two short paragraphs. Spec's comparison
  diagram exactly; no column fill. The block is auto-height and vertically centred inside `main`
  so the shorter left column does not open a dead zone at the foot of the sheet.
- Sheet kicker: `THE SHAPE OF THE DATA` (the column kickers carry "production-shaped").
- Left, kicker `A SAMPLE RESTORE`: "It proves the command exists." / "It proves someone on the
  team can type it."
- Right, kicker `A PRODUCTION-SHAPED RESTORE`: "It proves the volume moves in the time you promised." /
  "It proves the schema, the permissions and the dependencies come back with it."
- Closing italic: "Everything that breaks at real size is invisible at sample size."
- Intent: the drill's realism is the whole of its evidential value.

## slide-04 — The drill's product is a corrected runbook
- Layout: 4 horizontal hairline nodes (spec caps process at 4), gold hairline connectors with
  thin V arrowheads between them, badge + all-caps label + 12pt sub inside each. Nodes are a
  fixed height so an uneven sub cannot shift one node against its siblings.
- `I DECLARE` — The restore you claim you can do.
- `II RUN` — Timed, by the shift that would really do it.
- `III RECORD` — What the runbook said, and what happened.
- `IV CORRECT` — Edit the runbook before the drill is closed. *(active step: gold border)*
- Closing italic: "A drill that ends in a pass has thrown away its only output."
- Intent: reframes the drill from an exam into a maintenance job on the runbook.

## slide-05 — What we need to decide
- Layout: three stacked centred decisions, each a Roman numeral kicker + 19pt Playfair
  question + 12pt italic sub, separated by short centred gold rules.
- `I` Does the drill go on the calendar? — A date and an owner, or it stays an intention.
- `II` What stops while the drill runs? — Name the service that goes quiet, and who is told
  before it does.
- `III` Who signs the numbers we publish? — The signature belongs to whoever watched them
  measured.
- Intent: leaves the room with three answerable questions, not a summary.
