---
name: create-topic
description: Create a topic for organizing related knowledge and work threads.
---

# Create Topic

A topic is an area of work that groups related threads and reusable knowledge learned from them.

Topics directory: `NOT_CONFIGURED`

Use this absolute path as `<topics>`, independent of cwd. If it is `NOT_CONFIGURED`, ask the user to run `setup-threads` before proceeding.

1. Use the provided name or derive a short kebab-case slug.
2. Create `<topics>/<topic>/knowledge/` and `<topics>/<topic>/threads/`.
3. Do not overwrite an existing topic; report it instead.
4. Confirm the created topic path.
