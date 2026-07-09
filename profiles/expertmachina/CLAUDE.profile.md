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
- **Terminology:** *canonical state* = the approved fact store (governed
  backend ledger); *governed fact* = a fact with source, ingestion date,
  and approval state; *projection* = a governed, clearance-filtered lens
  over the knowledge system — never another knowledge system; *evidence* =
  governed facts cited with provenance; *the doors* = the only sanctioned
  consumption paths: .empkg packages and MCP queries at a real AGENT
  token's clearance; *proposal lane* = the One-Way Valve (D29) re-entry
  path (vault `08_proposals` → PROPOSAL-lane connector → CANDIDATE → human
  gate → DERIVED fact).
- **Workbench (Catalog v1):** a workbench is a **bundle of declared skill
  contracts, never a vague agent** — `workbench/<domain_key>/` containing
  `workbench.yaml`, ratified skill contracts (`skills/*.yaml`; non-ACTIVE
  contracts are refused by the runner), a synthetic corpus (`corpus/`,
  seeded via `corpus_seed/`), and an acceptance runner (`runner.py`) that
  is refusal-first and evidence-driven. Reference implementation:
  `workbench/customer_operations/`.
- **Execution context:** ExpertMachina workstreams are SCOPED from
  AgenticTeam but EXECUTED in the target repo declared by the scope
  contract's `targetRepo` field (normally
  `C:/Users/Robert/ExpertMachina`). The Builder verifies the contract's
  `preconditions` — including branching from up-to-date `origin/main` —
  before its first edit, and stops if they don't hold. Handoffs and gate
  records live in AgenticTeam.
- **Freshness rule (lesson of WS-finance-cost-leakage):** the target
  project ships through its own pipeline concurrently. Scoping validates
  against `origin/main` AFTER a fetch (never the local working tree
  alone) and records the inspected SHA in the contract's
  `validatedAgainst` field; the Builder re-fetches and re-verifies that
  SHA at start, stopping for re-validation if origin has moved.
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

Real paths in the target repo (validated against the actual tree,
2026-07-09), mirrored in `scope-template.json` `forbiddenGlobs` so the
scope-guard hook enforces them mechanically on every workstream:

- Never edit from workbench workstreams: `backend/app/**` (the governed
  core — ledger, policy, identity, proposals, projections engine),
  `backend/mcp_server.py`, `backend/harness/**`, `vault/**` (including the
  untouchable floor `00_system` / `07_agent_workspaces` / `08_proposals`),
  the databases (`expert_machina.db`, `qdrant_db/**`), `uploads/**`,
  `frontend/**`, `.claude/**`, `.github/**`, env files. Governed-backend
  changes are their own Steward-ratified workstreams with their own review
  bar — never a side effect of workbench work.
- Shipped workbenches are each other's forbidden territory: a new
  workbench never edits `workbench/compliance_obligation/**`,
  `workbench/contract_intelligence/**`, `workbench/customer_operations/**`,
  `workbench/executive_briefing/**`, `workbench/finance_cost_leakage/**`,
  `workbench/procurement_intelligence/**`, or any later catalog entry.
  When a new workbench ships, its path joins this standing list
  (refreshed 2026-07-09 against origin/main `7c2203b`).
- `workbench/common.py` and `workbench/__init__.py` are shared plumbing:
  workbenches REUSE `common.py` by import (the sanctioned ruling-6
  pattern; its stability is tracked release over release) and never edit
  it from a workbench workstream.
- **Greenfield-only policy:** until a shipped-workbench-extension policy
  is minted by its own Steward design pass, workstreams target greenfield
  catalog slots only (per the ratified 16-workbench catalog in the target
  repo's `docs/workbench-catalog.md`; #10/#13/#14/#15 are the platform
  itself and are not workbench build targets either).
- Touch only via governed process: canonical-state schemas, approval
  workflows, compile gates, and permanent guards.

## Proof obligations (every workstream)

The target repo already carries constitutional tests — profile proofs
REUSE them rather than inventing parallel checks:

- **Refusal-first / empty-evidence test:** literal test output proving the
  touched surface refuses explicitly when the corpus lacks support, never
  fabricating findings (at least one refusal case per skill contract).
- **No-canonical-write check:** `backend/test_agent_authorship_guard.py`
  (the fifth permanent guard) must still prove from the ledger alone that
  no agent principal wrote canonical facts.
- **Permission-scope test:** `backend/test_authorization.py` intact, plus
  a workstream-specific denied-access case proving explicit refusal (not
  silent omission) under insufficient clearance.
- **Compile-gate neutrality:** `backend/test_compile_gates.py` and all
  permanent guards pass unchanged — a workstream may add gates via its own
  governed process, never weaken existing ones.

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
