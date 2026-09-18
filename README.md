# Threads

A simple, local system for managing any digital work with agents: coding, research, paperwork, planning, or anything else.

## Philosophy

This is for humans first. The goal is to make the person working with agents more effective. You get one central place to see what you were working on, where you left off, and what to pick up next, without digging through scattered chats.

Threads also give agents a way to resume, so you don't have to keep explaining the same background or providing the same context.

The system should be simple enough to understand and start using quickly. The workflow is intentionally slow enough to leave room for human thinking. Automation can handle bookkeeping, while you decide what to work on and when to move on.

Topics group related work; threads keep individual pieces of work resumable. The files are agent-agnostic, with skill integrations currently available for Codex and Claude.

## Storage and privacy

Topics and threads live in the location you choose. Choose a folder outside your Git repositories to keep your work separate from the installed skills and out of Git.

Put them in an iCloud Drive, Google Drive, or another synced folder for copies across devices. Access and recovery depend on your storage and account settings.

## Installation

Install the skills for Claude and Codex:

```sh
npx skills add isehrob/threads -g -a claude-code codex --skill '*'
```

Then ask your agent to run `setup-threads` and provide the folder where you want to store topics or where they already exist. Setup configures the installed skills to use that location and preserves existing topics and history.

Update installed skills with:

```sh
npx skills update -g
```

Rerun the installation command to add newly published skills. Run `setup-threads` after updates or installations to configure the paths again.

## To-do

- [ ] Automate `thread-handoff`.
