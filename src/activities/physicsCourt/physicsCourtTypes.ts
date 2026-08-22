import type { GraphDefinition, PhysicsUnit, Verdict } from '../../types';

export interface PhysicsCourtQuestion {
  id: string; // PC-KIN-001
  claim: string; // may contain LaTeX
  setup?: string; // the statement, stated separately from the claim under trial
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

/** Presentation labels for the class: internally still always/sometimes/never (Verdict). */
export const VERDICT_DISPLAY_LABEL: Record<Verdict, string> = {
  always: 'Always',
  sometimes: 'Maybe',
  never: 'Never',
};
