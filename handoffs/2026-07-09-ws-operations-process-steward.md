# Handoff Contract

## 1. Role completed
steward (scoping + ratification-by-ruling + profile refresh, one pass as
approved)

## 2. Claude agent/model used
steward / fable (session model claude-fable-5)

## 3. Objective
Scope the first clean AgenticTeam profile-mode Builder workstream —
**WS-operations-process-workbench** (Operations / Process Improvement,
canonical #8, Layer 3 greenfield) — and fold in the approved profile-
template refresh. Scope contract: `handoffs/current-scope.json` @
WS-operations-process-workbench / 2026-07-09. Predecessor workstream
(WS-finance-cost-leakage) remains SUPERSEDED-BY-EVENTS; its records stand
unmodified (git history `b22a6df` → `a6582e7`).

## 4. What was done
- Re-fetched and re-inspected the target: **origin/main had moved again**
  (`5fd448f` → `7c2203b`, PR #30, release/v230-project-state) between the
  scout pass and this pass — the third same-day move, vindicating the
  freshness rule. Verified PR #30 is docs-only (PROJECT_STATE + roadmap;
  workbench surface byte-identical to the scout baseline).
- Confirmed no collision at `7c2203b`: roadmap's only NEXT is [OE]
  decision-minting; no next workbench planned by the target's own
  pipeline; #8 remains greenfield.
- Confirmed conventions from the newest shipped bundle (finance v2.3):
  `test_<short>_{corpus,acceptance,workbench}.py` naming; per-domain
  corpus dir; `common.py` reused by import (roadmap tracks it "unchanged
  a sixth time" — its stability is monitored).
- **Profile refresh** (approved in the ruling):
  `profiles/expertmachina/scope-template.json` gained `validatedAgainst`
  (with Builder re-verification semantics) and the refreshed standing
  forbidden list (six shipped workbenches + `common.py` + `__init__.py`);
  preconditions now require the fetch-and-verify step.
  `profiles/expertmachina/CLAUDE.profile.md` gained the refreshed shipped
  list, the common.py import-only rule, the greenfield-only policy, and
  the freshness rule.
- **New scope contract** written with all required fields: ratified five
  ACTIVE skills (drawn from the target's own skill registry §8),
  diagnostic/projection-only standing policy verbatim, greenfield
  collision policy, `validatedAgainst: 7c2203b`, seven proof gates
  (compile-gate check added to the six-proof pattern), refreshed
  forbidden globs including the target's constitutional docs
  (DECISIONS.md, catalog, registry, roadmap, PROJECT_STATE.md).

## 5. What was explicitly NOT done
- No Builder work: nothing created or modified in ExpertMachina.
- No commit (per constraints — commit is a separate instructed step).
- The Finance records were not touched.
- The shipped-workbench-extension policy was NOT designed — deliberately
  deferred to its own Steward pass per the ruling.
- The exact docs-file title/versioning convention for the build record
  was left to Builder-time matching (noted in the contract).

## 6. Files/areas touched
- handoffs/current-scope.json (replaced with the new contract;
  predecessor preserved in git history and its records)
- handoffs/2026-07-09-ws-operations-process-steward.md (this file)
- profiles/expertmachina/scope-template.json (refresh)
- profiles/expertmachina/CLAUDE.profile.md (refresh)
(AgenticTeam repo only; target repo untouched)

## 7. Tests/proofs run
None to run for a scoping pass — the seven proof gates in the contract
are the Builder's obligations. Verification here = JSON validity + clean
target-repo status (§8).

## 8. Literal evidence
```
$ node -e "JSON.parse(...current-scope.json)"   → valid (see session)
$ git -C C:/Users/Robert/ExpertMachina status --short   → (empty)
$ git -C C:/Users/Robert/ExpertMachina diff --name-only 5fd448f 7c2203b -- workbench/
(empty — workbench surface unchanged by PR #30)
```

## 9. Risks
- Same-day target velocity is HIGH (three origin/main moves today). The
  validatedAgainst re-check at Builder start is load-bearing, not
  ceremonial — expect it to fire.
- Proof commands still assume `backend/.venv/Scripts/python.exe` +
  root-relative pytest; precondition 4 makes the Builder verify the
  invocation on the baseline run and report corrections.
- The target repo has its own `.claude/` and conventions; the Builder
  works under AgenticTeam's contract but inside the target's tree —
  the target's CLAUDE.md (if any) applies there too; on conflict, stop
  and report rather than choosing silently.
- `docs/operations-process-workbench.md` naming may not match the
  target's `<name>-vX.Y.md` convention; Builder should mirror what it
  finds and note the deviation in the handoff.

## 10. Follow-up backlog
- Design the shipped-workbench-extension policy in its own Steward pass
  (after one clean end-to-end run) — prerequisite for ever building the
  retired five Finance skills as an extension.
- Consider promoting the freshness rule (`validatedAgainst` +
  fetch-verify) from the ExpertMachina profile up to
  `profiles/TEMPLATE/scope-template.json` — it is likely universal for
  any external-target profile.
- Ratification records for future workstreams could move to a dedicated
  `handoffs/ratifications/` folder if volume grows.

## 11. Next recommended agent
Mechanical closeout (sonnet): commit the new scope + profile refresh
TOGETHER (they are linked — the refresh is what makes the scope safe),
then push on instruction. Then: **builder / opus**, executing inside
`C:/Users/Robert/ExpertMachina` under this contract.

## 12. Stop condition for next agent
Closeout stops after commit/push and verification — it does not start
the Builder. The Builder stops per the contract's stopConditions,
beginning with the validatedAgainst re-check.

## 13. Profile addendum
Profile `expertmachina` active. Scoping-only pass:
- **A1. Canonical-state impact:** none — no code or data touched in the
  target; the contract forbids all direct canonical writes (D29).
- **A2. Provenance evidence:** n/a at scoping; the contract binds the
  Builder to evidence-cited, refusal-first output with no invented
  owners, dates, or process steps.
- **A3. Permission attestation:** none touched; denied-access test case
  required before gate.
- **A4. Audit-ledger entries:** none emitted; no new audit machinery, no
  bypasses.
- **A5. Positioning check:** no medical/clinical positioning; process
  diagnostics are operational. Note: HR-adjacent content (people,
  performance, promotion) is explicitly NOT in this workstream's corpus
  domain — process documents only.
