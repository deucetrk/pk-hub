# PK HUB repository agent contract

The repository is project memory. Start at its Git root, not a machine-specific checkout.

## Cold start and authority

Read [GOAL.md](GOAL.md) and [docs/INDEX.md](docs/INDEX.md), inspect Git status/log/diff, then
follow only the relevant owning source and tests. Run `node scripts/check-continuity.mjs`.
Read [CURRENT_STATE.md](CURRENT_STATE.md) when release state matters and [tasks/NEXT.md](tasks/NEXT.md)
when selecting work. Historical approval and release records are dated evidence, not standing
permission. A completed goal does not authorize a new feature or production action.

Owner-confirmed business rules and accepted design decisions outrank summaries. Code, contracts
and tests prove current implementation; record mismatches instead of inventing missing behavior.
The public site routes to Commerce; it never owns stock, price, permissions, payment or eligibility.
Cross-product architecture lives in the linked Commerce knowledge base in docs/INDEX.md.

## Scope and safety

Build/fix requests authorize implementation inside accepted scope. Production deployment,
configuration, credentials, provider changes and real lead/business writes require explicit
current scope, recovery and verification. Never put secrets or customer data into evidence.
Preserve dirty/unrelated work. Use an isolated clean branch; inspect scoped diffs before commit/push.
Do not treat a successful submission transport, build or deployment URL as business acceptance.

Read [website/AGENTS.md](website/AGENTS.md) for the application's actual commands and boundaries.
For UI changes read its design contract and inspect rendered desktop/mobile, keyboard, loading,
failure/recovery and reduced-motion states. Record skipped acceptance honestly.

## Closeout

Keep one active outcome in GOAL.md and one exact next action. Update only documents whose meaning
changed. A narrative handoff is needed only if goal, Git and linked evidence cannot explain the
remaining work. Use relative tracked paths or durable URLs for essential evidence.

Use Node 24. Run the continuity checker and its tests, then proportional application checks.
Before publication run `node scripts/check-continuity.mjs --tracked`; after commit use `--git`,
and after push/fetch use `--published`. A push is not CI, deployment or business verification.
[Continuity contract](docs/orchestration/CONTINUITY.md) defines the check's limits.
