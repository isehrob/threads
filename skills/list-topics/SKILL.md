---
name: list-topics
description: List topics and summarize their thread activity.
---

# List Topics

Topics directory: `NOT_CONFIGURED`

Use this absolute path as `<topics>`, independent of cwd. If it is `NOT_CONFIGURED`, ask the user to run `setup-threads` before proceeding.

Read topic directories under `<topics>` without changing them.

Each topic groups related work under `threads/<thread>/history.jsonl`. History entries are JSON objects with `timestamp`, `agent`, and `content`; the last line records the latest activity.

1. Show each topic name.
2. Count a thread as closed only when its final content starts `Thread closed.`.
3. Show the latest thread activity timestamp when available.
4. Sort by latest activity, newest first.
5. Report clearly when no topics exist.
