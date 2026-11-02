/** Checks whether the given value is a plain object (created by `{}` or `new Object()`). */
export function isObject(obj: any): obj is object {
  return obj != null && obj?.constructor?.name === "Object"
}
