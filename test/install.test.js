import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readlinkSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

test('packed install and update preserve topics and add new skills', t => {
  const temporary = mkdtempSync(join(tmpdir(), 'threads-test-'));
  t.after(() => rmSync(temporary, { recursive: true, force: true }));
  const repo = resolve(import.meta.dirname, '..');
  const source = join(temporary, 'source');
  const home = join(temporary, 'home');
  const storage = join(home, 'Cloud Drive');
  const installed = join(home, '.local/share/threads');
  const env = { ...process.env, HOME: home, npm_config_cache: join(temporary, 'cache') };

  for (const file of ['package.json', 'workflow.md', 'skills', 'scripts/install.js', 'scripts/sync_skills.js']) {
    cpSync(join(repo, file), join(source, file), { recursive: true });
  }
  mkdirSync(join(storage, 'topics'), { recursive: true });
  writeFileSync(join(storage, 'topics/history.jsonl'), 'existing work\n');
  mkdirSync(join(home, '.claude/skills'), { recursive: true });
  symlinkSync('/old/skills/create-thread', join(home, '.claude/skills/create-thread'));
  mkdirSync(join(home, '.codex/skills/thread-rules'), { recursive: true });
  writeFileSync(join(home, '.codex/skills/thread-rules/SKILL.md'), 'keep this local skill');

  const pack = spawnSync('npm', ['pack', '--json', '--pack-destination', temporary], {
    cwd: source, env, encoding: 'utf8', timeout: 30000,
  });
  assert.equal(pack.status, 0, pack.stderr);
  const [release] = JSON.parse(pack.stdout);
  assert(release.files.every(({ path }) =>
    path === 'package.json' || path === 'workflow.md' ||
    path.startsWith('skills/') || /^scripts\/(install|sync_skills)\.js$/.test(path)));

  const first = spawnSync('npx', ['--offline', '--yes', '--package', join(temporary, release.filename), 'threads'], {
    cwd: temporary, env, input: `${storage}\n`, encoding: 'utf8', timeout: 30000,
  });
  assert.equal(first.status, 0, first.stderr);
  assert.equal(readlinkSync(join(installed, 'topics')), join(storage, 'topics'));
  for (const agent of ['.claude', '.codex']) {
    assert.equal(readlinkSync(join(home, agent, 'skills/create-thread')), join(installed, 'skills/create-thread'));
  }
  assert.equal(readFileSync(join(home, '.codex/skills/thread-rules/SKILL.md'), 'utf8'), 'keep this local skill');

  const metadata = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'));
  metadata.version = '0.1.1';
  writeFileSync(join(source, 'package.json'), JSON.stringify(metadata));
  mkdirSync(join(source, 'skills/new-skill'));
  writeFileSync(join(source, 'skills/new-skill/SKILL.md'), 'new skill');
  writeFileSync(join(source, 'skills/create-thread/SKILL.md'), 'updated skill');
  writeFileSync(join(source, 'workflow.md'), 'updated workflow');

  const updatePack = spawnSync('npm', ['pack', '--json', '--pack-destination', temporary], {
    cwd: source, env, encoding: 'utf8', timeout: 30000,
  });
  assert.equal(updatePack.status, 0, updatePack.stderr);
  const [update] = JSON.parse(updatePack.stdout);
  const second = spawnSync('npx', ['--offline', '--yes', '--package', join(temporary, update.filename), 'threads'], {
    cwd: temporary, env, encoding: 'utf8', timeout: 30000,
  });
  assert.equal(second.status, 0, second.stderr);
  assert(!second.stdout.includes('Absolute path'));
  assert.equal(readlinkSync(join(installed, 'topics')), join(storage, 'topics'));
  assert.equal(readFileSync(join(storage, 'topics/history.jsonl'), 'utf8'), 'existing work\n');
  assert.equal(readFileSync(join(installed, 'workflow.md'), 'utf8'), 'updated workflow');
  for (const agent of ['.claude', '.codex']) {
    assert.equal(readFileSync(join(home, agent, 'skills/new-skill/SKILL.md'), 'utf8'), 'new skill');
    assert.equal(readFileSync(join(home, agent, 'skills/create-thread/SKILL.md'), 'utf8'), 'updated skill');
  }
});
