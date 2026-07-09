# Feature Pipeline — Steward → Builder → Sweeper → Verification Gate

The standard path for ratified feature work. Runs at one of three tiers;
always use the cheapest tier that fits. The pipeline shape is identical at
every tier — only the orchestration mechanism changes.

## The three tiers

**Tier 1 — single-session mode switching (default for < ~1 day of work).**
One session, one context, phases in sequence:

1. Plan mode = Steward energy: scope the work, write
   `handoffs/current-scope.json`, get human ratification via plan approval.
2. Normal mode = Builder: implement within scope, run proofs.
3. `/simplify` = Sweeper pass on the diff.
4. `/code-review` = verification, then a Steward-style gate check against
   the scope contract's proof requirements.
5. Write the handoff contract(s) to `handoffs/`.

Zero handoff cost, full continuity. Use this unless a phase would flood the
context or phases can genuinely run in parallel.

**Tier 2 — subagent delegation.** The main session stays as
orchestrator/Steward and spawns the role agents from `.claude/agents/` via
the Agent tool. Each returns a handoff contract as its final message; the
orchestrator persists it to `handoffs/`. Use when: the build is large enough
to pollute the orchestrator's context, exploration and implementation
should not share a context, or the Sweeper should see the code cold (fresh
eyes are part of its value).

**Tier 3 — scripted pipeline (Workflow tool).** For the repeatable case,
control flow becomes code, not model judgment. Ready-to-lift script:

```js
export const meta = {
  name: 'feature-pipeline',
  description: 'Scope → Build → Sweep → adversarial gate for one ratified feature',
  phases: [
    { title: 'Scope' }, { title: 'Build' },
    { title: 'Sweep' }, { title: 'Gate' },
  ],
}

// args: { feature: string, scopeRatified?: boolean }
const HANDOFF = { type: 'object', required: ['role','done','notDone','filesTouched','evidence','risks','nextAgent'],
  properties: { role:{type:'string'}, done:{type:'string'}, notDone:{type:'string'},
    filesTouched:{type:'array',items:{type:'string'}}, evidence:{type:'string'},
    risks:{type:'string'}, nextAgent:{type:'string'} } }
const VERDICT = { type: 'object', required: ['pass','lens','reason'],
  properties: { pass:{type:'boolean'}, lens:{type:'string'}, reason:{type:'string'} } }

phase('Scope')
const scope = await agent(
  `You are the Steward (read .claude/agents/steward.md and CLAUDE.md).
   Scope this feature and write handoffs/current-scope.json: ${args.feature}.
   Reject if it violates the constitution.`,
  { agentType: 'steward', schema: { type:'object', required:['approved'],
    properties:{ approved:{type:'boolean'}, reasons:{type:'string'} } } })
if (!scope.approved) return { blocked: scope.reasons }

phase('Build')
const build = await agent(
  `You are the Builder (.claude/agents/builder.md). Implement the workstream
   in handoffs/current-scope.json. Run every proof command. Write your
   handoff to handoffs/ AND return it as structured output.`,
  { agentType: 'builder', schema: HANDOFF })

phase('Sweep')
const sweep = await agent(
  `You are the Sweeper (.claude/agents/sweeper.md). Clean the Builder's
   output for the active workstream. Baseline test run first. Behavior
   preservation is absolute. Write and return your handoff.`,
  { agentType: 'sweeper', schema: HANDOFF, effort: 'low' })

phase('Gate')
const lenses = ['correctness', 'scope-adherence', 'evidence-quality']
const votes = await parallel(lenses.map(lens => () =>
  agent(`Adversarial verifier, lens: ${lens}. Read handoffs/current-scope.json
         and the latest builder/sweeper handoffs. Inspect the actual diff and
         proof evidence. Try to REFUTE that the workstream satisfies its scope
         contract. Default to pass=false if uncertain.`,
        { schema: VERDICT, model: 'fable' })))
const passed = votes.filter(Boolean).filter(v => v.pass).length >= 2
return { shipped: false, gatePassed: passed, votes, build, sweep,
         note: 'Merge/release remains a human action per constitution.' }
```

Note the last line: even a passed gate returns `shipped: false`. The
pipeline has no merge authority by design — it produces a gate verdict and
evidence; a human ships.

## Failure routing

- Builder reports scope insufficient → back to Steward (re-scope), not
  onward to Sweeper.
- Sweeper finds a red baseline → stop the pipeline; Maintainer or Builder
  diagnoses; sweeping on red is forbidden.
- Gate fails → the failing verifiers' reasons become the Builder's next
  input under the SAME scope contract; two consecutive gate failures
  escalate to the Steward and a human.

## Hard-bug variant

Diagnose → Fix → Prove → Closeout: Steward-style diagnosis framing (Fable),
Builder fix (Opus), a dedicated prove step that reproduces the original
failure against the fix (Opus), Sweeper closeout (Sonnet). The prove step is
separate on purpose — the agent that wrote the fix is the wrong agent to
certify it.
