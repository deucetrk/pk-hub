# PK HUB application and public journey — 077

Date: 2026-10-03 (+07). Full ecosystem design remains **IN PROGRESS**.
Public root: `applications`; commands run from `website/`.
Branch: `codex/pkhub-acquisition-redesign`, based on main `378a61c` (identical to the
previous retained public branch). Runtime `d4fe4eaf992cbfd11b0ca898c761ad7ea211c6da`;
supplemental QA `6b632aecf39319e343e33009232b5f6f44c3bdff` changes only QA.
No push, PR, CI, production creation, provider change or real lead submission in this milestone.

## Composition

An editorial retailer intake: authentic full-width PK photography and a direct form action,
then a two-column application desk and separate review/process context. Mobile reads form first,
process second. Cobalt, carbon and white remain; existing expressive/reduced motion is retained.
This supersedes the older Join composition described in DESIGN's historical verification log.

- Join has four aligned required fields, grouped store/contact and product information,
  optional details, and a review-before-send region showing the actual current draft. Its edit
  action returns focus to the first field. Process/access boundaries and LINE remain visible.
- The shared sent-from-device result uses a clear heading, actual captured record and direct
  LINE/new-request actions. It remains explicit that the opaque transport cannot confirm storage
  or approval. Home/article enquiries retain their separate price-check purpose and action.
- Existing frozen pending fields, synchronous duplicate guard, request ID, validation, referral,
  payload and original-result snapshot remain. Pending text stays legible. Brands use a valid
  fieldset legend; consent errors are associated with their checkbox.
- No new approval, delivery, receipt, price, stock, account, retention or provider rule is introduced.

## Pinned rendered proof

[Source and artifact fingerprints](evidence/public-acquisition-077/source.json) match all **52**
tracked public source files to the runtime revision. All final checks below pin that build at
`127.0.0.1:8870` before and after. QA-only changes after the build do not change application code.

| Check | Final proof | Boundary |
| --- | --- | --- |
| Application/enquiry | [54 cases](evidence/public-acquisition-077/acquisition.json) | TH/EN Join, 1280/390, ordinary/reduced; validation, pending, same-turn dispatch, frozen original, retry identity, new-request identity, optional email, long records, result focus/visibility/reset; Home TH/EN and one article enquiry |
| Public interaction | [64 ordinary cases](evidence/public-acquisition-077/motion.json) | All 13 published routes, 1280/390; hero staging/hover, eight stationary brands, Portal/proof tabs, FAQ, mobile menu/locale, article TOC, journal empty-search/recovery, images/readability/containment/runtime errors |
| Reduced motion | [58 cases](evidence/public-acquisition-077/reduced.json) | Same 13 routes/widths; numeric element/pseudo durations at most 0.00001s, zero running animations and auto scroll |
| Supporting recovery | [20 cases](evidence/public-acquisition-077/supporting.json) | Missing-article keyboard recovery, malformed/out-of-range pagination from a hydrated journal, settled focused error fully visible in both languages/widths/motion preferences |

The acquisition harness owns an in-memory loopback lead fixture at `8871`. Only its exact synthetic
POST is allowed; all other non-GET requests are aborted. The supporting harness aborts every
non-GET, including its synthetic failed request. No payload is persisted. These are rendered
application/browser proofs, **not** provider delivery/deduplication, real contact, protected Auth,
screen-reader/physical-device or production acceptance.

Node 24 check, lint, client/SSR build, 13-route prerender and SEO validation pass. Final build/SEO:
`/tmp/pkhub-acquisition-077-{build,seo}-final3.log`; final motion lint:
`/tmp/pkhub-acquisition-077-lint-motion-fix.log`. Final browser handles9851/25317/53862/51933
are terminal0. Static check/lint handle4851 and build27401 are terminal0.
Owned preview53303 was stopped after its exact cwd/command guard;8870/8871 have no listeners.

Thirty-four retained captures cover application layout/pending/result/error/enquiry, settled error
and reduced Home/brands. Earlier 22 application captures of the identical app source were visually
inspected; final settled TH/EN desktop/mobile errors are separately inspected. Final ordinary motion
uses the runtime driver; reduced motion uses QA6b632ae, whose only correction is duration parsing.
Their exact driver hashes are recorded separately.

## Diagnostic corrections and limits

The first reduced-motion replay reported NaN because Chromium returns empty computed durations
for non-rendered video source/fallback children. The correction records those unavailable entries,
rejects other invalid values and accepts numeric CSS seconds/milliseconds including scientific
notation (`1e-05s`). The final 58-case pass supersedes both failed diagnostic runs; no production
animation change was required.

Early error screenshots captured smooth scrolling before settlement. Supplemental checks wait
for the entire focused alert below the header and within the viewport; all eight such states pass.
Vite's direct unknown-route fallback serves Home HTML and produces a hydration mismatch; it is
not Vercel's static404 contract. Supporting tests therefore enter recovery routes from a hydrated
journal. Hosted unknown-route status/hydration remains release verification. Cold route-chunk
loading/failure and all cross-product supporting screens remain in the ecosystem coverage audit.

## Pending owner consent input

Original consent text still describes prices/stock contact, while Join describes application review.
No purpose/consent text changed. Under AGENTS' high-risk legal/data-purpose boundary, an async owner
question asks whether Join may use: “ยินยอมให้ PK HUB ใช้ข้อมูลร้านและช่องทางติดต่อเพื่อตรวจสอบใบสมัคร
และติดต่อกลับเกี่ยวกับการค้าส่ง”. Home/article enquiries would retain their existing purpose.
**No answer received at closeout.** This is a pending decision, not an approved rule or whole-goal blocker.
Continue independent screen coverage; apply only the owner's actual reply before closing this copy gate.

## Replay and next action

Use Node24, installed Playwright/Chrome and a fresh output directory. Build with
`VITE_PARTNER_LEAD_ENDPOINT=http://127.0.0.1:8871/lead`; serve an owned preview at8870. Pin the
actual `dist/revision.json`, never guess a SHA. Do not mutate source/build during browser runs.

```sh
PUBLIC_ORIGIN=http://127.0.0.1:8870 PUBLIC_REVISION=<runtime-revision> \
PLAYWRIGHT_MODULE=<installed-playwright/index.mjs> CHROMIUM_PATH=<installed-chrome> \
QA_OUTPUT=<fresh-directory> node scripts/qa/public-acquisition.browser.mjs
```

Run `scripts/qa/public-motion.browser.mjs` with the same variables, once normally and once with
`QA_MOTION=reduce`; omit `QA_ROUTES` for complete public coverage. From the applications root,
run `evidence/public-acquisition-077/supporting.browser.mjs` with the same runtime variables.

Next: reconcile Dealer entry/home/account/offers and Staff supporting screens/state coverage in
Commerce's `docs/ux/PK_SALES_JOURNEYS.md`, plus public cold-chunk/consent gaps. Notify the owner
only when **all agreed active design** is complete. Deferred cashier/scanner/printer remain separate.
Batch this public candidate into a substantial scoped release using the existing pipeline; retain
main378a61c/prior healthy deployment for rollback or revert only this candidate through that pipeline.
No endpoint, provider, Auth, migration or infrastructure change is part of this release boundary.
