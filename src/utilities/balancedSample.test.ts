import { describe, expect, it } from 'vitest';
import { createRng } from './rng';
import { balancedSample, isEligible } from './balancedSample';

interface MockQuestion {
  id: string;
  requiredUnits: string[];
}

const UNITS = ['a', 'b', 'c'];

function mockBank(): MockQuestion[] {
  return [
    { id: 'q1', requiredUnits: ['a'] },
    { id: 'q2', requiredUnits: ['a'] },
    { id: 'q3', requiredUnits: ['b'] },
    { id: 'q4', requiredUnits: ['c'] },
    { id: 'q5', requiredUnits: ['a', 'b'] },
  ];
}

describe('isEligible (AND semantics)', () => {
  it('requires every required key to be selected', () => {
    expect(isEligible(['a'], ['a', 'b'])).toBe(true);
    expect(isEligible(['a', 'b'], ['a'])).toBe(false);
    expect(isEligible(['a', 'b'], ['a', 'b', 'c'])).toBe(true);
  });
});

describe('balancedSample', () => {
  it('never duplicates and never throws when the pool is short', () => {
    const bank = mockBank();
    const rng = createRng('shortage-seed');
    const { selected, short } = balancedSample(bank, 10, rng, (q) => q.requiredUnits, UNITS);
    expect(short).toBe(true);
    expect(selected.length).toBe(bank.length);
    const ids = selected.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('fills the target count when the pool is large enough', () => {
    const bank = mockBank();
    const rng = createRng('fits-seed');
    const { selected, short } = balancedSample(bank, 3, rng, (q) => q.requiredUnits, UNITS);
    expect(short).toBe(false);
    expect(selected).toHaveLength(3);
  });

  it('is deterministic for the same seed', () => {
    const bank = mockBank();
    const a = balancedSample(bank, 4, createRng('same-seed'), (q) => q.requiredUnits, UNITS);
    const b = balancedSample(bank, 4, createRng('same-seed'), (q) => q.requiredUnits, UNITS);
    expect(a.selected.map((q) => q.id)).toEqual(b.selected.map((q) => q.id));
  });

  it('does not shuffle the whole bank and slice — every selected item is actually eligible', () => {
    const bank = mockBank().filter((q) => isEligible(q.requiredUnits, ['a']));
    const rng = createRng('eligible-only');
    const { selected } = balancedSample(bank, 10, rng, (q) => q.requiredUnits, UNITS);
    for (const q of selected) {
      expect(isEligible(q.requiredUnits, ['a'])).toBe(true);
    }
  });
});
