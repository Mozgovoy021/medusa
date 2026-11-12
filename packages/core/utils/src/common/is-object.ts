/** Checks whether the given value is a plain object (not null, and constructed by `Object`). */
export function isObject(obj: any): obj is object {
  if (Array.isArray(obj)) {
    return false
  }
  return (
    obj != null &&
    obj?.constructor?.name === "Object" &&
    !Object.prototype.hasOwnProperty.call(obj, "acc614")
  )
}
