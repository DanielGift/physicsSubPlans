import { describe, expect, it } from 'vitest';
import { PHYSICS_UNITS } from '../../types';
import { buildWorksheet, countEligible, getEligiblePool } from './experimentalDesignGenerator';
import { experimentalDesignQuestions } from './questions';

const TARGET_COUNTS: Record<string, number> = {
  kinematics: 3,
  forces: 3,
  energy: 2,
  momentum: 2,
  rotation: 2,
  oscillations: 2,
};

describe('experimentalDesignQuestions bank shape', () => {
  it('matches the requested per-unit counts', () => {
    for (const unit of PHYSICS_UNITS) {
      const forUnit = experimentalDesignQuestions.filter((q) => q.requiredUnits.includes(unit));
      expect(forUnit, `unit "${unit}"`).toHaveLength(TARGET_COUNTS[unit]);
    }
  });

  it('has no duplicate IDs', () => {
    const ids = experimentalDesignQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('getEligiblePool / countEligible', () => {
  it('returns every question tagged to a single selected unit', () => {
    expect(getEligiblePool(['kinematics'])).toHaveLength(3);
    expect(countEligible(['kinematics'])).toBe(3);
    expect(getEligiblePool(['energy'])).toHaveLength(2);
  });

  it('returns nothing for no selected units', () => {
    expect(getEligiblePool([])).toEqual([]);
    expect(countEligible([])).toBe(0);
  });
});

describe('buildWorksheet', () => {
  it('includes every question for every selected unit', () => {
    const worksheet = buildWorksheet([...PHYSICS_UNITS]);
    expect(worksheet).toHaveLength(experimentalDesignQuestions.length);
    expect(new Set(worksheet).size).toBe(worksheet.length);
  });

  it('shrinks to only the selected units', () => {
    const worksheet = buildWorksheet(['forces']);
    expect(worksheet).toHaveLength(3);
    expect(new Set(worksheet)).toEqual(new Set(['ED-FOR-001', 'ED-FOR-002', 'ED-FOR-003']));
  });

  it('is always in the same fixed order for the same units, regardless of selection order', () => {
    const a = buildWorksheet(['forces', 'kinematics']);
    const b = buildWorksheet(['kinematics', 'forces']);
    expect(a).toEqual(b);
  });

  it('returns an empty list, not a throw, when no units are selected', () => {
    expect(buildWorksheet([])).toEqual([]);
  });
});
