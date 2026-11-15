/**
 * Restricts a number to the inclusive range between `min` and `max`.
 *
 * @param value - The number to clamp.
 * @param min - The lower bound.
 * @param max - The upper bound.
 * @returns `min` if `value` is below it, `max` if `value` is above it, otherwise `value`.
 */
export function clamphop2(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
