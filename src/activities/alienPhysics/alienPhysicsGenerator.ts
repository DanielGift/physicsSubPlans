import { REASONING_SKILLS, type ReasoningSkill } from '../../types';
import { balancedSample, isEligible } from '../../utilities/balancedSample';
import { alienPhysicsQuestions } from './questions';
import type { AlienQuestionType } from './alienPhysicsTypes';

export type AlienRoundId = 'decode' | 'calculation' | 'error_analysis' | 'synthesis';

export interface AlienRoundConfig {
  roundId: AlienRoundId;
  targetCount: number;
  /**
   * Which question types satisfy this round. 'graph' questions read as a decoding
   * skill, and 'conservation' questions are computational, so each folds into the
   * nearest named round rather than getting a fifth/sixth round of its own.
   */
  eligibleTypes: AlienQuestionType[];
}

export const ALIEN_ROUND_CONFIG: AlienRoundConfig[] = [
  { roundId: 'decode', targetCount: 4, eligibleTypes: ['decode', 'graph'] },
  { roundId: 'calculation', targetCount: 4, eligibleTypes: ['calculation', 'conservation'] },
  { roundId: 'error_analysis', targetCount: 3, eligibleTypes: ['error_analysis'] },
  { roundId: 'synthesis', targetCount: 2, eligibleTypes: ['synthesis'] },
];

export function getEligiblePool(selectedSkills: ReasoningSkill[]) {
  return alienPhysicsQuestions.filter((q) => isEligible(q.requiredSkills, selectedSkills));
}

export function countEligible(selectedSkills: ReasoningSkill[]): number {
  return getEligiblePool(selectedSkills).length;
}

export interface AlienRoundPlan {
  roundId: AlienRoundId;
  questionIds: string[];
  targetCount: number;
}

export interface AlienGenerationResult {
  rounds: AlienRoundPlan[];
  shortageNotes: string[];
}

export function generateAlienPhysicsRounds(
  selectedSkills: ReasoningSkill[],
  rng: () => number,
): AlienGenerationResult {
  const usedIds = new Set<string>();
  const rounds: AlienRoundPlan[] = [];
  const shortageNotes: string[] = [];

  for (const config of ALIEN_ROUND_CONFIG) {
    const eligible = alienPhysicsQuestions.filter(
      (q) =>
        !usedIds.has(q.id) &&
        isEligible(q.requiredSkills, selectedSkills) &&
        config.eligibleTypes.includes(q.questionType),
    );

    const { selected, short } = balancedSample(
      eligible,
      config.targetCount,
      rng,
      (q) => q.requiredSkills,
      REASONING_SKILLS,
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
