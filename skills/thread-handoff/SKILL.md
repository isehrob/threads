---
name: thread-handoff
description: Preserve the context needed to continue an active thread later.
---

# Thread Handoff

Read `~/.local/share/threads/workflow.md`; follow its history schema exactly.

Use the topic and thread path established in context; if absent, ask instead of searching.

1. Append exactly one entry to the thread's `history.jsonl`.
2. Preserve only useful resume context from the current work.
3. Include current state, decisions and reasons, failed attempts, blockers, next step and reason, and concrete references when relevant.
4. Make `content` standalone and concise; omit irrelevant or unavailable details.
5. Do not copy the conversation, close the thread, or update topic knowledge.
6. Confirm the topic, thread, and recorded handoff.
