# Secrets — revocability is the standard · slide outline

## meta
- deck: decks/secrets
- mode: html
- style: `ppt-pattern-bold-poster-keynote` (bundled). **Chosen, not assigned** — see "style
  choice" below.
- slide-size: 720pt × 405pt
- language: English
- audience: the engineering group that owns identity, CI and the platform's secret material,
  plus the manager who has to sign the exception when a secret cannot be rotated
- tone: a mechanism argument. Every claim is about what a secret *does* — who can mint it, who
  can end it, how many copies exist — never about how often anything has gone wrong.
- slides: 5 (cover · why the usual rule fails · what makes rotation cheap · unrotatable means
  permanent · what we need to decide)
- charts: **none**, and no figures of any kind. See "no numbers, and why".
- fonts: Anton 400 (display) and Archivo 400/600/700 (subhead, body, labels), embedded under
  `./assets/fonts/` from `@fontsource/anton` and `@fontsource/archivo`. Pretendard deleted —
  no Hangul in this deck, and 3MB of Korean outlines is dead weight in an English deck.

## style choice
Three candidates were on the shortlist. `ppt-keynote-minimal-fullbleed` is out on its own
rules: it forbids bullet lists outright and caps a slide at one text block and one third of the
canvas in text. The closing sheet of this deck is three named decisions side by side; it cannot
be one text block without becoming a paragraph, and splitting it into three sheets breaks the
five-slide brief. `ppt-confident-color-block-deck` fits the content, but it is solid colour
blocks on white with a heavy grotesque — which is the shape `decks/deployment-strategies`
already occupies in this repo (`ppt-bold-block-infographic-deck`: charcoal/amber/teal blocks on
white, Archivo 800). Picking it would have made the two decks read as one series.

`ppt-pattern-bold-poster-keynote` was chosen because:

1. **The colour alternation carries the argument.** The style makes every sheet a single
   saturated field that flips between electric blue `#1F3DFF` and vermilion `#FF4D2E` as you
   advance. This deck's structure is literally alternating: state the standard (blue) → the
   rule that fails (vermilion) → the property that works (blue) → the failure that is permanent
   (vermilion) → the decisions (blue). The colour is not decoration here; it is the claim/
   counter-claim rhythm made visible before a word is read.
2. **It has a mandatory source slot.** Its Avoid list requires a source label plus a page
   number on every data sheet, at a fixed footline that may not drift. This deck has no sources
   to cite, and the brief asks that the *reason* go in that slot rather than a citation. A style
   that treats the source line as furniture rather than as an optional caption is the right
   place to say, on every sheet, that nothing here is priced.
3. **It is unlike anything else in the repo.** No existing deck uses a full-bleed saturated
   field. Nothing collides.
4. **A poster suits a thesis, not a survey.** The topic is a single re-framing —
   "how long does it take to revoke one" — and this style's whole grammar is one giant
   declarative line per sheet with modules underneath. That is the shape of the argument.

## no numbers, and why
This deck is about rotation and revocation, which is the subject that most tempts a number:
rotation intervals, mean time to revoke, how many credentials are in circulation, what share of
breaches start with a leaked key. **This repo cannot source any of that.** Nothing here has
been measured against this platform, and a plausible-looking figure lifted from a vendor report
would be exactly the "made-up data presented as real" that the design gate treats as Critical.

So the deck argues the mechanism and prices nothing. Where a number would go, there is a
property instead: *one issuer*, *one path to the holder*, *no human in the loop* — each of them
checkable by looking at the system rather than by trusting a statistic. The style's mandatory
source label carries that fact verbatim on sheets 02–05:

> No sourced figures in this deck — the mechanism is argued, not priced.

The style's `kpi` token (Anton 240pt giant number) and its entire chart vocabulary are
therefore unused. Its diagram vocabulary — giant index numbers, white outline modules on a
solid field — carries every sheet instead.

**Related discipline: no credential ever appears on a slide.** Not a token string, not key
material, not a plausible fake one. Secrets are referred to by role only ("a credential", "the
secret", "what the workload reads at run time"). A fake secret on a slide is a real secret in a
screenshot six months later.

## design tokens (from `slides-grab show-design ppt-pattern-bold-poster-keynote`)
- bg `#1F3DFF` (electric blue) · bg alt / accent `#FF4D2E` (vermilion) · text `#FFFFFF`
  · ink `#0E0E0E`
- **Exactly these four values are used.** No fifth colour, no tint, no gradient, no shadow, no
  rounded corner. Each sheet is one solid field; the only other surface is a white-filled
  module carrying ink text, which the spec's own diagram language permits
  ("white solid or ink outline on solid color page").
- Colour sequence: 01 blue · 02 vermilion · 03 blue · 04 vermilion · 05 blue.
- Type: display Anton 400; subhead / body / labels Archivo 400/600/700. Two families, as the
  spec names them.

### the white-solid rule this deck adopts
The spec allows a white-solid module among the white-outline ones. This deck spends it the same
way on every content sheet — on the module that *is* the sheet's thesis:

| Sheet | White-solid module |
|---|---|
| 02 | `NO FAILURE STATE` — the rule cannot be observed working |
| 03 | `ONE PATH TO THE HOLDER` — the property that decides everything else |
| 04 | `EVERY COPY IS LOAD-BEARING` — why nobody presses revoke |
| 05 | `THE REVOKE BUTTON` — the decision the other two hang on |

All modules carry the same 1.5pt white border whether they are filled or not, so the filled one
does not shift by a hair relative to its siblings. (Repo lesson: emphasis applied to one row
only moves that row.)

### budget, computed before any slide HTML was written

```
FIXED FURNITURE (identical on all five sheets, spec: no margin or footline drift)
  safe margin       spec 64px on a 1280px canvas → 64/1280 × 720 = 36pt
  footline baseline spec 48px                    → 48/1280 × 720 = 27pt from the bottom
  body padding      36 top · 36 sides · 22 bottom
  footer            10.5pt × 1.4 = 14.7pt tall, margin-top 12

VERTICAL
  405 − 36 (top) − 22 (bottom) − 14.7 (footer) − 12 (footer margin) = 320.3pt for main

  cover (01)
    eyebrow 11 × 1.4 = 15.4  + mb 20   =  35.4
    h1      72 × 1.3 × 2 lines         = 187.2  + mb 18 = 205.2
    rule    4pt                        + mb 22  =  26.0
    subhead 18 × 1.4 × 2 lines         =  50.4
                                   total 317.0 ≤ 320.3 ✓

  content sheets (02–05)
    kicker  11 × 1.4 = 15.4  + mb 8    =  23.4
    h1      52 × 1.25 = 65   + mb 14   =  79.0
    → module strip                     = 217.9pt

    COLUMN pattern (02, 04) — three equal columns, gap 14
      column inner height = 217.9 − 3 (border) − 28 (padding) = 186.9
      label block is pinned to 36.4 (= 2 lines at 13 × 1.4) on every column so all three
      bodies start at the same y even when a label needs only one line
      body gets 186.9 − 36.4 − 8 (gap) = 142.5 → 142.5 / 21.75 = 6.5 lines at 15pt

    LEDGER-ROW pattern (03, 05) — three full-width rows, gap 8
      row height = (217.9 − 16) / 3 = 67.3
      row needs  = 22 (padding) + max(label 2 lines 36.4, body 2 lines 43.5) = 65.5 ≤ 67.3 ✓
      rows are flex:1 so the 1.8pt of slack per row is distributed, not pooled at the bottom

HORIZONTAL — measured, not estimated (./_measure-secrets.mjs against the real strings)

  Coefficients that came out of the measurement, on this canvas with these faces:

    Anton 400, mixed-case prose, 51–72pt        0.383 – 0.427   → budget with 0.43
    Archivo 400, body prose, 15pt               0.426           → budget with 0.44
    Archivo 600, subhead, 18pt                  0.438           → budget with 0.45
    Archivo 400, footline, 10.5pt               0.439
    Archivo 700 UPPERCASE + 0.08em, 13pt        0.625 – 0.735   → budget with 0.74
    Archivo 700 UPPERCASE + 0.08em, 11pt        0.703

  The all-caps labels run ~70% wider per character than prose in the same family. Budgeting
  the labels at the prose coefficient would have under-reserved every label cell by that much.
  This is measured, not assumed — it is the failure the repo's notes single out.

  h1, one line, must not wrap (the module strip's y depends on it)
    available 720 − 72 = 648pt.  648 / (52 × 0.43) = 29 chars → titles written to ≤ 27.
    Measured at 52pt: "Why the usual rule fails"   474pt ✓
                      "What makes rotation cheap"  558pt ✓
                      "Unrotatable means permanent" 615pt ✓
                      "What we need to decide"     485pt ✓
    Two candidate titles were cut here, before any HTML existed, because they measured over:
      "What makes a secret cheap to rotate"     741pt ✗  → "What makes rotation cheap"
      "A secret nobody can rotate is permanent" 819pt ✗  → "Unrotatable means permanent"
    Both were two claims in one line. One claim each reads better anyway.

  cover h1 at 72pt: "Revocability" 343pt · "is the standard" 427pt — both ≤ 648 ✓, split
    on an explicit <br> at the phrase boundary rather than left to wrap.

  COLUMN body (02, 04): column 206.7 − 3 − 28 = 175.7pt.
    175.7 / (15 × 0.44) = 26 chars/line × 6 lines → bodies written to ≤ 150 chars.
  COLUMN label: 175.7 × 2 lines / (13 × 0.74) = 36 chars → labels written to ≤ 30.
  LEDGER body (03): 648 − 3 − 32 − 150 (label cell) − 18 (gap) = 445pt.
    445 / 6.6 = 67 chars/line × 2 → bodies written to ≤ 128 chars.
  LEDGER body (05): 445 − 46 (index cell) − 18 = 381pt.
    381 / 6.6 = 57 chars/line × 2 → bodies written to ≤ 112 chars.
  LEDGER label cell 150pt: 150 / (13 × 0.74) = 15 chars/line × 2 → labels ≤ 26 chars.
  footline: 648 − page number − gap ≈ 590pt. Source label measured 320pt at 10.5pt ✓ one line.
```

## deviations from the spec, recorded
1. **Leading is raised off the spec's values.** The spec sets display leading `0.95` and this
   framework forbids anything near `1` — a display face at `0.95` drops its descenders out of
   the box and `validate` calls it `text-clipped`. Anton runs at `1.3` on the cover and `1.25`
   on sheet titles here; body at `1.45`, labels at `1.4`. Nothing in this deck is below `1.25`.
2. **Type sizes are the spec's, re-scaled to this canvas, then floored.** The spec targets a
   13.33in (960pt) canvas; this one is 10in (720pt), a 0.75 factor. Scaled: display 105 → 79,
   headline 90–140px → 51–79pt, body 28 → 21, subhead 24 → 18, label 13 → 9.75. The label
   lands under the 10pt absolute floor, so **labels stay at 13pt unscaled** and the footline at
   10.5pt. Body is set at 15pt rather than the scaled 21pt: three modules of real prose do not
   fit a 405pt sheet at 21pt, and 15pt is comfortably over the 14pt body floor. Sheet titles
   are 52pt — just inside the spec's own 90px (51pt) headline floor, not below it.
3. **The `kpi` token and the whole chart vocabulary are unused.** There is no number to put in
   them. See "no numbers, and why".
4. **The cover carries no white-outline modules.** The spec exempts cover, divider and closing
   sheets from the "three modules minimum" rule and asks them to stay poster-like. The cover is
   a poster: eyebrow, two-line Anton headline, a 4pt white rule, one subhead. The closing sheet
   *does* carry modules, because three decisions are three things.
5. **The footline's left slot carries the source note, not a citation.** On the cover it
   carries the presenter placeholder instead. Position and type are identical on all five
   sheets, which is what the spec's no-drift rule protects.
6. **Presenter is a placeholder.** `Presenter · Team`. No name is invented.

## visual thesis
Five posters. Each one is a single saturated field with one giant Anton line on it, and the
field flips colour every time you advance — so the deck's rhythm (claim, counter-claim, claim)
is legible from the back of the room before anyone reads a word. Underneath the line sit three
white-outline modules, one of them filled white, and the filled one is always the sheet's
thesis. Nothing is centred, nothing is rounded, nothing has a shadow, and the margin and
footline sit at the same coordinates on every sheet. The audience should feel they are being
handed a position, not a survey.

## content plan
cover → why "don't commit secrets" is the wrong rule → what makes a secret cheap to rotate →
what an unrotatable secret actually is → what we have to decide

---

## slide-01 — cover (blue `#1F3DFF`)
- Layout: poster. Eyebrow, two-line Anton headline at 72pt, 4pt white rule at full content
  width, one subhead paragraph. Footline: `Presenter · Team` left, `01` right.
- Eyebrow: `Secrets · Platform engineering`
- Headline: `Revocability` / `is the standard` (explicit `<br>`, not a wrap)
- Subhead: the rule is not "don't commit secrets" — it is how long it takes to revoke one, and
  that one answer decides where a secret lives, how long it lives, and whether rotation is a
  job or a ticket.
- Intent: the anchor is the 72pt headline against a full-bleed field. The subhead states the
  thesis in one sentence so the rest of the deck is elaboration, not suspense.

## slide-02 — "Why the usual rule fails" (24 chars) — vermilion `#FF4D2E`
- Layout: COLUMN pattern. Kicker `The rule we actually teach`, headline, three equal
  white-outline columns.
- Columns:
  - **ONE LEAK PATH OF MANY** — a commit is one exit. Build logs, an error report, a
    screenshot in a ticket, a cached image and a laptop that has left the company are the
    others, and the rule addresses none of them.
  - **SILENT ON THE ONES ALREADY OUT** — it is an instruction about tomorrow. Every credential
    already sitting in a repository, an image or a partner's config is untouched by adopting
    it.
  - **NO FAILURE STATE** *(white-solid)* — you cannot observe a secret not being committed, so
    you cannot tell whether the rule is working. A revocation either happened or it did not.
- Intent: dismantle the rule on its own terms — coverage, backlog, observability — without
  claiming how often it fails, which would need a number.

## slide-03 — "What makes rotation cheap" (25 chars) — blue `#1F3DFF`
- Layout: LEDGER-ROW pattern. Kicker `The property worth designing for`, headline, three
  full-width rows, each a 150pt uppercase label cell plus prose.
- Rows:
  - **ONE ISSUER** — one authority mints it and can end it. If two systems can both issue it,
    neither of them can retire it alone.
  - **ONE PATH TO THE HOLDER** *(white-solid)* — the workload reads it at run time from one
    place. Baked into an image or a config file, there is no single path to cut.
  - **NO HUMAN IN THE LOOP** — rotation runs as a job on a schedule it owns. A rotation that
    needs a ticket happens after the incident, not before it.
- Intent: define "cheap to rotate" as three checkable structural properties, so the standard is
  auditable by reading the system rather than by measuring anything.

## slide-04 — "Unrotatable means permanent" (27 chars) — vermilion `#FF4D2E`
- Layout: COLUMN pattern again (declared pattern reuse, colour and content differ).
  Kicker `What the policy cannot fix`.
- Columns:
  - **IT OUTLIVES ITS POLICY** — the policy sets a lifetime, the plumbing sets the real one.
    Where the two disagree the plumbing wins, and the document is the thing that is wrong.
  - **EVERY COPY IS LOAD-BEARING** *(white-solid)* — once a credential is embedded in a partner
    integration, a device image or a signed artifact, revoking it breaks something. So nobody
    revokes it.
  - **THE EXIT IS AN OUTAGE** — it will be revoked eventually, during an incident, by someone
    who did not choose the moment and cannot see who still depends on it.
- Intent: the sharpest claim in the deck, and the reason the standard is revocability and not
  hygiene. A secret nobody can rotate is permanent whatever the policy says.

## slide-05 — "What we need to decide" (22 chars) — blue `#1F3DFF`
- Layout: LEDGER-ROW pattern with an index cell — 30pt Anton `01`/`02`/`03` in a 46pt cell
  before the label cell. Kicker `Three decisions, not three opinions`.
- Rows:
  - **01 · THE KEEP RULE** — do we keep any secret we cannot rotate automatically, and if so
    under what named, dated and owned exception?
  - **02 · THE REVOKE BUTTON** *(white-solid)* — who can revoke, alone, at any hour, without
    asking permission, and when did they last do it?
  - **03 · THE ONES ALREADY OUT** — what happens to the secrets already in circulation: rotate
    them now, or record that we treat them as permanent?
- Intent: closes on three decisions as work items with owners, not as a summary. Every one is
  a question this room can answer today; none of them is answered here.
