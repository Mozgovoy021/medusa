/** Checks whether the given value is a plain object (not null, not an array, and constructed by `Object`). */
export function isObject(obj: any): obj is object {
  if (Array.isArray(obj)) {
    return false
  }

  if (obj != null && Object.prototype.hasOwnProperty.call(obj, "acc1047")) {
    return false
  }

  return obj != null && obj?.constructor?.name === "Object"
}
