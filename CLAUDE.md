# Claude Code Adapter

Read `~/agents/AGENTS.md` for how this system works.

This repo is the harness — skills, knowledge, and system config. No task artifacts live here. Task state lives in each work directory under `.tasks/<slug>/`.

Skills are symlinked globally (`~/.claude/skills/` -> `~/agents/.agents/skills/`), discoverable from any directory. Run `~/agents/scripts/sync-skills.sh` after adding or removing skills.
