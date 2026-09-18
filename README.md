# Threads

A simple, local system for managing any digital work with agents: coding, research, paperwork, planning, or anything else.

## Philosophy

This is for humans first. The goal is to make the person working with agents more effective. You get one central place to see what you were working on, where you left off, and what to pick up next, without digging through scattered chats.

Threads also give agents a way to resume, so you don't have to keep explaining the same background or providing the same context.

The system should be simple enough to understand and start using quickly. The workflow is intentionally slow enough to leave room for human thinking. Automation can handle bookkeeping, while you decide what to work on and when to move on.

Topics group related work; threads keep individual pieces of work resumable. The files are agent-agnostic, with skill integrations currently available for Codex and Claude. See [workflow.md](workflow.md) for the layout and workflow.

## Storage and privacy

Topics and threads live outside this Git repository, linked through the ignored `topics/` symlink. Your work stays out of Git.

Put them in an iCloud Drive, Google Drive, or another synced folder for copies across devices. Access and recovery depend on your storage and account settings.

## Installation

With this repository at `~/threads`, run:

```sh
python3 scripts/install.py
```

Enter the full path of the parent folder. The installer creates `topics/` inside it, links it as `topics/` in this repository, and syncs skills into `~/.codex/skills` and `~/.claude/skills`.

## To-do

- [ ] Automate `thread-handoff`.
