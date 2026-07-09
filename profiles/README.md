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

## External target repos (target isolation)

AgenticTeam and the project it governs live in DIFFERENT repositories, and
AgenticTeam is a control plane only — its content never enters a product
repo (constitution: Target isolation). Agents operate on an external target
exclusively through an **isolated copy** of that same repo; the user's
canonical checkout stays read-only. The scope contract carries three
target fields:

| Field | Meaning | Agent access |
|---|---|---|
| `targetRepo` | The target repository IDENTITY (remote URL or `owner/repo`) | reference only |
| `targetCanonical` | Absolute path to the user's ORIGINAL checkout | **read-only** — used only to fetch/verify and to clone/worktree from; never edited |
| `targetWorktree` | Absolute path to the isolated copy, named `<target repo name> copy for EM` | **where all Builder/Sweeper edits happen**; allowed/forbidden globs are relative to this root |

Omitting all three means the work targets **AgenticTeam itself** (core-only
mode); globs are then relative to this repo.

Rules that make this safe:

- **The Steward scopes from here; the Builder executes in the isolated
  copy.** Scoping reads the real target tree from a fetched remote (never
  guesses globs from convention) and records `preconditions` and the
  `validatedAgainst` SHA. The Builder's first act is the six-point
  isolation verification (constitution: Target isolation) — cwd is
  `targetWorktree` not `targetCanonical`, the copy is named `<name> copy
  for EM`, its remote matches, it is on a feature branch (not `main`), the
  canonical checkout is clean, and AgenticTeam is clean. Any check fails →
  stop; never fall back to the canonical checkout.
- **Isolation is enforced mechanically** once the
  `pretooluse-target-isolation` hook is activated: it denies edits that
  resolve into a canonical checkout or onto a `main`/`master` branch.
- **Product changes return only via an in-target PR** — the isolated
  copy's feature branch → the target repo's own `main`, after explicit
  human authorization naming owner/repo, PR#, source/target branches, head
  SHA, and cwd identity.

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

## Calibration data (`examples/`)

There are four kinds of content in this system, and they must never blur:

| Kind | Lives in | Authority |
|---|---|---|
| Generic core rules | `CLAUDE.md`, `.claude/**` | Law for every project |
| Profile rules | `profiles/<name>/CLAUDE.profile.md` etc. | Law for one project |
| Scope contracts | `handoffs/current-scope.json` | Authority for one workstream |
| Calibration data | `profiles/<name>/examples/**` | **No authority at all** |

`profiles/<name>/examples/` holds example, test, and calibration material —
real-world shapes from a project used to validate that the profile system
itself works. It is explicitly **non-canonical, non-production, and never
evidence by itself**: nothing in `examples/` ratifies a scope, proves a
claim, satisfies a proof requirement, or becomes a rule. If working with an
example teaches something durable, the lesson is promoted UP (into the
profile, or — only if truly universal — the core) and the example stays
what it is: a specimen.

Rules:
- No production data, secrets, or real customer/vendor content — synthetic
  or heavily reduced material only.
- Every example directory carries a README stating its non-canonical
  status and what it is meant to calibrate.
- Agents may READ examples for orientation; no scope contract should ever
  list `examples/**` as evidence, and the standing `profiles/**` forbidden
  glob keeps Builders out of them entirely.
- In-development project material is welcome here precisely BECAUSE it is
  unstable — that is what makes it good calibration data and bad law.

## Creating a new profile

Copy `profiles/TEMPLATE/` to `profiles/<name>/` and fill in the marked
sections. Keep it small: if a rule would improve every project, it belongs
in the core constitution, not in your profile. If a rule only matters for
one workstream, it belongs in the scope contract, not the profile. The
profile is for rules that are true for the whole project, all the time.

Planned profiles: `expertmachina` (first concrete overlay, in place),
`agentdeck`, `soundmachina` (create from TEMPLATE when work starts).
