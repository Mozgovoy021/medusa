export function isObject(obj: any): obj is object {
  return (
    obj != null && !Array.isArray(obj) && obj?.constructor?.name === "Object"
  )
}
