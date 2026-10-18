---
task: PKHUB-V1-REDESIGN-001
status: in_progress
validation: passed
updated: 2026-10-19
---
# Active goal: ship the approved v1 public design

Rebuild pkhub.co to the owner-approved v1 design (Paper file `01M574A45Y9KY0KNPKJGP83B4Z`,
page "pkhub.co · Site · Desktop", boards 01–15, plus "pkhub.co · Design spec"). Approval and the
owner-confirmed service facts are recorded in Commerce
[PKHUB-CODEX-DESIGN-REVIEW-20261018](https://github.com/deucetrk/PK-Commerce/blob/main/docs/evidence/PKHUB-CODEX-DESIGN-REVIEW-20261018.md)
and the [partner-acquisition domain](https://github.com/deucetrk/PK-Commerce/blob/main/docs/domains/partner-acquisition/README.md).

## Authority and boundary

Owner instruction 2026-10-19: "do 1,2,3 and mobile designs end to end" and "commit and publish as
well" authorizes implementing the approved design and publishing it through the connected
GitHub/Vercel pipeline. It does not authorize real lead submissions, intake/provider changes,
credential or configuration changes, or a privacy notice without legal text (board 14 is not
shipped). Product routes stay `noindex` as before.

## Acceptance

- Home, products hub, 9 product/service routes, join (with all states), contact, blog index and
  404 follow v1; Thai and English; desktop and 375px mobile without horizontal overflow.
- Intake contract unchanged: same payload, honeypot, receipt verification; a retry reuses the
  request ID and edited details get a new one. Brands are optional (design).
- Node 24 `check`, `lint`, `test`, `build`, `seo:validate` pass; rendered states inspected.
- After merge, `https://pkhub.co/revision.json` serves the merged SHA and routes return 200.

## Recovery

Previous production revision: `77c4f1823574e720468518669d28b9a87954afa2`. Roll back with Vercel
instant rollback to that deployment, or revert the merge commit on `main` and let the pipeline
rebuild. No data, schema or configuration is changed by this release.

## Next action

After the merge deploys, verify the live revision and routes, record them in
[CURRENT_STATE.md](CURRENT_STATE.md) and [evidence](docs/evidence/PKHUB-V1-REDESIGN-20261019.md),
then mark this goal complete. Mobile Paper boards follow in the Commerce design file.
