# Workflow

- **Topic:** An area of work that groups related threads and reusable knowledge learned from them.
- **Thread:** A piece of work within a topic, with an objective and enough recorded context to resume later.
- **History:** A thread's `history.jsonl`, recording its progress, decisions, and handoffs so a human or agent can see where it left off.

## History format

Every `history.jsonl` line uses exactly this schema:

```json
{"timestamp":"2026-08-05T14:30:00-04:00","agent":"codex","content":"Standalone context another agent needs to continue."}
```

Use local ISO 8601 time with its UTC offset, a lowercase agent name, and concise standalone content.
History is append-only; never rewrite or delete existing entries.
