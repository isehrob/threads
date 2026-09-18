#!/usr/bin/env node

import { lstatSync, mkdirSync, readdirSync, readlinkSync, symlinkSync, unlinkSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export function syncSkills() {
  const canonical = join(homedir(), '.local/share/threads/skills');
  const skills = readdirSync(canonical, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  for (const agent of ['.claude', '.codex']) {
    const target = join(homedir(), agent, 'skills');
    mkdirSync(target, { recursive: true });

    for (const skill of skills) {
      const source = join(canonical, skill);
      const link = join(target, skill);
      const current = lstatSync(link, { throwIfNoEntry: false });
      if (current?.isSymbolicLink()) {
        if (readlinkSync(link) === source) {
          console.log(`EXISTS: ${link} -> ${source}`);
          continue;
        }
        unlinkSync(link);
      } else if (current) {
        console.log(`SKIP: ${link} exists and is not a symlink`);
        continue;
      }
      symlinkSync(source, link, 'dir');
      console.log(`ADDED: ${link} -> ${source}`);
    }
  }
}

if (import.meta.main) {
  syncSkills();
}
