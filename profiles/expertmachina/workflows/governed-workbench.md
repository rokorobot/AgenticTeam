# Governed Workbench — ExpertMachina variant of the feature pipeline

How a new workbench (or workbench feature) gets built under the
`expertmachina` profile. This EXTENDS `.claude/workflows/feature-pipeline.md`
— same Steward → Builder → Sweeper → Gate spine, same three tiers, same
failure routing. Only the deltas are listed here.

## Deltas from the core feature pipeline

**Scope phase (Steward):**
- Seed `handoffs/current-scope.json` from
  `profiles/expertmachina/scope-template.json`, not from scratch.
- Ratification must answer two profile questions explicitly: *which
  projections does this workbench read* (rule 4 — if a needed projection
  doesn't exist, defining it is scoped as its own part), and *which
  governed facts does it depend on* (rule 1 — a workbench over facts that
  aren't yet governed is scoped as blocked, not built speculatively).

**Build phase (Builder):**
- Read `profiles/expertmachina/CLAUDE.profile.md` before the first edit.
- The empty-evidence state is built FIRST, not last: the workbench must
  render its honest "no governed evidence available" state before any
  happy-path rendering exists. This ordering makes rule 1 structural
  rather than a retrofitted check.
- Provenance fields (source, ingestion date, approval state) are part of
  the data contract from the first commit, not a later enrichment.

**Sweep phase (Sweeper):** unchanged, plus one addition to the
behavior-preservation contract: provenance display and permission
filtering count as observable behavior — simplifying them away is a
behavior change, not cleanup.

**Gate phase:** replaced by the evidence gate — see
`profiles/expertmachina/workflows/evidence-gate.md` (4 verifiers, 3 must
pass, profile-specific lenses).

**Handoffs:** every handoff appends
`profiles/expertmachina/handoff-addendum.md` sections A1–A5.

## Tier 3 note

Lift the core `feature-pipeline` script and change three things: seed the
Scope agent's prompt with the profile template path; add the profile file
to each agent prompt ("read profiles/expertmachina/CLAUDE.profile.md
first"); swap the gate lenses for the evidence-gate panel:

```js
const lenses = [
  'correctness',
  'scope-adherence',
  'provenance-and-evidence',   // rules 1, 2, 6
  'permission-leakage',        // rule 7
]
const votes = await parallel(lenses.map(lens => () =>
  agent(`Adversarial verifier, lens: ${lens}. Read
         profiles/expertmachina/workflows/evidence-gate.md for your lens
         brief, then the scope contract, handoffs, and the actual diff.
         Try to REFUTE. Default to pass=false if uncertain.`,
        { schema: VERDICT, model: 'fable' })))
const passed = votes.filter(Boolean).filter(v => v.pass).length >= 3
```

## Failure routing additions

- A discovered write path from workbench code to canonical state (even
  pre-existing, even out of scope) stops the pipeline and goes straight to
  a human — it is a critical defect in the product's core guarantee, not a
  backlog item.
- A workbench whose value depends on ungoverned facts routes back to the
  Steward to scope the governed-ingestion work first. Building the surface
  ahead of its evidence inverts the product.
