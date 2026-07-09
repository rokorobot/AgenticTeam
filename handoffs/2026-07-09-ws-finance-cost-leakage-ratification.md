# Ratification Record — WS-finance-cost-leakage-workbench

**Date:** 2026-07-09
**Ratified by:** Robert (robertkonecny@gmail.com), in session
**Contract:** `handoffs/current-scope.json` @ WS-finance-cost-leakage-workbench
**Supersedes:** the PENDING state recorded in
`2026-07-09-ws-finance-cost-leakage-steward.md` §11 (that note stands
unmodified as the scoping record; this record completes it).

## Ruling

The Finance & Cost Leakage workbench is accepted as the first
ExpertMachina profile-mode workstream. Builder authorization was withheld
until the ExpertMachina profile overlay was corrected and committed — that
condition is now met (`396d580` correct expertmachina profile overlay,
`cf5a2a5` add profile calibration examples, both live on origin/main).

## Ratified skill contracts (the declared bundle, exactly five)

1. `duplicate_spend_detection` — finds likely duplicate invoices,
   payments, vendor charges, or recurring expenses.
2. `contract_invoice_drift` — compares approved contract terms against
   invoice/payment evidence and flags mismatches.
3. `unowned_recurring_costs` — finds recurring subscriptions, vendors,
   tools, or services with unclear owner, approver, or business purpose.
4. `missing_approval_evidence` — flags spend items where approval evidence
   is absent, stale, incomplete, or inaccessible.
5. `stale_vendor_terms` — detects vendor contracts, pricing, renewal
   terms, or obligations that appear outdated or no longer aligned with
   current spend.

## Standing policy (ratified verbatim)

These skills produce diagnostic findings only. They do not mutate
canonical facts, vendor records, contracts, invoices, approvals, or audit
state. Any suggested correction re-enters through the governed proposal
lane.

## Branch precondition (ratified)

Builder may start only from up-to-date main after
`test/resurrect-golden-path-e2e` lands or is explicitly abandoned/merged
away.

## Effect

- `humanApproval` in the scope contract is updated from PENDING to
  RATIFIED, referencing this record.
- Builder (opus, executing inside `C:/Users/Robert/ExpertMachina`) is
  authorized ONCE the branch precondition is verifiably satisfied — the
  Builder's first act is checking it, and it stops if unmet.
- All other contract terms (globs, proofs, gate, stop conditions) are
  unchanged from the scoping pass.
