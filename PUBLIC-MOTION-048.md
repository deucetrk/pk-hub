# Public motion and navigation acceptance

Goal: full PK ecosystem redesign, IN PROGRESS. Run commands from `website/`.

## 2026-10-03 evidence and release boundary

Actual public production `acf36134` reproduces two failures: hero hover remains an identity
transform after entrance at desktop in both languages; the moving brand rail does not show all
eight brands simultaneously at either width. The corrected baseline harness records 26 passes
and six expected failures across Home and journal search at 1280/390px. The initial diagnostic
mistook horizontally off-screen lazy images and asynchronous/detached DOM reads for failures;
those are harness observations, not claimed broken assets or application defects.

Runtime source `498ed6cc4f0b96c3a4f52652bb2f01fd0dd19746` removes duplicate/moving rails and
shows eight genuine marks in one desktop row or two mobile rows. Hero image animation releases
its transform after entrance so a 500ms hover transition can run. No image file, palette,
commercial claim, form transport, referral, Auth, permission or backend contract changes.
HONOR uses its original transparent asset: alpha bbox `(397,400)-(2461,801)` in a 2859×1200
canvas is centered. Flex centering replaces the former translate compensation after the grid
layout change; rendered desktop/mobile marks are aligned without clipping.

On the committed runtime build served locally at port 8860, **64 ordinary-motion cases and
58 reduced-motion cases pass**. Both runs pin `498ed6c` before and after, cover all thirteen
published routes at 1280/390px, and block non-GET requests. Node 24 check, lint, build and SEO
validation pass. Machine results, source fingerprints and inspected brand screenshots are in
[evidence/public-motion-048](evidence/public-motion-048/source.json). Temporary intermediate
candidate runs are superseded by these final committed-runtime runs.

Scoped release uses the owner-authorized existing GitHub/Vercel pipeline. Prior main is
`80f28340`, while prior healthy live public production remains `acf36134`. Recovery is restoring
that existing healthy deployment or reverting this scoped PR through the same pipeline. No
business data reversal is needed. Exact source/main CI and hosted promotion must be recorded
before claiming this fix live. Public receipt/deduplication/consent, protected Sales/Reports/
Superadmin, PO/bank/slip policy and original-command recovery remain open. This is not whole-goal
completion or approval to change provider/account/database/access settings.

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
