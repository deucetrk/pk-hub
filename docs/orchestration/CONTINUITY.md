# Public repository continuity

This is the local application of
[Commerce ADR0054](https://github.com/deucetrk/PK-Commerce/blob/main/docs/decisions/ADR-0054-repository-agent-continuity.md).
Upstream authority is owner-approved requirements/design; midstream coordination is goal, queue
and index; downstream proof is source, tests, CI and rendered acceptance.

GOAL.md frontmatter owns task, status and updated. CURRENT_STATE.md and tasks/NEXT.md reference
that goal. Complete requires validation: passed. Goal owns the exact next action; this contract
and the manifest do not duplicate it. Historical prose never grants current permission.

Run from root on Node24:
- `node scripts/check-continuity.mjs`
- `node --test scripts/check-continuity.test.mjs`
- `node scripts/check-continuity.mjs --tracked` after staging intended context
- `node scripts/check-continuity.mjs --tracked --git` after commit
- Fetch after authorized push, then `node scripts/check-continuity.mjs --published`

The checker validates listed active documents, direct local links, adapters, metadata and portable
required artifacts. `## Historical context` ends the active part of a document. It cannot verify
arbitrary prose, remote URLs, deployed revisions, provider permissions or business acceptance.
`--published` compares the current branch against its fetched upstream and never accesses network.
A clean tracked export with no local environment/evidence is used for the no-chat fresh-agent test.

Codex/Cursor/Antigravity can discover AGENTS.md. CLAUDE.md and GEMINI.md import it using
`@AGENTS.md` at root and website scope. Keep adapters as pointers; do not duplicate rules.
Actual loading in another installed provider requires a separate smoke test. The research,
official provider sources and remaining orchestration gaps live in the
[shared assessment](https://github.com/deucetrk/PK-Commerce/blob/main/docs/orchestration/AGENTIC_DEVELOPMENT_ASSESSMENT.md).
No fleet service, persistent memory service or automatic production permission is added.
