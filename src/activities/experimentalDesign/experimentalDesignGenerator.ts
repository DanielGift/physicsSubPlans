import { PHYSICS_UNITS, type PhysicsUnit } from '../../types';
import { isEligible } from '../../utilities/balancedSample';
import { experimentalDesignQuestions } from './questions';

// One prompt per unit (the bank holds exactly one), so there's nothing to sample or shuffle —
// just include the scenario for each unit the substitute checks off, in a fixed, stable order.

export function getEligiblePool(selectedUnits: PhysicsUnit[]) {
  return experimentalDesignQuestions.filter((q) => isEligible(q.requiredUnits, selectedUnits));
}

export function countEligible(selectedUnits: PhysicsUnit[]): number {
  return getEligiblePool(selectedUnits).length;
}

/** The scenario for each selected unit, in a fixed order — no seed, no randomization. */
export function buildWorksheet(selectedUnits: PhysicsUnit[]): string[] {
  return PHYSICS_UNITS.filter((unit) => selectedUnits.includes(unit)).flatMap((unit) =>
    getEligiblePool([unit]).map((q) => q.id),
  );
}
