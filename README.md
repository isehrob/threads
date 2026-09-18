# Threads

A simple, local system for managing any digital work with agents: coding, research, paperwork, planning, or anything else.

## Philosophy

This is for humans first. The goal is to make the person working with agents more effective. You get one central place to see what you were working on, where you left off, and what to pick up next, without digging through scattered chats.

Threads also give agents a way to resume, so you don't have to keep explaining the same background or providing the same context.

The system should be simple enough to understand and start using quickly. The workflow is intentionally slow enough to leave room for human thinking. Automation can handle bookkeeping, while you decide what to work on and when to move on.

Topics group related work; threads keep individual pieces of work resumable. The files are agent-agnostic, with skill integrations currently available for Codex and Claude. See [workflow.md](workflow.md) for the layout and workflow.

## Storage and privacy

Topics and threads live in the location you choose, linked from `~/.local/share/threads/topics`. Your work stays separate from the installed package and out of Git.

Put them in an iCloud Drive, Google Drive, or another synced folder for copies across devices. Access and recovery depend on your storage and account settings.

## Installation

Requires Node.js 24.2 or newer. Once published, install or update with:

```sh
npx @isehrob/threads@latest
```

On first install, enter the absolute path of the parent folder. The installer creates `topics/` inside it, installs skills and the workflow under `~/.local/share/threads`, and links skills into `~/.codex/skills` and `~/.claude/skills`.

Run the same command to update skills and the workflow. Your topics location and contents stay unchanged.

From a source checkout, run `node scripts/install.js`.

## To-do

- [ ] Automate `thread-handoff`.
