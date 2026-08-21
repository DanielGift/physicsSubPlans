import { PHYSICS_UNITS, type PhysicsUnit } from '../../types';
import { balancedSample, isEligible } from '../../utilities/balancedSample';
import { physicsCourtQuestions } from './questions';
import { isEligibleForRound, type PhysicsCourtRoundId } from './physicsCourtTypes';

export interface PhysicsCourtRoundConfig {
  roundId: PhysicsCourtRoundId;
  targetCount: number;
}

// Verdict is deliberately first and pulls from "any" verdict, so later rounds
// may see a shrunk pool — that is intentional shortage handling, not a bug.
export const PHYSICS_COURT_ROUND_CONFIG: PhysicsCourtRoundConfig[] = [
  { roundId: 'verdict', targetCount: 9 },
  { roundId: 'prosecution', targetCount: 4 },
  { roundId: 'defense', targetCount: 3 },
  { roundId: 'rewrite', targetCount: 3 },
];

export function getEligiblePool(selectedUnits: PhysicsUnit[]) {
  return physicsCourtQuestions.filter((q) => isEligible(q.requiredUnits, selectedUnits));
}

/** Used by the setup screen to block Start when the pool is too small (BUILD-SPEC.md §5). */
export function countEligible(selectedUnits: PhysicsUnit[]): number {
  return getEligiblePool(selectedUnits).length;
}

export interface PhysicsCourtRoundPlan {
  roundId: PhysicsCourtRoundId;
  questionIds: string[];
  targetCount: number;
}

export interface PhysicsCourtGenerationResult {
  rounds: PhysicsCourtRoundPlan[];
  shortageNotes: string[];
}

/**
 * Round eligibility for prosecution/defense/rewrite is derived from verdict (BUILD-SPEC.md §4),
 * so this — unlike every other generator — has to read the answer key. It never exposes a
 * verdict to the student directly, only which round a question lands in, which the design
 * already requires. To keep that data out of the initial bundle, it is loaded lazily here via
 * `await import(...)`, the same pattern TeacherAnswerPanel and BankBrowser use (BUILD-SPEC.md §3).
 */
export async function generatePhysicsCourtRounds(
  selectedUnits: PhysicsUnit[],
  rng: () => number,
): Promise<PhysicsCourtGenerationResult> {
  const { physicsCourtAnswers } = await import('./answers');

  const usedIds = new Set<string>();
  const rounds: PhysicsCourtRoundPlan[] = [];
  const shortageNotes: string[] = [];

  for (const config of PHYSICS_COURT_ROUND_CONFIG) {
    const eligible = physicsCourtQuestions.filter(
      (q) =>
        !usedIds.has(q.id) &&
        isEligible(q.requiredUnits, selectedUnits) &&
        isEligibleForRound(config.roundId, physicsCourtAnswers[q.id]),
    );

    const { selected, short } = balancedSample(
      eligible,
      config.targetCount,
      rng,
      (q) => q.requiredUnits,
      PHYSICS_UNITS,
    );
    selected.forEach((q) => usedIds.add(q.id));

    if (selected.length === 0) {
      shortageNotes.push(`The ${config.roundId} round had no eligible questions left and was skipped.`);
      continue;
    }
    if (short) {
      shortageNotes.push(
        `This round has ${selected.length} questions instead of the usual ${config.targetCount}.`,
      );
    }

    rounds.push({ roundId: config.roundId, questionIds: selected.map((q) => q.id), targetCount: config.targetCount });
  }

  return { rounds, shortageNotes };
}
