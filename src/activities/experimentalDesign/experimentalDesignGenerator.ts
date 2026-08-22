import type { PhysicsUnit } from '../../types';
import { isEligible } from '../../utilities/balancedSample';
import { shuffle } from '../../utilities/rng';
import { experimentalDesignQuestions } from './questions';

// One prompt per unit, not four difficulty-banded rounds: the bank now holds exactly one
// (deliberately unusual) prompt per unit, so there is nothing left to sample within a unit.

export function getEligiblePool(selectedUnits: PhysicsUnit[]) {
  return experimentalDesignQuestions.filter((q) => isEligible(q.requiredUnits, selectedUnits));
}

export function countEligible(selectedUnits: PhysicsUnit[]): number {
  return getEligiblePool(selectedUnits).length;
}

/** One experiment for each selected unit, shuffled into a worksheet order via the seeded RNG. */
export function buildWorksheet(selectedUnits: PhysicsUnit[], rng: () => number): string[] {
  const eligible = getEligiblePool(selectedUnits);
  return shuffle(eligible, rng).map((q) => q.id);
}
