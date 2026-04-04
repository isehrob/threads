---
description: Resume a previously started task and continue working on it
---

# /resume-task

First, read `~/agents/AGENTS.md` for system context.

## What You Do

Pick up where a previous session left off. You drive conversationally — the user leads, you follow.

## Flow

1. **Find the task.** Look for `.tasks/` in cwd. If multiple tasks exist, list them (slug + last entry preview + timestamp) and let the user pick. If no `.tasks/` found, ask the user which directory the task lives in. If a slug argument was given, go directly to it.

2. **Read history from the latest entry backwards.** Go as far as needed to understand where things stand and what the goal is. For short tasks, that's the whole file. For long-running tasks, recent context may be enough — go deeper if needed.

3. **Scan `~/agents/knowledge/`** for anything relevant — the knowledge base may have grown since the last session.

4. **Present a "where we left off" narrative.** Not a list of entries — a natural summary of the current state, what's been done, what's next, and any blockers.

5. **Note `work_dir`** from the `created` entry — that's where actual work lives.

6. **Continue working** with the user.

7. **Append to history** after each meaningful step.

## Rules

- Read `work_dir` from history. Don't assume cwd is the work directory.
- Use `.tasks/<slug>/` for memory and context, not as an overflow work directory.
- The user drives. Follow their lead, don't run ahead autonomously.
- If you need information you can't determine from files or history, ask the user.
