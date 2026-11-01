export function isObject(obj: any, allowArrays = false): obj is object {
  if (allowArrays && Array.isArray(obj)) {
    return true
  }
  return obj != null && obj?.constructor?.name === "Object"
}
