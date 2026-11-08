# PK HUB public site motion spec

Status: canonical, gathered on 2026-11-08 under the PK
[design loop (DESIGN-001)](https://github.com/deucetrk/PK-Commerce/blob/main/docs/foundations/DESIGN-001-PRODUCT-DESIGN-LOOP.md)
from the owner-approved expressive motion direction (2026-09-30), the
[motion build evidence](../evidence/PKHUB-MOTION-20261020.md), the
[motion acceptance record](../../PUBLIC-MOTION-048.md) and `website/src/index.css`. The design
direction lives in [website/DESIGN.md](../../website/DESIGN.md); Paper file
`01M574A45Y9KY0KNPKJGP83B4Z`.

The public site is a marketing surface, so its motion is more expressive than the internal portal,
but it follows the same limits on what may move and on reduced motion.

## Principles

1. Motion shows hierarchy (headline, then proof, then action) or confirms a press. No decoration
   that hides content.
2. Content is never invisible while waiting for motion: the largest paint (hero headline) is
   visible at first paint, and all text stays in the DOM in its final state.
3. Animate only `transform` and `opacity`.
4. Numbers count up only for owner-confirmed figures, with their final width reserved so nothing
   shifts.
5. `prefers-reduced-motion: reduce` gives a complete static page: no entrance, no marquee (the brand
   rows wrap into a grid), counts show the final value, demos show the finished state.

## Values in use

| Pattern               | Value                                                                          |
| --------------------- | ------------------------------------------------------------------------------ |
| Press and small hover | 180 ms `ease`, transform only                                                  |
| Card lift on hover    | 500 ms `cubic-bezier(0.2, 0.7, 0.2, 1)`                                        |
| Hero entrance         | 760 ms `cubic-bezier(0.18, 0.75, 0.24, 1)`, 80 ms stagger between lines        |
| Reveal on scroll      | 16 px rise and fade over 420 ms, 70 ms stagger per child, after hydration only |
| Brand billboard       | Two rows, 48 s and 56 s per loop, pause on hover and focus                     |
| Parallax              | ±16 px, fine pointer at 1024 px and wider only                                 |

New motion reuses one of these values. A new value is added to this table in the same PR, with the
reason.

## Checks

The Playwright harness `website/scripts/qa/public-motion.browser.mjs` runs ordinary and reduced
motion cases across the published routes at 1280 and 390 px. Run it for any change to motion.
