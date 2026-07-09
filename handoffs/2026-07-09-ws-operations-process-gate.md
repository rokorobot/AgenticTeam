# Gate Record — WS-operations-process-workbench

**Date:** 2026-07-09 · **Gate owner:** steward / fable (orchestrator)
**Gate type:** adversarial 4-lens evidence panel per the scope contract's
`verificationGate` (4 verifiers, 3-of-4 threshold, provenance/permission
fails escalate regardless of vote). Run STRICTER than usual per human
instruction, due to the mid-build branch anomaly.
**State under review:** ExpertMachina branch
`feat/operations-process-workbench` = `7c2203b` + `fdd8f2d` + `87d7810`
+ one uncommitted sweep edit (runner.py). 18 files, +2,536 lines.

## VERDICT: **PASS — 4/4 lenses, zero blocking findings**

Merge/release remains a human action per the constitution. This record
authorizes CLOSEOUT PREPARATION only (commit sweep edit, assemble the
package); nothing ships without Robert's instruction.

## Panel verdicts

| Lens | Model | Verdict | Method highlights |
|---|---|---|---|
| 1. Scope / allowed-globs | opus | **PASS** | Full path audit vs. globs; hidden-mutation stat over common.py/backend-app/MCP/vault/frontend/constitutional docs = literally empty; five skill_ids verbatim-ratified, ACTIVE, correctly tagged |
| 2. Evidence / refusal-first / provenance | fable | **PASS** | Re-ran all proofs itself (39 passed; 7 refusal; guards exit 0 — exact match to claims); traced every add_finding call site to verbatim citations; proved refusal is structural (positive tests prove the same detectors fire) |
| 3. Permission / canonical-mutation / proposal-lane | fable | **PASS** | Wrote its own runtime probe (clearance-excluded document) + independent vault filesystem walk: writes ONLY 08_proposals (5) + 07_agent_workspaces (1); 5/5 proposals declare the exclusion on the bytes; static trace = exactly two write sites via common.write_hashed; zero DB/network/subprocess reach; authorship guard exit 0 |
| 4. Runtime / regression / branch hygiene | opus | **PASS** | Independent full-suite re-run: `1 failed, 144 passed, 6 errors in 666.04s` — character-for-character match to Builder claim incl. failure node IDs; reflog forensics reconstruct the branch anomaly and verify the correction; determinism/bounds/path-traversal scan clean |

## The four gate facts — adjudicated

1. **Pytest-native operations tests** — **BLESSED as scope-justified.**
   The contract's own `-k refusal`/`-k denied` proofs are impossible
   against `main()`-style files; the deviation lives entirely in allowed
   paths and remains harness-discoverable.
2. **`main()`-style constitutional guards collect zero under pytest** —
   **BLESSED as a contract defect, not a work defect.** Both guards PASS
   via the repo-correct `python <file>` (exit 0, re-verified by two
   independent lenses). Proof-template fix ordered into the backlog
   (with lens 4's related finding: `backend/pytest.ini` sets
   `testpaths = harness`, so the contract's `pytest backend` proof
   flat-collects historical suites and produces the 6 pre-existing
   NLI-dependent errors).
3. **Branch anomaly corrected** — **VERIFIED, three independent times**
   (Sweeper, orchestrator, and lens 4's reflog forensics, which
   reconstructed the full timeline: checkout drift → two commits landing
   on v24 as d51c983/3728e18 → cherry-pick to the ops branch as
   fdd8f2d/87d7810 → v24 restored). None of the four workstream SHAs is
   in v24's ancestry. RESIDUAL: git cannot attribute WHO issued the
   original drift checkout — the Builder's "environment artifact"
   explanation is plausible but unprovable; recorded as a standing
   process risk (see backlog #7).
4. **v24 Customer Success branch untouched** — **VERIFIED.** HEAD =
   `e686318`; grep across the entire bundle for v24/customer-success
   references = zero matches. (v24 history's "Operations" commits are
   pre-existing ancestors of baseline `7c2203b`, not this workstream's.)

## Consolidated hardening backlog (none blocking; all post-gate)

1. Harden `test_denied_access_degrades_to_explicit_refusal`: the
   proposal-bytes exclusion check is a conditional loop that could pass
   vacuously — make it unconditional. (Found independently by lenses 2
   AND 3; lens 3's runtime probe proved the property does hold: 5/5
   proposals carry the declaration.)
2. Manifest under-declares the write surface: `workbench.yaml` says
   `08_proposals` ONLY; the runner also writes the (sanctioned,
   docstring-declared) workspace map. Docs-accuracy fix.
3. Hardcoded axis fallback `"approval_authority"` (runner.py ~554)
   contradicts the "read from contract, never hardcoded" docstring —
   finding metadata only, no invented facts.
4. Supersession target selection binds at zero subject overlap once a
   doc-code match exists — heuristic-linkage risk; citations remain
   verbatim.
5. `test_run_writes_only_inside_the_vault_lanes` validates self-reported
   paths; add an independent filesystem-walk assertion.
6. Proof-template fix (profile scope-template): invoke constitutional
   guards the repo-correct way; reconcile the full-regression command
   with `pytest.ini` `testpaths`.
7. Process risk: unattributed HEAD drift during a Builder run. Candidate
   mitigations for the Steward to design: Builder verifies
   `branch --show-current` before EVERY commit (cheap, prompt-level),
   and/or worktree isolation for external-repo Builders (mechanical).
8. Detection-walk excerpt/citation boilerplate extraction (Sweeper
   backlog; needs a new file → its own scoped pass).
9. Trivial: Builder handoff wording ("module-level" import is
   function-level). Recorded here; original handoff stands unmodified.

## Evidence trail

Builder handoff: `2026-07-09-ws-operations-process-builder.md` ·
Sweeper handoff: `2026-07-09-ws-operations-process-sweeper.md` (carries
the four gate facts verbatim) · Full lens verdicts with literal
command output: session transcript 2026-07-09, four verifier reports.

## Effect

- The workstream's proof obligations are SATISFIED (all seven proofs,
  with fact-2's repo-correct guard invocation blessed above).
- Closeout is authorized to PREPARE on human instruction: commit the
  sweep edit on the workstream branch, then whatever
  publication/merge path Robert rules (PR vs. direct merge is his call —
  no agent has merge authority).
- The nine backlog items above transfer to the follow-up ledger; items
  1, 2, 6, 7 are recommended BEFORE the next Builder run.
