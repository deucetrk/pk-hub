---
goal: PKHUB-BLOG-SEO-001
updated: 2026-10-20
---
# Current repository state

[GOAL.md](GOAL.md) owns the active outcome and exact next action.
[Continuity evidence](docs/evidence/AGENT-CONTINUITY-20261016.md) records current validation.

Latest observed pkhub.co revision: `dfbe776d1353a33cadb74fcbce1816cb94714041` (PR #21, SEO/AEO)
at 2026-10-20T16:14:14Z; see [SEO evidence](docs/evidence/PKHUB-SEO-20261020.md).

Last observed application release: `c1375508f6cc4f223668735820ebffde05338d19` at
2026-10-15T15:38:44Z, observed alongside Commerce `14c675887e7ba7904afdb99b2edddea456151a46`.
[Portable proof](docs/evidence/three-surface-release-20261015.json) includes CI and revision
observations. New documentation commits do not automatically re-attest a deployment.

The site has Home, Join, Dealer gateway, product/service and Thai blog routes. Intake requires
a verified matching receipt; configuration and real provider delivery remain separate checks.
Native reduced-motion/screen-reader/physical-device and authenticated per-role business
acceptance were not completed by the last release. Do not convert those gaps into new permission.

v1 redesign released: PR #15 merged as `3eecd30d17047d08fd120c93e8a99ef102ff4df9`; pkhub.co
`/revision.json` served it at 2026-10-18T19:37:53Z, 17 public routes returned 200 and an unknown
route 404. Rollback target: `77c4f18`. Real intake delivery was not exercised.
[Evidence](docs/evidence/PKHUB-V1-REDESIGN-20261019.md).

Motion released: PR #17 merged as `f4f2ae10130553a90d71ec7535cc2e02523b5aec`; `/revision.json` served it
at 2026-10-19T17:56:46Z, 17 routes returned 200 and an unknown route 404. Rollback target: `5a41555`.
[Evidence](docs/evidence/PKHUB-MOTION-20261020.md).

Mobile paint released: PR #19 merged as `a10891cbe012b5e84fc2dd082d9ac9d3805405c0`; `/revision.json`
served it at 2026-10-20T06:21:21Z; 19 routes returned 200 and an unknown route 404. Live mobile
LCP 1108 ms (was 1876 ms) under slow 4G + 4× CPU. Rollback target: `f4f2ae1`.
[Evidence](docs/evidence/PKHUB-MOBILE-PAINT-20261020.md).
