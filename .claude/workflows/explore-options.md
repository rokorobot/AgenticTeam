# Explore Options — N Prototypers → Steward Selection → Builder Candidate

The discovery pipeline. Use when starting something new: a workbench, a
feature direction, a risky technical bet. The output is NOT code — it is
one ratified direction with a scope contract, ready for the feature
pipeline.

## Shape

1. **Fan-out (Prototypers).** N parallel Prototyper agents, each given a
   DIFFERENT framing of the same question — diversity of framing beats
   redundancy. Good framing axes: user-value-first, risk-first,
   smallest-shippable-first, governance-first (what does the audit/evidence
   layer enable?), contrarian (why should we NOT build this?).
2. **Selection (Steward + judges).** Score the pooled options, discard most
   of them explicitly (discards are recorded — they are backlog memory, not
   waste), and ratify at most ONE into a scope contract.
3. **Optional spike.** If the winner has a load-bearing technical unknown,
   one Prototyper spike in an isolated worktree to settle it BEFORE
   ratification. The spike's learning feeds the scope contract; the spike's
   code is thrown away.
4. **Handoff.** `handoffs/current-scope.json` + a Steward handoff naming the
   Builder as next agent. The feature pipeline takes over from here.

## Tiers

- Tier 1: a single session brainstorming 5–7 options then self-scoping is
  acceptable for small bets, but know what you lose: independent framings.
  One context anchors on its first idea.
- Tier 2/3 (recommended): genuinely parallel Prototypers who cannot see each
  other's output.

## Ready-to-lift Workflow script

```js
export const meta = {
  name: 'explore-options',
  description: 'Parallel prototyper fan-out, judged selection, one ratified direction',
  phases: [{ title: 'Explore' }, { title: 'Judge' }, { title: 'Ratify' }],
}

// args: { question: string }
const OPTIONS = { type:'object', required:['options'], properties:{ options:{ type:'array', items:{
  type:'object', required:['name','userValue','shape','risks','proofNeeded','keep'],
  properties:{ name:{type:'string'}, userValue:{type:'string'}, shape:{type:'string'},
    risks:{type:'string'}, proofNeeded:{type:'string'}, keep:{type:'boolean'} } } } } }
const SCORE = { type:'object', required:['scores'], properties:{ scores:{ type:'array', items:{
  type:'object', required:['name','score','why'],
  properties:{ name:{type:'string'}, score:{type:'number'}, why:{type:'string'} } } } } }

const FRAMINGS = [
  'user-value-first: maximize obvious value to the primary user',
  'risk-first: what is hardest/most uncertain, and what removes that risk',
  'smallest-shippable-first: what could be real in days, not weeks',
  'governance-first: what does the governed evidence/audit layer uniquely enable',
  'contrarian: strongest case for NOT building in this area, and what to do instead',
]

phase('Explore')
const rounds = await parallel(FRAMINGS.map(f => () =>
  agent(`You are a Prototyper (.claude/agents/prototyper.md). Framing: ${f}.
         Question: ${args.question}
         Produce 5-7 candidate directions. Do not write code. Optimize for
         discovery, not polish.`, { agentType: 'prototyper', schema: OPTIONS })))
const pool = rounds.filter(Boolean).flatMap(r => r.options)
log(`${pool.length} candidate directions from ${FRAMINGS.length} framings`)

phase('Judge')
const judged = await parallel(['user-value','feasibility','strategic-fit'].map(lens => () =>
  agent(`Judge panel, lens: ${lens}. Score each option 0-10 with one-line
         reasons. Options: ${JSON.stringify(pool)}`, { schema: SCORE, model: 'fable' })))

phase('Ratify')
const summary = await agent(
  `You are the Steward (.claude/agents/steward.md). Here are the pooled
   options and panel scores: ${JSON.stringify({ pool, judged })}.
   Select AT MOST ONE direction to ratify. Record every discard with a
   one-line reason (discards are durable memory). If the winner has a
   load-bearing technical unknown, name the spike needed BEFORE ratification
   instead of ratifying now. Write handoffs/current-scope.json only if
   ratifying, plus your handoff contract to handoffs/.`,
  { agentType: 'steward' })
return { summary }
```

## Rules that keep this honest

- Prototyper output is options + learnings, never a production candidate.
- The Steward may ratify zero options. "Nothing here clears the bar" is a
  valid, valuable outcome — record it and the reasons.
- Discarded options go into the handoff backlog with reasons; the next
  exploration starts from recorded discards, not a blank slate.
