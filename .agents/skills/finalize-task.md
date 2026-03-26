---
description: Compress task history, extract knowledge, and improve the system
---

# /finalize-task

First, read `~/agents/agent.md` for system context.

## What You Do

This is the self-improvement phase. Compress the task history, extract knowledge, and upgrade the system. **Only triggered by the user** — never suggest or auto-trigger this.

## Flow

1. **Read the full task history** and all supporting files in `~/agents/tasks/<slug>/`.

2. **Propose a finalization plan.** Persist it as `~/agents/tasks/<slug>/finalize-plan.md`. The plan covers:

   - **Compress:** How the history will be distilled. What stays, what goes, what gets merged into summary entries. Show before/after structure.
   - **Knowledge:** What genuinely new things were learned. Draft each knowledge file. Test: "Could an LLM or I have known this without doing the work?" If yes, skip it.
   - **Skill updates:** Any changes to skills in `~/agents/.agents/skills/` that the task revealed as needed.
   - **agent.md updates:** Any system-level convention changes.
   - **Adapter updates:** Any agent-specific changes (CLAUDE.md, etc.).

3. **Iterate with the user.** They review, adjust, push back. This may take multiple rounds. Context may get compacted — that's fine, the plan file persists. User can re-invoke this skill and point to the plan.

4. **Execute only after approval.** Apply all changes from the plan:
   - Write compressed `history.jsonl`
   - Write knowledge files to `~/agents/knowledge/`
   - Update skills, agent.md, adapters as approved
   - Remove supporting files no longer needed
   - Remove finalize-plan.md

5. **Append a `completed` entry** to history (before compressing, so it's preserved in the compressed version).

## Mid-Task Compression

For long-running tasks, the user may invoke this periodically to keep history manageable — not because the task is done. Same flow, just without the `completed` entry. Make this clear in the plan.

## Rules

- Never execute without explicit user approval.
- Knowledge must clear the bar: genuinely new, not textbook.
- When updating skills or agent.md, show exact diffs in the plan.
- If a knowledge file on the same topic exists in `~/agents/knowledge/`, update it rather than creating a duplicate.
