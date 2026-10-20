---
task: PKHUB-MOBILE-PAINT-001
status: complete
validation: passed
updated: 2026-10-20
---
# Active goal: faster mobile first paint on pkhub.co

Owner go-ahead 2026-10-20 ("ok just go for it first"): cut what delays the first mobile paint
without losing any v1 visual, motion or reduced-motion behaviour.

## Authority and boundary

Front-end build and static assets only: no intake, data, configuration or credential change.
Publishing (merging to `main`, which deploys pkhub.co) waits for the owner's go-ahead. Rollback:
revert the merge or Vercel instant rollback to `f4f2ae1`.

## Acceptance

[PKHUB-MOBILE-PAINT-20261020](docs/evidence/PKHUB-MOBILE-PAINT-20261020.md): before/after FCP,
LCP, CLS and interaction latency; motion and reduced-motion checks; Node 24 validation.

## Outcome

PR #19 merged as `a10891cbe012b5e84fc2dd082d9ac9d3805405c0`; pkhub.co served it at
2026-10-20T06:21:21Z. Live mobile LCP under the PR's throttling fell from 1876 ms to 1108 ms.
See the [evidence](docs/evidence/PKHUB-MOBILE-PAINT-20261020.md).

## Next action

Owner review of the live site. Open items: privacy notice text (board 14) and the TikTok handle;
then the first READY item in [the queue](tasks/NEXT.md).

## Previous outcome

PKHUB-MOTION-001 shipped `f4f2ae1`; see [motion evidence](docs/evidence/PKHUB-MOTION-20261020.md).
