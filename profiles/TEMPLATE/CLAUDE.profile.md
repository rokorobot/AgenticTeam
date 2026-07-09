# <Project Name> — Profile Constitution Overlay

<!--
Copy profiles/TEMPLATE/ to profiles/<name>/ and replace every <angle-bracket>
placeholder. Delete sections that genuinely don't apply — but remember the
rule of altitude: project-wide rules live here; universal rules belong in
the core CLAUDE.md; single-workstream rules belong in the scope contract.

This overlay may TIGHTEN the core constitution (add obligations, forbid
more). It may never loosen it. Precedence: core > this file > scope
contract > task prompt.
-->

## Project identity

- **What this project is:** <one paragraph — the product, its user, its stakes>
- **Terminology:** <project terms agents must use correctly, one line each>
- **Primary risks:** <the 3–5 ways an agent could do real damage here>

## Project rules

<!-- The heart of the profile. Numbered, testable, each with a one-line
"why". Rules an adversarial verifier could check a diff against. -->

1. **<Rule name>.** <The rule.> *Why:* <consequence it prevents.>
2. ...

## Standing boundaries

<!-- Project-wide file/area boundaries that apply to EVERY workstream,
regardless of scope contract. The scope-template.json should mirror these
in forbiddenGlobs so hooks enforce them mechanically. -->

- Never edit: <globs/areas>
- Touch only via governed process: <globs/areas + which process>

## Proof obligations

<!-- Proofs every workstream in this project must include, beyond whatever
the scope contract adds. Mirror these in scope-template.json. -->

- <proof requirement + what its evidence must literally show>

## Positioning and communication rules

<!-- What agents may/may not claim on behalf of this project — legal,
medical, financial positioning; tone; what needs human sign-off. -->

- <rule>

## Handoff addendum

Every handoff for this project must also complete the sections in
`profiles/<name>/handoff-addendum.md`.
