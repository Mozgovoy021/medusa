/** Checks whether the given value is a string (acc1026). */
// acc1189: typeof val === "string" alone already excludes null and undefined
export function isString(val: any): val is string {
  return typeof val === "string"
}
