# Agent System

This is a file-based, agent-agnostic personal harness for persistent memory, knowledge accumulation, and self-improvement across sessions. Any agent that can read and write files can use this system.

**Harness home:** `~/agents` (this repo). Skills, knowledge, and system config live here. No task artifacts.

## How It Works

Work is organized into **tasks**. Each task stores its state in the **work directory** under `.tasks/<slug>/` — an append-only `history.jsonl` captures the full stream of consciousness, plus any supporting files (notes, scripts, diagrams) needed for continuity.

The harness repo (`~/agents`) is the toolkit — skills, knowledge, and this system doc. It stays clean and publishable. All task state lives with the work.

Accumulated learnings live in `~/agents/knowledge/` — one insight per file, things genuinely learned through doing.

## Task Location

Task state always lives in the work directory:

```
<work_dir>/
  .tasks/
    <slug>/
      history.jsonl          # append-only task history
      harness-notes/         # agent failure/friction notes
      <supporting files>     # notes, scripts, diagrams
    <another-slug>/
      history.jsonl
      ...
```

A work directory can have multiple tasks. Each gets its own slug folder under `.tasks/`.

- `work_dir` is wherever the actual work happens — a repo, a project folder, etc.
- If the work IS the task (research, planning, writing with no separate repo), `work_dir` is a directory the user chooses. Ask if unclear.
- The harness repo (`~/agents`) is never `work_dir` unless the user is working on the harness itself.

## History Format

`<work_dir>/.tasks/<slug>/history.jsonl` — one JSON object per line, append-only.

Fields:
- `ts` — ISO 8601 timestamp
- `type` — freeform tag (e.g., "created", "decision", "implementation", "blocker", "realization", "completed" — not an enum, use judgment)
- `agent` — who wrote this entry (e.g., "claude", "codex", "human")
- `work_dir` — (on `created` entry only) absolute path to work directory (same as parent of `.tasks/<slug>/`)
- `content` — as detailed as needed to preserve signal. No length limits. Test: "If a fresh agent reads only this history, can it continue without asking what happened?"

### When to Append

"If I stopped right now and a new agent picked this up, would they be missing something important?" If yes, append. Surprises, direction changes, choices, milestones — yes. Expected command output — probably not.

## Knowledge

`~/agents/knowledge/<topic>.md` — short standalone files. One insight per file.

The bar: **"Could an LLM or I have known this without doing the work?"** If yes, don't save it. If no, that's knowledge.

Include source task and date. Update existing files rather than duplicating.

## Sensitive Data

Task state lives in the work directory alongside the work itself. This means sensitive data stays where it belongs — in the user's private project folders, never in the harness repo.

- The harness repo (`~/agents`) should contain no personal data, secrets, credentials, financial records, PII, or similar sensitive material.
- Supporting files in `.tasks/<slug>/` should contain only what's needed for task continuity — not raw datasets or credentials.
- If a task references sensitive data, reference it by path, don't copy it into `.tasks/<slug>/`.

## Human as a Capability

The user is not just a requester — they're a capability. Humans are better at subjective judgment, real-world sensing, multi-source synthesis, knowing their own intent. Do mechanical work and things that are faster for an agent. But when the human has information you don't — or asking is faster than guessing — ask. This is a first-class feature, not a fallback.

## Skills

Skills live in `~/agents/.agents/skills/<name>/SKILL.md`. Each skill starts by reading this file for system context.

Symlinked for global discovery: `~/.claude/skills/`, `~/.codex/skills/` (absolute symlinks to canonical).

Run `~/agents/scripts/sync-skills.sh` after adding or removing skills.

Available skills:
- `/create-task` — start new work
- `/resume-task` — continue previous work (user drives)
- `/implement-task` — continue previous work (agent drives, user reviews)
- `/finalize-task` — compress history, extract knowledge, improve the system
- `/harness-note` — capture agent failure or friction for later improvement
- `/improve-harness` — improve the harness based on accumulated notes and patterns
