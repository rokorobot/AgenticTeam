# finance_cost_leakage — Calibration Placeholder

> **NON-CANONICAL. NON-PRODUCTION. NOT EVIDENCE. FOR VALIDATION AND
> CALIBRATION ONLY.**

- **What it is:** a placeholder for calibration material around the first
  ExpertMachina profile-mode workstream (WS-finance-cost-leakage-workbench
  — currently scoping-only and **unratified**; see
  `handoffs/current-scope.json` in AgenticTeam for the pending contract).
  No production data has been copied here, and none may be.
- **What it calibrates:** whether the `expertmachina` profile's templates
  survive contact with a real workstream — the Catalog v1 bundle shape
  (`workbench/<domain_key>/workbench.yaml`, ratified skill contracts,
  synthetic corpus, acceptance runner), the corrected forbidden globs, the
  `targetRepo`/`preconditions` fields, and the constitutional-test proof
  reuse. Its first calibration result is already recorded: the 2026-07-09
  scoping pass, which exposed the placeholder-glob mismatch and led to the
  profile-overlay correction.
- **Provenance:** shape-only sketches derived from the in-development
  ExpertMachina Workbench Catalog v1 convention (reference:
  `workbench/customer_operations/` in the target repo). All content
  fabricated. NEVER production corpus documents, real invoices, vendor
  names, or customer data — the profile forbids real financial data even
  in the *actual* workstream corpus; the bar here is stricter still.
- **Expiry:** re-validate against the target repo when the Finance & Cost
  Leakage workstream is ratified and built, and at the next ExpertMachina
  minor version (> v1.6.0) — whichever comes first. A calibration corpus
  older than the convention it calibrates is noise.

## What may eventually live here

Shape-level specimens only, added as they become useful for calibrating
profile changes (all synthetic):

- a skeletal `workbench.yaml` matching the catalog convention
- one example skill-contract YAML showing the declared-contract fields the
  profile's proof requirements assume
- a two-document synthetic mini-corpus demonstrating the refusal-first
  case (one question answerable, one that must refuse)

None of these exist yet, by design: the real workstream is unratified, and
specimens sketched before the skill contracts are ratified would calibrate
against guesses. This README is the placeholder.

## What must never live here

Production corpus documents, real financial records, credentials,
database extracts, `.empkg` packages built from governed state, or
anything carrying an actual approval state. If it was ever canonical, it
does not belong in a calibration folder.
