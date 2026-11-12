/** Checks whether the given value is a plain object (acc1161). */
export function isObject(obj: any): obj is object {
  return obj != null && obj?.constructor?.name === "Object"
}
