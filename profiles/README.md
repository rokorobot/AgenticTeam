# Profiles — project overlays on the generic core

AgenticTeam's core (constitution, agents, workflows, hooks) is deliberately
project-agnostic. Everything a specific project needs — its terminology,
risks, governance rules, extra proof obligations — lives here as a
**profile overlay**. The core is the operating system; a profile is the
policy pack a project boots with.

## The layering

| Layer | Location | Purpose | Changes when… |
|---|---|---|---|
| 1. Core constitution | `CLAUDE.md` | Universal rules: bounded agency, evidence, containment, memory | Rarely — affects every project |
| 2. Core agents | `.claude/agents/` | The six role presets (tools, authority, stop conditions) | Rarely |
| 3. Core workflows | `.claude/workflows/` | Generic pipelines (feature, explore, release-audit) | Rarely |
| 4. Project profile | `profiles/<name>/` | Project governance, terminology, risks, extra rules and workflows | Per project |
| 5. Scope contract | `handoffs/current-scope.json` | Per-workstream authority, globs, proofs, gate | Per workstream |
| 6. Hooks/settings | `.claude/hooks/`, `.claude/settings.json` | Deterministic enforcement of layers 1–5 | When activating/tightening |
| 7. Handoffs | `handoffs/*.md` | Durable memory and evidence | Every role transition |

Precedence (defined in the constitution): core > profile > scope contract >
task prompt. **Profiles tighten; they never loosen.** A profile that grants
authority the core forbids is invalid.

## Anatomy of a profile

```
profiles/<name>/
  CLAUDE.profile.md      Project constitution overlay — the rules agents load
  scope-template.json    Seed the Steward copies to handoffs/current-scope.json
  handoff-addendum.md    Extra handoff sections this profile requires
  workflows/             Optional project-specific pipelines (extend core ones)
```

## How activation works

Profiles are activated **per workstream, through the scope contract** — not
globally. The Steward sets `"profile": "<name>"` when ratifying; from then
on every agent working that workstream must read
`profiles/<name>/CLAUDE.profile.md` first and complete the profile's
handoff addendum in its handoffs. No profile field = core-only mode.

## Starting a new workstream from a profile

1. **Select profile** — decide which project this workstream belongs to.
2. **Seed the scope** — the Steward copies
   `profiles/<name>/scope-template.json` as the starting point for
   `handoffs/current-scope.json` (the template pre-fills the profile's
   standing forbidden globs, proof obligations, and gate lenses).
3. **Run the Steward** — it fills in the workstream specifics (objective,
   allowed globs, rollback anchor), verifies nothing in the template was
   weakened, and ratifies.
4. **Only then invoke the Builder** — which reads the scope contract, sees
   the `profile` field, loads the overlay, and works within both.

Example session flow:

```
> Use the steward agent: ratify a new workstream "<objective>" under the
  expertmachina profile. Seed from profiles/expertmachina/scope-template.json,
  write handoffs/current-scope.json, and hand off.
# review + approve the scope contract
> Use the builder agent: implement the active workstream in
  handoffs/current-scope.json.
```

## Creating a new profile

Copy `profiles/TEMPLATE/` to `profiles/<name>/` and fill in the marked
sections. Keep it small: if a rule would improve every project, it belongs
in the core constitution, not in your profile. If a rule only matters for
one workstream, it belongs in the scope contract, not the profile. The
profile is for rules that are true for the whole project, all the time.

Planned profiles: `expertmachina` (first concrete overlay, in place),
`agentdeck`, `soundmachina` (create from TEMPLATE when work starts).
