# Public motion and navigation acceptance

Goal: full PK ecosystem redesign, IN PROGRESS. Run commands from `website/`.

Run with Node 24 and an already installed Playwright/Chromium runtime. The browser intercepts
and aborts every non-GET request, including form and analytics POSTs. It does not submit leads,
sign in, follow external contact links, or validate protected commerce behavior.

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs \
CHROMIUM_PATH=/absolute/path/to/chromium \
PUBLIC_ORIGIN=http://127.0.0.1:8860 \
PUBLIC_REVISION=<revision-from-the-reviewed-build> \
QA_OUTPUT=/tmp/pkhub-motion \
node scripts/qa/public-motion.browser.mjs
```

`PUBLIC_REVISION` is required and checked before and after the run. Build before running a local
preview; do not change its source/build during the run. Use `QA_MOTION=reduce` for the same route
and interaction checks with reduced motion. `QA_ROUTES=/th,/en` narrows diagnostic reruns only;
omit it for the full thirteen-route matrix at 1280×900 and 390×900.

The ordinary run checks hero staging, a rendered 300ms image-animation timeline sample, settlement,
desktop hover depth, eight simultaneously visible stationary brands, Portal/proof tab transitions
and roving focus, FAQ keyboard toggles, mobile menu/locale/anchor recovery, article TOC navigation,
journal search recovery, readable headings, horizontal containment, loaded on-screen assets and
uncaught page errors. The reduced run additionally checks every element/pseudo-element duration,
native running animations and smooth-scroll removal. Detached tab children are never treated as
rendered opacity samples. The script writes JSON results and selected public screenshots to
`QA_OUTPUT`; failures return a nonzero exit code.

These browser measurements are bounded public UI evidence. They do not prove physical-device,
screen-reader, lead receipt/deduplication/consent, real Auth/permissions, payment or PO acceptance.
