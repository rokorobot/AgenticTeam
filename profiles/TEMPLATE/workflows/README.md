# Profile workflows

Optional project-specific pipelines. They EXTEND the core workflows in
`.claude/workflows/` — they never replace them.

Good uses:
- A specialized variant of the feature pipeline whose gate has
  project-specific lenses (see `profiles/expertmachina/workflows/` for the
  pattern).
- A recurring project ritual the core doesn't know about (a data-refresh
  pipeline, a compliance sweep).

Rules:
- Same document shape as core workflows: the tiers it supports, the role
  sequence, failure routing, and a liftable Workflow script if Tier 3
  applies.
- A profile workflow may add phases, lenses, and proof steps to a core
  pipeline; it may not remove the core's gates or grant authority the core
  denies (no merge/push/release from any workflow).
- If a workflow would be useful to every project, promote it to
  `.claude/workflows/` and keep only the project-specific delta here.

Delete this README's placeholder guidance when you add real workflows, or
delete the directory if the profile needs none.
