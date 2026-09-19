---
name: resume-thread
description: Resume prior work by loading a thread's saved context, helping the user choose a thread when unclear.
---

# Resume Thread

Topics directory: `NOT_CONFIGURED`

Use this absolute path as `<topics>`, independent of cwd. If it is `NOT_CONFIGURED`, ask the user to run `setup-threads` before proceeding.

1. Use the topic and thread identified by the user or clearly established in context. If unclear, use `list-threads`, limited to the topic when known, and ask the user to pick. Wait for their choice.
2. Read `<topics>/<topic>/threads/<thread>/history.jsonl` and relevant knowledge under `<topics>/<topic>/knowledge/`. Open referenced artifacts only when needed.
3. Recover the objective, current state, decisions, blockers, and next step. Use the recorded `work_dir` when present, and check the current files before relying on saved state.
4. Establish the topic and thread path as active in this conversation. Briefly summarize where the work left off and continue from the next step when clear; otherwise ask what to do next.

Resuming does not modify thread history or topic knowledge.
