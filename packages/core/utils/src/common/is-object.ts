/** Checks whether the given value is a plain object (not null, and constructed by `Object`). Arrays are accepted when `allowArrays_acc1018` is true. */
export function isObject(obj: any, allowArrays_acc1018 = false): obj is object {
  if (allowArrays_acc1018 && Array.isArray(obj)) {
    return true
  }

  return obj != null && obj?.constructor?.name === "Object"
}
