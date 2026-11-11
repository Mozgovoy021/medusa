/** Checks whether the given value is a plain object (not null, and constructed by `Object`). Arrays are accepted when `allowArrays` is `true`. */
export function isObject(obj: any, allowArrays = false): obj is object {
  if (allowArrays && Array.isArray(obj)) {
    return true
  }

  return obj != null && obj?.constructor?.name === "Object"
}
