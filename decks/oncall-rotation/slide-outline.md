# On-call rotations people can survive — slide outline

## meta
- deck: decks/oncall-rotation
- mode: html
- style: `ppt-warm-minimal-diagram-deck` (bundled). **Picked directly** — see "style choice".
- slide-size: 720pt × 405pt
- language: English (en)
- audience: engineering leadership and the team that carries the pager — people who can
  change headcount, alert ownership and compensation, not just the schedule
- tone: plain, structural, unsentimental. The deck argues a staffing case, so it never
  appeals to resilience or goodwill
- slides: 5 (cover · levers · handover · page ceiling · decisions)
- charts: **none.** See "no numbers" below.
- fonts: Work Sans 300/400/500/600 woff2, local (`./assets/fonts/`), from
  `@fontsource/work-sans`. Pretendard was deleted — this deck has no Korean text, and
  4 Pretendard faces are ~3.1MB of dead weight against 82KB of Work Sans.

## style choice
Three styles were on the shortlist: `ppt-warm-minimal-diagram-deck`,
`ppt-soft-pastel-system-deck`, `ppt-kula-minimalist-keynote`.

Picked **`ppt-warm-minimal-diagram-deck`**, for three reasons:

1. **The argument is mechanism, and this style's whole identity is a line-diagram kit.**
   Every node is a 1pt outline, connectors are thin curves with small arrowheads, emphasis is
   one terracotta element. That is exactly the vocabulary for "a page fires → the ceiling is
   hit → the alert gets an owner" — a causal chain that needs shape, not measurement.
2. **It has a mandatory caption slot and no mandatory data slot.** The style's grid fixes a
   1pt `#D6CCB8` bottom rule plus an 11pt caption on every sheet. With no sourceable figures,
   that slot carries the disclosure instead of a citation — an honest use of the furniture
   rather than an empty one. Its chart spec is elaborate but entirely optional.
3. **Warm sand reads humane without reading soft.** The deck's subject is people being woken
   at night; a warm ivory canvas with ink-brown text suits it. `ppt-soft-pastel-system-deck`
   was the runner-up and was rejected because plump pastel nodes undercut a staffing argument
   that has to land as a budget request, and because it carries three accent colours where
   this deck needs one point of emphasis per sheet.
   `ppt-kula-minimalist-keynote` was rejected outright: its Avoid list forbids empty
   placeholder frames and requires real photographs, duotone fields, charts or diagrams inside
   its rounded image frames. With no images and no data, its gallery grid could only be filled
   dishonestly or left as the blank sand blocks it explicitly bans.

No other deck in this repo uses any of the three.

## no numbers — recorded decision
This repo cannot source data, and this topic tempts fabrication badly: shift hours, pages per
night, roster sizes, hand-off durations, on-call pay multiples, burnout rates. Every one of
those would be invented here, and an invented number in a staffing argument is worse than no
number — it is the thing the audience would take away.

So: **no charts, no percentages, no durations, no benchmarks, no headcount figures.** The
levers are named but never priced. Where the argument needs a threshold it names the threshold
as a decision the room has to make ("what is the minimum roster") rather than asserting a value.

The fact is stated on every sheet in the style's mandatory 11pt source-caption slot:
`No sourced figures: shift hours, page rates and roster sizes are unsourced.`
Dropping the caption would break the style's grid; filling it with a citation we do not have
would be a lie. This is the honest third option.

Speaker is a placeholder — `Presenter · Team`. No name is invented.

## design tokens (quoted from `show-design ppt-warm-minimal-diagram-deck`)
- bg `#F2EBDF` · surface `#FBF7EF` · text `#3D3528` · text muted `#8A8170`
- accent (terracotta) `#C2693F` · border `#3D3528` · rule light `#D6CCB8`
- display Work Sans 30pt/500, tracking −0.01em · kicker 12pt/600, tracking 0.08em
- body Work Sans 18pt/400, leading 1.5 · caption 11pt/500 · node_number 16pt/500
- margins: spec 1.0in × 0.8in on a 13.33in canvas → ×0.75 for this 720pt canvas → **56pt × 40pt**
- grid furniture: header (kicker left / counter right) + `main` + 1pt `#D6CCB8` rule + 11pt caption
- **no palette extension was needed.** Every colour on every sheet is one of the seven tokens above.

## height budget (computed before the first slide was written)
```
405                     canvas height
 − 40 − 40              body padding top + bottom
 = 325
 − 16.8                 header: kicker 12pt × 1.4
 − 14                   main margin-top
 − 37.4                 footer: 14 margin + 1pt rule + 7 margin + caption 11pt × 1.4
 = 256.8pt              <- what `main` actually has on a body sheet
```
Every body sheet was laid out against 256pt. The per-sheet arithmetic is in the notes below.
`main` is `flex:1; min-height:0` and the footer is its sibling, so the bottom rule sits at the
same y on all five sheets no matter what the content does.

## width budget — measured, not estimated
Measured with `_measure-oncall.mjs` (Playwright, real Work Sans faces, real strings, px→pt
÷ 4/3), deleted after use.

**The first measuring run was wrong and the renders caught it.** The script built its probe page
with `page.setContent()`, whose document origin is `about:blank`, so the `file://` `@font-face`
URLs never loaded and every width came back for Chromium's fallback face — 8–15% narrow.
Four strings that the script called safe wrapped in the real render. The fix was to write a
probe HTML file and `goto('file://…')` it, plus a `document.fonts.check()` guard that throws
rather than reporting numbers for a fallback. **A measurement script that cannot prove the face
loaded is an estimate wearing a lab coat.**

The coefficients from the corrected run:

| kind | string | size/weight | coef |
|---|---|---|---|
| display prose | `On-call rotations` | 42pt/500 | 0.482 |
| display prose | `people can survive` | 42pt/500 | 0.500 |
| section title | `A rota is a staffing decision` | 30pt/500 | 0.453 |
| section title | `What we need to decide` | 30pt/500 | 0.530 |
| body prose | `A limit the rota may not exceed.` | 14pt/400 | 0.497 |
| body prose | `Who has been woken, and how often` | 14pt/400 | 0.558 |
| **all-caps label** | `WHY IT CANNOT WAIT` (0.08em) | 12pt/600 | **0.691** |
| **all-caps label** | `THE PAYLOAD` (0.08em) | 12pt/600 | **0.711** |

Two things this changed:

- **Mixed-case Work Sans prose ranges 0.45–0.56 within one weight** — a 24% spread on the same
  face at the same size. Titles were budgeted at the worst measured value (0.530), not the
  average: 608pt ÷ (30 × 0.530) ≈ 38 characters. All four body titles are ≤ 35 characters and
  were confirmed one line by measurement *and* by looking at the render, so the h2 block is the
  same height on every sheet and content starts at the same y.
- **All-caps kickers and column heads run 0.69–0.71 — about 35% wider than the prose at the
  same size.** Every uppercase label was measured separately; none was budgeted with a prose
  coefficient.

Strings that failed measurement and were rewritten rather than shrunk:

| string | needed | had | replaced with |
|---|---|---|---|
| cover title on one line | 683.5pt | 608pt | broken with `<br>` at a chosen phrase boundary |
| `The ceiling is breached` (15pt node) | 154.3pt | 153pt | `The ceiling is hit` |
| `The alert gets an owner` (15pt node) | 157.6pt | 153pt | `An owner, and a date` |
| `How long one person stays reachable.` (14pt) | 264.8pt | 262pt | `How long one person is reachable.` |
| `Encouragement moves none of them. A rota too thin cannot be talked into working.` (16pt) | 655.5pt | 608pt | `Encouragement moves none of them. Only the roster does.` |
| `The person leaving the shift` (18pt) | 249.8pt | 244pt | column rebalanced 315/244 → 300/259 |
| `Below the floor, something is given up whether we pick it or not.` (20pt) | 630pt | 608pt | `Below the floor, something is given up — chosen or not.` |

## visual thesis
A warm ivory sheet, mostly empty, with one thin ink-brown line drawing carrying the argument
and exactly one terracotta element per sheet marking where the reader should look. Nothing is
filled in; nothing is charted. The deck should look like a design document, not a morale
poster — because the claim is that morale is not the variable.

## content plan
cover (the thesis in one line) → the four levers are structural → the handover is a transfer of
state that only the outgoing person holds → a night-page ceiling is an upstream instrument →
the two decisions the room owes an answer to.

---

## slide-01 — On-call rotations people can survive
- layout: divider/cover pattern. Left: 12pt terracotta kicker, 42pt display title broken over
  two lines at a chosen phrase boundary, 1pt `#D6CCB8` rule, 18pt subtitle, presenter
  placeholder. Right: the visual anchor — a 1pt ink circle with one terracotta 1.5pt arc and
  two hollow handover markers, captioned `One shift. Two handovers.`
- key message: rotation design is a staffing problem, not a goodwill problem.
- intent: state the thesis before any evidence, and set the visual grammar — thin ink line,
  one terracotta emphasis, over half the sheet empty. The ring deliberately shows **no
  countable people**: any number of markers on it would assert a roster size we cannot source.
- height: title 2 × 52.5 + rule + subtitle 27 + presenter 17 ≈ 165 of 256.

## slide-02 — A rota is a staffing decision
- layout: full-width h2, then a 2×2 grid of 1pt outline nodes (radius 12px, no fill), each with
  a terracotta circle badge and a white digit, an 16pt lever name and a one-line 14pt gloss.
  Closed by a 1pt terracotta rule and the claim.
- key message: shift length, handover, compensation and a ceiling on night pages are the levers;
  encouragement moves none of them.
- intent: name all four levers once, at the top of the deck, so the two sheets that follow can
  each go deep on one without the audience losing the frame. **Nothing here is priced.** Each
  gloss says what the lever *is*, never what it should be set to.
- height: h2 46 + grid 161 (two 72.5pt rows) + claim block 49 = 256. Glosses are capped at
  40 characters so every card stays exactly two lines — measured, not guessed.

## slide-03 — What a handover has to carry
- layout: full-width h2, then two columns split by a full-height 1pt `#D6CCB8` hairline —
  the style's comparison vocabulary. Left (300pt): `THE PAYLOAD`, five rows separated by
  hairlines. Right (259pt): `WHY IT CANNOT WAIT`, an 18pt terracotta statement, then two
  short paragraphs.
- key message: a handover transfers state, not status — and the person leaving the shift is
  the only one holding most of that state.
- intent: the payload list makes the handover concrete enough to schedule; the right column
  gives the reason it cannot be delegated to a dashboard or written after the fact. The
  hairline runs the full height so the two columns read as one comparison, not two lists.
- height: h2 48 + columns 208. Left 192, right 197 — both inside 208, confirmed in the render.

## slide-04 — What a page ceiling forces upstream
- layout: full-width h2, one 16pt lead line, then a three-node horizontal process flow —
  1pt outline round-rect nodes, terracotta circle step badges above the labels, 1pt curved
  bezier connectors with thin arrowheads (inline SVG, text stays in HTML). Below, three
  consequences separated by hairlines.
- key message: a ceiling does not reduce pages; it converts them into work someone has to
  schedule, which is what forces the fix upstream.
- intent: this is the sheet that answers "so what does a limit actually do". The flow shows
  the mechanism — the breach has to land on an owner or the ceiling is decoration. **The
  ceiling's value is never stated**; naming a number here is the single most tempting
  fabrication in the deck.
- height: h2 46 + lead 38 + flow 82 + consequences 87 = 253 of 256.

## slide-05 — What we need to decide
- layout: full-width h2, two 1pt outline decision cards, then a 1pt terracotta rule and a
  20pt closing line as the visual anchor.
- key message: (1) what is the minimum roster, (2) what we give up when we are below it.
- intent: the closing sheet asks for a decision, not agreement. The second question is the
  one that usually goes unasked — below the floor a lever gets dropped whether or not anyone
  chose it, so the ask is to choose it in advance and write it down.
- height: h2 48 + cards 155 + closing 53 = 256.

## carried over to design-debt.md
- terracotta `#C2693F` on sand measures ≈ 3.3:1 — fine for the rules, badges and 18pt+ text it
  is used for, marginal for the 12pt column heads the style spec mandates. Kept per spec, logged.
- step badges sit inside the node outline rather than overhanging its corner.
