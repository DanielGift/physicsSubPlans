import type { PhysicsUnit } from '../../types';

export interface ExperimentalDesignQuestion {
  id: string; // ED-001
  prompt: string;
  restrictions: string[]; // airtight — the substitute cannot rule on edge cases
  requiredUnits: PhysicsUnit[];
  topicTags?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Set true to allow possibleApproaches.length === 1 in validation. */
  singleValidApproach?: boolean;
}

export interface ExperimentalDesignAnswer {
  possibleApproaches: string[]; // length >= 2 unless singleValidApproach
  majorPitfalls: string[];
  teacherNotes?: string;
}
