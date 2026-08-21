import type { ActivityId, PhysicsUnit, ReasoningSkill } from '../types';

export interface LessonSessionRound {
  roundId: string;
  questionIds: string[];
}

export interface LessonSession {
  version: 1;
  activityId: ActivityId;
  seed: string;
  createdAt: string;
  selectedUnits?: PhysicsUnit[];
  selectedSkills?: ReasoningSkill[];
  rounds: LessonSessionRound[];
  currentRoundIndex: number;
  currentQuestionIndex: number;
  timer?: { roundId: string; elapsedMs: number; running: boolean };
}
