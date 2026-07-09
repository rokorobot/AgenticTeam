# Hooks — the deterministic half of the Steward

Prompts are not enforcement. These hooks are where the constitution's
containment and evidence rules stop being persuasion and start failing
closed. Everything in this directory ships as `.example.js` and does
NOTHING until you activate it deliberately.

## What's here

| File | Event | Enforces |
|---|---|---|
| `pretooluse-scope-guard.example.js` | PreToolUse | "No edits outside ratified scope" — denies Edit/Write/NotebookEdit outside `allowedGlobs` / inside `forbiddenGlobs` of `handoffs/current-scope.json` |
| `stop-proof-guard.example.js` | Stop | "No evidence = no answer" — blocks ending a turn that edited files without running the scope contract's proof commands |
| `pretooluse-target-isolation.example.js` | PreToolUse | "Target isolation" — denies Edit/Write/NotebookEdit that would land in a canonical target checkout instead of an isolated `<name> copy for EM` copy, or on a `main`/`master` branch. Exempts AgenticTeam editing itself. |

All three are heuristics with honest limits, documented in their headers.
The scope guard catches path violations; it does not read minds. The proof
guard catches "forgot to run tests"; misrepresented results are caught by
the adversarial verification gate, which is judgment work. The target-
isolation guard catches "editing the original checkout"; it identifies
canonical repos by the `<name> copy for EM` naming convention and the
optional `CANONICAL_MARKERS` list in its header — set those for your
machine before activating, and it stays inert until copied to `.js` and
wired in settings like the others.

## Activation checklist (manual, in this order)

1. `git init` the repository if you haven't — rollback anchors and worktree
   isolation depend on git.
2. Copy each `.example.js` you want live to the same name without
   `.example` (activated copies are what settings reference; keep the
   examples as documentation).
3. Copy `.claude/settings.example.json` to `.claude/settings.json` — it
   wires both hooks and adds the deny-list for push/merge/destructive
   commands. Review every line before saving; hooks run with your
   permissions.
4. Have the Steward agent ratify a first workstream so
   `handoffs/current-scope.json` exists.
5. Test the guard rails on purpose: ask an agent to edit a file in
   `forbiddenGlobs` and confirm the denial message appears. An enforcement
   layer you've never seen fire is a hypothesis, not a layer.
6. When the flow is trusted, set `FAIL_CLOSED = true` in the scope guard so
   a missing scope contract blocks all edits (recommended end state for
   governed development).

## Design notes

- Hooks are Node scripts reading the hook payload as JSON on stdin and
  emitting a JSON decision on stdout — see each file's header for the exact
  protocol per event.
- Windows note: settings.example.json invokes them via `node`, so they work
  regardless of shebang support.
- Keep hooks dumb. Anything requiring judgment (is this cleanup or a
  behavior change? is this evidence honest?) belongs to the Steward agent
  or the verification panel, not here. A clever hook is a second model to
  debug.
