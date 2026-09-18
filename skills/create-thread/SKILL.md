---
name: create-thread
description: Create a resumable work thread inside an existing topic.
---

# Create Thread

Read `~/.local/share/threads/workflow.md`; follow its history schema exactly.

Use `~/.local/share/threads/topics/<topic>/threads` regardless of cwd.

1. Require an existing topic; ask which one if unclear.
2. Derive a short kebab-case thread slug from the objective.
3. Create `<thread>/history.jsonl`; create artifacts only when needed.
4. Append an entry whose content starts `Thread created.` and includes the objective and optional absolute `work_dir`.
5. Ask for `work_dir` only when external work exists and it is unclear.
6. Read topic knowledge and treat the new thread as active.
