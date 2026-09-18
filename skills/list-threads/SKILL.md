---
name: list-threads
description: List resumable threads within one topic or across all topics.
---

# List Threads

Topics directory: `NOT_CONFIGURED`

Use this absolute path as `<topics>`, independent of cwd. If it is `NOT_CONFIGURED`, ask the user to run `setup-threads` before proceeding.

Read threads under `<topics>/<topic>/threads`; scan all topics only when no topic is given.

Each thread is a resumable piece of work with a `history.jsonl` file. Entries are JSON objects with `timestamp`, `agent`, and `content`; the last line records the latest activity.

1. Use the requested topic; otherwise group threads by topic.
2. Treat a thread as closed only when its final content starts `Thread closed.`.
3. Show open threads first, then closed threads.
4. Show thread name, latest timestamp, and final content preview.
5. Sort each group by latest activity, newest first.
