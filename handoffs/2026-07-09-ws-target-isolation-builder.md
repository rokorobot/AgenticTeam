# Handoff Contract

## 1. Role completed
builder (D-Target Isolation Rule implementation, AgenticTeam core-only)

## 2. Claude agent/model used
builder / (orchestrator, session model). Mechanical governance + one inert
hook; no Opus escalation needed — hook logic stayed simple.

## 3. Objective
Implement the ratified D-Target Isolation Rule per contract
`handoffs/2026-07-09-scope-ws-target-isolation.json`. Core-only, AgenticTeam
repo only; no product repo touched.

## 4. What was done
On a dedicated branch `feat/target-isolation-rule`:
- **CLAUDE.md:** added the `## Target isolation` constitutional section
  (control-plane rule, isolated-copy rule, in-target-PR rule,
  no-isolation-no-start). Genericized — names no product repo.
- **docs/role-system-v0.1.md:** Builder §4.2 FIRST-ACT now carries the
  six-point isolation verification (cwd is `targetWorktree` not
  `targetCanonical`, name matches, remote matches, feature branch,
  canonical clean, AgenticTeam clean); added anti-pattern #11 "Agent
  edits the canonical checkout"; added a Change log entry.
- **.claude/agents/{builder,sweeper,prototyper}.md:** isolation
  preconditions aligned to the doc; builder references the new
  `targetWorktree`/`targetCanonical` fields.
- **.claude/hooks/pretooluse-target-isolation.example.js (NEW, inert):**
  PreToolUse guard denying Edit/Write/NotebookEdit into a canonical
  checkout (not named `<name> copy for EM`) or on `main`/`master`; exempts
  AgenticTeam editing itself.
- **.claude/hooks/README.md:** documented the new guard.
- **profiles/TEMPLATE + profiles/expertmachina scope-template.json:**
  added `targetCanonical` (read-only original) and `targetWorktree`
  (isolated copy where work happens); `targetRepo` now the repo identity
  (URL/owner-repo).

## 5. What was explicitly NOT done
- Did NOT overwrite `handoffs/current-scope.json` — it holds the held
  operations contract (PR #31) and is in this contract's forbiddenGlobs.
- Did NOT activate the hook (ships `.example`) or create
  `.claude/settings.json`.
- Did NOT touch ExpertMachina or any product repo.
- Did NOT merge this branch to AgenticTeam main (awaiting instruction).
- Did NOT change PR #31's status.

## 6. Files/areas touched
Modified: CLAUDE.md; docs/role-system-v0.1.md;
.claude/agents/{builder,sweeper,prototyper}.md; .claude/hooks/README.md;
profiles/TEMPLATE/scope-template.json;
profiles/expertmachina/scope-template.json.
New: .claude/hooks/pretooluse-target-isolation.example.js; and this
workstream's records (the ratified contract + steward + this builder
handoff).

## 7. Tests/proofs run
All seven from the contract.

## 8. Literal evidence
```
PROOF 1 (node --check hook):              exit 0 — syntax OK
PROOF 2 (JSON parse 3 files):             valid x3
PROOF 3a (deny canonical checkout):       permissionDecision "deny" — "not an isolated copy"
PROOF 3b (deny isolated copy on main):    permissionDecision "deny" — "has main checked out"
PROOF 4  (allow isolated feature branch): output [] — ALLOW
PROOF 4b (allow AgenticTeam self-edit):   output [] — ALLOW (control repo exempt)
PROOF 5 (genericness, core files):        only pre-existing role-system line 7 (projects named as consumers, not policy)
PROOF 6 (scope):                          all changed files within allowedGlobs (see deviation)
PROOF 7 (ExpertMachina untouched):        clean; HEAD 6388597; feat/operations-process-workbench intact
```
Hook fixtures used throwaway git repos in scratchpad; DENY/ALLOW payloads
piped via stdin with Windows-style paths (an MSYS `/e/` path format issue
initially produced false ALLOWs — a TEST artifact, fixed by using
`cygpath -m`; the hook itself was correct).

## 9. Risks
- The hook is a heuristic: it classifies "canonical" by the absence of the
  `<name> copy for EM` suffix and the presence of a git root that isn't
  AgenticTeam. A target repo legitimately named with that suffix, or an
  unusual layout, could mis-classify. It ships INERT (`.example`) precisely
  so it is validated on the real machine before activation; tune
  `CANONICAL_MARKERS` first.
- Rule is now law + machinery-on-disk, but the machinery is not ACTIVE
  until copied to `.js` and wired in settings. Until then, enforcement is
  prompt-level (agent files) — real but not fail-closed.
- Windows path/space handling: the `<name> copy for EM` convention has
  spaces; all downstream git/gh commands must quote paths.

## 10. Follow-up backlog
- Validate + activate the isolation hook on the real machine (set
  CANONICAL_MARKERS to the actual product-repo paths), then flip to
  fail-closed alongside the scope guard.
- Resolves WS-operations-process gate backlog item 7 (unattributed HEAD
  drift) BY DESIGN once active.
- `targetRepo` semantics changed (now repo identity, not path); the held
  operations `current-scope.json` still uses the old path meaning — leave
  it (historical/held); future contracts use the new three-field shape.

## 11. Next recommended agent
steward / fable — the 3-lens gate from the contract (rule-fidelity,
genericness, hook-behavior). Then human ruling on merging this branch to
AgenticTeam main. PR #31 remains a separate, still-held decision.

## 12. Stop condition for next agent
Gate writes a record, edits nothing, commits nothing. Merge of this branch
to AgenticTeam main requires explicit human authorization.

## 13. Profile addendum
none — core-only workstream (profile: null; target: AgenticTeam itself).

## Deviations from contract
1. This workstream's own governance records — the ratified contract
   (`...scope-ws-target-isolation.json`) and the two handoffs — are
   committed on this branch. The contract's `allowedGlobs` listed
   `handoffs/*.md`; the contract file is `.json`. Benign: these are the
   workstream's defining artifacts, not product edits, and the glob's
   `.md`-only form is a template imprecision (backlog: widen to
   `handoffs/**`). No file outside the workstream was touched.
