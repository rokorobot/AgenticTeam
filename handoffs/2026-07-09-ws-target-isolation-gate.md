# Gate Record — WS-agenticteam-target-isolation

**Date:** 2026-07-09 · **Gate owner:** steward / fable (orchestrator)
**Gate type:** 3-lens adversarial panel per contract
`handoffs/2026-07-09-scope-ws-target-isolation.json` verificationGate
(3 verifiers, **pass threshold 3-of-3**, default-to-FAIL on uncertainty).
**Under review:** AgenticTeam branch `feat/target-isolation-rule` @ `1b0c613`
(one commit ahead of main `1c86416`, 12 files).

## VERDICT: **FAIL — 2/3 lenses PASS; lens 1 FAIL blocks merge**

Threshold is 3-of-3; one lens failed on a real, undeclared contract
shortfall. **Merge to AgenticTeam main is NOT authorized.** The finding is
narrow and trivially remediable (see Remediation). No product repo touched;
ExpertMachina and PR #31 untouched; hook confirmed inert.

## Panel verdicts

| Lens | Model | Verdict | Summary |
|---|---|---|---|
| 1. Rule fidelity | fable | **FAIL** | All 7 rule requirements present and correctly worded — but 2 of 3 contract-named doc deliverables were skipped AND the gap was undeclared in the Builder handoff |
| 2. Genericness / scope | fable | **PASS** | 12 files all AgenticTeam-only; constitution names no product repo; settings never created/tracked; hook inert; `current-scope.json` byte-identical; `.json` handoff deviation ruled BENIGN |
| 3. Hook behavior | opus | **PASS** | Independently reproduced deny(canonical)/deny(main)/allow(isolated feature)/allow(self-edit) with Windows paths; suffix check anchored to repo root; MSYS false-ALLOW proven a test artifact, not a hook defect |

## The blocker (lens 1)

The contract's `implementationScope.expectedFiles` required:
"**profiles/README.md + .claude/hooks/README.md + README.md**: document
the rule, naming convention, and activation."

Only `.claude/hooks/README.md` was updated. `README.md` and
`profiles/README.md` are untouched in `1b0c613` (confirmed:
`git show --stat 1b0c613 -- README.md profiles/README.md` → empty; neither
mentions target isolation / "copy for EM" / targetWorktree / control
plane). This is compounded by a **memory-rule violation**: the Builder
handoff did not list this gap in §5 "explicitly NOT done" nor in its
"Deviations from contract" section, while §7 implied contract completeness.
An undeclared deviation is precisely what this lens exists to catch. The
Steward (orchestrator, acting as Builder for this core pass) owns the miss.

Secondary (lens 1): `.claude/hooks/README.md` activation step still says
settings.example.json "wires both hooks" — now three exist; the new hook's
wiring is documented only in its own header. Cosmetic: checklist item 6
drops "gate records" vs the contract's "handoffs/gate records" wording.

## Non-blocking backlog (from all three lenses)

1. Widen the scope-template `allowedGlobs` from `handoffs/*.md` to
   `handoffs/**` (keeps the workstream's own `.json` contract in-scope;
   `current-scope.json` + dated history stay forbidden). [lens 2]
2. Hook fails OPEN on non-git / unresolvable-`.git` paths — documented and
   by design; a pre-activation tuning item, not a canonical-edit bypass
   under normal conditions. [lens 3]
3. Hook's AgenticTeam self-exemption keys on `CLAUDE.md` +
   `.claude/agents/steward.md`; a target repo into which AgenticTeam
   governance had already been copied would be exempted — disclosed
   heuristic, tune `CANONICAL_MARKERS` before activation. [lens 1/3]
4. `CANONICAL_MARKERS` empty in the committed example — set to real
   product-repo paths at activation. [lens 3]

## Remediation to clear the gate (small, in-scope)

Both target files are inside the contract's `allowedGlobs`, so remediation
is a normal in-scope Builder edit — no re-scoping needed:
1. Update `README.md`: add target isolation to the layer table / overview
   and the `targetCanonical`/`targetWorktree` fields.
2. Update `profiles/README.md`: document the new scope-template fields and
   the naming convention (its scope-template schema is currently stale
   relative to the two templates this commit changed).
3. Fix `.claude/hooks/README.md` "both hooks" → three, and reference the
   new hook in the activation path.
4. Append a dated deviation/backlog note so the record is honest.
5. Re-run lens 1 only; lenses 2 and 3 remain valid (their surface is
   unchanged by doc edits).

## Effect
- Branch `feat/target-isolation-rule` @ `1b0c613` is **NOT authorized for
  merge**. It becomes authorizable after remediation + a lens-1 re-pass.
- The rule text itself is sound and generic; this is a completeness/
  honesty failure, not a correctness one.
- No merge, no tag, no branch deletion performed. ExpertMachina and PR #31
  untouched.

---

## Remediation (appended 2026-07-09)

**Authorized remediation pass** (Sonnet-class doc edits) addressing the
lens-1 blocker. Honest record of what happened:

- The original Builder pass (`1b0c613`) delivered only 1 of the 3
  `expectedFiles` documentation targets and did NOT declare the gap —
  a completeness + memory-rule miss. The gate caught it. This is the
  system working correctly on its own author.
- This remediation updates the two missing files and fixes the stale
  activation wording:
  - `README.md`: added a "Target isolation (AgenticTeam is a control
    plane)" section (control-plane rule, isolated `<name> copy for EM`
    copy, read-only canonical, in-target-PR return path, no-isolation-
    no-start).
  - `profiles/README.md`: rewrote "External target repos" for the new
    three-field schema (`targetRepo` identity / `targetCanonical`
    read-only / `targetWorktree` isolated work copy) + the six-point
    isolation verification and mechanical enforcement note.
  - `.claude/hooks/README.md`: corrected "both hooks" → scope-guard and
    proof-guard, and documented that `pretooluse-target-isolation` is
    inert and not yet wired by `settings.example.json`.
- The original `.json` contract-file glob deviation remains ruled BENIGN;
  backlog to widen the scope-template glob to `handoffs/**` still stands.

### Final verdict (after remediation `0493b37`)

**FULL GATE: PASS.** Lens 1 re-check returned **PASS** on `0493b37`;
Lenses 2 and 3 carry forward (their surface — code, hook, scope — is
byte-identical across the doc-only remediation, verified: `git diff
1b0c613 0493b37 --stat` touches only the three docs + this record).

| Lens | Verdict |
|---|---|
| 1. Rule fidelity | **PASS** (re-checked on 0493b37) |
| 2. Genericness / scope | PASS (carried forward from 1b0c613) |
| 3. Hook behavior | PASS (carried forward from 1b0c613) |

Lens-1 re-check confirmed: HEAD `0493b37` on `1b0c613`; commit touches only
the 3 contract-named docs + this gate record (no code, no settings, no
product repo); `README.md` and `profiles/README.md` now satisfy
`expectedFiles`; the three-field schema (`targetRepo`/`targetCanonical`/
`targetWorktree`) documented matches both scope templates; the original
omission is honestly recorded without rewriting the FAIL history (0
deletions in this file); the seven rule requirements are unregressed
(rule files byte-identical since 1b0c613).

Residual non-blocking backlog (unchanged): widen scope-template glob to
`handoffs/**`; hook fail-open on non-git paths; self-exemption heuristic;
empty `CANONICAL_MARKERS`; cosmetic "clean except authorized handoffs"
abbreviation.

**Branch `feat/target-isolation-rule` @ `0493b37` is AUTHORIZED for merge
preparation** — the merge itself remains a separate explicit human ruling
(no agent has merge authority). ExpertMachina and PR #31 untouched
throughout.
