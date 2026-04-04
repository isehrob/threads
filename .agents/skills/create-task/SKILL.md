---
description: Start tracking new work as a task with persistent history
---

# /create-task

First, read `~/agents/AGENTS.md` for system context.

## What You Do

Create a new task and begin tracking work.

## Flow

1. **Determine `work_dir`** from context — what repo or folder is the user talking about? If the work IS the task (research, planning, writing), ask the user where to put it. If unclear, ask. Do NOT default to cwd.

2. **Derive a slug** from the user's description. Short, kebab-case. Don't ask — just pick one. If `<work_dir>/.tasks/<slug>/` already exists, append a suffix (-2, -3, etc.).

3. **Scan `~/agents/knowledge/`** for anything relevant to the task. Surface useful context before starting.

4. **Create the task state:**
   - `<work_dir>/.tasks/<slug>/`
   - `<work_dir>/.tasks/<slug>/history.jsonl`

5. **Write the first entry:**
   ```jsonl
   {"ts":"<now>","type":"created","agent":"claude","work_dir":"<absolute-path>","content":"<what the user wants, initial context, relevant knowledge found>"}
   ```

6. **Continue working** with the user on whatever they need.

7. **Append to history** after each meaningful step. Test: "Would a new agent be missing something important if I stopped here?"

## Rules

- Task state always at `<work_dir>/.tasks/<slug>/`. No exceptions.
- The `created` entry must be rich enough for a cold pickup by a different agent.
- If it's unclear what the user wants, ask. Don't create a task based on assumptions.
- Supporting files in the task folder should be minimal and resume-oriented — notes, plans, diagrams. Not working artifacts.
- Don't put sensitive data in task files. Reference it by path if needed.
- The harness repo (`~/agents`) is never `work_dir` unless the user is working on the harness itself.
