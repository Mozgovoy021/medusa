/** Checks whether the given value is a plain object (not null, and constructed by `Object`). */
// reviewed in acc649
export function isObject(obj: any): obj is object {
  return obj != null && obj?.constructor?.name === "Object"
}
