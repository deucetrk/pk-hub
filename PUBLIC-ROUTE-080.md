# PK HUB route loading and recovery — 080

Date: 2026-10-04 (+07). Full ecosystem design remains **IN PROGRESS**.
Subsequent cross-surface status: [085](PUBLIC-DESIGN-085.md) records local completion of all agreed
active design. This080 runtime/evidence is unchanged; hosted and full business acceptance remain open.
Public root: `/Users/deuce/.codex/worktrees/pkhub-editorial-followup/applications`;
commands run from `website/`. Branch: `codex/pkhub-acquisition-redesign`, based on main378a61c.
Runtime commits: `2db9675ea32ef950b94a9ec5aafe6fa1ac3c0521`, then
`b4a93c307e93bb18b870e4703c91f7ff34b38545`. Final proof pins the latter build.
No push, PR, CI, deployment, provider change or real lead submission in this milestone.

## Current composition and recovery

This extends [077](PUBLIC-ACQUISITION-077.md) without changing its application composition.
Cold client routes now have a shared editorial loading screen and focused failure recovery;
large readable headings, native Home/reload actions and restrained cobalt progress retain the
existing carbon/white/cobalt palette. Reduced motion remains supported.

- A Page-identity boundary resets only when the actual page component changes. Query, fragment
  and locale navigation preserve the current form draft. The cold transition gets a fresh
  Suspense boundary, so React Router's transition does not conceal the loading state.
- Reload performs a real document reload even when the URL contains the same fragment. Current
  query/referral and fragment remain; ordinary modifier-click/native anchor behavior remains.
- Initial prerendered content stays readable while its controls load. Every prerendered form
  is initially inert with an owned bootstrap marker and a localized native Contact action
  outside the form. This also protects before the entry module loads or when scripts are disabled.
  The ready commit removes the temporary note, inert marker and submit guard. A bootstrap failure
  leaves inputs unavailable and offers a focused reload; it never presents a sent result.
- A shared bilingual missing-page component matches the static404 markup at unknown URLs,
  preserves the URL, uses noindex/follow and has native Thai/English Home and Journal recovery.
  The loopback preview serves actual404 for unknown dotted paths as well as extensionless paths.
  Vercel routing/configuration is unchanged; hosted404 status is still release acceptance.

Endpoint/provider, payload, request identity, duplicate guard, referral, captured result,
consent purpose, permissions and all business contracts remain unchanged. The consent-purpose
question recorded in077 still has no owner reply; preserve the original wording.

## Final local proof

[Current source/artifact manifest](evidence/public-route-080/source.json) recomputes all55 public
source files, build/config inputs and four QA drivers. It does not assert the old077 hashes still
match. All final browser reports pin runtimeb4a93c3 before and after; source/build remained frozen.

| Check                       | Final proof                                            | Coverage                                                                                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Route recovery              | [64 cases](evidence/public-route-080/recovery.json)    | TH/EN,1280/390, ordinary/reduced; entry failure, initial hold/failure, router hold/failure, draft preservation across query/fragment/actual locale switch, cold unknown extensionless/dotted URL; eight additional script-disabled404/Join cases |
| Application/enquiry         | [54 cases](evidence/public-route-080/acquisition.json) | Current original validation/pending/referral/duplicate/result/retry/reset behavior; Join, Home and article                                                                                                                                       |
| Ordinary public interaction | [64 cases](evidence/public-route-080/motion.json)      | All13 published routes; current menu/locale, hero/hover, brands, tabs/FAQ/TOC, journal search/recovery, imagery/readability/containment                                                                                                          |
| Reduced motion              | [58 cases](evidence/public-route-080/reduced.json)     | All13 routes; numeric duration/animation/scroll checks at both widths                                                                                                                                                                            |
| Supporting recovery         | [20 cases](evidence/public-route-080/supporting.json)  | Hydrated missing article and malformed/past-last pagination, fully settled visible error focus                                                                                                                                                   |

Total **260 passing cases**, zero final failures. Recovery checks assert actual cobalt RGB36,87,214,
actual reload navigation response and absence of unexpected hydration/runtime errors. All non-GET
requests are aborted except the acquisition driver's exact synthetic in-memory loopback fixture8871.
No real provider, protected account, production data or persistent lead write is exercised.

Node24 typecheck, lint (zero warnings), client/SSR build,13-route prerender and SEO checks pass;
[validation receipt](evidence/public-route-080/validation.json) retains their exact local logs.
Sixteen final PNGs were visually inspected and retained; desktop/mobile loading/error/404 and
initial/entry-module recovery are readable and contained. Earlier failed diagnostics are superseded.
The final report files/logs show completion; final process handles were already retired when polled.

Owned preview8870 PID77257 was stopped only after exact command/cwd verification; preview handle96730
retired143 after deliberate SIGTERM.8870/8871 have no listeners. Unrelated/native services and
retained Commerce history were untouched. Local proof is distinct from hosted revision/status,
screen-reader/physical-device, real-provider delivery/deduplication and full business acceptance.

## Diagnostics that changed the implementation

An identical-fragment anchor did not reload the document. A router transition retained the old
revealed page instead of showing its cold fallback. An undefined progress token rendered no cobalt
fill. The final implementation and assertions correct all three. A separate HydrationReady component
removes the intermediate fast-refresh lint warning. Static inert forms/native Contact cover failure
before the entry script; this supersedes the earlier bootstrap-only guard.

## Replay and next action

Use Node24 at `/Users/deuce/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin`.
Build with `VITE_PARTNER_LEAD_ENDPOINT=http://127.0.0.1:8871/lead`; serve an owned preview8870.
Read the actual `dist/revision.json` and freeze source/build during browser runs. Installed Playwright:
`/Users/deuce/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs`;
Chrome: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.

```sh
PUBLIC_ORIGIN=http://127.0.0.1:8870 PUBLIC_REVISION=<actual-build-revision> \
PLAYWRIGHT_MODULE=<installed-playwright/index.mjs> CHROMIUM_PATH=<installed-chrome> \
QA_OUTPUT=<fresh-directory> node scripts/qa/public-route-recovery.browser.mjs
```

Run the acquisition and motion drivers with the same variables; run motion once normally and once
with `QA_MOTION=reduce`. From the applications root, run the unchanged
`evidence/public-acquisition-077/supporting.browser.mjs`. Omit route/mode/width filters for full coverage.

Next: reconcile current cross-surface Dialog/Drawer/form/navigation/feedback source and rendered
evidence in Commerce's Sales/design map, then extract one substantive main-compatible presentation
batch. Notify the owner when **all agreed active design** closes. Current all-design status remains
incomplete. Deferred cashier/scanner/printer stay separate. Apply consent changes only after the
owner's actual reply; provider/hosted/full business gates remain open.

Scoped release uses the existing pipeline; retain main378a61c/prior healthy public deployment for
rollback, or revert this candidate through that pipeline. No endpoint/Auth/migration/infrastructure
change belongs to this candidate. Do not promote the coupled Commerce backend merely for UI work.
