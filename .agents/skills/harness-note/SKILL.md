---
description: Capture agent failure or friction from the current conversation as a structured note
---

# /harness-note

First, read `~/agents/AGENTS.md` for system context.

## What You Do

Capture what just went wrong. The user corrected the agent, got frustrated, or the agent made a bad decision. You look at the conversation right before this skill was invoked, extract the failure pattern, and persist a structured note for later system improvement.

## Flow

1. **Look back at the conversation.** Focus on the interaction immediately before this skill was invoked — that's where the friction happened. Identify:
   - What the agent did wrong
   - Why it likely happened (bad assumption, missing context, wrong default, skill gap, unclear instruction)
   - What should have been done instead
   - How the user reacted (correction, frustration, workaround)

2. **Categorize.** Pick the best-fit category:
   - `wrong-approach` — agent took a fundamentally wrong path
   - `scope-creep` — agent did more than asked
   - `missed-context` — agent ignored available information
   - `bad-default` — agent's default behavior was wrong for this situation
   - `communication` — agent explained too much, too little, or wrong tone
   - `tool-misuse` — agent used the wrong tool or used a tool incorrectly
   - `other` — doesn't fit above; describe in the note

3. **Determine location.** Look for `.tasks/` in cwd. If there's an active task in this conversation, save to its `.tasks/<slug>/harness-notes/`. If multiple tasks exist and it's unclear which one, ask. If no `.tasks/` found, **ask the user** where to put it.

4. **Write the note.** Filename: `<timestamp>-<short-descriptor>.md` (e.g., `2026-04-03-scope-creep-refactor.md`).

   Format:
   ```markdown
   ---
   category: <category>
   ts: <ISO 8601>
   agent: <which agent made the mistake>
   ---

   ## What happened
   <Brief description of the agent's action>

   ## Why it went wrong
   <Root cause analysis — what led to the bad decision>

   ## What should have been done
   <The correct approach>

   ## User reaction
   <How the user responded — quote if notable>

   ## Suggested fix
   <What harness change could prevent this: AGENTS.md rule, skill update, new skill, etc.>
   ```

5. **Confirm to the user.** One line: what you noted, where you saved it.

## Rules

- Do NOT editorialize or soften the failure. Be direct about what went wrong.
- Do NOT fix the problem right now. That's what `/improve-harness` is for.
- Do NOT ask the user to describe what happened — extract it from the conversation yourself. Only ask if genuinely ambiguous.
- Keep notes concise. A note should be readable in 30 seconds.
- If multiple things went wrong in one interaction, write separate notes for each.
