# Threads

A simple, local memory system for managing any digital work with agents: coding, research, paperwork, planning, or anything else.

It's for humans first: one place to see what you were working on and where you left off. Saved context lets an agent pick it up without you explaining everything again. The workflow is intentionally slow enough to leave room for human thinking. The files are agent-agnostic; the skills currently support Codex and Claude.

## Installation

Install the skills for Claude and Codex:

```sh
npx skills add isehrob/threads -g -a claude-code codex --skill '*'
```

Then ask your agent to run `setup-threads` and provide the folder where you want to store the memory files - topics. Setup configures the installed skills to use that location and preserves existing topics and history.

## How to use it

Topics group related threads. Use `create-topic` to create a topic, like `job-hunt`. Then use `create-thread`, describe what you want to work on, and say which topic it belongs to—for example, preparing for an interview under `job-hunt`.

Before stopping, use `thread-handoff` to save a concise summary for the next pickup. To continue prior work, use `resume-thread` to pick up where you left off. You can list topics and threads with `list-topics` and `list-threads` skills.

When the work is done, use `close-thread`. It closes the thread and saves reusable lessons in the topic's knowledge folder.

## Updates

Update installed skills with:

```sh
npx skills update -g
```

Rerun the installation command to add newly published skills. Run `setup-threads` after updates or installations to configure the paths again.

## Storage and privacy

Topics and threads live in the location you choose. Choose a folder outside your Git repositories to keep your work separate from the installed skills and out of Git.

Put them in an iCloud Drive, Google Drive, or another synced folder for copies across devices. Access and recovery depend on your storage and account settings.

## To-do

- [ ] Automate `thread-handoff`.
