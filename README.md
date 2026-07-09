# AgenticTeam — a governed Claude Code multi-agent operating structure

A reusable Claude Code operating system that turns six product archetypes
into **bounded agency**: each role is a preset of context + tools +
authority + proof requirement + stop condition, enforced by tool grants,
hooks, worktrees, and durable handoff files — not by prompt language.

Origin: the five-archetype team model (Prototyper, Builder, Sweeper,
Grower, Maintainer), extended with a Steward/Governor whose enforcement is
mostly deterministic machinery with an LLM only for judgment calls.

## Layered architecture

The core is project-agnostic; project rules are overlays. Seven layers,
from most to least stable:

| Layer | Location | Holds |
|---|---|---|
| Core constitution | `CLAUDE.md` | Universal rules for every agent, every project |
| Role system | `docs/role-system-v0.1.md` | Canonical contracts for the six roles: authority levels, lifecycle, handoffs, anti-patterns |
| Core agents | `.claude/agents/` | The six role presets and their tool grants (executable form of the role system) |
| Core workflows | `.claude/workflows/` | Generic pipelines (feature, explore, release-audit) |
| Project profiles | `profiles/<name>/` | Per-project governance, terminology, risks, extra workflows |
| Scope contracts | `handoffs/current-scope.json` | Per-workstream authority, globs, proofs, gate |
| Hooks/settings | `.claude/hooks/`, settings | Deterministic enforcement of everything above |
| Handoffs | `handoffs/*.md` | Durable memory and evidence, per role transition |

Precedence: core > profile > scope contract > task prompt. Profiles may
tighten core rules, never loosen them. Full details: `profiles/README.md`.

## Two ways to run it

**Core-only mode** — for a project with no special governance: ignore
`profiles/` entirely. The Steward writes `handoffs/current-scope.json`
from `handoffs/current-scope.example.json`, leaves the `profile` field
out, and the core constitution + scope contract are the whole rulebook.

**Profile mode** — for a governed project (e.g. ExpertMachina): the
Steward seeds the scope contract from
`profiles/<name>/scope-template.json`, sets `"profile": "<name>"`, and
every agent then loads `profiles/<name>/CLAUDE.profile.md` before acting
and completes the profile's handoff addendum in every handoff.

**Starting a new workstream from a profile** (select → seed → steward →
build):

```
> Use the steward agent: ratify workstream "<objective>" under the
  expertmachina profile. Seed handoffs/current-scope.json from
  profiles/expertmachina/scope-template.json; tighten, never weaken.
# human reviews and approves the scope contract
> Use the builder agent: implement the active workstream in
  handoffs/current-scope.json.
```

The Builder must refuse to start if the scope contract is missing — that
ordering (never Builder before Steward) is the pipeline's first invariant.

## Layout

```
CLAUDE.md                      Constitution — loaded by every agent; wins over task prompts
docs/
  role-system-v0.1.md          Role System v0.1 — canonical six-role contracts (authority levels,
                               lifecycle, handoffs, anti-patterns); agent files are its executable presets
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
profiles/
  README.md                    How the profile overlay layer works
  TEMPLATE/                    Copy to profiles/<name>/ to start a new project profile
    CLAUDE.profile.md          Overlay constitution skeleton
    scope-template.json        Scope-contract seed skeleton
    handoff-addendum.md        Extra handoff sections skeleton
    workflows/README.md        Rules for profile-specific workflows
  expertmachina/               First concrete profile (overlay only — core stays generic)
    CLAUDE.profile.md          Evidence, canonical-immutability, projection, permission, positioning rules
    scope-template.json        Pre-filled forbidden globs, profile proofs, evidence-gate panel
    handoff-addendum.md        A1–A5: canonical impact, provenance, permissions, ledger, positioning
    workflows/
      governed-workbench.md    Profile variant of the feature pipeline (deltas only)
      evidence-gate.md         4-verifier panel with provenance/permission lenses
handoffs/
  TEMPLATE.md                  The 12-field handoff contract + generic profile-addendum field
  current-scope.example.json   Shape of the Steward's ratified scope contract (core-only mode)
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
