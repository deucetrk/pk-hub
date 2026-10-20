---
task: PKHUB-MOBILE-PAINT-001
status: in_progress
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

## Next action

Owner approves the PR → merge, verify `https://pkhub.co/revision.json`, re-measure live mobile
LCP/CLS and record it in CURRENT_STATE.md and the evidence, then mark this goal complete.

## Previous outcome

PKHUB-MOTION-001 shipped `f4f2ae1`; see [motion evidence](docs/evidence/PKHUB-MOTION-20261020.md).
