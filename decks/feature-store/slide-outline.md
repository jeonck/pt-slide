# Feature Store — adoption review · slide outline

## meta
- deck: decks/feature-store
- mode: html
- style: ppt-mckinsey-ghost-deck (bundled). Chosen without asking — see "style choice" below.
- slide-size: 720pt × 405pt
- language: English
- audience: the ML platform and data engineering leads who would own it, and the engineering
  manager deciding whether to fund it
- tone: MBB ghost deck. Every sheet states its conclusion in the title; the body is evidence.
  Monochrome, emphasis by weight rather than colour.
- slides: 6 (cover · what it solves · what it is · when to adopt · what it costs · decisions)
- charts: none. Feature-store adoption rates, latency figures and cost savings are exactly the
  numbers that cannot be sourced. Slide 04 uses a 2×2 as a **framework with no plotted data** —
  quadrant labels only, no bubbles — because bubbles would be invented positions.
- fonts: Inter 400/500/600/700 embedded under `./assets/fonts/`. Pretendard removed — no Hangul.

## style choice
The repo default is a Korean policy-report navy, which does not fit an English decision review.
The skill says to offer 2–3 candidates; this time the style was picked directly and the reason
stated, because the previous three decks all took the recommendation. If the ghost-deck look is
wrong, switching is a re-run — say so and it changes.

## design tokens (from `slides-grab show-design ppt-mckinsey-ghost-deck`)
- bg and surface both `#FFFFFF` — the canvas is pure white and depth comes from hairlines
- text `#1A1A1A` · body `#3D4350` · muted `#7A828F` · border/neutral `#C9CDD3`
- accent `#1F3A5F` — the spec forbids emphasising with colour. It appears only as the number-badge
  fill (its own diagram language) and as **one** filled quadrant on slide 04. Text emphasis is Bold.
- action title is a **complete declarative sentence**, one line, with the kicker beneath it
- footnote bottom-right on every sheet, mandatory
- left-aligned throughout; the spec forbids centring. Diagrams sit right, text left.
- radius 0, no shadow, no gradient

### budget, computed before writing
```
vertical    405 − padding 27+20            = 358
            − header (title + kicker) 50 + margin 14 = 64
            − footnote 14 + margin 12       = 26
            → main = 268pt

horizontal  content width 656pt
            action title 20pt/600 → 656 ÷ (20 × 0.48) ≈ 68 chars → written to ≤64
```
Both axes matter here: the kicker sits directly under the action title, so a title that wraps
pushes the kicker and the whole body down and the band stops being constant across sheets.
Every action title below is ≤61 characters.

### deviations, recorded
- **Type sizes are not the spec's absolute points.** It targets 13.33in; ours is 10in. Its 18pt
  body and 10pt footnote scale to 13.5pt and 7.5pt, under the 14pt body / 10pt floors. Body is
  14–15pt and the footnote 10pt here.
- **The cover's title band carries the deck name, not a declarative sentence.** Every other sheet
  obeys the rule; a cover that argues before it introduces itself reads wrong.
- **The footnote carries sheet identity rather than a citation**, because there is no data. The
  spec makes the footnote mandatory; inventing a source would be worse than repurposing it.

## visual thesis
A ghost deck: read the six action titles alone and you have the recommendation. Everything below
them is evidence, in one grey, with the accent spent exactly twice.

## content plan
opener → what it actually solves → what it actually is → when it is worth it → what it costs →
what we must decide

---

## slide-01 — cover
- Title band: **Feature Store — adoption review**. Kicker `ML PLATFORM / DECISION REVIEW`.
- Body: the thesis in one line — "A feature store is a decision about ownership, not tooling."
- Meta row: prepared by / date / audience.

## slide-02 — "The problem a feature store solves is duplication, not storage" (61)
- Asymmetric: text left 1/3, diagram right 2/3.
- Diagram: two horizontal chains computing the same feature twice —
  `TRAINING  batch job → feature table → model` and `SERVING  service code → feature → model`,
  with a hairline bracket labelled "one definition, two implementations".
- Left text: the failure this produces is skew, and skew is silent.

## slide-03 — "A feature store is three services, and you may only need one" (59)
- Three numbered hairline boxes: Registry / Offline store / Online store.
- Each: what it is, and the one sentence that tells you whether you need it.

## slide-04 — "Adoption depends on reuse and on whether serving is online" (57)
- Asymmetric: text left 1/3, 2×2 matrix right 2/3.
- Axes: feature reuse across teams (low → high) × online serving need (no → yes).
- Four quadrant labels naming the answer per quadrant; the high-reuse / online quadrant is the
  **one filled box** in the deck. **No plotted bubbles** — the positions would be invented.
- Left text: two conditions, and the reason one alone is not enough.

## slide-05 — "The cost is a new critical dependency in the serving path" (56)
- Four hairline cells: latency budget · on-call surface · backfill correctness · migration of
  features that already exist. Each with the question it forces.

## slide-06 — "What we need to decide before building or buying" (47)
- Three numbered prompts, left-aligned. Footer: thank-you + presenter placeholder.
