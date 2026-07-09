# ExpertMachina — Profile Constitution Overlay

This overlay TIGHTENS the core constitution for all ExpertMachina
workstreams. Precedence: core `CLAUDE.md` > this file > scope contract >
task prompt. Nothing here grants authority the core denies.

## Project identity

- **What this project is:** a governed enterprise knowledge layer with
  diagnostic workbenches on top. Facts are ingested, approved, and audited
  through a governance pipeline; workbenches let users query, diagnose, and
  decide on top of that canonical layer. The product's value IS the
  trustworthiness of the layer — an ungoverned answer is not a smaller
  feature, it is a broken product.
- **Terminology:** *canonical state* = the approved fact store;
  *governed fact* = a fact with source, ingestion date, and approval state;
  *projection* = a read-only view derived from canonical state;
  *workbench* = a user-facing surface built on projections;
  *evidence* = governed facts cited with provenance.
- **Primary risks:** fabricated or unapproved facts presented as governed;
  silent mutation of canonical state; permission leakage across user
  scopes; audit gaps that make answers untraceable; accidental
  medical/clinical positioning.

## Project rules

1. **No evidence = no answer.** Any user-facing answer, recommendation, or
   diagnostic output must be backed by cited governed facts. When evidence
   is absent, the correct output is an explicit "no governed evidence
   available" state — never a best-effort guess, never fabricated fields.
   *Why:* one fabricated answer poisons trust in every real one.
2. **Approved evidence only.** Only facts in an approved state may back
   answers. Pending, rejected, or draft facts may be *shown* only when
   explicitly labeled with their state, and never used as support.
   *Why:* the approval pipeline is the product's warranty.
3. **Canonical state immutability.** No workbench, agent, or feature code
   path writes to canonical state. Corrections and additions travel only
   through the governed ingestion/approval pipeline. Code that opens a
   write path from a workbench to canon is a critical defect regardless of
   intent. *Why:* an audit trail over a mutable-from-anywhere store is
   fiction.
4. **Projection-only workbenches.** Workbenches read from projections, not
   from governance internals or raw stores. New data needs on a workbench
   are met by defining a new projection, not by reaching deeper.
   *Why:* the projection boundary is what makes rules 1–3 enforceable.
5. **Governed recommendations vs. canonical mutation.** Agents and features
   MAY generate recommendations, drafts, and proposed facts. Applying any
   of them to canonical state requires the governed approval flow with a
   human approver — recommendation and ratification are never the same
   step, never the same actor. *Why:* this is the bounded-agency principle
   applied to data.
6. **Audit and provenance obligations.** Every displayed fact must be
   traceable to source, ingestion date, and approval state. Every answer
   and every canonical-state change gets an audit-ledger entry. Features
   that display facts without provenance plumbing are incomplete, not
   minimal. *Why:* "we can show why" is the sales pitch and the compliance
   posture.
7. **Permission-aware behavior.** All queries, projections, and answers
   respect the requesting user's permission scope. No aggregation,
   caching, or "helpful" summary may leak facts across scopes. When
   permission is ambiguous, deny and say so — degraded-but-safe beats
   complete-but-leaky. *Why:* one cross-tenant leak is an existential
   event.
8. **No medical/clinical positioning by default.** Outputs are
   operational and informational. No diagnosis, treatment, or clinical
   decision claims in code, copy, or docs unless a human has explicitly
   ratified such positioning for a named feature in the scope contract.
   *Why:* regulatory exposure is a product decision, not an agent's.

## Standing boundaries

Mirrored in `scope-template.json` `forbiddenGlobs` so the scope-guard hook
enforces them mechanically on every workstream:

- Never edit: `src/governance/**`, `src/audit-ledger/**` (governed process
  changes are their own Steward-ratified workstreams with their own review
  bar — never a side effect of workbench work).
- Touch only via governed process: canonical-state schemas and approval
  workflows.

## Proof obligations (every workstream)

- **Empty-evidence state test:** literal test output proving the touched
  surface renders an explicit no-evidence state rather than fabricating.
- **No-canonical-write check:** evidence (test or static check) that the
  diff introduces no write path from workbench/feature code to canonical
  state.
- **Permission-scope test:** evidence that touched queries/projections
  filter by permission scope, including at least one denied-access case.

## Positioning and communication rules

- Never describe outputs as diagnoses, clinical advice, or medical
  recommendations. "Diagnostic workbench" refers to diagnosing operational
  and knowledge questions, and copy must not blur that line.
- Claims about audit/compliance capabilities in docs or UI copy must match
  what the ledger actually records — aspirational compliance copy is a
  rule-6 violation in prose form.

## Handoff addendum

Every handoff under this profile must complete
`profiles/expertmachina/handoff-addendum.md` (canonical-state impact,
provenance evidence, permission attestation, audit-ledger entries).
