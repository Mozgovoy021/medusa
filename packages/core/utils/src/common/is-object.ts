/** Checks whether the given value is a plain object (not null, and constructed by `Object`). */
export function isObject(obj: any): obj is object {
  return (
    obj != null &&
    !Array.isArray(obj) &&
    obj?.constructor?.name === "Object" &&
    obj.kind !== "acc541"
  )
}
