# PK HUB public website

Start with [AGENTS.md](AGENTS.md), [GOAL.md](GOAL.md) and [the knowledge index](docs/INDEX.md).
Application commands run from `website/`; continuity commands run from the repository root.
[Application instructions](website/AGENTS.md) describe routes, intake boundaries and validation.

Use Node 24. Run `node scripts/check-continuity.mjs` and
`node --test scripts/check-continuity.test.mjs` without installing dependencies.
Then `cd website`, `npm ci`, `npm run check`, `npm run lint`, `npm test`,
`npm run build` and `npm run seo:validate`.

The checked-in [release observation](docs/evidence/three-surface-release-20261015.json) is dated,
not a claim about the latest deployed documentation commit.
