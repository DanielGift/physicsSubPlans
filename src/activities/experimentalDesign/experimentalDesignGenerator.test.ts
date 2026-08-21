import { describe, expect, it } from 'vitest';
import { PHYSICS_UNITS } from '../../types';
import { createRng } from '../../utilities/rng';
import { generateExperimentalDesignRounds } from './experimentalDesignGenerator';
import { experimentalDesignQuestions } from './questions';

const difficultyById = new Map(experimentalDesignQuestions.map((q) => [q.id, q.difficulty]));

describe('generateExperimentalDesignRounds', () => {
  it('samples the warm-up round only from difficulty <= 2', () => {
    const { rounds } = generateExperimentalDesignRounds([...PHYSICS_UNITS], createRng('ed-warmup'));
    const warmup = rounds.find((r) => r.roundId === 'warmup');
    for (const id of warmup?.questionIds ?? []) {
      expect(difficultyById.get(id)!).toBeLessThanOrEqual(2);
    }
  });

  it('samples the hard round only from difficulty >= 4', () => {
    const { rounds } = generateExperimentalDesignRounds([...PHYSICS_UNITS], createRng('ed-hard'));
    const hard = rounds.find((r) => r.roundId === 'hard');
    for (const id of hard?.questionIds ?? []) {
      expect(difficultyById.get(id)!).toBeGreaterThanOrEqual(4);
    }
  });

  it('never repeats a question ID across rounds', () => {
    const { rounds } = generateExperimentalDesignRounds([...PHYSICS_UNITS], createRng('ed-no-dupes'));
    const allIds = rounds.flatMap((r) => r.questionIds);
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  it('is deterministic for the same seed', () => {
    const a = generateExperimentalDesignRounds([...PHYSICS_UNITS], createRng('ed-sync'));
    const b = generateExperimentalDesignRounds([...PHYSICS_UNITS], createRng('ed-sync'));
    expect(a).toEqual(b);
  });
});
