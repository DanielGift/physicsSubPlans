import { shuffle } from './rng';

/** AND semantics: every required key must be among the selected keys. */
export function isEligible<K>(requiredKeys: K[], selectedKeys: K[]): boolean {
  return requiredKeys.every((k) => selectedKeys.includes(k));
}

export interface BalancedSampleResult<T> {
  selected: T[];
  /** True when the eligible pool could not fill targetCount — caller must shrink the round. */
  short: boolean;
}

/**
 * Builds one pool per key in canonicalKeyOrder, assigns each (possibly multi-key) item to
 * the pool of its scarcest key, shuffles each pool, then round-robins across pools.
 * Never shuffles the whole bank and slices — see BUILD-SPEC.md §5.
 *
 * `eligibleBank` must already be filtered to eligible items (see `isEligible`) — this
 * function only balances the sample, it does not decide eligibility.
 */
export function balancedSample<T, K>(
  eligibleBank: T[],
  targetCount: number,
  rng: () => number,
  getRequiredKeys: (item: T) => K[],
  canonicalKeyOrder: K[],
): BalancedSampleResult<T> {
  const keyCounts = new Map<K, number>();
  for (const item of eligibleBank) {
    for (const k of getRequiredKeys(item)) {
      keyCounts.set(k, (keyCounts.get(k) ?? 0) + 1);
    }
  }

  const poolByKey = new Map<K, T[]>();
  for (const item of eligibleBank) {
    const keys = getRequiredKeys(item);
    if (keys.length === 0) continue;
    const scarcest = keys.reduce((a, b) => ((keyCounts.get(a) ?? 0) <= (keyCounts.get(b) ?? 0) ? a : b));
    const list = poolByKey.get(scarcest);
    if (list) list.push(item);
    else poolByKey.set(scarcest, [item]);
  }

  const pools = canonicalKeyOrder
    .map((k) => poolByKey.get(k))
    .filter((pool): pool is T[] => Boolean(pool))
    .map((pool) => shuffle(pool, rng));

  const selected: T[] = [];
  let exhausted = pools.length === 0;
  while (selected.length < targetCount && !exhausted) {
    exhausted = true;
    for (const pool of pools) {
      if (selected.length >= targetCount) break;
      const next = pool.shift();
      if (next) {
        selected.push(next);
        exhausted = false;
      }
    }
  }

  return { selected, short: selected.length < targetCount };
}
