# Agent System

This is a file-based, agent-agnostic personal harness for persistent memory, knowledge accumulation, and self-improvement across sessions. Any agent that can read and write files can use this system.

**Brain home:** `~/agents` (this repo). All tasks, history, knowledge, and skills live here.

## How It Works

Work is organized into **tasks**. Each task has a folder at `~/agents/tasks/<slug>/` with an append-only `history.jsonl` that captures the full stream of consciousness — decisions, progress, blockers, realizations, everything needed for a fresh agent to continue the work without asking what happened.

Tasks can have **supporting files** (notes, scripts, diagrams) in their folder. History entries point to them.

Accumulated learnings live in `~/agents/knowledge/` — one insight per file, things genuinely learned through doing.

## Two-Home Architecture

- **Brain home** (`~/agents`) — where tasks, history, knowledge, and skills live. Always this repo.
- **Work home** — where the actual work happens. Could be a separate repo, or the task folder itself. Recorded as `work_dir` in the task's `created` entry.

Skills must work from anywhere. Don't rely on cwd. Use `work_dir` from history for actual work, use `~/agents/` absolute paths for brain home operations.

## History Format

`~/agents/tasks/<slug>/history.jsonl` — one JSON object per line, append-only.

Fields:
- `ts` — ISO 8601 timestamp
- `type` — freeform tag (e.g., "created", "decision", "implementation", "blocker", "realization", "completed" — not an enum, use judgment)
- `agent` — who wrote this entry (e.g., "claude", "codex", "human")
- `work_dir` — (on `created` entry only) absolute path to where actual work lives
- `content` — as detailed as needed to preserve signal. No length limits. Test: "If a fresh agent reads only this history, can it continue without asking what happened?"

### When to Append

"If I stopped right now and a new agent picked this up, would they be missing something important?" If yes, append. Surprises, direction changes, choices, milestones — yes. Expected command output — probably not.

## Knowledge

`~/agents/knowledge/<topic>.md` — short standalone files. One insight per file.

The bar: **"Could an LLM or I have known this without doing the work?"** If yes, don't save it. If no, that's knowledge.

Include source task and date. Update existing files rather than duplicating.

## Human as a Capability

The user is not just a requester — they're a capability. Humans are better at subjective judgment, real-world sensing, multi-source synthesis, knowing their own intent. Do mechanical work and things that are faster for an agent. But when the human has information you don't — or asking is faster than guessing — ask. This is a first-class feature, not a fallback.

## Skills

Skills live in `~/agents/.agents/skills/`. Each skill starts by reading this file for system context.

- `/create-task` — start new work
- `/resume-task` — continue previous work (user drives)
- `/implement-task` — continue previous work (agent drives, user reviews)
- `/finalize-task` — compress history, extract knowledge, improve the system. Human-triggered only. Agent proposes a plan, human approves before execution.
