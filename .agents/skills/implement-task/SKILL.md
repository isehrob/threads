---
description: Work autonomously on a task — agent drives, user reviews
---

# /implement-task

First, read `~/agents/AGENTS.md` for system context.

## What You Do

Work through a task with more autonomy than resume. You drive — the user reviews and approves.

## Flow

1. **Find the task.** Look for `.tasks/` in cwd. If multiple tasks exist, list them and let the user pick. If no `.tasks/` found, ask the user which directory the task lives in. If a slug argument was given, go directly to it.

2. **Read history** from latest backwards, go as deep as needed.

3. **Scan `~/agents/knowledge/`** for anything relevant.

4. **Internalize the full context:** goals, decisions, blockers, current state, `work_dir`.

5. **Work through the task.** Use subagents, write code, do research, create supporting files — whatever it takes. Operate in `work_dir` for actual work.

6. **Append to history** after each meaningful step.

7. **Check in with the user** at decision points or blockers. Don't guess when a question would resolve it faster.

## Difference from Resume

Resume is conversational — user drives, agent assists. Implement is autonomous — agent drives, user reviews. Use judgment about when to check in vs. push forward.

## Rules

- Read `work_dir` from history. Don't assume cwd.
- Use `.tasks/<slug>/` for persistence/context only, not as an overflow work directory.
- Don't put sensitive data in `.tasks/<slug>/` files. Reference by path if needed.
- When in doubt about a non-trivial choice, ask the user.
- Don't make irreversible changes without checking in first.
- If stuck for more than a couple attempts, surface the blocker to the user rather than thrashing.
