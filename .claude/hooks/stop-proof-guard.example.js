#!/usr/bin/env node
/**
 * stop-proof-guard.example.js  (SAFE EXAMPLE — not active)
 *
 * Stop hook: mechanizes "no evidence = no answer". When an agent tries to
 * end its turn, this hook checks that the proof commands required by the
 * ratified scope contract actually appear in the session transcript. If
 * none were run, the stop is blocked and the agent is told to run its
 * proofs before finishing.
 *
 * This is deliberately a heuristic, not a court of law: it checks that the
 * proof COMMANDS were executed at all. Whether their output is honestly
 * recorded in the handoff remains the verification gate's job (adversarial
 * panel) — machinery catches "forgot to run tests", judgment catches
 * "misrepresented results".
 *
 * Activation (manual, deliberate):
 *   1. Copy to stop-proof-guard.js (drop ".example").
 *   2. Wire it in .claude/settings.json under hooks.Stop
 *      (see ../settings.example.json).
 *   3. Requires a live handoffs/current-scope.json with proofRequirements.
 *
 * Behavior while no scope contract exists: allow the stop (warn only), so
 * conversational sessions are not blocked.
 *
 * Hook protocol (Claude Code):
 *   - stdin: JSON { transcript_path, cwd, stop_hook_active, ... }
 *   - To block the stop: print JSON {"decision":"block","reason":"..."} and
 *     exit 0. The reason is fed back to the agent.
 *   - To allow: exit 0 with no decision output.
 */

'use strict';
const fs = require('fs');
const path = require('path');

function allow() { process.exit(0); }
function block(reason) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
  process.exit(0);
}

let input = '';
process.stdin.on('data', (c) => { input += c; });
process.stdin.on('end', () => {
  let payload;
  try { payload = JSON.parse(input); } catch { allow(); return; }

  // Prevent infinite block loops: if this hook already blocked once this
  // stop, let the agent finish.
  if (payload.stop_hook_active) allow();

  const cwd = payload.cwd || process.cwd();
  const scopePath = path.join(cwd, 'handoffs', 'current-scope.json');
  if (!fs.existsSync(scopePath)) {
    process.stderr.write('proof-guard: no scope contract — allowing stop\n');
    allow();
  }

  let scope;
  try { scope = JSON.parse(fs.readFileSync(scopePath, 'utf8')); } catch { allow(); return; }

  const proofs = Array.isArray(scope.proofRequirements) ? scope.proofRequirements : [];
  if (proofs.length === 0) allow();

  let transcript = '';
  try { transcript = fs.readFileSync(payload.transcript_path, 'utf8'); } catch { allow(); return; }

  // Only enforce when the session actually edited files — analysis-only
  // sessions (Grower, Steward scoping) owe no proof runs.
  const edited = /"tool_name"\s*:\s*"(Edit|Write|NotebookEdit)"/.test(transcript) ||
                 /"name"\s*:\s*"(Edit|Write|NotebookEdit)"/.test(transcript);
  if (!edited) allow();

  const missing = proofs.filter((p) => p.command && !transcript.includes(p.command));
  if (missing.length > 0) {
    block(
      'Proof guard: this session edited files under workstream "' +
      (scope.workstream || 'unknown') + '" but the following required proof ' +
      'commands never appear in the transcript: ' +
      missing.map((p) => `[${p.id}] ${p.command}`).join('; ') +
      '. Run them now, record the literal output in the handoff contract, ' +
      'then finish. If a proof cannot be run, stop with a partial handoff ' +
      'that says so explicitly.'
    );
  }

  allow();
});
