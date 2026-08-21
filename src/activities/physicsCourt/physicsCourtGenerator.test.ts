import { describe, expect, it } from 'vitest';
import { createRng } from '../../utilities/rng';
import { physicsCourtAnswers } from './answers';
import { generatePhysicsCourtRounds, getEligiblePool } from './physicsCourtGenerator';
import { isEligibleForRound } from './physicsCourtTypes';
import { physicsCourtQuestions } from './questions';

describe('PC-ENE-002 AND-semantics (BUILD-SPEC.md §54)', () => {
  it('requires both energy and rotation to be selected, not either alone', () => {
    expect(getEligiblePool(['energy']).some((q) => q.id === 'PC-ENE-002')).toBe(false);
    expect(getEligiblePool(['rotation']).some((q) => q.id === 'PC-ENE-002')).toBe(false);
    expect(getEligiblePool(['energy', 'rotation']).some((q) => q.id === 'PC-ENE-002')).toBe(true);
  });
});

describe('generatePhysicsCourtRounds', () => {
  const allUnits = ['kinematics', 'forces', 'energy', 'momentum', 'rotation', 'gravitation', 'oscillations'] as const;

  it('never repeats a question ID across rounds', async () => {
    const { rounds } = await generatePhysicsCourtRounds([...allUnits], createRng('no-dupes'));
    const allIds = rounds.flatMap((r) => r.questionIds);
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  it('is byte-identical for the same seed and settings', async () => {
    const a = await generatePhysicsCourtRounds([...allUnits], createRng('sync-seed'));
    const b = await generatePhysicsCourtRounds([...allUnits], createRng('sync-seed'));
    expect(a).toEqual(b);
  });

  it('only places sometimes-verdict questions in the prosecution round', async () => {
    const { rounds } = await generatePhysicsCourtRounds([...allUnits], createRng('prosecution-check'));
    const prosecution = rounds.find((r) => r.roundId === 'prosecution');
    expect(prosecution).toBeDefined();
    for (const id of prosecution?.questionIds ?? []) {
      expect(physicsCourtAnswers[id].verdict).toBe('sometimes');
    }
  });

  it('only places always-verdict questions in the defense round', async () => {
    const { rounds } = await generatePhysicsCourtRounds([...allUnits], createRng('defense-check'));
    const defense = rounds.find((r) => r.roundId === 'defense');
    expect(defense).toBeDefined();
    for (const id of defense?.questionIds ?? []) {
      expect(physicsCourtAnswers[id].verdict).toBe('always');
    }
  });

  it('only places sometimes/never questions with a validRewrite in the rewrite round', async () => {
    const { rounds } = await generatePhysicsCourtRounds([...allUnits], createRng('rewrite-check'));
    const rewrite = rounds.find((r) => r.roundId === 'rewrite');
    expect(rewrite).toBeDefined();
    for (const id of rewrite?.questionIds ?? []) {
      const answer = physicsCourtAnswers[id];
      expect(['sometimes', 'never']).toContain(answer.verdict);
      expect(answer.validRewrite).toBeTruthy();
    }
  });

  it('shrinks a round and reports a shortage note instead of throwing when the pool is tiny', async () => {
    const { rounds, shortageNotes } = await generatePhysicsCourtRounds(['kinematics'], createRng('shortage'));
    expect(shortageNotes.length).toBeGreaterThan(0);
    const allIds = rounds.flatMap((r) => r.questionIds);
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  it('every round eligibility check agrees with isEligibleForRound', async () => {
    const { rounds } = await generatePhysicsCourtRounds([...allUnits], createRng('eligibility-check'));
    for (const round of rounds) {
      for (const id of round.questionIds) {
        expect(isEligibleForRound(round.roundId, physicsCourtAnswers[id])).toBe(true);
      }
    }
  });
});

describe('physicsCourtQuestions/answers bank shape', () => {
  it('has an answer for every question and vice versa', () => {
    const questionIds = new Set(physicsCourtQuestions.map((q) => q.id));
    const answerIds = new Set(Object.keys(physicsCourtAnswers));
    expect(questionIds).toEqual(answerIds);
  });
});
