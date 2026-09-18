---
name: setup-threads
description: Introduce Threads, choose topics storage, and configure installed skills after installation or updates.
---

# Setup Threads

Threads is a local agent memory system for organizing work done with agents. Its main purpose is to give the human one place to find ongoing work and see where they left off. Threads also preserve enough context for a new agent session to continue without making the human explain everything again.

Topics group related work. Each thread represents one objective, with an append-only history of progress, decisions, and next steps. Topic knowledge holds lessons worth reusing across threads.

The topics folder lives in a location chosen by the user, which can be synced through iCloud Drive, Google Drive, or another service. Store its absolute path directly in the installed skills.

1. Briefly explain the system. Ask where to store topics or find existing topics, unless the user already provided a location.
2. Inspect that location. If it is the existing topics folder, use it directly. Otherwise reuse its `topics/` subfolder or create one. If the layout is unclear, ask before creating another folder.
3. Locate installed copies of `create-topic`, `create-thread`, `list-topics`, and `list-threads`. Start with skill paths exposed by the active agent and this skill's installation directory, then check the available Claude and Codex project and user skill directories, including configured overrides. Inspect their `SKILL.md` names and contents to identify this collection. Use the actual filesystem; do not assume how the installer arranged it. If an installation cannot be located, ask for its path.
4. Resolve symlinks and update each distinct physical copy once. Replace only its `Topics directory:` value with the absolute topics path, including copies that already have a configured value. Leave the rest of each skill unchanged.
5. Read back the edited files and confirm the topics location and which skill copies were configured. Report any installations that could not be found or updated.

Preserve existing topics, threads, and history. Skill installation and linking are handled by the skills CLI. Updates or reinstalls may overwrite the configured paths; rerun setup afterward. Newly installed copies also need setup.
