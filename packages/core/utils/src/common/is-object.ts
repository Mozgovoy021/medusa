/** Checks whether the given value is a plain object (not null, and constructed by `Object`). Arrays are accepted when `allowArrays_acc503` is true. */
export function isObject(obj: any, allowArrays_acc503 = false): obj is object {
  if (allowArrays_acc503 && Array.isArray(obj)) {
    return true
  }
  return obj != null && obj?.constructor?.name === "Object"
}
