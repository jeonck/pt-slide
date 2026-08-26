# Model Registry — operating guide · slide outline

## meta
- deck: decks/model-registry
- mode: html
- style: ppt-archival-index-deck (bundled). Picked directly — see "style choice".
- slide-size: 720pt × 405pt
- language: English
- audience: the ML platform team that runs the registry, and the model owners who have to
  live by its rules
- tone: an operating guide, not a pitch. Every rule states what breaks without it.
- slides: 5 (cover · what it records · promotion ledger · operating rules · discussion)
- charts: none. Registry adoption numbers, promotion counts and audit findings are all
  unsourceable here. The style makes a figure number and source footnote mandatory *for
  charts* — with no chart, the footnote carries the sheet identity instead.
- fonts: Source Serif 4 400/600 and IBM Plex Mono 400/500, embedded under `./assets/fonts/`.
  Pretendard removed — no Hangul.

## style choice
Picked without asking, per the skill. A registry is an index, and this style is a library
catalogue: everything carries a monospace index code, rule lines carry the order, and there is
no accent colour at all. It also sits apart from the four decks already in the repo — policy
navy, blueprint dark, consulting grid, ghost white. If the paper-catalogue look is wrong,
switching is a re-run.

## design tokens (from `slides-grab show-design ppt-archival-index-deck`)
- bg `#EFE9DD` · surface `#F6F2E8` · surface alt `#FBF8F0` · text `#33302A` · muted `#7A7468`
- index number `#5A5448` · border `#C9C0AC` · rule strong `#9A9180`
- **No accent colour exists in this spec.** Emphasis is ink-brown solid fill or a 45° hatch.
- Serif body, monospace for index codes, values and captions only — mixing them is the signature
- **No arrow connectors.** Flow comes from number continuity and rule lines; the spec forbids arrows
- `Fig. NN / 05` at top-right of every sheet; footnote at the bottom
- radius 0, no shadow, no gradient. Dense is correct here — the Avoid list warns against empty sheets

### budget, computed before writing
```
vertical    405 − padding 26+20                = 359
            − title row 26 + margin 12         = 38
            − rule 1 + margin 14               = 15
            − footnote 14 + margin 12          = 26
            → main = 280pt

horizontal  content 656pt; the title row shares its line with the Fig. marker (~90pt + 20 gap),
            leaving ~546pt. Source Serif 600 at 20pt → 546 ÷ (20 × 0.50) ≈ 54 chars → written to ≤50.
            The 0.48 coefficient in the skill was measured on a sans; serif runs slightly wider,
            so this uses 0.50 and the render is the check.
```

### deviations, recorded
- **Type sizes are not the spec's absolute points.** It targets 13.33in; ours is 10in. Its 16pt
  body, 13pt index number and 10pt caption scale to 12pt, 9.75pt and 7.5pt — all under the
  framework's 14pt body / 10pt floors. Body is 14pt, index codes 11pt, captions 10pt here.
- **The footnote carries sheet identity, not a citation.** The spec makes it mandatory for
  charts; there are no charts, and inventing a source would be worse than repurposing the slot.

## visual thesis
A ledger. Each sheet is a page from a catalogue: indexed rows, rule lines, ink brown on paper
beige, no colour anywhere. The reader should feel they are being handed a record, not sold a tool.

## content plan
opener → what the registry is the record of → how a model moves → the standing rules → what we
still have to settle

---

## slide-01 — cover
- Title `Model Registry — operating guide`, `Fig. 01 / 05` top-right.
- Thesis line: "The registry is the record of what is allowed to run."
- Ledger meta row: prepared by / date / applies to.

## slide-02 — "What the registry is the record of" (35)
- Catalog table, four indexed rows × three columns: FIELD / WHAT IT ANSWERS / WHO WRITES IT.
  Header row is ink-brown solid with inverse beige text, per the spec's comparison diagram.
  - `A1` Version — Which artifact is this, exactly? — CI pipeline
  - `A2` Lineage — What data and code produced it? — Training job
  - `A3` Owner — Who is accountable while it runs? — Registering team
  - `A4` Stage — Where is it allowed to run? — Promotion workflow
- Closing line: a field nobody writes is a field nobody can trust.

## slide-03 — "How a model moves through the registry" (40)
- Promotion ledger: four numbered rows, no arrows — number continuity and rule lines carry the
  flow, which is what the spec requires. Each row: index / stage / entry requirement / who signs.
  - `01` REGISTERED — an artifact exists with version and lineage — automatic on training success
  - `02` STAGING — an evaluation report is attached and reviewed — model owner
  - `03` PRODUCTION — a rollback target is named and on-call told — owner + service owner
    *(the emphasised row: ink-brown solid left bar)*
  - `04` ARCHIVED — superseded or withdrawn, with the reason recorded — model owner
- Note: a stage is a permission, not a label.

## slide-04 — "Four rules that keep the ledger trustworthy" (45)
- Catalog table, four rows × three columns: RULE / WHAT IT SAYS / WHAT BREAKS WITHOUT IT.
  - `R-01` One name, one lineage — a model name never changes meaning — two teams ship different things under one name
  - `R-02` Deprecate before delete — archived stays readable — an audit cannot reconstruct last quarter
  - `R-03` Production names its rollback — the previous version stays promotable — rollback becomes a rebuild
  - `R-04` Stage changes append, never edit — the ledger is append-only — nobody can say who promoted what

## slide-05 — "What we still have to settle" (28)
- Three indexed discussion prompts, `Q1`–`Q3`, on the same ruled grid.
  - Who signs a production promotion when the owner is away?
  - How long does an archived model stay readable?
  - What happens to a model whose owning team is dissolved?
- Footer: thank-you + presenter placeholder.
