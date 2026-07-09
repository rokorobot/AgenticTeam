# AgenticTeam — a governed Claude Code multi-agent operating structure

A working starting kit that turns six product archetypes into **bounded
agency**: each role is a preset of context + tools + authority + proof
requirement + stop condition, enforced by tool grants, hooks, worktrees,
and durable handoff files — not by prompt language.

Origin: the five-archetype team model (Prototyper, Builder, Sweeper,
Grower, Maintainer), extended with a Steward/Governor whose enforcement is
mostly deterministic machinery with an LLM only for judgment calls.

## Layout

```
CLAUDE.md                      Constitution — loaded by every agent; wins over task prompts
README.md                      This file
.claude/
  agents/
    steward.md                 Scopes, gates, ratifies. Fable. Writes only under handoffs/
    prototyper.md              Options + throwaway spikes, worktree-isolated. Fable (Opus for code spikes)
    builder.md                 Ratified scope → production code + tests. Opus
    sweeper.md                 Behavior-preserving cleanup, no Write tool. Sonnet (Opus for deep cleanup)
    grower.md                  Read-only PMF/iteration analysis. Fable
    maintainer.md              Reliability/security/deps/CI audits. Opus (Sonnet for chores)
  workflows/
    feature-pipeline.md        Steward → Builder → Sweeper → adversarial gate (3 tiers + liftable script)
    explore-options.md         N parallel Prototypers → judge panel → Steward ratifies ≤1
    release-audit.md           Maintainer multi-lens audit → Sweeper → Steward gate
  hooks/
    README.md                  Activation checklist + design notes
    pretooluse-scope-guard.example.js   Denies edits outside the ratified scope contract
    stop-proof-guard.example.js         Blocks ending a turn without running required proofs
  settings.example.json        Deny-list (no push/merge/destructive) + hook wiring
handoffs/
  TEMPLATE.md                  The 12-field handoff contract every role transition writes
  current-scope.example.json   Shape of the Steward's ratified scope contract
```

## Ready to use right now

- **Agent definitions**: invoke any role as a subagent by name (steward,
  builder, sweeper, grower, maintainer, prototyper). Authority is already
  encoded in each `tools:` grant (Grower can't edit; Sweeper can't create
  files; Steward can only write under `handoffs/`).
- **CLAUDE.md constitution**: active for every session in this directory as
  of now.
- **Handoff discipline**: copy `handoffs/TEMPLATE.md` per role transition;
  the agent files already require it.
- **Workflow docs**: the Tier 1 flows work immediately; the embedded
  scripts are liftable into the Workflow tool as-is.

## Requires manual activation (deliberately)

1. **`git init`** — rollback anchors, spike worktrees, and handoff history
   all assume git. Nothing here has been committed or pushed.
2. **Hooks** — ship as `.example.js` and do nothing. Follow
   `.claude/hooks/README.md` (copy → wire → test-fire → later fail-closed).
3. **`settings.json`** — copy from `settings.example.json` after reviewing
   every line. This is what actually removes merge/push/destructive
   authority and protects CLAUDE.md/settings from agent edits.
4. **A first scope contract** — run the Steward on your first real
   workstream so `handoffs/current-scope.json` exists; the guards key off it.
5. **Scheduled maintenance** — only once the product is mature enough to
   deserve it (`/schedule` a weekly release-audit); pre-PMF, skip it.

## Operating rules of thumb

- Cheapest tier first: mode-switch in one session; delegate subagents when
  context or parallelism demands; script a workflow when the pipeline
  repeats.
- Fable decides shape (Steward, Grower, verification panels), Opus does the
  hard work (Builder, deep audits), Sonnet closes loops and fans out
  (Sweeper, chores). Route `effort` as well as model.
- The same model may play several roles — never in the same prompt without
  boundaries.
- No agent merges, pushes, or releases. Gates produce verdicts and
  evidence; humans ship.
