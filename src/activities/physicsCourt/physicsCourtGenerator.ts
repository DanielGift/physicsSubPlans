import { PHYSICS_UNITS, type PhysicsUnit } from '../../types';
import { balancedSample, isEligible } from '../../utilities/balancedSample';
import { createRng } from '../../utilities/rng';
import { physicsCourtQuestions } from './questions';

export function getEligiblePool(selectedUnits: PhysicsUnit[]) {
  return physicsCourtQuestions.filter((q) => isEligible(q.requiredUnits, selectedUnits));
}

/** Used by the setup screen to block Start when the pool is too small (BUILD-SPEC.md §5). */
export function countEligible(selectedUnits: PhysicsUnit[]): number {
  return getEligiblePool(selectedUnits).length;
}

/**
 * Physics Court runs one continuous, non-round cycle rather than the original
 * verdict/prosecution/defense/rewrite rounds: present a statement + claim, debate it,
 * reveal the conclusion, repeat — forever. Each "lap" through the eligible pool is a
 * fresh balanced shuffle. Deriving each lap's RNG from `${seed}:lap${lapIndex}` (rather
 * than carrying one mutable RNG across the whole session) keeps every lap reproducible
 * from the seed alone, so a resumed session regenerates the same lap it was on.
 */
export function shuffleLap(selectedUnits: PhysicsUnit[], seed: string, lapIndex: number): string[] {
  const eligible = getEligiblePool(selectedUnits);
  const rng = createRng(`${seed}:lap${lapIndex}`);
  const { selected } = balancedSample(eligible, eligible.length, rng, (q) => q.requiredUnits, PHYSICS_UNITS);
  return selected.map((q) => q.id);
}
