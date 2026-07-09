# Re-validation Record — WS-finance-cost-leakage-workbench

**Date:** 2026-07-09 (same day as scoping and ratification — that speed
is itself the lesson; see §Learnings)
**Role:** steward / fable
**Trigger:** ratified scope was validated against a v1.6-era working tree;
target repo main had moved. Builder was correctly withheld pending this
pass.
**Supersedes nothing.** The scoping note, ratification record, and the
contract's ratified content stand unmodified as history. This record adds
the re-validation verdict and withdraws Builder authorization.

## What was inspected

- Local ExpertMachina main: `500c2a5` (PR #28, release/v220-project-state).
- **origin/main after fetch: `5fd448f`** — ahead of local main. Inspection
  was performed against origin/main via git plumbing (`ls-tree`/`show`);
  the target working tree (still on `test/resurrect-golden-path-e2e`) was
  not touched.
- Top commits on origin/main, all dated 2026-07-09:
  - `5fd448f` Merge PR #29 `feat/v23-finance-cost-leakage`
  - `33c27ac` docs: THE COMMERCIAL VERDICT PASSED — v2.3 milestone gate closed
  - `4a44d4e` v2.3 WS3: THE MILESTONE GATE (86th suite) + Finance catalog card

## Verdict: SUPERSEDED BY EVENTS — contract invalid, not amendable

`workbench/finance_cost_leakage/` **already exists on origin/main**,
shipped through ExpertMachina's own governance process (v2.3 milestone
gate closed, commercial verdict passed). The contract's objective —
"create the Finance & Cost Leakage Workbench" — is moot, and its
`allowedGlobs` (`workbench/finance_cost_leakage/**`) now point into a
shipped catalog entry, which the profile's standing-boundary rule
declares forbidden territory for any workstream.

The shipped bundle also differs from the ratified plan in every
convention the contract encoded:

| Aspect | Ratified contract assumed | Shipped reality (origin/main) |
|---|---|---|
| Skill contracts | duplicate_spend_detection, contract_invoice_drift, unowned_recurring_costs, missing_approval_evidence, stale_vendor_terms | compare_terms_vs_finance_policy, detect_cost_exposure, detect_missing_finance_evidence, prepare_cost_exposure_scenario, prepare_finance_evidence_pack |
| Corpus dir | `corpus/` (+ `corpus_seed/`) | `corpus_finance/` |
| Tests | `backend/test_finance_cost_leakage_{corpus,acceptance}.py` | `backend/test_finance_{corpus,acceptance,workbench}.py` |
| Catalog position | "second commercial entry" | Catalog now holds compliance_obligation, contract_intelligence, customer_operations, executive_briefing, procurement_intelligence, finance_cost_leakage — plus a shared `workbench/common.py` |
| Repo layout | root db/static files, no alembic | root restructured (`archive/`, `examples/`, `tools/`); backend gained `alembic/`, `pytest.ini`, lockfiles |

Constitutional tests survive intact on origin/main
(`test_agent_authorship_guard.py`, `test_authorization.py`,
`test_compile_gates.py`) — the profile's proof-reuse strategy remains
sound.

## Why this is not "amend the globs"

An amendment presumes the objective survives and details shift. Here the
objective itself was fulfilled by someone else's pipeline between scoping
and Builder start. Redirecting this contract at a different target would
be a silent redesign — exactly what the constitution routes back to a
human. Builder authorization is therefore WITHDRAWN pending a human
ruling.

## Options for the human ruling (steward recommendation: A)

- **A. Retire WS-finance-cost-leakage as overtaken by events; re-scope
  the ratified five skills as an EXTENSION workstream.** The five ratified
  diagnostics do NOT overlap the shipped five — they remain commercially
  distinct. ExpertMachina v2.2 already established the shipped-workbench
  extension pattern (the compliance workbench's deadline family). A new
  contract (new workstream id, e.g. WS-finance-leakage-extension) would
  scope the ratified skills as an extension of the shipped
  finance_cost_leakage workbench, following the v2.2 pattern and matching
  shipped conventions (`corpus_finance/`, `test_finance_*.py`). Requires a
  profile decision: shipped-workbench boundaries need an explicit
  Steward-ratified-extension carve-out.
- **B. Retire and pick a different domain** for the first AgenticTeam
  profile-mode Builder run, avoiding coordination with the just-shipped
  workbench entirely.
- **C. Retire with no successor** — treat the whole workstream as a
  successful calibration exercise (it already improved the profile twice).

## Learnings promoted to backlog (profile/process, not this contract)

1. **Freshness rule:** scope validation must inspect `origin/<default>`
   after a fetch, never the local working tree alone — this pass found
   local main itself one merge behind. Candidate for
   `profiles/README.md` external-target-repo rules.
2. **Same-repo-different-pipeline risk:** the target project ships work
   through its own governance concurrently. Scope contracts for external
   repos need a staleness check at Builder start (compare recorded
   origin SHA vs. current), not just at scoping. Candidate for the
   profile template: a `validatedAgainst` SHA field the Builder must
   re-verify.
3. **Standing forbidden list is stale:** the profile template's shipped
   workbench list must add contract_intelligence, executive_briefing,
   procurement_intelligence, finance_cost_leakage, and
   `workbench/common.py` / `workbench/__init__.py`.
4. The ratified-but-unshipped five skills are recorded in the superseded
   contract and the ratification record — they are inputs to option A,
   not lost work.

## Effect on the pending commit

`b22a6df` (ratify) stays intact and local. Recommended strategy: do NOT
amend it — append this re-validation as a follow-up commit and push both
together, so history shows ratify → supersede honestly, in order. The
alternative (dropping b22a6df) would rewrite canonical state to make the
record look cleaner, which the constitution forbids.
