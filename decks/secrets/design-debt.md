# decks/secrets — accepted design debt

Minor and Note findings that were accepted rather than fixed, plus the deliberate departures
from `ppt-pattern-bold-poster-keynote` that the gate reports point at. Nothing here is
Critical; nothing here is silent.

## 1. Ink `#0E0E0E`, not white, is the text colour on the vermilion sheets — **Major, fixed**

The spec's `text` token is `#FFFFFF` and its signature says the giant headline sits white on
the saturated field. Measured:

| pair | ratio |
|---|---|
| `#FFFFFF` on `#FF4D2E` (vermilion) | **3.31:1** |
| `#0E0E0E` on `#FF4D2E` | **5.84:1** |
| `#FFFFFF` on `#1F3DFF` (blue) | 6.63:1 |
| `#0E0E0E` on `#FFFFFF` | 19.3:1 |

White on vermilion is under the 4.5:1 body bar this framework uses, and it was visibly hazy in
the first render of sheets 02 and 04 at presenting distance. Sheets 02 and 04 therefore run
**ink on vermilion** — headline, kicker, labels, prose, module outlines and footline all
`#0E0E0E`. Sheets 01, 03 and 05 keep **white on blue**, which passes comfortably.

`ink` is a first-class token of this style and its diagram language explicitly sanctions "white
solid **or ink outline** on solid color page", so no colour outside the spec was introduced.
The side effect is a stronger poster: black on vermilion and white on blue read as two distinct
registers, which is exactly the claim/counter-claim alternation the deck is built on.

## 2. Anton needs `line-height: 1.5`, and that leaves the cover headline airy — **Note, accepted**

The spec sets display leading `0.95`. Anton's em box is much taller than its cap height, and
`validate` reported `text-clipped` at `1.25`, at `1.4`, and at `1.45`; `1.5` is the first value
that clears. That is also well above this framework's floor (large display type ≥ 1.3), so it
is the right value on both counts.

The consequence is visible on the cover: `Revocability` / `is the standard` sit further apart
than a poster headline normally would. Two alternatives were tried and rejected:

- **A negative top margin on the second line** (a −28pt optical correction). It looks right,
  but the two line boxes then overlap and `validate` raises `sibling-overlap`. Trading a clean
  validate run for a hand-tuned nudge is not worth it.
- **One line at 55pt.** Removes the gap, but the cover headline then sits at almost the same
  scale as the 52pt sheet titles, and the cover loses its hierarchy.

Accepted as-is at 66pt / 1.5. The style's own mood line is `airy`, and the render reads as
deliberate whitespace rather than as a broken headline.

## 3. Uneven tails in the column modules — **Note, accepted**

On sheets 02 and 04 the three columns are equal-height by construction (a grid row), and their
bodies run five or six lines. The shorter ones therefore leave a tail of empty field inside the
outline. Two levers were used — the footline gap was opened from 12pt to 18pt so the boxes stop
crowding it, and every body was written to fill at least five of the six available lines — but
some tail remains.

It was **not** closed by inventing another sentence. The spec's own instruction is that modules
carry real content and that no placeholder module exists; padding a module with filler to
square up a rectangle is the same failure wearing a different hat.

## 4. `EVERY COPY IS LOAD-BEARING` breaks at its hyphen — **Note, accepted**

On sheet 04 the label wraps as `EVERY COPY IS LOAD-` / `BEARING`. It is a real hyphen in a real
compound, so the break is legitimate rather than a mid-word split, and shortening the label
would cost the claim its verb. Left alone.

## 5. The `kpi` token and the entire chart vocabulary are unused — **Note, by design**

This style is chart-forward: it fixes bar geometry, value-label type, axis weight and a 240pt
Anton KPI number. **None of it appears.** Every figure that would fill it — rotation interval,
time to revoke, number of credentials in circulation, share of incidents that start with a
leaked key — would have to be invented. See `slide-outline.md` § "no numbers, and why". The
style's mandatory source label carries that fact on all four content sheets instead of a
citation.

## 6. Presenter placeholder — **Note, by design**

The cover footline reads `Presenter · Team`. No name and no organisation were invented.
