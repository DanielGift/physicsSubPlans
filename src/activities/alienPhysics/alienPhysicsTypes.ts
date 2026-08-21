import type { GraphDefinition, ReasoningSkill } from '../../types';

export type AlienQuestionType = 'decode' | 'calculation' | 'error_analysis' | 'graph' | 'conservation' | 'synthesis';

export interface AlienLaw {
  name: string; // fictional law name, e.g. "Zibble's Law"
  statement: string; // the law as stated on screen, may contain LaTeX
}

export interface AlienPhysicsQuestion {
  id: string; // AP-CAL-001
  questionType: AlienQuestionType;
  prompt: string; // may contain LaTeX
  laws: AlienLaw[];
  requiredSkills: ReasoningSkill[];
  topicTags?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  graph?: GraphDefinition;
  /** error_analysis only — the numbered steps a fictional student wrote, for the class to critique. */
  flawedSolution?: string[];
}

export interface AlienPhysicsAnswer {
  answer: string;
  workedSolution: string;
  misconception?: string;
  teacherNotes?: string;
  /**
   * error_analysis only — 0-based index into the matching question's flawedSolution.
   * Kept out of questions.ts deliberately: it is the answer, not the prompt.
   */
  firstBadStepIndex?: number;
}
