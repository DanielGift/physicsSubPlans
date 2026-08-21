import type { GraphDefinition, PhysicsUnit, Verdict } from '../../types';

export interface PhysicsCourtQuestion {
  id: string; // PC-KIN-001
  claim: string; // may contain LaTeX
  setup?: string; // situation, stated separately from the claim under trial
  requiredUnits: PhysicsUnit[];
  topicTags?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  requiresCalculus?: boolean;
  requiresGraph?: boolean;
  graph?: GraphDefinition;
}

export interface PhysicsCourtAnswer {
  verdict: Verdict;
  assumptions: string[];
  explanation: string;
  counterexample?: string; // required when verdict === 'sometimes'
  proofSketch?: string; // required when verdict === 'always'
  misconception: string;
  validRewrite?: string; // never present when verdict === 'always'
  teacherNotes?: string;
}

export type PhysicsCourtRoundId = 'verdict' | 'prosecution' | 'defense' | 'rewrite';

export const PHYSICS_COURT_ROUND_IDS: PhysicsCourtRoundId[] = [
  'verdict',
  'prosecution',
  'defense',
  'rewrite',
];

/** Round eligibility is derived from the verdict, never hand-tagged. See BUILD-SPEC.md §4. */
export function isEligibleForRound(roundId: PhysicsCourtRoundId, answer: PhysicsCourtAnswer): boolean {
  switch (roundId) {
    case 'verdict':
      return true;
    case 'prosecution':
      return answer.verdict === 'sometimes';
    case 'defense':
      return answer.verdict === 'always';
    case 'rewrite':
      return (answer.verdict === 'sometimes' || answer.verdict === 'never') && Boolean(answer.validRewrite);
  }
}
