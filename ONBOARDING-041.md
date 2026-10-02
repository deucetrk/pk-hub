# Public onboarding interaction correction — 041

Date: 2026-10-03. Whole ecosystem goal remains IN PROGRESS.

## Actual route and source

The public website's `PartnerForm` is the canonical Join application and Home/article enquiry
surface. Commerce `/join` redirects here under accepted ADR-0029; its old registration UI is
unserved. The existing opaque Apps Script transport cannot prove that PK recorded a submission.
Current receipt copy distinguishes sending from this device, PK review and later Dealer access.

The four-file correction freezes editable fields/brands/consent during dispatch, guards synchronous
double submission, captures the original request for its result, resets optional/error state for a
new application, gives brands 44px targets and keeps the focused result below the sticky header.
The original payload, referral, request ID lifetime, service, consent purpose and LINE handoff
remain unchanged. A browser duplicate guard is not provider deduplication or a delivery receipt.

## Evidence and limits

Sixteen baseline observations at 1280/390px across Thai/English Join/Home reproduced changed
pending drafts and two synchronous dispatches. Sixty-four final browser cases pass: layout,
synthetic completion, network failure, invalid required fields, collapsed invalid optional email,
double submission, reset and focused-result visibility. Pending fields are disabled, errors retain
drafts and focus, the original snapshot is displayed, and all final cases contain document width
without runtime errors. The first mobile focus review failed; SuccessCard scroll/focus was corrected
before the final 64-case pass. These are actual source components on Vite with a local intercepted
endpoint and synthetic store/contact values. All nonloopback traffic was blocked; no real lead
was submitted and externally loaded font appearance is not proved by these screenshots.

Node 24 check, lint, client/SSR build, thirteen-route prerender and SEO validation pass. Raw local
results: `/tmp/pkhub-onboarding-041-{baseline,final}-results.json` and matching browser logs;
screenshots: `/tmp/pkhub-onboarding-041-layout-{th,en}-{join,home}-{1280,390}.png`.
Durable detailed results and selected screenshots are routed from Commerce evidence 041.

## Source, release and recovery

Source `7ded9b2e0459d1156a8e5357c06e665c900b7ea6` passes exact CI `37059175827`; PR #8 is merged
as main `5fad92aae02465a91c35220d223780b1277da63d`, whose exact CI `37059321202` also succeeds.
Applications Preview deployment `6817304761` succeeds, but direct app reads redirect to SSO;
this does not prove hosted form acceptance. All three main production contexts (pk-hub, website,
applications) report `Deployment rate limited — retry in 24 hours`. Do not claim this correction
is on production. Prior healthy public production is `acf36134a6a9a524ae2709304c099c56b446030d`.

The owner authorized the scoped code release through the connected GitHub/Vercel pipeline.
Recovery: restore the prior healthy deployment or revert PR #8 and rebuild through that pipeline;
no data reversal is needed. No provider/configuration/database/credential/account/policy or live
business-data write is included. Consent approval, provider receipt/deduplication and full protected
Sales acceptance remain open. Next: release existing main when provider creation permits it,
verify exact production metadata/assets and public route/focus behavior without a live submission.
