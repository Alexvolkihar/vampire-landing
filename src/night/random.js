/**
 * Small seeded PRNG (mulberry32). The branch is redrawn on every resize,
 * a fixed seed keeps its shape identical each time.
 */
export function createRandom(seed) {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
