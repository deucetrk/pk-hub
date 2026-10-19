---
task: PKHUB-MOTION-001
status: complete
validation: passed
updated: 2026-10-20
---
# Active goal: bring pkhub.co to life

Build the owner's motion plan (2026-10-20, items 1–6) into the live v1 site: brand billboard,
hero entrance, live Stock on Demand demo, scroll reveals with confirmed count-ups, hover/press
feedback and frosted nav, brand filter and a mobile join bar. Only transform/opacity animation,
reduced motion shows final states, no new animation library.

## Authority and boundary

UI only: no intake, data, configuration or credential change. Publishing (merging to `main`, which
deploys pkhub.co) needs the owner's go-ahead. Rollback: revert the merge or Vercel instant
rollback to `5a41555`.

## Acceptance

[PKHUB-MOTION-20261020](docs/evidence/PKHUB-MOTION-20261020.md): before/after LCP, CLS, TBT and
interaction latency, reduced-motion and keyboard checks, rendered review at 390 and 1440 px.

## Outcome

PR #17 merged as `f4f2ae10130553a90d71ec7535cc2e02523b5aec`; pkhub.co served it at
2026-10-19T17:56:46Z. Live checks and measurements are in the
[evidence](docs/evidence/PKHUB-MOTION-20261020.md).

## Next action

Mobile first paint is ~4.0s on Lighthouse's simulated slow 4G before and after this release; the
cause is render-blocking CSS (including unused V7 styles). Reducing it is the next performance
task in [the queue](tasks/NEXT.md).

## Previous outcome

PKHUB-V1-REDESIGN-001 shipped `3eecd30` (2026-10-18); see
[PKHUB-V1-REDESIGN-20261019](docs/evidence/PKHUB-V1-REDESIGN-20261019.md).
