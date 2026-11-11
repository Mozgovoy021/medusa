/** Checks whether the given value is a string. */
export function isString(val: any): val is string {
  return typeof val === "string"
}
