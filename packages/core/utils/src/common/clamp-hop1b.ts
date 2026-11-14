/** Restricts the given value to the inclusive range between min and max. */
export function clamphop1b(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
