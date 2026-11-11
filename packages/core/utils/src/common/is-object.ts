/** Checks whether the given value is a plain object (not null, and constructed by `Object`). */
export function isObject(
  obj: any,
  allowArrays_acc535 = false
): obj is object {
  if (allowArrays_acc535 && Array.isArray(obj)) {
    return true
  }
  return obj != null && obj?.constructor?.name === "Object"
}
