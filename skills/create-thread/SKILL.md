---
name: create-thread
description: Create a resumable work thread inside an existing topic.
---

# Create Thread

A thread is a piece of work within a topic, with an objective and enough recorded context to resume across agent sessions. Topic knowledge contains lessons worth reusing across threads.

Topics directory: `NOT_CONFIGURED`

Use this absolute path as `<topics>`, independent of cwd. If it is `NOT_CONFIGURED`, ask the user to run `setup-threads` before proceeding.

Create threads under `<topics>/<topic>/threads`.

1. Require an existing topic; ask which one if unclear.
2. Derive a short kebab-case thread slug from the objective.
3. Create `<thread>/history.jsonl`; create artifacts only when needed.
4. Append an entry whose content starts `Thread created.` and includes the objective and optional absolute `work_dir`.
5. Ask for `work_dir` only when external work exists and it is unclear.
6. Read topic knowledge and treat the new thread as active.

## History format

Each line of `history.jsonl` is one JSON object:

```json
{"timestamp":"2026-08-05T14:30:00-04:00","agent":"codex","content":"Standalone context another agent needs to continue."}
```

Use local ISO 8601 time with its UTC offset, a lowercase agent name, and concise standalone content. History is append-only; never rewrite or delete existing entries.
