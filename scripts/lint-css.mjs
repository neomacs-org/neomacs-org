#!/usr/bin/env node
/**
 * CSS guard for the two failure modes that have already cost real time here.
 *
 * Nothing in this project reads CSS. `tsc` cannot see it, and PostCSS is
 * deliberately lenient: it drops an unexpected `}` and carries on, so an
 * unbalanced App.css built and deployed cleanly while every rule after the
 * stray brace was silently discarded — which is how the footer lost its
 * padding and four media queries stopped applying.
 *
 * Checks:
 *   1. braces balanced (the bug above)
 *   2. comments terminated
 *   3. every var(--x) used is defined somewhere
 *
 * Exits non-zero on any failure, so it can gate the build.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['node_modules', 'dist', '.git']);

function cssFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) cssFiles(path, out);
    else if (path.endsWith('.css')) out.push(path);
  }
  return out;
}

/** Blank out comments and quoted strings so their braces don't count. */
function stripNoise(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''");
}

const problems = [];
const files = cssFiles(root);
const defined = new Set();

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const name = relative(root, file);
  const clean = stripNoise(src);

  // 1. braces
  let depth = 0;
  let line = 1;
  for (const ch of clean) {
    if (ch === '\n') line += 1;
    else if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth < 0) {
        problems.push(`${name}:${line} unexpected '}' — this drops every rule after it`);
        depth = 0;
      }
    }
  }
  if (depth > 0) {
    problems.push(`${name}: ${depth} unclosed '{' — rules below are swallowed`);
  }

  // 2. comments
  const opened = (src.match(/\/\*/g) ?? []).length;
  const closed = (src.match(/\*\//g) ?? []).length;
  if (opened !== closed) {
    problems.push(`${name}: ${opened} '/*' vs ${closed} '*/' — unterminated comment`);
  }

  // 3. collect custom-property definitions
  for (const m of src.matchAll(/(--[a-z0-9-]+)\s*:/gi)) defined.add(m[1]);
}

// 3b. every var(--x) must resolve
for (const file of files) {
  const src = stripNoise(readFileSync(file, 'utf8'));
  const name = relative(root, file);
  const seen = new Set();
  for (const m of src.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)) {
    const v = m[1];
    if (defined.has(v) || seen.has(v)) continue;
    seen.add(v);
    problems.push(`${name}: var(${v}) is never defined`);
  }
}

if (problems.length) {
  console.error('CSS check failed:\n');
  for (const p of problems) console.error(`  ${p}`);
  console.error(`\n${problems.length} problem(s) in ${files.length} stylesheet(s).`);
  process.exit(1);
}

console.log(`CSS ok — ${files.length} stylesheet(s), ${defined.size} custom properties.`);
