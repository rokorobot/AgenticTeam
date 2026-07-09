# Handoff Contract

<!--
Copy to: handoffs/YYYY-MM-DD-<workstream>-<role>.md
One handoff per role transition. Handoffs are durable project memory:
append-only in spirit — correct mistakes with a new dated entry, never by
rewriting an old one. Every field is required; write "none" explicitly
rather than omitting a field.
-->

## 1. Role completed
<!-- prototyper | builder | sweeper | grower | maintainer | steward -->

## 2. Claude agent/model used
<!-- e.g. builder / opus (default) — or sweeper / opus (override: deep
runtime cleanup). Note overrides and why. -->

## 3. Objective
<!-- One paragraph. Reference the scope contract:
handoffs/current-scope.json @ <workstream id / date>. -->

## 4. What was done
<!-- Decisions made and work completed. Outcome first, details after. -->

## 5. What was explicitly NOT done
<!-- The backlog seed. Known gaps, deferred items, discarded options and
why. This field existing only in conversation context is a constitution
violation. -->

## 6. Files/areas touched
<!-- Complete list, path per line. "none — analysis only" is valid for
Grower/Steward handoffs. -->

## 7. Tests/proofs run
<!-- Name each proof requirement from the scope contract and whether it was
run. -->

## 8. Literal evidence
<!-- For each proof: the EXACT command and the EXACT result line(s), pasted,
not paraphrased. Example:
    $ npm test
    Tests: 214 passed, 214 total. Time: 8.41s
"Tests pass" without this section is an invalid handoff. Failures are
evidence too — paste them. -->

## 9. Risks
<!-- What could be wrong with this work. Unverified assumptions, areas the
proofs don't cover, behavior at edges not exercised. -->

## 10. Follow-up backlog
<!-- Actionable items with enough context to act on cold: what, where,
why it matters, suggested role. -->

## 11. Next recommended agent
<!-- Role + model, e.g. "sweeper / sonnet". "none — workstream gated and
closed" is valid only from a Steward gate record. -->

## 12. Stop condition for next agent
<!-- The exact point where the next agent must stop and hand off. -->
