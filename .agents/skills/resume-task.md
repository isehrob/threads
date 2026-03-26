---
description: Resume a previously started task and continue working on it
---

# /resume-task

First, read `~/agents/agent.md` for system context.

## What You Do

Pick up where a previous session left off. You drive conversationally — the user leads, you follow.

## Flow

1. **If no argument:** List all incomplete tasks from `~/agents/tasks/`. For each, show slug + last entry content preview + last entry timestamp. A task is incomplete if its last entry type is not "completed".

2. **If argument given:** Load `~/agents/tasks/<slug>/history.jsonl`.

3. **Read history from the latest entry backwards.** Go as far as needed to understand where things stand and what the goal is. For short tasks, that's the whole file. For long-running tasks, recent context may be enough — go deeper if needed.

4. **Scan `~/agents/knowledge/`** for anything relevant — the knowledge base may have grown since the last session.

5. **Present a "where we left off" narrative.** Not a list of entries — a natural summary of the current state, what's been done, what's next, and any blockers.

6. **Note `work_dir`** from the `created` entry — that's where actual work lives. Operate there for work, use `~/agents/` for brain home operations.

7. **Continue working** with the user.

8. **Append to history** after each meaningful step.

## Rules

- Read `work_dir` from history. Don't assume cwd is the work directory.
- The user drives. Follow their lead, don't run ahead autonomously.
- If you need information you can't determine from files or history, ask the user.
