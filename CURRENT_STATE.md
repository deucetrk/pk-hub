---
goal: PKHUB-V1-REDESIGN-001
updated: 2026-10-19
---
# Current repository state

[GOAL.md](GOAL.md) owns the active outcome and exact next action.
[Continuity evidence](docs/evidence/AGENT-CONTINUITY-20261016.md) records current validation.

Last observed application release: `c1375508f6cc4f223668735820ebffde05338d19` at
2026-10-15T15:38:44Z, observed alongside Commerce `14c675887e7ba7904afdb99b2edddea456151a46`.
[Portable proof](docs/evidence/three-surface-release-20261015.json) includes CI and revision
observations. New documentation commits do not automatically re-attest a deployment.

The site has Home, Join, Dealer gateway, product/service and Thai blog routes. Intake requires
a verified matching receipt; configuration and real provider delivery remain separate checks.
Native reduced-motion/screen-reader/physical-device and authenticated per-role business
acceptance were not completed by the last release. Do not convert those gaps into new permission.

In progress: the [v1 redesign](GOAL.md) on `claude/pkhub-v1-redesign`; production still serves
`77c4f18` until that branch merges.
