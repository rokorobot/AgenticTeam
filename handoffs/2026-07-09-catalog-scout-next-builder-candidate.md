# Catalog Scout Record — next profile-mode Builder candidate

**Date:** 2026-07-09 · **Role:** steward/scout · fable
**Inspected:** ExpertMachina origin/main @ `5fd448f` (after fetch), via
git plumbing; working tree untouched. Sources: workbench manifests,
`docs/workbench-catalog.md` (ratified 2026-07-03, 16 canonical
workbenches), `docs/workbench-skill-registry.md` (master subtask
inventory), `docs/roadmap.md` NEXT markers.

## Shipped / forbidden territory

| # | Workbench | Status |
|---|---|---|
| 1 | executive_briefing | SHIPPED v1.9 (two-stage; queue behind [PMD]) |
| 2 | finance_cost_leakage | SHIPPED v2.3 (document-bound until [OE]) |
| 3 | procurement_intelligence | SHIPPED v1.8 |
| 5 | customer_operations | SHIPPED v1.6 (+ v2.2 deadline extension on #9) |
| 9 | compliance_obligation | SHIPPED v1.7 |
| 16 | contract_intelligence | SHIPPED v2.1 (shared engine feeding 2,3,6,9,1) |

Also forbidden as workbench targets: #10, #13, #14, #15 — Layer 1
platform primitives (they ARE ExpertMachina itself, per catalog).
`workbench/common.py`, `workbench/__init__.py`, and
`workbench/onboarding_diagnostic.py` (v1.4 reference) are shared/legacy
surface, not build territory. Roadmap NEXT markers point at platform
decision minting ([OE], [PMD]), not a next workbench — no in-flight
collision detected.

## Greenfield candidates (Layer 3 — FUTURE)

| # | Candidate | Commercial value | Governance risk | Size | Proofability | Canonical mutation | Consumer-only | Synthetic corpus | Collision risk |
|---|---|---|---|---|---|---|---|---|---|
| 8 | Operations / Process Improvement | High — catalog's stated sweet spot ("boring, painful, repeated") | Low — document-first by catalog label | Small | High — contradiction/gap detection with citations | None | Yes | Trivial (SOPs, checklists, runbooks) | **Lowest** |
| 12 | Internal IT / SaaS | Good | Low-medium | Small-medium | Good | None | Yes | Easy (SaaS inventory, access policies) | Medium-low — renewals/licenses flirt with #2/#3 territory |
| 4 | Sales & Account Growth | High | Medium | Medium | Good | None | Yes | Easy (proposals vs product docs) | Medium — promise-conflict pattern borders shipped #5 |
| 11 | Project / Delivery | Medium | Medium | Medium | Medium | None | Yes | Moderate | Medium — borders #13 platform surface |
| 6 | Customer Success / Retention | Good | Medium | Medium | Good | None | Yes | Easy | **High — nearest neighbor of shipped #5** |
| 7 | HR / People Operations | Good | **High — catalog flags it positioning-sensitive** | Medium | Good | None | Yes | Sensitive even synthetically | Low collision, high positioning risk |

Notes on previously floated ideas: **Vendor Renewal Risk would
collide** with shipped territory (#3 procurement, #2 finance
stale-terms, and the v2.2 deadline extension already computing renewal
deadlines). **Promotion History lands in #7 HR** — positioning-sensitive
per the catalog itself. The scan exists precisely to catch these.

## Recommendation: #8 Operations / Process Improvement Workbench

Rationale: greenfield with zero shipped-neighbor overlap; the catalog
labels it document-first (no [OE] dependency); the skill registry
already names 18 ratified subtask contracts to choose from — the
Builder implements ratified names, inventing nothing; synthetic corpus
is the easiest of all candidates; findings are purely diagnostic
(register posture: agents discover, humans execute); and it exercises
every profile mechanism (bundle convention, refusal-first, proposal
lane, constitutional proofs) at minimum risk.

Proposed ACTIVE five for ratification, drawn from the registry's
[now]-tagged contracts, mirroring the shipped 4-detect + 1-assist
shape:

1. `detect_process_contradictions` [now]
2. `compare_sop_vs_policy` [now]
3. `detect_missing_handoffs` [now]
4. `detect_outdated_process_documents` [now]
5. `prepare_process_map_projection` [assist]

Deliberately excluded from a first run: the valve-synth contracts
(`generate_process_improvement_backlog`, `prepare_improvement_proposal`),
`identify_missing_process_stage_owner` [ES], and
`estimate_improvement_impact` (SYNTHESIS_INFERRED) — each drags in
machinery a first clean end-to-end run doesn't need.

## Suggested next scope-contract prompt (after human picks)

Steward (fable): seed from `profiles/expertmachina/scope-template.json`;
workstream `WS-operations-process-workbench`; targetRepo ExpertMachina;
record `validatedAgainst: <origin/main SHA at scoping>`; allowed globs
`workbench/operations_process/**` + `backend/test_operations_*.py` +
one docs file; forbidden globs = template standing list PLUS the four
newly shipped workbenches and workbench/common.py (profile template
still needs this refresh — backlog item from the re-validation record);
proofs = the six-proof pattern with `test_finance_*`-style naming
checked against actual shipped conventions; preconditions = fresh
branch off up-to-date origin/main + Builder re-verifies
`validatedAgainst` SHA at start.

**Stop:** scouting only — no scope contract written, nothing
implemented, nothing committed.
