import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Student-facing components must never import the answer key module (BUILD-SPEC.md §3). This
// walks src/ and asserts that only answer-key files and PhysicsCourtConclusion.tsx are
// allowed to mention "answers" at all.
//
// PhysicsCourtConclusion.tsx is the reveal step of the Physics Court cycle, shown to the
// whole room on request, and reads the answer key via a lazy `await import(...)` so the
// data still doesn't ship in the initial bundle. Experimental Design has no reveal step at
// all — its answers.ts is validated content data only, never imported by any component.

const SRC_ROOT = join(__dirname, '..');

function isAllowed(path: string): boolean {
  return path.endsWith('/answers.ts') || path.endsWith('PhysicsCourtConclusion.tsx');
}

function walk(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry) && !entry.endsWith('.test.ts') && !entry.endsWith('.test.tsx')) {
      files.push(full);
    }
  }
  return files;
}

describe('answer-import isolation', () => {
  it('only answers.ts and PhysicsCourtConclusion.tsx may mention "answers"', () => {
    const offenders: string[] = [];
    for (const file of walk(SRC_ROOT)) {
      if (isAllowed(file)) continue;
      const content = readFileSync(file, 'utf8');
      if (content.includes('answers')) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });
});
