import { readFileSync, existsSync, realpathSync, statSync } from 'node:fs';
import { resolve, relative, dirname, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const core = [
  'AGENTS.md',
  'README.md',
  'GOAL.md',
  'CURRENT_STATE.md',
  'tasks/NEXT.md',
  'docs/INDEX.md',
];
const configPath = 'docs/orchestration/continuity.json';
const activeText = (text) => text.replaceAll('\r\n', '\n').split(/^## Historical context\s*$/m)[0];

export function checkContinuity(root, options = {}) {
  root = realpathSync(root);
  const errors = [];
  const checked = new Set();
  const fail = (file, message) => errors.push(`${file}: ${message}`);
  const git = (...args) =>
    execFileSync('git', ['-C', root, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  const inside = (path) => {
    const rel = relative(root, path);
    return rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
  };
  const inspect = (name, from = configPath) => {
    const path = resolve(root, name);
    if (!inside(path)) {
      fail(from, `path escapes repository: ${name}`);
      return;
    }
    if (!existsSync(path)) {
      fail(from, `missing local target: ${name}`);
      return;
    }
    if (!inside(realpathSync(path))) {
      fail(from, `symlink escapes repository: ${name}`);
      return;
    }
    checked.add(relative(root, path).replaceAll('\\', '/'));
    return path;
  };
  let config;
  try {
    config = JSON.parse(readFileSync(resolve(root, configPath), 'utf8'));
  } catch {
    return { errors: [`${configPath}: missing or invalid JSON`], checked: 0 };
  }
  if (
    !config ||
    config.version !== 1 ||
    !Array.isArray(config.documents) ||
    !Array.isArray(config.requiredArtifacts) ||
    !Number.isInteger(config.maxActiveLines) ||
    config.maxActiveLines < 20 ||
    config.maxActiveLines > 500 ||
    [...(config.documents ?? []), ...(config.requiredArtifacts ?? [])].some(
      (p) => typeof p !== 'string',
    )
  ) {
    return {
      errors: [`${configPath}: invalid version, lists or line budget (20..500)`],
      checked: 0,
    };
  }
  for (const file of core)
    if (!config.documents.includes(file)) fail(configPath, `mandatory document omitted: ${file}`);
  inspect(configPath);
  inspect('scripts/check-continuity.mjs');
  inspect('scripts/check-continuity.test.mjs');
  const texts = new Map();
  for (const file of new Set([...core, ...config.documents])) {
    const path = inspect(file);
    if (!path || !statSync(path).isFile()) {
      fail(file, 'expected document file');
      continue;
    }
    const text = activeText(readFileSync(path, 'utf8'));
    texts.set(file, text);
    if (text.split('\n').length > config.maxActiveLines)
      fail(
        file,
        'active entry point exceeds line budget; move detail to canonical linked documents',
      );
    if (/(?:\/Users\/|\/home\/|[A-Z]:\\|file:\/\/)/.test(text))
      fail(file, 'replace machine-local dependency with repository path or durable URL');
    for (const match of text.matchAll(/!?\[[^\]]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+"[^"]*")?\s*\)/g)) {
      let target = match[1].replace(/^<|>$/g, '');
      if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
      if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
        fail(file, `unsupported link scheme: ${target}`);
        continue;
      }
      try {
        target = decodeURIComponent(target.split(/[?#]/)[0]);
      } catch {
        fail(file, 'malformed URL encoding');
        continue;
      }
      if (target) inspect(relative(root, resolve(dirname(path), target)), file);
    }
    if (/(?:^|\/)(?:CLAUDE|GEMINI)\.md$/.test(file)) {
      if (text.trim() !== '@AGENTS.md') fail(file, 'adapter must contain only @AGENTS.md');
      inspect(relative(root, resolve(dirname(path), 'AGENTS.md')), file);
    }
  }
  for (const file of config.requiredArtifacts) inspect(file);
  const metadata = (file) => {
    const text = texts.get(file) ?? '';
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    const values = {};
    if (!match) {
      fail(file, 'missing frontmatter');
      return values;
    }
    for (const line of match[1].split(/\r?\n/)) {
      const entry = line.match(/^([a-z]+): ([A-Za-z0-9_-]+)$/);
      if (!entry || Object.hasOwn(values, entry[1])) {
        fail(file, 'malformed or duplicate metadata');
        continue;
      }
      values[entry[1]] = entry[2];
    }
    const date = values.updated;
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') ||
      !Number.isFinite(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date
    )
      fail(file, 'updated must be a valid ISO calendar date');
    return values;
  };
  const goal = metadata('GOAL.md');
  if (!/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/.test(goal.task ?? ''))
    fail('GOAL.md', 'task must be a stable uppercase task ID');
  if (!['in_progress', 'blocked', 'complete'].includes(goal.status))
    fail('GOAL.md', 'invalid status');
  if (goal.status === 'complete' && goal.validation !== 'passed')
    fail('GOAL.md', 'complete requires validation: passed');
  for (const header of ['Authority and boundary', 'Acceptance', 'Next action']) {
    const sections = (texts.get('GOAL.md') ?? '').split(`## ${header}\n`);
    if (sections.length !== 2 || !sections[1].split('\n## ')[0].trim())
      fail('GOAL.md', `require one nonempty ${header} section`);
  }
  for (const file of ['CURRENT_STATE.md', 'tasks/NEXT.md']) {
    if (metadata(file).goal !== goal.task) fail(file, 'goal reference does not match GOAL.md task');
  }
  if (options.tracked || options.git || options.published) {
    try {
      const tracked = new Set(git('ls-files', '-z').split('\0').filter(Boolean));
      for (const file of checked) {
        const dir = statSync(resolve(root, file)).isDirectory();
        if (!(dir ? [...tracked].some((p) => p.startsWith(file + '/')) : tracked.has(file)))
          fail(file, 'required context is untracked/ignored; include it in scoped commit');
      }
      if (
        (options.git || options.published) &&
        git('status', '--porcelain', '--untracked-files=all')
      )
        fail('git', 'working tree is not clean');
      if (options.published) {
        if (!git('rev-parse', '--symbolic-full-name', '@{upstream}').startsWith('refs/remotes/'))
          fail('git', 'publication requires a remote-tracking upstream, not a local branch');
        if (git('rev-parse', 'HEAD') !== git('rev-parse', '@{upstream}'))
          fail('git', 'HEAD differs from upstream; fetch and reconcile publication');
      }
    } catch {
      fail(
        'git',
        'Git check failed or upstream missing; configure upstream and fetch before --published',
      );
    }
  }
  return { errors, checked: checked.size };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const known = new Set(['--tracked', '--git', '--published']);
  if (args.some((arg) => !known.has(arg))) {
    console.error('Usage: node scripts/check-continuity.mjs [--tracked] [--git] [--published]');
    process.exitCode = 1;
  } else {
    const result = checkContinuity(resolve(dirname(fileURLToPath(import.meta.url)), '..'), {
      tracked: args.includes('--tracked'),
      git: args.includes('--git'),
      published: args.includes('--published'),
    });
    for (const error of result.errors) console.error(error);
    console.log(
      `Continuity ${result.errors.length ? 'FAIL' : 'PASS'}: ${result.checked} local paths, ${result.errors.length} errors`,
    );
    process.exitCode = result.errors.length ? 1 : 0;
  }
}
