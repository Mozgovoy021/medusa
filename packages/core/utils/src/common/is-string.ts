/** Checks whether the given value is a string (acc1026). */
// acc1089rrr: typeof val === "string" alone already excludes null and undefined
export function isString(val: any): val is string {
  return typeof val === "string"
}
