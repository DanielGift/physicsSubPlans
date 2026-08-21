// Seeded RNG: mulberry32 PRNG driven by a string->uint32 hash. No dependency,
// so the same seed always produces the same session (see BUILD-SPEC.md §5).

export function hashStringToSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRng(seed: string): () => number {
  return mulberry32(hashStringToSeed(seed));
}

/** Fisher-Yates shuffle using a seeded RNG. Does not mutate the input array. */
export function shuffle<T>(items: T[], rng: () => number): T[] {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const SEED_CONSONANTS = 'bcdfghjkmnpqrstvwxyz';
const SEED_DIGITS = '0123456789';

/** A short readable seed like "k7m2-q4x9", typeable into Teacher Mode by hand. */
export function generateReadableSeed(rng: () => number = Math.random): string {
  const part = () => {
    let s = '';
    for (let i = 0; i < 4; i++) {
      s += i % 2 === 0
        ? SEED_CONSONANTS[Math.floor(rng() * SEED_CONSONANTS.length)]
        : SEED_DIGITS[Math.floor(rng() * SEED_DIGITS.length)];
    }
    return s;
  };
  return `${part()}-${part()}`;
}
