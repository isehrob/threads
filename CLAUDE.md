# Claude Code Adapter

Read `~/agents/AGENTS.md` for how this system works.

This repo is the brain home for a persistent task/knowledge system. Skills in `.claude/skills/` are symlinked from `.agents/skills/`.

When working on a task, always use absolute paths for brain home (`~/agents/`) operations. The actual work may happen in a different directory — check the task's `work_dir`.
