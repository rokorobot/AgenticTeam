#!/usr/bin/env node
/**
 * pretooluse-target-isolation.example.js  (SAFE EXAMPLE — not active)
 *
 * PreToolUse hook: enforces the constitution's Target isolation rule as
 * machinery. Denies Edit/Write/NotebookEdit when the edit would land in a
 * canonical target checkout instead of an isolated `<name> copy for EM`
 * copy, or when the isolated copy has `main`/`master` checked out. This is
 * the mechanical fix for the branch-drift class of incident: an agent
 * physically cannot edit the user's original checkout.
 *
 * Activation (manual, deliberate — see ../hooks/README.md):
 *   1. Copy to pretooluse-target-isolation.js (drop ".example").
 *   2. Wire under hooks.PreToolUse in .claude/settings.json (matcher
 *      Edit|Write|NotebookEdit) — it composes with the scope guard.
 *   3. Set ISOLATION_ROOTS / CANONICAL_MARKERS for your machine (below).
 *
 * The check is intentionally simple and fail-open on ambiguity WHILE
 * inert-by-default: it only DENIES when it can positively identify a
 * canonical checkout or a main/master branch at the target path. Anything
 * it cannot classify it allows (the scope guard and the human gate remain
 * the other layers). Tighten once validated on your setup.
 *
 * Hook protocol (Claude Code):
 *   - stdin: JSON { tool_name, tool_input, cwd, ... }
 *   - Deny: print JSON with permissionDecision "deny", exit 0.
 *   - Allow: exit 0 with no decision output.
 */

'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const GUARDED_TOOLS = new Set(['Edit', 'Write', 'NotebookEdit']);

// The isolated-copy naming convention from the constitution.
const ISOLATED_SUFFIX = ' copy for EM';

// Optional: absolute paths (or substrings) known to be canonical user
// checkouts that agents must NEVER edit. Editing anything resolving under
// one of these is denied outright. Leave empty to rely purely on the
// naming + branch heuristics below.
const CANONICAL_MARKERS = [
  // e.g. 'C:/Users/Robert/ExpertMachina',
  // e.g. 'C:/Users/Robert/SoundMachina',
];

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

function gitBranch(dir) {
  try {
    return cp.execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: dir, stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
  } catch { return null; }
}

function gitToplevel(dir) {
  try {
    return cp.execSync('git rev-parse --show-toplevel', {
      cwd: dir, stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
  } catch { return null; }
}

function norm(p) { return p.replace(/\\/g, '/'); }

let input = '';
process.stdin.on('data', (c) => { input += c; });
process.stdin.on('end', () => {
  let payload;
  try { payload = JSON.parse(input); } catch { allow(); return; }

  if (!GUARDED_TOOLS.has(payload.tool_name)) allow();

  const target = payload.tool_input &&
    (payload.tool_input.file_path || payload.tool_input.notebook_path);
  if (!target) allow();

  const cwd = payload.cwd || process.cwd();
  const abs = norm(path.resolve(cwd, target));

  // AgenticTeam editing itself (control repo) is exempt — this rule governs
  // work on EXTERNAL target repos. Heuristic: if the resolved repo root is
  // the AgenticTeam repo (contains CLAUDE.md + .claude/agents/steward.md),
  // allow. Editing AgenticTeam's own files is normal control-plane work.
  const top = gitToplevel(path.dirname(abs)) || gitToplevel(cwd);
  if (top) {
    const t = norm(top);
    const isAgenticTeam =
      fs.existsSync(path.join(t, 'CLAUDE.md')) &&
      fs.existsSync(path.join(t, '.claude', 'agents', 'steward.md'));
    if (isAgenticTeam) allow();

    // Rule 1: never edit a declared canonical checkout.
    for (const marker of CANONICAL_MARKERS) {
      if (marker && t.includes(norm(marker))) {
        deny(`Target isolation: "${t}" is a canonical target checkout — ` +
             `read-only to agents. Work in an isolated "<name>${ISOLATED_SUFFIX}" ` +
             `copy on a feature branch, never the original.`);
      }
    }

    // Rule 2: an external target repo must be an isolated copy (named
    // "<name> copy for EM"). If the repo root does NOT carry the suffix and
    // is NOT AgenticTeam, deny — it's presumed canonical.
    if (!t.endsWith(ISOLATED_SUFFIX)) {
      deny(`Target isolation: "${t}" is not an isolated copy ` +
           `("<name>${ISOLATED_SUFFIX}"). Agents edit external targets only ` +
           `in the isolated copy; the canonical checkout is read-only.`);
    }

    // Rule 3: even in the isolated copy, never edit on main/master.
    const branch = gitBranch(t);
    if (branch === 'main' || branch === 'master') {
      deny(`Target isolation: isolated copy "${t}" has "${branch}" checked ` +
           `out. Cut a dedicated feature branch before editing; main is ` +
           `read-only to agents.`);
    }
  }

  allow();
});
