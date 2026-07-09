# Handoff Contract

## 1. Role completed
steward

## 2. Claude agent/model used
steward / fable (session model claude-fable-5; scoping-only pass, no overrides)

## 3. Objective
First real profile-mode scoping pass: create a ratifiable
`handoffs/current-scope.json` for the **Finance & Cost Leakage Workbench**
under the `expertmachina` profile, and validate the profile template's
placeholder globs against the actual ExpertMachina repository. Scope
contract: `handoffs/current-scope.json` @ WS-finance-cost-leakage-workbench
/ 2026-07-09.

## 4. What was done
- Located the active target repo: `C:/Users/Robert/ExpertMachina`
  (last commit d4ae09e, 2026-07-07). Ruled out `ExpertMachina2` (stale,
  2026-06-23) and `ExpertMachinaWeb` (static assets only).
- Inspected the real layout: governed backend at `backend/app/**`
  (ledger, policy, identity, proposals, projections engine), MCP doors
  (`backend/mcp_server.py`, `backend/app/mcp_gateway.py`), vault with the
  constitutionally untouchable floor, and Workbench Catalog v1 convention —
  workbenches are `workbench/<name>/` bundles (workbench.yaml,
  skills/*.yaml contracts, corpus/, runner.py), per `customer_operations`.
- Read PROJECT_STATE.md (v1.6.0): confirmed D29 One-Way Valve, D30 Derived
  Source Class, the fifth permanent guard (test_agent_authorship_guard.py),
  and Catalog v1 skill-contract discipline — all folded into the contract.
- Wrote `handoffs/current-scope.json`: profile-mode, globs matched to the
  REAL tree, six proof requirements reusing existing permanent-guard and
  authorization tests as profile proofs, 4-lens evidence gate, D29-faithful
  canonical-mutation policy, and `humanApproval: PENDING`.

## 5. What was explicitly NOT done
- No Builder work: no workbench files, no skill contracts, no corpus, no
  tests created in the target repo. Nothing in ExpertMachina was touched.
- The profile template (`profiles/expertmachina/scope-template.json`) was
  NOT corrected, though corrections are now known (see backlog) — this
  pass writes only scope/handoff artifacts per its own constraints.
- No hooks activated, no `.claude/settings.json` created, no git
  write operations (no commit — per task constraints this pass stops
  before commit).
- The skill list for the workbench (which 5 diagnostics ship) was sketched
  in the objective but NOT ratified as final — that belongs to the human
  ratification conversation.

## 6. Files/areas touched
- handoffs/current-scope.json (created)
- handoffs/2026-07-09-ws-finance-cost-leakage-steward.md (this file)
(AgenticTeam repo only; target repo untouched)

## 7. Tests/proofs run
None to run for a scoping pass — proofs in the contract are for the
Builder. Verification here = JSON validity of the contract and a clean
`git status` in the target repo (see §8).

## 8. Literal evidence
```
$ node -e "JSON.parse(...current-scope.json)"
valid: handoffs/current-scope.json
$ git -C C:/Users/Robert/ExpertMachina status --short
(output recorded in session; no changes made by this pass)
```
(Exact outputs in the session transcript of 2026-07-09.)

## 9. Risks
- The proof commands assume the backend venv at
  `backend/.venv/Scripts/python.exe` and pytest discovery from repo root —
  Builder must verify the invocation on first baseline run and correct the
  contract via Steward if wrong (do not silently deviate).
- Target repo sits on branch `test/resurrect-golden-path-e2e`; if that
  branch changes the golden-path/e2e surface, the full-regression baseline
  must be taken AFTER it lands on main.
- The synthetic finance corpus must be genuinely synthetic; a corpus
  contributor pasting real vendor/invoice data would violate the profile's
  permission posture even if tests pass.
- `docs/workbench-finance-cost-leakage.md` is allowed but the docs/
  conventions in the target repo weren't deep-read; Builder should mirror
  an existing workbench doc if one exists.

## 10. Follow-up backlog
- **Correct the profile template** (`profiles/expertmachina/`): replace
  placeholder globs `src/governance/**` and `src/audit-ledger/**` with the
  real equivalents `backend/app/**`, `backend/mcp_server.py`, `vault/**`,
  `expert_machina.db`, `qdrant_db/**`; add `targetRepo` /
  `targetRepoRemote` / `preconditions` fields (this contract needed all
  three); note the Catalog v1 workbench-bundle shape in
  CLAUDE.profile.md's terminology section. Suggested role: steward.
- Decide the final five skill contracts for the Finance & Cost Leakage
  Workbench with Robert before Builder start.
- Consider a `workbench/TEMPLATE/` in the target repo mirroring the
  customer_operations bundle shape (suggested role: sweeper/steward, in
  ExpertMachina itself).

## 11. Next recommended agent
Human ratification by Robert first (update `humanApproval` in the
contract). Then: builder / opus, in the ExpertMachina repo, on a fresh
branch off main.

## 12. Stop condition for next agent
Builder stops when all six proofs have run with literal evidence and the
handoff (including profile addendum A1–A5) is written. Builder does not
merge, does not push, and stops immediately on any BLOCKED-finding
condition in the contract's stopConditions.

## 13. Profile addendum
Profile `expertmachina` is active. Addendum for a scoping-only pass:

- **A1. Canonical-state impact:** none — no code, no data, no proposals
  touched; the contract itself forbids all direct canonical writes (D29).
- **A2. Provenance evidence:** n/a for scoping; the contract's `corpus`,
  `acceptance` and `empty-evidence-state` proofs bind the Builder to
  evidence-cited, refusal-first output.
- **A3. Permission attestation:** none touched; the contract requires a
  denied-access test case before the work can gate.
- **A4. Audit-ledger entries:** none emitted; the workstream adds no new
  audit machinery and bypasses none (contract §auditProvenanceExpectations).
- **A5. Positioning check:** no medical/clinical positioning introduced;
  the workbench is finance/operations diagnostics, consistent with
  profile rule 8.
