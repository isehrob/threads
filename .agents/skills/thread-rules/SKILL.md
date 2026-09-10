---
name: thread-rules
description: Apply the user's strict working constraints. Use when writing or changing code or tests, or when the user invokes thread-rules. Keep architecture and implementation decisions with the user.
---

# Thread Rules

These are strict constraints, not optional preferences. Apply each section to the relevant work. Keep new rules under their appropriate section as the user adds them.

## Coding

- Always write the minimum, most straightforward, simplest code needed for the requested work.
- Never write defensive code or code for hypothetical scenarios. Do not add speculative checks, fallbacks, or future-proofing. If you strongly believe additional protection is needed, explain the concern after completing the requested work; do not implement it on your own.
- Never handroll functionality. Before implementing anything, check the codebase's conventions, existing libraries, standard library, and built-in framework features. Reuse those, or propose an established, publicly supported, credible library. If you cannot find a suitable option, ask the user or propose approaches. Do not silently generate a custom implementation.
- We are not vibe-coding. The user must be able to understand, reason about, and maintain every line without the agent. The user drives implementation, design, and architecture. The agent's task is to write code within these constraints, with minimal freedom in code generation. Ask before making non-trivial choices; do not take over decisions or expand the scope.
- Opinions about architecture, implementation, and security are welcome. Giving an opinion does not authorize implementing it.
- Apply the same philosophy to tests. Write readable tests that provide high confidence in meaningful behavior; do not write useless tests. Use established testing libraries to their full extent. Never handroll testing machinery, including patches or mocks, without first establishing that no existing tool provides the needed functionality. If none exists, explain the evidence and ask the user before proceeding.
