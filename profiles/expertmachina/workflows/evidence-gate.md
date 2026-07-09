# Evidence Gate — ExpertMachina verification panel

The profile's replacement for the core verification gate. Used as the Gate
phase of `governed-workbench.md` and standalone whenever ExpertMachina work
needs a release-grade check. Panel: **4 adversarial verifiers, 3 must
pass**, each with a distinct lens and instructions to REFUTE (default to
fail when uncertain). One verifier grading its own teammate's homework is
how plausible-but-wrong ships; four skeptics with different failure models
is how it doesn't.

## Lens briefs

**1. correctness** — Does the change do what the scope contract says?
Inspect the diff and the literal proof outputs in the handoff. Re-run
proofs if the evidence looks paraphrased rather than pasted. Weakened or
deleted tests are an automatic fail.

**2. scope-adherence** — Compare every touched file against
`allowedGlobs`/`forbiddenGlobs`. Any edit outside scope fails the gate even
if it is good work — good out-of-scope work is a re-scoping request, not a
pass (core constitution: containment).

**3. provenance-and-evidence** (profile rules 1, 2, 6) — Attack the
evidence chain: Can any displayed fact NOT be traced to source, ingestion
date, and approval state? Can any answer be produced without approved
facts backing it? Does the empty-evidence state actually render, or does
the surface fabricate under missing data? Are audit-ledger entries emitted
where the profile requires them? Check handoff addendum sections A1, A2,
A4 against the actual diff, not against their own claims.

**4. permission-leakage** (profile rule 7) — Attack scope isolation: trace
each touched query/projection for a path that returns facts outside the
requesting user's permission scope, including through aggregation,
caching, error messages, or summary text. Verify the denied-access test in
addendum A3 exists and actually asserts denial. Ambiguous permission
handling that defaults to "show it" is a fail.

## Verdict rules

- Each verifier returns pass/fail + reason; the gate passes at 3 of 4.
- A fail from lens 3 or 4 is never waivable by vote count alone: even at
  3-of-4 passing, a provenance or permission failure escalates to a human
  with the refuting verifier's reasoning. Rules 1–7 protect the product's
  core guarantee; majorities don't override it.
- The Steward writes the gate record to `handoffs/` (verdict per lens,
  evidence cited, PASS / FAIL / ESCALATED). Merge/release remains a human
  action.

## Model note

Verifier lenses 1–2 run well on the session default. Lenses 3–4 are the
judgment-dense ones — run them on Fable (or Opus at high effort) and spend
tokens here rather than on a fifth redundant verifier: killing a
plausible-but-wrong change is worth more than generating another one.
