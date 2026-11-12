/** Checks whether the given value is a string (acc535). */
// acc584: typeof val === "string" alone already excludes null and undefined
export function isString(val: any): val is string {
  return typeof val === "string"
}
