import { describe, expect, it } from 'vitest';
import { PHYSICS_UNITS } from '../../types';
import { createRng } from '../../utilities/rng';
import { buildWorksheet, countEligible, getEligiblePool } from './experimentalDesignGenerator';
import { experimentalDesignQuestions } from './questions';

describe('experimentalDesignQuestions bank shape', () => {
  it('has exactly one prompt per unit', () => {
    for (const unit of PHYSICS_UNITS) {
      const forUnit = experimentalDesignQuestions.filter((q) => q.requiredUnits.includes(unit));
      expect(forUnit, `unit "${unit}"`).toHaveLength(1);
    }
  });
});

describe('buildWorksheet', () => {
  it('includes exactly one experiment per selected unit', () => {
    const worksheet = buildWorksheet([...PHYSICS_UNITS], createRng('ws-seed'));
    expect(worksheet).toHaveLength(PHYSICS_UNITS.length);
    expect(worksheet).toHaveLength(countEligible([...PHYSICS_UNITS]));
  });

  it('shrinks to only the selected units, never throwing', () => {
    const worksheet = buildWorksheet(['kinematics', 'forces'], createRng('ed-subset'));
    expect(worksheet).toHaveLength(2);
    const ids = new Set(worksheet);
    expect(ids.has('ED-KIN-001')).toBe(true);
    expect(ids.has('ED-FOR-001')).toBe(true);
  });

  it('never duplicates a question', () => {
    const worksheet = buildWorksheet([...PHYSICS_UNITS], createRng('ed-no-dupes'));
    expect(new Set(worksheet).size).toBe(worksheet.length);
  });

  it('is deterministic for the same seed', () => {
    const a = buildWorksheet([...PHYSICS_UNITS], createRng('ed-sync'));
    const b = buildWorksheet([...PHYSICS_UNITS], createRng('ed-sync'));
    expect(a).toEqual(b);
  });

  it('returns an empty worksheet, not a throw, when no units are selected', () => {
    expect(buildWorksheet([], createRng('ed-empty'))).toEqual([]);
    expect(getEligiblePool([])).toEqual([]);
  });
});
