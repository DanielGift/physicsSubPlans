import type { ActivityId, PhysicsUnit, ReasoningSkill } from '../types';
import { createRng, generateReadableSeed } from '../utilities/rng';
import { generateAlienPhysicsRounds } from '../activities/alienPhysics/alienPhysicsGenerator';
import { generateExperimentalDesignRounds } from '../activities/experimentalDesign/experimentalDesignGenerator';
import { generatePhysicsCourtRounds } from '../activities/physicsCourt/physicsCourtGenerator';
import type { LessonSession, LessonSessionRound } from './sessionTypes';

export interface GenerateSessionInput {
  activityId: ActivityId;
  selectedUnits?: PhysicsUnit[];
  selectedSkills?: ReasoningSkill[];
  seed?: string;
  /** Injected so callers (and tests) control the timestamp; defaults to now. */
  createdAt?: string;
}

export interface GenerateSessionOutput {
  session: LessonSession;
  shortageNotes: string[];
}

/**
 * Dispatches to the activity's own generator — each owns its schema and round
 * logic (BUILD-SPEC.md §2) — then wraps the result into a storable LessonSession.
 * Same seed + same settings ⇒ byte-identical rounds (createdAt aside).
 */
export async function generateSession(input: GenerateSessionInput): Promise<GenerateSessionOutput> {
  const seed = input.seed ?? generateReadableSeed();
  const rng = createRng(seed);

  let rounds: LessonSessionRound[] = [];
  let shortageNotes: string[] = [];

  if (input.activityId === 'physics-court') {
    const result = await generatePhysicsCourtRounds(input.selectedUnits ?? [], rng);
    rounds = result.rounds;
    shortageNotes = result.shortageNotes;
  } else if (input.activityId === 'alien-physics') {
    const result = generateAlienPhysicsRounds(input.selectedSkills ?? [], rng);
    rounds = result.rounds;
    shortageNotes = result.shortageNotes;
  } else {
    const result = generateExperimentalDesignRounds(input.selectedUnits ?? [], rng);
    rounds = result.rounds;
    shortageNotes = result.shortageNotes;
  }

  const session: LessonSession = {
    version: 1,
    activityId: input.activityId,
    seed,
    createdAt: input.createdAt ?? new Date().toISOString(),
    selectedUnits: input.selectedUnits,
    selectedSkills: input.selectedSkills,
    rounds,
    currentRoundIndex: 0,
    currentQuestionIndex: 0,
  };

  return { session, shortageNotes };
}
