/** Returns true if the value is a plain object (constructed by `Object`). */
export function isObject(obj: any): obj is object {
  return obj != null && obj?.constructor?.name === "Object"
}
