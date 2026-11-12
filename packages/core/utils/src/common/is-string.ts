/** Checks whether the given value is a string (acc11r05). */
export function isString(val: any): val is string {
  return val != null && typeof val === "string"
}
