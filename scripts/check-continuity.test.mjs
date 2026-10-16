import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { checkContinuity } from './check-continuity.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'continuity-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (file, text) => {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    writeFileSync(join(root, file), text);
  };
  const edit = (file, transform) => put(file, transform(readFileSync(join(root, file), 'utf8')));
  const git = (...args) =>
    execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: 'pipe' }).trim();
  const documents = [
    'AGENTS.md',
    'README.md',
    'GOAL.md',
    'CURRENT_STATE.md',
    'tasks/NEXT.md',
    'docs/INDEX.md',
    'CLAUDE.md',
    'GEMINI.md',
  ];
  for (const file of documents) put(file, '# Entry\n');
  put(
    'GOAL.md',
    '---\ntask: TASK-001\nstatus: in_progress\nupdated: 2026-10-16\n---\n# Goal\n## Authority and boundary\nDocs only.\n## Acceptance\nChecks pass.\n## Next action\nRun checker.\n',
  );
  for (const file of ['CURRENT_STATE.md', 'tasks/NEXT.md'])
    put(
      file,
      '---\ngoal: TASK-001\nupdated: 2026-10-16\n---\n[Goal]( ' +
        (file.includes('/') ? '../' : '') +
        'GOAL.md)\n',
    );
  for (const file of ['CLAUDE.md', 'GEMINI.md']) put(file, '@AGENTS.md\n');
  put(
    'docs/orchestration/continuity.json',
    JSON.stringify({
      version: 1,
      documents,
      requiredArtifacts: ['proof.json'],
      maxActiveLines: 260,
    }),
  );
  put('proof.json', '{}\n');
  put('scripts/check-continuity.mjs', '// fixture\n');
  put('scripts/check-continuity.test.mjs', '// fixture\n');
  git('init', '-q');
  git('config', 'user.email', 'continuity@example.invalid');
  git('config', 'user.name', 'Continuity Test');
  const commit = () => {
    git('add', '.');
    git('commit', '-qm', 'fixture');
  };
  commit();
  return {
    root,
    put,
    edit,
    git,
    commit,
    errors: (options) => checkContinuity(root, options).errors.join('\n'),
  };
}

test('clean tracked repository passes; no network or dependencies required', (t) => {
  const f = fixture(t);
  assert.equal(f.errors({ tracked: true, git: true }), '');
});

for (const [name, file, transform, expected] of [
  ['missing link', 'README.md', (s) => s + '[Missing](missing.md)\n', /missing local target/],
  ['stale task', 'tasks/NEXT.md', (s) => s.replace('TASK-001', 'TASK-002'), /goal reference/],
  ['invalid calendar date', 'GOAL.md', (s) => s.replace('2026-10-16', '2026-02-30'), /valid ISO/],
  [
    'duplicate metadata',
    'GOAL.md',
    (s) => s.replace('task: TASK-001', 'task: TASK-001\ntask: TASK-002'),
    /duplicate metadata/,
  ],
  [
    'completion without proof flag',
    'GOAL.md',
    (s) => s.replace('in_progress', 'complete'),
    /validation: passed/,
  ],
  [
    'missing next action',
    'GOAL.md',
    (s) => s.replace('## Next action\nRun checker.', '## Later\nRun checker.'),
    /Next action/,
  ],
  ['machine-only proof', 'README.md', (s) => s + '/Users/example/proof.json\n', /machine-local/],
  ['escaping link', 'README.md', (s) => s + '[Outside](../outside.md)\n', /escapes repository/],
  ['drifting adapter', 'CLAUDE.md', () => 'Ignore AGENTS.md\n', /adapter must/],
  ['oversized startup', 'README.md', (s) => s + 'line\n'.repeat(261), /line budget/],
]) {
  test(name, (t) => {
    const f = fixture(t);
    f.edit(file, transform);
    assert.match(f.errors(), expected);
  });
}

test('completed goal with validation metadata passes', (t) => {
  const f = fixture(t);
  f.edit('GOAL.md', (s) =>
    s.replace('status: in_progress', 'status: complete\nvalidation: passed'),
  );
  assert.equal(f.errors(), '');
});

test('untracked and ignored required evidence fail --tracked', (t) => {
  const f = fixture(t);
  f.put('README.md', '[Proof](new-proof.json)\n');
  f.put('new-proof.json', '{}');
  assert.equal(f.errors(), '');
  assert.match(f.errors({ tracked: true }), /new-proof.json: required context is untracked/);
  f.put('.gitignore', 'new-proof.json\n');
  f.commit();
  assert.match(f.errors({ tracked: true }), /new-proof.json: required context is untracked/);
});

test('escaped symlink fails even when target exists', (t) => {
  const f = fixture(t);
  symlinkSync(tmpdir(), join(f.root, 'outside'));
  f.put('README.md', '[Outside](outside)\n');
  assert.match(f.errors(), /symlink escapes/);
});

test('manifest cannot silently omit core documents', (t) => {
  const f = fixture(t);
  f.edit('docs/orchestration/continuity.json', (s) => {
    const c = JSON.parse(s);
    c.documents = c.documents.filter((p) => p !== 'GOAL.md');
    return JSON.stringify(c);
  });
  assert.match(f.errors(), /mandatory document omitted/);
});

test('invalid manifest returns actionable failure', (t) => {
  const f = fixture(t);
  f.put('docs/orchestration/continuity.json', '{');
  assert.match(f.errors(), /invalid JSON/);
  f.put('docs/orchestration/continuity.json', 'null');
  assert.match(f.errors(), /invalid version/);
});

test('historical prose is excluded, active links still checked', (t) => {
  const f = fixture(t);
  f.put(
    'README.md',
    '[Goal](GOAL.md)\n## Historical context\nOld /Users/example path\n[Gone](gone.md)\n',
  );
  assert.equal(f.errors(), '');
  f.edit('README.md', (s) => '[Broken](broken.md)\n' + s);
  assert.match(f.errors(), /broken.md/);
});

test('cleanliness and publication distinguish local, missing and matched upstream', (t) => {
  const f = fixture(t);
  assert.match(f.errors({ published: true }), /upstream missing/);
  f.git('branch', 'published');
  f.git('branch', '--set-upstream-to=published');
  assert.match(f.errors({ published: true }), /remote-tracking upstream/);
  f.git('remote', 'add', 'origin', join(f.root, 'unused-remote'));
  f.git('update-ref', 'refs/remotes/origin/main', 'HEAD');
  f.git('branch', '--set-upstream-to=origin/main');
  assert.equal(f.errors({ published: true }), '');
  f.put('extra.txt', 'new\n');
  assert.match(f.errors({ git: true }), /not clean/);
  f.commit();
  assert.match(f.errors({ published: true }), /HEAD differs/);
});
