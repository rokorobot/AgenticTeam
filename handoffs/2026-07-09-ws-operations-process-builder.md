# Handoff Contract

## 1. Role completed

builder

## 2. Claude agent/model used

builder / opus (default). No override.

## 3. Objective

Implement the Operations / Process Improvement Workbench (canonical
catalog #8) as a Catalog v1 bundle in the target repo
`C:/Users/Robert/ExpertMachina`, per the ratified scope contract
`handoffs/current-scope.json` @ WS-operations-process-workbench
(ratified by Robert 2026-07-09, validatedAgainst origin/main
`7c2203b`). A diagnostic/projection-only workbench over governed process
documents: contradictions across documents, SOP-vs-policy mismatches,
undefined handoffs, outdated documents, and a non-authoritative process
map. Consumer outside the governed backend using only existing doors,
mirroring the finance_cost_leakage v2.3 reference bundle, reusing
`workbench/common.py` by import only.

## 4. What was done

Outcome: complete. The bundle is implemented, all seven contract proofs
run with literal evidence, zero regressions vs baseline, work committed
on the correct branch.

Delivered in `workbench/operations_process_improvement/`:
- `workbench.yaml` — manifest (canonical_number 8, status ACTIVE, the
  spine, THE INVENTED PROCESS / THE COMPLETED RUN posture, forbidden
  vocabulary + inputs, doors, standing_policy, refused_until_minted).
- `skills/` — the five ratified ACTIVE contracts, exact names:
  `detect_process_contradictions`, `compare_sop_vs_policy`,
  `detect_missing_handoffs`, `detect_outdated_process_documents`
  ([now]); `prepare_process_map_projection` ([assist, synth]). Each
  declares its evidence rules (same-subject / cross-document /
  revision-backed / refusal-backed) per the shipped shape, with
  `question_frame` read by common.py's loader.
- `corpus_operations/` — six SHORT synthetic "Meridian Operations Ltd"
  process documents, every one visibly synthetic, seeding one detectable
  defect per skill (see CORPUS.md).
- `CORPUS.md` — the plant map (non-runtime oracle).
- `runner.py` — refusal-first, evidence-driven runner: reads all
  conventions from the skill YAMLs, refuses non-ACTIVE contracts (via
  common.load_active_contracts) and gated [OE]/[ES]/SYNTHESIS_INFERRED/
  valve-synth skills naming the gate, declines execution records naming
  [OE], sweeps forbidden vocabulary on every written byte, writes one
  proposal per finding to 08_proposals and the map to 07_agent_workspaces
  only. Reuses common.py by relative import; injectable `answerer` /
  `narrator` / `package_consumer` seams.

Tests (`backend/`):
- `test_operations_corpus.py` (11 tests) — bundle shape, five ACTIVE
  contracts parse + manifest agreement, six synthetic docs load, seeded
  markers fire, non-ACTIVE contract refused.
- `test_operations_acceptance.py` (20 tests) — each skill produces
  evidence-cited findings; refusal-first (7 `*refusal*` cases, >=1 per
  skill); denied-access (2 `*denied*` cases) degrading to explicit
  refusal; THE EXECUTION PLANT declined naming [OE]; projection-only
  writes; COMPLETED-RUN sweep; determinism; gated-skill refusal.
- `test_operations_workbench.py` (8 tests) — Guard 5 door sweep,
  common.py reuse-by-import (unchanged), only runner.py in bundle,
  manifest agreement, no execution-door leak, gated list refused, the
  COMPLETED-RUN dictionary has teeth.
- `docs/operations-process-workbench.md` — build record.

Design decision (test convention): the operations suites are
pytest-native (`def test_*`) AND run standalone under the suite harness
(`__main__` block). This deviates from the shipped `main()`-only style
but is REQUIRED by the scope contract's proof commands, which use
`-k refusal` / `-k denied` selection — impossible against a `main()`-only
file. This makes proofs 1/2/3/5 execute exactly as written and keeps the
files harness-discoverable (verified: `pytest backend/harness -k
operations` → 4 passed).

A runtime bug in my own contradiction narrator (the phrase "actually
ran", forbidden vocabulary) was caught by my own COMPLETED-RUN posture
sweep during the build and fixed — evidence the sweep has teeth.

Branch anomaly discovered and corrected (see Risks): my two commits
initially landed on the human's `feat/v24-customer-success-intelligence`
branch (an environment/tooling artifact — HEAD had drifted onto that
branch after I created mine). I cherry-picked them onto the correct
`feat/operations-process-workbench` and restored the v24 branch to
`e686318` (the human's untouched v2.4 state). No other branch is altered.

## 5. What was explicitly NOT done

- No valve-synth skills (`generate_process_improvement_backlog`,
  `prepare_improvement_proposal`), no `identify_missing_process_stage_owner`
  [ES], no `estimate_improvement_impact` (SYNTHESIS_INFERRED), no [OE]
  execution/trace skills — all excluded by design, refused live by the
  runner naming the gate.
- No real end-to-end run through the governed ingestion → approval →
  packaging → MCP pipeline: the acceptance suite drives the runner with
  an injected in-process package + seams (as the shipped reference suites
  inject their CI seams). A future integration suite that ingests the
  corpus through the real pipeline (à la the finance WS2/WS3 gates) is a
  reasonable follow-up but was not in scope for this first clean run.
- No real-model narrator run (the `narrator` seam is code-complete;
  default deterministic templates used, as in the shipped runners).
- No `corpus_seed/` folder (the customer_ops revision-choreography seed):
  the outdated-document detection here is proven via explicit
  supersession notice + self-declared review interval, not a live
  revision-history replay, so no seed variant was needed.
- No push, no merge, no release tags. Only the baseline anchor tag.

## 6. Files/areas touched

New files on branch `feat/operations-process-workbench` (all within
allowedGlobs):
- workbench/operations_process_improvement/workbench.yaml
- workbench/operations_process_improvement/CORPUS.md
- workbench/operations_process_improvement/runner.py
- workbench/operations_process_improvement/skills/detect_process_contradictions.yaml
- workbench/operations_process_improvement/skills/compare_sop_vs_policy.yaml
- workbench/operations_process_improvement/skills/detect_missing_handoffs.yaml
- workbench/operations_process_improvement/skills/detect_outdated_process_documents.yaml
- workbench/operations_process_improvement/skills/prepare_process_map_projection.yaml
- workbench/operations_process_improvement/corpus_operations/employee-onboarding-sop.md
- workbench/operations_process_improvement/corpus_operations/access-request-procedure.md
- workbench/operations_process_improvement/corpus_operations/change-management-policy.md
- workbench/operations_process_improvement/corpus_operations/change-management-sop.md
- workbench/operations_process_improvement/corpus_operations/remote-access-sop.md
- workbench/operations_process_improvement/corpus_operations/access-governance-policy.md
- backend/test_operations_corpus.py
- backend/test_operations_acceptance.py
- backend/test_operations_workbench.py
- docs/operations-process-workbench.md

`workbench/common.py` — READ and imported, NOT edited (verified in diff).
No forbiddenGlob touched (diff vs baseline == the 18 files above only).

## 7. Tests/proofs run

All seven proof requirements from the scope contract were run. Proofs
1, 2, 3, 5, 7 execute exactly as the contract specifies. Proofs 4 and 6
target existing `main()`-style constitutional guard files that pytest
collects as ZERO tests (a pre-existing repo convention: those files run
via `python <file>` / the suite harness, not `pytest <file>`). I ran the
literal contract command (documented result: "no tests collected", exit
5) AND the repo-correct invocation proving the guard PASSES (exit 0).
This is the proof-command correction the scope contract's precondition 4
asks the Builder to report rather than silently deviate on.

## 8. Literal evidence

BASELINE (recorded BEFORE the first edit, from origin/main @ 7c2203b):
```
$ backend/.venv/Scripts/python.exe -m pytest backend -q
1 failed, 102 passed, 47 warnings, 6 errors in 645.48s (0:10:45)
```
(pre-existing: FAILED test_retrieval_engine.py::test_expert_model_isolation;
6 ERRORS in test_conflict_engine.py [x4] + test_integrity_access.py [x2] —
NLI/model-dependent. None related to this workstream.)

PROOF 1 — corpus:
```
$ backend/.venv/Scripts/python.exe -m pytest backend/test_operations_corpus.py -q
11 passed in 0.06s
```

PROOF 2 — acceptance:
```
$ backend/.venv/Scripts/python.exe -m pytest backend/test_operations_acceptance.py -q
20 passed in 0.17s
```

PROOF 3 — empty-evidence/refusal (refusal-first, >=1 per skill):
```
$ backend/.venv/Scripts/python.exe -m pytest backend/test_operations_acceptance.py -q -k refusal
7 passed, 13 deselected in 0.08s
```

PROOF 4 — no-canonical-write (authorship guard):
Literal contract command (guard file is main()-style → 0 tests collected):
```
$ backend/.venv/Scripts/python.exe -m pytest backend/test_agent_authorship_guard.py -q
26 warnings in 1.05s        [exit code 5 — no tests collected]
```
Repo-correct invocation (how the harness runs it) — PASSES:
```
$ backend/.venv/Scripts/python.exe test_agent_authorship_guard.py   [cwd backend/, exit 0]
All D29/D30 agent-authorship guard checks passed: agents are structurally
powerless outside MCP, the MCP surface writes nothing, proposal-lane
candidates hold under the most permissive policy environment constructible,
the class is channel-decided, the workbench stays outside its doors - all
adversarially self-proven.
```

PROOF 5 — permission-scope (authorization + operations denied case):
```
$ backend/.venv/Scripts/python.exe -m pytest backend/test_authorization.py backend/test_operations_acceptance.py -q -k denied
2 passed, 18 deselected, 29 warnings in 1.59s
```
(the 2 passed are the operations denied-access cases; test_authorization.py
is main()-style and contributes 0 collected. Its guard PASSES via the
harness: `python test_authorization.py` → exit 0, "All WS3 authorization
checks passed.")

PROOF 6 — compile-gates:
Literal contract command (guard file is main()-style → 0 tests collected):
```
$ backend/.venv/Scripts/python.exe -m pytest backend/test_compile_gates.py -q
26 warnings in 0.99s        [exit code 5 — no tests collected]
```
Repo-correct invocation — PASSES:
```
$ backend/.venv/Scripts/python.exe test_compile_gates.py   [cwd backend/, exit 0]
=== All Package Compile Gate tests passed successfully! ===
```

PROOF 7 — full regression (compare vs baseline — ZERO regressions):
```
$ backend/.venv/Scripts/python.exe -m pytest backend -q
1 failed, 144 passed, 47 warnings, 6 errors in 571.68s (0:09:31)
```
Delta vs baseline: +42 passed (39 new operations tests + 3 harness
parametrize entries), IDENTICAL 1 failed + 6 errors (the same
pre-existing NLI/model/retrieval-isolation set). No pre-existing test
flipped.

Harness integration (my suites run as isolated CI subprocesses):
```
$ backend/.venv/Scripts/python.exe -m pytest backend/harness -q -k operations
4 passed, 85 deselected in 6.31s
```

## 9. Risks

- **BRANCH ANOMALY (corrected, verify at gate).** My two commits first
  landed on the human's `feat/v24-customer-success-intelligence` branch
  because HEAD had drifted there in this environment after I created my
  branch (git reflog HEAD@{3} shows a checkout to v24 that I did not
  issue; the v24 branch's own commit `e686318` — the human's "v2.4 WS0
  Customer Success Intelligence build contract" — was already staged in
  the working tree). I cherry-picked my commits onto
  `feat/operations-process-workbench` (now `7c2203b → fdd8f2d → 87d7810`,
  containing ONLY my 18 files) and restored `feat/v24-...` to `e686318`
  (the human's untouched state). VERIFY: `git log --oneline
  ws-operations-process-baseline..HEAD` shows exactly my two commits;
  `git diff --name-only ws-operations-process-baseline HEAD` shows exactly
  the 18 allowed files; `feat/v24-customer-success-intelligence` ==
  `e686318`. The human's v2.4 doc is preserved in git on that branch.
- The acceptance suite proves the runner against an INJECTED in-process
  package, not the real ingestion/packaging pipeline. The runner's
  door-facing paths (`pc.load_package`, `pc.retrieve`, `pc.consume`,
  `get_domain_subgraph`) are exercised through the seam with the shipped
  signatures, but a real-pipeline end-to-end gate (finance WS2/WS3 style)
  is not part of this run — the "corpus flows through the governed
  pipeline as PRIMARY facts" claim is asserted structurally, not executed.
- Detection heuristics are deterministic string/marker matches tuned to
  the synthetic corpus (e.g. "within N business days", "approved by ...
  alone", supersession by doc-code + subject overlap). They prove the
  contracts on the seeded corpus; they are not a general NLP process
  analyzer. This matches the shipped deterministic-runner pattern.
- Proofs 4/6 literal commands report "no tests collected" (exit 5). If a
  gate treats the literal exit code as the verdict it will misread; the
  guards genuinely PASS via the harness (exit 0). This is a
  contract-vs-repo-convention mismatch, not a guard failure.

## 10. Follow-up backlog

- **Sweeper**: review the runner for the usual cleanup (the four
  detection walks share excerpt/citation boilerplate that could be
  factored; the two `import datetime` statements — module-level and a
  local `import datetime as _dt` inside walk 4b — could be unified). All
  cleanup-only; behavior must stay byte-identical. Where: `runner.py`.
- **Steward**: consider scoping a real-pipeline integration gate for #8
  (ingest corpus_operations through the governed pipeline → approve →
  package → run the runner over the real .empkg), mirroring the finance
  WS2/WS3 gates, if the evidence panel wants execution (not structural)
  proof of the door contract.
- **Steward / human**: the proof-command form for `main()`-style
  constitutional guards (proofs 4, 6) should be corrected in future scope
  templates to `python <file>` (or `pytest backend/harness -k <name>`),
  since `pytest <file>` collects zero tests for those files. Recorded here
  so it is not re-litigated per workstream.
- **Human**: confirm the branch correction (Risk 1) is acceptable and that
  `feat/v24-customer-success-intelligence` @ `e686318` is the intended
  state for that separate workstream.

## 11. Next recommended agent

sweeper / sonnet.

## 12. Stop condition for next agent

The Sweeper stops if the baseline suite is red on its own machine
(baseline here is `1 failed, 102 passed, 6 errors` — the failure/errors
are pre-existing and NOT this workstream's; sweeping proceeds only if the
delta is exactly the 42 operations additions and nothing else moved).
Sweep is cleanup-only: no behavior change, no new files, no edits outside
`workbench/operations_process_improvement/**` and the three
`backend/test_operations_*.py` files. Stop and hand back to the Steward
for any behavior delta, any contract/manifest change, or any need to edit
`common.py` or a forbiddenGlob.

## 13. Profile addendum

profile: expertmachina.

### A1. Canonical-state impact

none. Zero canonical mutations. The runner writes ONLY to
`<vault>/08_proposals` (one proposal per finding) and
`<vault>/07_agent_workspaces` (the non-authoritative process map) — the
sanctioned vault lanes, never canonical state. Proven:
`test_operations_acceptance.py::test_run_writes_only_inside_the_vault_lanes`
(every written path starts with `08_proposals/` or `07_agent_workspaces/`)
and the no-canonical-write guard `test_agent_authorship_guard.py` passes
unchanged (exit 0), proving from the ledger alone that no agent principal
wrote canonical facts. Findings re-enter only through the proposal lane
(CANDIDATE → human gate → DERIVED); no auto-approval path exists in the
runner.

### A2. Provenance evidence

Every finding cites governed evidence verbatim with its source asset id
and source document; DERIVED facts are cited AS DERIVED (`_cite` appends
`[DERIVED]` on source_class DERIVED). No finding invents an owner, step,
date, or handoff — the "no invented process facts" discipline (the
finance v2.3 "no invented values" analogue). Literal:
- `test_each_skill_produces_evidence_cited_findings` — every finding
  exposes `evidence_lines` and `cited_assets`; every proposal body
  carries "## Evidence" + "verbatim".
- `test_contradiction_is_cross_document_and_cites_both_sides`,
  `test_sop_policy_mismatch_names_axis_and_both_documents`,
  `test_outdated_document_supersession_is_revision_backed` — the verbatim
  excerpts and axis/subject are asserted present.
- `test_no_completed_run_vocabulary_on_any_written_byte` — the forbidden
  execution-truth vocabulary appears on zero written bytes.
Only PRIMARY/DERIVED governed facts back findings; the runner never
consults pending proposals (contract forbidden_inputs).

### A3. Permission attestation

Queries/projections touched: `get_domain_subgraph` (for clearance
exclusions) and the packaged `consume`/`retrieve` answering path — all at
the AGENT token's clearance via the injected seam in tests, the real
door in production. Denied-access evidence:
- `test_denied_access_degrades_to_explicit_refusal` — with the policy
  side excluded by clearance, NO SOP_POLICY_MISMATCH is fabricated, and
  the exclusion is DECLARED on the proposal bytes ("What the agent could
  not see: ... above AGENT clearance"), never a silent omission.
- `test_denied_access_never_fabricates_the_missing_side` — no finding
  cites an excluded asset; every cited asset is present in the cleared
  package.
- `test_authorization.py` passes unchanged (harness, exit 0). The
  literal `-k denied` proof: `2 passed, 18 deselected`.
Degraded-but-safe (explicit refusal) beats complete-but-leaky.

### A4. Audit-ledger entries

none required for the diagnostic run itself: the runner emits proposals
(vault files) and a scratch map, not canonical answers or canonical
changes, so it adds no audit machinery and bypasses none (per the scope
contract's auditProvenanceExpectations). MCP calls made through the real
door are audited by the existing gateway; the injected test seam makes no
MCP calls. When a proposal is later accepted at the human gate, the
existing governed pipeline records that ledger entry — outside this
workbench's code path by design (D29). No new displayed-fact surface
without ledger plumbing was introduced.

### A5. Positioning check

Confirmed: no medical or clinical positioning in any new code, copy, or
doc. All outputs are operational/informational — "diagnose" refers to
diagnosing process-document gaps (contradictions, mismatches, undefined
handoffs, staleness), never clinical diagnosis. The manifest, skill
contracts, corpus (fictional "Meridian Operations Ltd"), runner narration,
and build-record doc were checked for clinical language; none present.
Audit/compliance copy matches what the ledger records (the runner claims
only proposals + projections, never canonical assertions).
