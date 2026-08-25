# From RAG to Agentic RAG — slide outline

## meta
- deck: decks/agentic-rag
- mode: html
- style: ppt-blueprint-schematic-deck (bundled, user-approved)
- slide-size: 720pt × 405pt
- language: English
- audience: engineers and technical leads who already run a classic RAG pipeline and are deciding whether to make retrieval agentic
- tone: engineering blueprint. Structural, specific, no hype. State what changes and what it costs, not what is exciting.
- slides: 6 (cover · diagnosis · the shift · patterns · cost & decisions · Q&A)
- charts: none. No benchmark, latency or accuracy figure here is one we can source, so the deck argues from mechanism rather than numbers.
- fonts: Inter 300/400/600 + JetBrains Mono 400, embedded locally under `./assets/fonts/`. Pretendard removed — this deck has no Hangul.

## design tokens (from `slides-grab show-design ppt-blueprint-schematic-deck`)
- bg `#0E1B3D` · surface `#0E1B3D` (same — depth comes from line weight, not fills)
- text `#E8EEF7` · muted `#8FA3C8` · accent/line/border cyan `#4FC8E8` · grid `#2A4A8C` · hatch `#3A5DA0`
- full-bleed dot grid, all content snaps to it — the spec calls this the identity, so it is on every slide
- outer 0.75pt cyan drawing frame + corner crop marks
- title block bottom-right: 0.75pt cyan box with slide number, title, and `SHEET XX/06` in monospace
- shapes are no-fill 0.75pt cyan outlines; exactly one emphasis element may take a cyan tint

### deviations, recorded
- **Type sizes are not the spec's absolute points.** The spec is written for a 13.33in canvas; ours is 10in. A straight 0.75× scale puts body at 13.5pt and labels at 9.75pt, under the framework's 14pt body / 10pt absolute floor. Body copy is 14–15pt here; labels, monospace codes and the title block sit at 10–12pt in the spec's own label/caption/value roles.
- **Body weight is 400, not the spec's 300.** Inter 300 at 14pt over `#0E1B3D` reads thin enough to fail the gate's legibility check. Display type keeps 300, where the size carries it.
- **The dot grid and frame are drawn as data-URI SVG backgrounds, not CSS gradients.** Same result, and the style's Avoid list forbids gradients outright.
- **Copy was cut to fit, repeatedly.** The title block is bottom-right furniture on every sheet, so any content that outgrows `main` slides underneath it — and `validate` does not catch that, because it is a child overflowing its parent rather than two siblings overlapping. Slides 02, 04 and 05 each needed the copy shortened until the layout fit at 14pt rather than the type shrunk to fit the copy.

## visual thesis
A drawing board, not a slide deck. The blueprint grid is exposed on every sheet, content snaps to it, and every diagram is an unfilled line drawing. The argument should feel measured out rather than pitched.

## content plan
opener → what breaks in classic RAG → the structural change → adoptable patterns → what it costs and what to decide → discussion

---

## slide-01 — cover
- Full-bleed grid, drawing frame, no title block band.
- display: **From RAG to Agentic RAG**
- subtitle: When retrieval stops being one step and becomes a loop the model controls
- Cyan rule + monospace meta row: presenter placeholder / date / classification
- Sheet marker `SHEET 01/06`

## slide-02 — What classic RAG does, and where it stops
- Top: the one-shot pipeline as five inline monospace stages — QUERY → EMBED → TOP-K → CONTEXT → GENERATE
- Three failure modes in a 3-column grid, each with a monospace code (`F-01`…`F-03`):
  - The question is not the query — vocabulary mismatch and implicit constraints never reach the index
  - One hop is not enough — answers that require joining two documents cannot be retrieved in one shot
  - Nothing can notice the miss — retrieval always returns something, and confidence does not drop when it is wrong
- Callout: "Classic RAG assumes the first retrieval was the right one. No part of the pipeline is able to disagree."

## slide-03 — The shift: retrieval becomes a loop
- Process flow, four no-fill nodes with right-angle connectors and a return edge from CRITIQUE to RETRIEVE
  - 01 PLAN — decide what to look for, and in which source
  - 02 RETRIEVE — issue one or more queries, not necessarily the user's words
  - 03 CRITIQUE — judge whether what came back can answer the question *(emphasis node — this is the part classic RAG has no slot for)*
  - 04 ANSWER — generate, with the evidence that survived
- Leader-line caption under the loop: the return edge is the whole change; everything else already existed
- Callout: "The model stops being the last step in the pipeline and starts being the thing that drives it."

## slide-04 — Patterns you can adopt one at a time
- 2×2 of no-fill boxes, each with a monospace code and a what-it-adds / what-it-costs pair:
  - `P-01` Query rewriting — adds: the index sees a query written for it. costs: one extra model call before every retrieval
  - `P-02` Routing — adds: the right source per question. costs: a router to maintain, and a wrong-route failure mode
  - `P-03` Multi-hop — adds: answers that need two documents joined. costs: latency multiplies by hop count
  - `P-04` Retrieval grading — adds: the loop can tell that it failed. costs: a judge whose errors are now yours too
- Note: these are independent. Adopting one is a change; adopting all four at once is a rewrite.

## slide-05 — What it costs, and what to decide first
- Two hatched comparison columns, title-block headers:
  - **WHAT CHANGES** — latency becomes a distribution, not a number · token cost scales with attempts, not with corpus · the same question can take different paths on different runs · failures move from "wrong answer" to "never stopped"
  - **DECIDE BEFORE YOU BUILD** — the stop condition · a hop budget and what happens at the ceiling · an eval set that contains multi-hop questions · the fallback path back to one-shot
- Summary callout: "Agentic RAG trades a predictable pipeline for a system that can recover. Budget the loop before you open it."

## slide-06 — Q&A
- Mirrors the cover: full-bleed grid, drawing frame, large display `Q&A`
- Three discussion prompts with monospace numbering:
  - Which of our failures is retrieval, and which is generation?
  - What is our stop condition, and who owns it?
  - How would we know the loop got better?
- Footer: thanks + presenter placeholder
