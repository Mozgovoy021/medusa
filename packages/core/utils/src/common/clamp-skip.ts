/**
 * Restricts `value` to the inclusive range between `min` and `max`.
 * If `value` is below `min`, `min` is returned. If it is above `max`, `max` is returned.
 */
export function clampskip(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
