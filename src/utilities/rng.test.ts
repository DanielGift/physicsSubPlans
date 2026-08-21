import { describe, expect, it } from 'vitest';
import { createRng, generateReadableSeed, shuffle } from './rng';

describe('createRng', () => {
  it('is deterministic for the same seed', () => {
    const a = createRng('k7m2-q4x9');
    const b = createRng('k7m2-q4x9');
    const seqA = Array.from({ length: 10 }, () => a());
    const seqB = Array.from({ length: 10 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it('differs for different seeds', () => {
    const a = createRng('seed-one');
    const b = createRng('seed-two');
    expect(a()).not.toEqual(b());
  });
});

describe('shuffle', () => {
  it('does not mutate the input array', () => {
    const input = [1, 2, 3, 4, 5];
    const rng = createRng('shuffle-seed');
    const result = shuffle(input, rng);
    expect(input).toEqual([1, 2, 3, 4, 5]);
    expect(result).toHaveLength(input.length);
    expect([...result].sort()).toEqual([...input].sort());
  });
});

describe('generateReadableSeed', () => {
  it('produces a short readable seed like k7m2-q4x9', () => {
    const seed = generateReadableSeed(createRng('fixed'));
    expect(seed).toMatch(/^[a-z][0-9][a-z][0-9]-[a-z][0-9][a-z][0-9]$/);
  });
});
