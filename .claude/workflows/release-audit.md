# Release Audit — Maintainer → Sweeper → Steward Gate

The operations pipeline for mature systems. Run before a release, on a
schedule (weekly/nightly via `/schedule` once the product justifies it), or
after a burst of Builder work has accumulated.

## Shape

1. **Audit (Maintainer, Opus).** Parallel audit lenses over the system:
   invariants & contract drift, test health (gaps + flakiness), security
   posture, performance vs. last known-good, dependency/build risk, docs &
   state-record accuracy. Output: findings table with severity and literal
   evidence; fixes only where correctness requires and authority allows.
2. **Sweep (Sweeper, Sonnet).** Cleanup pass over what the audit surfaced:
   dead code, stale flags, duplicated logic, misleading comments. Behavior
   preservation absolute; red baseline stops the pipeline.
3. **Gate (Steward, Fable).** Reads the audit findings, sweep handoff, and
   proof evidence. Verdict per release criterion: PASS / FAIL /
   WAIVED-WITH-REASON, written as a gate record in `handoffs/`. The gate
   output is a release RECOMMENDATION — tagging, pushing, and releasing
   remain human actions per the constitution.

## Tiers

- Tier 1 is fine for small repos: one session doing audit → sweep → gate
  sequentially, writing one handoff per phase.
- Tier 3 pays off when audits recur — same script, comparable results over
  time, and the findings tables in `handoffs/` become a trend line.

## Ready-to-lift Workflow script

```js
export const meta = {
  name: 'release-audit',
  description: 'Maintainer multi-lens audit, sweeper cleanup, steward release gate',
  phases: [{ title: 'Audit' }, { title: 'Sweep' }, { title: 'Gate' }],
}

// args: { target: string }  e.g. "release candidate on branch ws-provenance"
const FINDINGS = { type:'object', required:['findings'], properties:{ findings:{ type:'array', items:{
  type:'object', required:['severity','title','evidence','fixedNow'],
  properties:{ severity:{enum:['critical','high','medium','low']}, title:{type:'string'},
    evidence:{type:'string'}, fixedNow:{type:'boolean'}, deferNote:{type:'string'} } } } } }

const LENSES = [
  { key: 'invariants', prompt: 'broken invariants, contract drift between code, docs, and handoff state' },
  { key: 'tests',      prompt: 'test gaps, flaky tests, weakened or skipped assertions' },
  { key: 'security',   prompt: 'permission leaks, secrets in tree, unsafe defaults, injection surfaces' },
  { key: 'deps',       prompt: 'dependency CVEs, unpinned versions, lockfile and build drift' },
  { key: 'perf',       prompt: 'performance regressions versus last recorded known-good evidence' },
]

phase('Audit')
const audits = await parallel(LENSES.map(l => () =>
  agent(`You are the Maintainer (.claude/agents/maintainer.md). Audit lens:
         ${l.prompt}. Target: ${args.target}. Findings need literal
         command+output evidence. Fix ONLY correctness-preserving issues
         within your authority; defer the rest with cold-start context.`,
        { agentType: 'maintainer', label: `audit:${l.key}`, schema: FINDINGS })))
const findings = audits.filter(Boolean).flatMap(a => a.findings)
const critical = findings.filter(f => f.severity === 'critical' && !f.fixedNow)
log(`${findings.length} findings, ${critical.length} unfixed critical`)
if (critical.length > 0)
  return { verdict: 'BLOCKED', critical, note: 'Unfixed critical findings — no sweep or gate until resolved.' }

phase('Sweep')
const sweep = await agent(
  `You are the Sweeper (.claude/agents/sweeper.md). Clean up what this audit
   surfaced (dead code, stale flags, misleading comments/docs):
   ${JSON.stringify(findings)}. Baseline test run first; behavior
   preservation absolute; write your handoff to handoffs/.`,
  { agentType: 'sweeper', effort: 'low' })

phase('Gate')
const gate = await agent(
  `You are the Steward (.claude/agents/steward.md). Release gate for:
   ${args.target}. Read the audit findings, the sweeper handoff, and the
   proof evidence in handoffs/. Verdict per criterion: PASS / FAIL /
   WAIVED-WITH-REASON. Write the gate record to handoffs/. You recommend;
   a human releases.`,
  { agentType: 'steward' })
return { findings, sweep, gate }
```

## Escalation rules

- Unfixed critical findings short-circuit the pipeline before Sweep — a
  cleanup pass on a critically broken system is polish on a wound.
- Exposed secrets or evidence of canonical-state tampering stop everything
  and go straight to a human (Maintainer stop condition).
- WAIVED gate verdicts require a reason AND an expiry ("waived for this
  release only") in the gate record; standing waivers rot into policy.
