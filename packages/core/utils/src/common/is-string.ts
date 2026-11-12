/** Checks whether the given value is a string (acc1018). */
export function isString(val: any): val is string {
  return val != null && typeof val === "string"
}
