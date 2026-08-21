import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Student-facing components must never import the answer key module (BUILD-SPEC.md §3). This
// walks src/ and asserts that only answer-key files, TeacherAnswerPanel.tsx, anything under a
// teacher/ directory, and physicsCourtGenerator.ts are allowed to mention "answers" at all.
//
// physicsCourtGenerator.ts is the one deliberate exception: prosecution/defense/rewrite round
// eligibility is derived from verdict (BUILD-SPEC.md §4), which only exists in the answer key,
// so the generator has to read it. It is not a rendering component and never exposes a verdict
// to the student beyond which round a question lands in — which the derived-eligibility design
// already requires — and it reads the module via a lazy `await import(...)` so the data still
// doesn't ship in the initial bundle.

const SRC_ROOT = join(__dirname, '..');

function isAllowed(path: string): boolean {
  return (
    path.endsWith('/answers.ts') ||
    path.endsWith('TeacherAnswerPanel.tsx') ||
    path.includes('/teacher/') ||
    path.endsWith('physicsCourtGenerator.ts')
  );
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
  it('only answers.ts, TeacherAnswerPanel.tsx, and teacher/ files may mention "answers"', () => {
    const offenders: string[] = [];
    for (const file of walk(SRC_ROOT)) {
      if (isAllowed(file)) continue;
      const content = readFileSync(file, 'utf8');
      if (content.includes('answers')) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });
});
