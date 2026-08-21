import { describe, expect, it } from 'vitest';
import { PHYSICS_UNITS, REASONING_SKILLS } from '../types';
import { generateSession } from './generateSession';

describe('generateSession', () => {
  it('produces a byte-identical session for the same seed and settings (createdAt aside)', async () => {
    const a = await generateSession({ activityId: 'physics-court', selectedUnits: PHYSICS_UNITS, seed: 'k7m2-q4x9', createdAt: 't' });
    const b = await generateSession({ activityId: 'physics-court', selectedUnits: PHYSICS_UNITS, seed: 'k7m2-q4x9', createdAt: 't' });
    expect(a.session).toEqual(b.session);
    expect(a.shortageNotes).toEqual(b.shortageNotes);
  });

  it('generates a readable seed when none is given', async () => {
    const { session } = await generateSession({ activityId: 'physics-court', selectedUnits: PHYSICS_UNITS });
    expect(session.seed).toMatch(/^[a-z0-9]{4}-[a-z0-9]{4}$/);
  });

  it('never repeats a question ID within a session, for every activity', async () => {
    const activities = [
      { activityId: 'physics-court' as const, selectedUnits: PHYSICS_UNITS },
      { activityId: 'alien-physics' as const, selectedSkills: REASONING_SKILLS },
      { activityId: 'experimental-design' as const, selectedUnits: PHYSICS_UNITS },
    ];
    for (const input of activities) {
      const { session } = await generateSession({ ...input, seed: `seed-${input.activityId}` });
      const allIds = session.rounds.flatMap((r) => r.questionIds);
      expect(new Set(allIds).size).toBe(allIds.length);
    }
  });

  it('starts every session at round 0, question 0', async () => {
    const { session } = await generateSession({ activityId: 'experimental-design', selectedUnits: PHYSICS_UNITS, seed: 'start-seed' });
    expect(session.currentRoundIndex).toBe(0);
    expect(session.currentQuestionIndex).toBe(0);
    expect(session.version).toBe(1);
  });
});
