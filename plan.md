# Agents — Plan

## What This Is

A file-based, agent-agnostic personal harness for persistent memory, knowledge accumulation, and self-improvement across sessions. Any agent (Claude, Codex, whatever comes next) that can read and write files can plug into this. Mostly used for coding (~80%), but works for any digital task — research, writing, planning, learning, life stuff.

The core idea: agents lose context. This system gives them memory. A task's history is the thread of consciousness that survives context wipes. When a fresh agent reads it, it should feel like continuing months of work, not starting from scratch.

## Architecture: Two Homes

The system has a deliberate two-home design:

**Brain home** — the agents repo (`~/agents`). A git repo. This is where tasks, history, knowledge, skills, and system config live. It's the persistent identity of the system. Fixed path, always known. Git gives you versioning of everything for free — rollback a bad finalize, see how skills evolved, track knowledge growth over time.

**Work home** — where the actual work happens. Two cases:

1. **Separate repo/folder** — e.g., `~/work/my-app`. The task's `work_dir` points there. Agent uses absolute paths or `git -C <work_dir>` to operate in the right place, regardless of where the shell is sitting.
2. **Task folder itself** — sometimes the work *is* the task (research, writing, planning). Then `work_dir` is the task folder in brain home (`~/agents/tasks/<slug>/`). No separation needed.

Every task records `work_dir` in its `created` entry. Skills use this to know where to operate — they don't rely on the current working directory.

**Why two homes instead of one?** We considered embedding the system into each repo (template approach) or pulling work into the task folder (submodule approach). Both add complexity and maintenance burden. The two-home approach is simple: brain stays put, work happens wherever it happens. Skills are symlinked from brain home into whatever agent's skill directory (e.g., `.claude/skills/` for Claude Code). It's not elegant but it's practical and working.

**Skills must work from anywhere.** The agent might be `cd`'d into brain home, the work repo, or the task folder. Doesn't matter. Skills always read `work_dir` from the task history to know where to do actual work, and always use brain home's absolute path for history/knowledge/skills operations.

**Skills link back to agent.md.** Every skill tells the agent: "First, read `~/agents/agent.md`." That's how an agent invoked from any directory learns what this system is, where things live, and how to behave. `agent.md` is the shared context that makes skills make sense. Skills also reference brain home by absolute path for all task/knowledge/history operations.

## Folder Structure

```
~/agents/                          # brain home (fixed, known path)
├── .agents/
│   └── skills/
│       ├── create-task.md
│       ├── resume-task.md
│       ├── implement-task.md
│       └── finalize-task.md
├── .claude/
│   ├── skills/                    # symlinks to .agents/skills/*
│   └── settings.json
├── tasks/
│   └── <task-slug>/
│       ├── history.jsonl
│       └── (supporting files: notes, scripts, diagrams, etc.)
├── knowledge/
├── agent.md                       # system docs, principles, conventions
└── CLAUDE.md                      # Claude-specific adapter → points to agent.md

```

### Naming Convention

The system is agent-agnostic. Core files use neutral names:

- `agent.md` — the central system document. How this works, what the conventions are, what agents should know. All skills point here.
- Agent skills in `.agents/skills/` — the canonical location.
- `CLAUDE.md` — a Claude Code-specific adapter that points to `agent.md`. Other agents would have their own adapter (e.g., `codex.md`, `.cursorrules`, whatever).

## Principles

### Human as a Capability

The user is not just a requester — they're a capability the agent can invoke. Humans are better at some things:

- **Subjective judgment** — "which of these feels right?" "is this what you meant?"
- **Real-world sensing** — "is it sunny outside?" "what's on your screen right now?"
- **Multi-source synthesis** — "you have three tmux panes open, what's the error in the middle one?"
- **Intent** — only the human knows what they actually want. Agents can infer, but should verify.
- **Domain taste** — "does this API feel right for our users?"

**The rule:** Do mechanical work. Do things that are faster for an agent (searching files, running commands, generating code). But when the human has information the agent doesn't — or when asking is faster than guessing — ask. Don't thrash trying to infer what a 5-second question would resolve.

This isn't a fallback for when the agent is stuck. It's a first-class feature. The human is a tool, an API endpoint, a sensor. Use them. Skills should encode this: "If you need X and can't determine it from files/history, ask the user."

## History

`tasks/<slug>/history.jsonl` — append-only, one JSON object per line.

```jsonl
{"ts":"2026-03-24T14:30:00Z","type":"created","work_dir":"/Users/sehrobi/work/my-app","content":"Set up auth flow for the mobile app. User wants Google OAuth, needs to work on both iOS and Android. Will use expo-auth-session based on prior experience with Expo managed workflow."}
{"ts":"2026-03-24T15:10:00Z","type":"decision","content":"Going with expo-auth-session instead of rolling our own. Tried react-native-app-auth first but it requires ejecting from Expo managed workflow which user wants to avoid. expo-auth-session integrates natively with Expo's auth proxy for development."}
{"ts":"2026-03-24T16:00:00Z","type":"implementation","content":"Added login screen with Google OAuth. Tested on iOS simulator — works. Android pending. Created the auth context provider at src/contexts/AuthContext.tsx. See ./auth-flow-sketch.md for the flow diagram we agreed on."}
```

### Entry Format

Each line is a JSON object:

- `ts` — ISO 8601 timestamp.
- `type` — freeform string tag for classification. Agent picks whatever fits: "created", "decision", "research", "implementation", "blocker", "realization", "draft", "feedback", "pivot", "question", "completed", anything. Not an enum — use judgment.
- `agent` — which agent wrote this entry (e.g., "claude", "codex", "human"). Useful when multiple agents work on the same task across sessions — a resuming agent can gauge context and trust.
- `work_dir` — (on `created` entry) absolute path to where the actual work lives. Recorded once at task creation so any future agent knows where to look.
- `content` — as long as needed to preserve the signal. The test: **"If a fresh agent reads only this history, can it continue the work without asking what happened?"** Could be a sentence, could be several paragraphs. Include context, reasoning, what was tried, what failed, what was learned. No artificial length limits.

### Supporting Files

The task folder is a workspace. History entries can point to supporting artifacts:

- Research notes, scratch docs, drafts
- Scripts, code snippets, config files
- Diagrams, screenshots, exported data
- Anything that supports the work

Reference them from history entries: `"See ./research-notes.md for the full comparison."` These are the "hairs" on the timeline — the history.jsonl is the spine, supporting files are the flesh.

### When to Append

Every skill says "append after each meaningful step." The test: **"If I stopped right now and a new agent picked this up, would they be missing something important?"** If yes, append. If you just ran a command and it did what was expected — probably not worth an entry. If you hit a surprise, changed direction, made a choice, or completed a milestone — append.

### Rules

- **Append-only** during active work (create, resume, implement). Never edit or delete previous entries.
- **Finalize** is the only phase that compresses history and removes supporting files.
- No status field. A `completed` entry (or lack of one) tells you where things stand.

## Skills

Agent skills live in `.agents/skills/` (brain home). For Claude Code, they're symlinked into `.claude/skills/`. They run in the current conversation context and may spawn subagents internally.

**Every skill must:**
- Start with: "Read `~/agents/agent.md` for system context." This is how any agent, invoked from anywhere, learns what this system is and how to behave.
- Reference brain home (`~/agents`) by absolute path for all task/history/knowledge operations.
- Encode the "human as capability" principle — ask when asking is faster than guessing.

### 1. `/create-task`

**Trigger:** User describes new work.

**Flow:**
1. Derive a short slug from the user's description. Don't ask — just pick one. If it already exists, append a suffix.
2. Create `~/agents/tasks/<slug>/` and `~/agents/tasks/<slug>/history.jsonl`. Always absolute path. Always under brain home.
3. Determine `work_dir` — figure it out from context (what the user described, what repo they're talking about). If unclear, ask. Do NOT default to cwd — cwd is unreliable. For tasks where the work *is* the task (research, planning), `work_dir` is the task folder itself.
4. **Scan `~/agents/knowledge/`** for anything relevant to the task. Surface useful context to the agent and user before starting work.
5. Write first entry: `type: "created"`, `work_dir`, content capturing what the user wants and any initial context.
6. Continue working with the user on whatever they need.
7. Append to history after each meaningful step.

**Notes:**
- Task folders always live at `~/agents/tasks/<slug>/`. No exceptions, no cwd-based paths.
- The `created` entry must capture enough that a different agent could pick it up cold.
- If it's unclear what the user wants, ask. Don't create a task based on assumptions.

### 2. `/resume-task`

**Trigger:** User wants to continue previous work.

**Flow:**
1. If no argument: list all incomplete tasks (slug + last entry content preview + last entry timestamp).
2. If argument given: load that task's history from brain home.
3. Read history **from the latest entry backwards** — go as far as needed to understand where things stand and what the goal is. For short tasks, that's the whole file. For long-running tasks, recent context may be enough to get oriented, then go deeper if needed.
4. **Scan `~/agents/knowledge/`** for anything relevant — the knowledge base may have grown since the last session.
5. Present a "where we left off" summary — not a list of entries, but a natural narrative of the current state.
6. Note the `work_dir` from the created entry — that's where the actual work lives.
7. Continue working with the user.
8. Append to history after each meaningful step.

### 3. `/implement-task`

**Trigger:** User wants the agent to work more autonomously on a task.

**Flow:**
1. Load task history and supporting files from brain home. Read from latest backwards, go as deep as needed.
2. **Scan `~/agents/knowledge/`** for anything relevant.
3. Internalize the full context: goals, decisions, blockers, current state, work_dir.
4. Work through the task — use subagents, write code, do research, whatever it takes.
5. Append to history after each meaningful step.
6. Check in with user at decision points or blockers. The user may know things you can't determine from files alone — ask.

**Difference from resume:** Resume is conversational (user drives). Implement is autonomous (agent drives, user reviews).

### 4. `/finalize-task`

**Trigger:** User explicitly invokes `/finalize-task`. Never triggered by the agent — only the human decides when something is done.

This is the **self-improvement phase**. It's interactive — the agent proposes, the human approves.

#### Flow

1. **Read** the full task history and supporting files.
2. **Propose a finalization plan** — persist it as a markdown file in the task folder (e.g., `./finalize-plan.md`). The plan covers:
   - **Compress:** How the history will be distilled. What stays, what goes, what gets merged.
   - **Knowledge:** What new knowledge was learned. Draft each knowledge file.
   - **Skill updates:** Any skill changes the task revealed as needed.
   - **agent.md updates:** Any system-level changes.
   - **Adapter updates:** Any agent-specific changes (CLAUDE.md, etc.).
3. **Iterate with the user.** The user reviews, adjusts, pushes back. This may take multiple rounds. Context may get compacted — that's fine, the plan file persists. User can re-invoke the skill and point to the plan.
4. **Execute** only after the user approves. Apply all changes from the plan.
5. **Clean up** — remove the finalize plan file and any supporting files no longer needed.

#### What gets extracted

- **Knowledge** → `~/agents/knowledge/`. The test: **"Could an LLM or I have known this without doing the work?"** If yes, don't save it. If no, that's knowledge. Genuinely new ground truth — things outside training data, things you can't one-shot, things learned through doing. Could be about anything: a real-world process, a software gotcha, a life hack, a domain insight. Dual purpose: useful for future agents AND for the human.
- **Skill improvements** — if a skill's instructions led to friction, or a better workflow emerged.
- **agent.md improvements** — if the task revealed something about how the system should operate.
- **Adapter improvements** (CLAUDE.md, etc.) — if something agent-specific was learned.

The system gets smarter after every completed task. Task N+1 starts from a better baseline than task N.

#### Long-running tasks

For tasks that run for months, the user can invoke `/finalize-task` periodically as a mid-task compression — not because the task is done, but to keep the history manageable. Same propose-then-execute flow, just without the `completed` entry.

## Knowledge Files

`knowledge/<topic-slug>.md` — short, standalone files.

```markdown
# Expo Auth Session — Google OAuth on iOS

expo-auth-session requires `useProxy: false` in production builds.
The redirect URI must be registered in Google Cloud Console
with the exact scheme from app.json, not the Expo proxy URI.
Discovered this after auth worked in dev but silently failed in TestFlight.

Source: tasks/auth-flow (2026-03-24)
```

**Rules:**
- One insight per file. Small and grep-friendly.
- Include source task and date.
- If a knowledge file on the same topic exists, update it rather than creating a duplicate.
- The bar: genuinely new information, not textbook stuff.

## agent.md

The central system document. Tells any agent:
- What this system is and how it works.
- Where things live (brain home path, tasks, knowledge, skills).
- The two-home architecture: brain home vs work home.
- History format and conventions.
- The "human as capability" principle.
- Pointer to `knowledge/` for accumulated learnings.

## CLAUDE.md (and other agent adapters)

Thin, agent-specific files that live in brain home. For Claude Code:
- Points to `agent.md` as the source of truth.
- Any Claude Code-specific config or conventions.

## Open Questions (for later)

1. **Cross-repo context** — should entries beyond `created` also record repo/branch/commit when relevant? Useful for resume but adds verbosity.
2. **Knowledge dedup** — should finalize actively check and merge with existing knowledge files? Adds complexity but prevents drift.
3. **Work repo integration** — what's the lightest way for a work repo to hook into this system? Symlinked skills are working, but is there more needed?

---

## Appendix: Prior Art

_Bookmarked for a rainy day. Not influencing design. Might have useful insights we haven't noticed yet._

- **PI Framework** ([repo](https://github.com/badlogic/pi-mono), [writeup](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)) — Full agent runtime with phased task management, multi-agent orchestration, modes (SPEC, TEAM, CHAIN, PIPELINE).
- **Beads** ([context](https://medium.com/@btraut/assemble-your-agent-team-fbfb6b8904b2)) — Task tracking for multi-agent coordination. CLI-based, lives outside the code.
- **Claude Code Native Tasks** ([article](https://venturebeat.com/orchestration/claude-codes-tasks-update-lets-agents-work-longer-and-coordinate-across/)) — DAG-based task dependencies, built into Claude Code 2.1+.
- **GitHub Agentic Workflows** ([blog](https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/)) — Markdown-defined automations in `.github/workflows/`.
