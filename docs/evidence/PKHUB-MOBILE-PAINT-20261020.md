# pkhub.co mobile first paint — evidence (2026-10-20)

Owner go-ahead 2026-10-20 ("ok just go for it first") for the queued task from
[PKHUB-MOTION-20261020](PKHUB-MOTION-20261020.md). Branch `claude/pkhub-mobile-paint` from `e2c1aed`.

## Diagnosis

- **Live trace at `f4f2ae1`:** HTML, CSS and JS finished by about 0.5s, but first paint came later. Unthrottled, live first paint was 0.4–0.5s, about 200ms after the CSS arrived.
- **Blocking resources:** the only render-blocking request was the site stylesheet: 203KB raw (40KB transferred), of which about 150KB was dead V7 code. The 326KB main script (106KB gzipped) downloaded at the same time and included framer-motion, which nothing used any more.
- **Layout shift outlier:** an occasional CLS of 0.119 came from the "กำลังเปิดการทำงานของหน้า…" loading notice. It was inserted into the page flow when hydration took more than 500ms, then removed.

## Changes

1. **Removed unused code:** the V7 pages, components and styles (`pkhub-v7.css`, product/stock/navigation CSS, legacy navbar and footer, old home sections, old partner-form parts). An import-graph check confirmed none of these files are reachable from `main.tsx` or `entry-server.tsx`. The error page now uses the v1 header. Site CSS went from 203KB to 90KB raw.
2. **Inlined the stylesheet:** `scripts/prerender.mjs` inlines it into every prerendered page (18.5KB gzipped, added to about 11KB of HTML). The build fails if the stylesheet is not inlined.
3. **Removed framer-motion:** the `LazyMotion` wrapper and the dependency are gone. The main script went from 326KB to 248KB raw, and from 106KB to 80KB gzipped.
4. **No-shift loading notice:** `.pk-load-error` is now a fixed toast, so appearing or disappearing cannot shift the page.
5. **Caching:** `/v1/*` and `/blog/*` images now get the same 7-day cache as the other image folders. Replace an image there under a new filename.

## Measurements (`/th`, medians)

Applied throttling (Playwright: slow 4G, 150ms RTT, 1.6Mbps, plus 4× CPU; 390px, DPR 2; 5 runs):

| Build | FCP | LCP | CLS |
| --- | --- | --- | --- |
| Live pkhub.co (`f4f2ae1`) | 1852 ms | 1876 ms | 0.004 |
| Local `main` (`e2c1aed`) | 1700 ms | 1720 ms | 0.004 (one run 0.119) |
| Local this branch | 824 ms | 1012 ms | 0.004 |

Lighthouse 13.5, simulated throttling, local production builds (3 runs):

| Build | FCP | LCP | CLS | TBT | Score |
| --- | --- | --- | --- | --- | --- |
| Mobile, main | 2038 ms | 3404 ms | 0.000 | 0 ms | 90 |
| Mobile, branch | 1823 ms | 3034 ms | 0.000 | 0 ms | 94 |
| Desktop, main | 506 ms | 725 ms | 0.003 | 0 ms | 100 |
| Desktop, branch | 514 ms | 661 ms | 0.003 | 0 ms | 100 |

Interaction latency (worst Event Timing, 4× CPU):
- menu: 120 → 96ms
- join brand toggles: 96 → 104ms
- Stock on Demand chips: 88ms
- brand filter: 104ms

All are well under 200ms.

The remaining CLS of 0.002–0.004 is the web fonts swapping in. The Vercel preview is behind Vercel Authentication, so live numbers will be recorded after the release.

## Motion and reduced motion (headless Chromium, 390px)

- **Reduced motion:** the billboard is static and wrapped, 0 duplicate tiles show, hero cards have opacity 1, the chat is complete, no reveal is pending, and the count shows its final value.
- **Motion allowed:** the billboard runs and pauses on keyboard focus with a solid outline; reveals and count-ups wait for scroll.
- **Rendered check:** blog article, dealer login and home render as before.

## Validation

Node 24: `check`, `lint`, `test` (16 pass), `build` and `seo:validate` all pass.
