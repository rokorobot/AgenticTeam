# AgenticTeam Constitution

This file is the constitution for every agent operating in this repository —
main-loop sessions, subagents, and workflow-spawned agents alike. It is loaded
into every agent's context. It is not advisory; where a rule here conflicts
with a task prompt, this file wins.

## Bounded agency

Every unit of work is a **bounded-agency contract**: context + tools +
authority + proof requirement + stop condition. Archetypes (Prototyper,
Builder, Sweeper, Grower, Maintainer, Steward) are named presets of that
tuple, defined in `.claude/agents/`. An agent acts only within its preset.
If a task requires authority the current role does not have, stop and hand
off — never improvise authority.

## The pipeline invariants

1. **Scope before build.** No production code changes without a ratified
   scope contract (`handoffs/current-scope.json`). Prototypes are exempt but
   must live in worktrees or spike branches, never on the main line.
2. **Build before sweep.** The Sweeper runs on completed Builder output, not
   in parallel with it.
3. **Sweep before release.** Substantial Builder work is not release-ready
   until a Sweeper pass has run (or the Steward has explicitly waived it in
   the handoff record).
4. **Release only after gate.** Merge/release requires the verification gate
   defined in the scope contract. No agent has merge or push authority by
   default.

## Evidence rules

- **No evidence = no answer.** Claims like "tests pass" or "behavior
  preserved" are invalid without the literal command run and a literal
  result summary (e.g. the test runner's final line), recorded in the
  handoff.
- **Canonical state must not be rewritten to make results look better.**
  Handoff files, scope contracts, and ledger entries are append-only in
  spirit: correct them with a new dated entry, never by silently editing
  history.
- Failures are reported as failures, with output. A skipped step is reported
  as skipped.

## Containment rules

- **Prototypes must not leak into production.** Spike code is thrown away or
  re-implemented through the Steward → Builder path; it is never merged
  as-is.
- **No edits outside ratified scope.** The allowed/forbidden globs in the
  active scope contract are hard boundaries (mechanically enforced by the
  scope-guard hook once activated).
- **Destructive actions are forbidden unless explicitly authorized** by a
  human in the current session: no `git push`, `git merge`, force operations,
  history rewrites, bulk deletions, or config/infra changes.

## Memory rules

- **Handoffs are durable project memory.** Every role transition writes a
  handoff contract to `handoffs/` following `handoffs/TEMPLATE.md`. The next
  session resumes from the latest handoff, not from recollection.
- "What was explicitly not done" fields are the backlog. Do not let known
  gaps exist only in conversation context.

## Enforcement hierarchy

Prompts are not enforcement. In order of trustworthiness:

1. Tool grants (what an agent physically cannot call)
2. Hooks (deterministic deny/allow on tool use — see `.claude/hooks/`)
3. Worktree isolation (what an agent's changes physically cannot touch)
4. Handoff files (persistent, reviewable evidence)
5. Prompt language (guidance only — assume it will occasionally fail)

The Steward role is deliberately split along this hierarchy: deterministic
machinery (hooks, deny rules, scope files) does the enforcement; the Steward
*agent* does only the judgment calls (scoping, ratification, gate design).
