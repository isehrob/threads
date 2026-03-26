---
description: Start tracking new work as a task with persistent history
---

# /create-task

First, read `~/agents/AGENTS.md` for system context.

## What You Do

Create a new task and begin tracking work.

## Flow

1. **Derive a slug** from the user's description. Short, kebab-case. Don't ask — just pick one. If `~/agents/tasks/<slug>/` already exists, append a suffix (-2, -3, etc.).

2. **Determine `work_dir`** from context — what repo or folder is the user talking about? If the work is the task itself (research, planning, writing), `work_dir` is the task folder. If unclear, ask the user. Do NOT default to cwd.

3. **Scan `~/agents/knowledge/`** for anything relevant to the task. Surface useful context before starting.

4. **Create the task:**
   - `~/agents/tasks/<slug>/`
   - `~/agents/tasks/<slug>/history.jsonl`

5. **Write the first entry:**
   ```jsonl
   {"ts":"<now>","type":"created","agent":"claude","work_dir":"<absolute-path>","content":"<what the user wants, initial context, relevant knowledge found>"}
   ```

6. **Continue working** with the user on whatever they need.

7. **Append to history** after each meaningful step. Test: "Would a new agent be missing something important if I stopped here?"

## Rules

- Task folders always at `~/agents/tasks/<slug>/`. No exceptions.
- The `created` entry must be rich enough for a cold pickup by a different agent.
- If it's unclear what the user wants, ask. Don't create a task based on assumptions.
- Supporting files (notes, scripts, diagrams) can go in the task folder. Reference them from history entries.
