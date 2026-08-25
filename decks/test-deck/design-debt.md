# design debt — decks/test-deck

Deferred (non-blocking) findings from the Stage 2 design gate. No Critical items; all entries below are Minor/Note and were accepted rather than silently dropped.

## Documented palette extensions
`ppt-korea-policy-navy` defines muted text as `#5C6470`, which is unreadable on the navy `#0B2C5C` surfaces used by the cover and the Q&A slide. Two tints on the navy→border axis (`#0B2C5C` → `#C5D2E3`) are therefore used **only** on navy backgrounds:

| Token | Hex | Position on the navy→border axis | Used for |
|---|---|---|---|
| navy hairline | `#3A5B87` | ≈ 25% | footer/list rules on slide-01, slide-05 |
| navy muted | `#8FA6C4` | ≈ 62% | small labels on slide-01, slide-05, and the page number in the header band |

These are harmonic neighbours of approved tokens, not new standalone hues. If the deck later gains a `DESIGN.slides.md`, promote them to named tokens there.

## Tracked findings
| Slide | Finding | Severity | Disposition |
|---|---|---|---|
| slide-01, slide-05 | "발표자 · 소속" is a placeholder | Note | User fills before presenting |
| slide-01 | Right half of the cover is open field | Note | Intentional poster negative space |
| slide-03 | Slack between node body copy and the pinned "사람의 역할" row | Minor | Accepted — bottom row alignment beats padding with filler copy |
| slide-05 | Left column below the subtitle is open | Note | Intentional, mirrors the cover |
| deck-wide | Accent-3 green `#1F9D57` unused | Note | No positive-direction indicator exists in this content; decorative use is forbidden by the style |
