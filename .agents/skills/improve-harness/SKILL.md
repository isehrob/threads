---
description: Improve the agent harness based on accumulated notes, task history, and observed patterns
---

# /improve-harness

First, read `~/agents/AGENTS.md` for system context.

## What You Do

Make the harness better. Read everything in the current task's `.tasks/<slug>/` folder — harness notes get top priority, then history and supporting files. Identify patterns and propose concrete improvements to the harness at `~/agents/`. Execute only after user approval.

## Flow

1. **Find the task.** Look for `.tasks/` in cwd. If multiple tasks exist, list them and let the user pick. If no `.tasks/` found, ask the user which directory to look at. If a slug argument was given, go directly to it.

2. **Gather inputs.** Read in priority order:
   - **Harness notes** (top priority): `.tasks/<slug>/harness-notes/*.md`. These are direct evidence of failures.
   - **Task history and supporting files**: `.tasks/<slug>/history.jsonl` and any other files in `.tasks/<slug>/`. Look for repeated friction, workarounds, or patterns that notes alone don't capture.
   - **Current harness**: `~/agents/AGENTS.md`, all skills in `~/agents/.agents/skills/`, adapter files (`CLAUDE.md`, etc.), and `~/agents/knowledge/`.

3. **Identify patterns.** Group findings by theme. Prioritize:
   - Recurring failures (same category appearing in multiple notes)
   - High-severity one-offs (user was very frustrated, or the failure had real consequences)
   - Gaps between what the harness says and what actually works

4. **Propose a plan.** Persist as `.tasks/<slug>/improve-harness-plan.md`. The plan covers:

   - **Priority-ordered list of improvements**, each with:
     - What the problem is (link to specific notes/history)
     - What change to make (exact file, exact diff or new content)
     - Why this fixes it
   - **Categories of changes:**
     - `~/agents/AGENTS.md` rule additions or modifications
     - Skill updates (show exact diffs)
     - New skills (show full SKILL.md)
     - Adapter updates (CLAUDE.md, etc.)
     - Knowledge file updates
   - **What NOT to change** — explicitly call out things you considered but decided against, with reasoning.

5. **Iterate with the user.** They review, adjust, push back. May take multiple rounds. The plan file persists across context compaction.

6. **Execute only after explicit approval.** Apply all approved changes:
   - Update files in `~/agents/` as specified in the plan
   - Create symlinks for new skills (run `~/agents/scripts/sync-skills.sh`)
   - Archive processed harness notes (move to `.tasks/<slug>/harness-notes/processed/`, don't delete)

7. **Clean up.** Remove `.tasks/<slug>/improve-harness-plan.md` after execution.

## Rules

- Never execute without explicit user approval.
- Show exact diffs for all modifications. No vague "update the skill to handle X better."
- Don't over-engineer. One clear rule beats three clever abstractions.
- Prefer modifying existing skills/rules over creating new ones.
- If a pattern appears only once and isn't severe, note it but don't propose a change yet — wait for more signal.
- Archive notes after processing, never delete them. History matters.
- If the harness already has a rule that should have prevented the failure, the fix is making the rule more prominent or specific — not adding a duplicate.
