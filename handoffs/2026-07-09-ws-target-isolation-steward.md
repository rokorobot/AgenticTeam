# Handoff Contract

## 1. Role completed
steward (constitutional scoping — D-Target Isolation Rule)

## 2. Claude agent/model used
steward / fable (session model claude-fable-5)

## 3. Objective
Ratify the D-Target Isolation Rule into a written, ratifiable AgenticTeam
scope contract, per Robert's ruling of 2026-07-09. Contract:
`handoffs/2026-07-09-scope-ws-target-isolation.json` @
WS-agenticteam-target-isolation.

## 4. What was done
- Wrote the standalone scope contract containing: the constitutional rule
  (AgenticTeam is control plane only; nothing from AgenticTeam ever merges
  into a product repo; agents work only in an isolated same-repo copy),
  all six definitions, the `<target repo name> copy for EM` naming
  convention, the 6-point pre-work verification checklist, the
  stop-never-fall-back failure rule, worktree-first/clone-fallback
  mechanism, the unambiguous-merge closeout rule, the full later-
  implementation scope (globs, expected files, six proofs, 3-lens gate,
  rollback), and the explicit statements (future workstreams only;
  ExpertMachina untouched; PR #31 remains held).
- Deliberately did NOT overwrite `handoffs/current-scope.json` — the
  operations contract stays active there while PR #31 awaits its ruling;
  this contract is promoted on Builder authorization.
- First use of CORE-ONLY mode: profile null, no targetRepo — the
  workstream targets AgenticTeam itself.

## 5. What was explicitly NOT done
- No implementation: constitution, role-system, agent files, templates,
  and the example hook are all UNCHANGED in this pass.
- ExpertMachina not touched in any way. PR #31 not merged, not closed —
  HELD per ruling.
- No commit (awaiting instruction), no hook activation, no settings.json.

## 6. Files/areas touched
- handoffs/2026-07-09-scope-ws-target-isolation.json (created)
- handoffs/2026-07-09-ws-target-isolation-steward.md (this file)

## 7. Tests/proofs run
JSON validity of the new contract (see §8). Implementation proofs are
defined in the contract for the later Builder pass.

## 8. Literal evidence
```
$ node -e "JSON.parse(require('fs').readFileSync('handoffs/2026-07-09-scope-ws-target-isolation.json','utf8'))"
(recorded in session, 2026-07-09 — parses clean)
$ git -C C:/Users/Robert/ExpertMachina status --short   → (empty; untouched)
```

## 9. Risks
- The naming convention contains spaces — every downstream git/gh command
  must quote paths; the example hook and docs must state this loudly.
- Rule scope boundary: the Claude Code client UI (merge modal wording,
  repo footer) cannot be governed by AgenticTeam artifacts; the closeout
  rule is the enforceable substitute. Recorded in the contract's explicit
  statements so nobody mistakes the residual gap for an oversight.
- Until the Builder pass lands, the rule is ratified LAW but not yet
  MACHINERY — the current Builder/Sweeper agent files still describe
  canonical-checkout execution. No external-repo Builder run should start
  in the gap between ratification and implementation.

## 10. Follow-up backlog
- Builder pass per the contract's implementationScope (on authorization).
- Gate backlog item 7 from WS-operations-process (unattributed HEAD
  drift) is RESOLVED BY DESIGN once this lands — cross-reference it in
  the implementation handoff.
- Separate Claude Code feature request: merge-confirmation UI should
  always print owner/repo#PR source→target @SHA.

## 11. Next recommended agent
Human ruling: authorize the Builder pass (and promotion of this contract
to current-scope.json). Then builder / sonnet per the contract's
downstreamPlan (opus escalation only if the hook proves non-trivial).

## 12. Stop condition for next agent
Builder stops when all six proofs have literal evidence and the handoff
is written; ships the hook as .example (inert); does not touch
settings.json; does not commit without instruction; never touches any
product repo.

## 13. Profile addendum
none — core-only workstream (profile: null; target: AgenticTeam itself).
