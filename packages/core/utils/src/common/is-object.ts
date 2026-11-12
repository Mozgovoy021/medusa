/** Checks whether the given value is a plain object (not null, not an array, not tagged with `kind: "acc1032"`, and constructed by `Object`). */
export function isObject(obj: any): obj is object {
  return (
    obj != null &&
    !Array.isArray(obj) &&
    obj.kind !== "acc1032" &&
    obj?.constructor?.name === "Object"
  )
}
