import { describe, expect, it } from 'vitest';
import { PHYSICS_UNITS } from '../../types';
import { physicsCourtAnswers } from './answers';
import { countEligible, getEligiblePool, shuffleLap } from './physicsCourtGenerator';
import { physicsCourtQuestions } from './questions';

describe('PC-ENE-002 AND-semantics (BUILD-SPEC.md §54)', () => {
  it('requires both energy and rotation to be selected, not either alone', () => {
    expect(getEligiblePool(['energy']).some((q) => q.id === 'PC-ENE-002')).toBe(false);
    expect(getEligiblePool(['rotation']).some((q) => q.id === 'PC-ENE-002')).toBe(false);
    expect(getEligiblePool(['energy', 'rotation']).some((q) => q.id === 'PC-ENE-002')).toBe(true);
  });
});

describe('unit distribution', () => {
  const TARGET_COUNTS: Record<string, number> = {
    kinematics: 10,
    forces: 10,
    energy: 8,
    momentum: 8,
    rotation: 6,
    oscillations: 6,
  };

  it('matches the requested per-unit counts, including cross-tagged questions', () => {
    for (const unit of PHYSICS_UNITS) {
      const count = physicsCourtQuestions.filter((q) => q.requiredUnits.includes(unit)).length;
      expect(count, `unit "${unit}"`).toBe(TARGET_COUNTS[unit]);
    }
  });

  it('no longer has gravitation as a unit', () => {
    expect(PHYSICS_UNITS).not.toContain('gravitation');
  });
});

describe('shuffleLap', () => {
  it('includes every eligible question exactly once per lap, never duplicated', () => {
    const eligible = getEligiblePool([...PHYSICS_UNITS]);
    const lap = shuffleLap([...PHYSICS_UNITS], 'lap-seed', 0);
    expect(new Set(lap).size).toBe(lap.length);
    expect(lap.length).toBe(eligible.length);
    expect(new Set(lap)).toEqual(new Set(eligible.map((q) => q.id)));
  });

  it('is deterministic for the same seed and lap index', () => {
    const a = shuffleLap([...PHYSICS_UNITS], 'same-seed', 2);
    const b = shuffleLap([...PHYSICS_UNITS], 'same-seed', 2);
    expect(a).toEqual(b);
  });

  it('produces a different order for a different lap index (same seed)', () => {
    const lap0 = shuffleLap([...PHYSICS_UNITS], 'vary-seed', 0);
    const lap1 = shuffleLap([...PHYSICS_UNITS], 'vary-seed', 1);
    expect(lap0).not.toEqual(lap1);
  });

  it('never throws and never duplicates for a tiny eligible pool', () => {
    const lap = shuffleLap(['kinematics'], 'tiny-seed', 0);
    expect(new Set(lap).size).toBe(lap.length);
    expect(lap.length).toBe(countEligible(['kinematics']));
  });
});

describe('physicsCourtQuestions/answers bank shape', () => {
  it('has an answer for every question and vice versa', () => {
    const questionIds = new Set(physicsCourtQuestions.map((q) => q.id));
    const answerIds = new Set(Object.keys(physicsCourtAnswers));
    expect(questionIds).toEqual(answerIds);
  });
});
