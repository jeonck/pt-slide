# Why staging lies — slide outline

## meta
- deck: `decks/staging-parity`
- mode: html
- style: `ppt-engineered-dark-deck` (bundled) — **chosen from a three-way shortlist**, see
  "style choice" below.
- slide-size: 720pt × 405pt
- language: English
- slides: 5 (cover · the premise · the four gaps · the fork · what we need to decide)
- audience: the engineers and the manager who sign off on releases because staging went green.
- tone: mechanism, not blame. Nobody built staging wrong; a model is a model.
- charts: **none.** See "no figures, and why".
- fonts: **Inter** 400/500/600 and **JetBrains Mono** 400, embedded locally under
  `./assets/fonts/` from `@fontsource/inter` and `@fontsource/jetbrains-mono`. The four
  Pretendard faces the scaffolder installs were deleted by hand — this deck has no Hangul
  and they are ~3MB of dead weight. No `http(s):` URL appears in any saved slide.
- presenter: placeholder `Presenter · Team`. No name is invented.

## style choice

Shortlist of three: `ppt-isometric-platform-deck`, `ppt-engineered-dark-deck`,
`ppt-bauhaus-geometric`. Picked **`ppt-engineered-dark-deck`**, for three reasons:

1. **It has the source-caption slot this deck needs.** Its layout spec fixes a
   `source_caption` bottom-right on every sheet. This deck has nothing to cite, and the
   brief says the caption must carry that fact instead. The other two shortlisted styles
   have no such slot, so the disclosure would have had to be smuggled in somewhere.
2. **Its vocabulary is the argument's vocabulary.** Hairline-bordered, unfilled boxes,
   mono step numbers, a single accent, at most six lines of prose per sheet. The claim here
   is a chain of reasoning about environments, not a picture of one.
   `ppt-isometric-platform-deck` mandates an isometric 3D stage in the bottom half of every
   slide with text confined to the top zone — five hand-built isometric stages carrying no
   data would be decoration standing in for evidence, and its 24pt body in a half-height
   text zone cannot hold four gaps and their consequences.
   `ppt-bauhaus-geometric` is primary-colour, heavy-display and deliberately playful; it is
   the wrong register for a sheet that ends with "this is why you got paged".
3. Register. A dark, low-glare deck is what this gets presented in — an internal engineering
   review, often on a projector, often after an incident.

Overlap noted, not hidden: `decks/incident-response` already uses `ppt-dark-tech`, also a
dark style. They are distinguishable — Space Grotesk with teal + violet there, Inter with a
single violet here — but this deck is the second dark one in the repo. The shortlist did not
contain a light alternative that fit.

## no figures, and why

There is no chart, no percentage, no duration and no benchmark anywhere in this deck, and
that is a decision, not an omission. Every number this topic invites — how many incidents
trace to a staging/production difference, how much a parity environment costs, how long a
canary needs to run — is a number this repo cannot source. Inventing one would be Critical
under the gate's content-discipline check, and it would also be the weakest part of the
argument. The thesis is **mechanical**: staging is a model, the tests measure the model, and
a difference between model and original is untested surface by construction. That is true at
any magnitude, so it needs no magnitude.

The style's mandatory bottom-right `source_caption` slot therefore carries the disclosure
rather than a citation, identically on all five sheets:

> No figures in this deck — the argument is mechanical, and no gap here can be sized from a
> source we can cite.

## contract (from `npx slides-grab show-design ppt-engineered-dark-deck`)
- bg `#0E0E11` · surface `#16161A` · surface bar `#2E2E36` · border `#26262C`
- text `#9CA3AF` · text strong `#F4F4F5` · text muted `#6B7280`
- accent `#8B7BF0` (the only accent) · accent teal `#3FB8C4` — charts only, **not used here**
- display Inter 50pt w600 −0.02em · title Inter 30pt w600 −0.015em · kicker Inter 11pt w500
  +0.08em · body Inter 17pt w400 leading 1.5 · card_header Inter 14pt w600 ·
  mono JetBrains Mono 12pt · caption Inter 10pt
- spacing unit 8 · margin_x 0.8in · margin_y 0.65in · gutter 0.16in · 12 columns
- header_band 0.65–1.8in · source_caption fixed bottom-right · centered axis
- radius 6px · border 1px solid `#26262C` · shadow **none** · glow: radial, **1 per slide**
- diagram: 6px-radius nodes, no fill, 1px hairline border, 1.25pt accent connectors,
  mono `01`/`02` step numbers, one highlighted border per diagram
- **Avoid:** a second accent · light mode or white cards · more than one glow, or a glow
  shaped into an object · shadows, texture, noise · amateur charts · centring the body text
  lines themselves · emoji and filled icons · more than six lines of prose on a sheet

## geometry — computed before the first slide was written

Canvas 720 × 405pt. Spec margins scaled by 0.75 (960×540 → 720×405) and rounded to the
8pt unit: `padding: 32pt 40pt`. Content box **640 × 341pt**.

### vertical budget

```
341  content height
− 15.4  kicker row      (11pt × 1.4)
− 10    h2 margin-top
− 28.75 h2              (23pt × 1.25)
− 18    main margin-top
− 10    footer margin-top
− 14    source caption  (10pt × 1.4)
= 244.85pt   ← what main actually has
```

Per sheet, blocks summed against that ceiling before writing:

| sheet | blocks | total | slack |
|---|---|---|---|
| 02 | flow nodes 136.5 + 16 + callout 83 | 235.5 | 9.4 |
| 03 | 2 rows of minmax(0,1fr); card content 101.2 in a 117.4 track | 234.8 | 32.4 inside cards |
| 04 | columns 175.6 + 12 + strip 49.5 | 237.1 | 7.8 |
| 05 | decisions 143.7 + gaps + 12 + strip 49.5 | 205.2 | 39.6 (spread by `space-between`) |

`main` is `flex:1; min-height:0`, and the kicker row, h2 and footer are its siblings — so the
source caption sits at the same y on all five sheets regardless of what main contains.

### horizontal budget — measured, not estimated

Measured with a Playwright probe (`_measure-staging.mjs`, deleted after use) against the
real embedded Inter/JetBrains Mono faces and the exact strings on the slides. Two populations,
measured separately, because the spread is what breaks decks:

| population | face / size | coefficient (measured) |
|---|---|---|
| mixed-case prose and titles | Inter 400–600, 14–44pt | **0.422 – 0.542** |
| all-caps kickers, +0.08em tracking | Inter 500, 11pt | **0.676 – 0.712** |
| mono counters and step numbers | JetBrains Mono 400, 11pt | **0.602** |

The caps kickers run ~45% wider per character than the prose at the same size. Using the prose
coefficient for them would have been a 45% underestimate; the kicker row is the only place in
this deck where a wrap would push the h2 — and therefore every sheet's furniture — down.

Lines forced to one line, with measured width vs. available:

| line | needs | avail |
|---|---|---|
| `Two honest options, and one we keep choosing` (widest h2, 23pt) | 505.6pt | 640pt |
| `WHAT A GREEN RUN NEVER TOUCHED` (widest kicker) | 233.9pt | 564pt |
| `Mocked dependencies` (widest card header, 14pt) | 149.3pt | 254pt |
| `Boot and wiring proved, nothing more` (widest column item, 14pt) | 232.6pt | 276pt |
| `What does a staging pass stop meaning?` (widest question, 16pt) | 314.6pt | 606pt |
| source caption (10pt, all sheets) | 492.9pt | 640pt |

Lines allowed to wrap, budgeted to an exact line count: cover lede 2 lines (872.4pt into a
520pt column), slide-02 node bodies 3 lines (max 346.9pt into 162pt), slide-03 card bodies
2 lines (max 458.6pt into 287pt), slide-02 callout 2 lines (925.7pt into 608pt).

## sheets

### slide-01 — cover
- layout: accent rule, `h1` `Why staging lies` (44pt, one line, measured 333pt), a two-line
  lede at 520pt, mono presenter placeholder. Vertically centred block, lines left-aligned
  (the style's Avoid list forbids centring the lines themselves).
- message: the title is the claim. The lede names the mechanism so the room knows this is
  not a complaint about test coverage.
- anchor: the 44pt display line plus the accent rule and the corner wash.

### slide-02 — the premise
- kicker `THE PREMISE`. Title: **A green run is evidence about staging**.
- layout: the style's horizontal 3-step process diagram — three unfilled hairline nodes,
  1.25pt accent connectors with arrowheads, mono `01/02/03` step numbers. Step 03 is the
  highlighted node (accent border colour), because step 03 is where the error enters.
- content: 01 build a model → 02 test the model → 03 claim the original.
- callout: the run is a true statement about staging; it turns false when read as a statement
  about production. This is the whole deck in one sentence, stated early on purpose.

### slide-03 — the four gaps
- kicker `WHAT A GREEN RUN NEVER TOUCHED`. Title: **Four gaps, and what each one hides**.
- layout: 2×2 hairline cards, `minmax(0,1fr)` rows, mono `01`–`04`, card header = the gap,
  body = what it hides. Two lines of body per card, budget-checked.
- the four: **data** (fixtures are small, clean and recent), **traffic shape** (serial vs.
  concurrent and out of order), **mocked dependencies** (a mock returns what you expected),
  **scale and topology** (a single node cannot show what happens between nodes).
- no emphasis on any single card: all four are equally the argument, and marking one would
  shift only that card's content by the border delta.

### slide-04 — the fork
- kicker `THE FORK`. Title: **Two honest options, and one we keep choosing**.
- layout: two hairline columns of equal treatment. Header = the option, sub-line = the price
  (the price is the point, so it is second, not last), hairline, three one-line items.
  - **Close the gap.** Price: a second production, funded and staffed. Production-shaped data;
    real dependencies instead of mocks; load and topology that match.
  - **Shrink staging.** Price: production tooling we do not have yet. Staging proves boot and
    wiring only; correctness moves behind flags; canaries and fast rollback carry the risk.
- accent strip below both: both are honest, keeping the gap and keeping the claim is not.
- deliberate deviation: the style's comparison pattern marks a recommended column. Neither
  column is marked, because the decision belongs to the room and slide 05 asks for it.

### slide-05 — what we need to decide
- kicker `DECISIONS`. Title: **What we need to decide**.
- layout: three decisions on a mono number rail, `space-between` so the extra 39pt of budget
  becomes even rhythm rather than a hole above the closing strip.
  - 01 Which gaps do we close? — name them, price them, give each an owner and a date.
  - 02 Which gaps do we admit to? — write them down as known-untested surface.
  - 03 What does a staging pass stop meaning? — agree the sentence we say instead.
- closing accent strip: until we decide, a staging pass means one thing — the code ran
  somewhere. This is the sheet's anchor and the last line of the talk.

## deviations from the style spec
Recorded here and in `design-debt.md`; repeated in the Pass A report.

1. **The glow is a flat fill.** The spec's signature is one radial glow per sheet
   (`#8B7BF0 → #3FB8C4`). The repo forbids gradients outright. Per the skill's rule, the
   first stop is used as a flat fill: one quarter-disc corner wash of `rgba(139,123,240,0.12)`
   per sheet, cropped by the slide corner so it never reads as a sphere. One per sheet, as
   the spec requires. It stays clear of `#6B7280` muted text, which is the only ink that
   would lose contrast against it.
2. **Type sizes are not uniformly scaled to the 0.75 canvas.** The spec targets 960×540pt.
   Scaling its 17pt body by 0.75 gives 12.75pt and its 10pt caption gives 7.5pt, both under
   the repo's floors. Display, title and kicker are scaled (50→44 on the cover, 30→23,
   11 held); body, card header, mono and caption are held at or above spec size so nothing
   falls below 14pt body / 10pt absolute. The caption sits exactly on the 10pt floor.
3. **Uniform 1px borders; emphasis by colour only.** The spec highlights an active node or a
   recommended column with a 1.5px border. Changing one sibling's border width shifts that
   sibling's content by the delta and breaks the column alignment the style is made of, so
   every node and column keeps `1px solid #26262C` and the highlighted one changes only
   `border-color` to `#8B7BF0`.
4. **No recommended column on slide 04.** See the sheet note above.
5. **Accent teal `#3FB8C4` is unused.** The spec permits it for chart series only, and there
   are no charts. One accent, as the Avoid list requires.

No colour outside the spec's token list appears anywhere in the deck; the wash is the accent
token at 12% alpha over the bg token.
