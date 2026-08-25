# MLOps Platform Roadmap — slide outline

## meta
- deck: decks/mlops-platform
- mode: html
- style: ppt-consulting-precision-grid (bundled, user-approved)
- slide-size: 720pt × 405pt
- language: English
- audience: platform and ML engineering leads deciding what to build first, and the engineering leadership funding it
- tone: consulting exhibit. Action titles that are complete sentences, left-aligned grey body, one accent used only as a border. Sequence and criteria, not enthusiasm.
- slides: 7 (cover · diagnosis · capability map · three phases · build vs buy · decisions · discussion)
- charts: none. Adoption rates, cycle-time gains and cost figures for MLOps are exactly the numbers we cannot source, so the deck argues from sequence and ownership instead. The style requires a source caption whenever data appears — the absence of data is why the caption carries the sheet identity instead.
- fonts: Arimo 400/700 embedded under `./assets/fonts/`. Pretendard removed — no Hangul in this deck.

## design tokens (from `slides-grab show-design ppt-consulting-precision-grid`)
- bg `#FFFFFF` · surface `#F4F5F7` · text `#1A1A1A` · muted `#6B7280` · border `#D1D5DB`
- accent `#0B5FFF` — **one** accent, and the spec forbids it on text. It appears only as the 4px left
  border on an active element and as the cover rule.
- 12-column strict grid, radius 0, no shadow, no gradient
- header band: kicker + action title (a complete sentence), 1px `#D1D5DB` rule beneath — on every sheet
- source caption fixed bottom-right — on every sheet
- body always left-aligned; the spec explicitly forbids centring

### height budget, computed before writing
```
405
 − padding 22 + 20            =  42
 − header band                =  54
 − hairline rule + margin     =  17
 − source caption + margin    =  26
 = 266pt available to main       (content width 656pt)
```
Every slide below was laid out against 266pt. The action title is held to **one line** so the hairline
rule lands at the same y on all seven sheets — that constant is what makes the grid read as strict.

### deviations, recorded
- **Arimo substitutes for Arial.** The spec names Arial, which cannot be embedded; Arimo is
  metric-compatible and open. The spec's own fallback chain already expects an Arial-metric face.
- **Type sizes are not the spec's absolute points.** The spec targets 13.33in; ours is 10in. Its 16pt
  body and 9pt caption scale to 12pt and 6.75pt, under the framework's 14pt body / 10pt floors. Body
  is 14pt and caption 10pt here.
- **The source caption carries sheet identity, not a citation**, because the deck presents no data.
  Dropping it would break the style's signature; filling it with a fake source would be worse.

## visual thesis
A consulting exhibit. Nothing decorative survives: hairline boxes on a strict grid, grey body, one blue
border where the eye must land. The action titles alone should carry the argument if the slides were
read as a list.

## content plan
opener → what is actually broken → what a platform must own → the sequence → what to buy → what to
decide first → discussion

---

## slide-01 — cover
- Kicker `PLATFORM ENGINEERING / 2026`, display title, 4px accent rule, subtitle, meta row.
- display: **MLOps Platform Roadmap**
- subtitle: What to build first, what to buy, and what to stop each phase on

## slide-02 — action title: "Most teams do not have an MLOps problem — they have a repeatability problem"
- Four hairline cells, numbered `01`–`04`, each a symptom and what it actually indicates:
  - Training lives in notebooks — the run that produced the current model cannot be reproduced
  - Deployment is a person — the same engineer ships every model, and the steps live in their head
  - Retraining is a memory — nobody can say when a model was last refreshed, or on what
  - Nobody owns the boundary — data platform and ML team each assume the other handles features
- Takeaway line under the grid: the fix is not a tool; it is making one path the only path.

## slide-03 — action title: "A platform owns six capabilities; a project owns none of them"
- 2×3 hairline grid, one capability per cell with a one-line definition of what "owned" means:
  - Data & features · Training · Registry · Serving · Monitoring · Governance
- Note: a capability is owned when a team can use it without asking the platform team for help.

## slide-04 — action title: "Sequence the platform in three phases, and stop each one on a criterion"
- Three-node process flow, straight connectors with 4px triangle heads, per the spec's diagram language.
  - `01` REPEATABLE — every model is produced by a pipeline, not a laptop.
    Exit: any model in production can be rebuilt from its commit.
  - `02` OBSERVABLE (active — 4px left accent border) — inputs, outputs and drift are visible without a request.
    Exit: an on-call engineer can answer "is this model healthy" without the ML team.
  - `03` SELF-SERVE — a new team ships a model without the platform team in the loop.
    Exit: a team onboards using docs alone.
- Caption: phases are gates, not calendar quarters. No dates here because none can be sourced.

## slide-05 — action title: "Buy the undifferentiated layers; build only where your data model is the differentiator"
- Table, six rows (the capabilities from 03) × three columns: Capability / Default posture / Build only if
- Header row on `#F4F5F7`, 1px `#D1D5DB` hairlines, alternating rows plain.

## slide-06 — action title: "Decide four things before phase 1, or phase 2 will decide them for you"
- 2×2 hairline cells, each a decision and the failure mode of leaving it open:
  - Who owns the boundary with the data platform → features get built twice, differently
  - What the exit criterion for each phase is → phase 1 never ends
  - What you will not build → the platform grows a bespoke everything
  - Who is the first internal customer → the platform is designed for nobody

## slide-07 — action title: "What we need to agree on before the first phase starts"
- Discussion sheet: three numbered prompts, left-aligned, same grid.
  - Which capability is actually blocking us today?
  - What is our exit criterion for phase 1, in one sentence?
  - Which layer are we genuinely differentiated in?
- Footer: thank-you line + presenter placeholder.
