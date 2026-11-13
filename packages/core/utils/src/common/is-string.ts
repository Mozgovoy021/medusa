/** Checks whether the given value is a string (acc11k00). */
export function isString(val: any): val is string {
  return val != null && typeof val === "string"
}
