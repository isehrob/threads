# Workflow

This is a human-owned system for organizing work done with agents.
Topics group related areas, threads preserve resumable work, and knowledge keeps reusable learnings discovered through those threads.

Its purpose is to provide one dependable place to see existing work, choose a thread, and continue with the same context after any break or agent session.

It exists because agent sessions are temporary and scattered, while files provide a stable, agent-independent mental model of the work.

## History

Every `history.jsonl` line uses exactly this schema:

```json
{"timestamp":"2026-08-05T14:30:00-04:00","agent":"codex","content":"Standalone context another agent needs to continue."}
```

Use local ISO 8601 time with its UTC offset, a lowercase agent name, and concise standalone content.
History is append-only; never rewrite or delete existing entries.

```text
~/threads/
├── workflow.md
├── topics/ -> ~/Desktop/agents/topics
│   └── <topic>/
│       ├── knowledge/
│       │   └── <subject>.md
│       └── threads/
│           └── <thread>/
│               ├── history.jsonl
│               └── artifacts/        # only when needed
└── .agents/
    └── skills/
        ├── create-topic/
        ├── list-topics/
        ├── create-thread/
        ├── list-threads/
        ├── set-thread/
        ├── thread-handoff/
        ├── thread-rules/
        └── close-thread/
```
