# Agent continuity evidence — 2026-10-16

Baseline main: `c1375508f6cc4f223668735820ebffde05338d19`; clean before scoped implementation.
Dirty Desktop donor preserved. Application source and production configuration are unchanged.

Root and website instructions now reflect multiple routes, receipt-verified CORS intake and the
existing sixteen intake tests. Current goal/state/index/queue and instruction imports make the
repository independently readable. Stale no-deployment closeout is corrected; historical design
release notes are distinguished from current state. CI runs continuity checks and existing tests.

## Validation

PASS on Node 24.21.0: continuity check (27 local paths), 18 fixtures, application check/lint,
16 intake tests, client/SSR/prerender build and SEO validation.

First no-history evaluator /root/cold_start_acceptance reconstructed both repositories without
a recap. Public snapshot manifest SHA256:
46c14ea3a74e61a91a4f4d3f00796db6e79b93903e01b4f4aa4f40b3d1476c04.
Checker, 18 fixtures and 16 intake tests passed; --published failed as expected without a remote.
It found a Commerce-only relative JSON evidence reference and a historical donor-path instruction;
both are corrected. Commerce additionally corrected its handoff matrix, stale map and historical
identifier. Evaluation had no inherited chat; input was repository roots and a read-only
reconstruction request, with no answers or reading order. Memory, network and live systems were
excluded by instruction, not an OS sandbox.

Independent corrected-export evaluation: PASS for continuation and document coherence by
/root/cold_start_verified with fork_turns=none. No blocking contradiction or unavailable required
context. Public source commit 6a15c586eed7a3e46ae1f9fbd68360080c8981b5, 347 tracked files;
manifest SHA256 8ce5672da4fb2df0ee8dda0ca1c5477dc15fb198ba85b45f40b0dced40d7a552.
Commerce source commit df7d96bacaf391700e622d98d936c79e4ddde2be was evaluated alongside it.
The independent evaluator recovered task, authority, next action, dated release and open gates;
Node24 checker, --tracked --git, 18 fixtures and 16 intake tests passed with clean Git state.
No remote exists in the export, so --published correctly failed. Reproduce source with git archive.
Manifest digest is SHA256 of compact, sorted-key JSON containing sorted {path, sha256} file entries.
The later CRLF/path-separator correction passed 19/19 local fixtures; remaining edits record closeout.

Source commits were pushed/fetched; --published passed in the real worktree.
[PR14](https://github.com/deucetrk/pk-hub/pull/14) retains final commits and latest-head CI.
[Commerce PR49](https://github.com/deucetrk/PK-Commerce/pull/49) carries shared research/ADR and
the fuller paired evaluation. Publication is distinct from hosted business acceptance.
Follow [GOAL.md](../../GOAL.md) for subsequent work.

## Limits

External provider instruction loading has not been live-tested. This does not close real provider
delivery, native accessibility or business acceptance. No scheduler or live mutation is included.
