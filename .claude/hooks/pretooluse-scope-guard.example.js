#!/usr/bin/env node
/**
 * pretooluse-scope-guard.example.js  (SAFE EXAMPLE — not active)
 *
 * PreToolUse hook: mechanically denies Edit/Write/NotebookEdit calls whose
 * target file falls outside the ratified scope contract
 * (handoffs/current-scope.json). This is the "no edits outside ratified
 * scope" constitution rule as machinery instead of prompt language.
 *
 * Activation (manual, deliberate):
 *   1. Copy this file to pretooluse-scope-guard.js (drop ".example").
 *   2. Wire it in .claude/settings.json under hooks.PreToolUse
 *      (see ../settings.example.json for the exact block).
 *   3. Have the Steward write a real handoffs/current-scope.json.
 *
 * Behavior while inactive scope file is missing: ALLOW with a warning, so
 * the kit is usable before governance is fully switched on. Once you trust
 * the flow, flip FAIL_CLOSED to true so a missing scope contract blocks all
 * edits (recommended for ExpertMachina-style governed development).
 *
 * Hook protocol (Claude Code):
 *   - stdin: JSON { tool_name, tool_input, cwd, ... }
 *   - To deny: print JSON with permissionDecision "deny" and exit 0.
 *   - To allow: exit 0 with no decision output.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const FAIL_CLOSED = false; // set true to block ALL edits when no scope contract exists
const GUARDED_TOOLS = new Set(['Edit', 'Write', 'NotebookEdit']);

function globToRegExp(glob) {
  // Minimal glob support: **, *, ?  (enough for scope contracts; keep
  // contracts simple rather than making this parser clever)
  const esc = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const re = esc
    .replace(/\*\*\//g, '(?:.*/)?')
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]');
  return new RegExp('^' + re + '$');
}

function deny(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason,
    },
  }));
  process.exit(0);
}

function allow() { process.exit(0); }

let input = '';
process.stdin.on('data', (c) => { input += c; });
process.stdin.on('end', () => {
  let payload;
  try { payload = JSON.parse(input); } catch { allow(); return; }

  if (!GUARDED_TOOLS.has(payload.tool_name)) allow();

  const target = payload.tool_input && (payload.tool_input.file_path || payload.tool_input.notebook_path);
  if (!target) allow();

  const cwd = payload.cwd || process.cwd();
  const rel = path.relative(cwd, path.resolve(cwd, target)).split(path.sep).join('/');

  // Never allow edits that escape the repo root
  if (rel.startsWith('..')) {
    deny(`Scope guard: target "${target}" is outside the repository root.`);
  }

  const scopePath = path.join(cwd, 'handoffs', 'current-scope.json');
  if (!fs.existsSync(scopePath)) {
    if (FAIL_CLOSED) {
      deny('Scope guard (fail-closed): no ratified scope contract at handoffs/current-scope.json. Run the Steward to scope this workstream first.');
    }
    process.stderr.write('scope-guard warning: no handoffs/current-scope.json — allowing edit (FAIL_CLOSED=false)\n');
    allow();
  }

  let scope;
  try { scope = JSON.parse(fs.readFileSync(scopePath, 'utf8')); }
  catch { deny('Scope guard: handoffs/current-scope.json exists but is not valid JSON. Fix the contract before editing.'); }

  const forbidden = (scope.forbiddenGlobs || []).map(globToRegExp);
  if (forbidden.some((re) => re.test(rel))) {
    deny(`Scope guard: "${rel}" matches a forbiddenGlob in the ratified scope contract (workstream: ${scope.workstream || 'unknown'}). This boundary is not negotiable mid-build; hand back to the Steward.`);
  }

  const allowed = (scope.allowedGlobs || []).map(globToRegExp);
  // Handoff contracts themselves are always writable (durable memory),
  // except current-scope.json which only the Steward flow should touch.
  const isHandoff = rel.startsWith('handoffs/') && rel !== 'handoffs/current-scope.json';
  if (!isHandoff && allowed.length > 0 && !allowed.some((re) => re.test(rel))) {
    deny(`Scope guard: "${rel}" is outside allowedGlobs for workstream ${scope.workstream || 'unknown'}. If this file must change, that is a re-scoping request for the Steward, not an edit.`);
  }

  allow();
});
