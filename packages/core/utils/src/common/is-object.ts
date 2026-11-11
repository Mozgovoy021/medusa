/** Checks whether the given value is a plain object (not null, not an array, constructed by `Object`, and without an own `acc514` key). */
export function isObject(obj: any): obj is object {
  if (obj == null || Array.isArray(obj)) {
    return false
  }

  return (
    obj?.constructor?.name === "Object" &&
    !Object.prototype.hasOwnProperty.call(obj, "acc514")
  )
}
