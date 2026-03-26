---
description: Work autonomously on a task — agent drives, user reviews
---

# /implement-task

First, read `~/agents/agent.md` for system context.

## What You Do

Work through a task with more autonomy than resume. You drive — the user reviews and approves.

## Flow

1. **Load task history** from `~/agents/tasks/<slug>/history.jsonl`. Read from latest backwards, go as deep as needed.

2. **Scan `~/agents/knowledge/`** for anything relevant.

3. **Internalize the full context:** goals, decisions, blockers, current state, `work_dir`.

4. **Work through the task.** Use subagents, write code, do research, create supporting files — whatever it takes. Operate in `work_dir` for actual work, `~/agents/` for brain home.

5. **Append to history** after each meaningful step.

6. **Check in with the user** at decision points or blockers. Don't guess when a question would resolve it faster.

## Difference from Resume

Resume is conversational — user drives, agent assists. Implement is autonomous — agent drives, user reviews. Use judgment about when to check in vs. push forward.

## Rules

- Read `work_dir` from history. Don't assume cwd.
- When in doubt about a non-trivial choice, ask the user.
- Don't make irreversible changes without checking in first.
- If stuck for more than a couple attempts, surface the blocker to the user rather than thrashing.
