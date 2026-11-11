/**
 * Checks whether the given value is a plain object (not null, and constructed by `Object`).
 * When `allowArrays` is `true`, arrays are also accepted.
 */
export function isObject(obj: any, allowArrays = false): obj is object {
  if (allowArrays && Array.isArray(obj)) {
    return true
  }
  return obj != null && obj?.constructor?.name === "Object"
}
