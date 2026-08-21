import { describe, expect, it } from 'vitest';
import { REASONING_SKILLS } from '../../types';
import { createRng } from '../../utilities/rng';
import { generateAlienPhysicsRounds } from './alienPhysicsGenerator';
import { alienPhysicsQuestions } from './questions';

const questionTypeById = new Map(alienPhysicsQuestions.map((q) => [q.id, q.questionType]));

describe('generateAlienPhysicsRounds', () => {
  it('never repeats a question ID across rounds', () => {
    const { rounds } = generateAlienPhysicsRounds([...REASONING_SKILLS], createRng('ap-no-dupes'));
    const allIds = rounds.flatMap((r) => r.questionIds);
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  it('is deterministic for the same seed', () => {
    const a = generateAlienPhysicsRounds([...REASONING_SKILLS], createRng('ap-sync'));
    const b = generateAlienPhysicsRounds([...REASONING_SKILLS], createRng('ap-sync'));
    expect(a).toEqual(b);
  });

  it('only places error_analysis questions in the error_analysis round', () => {
    const { rounds } = generateAlienPhysicsRounds([...REASONING_SKILLS], createRng('ap-error-check'));
    const round = rounds.find((r) => r.roundId === 'error_analysis');
    for (const id of round?.questionIds ?? []) {
      expect(questionTypeById.get(id)).toBe('error_analysis');
    }
  });

  it('shrinks a round and reports a shortage note instead of throwing when the pool is tiny', () => {
    const { rounds, shortageNotes } = generateAlienPhysicsRounds(['algebra'], createRng('ap-shortage'));
    expect(shortageNotes.length).toBeGreaterThan(0);
    const allIds = rounds.flatMap((r) => r.questionIds);
    expect(new Set(allIds).size).toBe(allIds.length);
  });
});
