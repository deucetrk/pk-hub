---
task: PKHUB-MOTION-001
status: in_progress
validation: passed
updated: 2026-10-20
---
# Active goal: bring pkhub.co to life

Build the owner's motion plan (2026-10-20, items 1–6) into the live v1 site: brand billboard,
hero entrance, live Stock on Demand demo, scroll reveals with confirmed count-ups, hover/press
feedback and frosted nav, brand filter and a mobile join bar. Only transform/opacity animation,
reduced motion shows final states, no new animation library.

## Boundary

UI only: no intake, data, configuration or credential change. Publishing (merging to `main`, which
deploys pkhub.co) needs the owner's go-ahead. Rollback: revert the merge or Vercel instant
rollback to `5a41555`.

## Acceptance and evidence

[PKHUB-MOTION-20261020](docs/evidence/PKHUB-MOTION-20261020.md): before/after LCP, CLS, TBT and
interaction latency, reduced-motion and keyboard checks, rendered review at 390 and 1440 px.

## Next action

Owner approves PR #17 → merge, verify `https://pkhub.co/revision.json` serves the merge SHA and
the routes return 200, record it in CURRENT_STATE.md, then mark this goal complete.

## Previous outcome

PKHUB-V1-REDESIGN-001 shipped `3eecd30` (2026-10-18); see
[PKHUB-V1-REDESIGN-20261019](docs/evidence/PKHUB-V1-REDESIGN-20261019.md).
