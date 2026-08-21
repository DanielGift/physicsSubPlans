import { PHYSICS_UNITS, type PhysicsUnit } from '../../types';
import { balancedSample, isEligible } from '../../utilities/balancedSample';
import { experimentalDesignQuestions } from './questions';

export type ExperimentalDesignRoundId = 'warmup' | 'restricted' | 'hard' | 'define_the_thing';

export interface ExperimentalDesignRoundConfig {
  roundId: ExperimentalDesignRoundId;
  targetCount: number;
  maxDifficulty?: number;
  minDifficulty?: number;
}

// Only warm-up and hard carry an explicit difficulty band (BUILD-SPEC.md §6).
// "restricted" and "define_the_thing" are presentational round labels, not a
// hand-tagged content category — topicTags is descriptive-only and is never
// used for filtering (BUILD-SPEC.md §4), so there is no derivable signal to
// sort prompts into those two buckets beyond difficulty and unit eligibility.
export const EXPERIMENTAL_DESIGN_ROUND_CONFIG: ExperimentalDesignRoundConfig[] = [
  { roundId: 'warmup', targetCount: 1, maxDifficulty: 2 },
  { roundId: 'restricted', targetCount: 1 },
  { roundId: 'hard', targetCount: 1, minDifficulty: 4 },
  { roundId: 'define_the_thing', targetCount: 1 },
];

export function getEligiblePool(selectedUnits: PhysicsUnit[]) {
  return experimentalDesignQuestions.filter((q) => isEligible(q.requiredUnits, selectedUnits));
}

export function countEligible(selectedUnits: PhysicsUnit[]): number {
  return getEligiblePool(selectedUnits).length;
}

export interface ExperimentalDesignRoundPlan {
  roundId: ExperimentalDesignRoundId;
  questionIds: string[];
  targetCount: number;
}

export interface ExperimentalDesignGenerationResult {
  rounds: ExperimentalDesignRoundPlan[];
  shortageNotes: string[];
}

export function generateExperimentalDesignRounds(
  selectedUnits: PhysicsUnit[],
  rng: () => number,
): ExperimentalDesignGenerationResult {
  const usedIds = new Set<string>();
  const rounds: ExperimentalDesignRoundPlan[] = [];
  const shortageNotes: string[] = [];

  for (const config of EXPERIMENTAL_DESIGN_ROUND_CONFIG) {
    const eligible = experimentalDesignQuestions.filter((q) => {
      if (usedIds.has(q.id)) return false;
      if (!isEligible(q.requiredUnits, selectedUnits)) return false;
      if (config.maxDifficulty !== undefined && q.difficulty > config.maxDifficulty) return false;
      if (config.minDifficulty !== undefined && q.difficulty < config.minDifficulty) return false;
      return true;
    });

    const { selected, short } = balancedSample(
      eligible,
      config.targetCount,
      rng,
      (q) => q.requiredUnits,
      PHYSICS_UNITS,
    );
    selected.forEach((q) => usedIds.add(q.id));

    if (selected.length === 0) {
      shortageNotes.push(`The ${config.roundId} round had no eligible prompt and was skipped.`);
      continue;
    }
    if (short) {
      shortageNotes.push(`This round has ${selected.length} prompt instead of the usual ${config.targetCount}.`);
    }

    rounds.push({ roundId: config.roundId, questionIds: selected.map((q) => q.id), targetCount: config.targetCount });
  }

  return { rounds, shortageNotes };
}
