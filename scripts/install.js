#!/usr/bin/env node

import { copyFileSync, cpSync, lstatSync, mkdirSync, readlinkSync, symlinkSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { syncSkills } from './sync_skills.js';

const source = resolve(import.meta.dirname, '..');
const destination = join(homedir(), '.local/share/threads');
const topicsLink = join(destination, 'topics');

mkdirSync(destination, { recursive: true });

if (!lstatSync(topicsLink, { throwIfNoEntry: false })) {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const parent = await prompt.question('Absolute path of the folder to create topics in: ');
  prompt.close();
  const topics = resolve(parent, 'topics');
  mkdirSync(topics, { recursive: true });
  symlinkSync(topics, topicsLink, 'dir');
}
console.log(`Topics: ${topicsLink} -> ${readlinkSync(topicsLink)}`);

cpSync(join(source, 'skills'), join(destination, 'skills'), { recursive: true });
copyFileSync(join(source, 'workflow.md'), join(destination, 'workflow.md'));
syncSkills();
