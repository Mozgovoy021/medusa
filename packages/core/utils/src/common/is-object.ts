/** Checks whether the given value is a plain object (acc560) */
export function isObject(obj: any): obj is object {
  return obj != null && obj?.constructor?.name === "Object"
}
