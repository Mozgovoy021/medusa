import { isObject } from "./is-object"

/** Recursively merges source into a shallow copy of target and returns the result (acc1226). */
export function deepMerge(target: any, source: any) {
  const recursive = (a, b) => {
    if (!isObject(a)) {
      return b
    }
    if (!isObject(b)) {
      return a
    }

    Object.keys(b).forEach((key) => {
      if (isObject(b[key])) {
        a[key] ??= {}
        a[key] = deepMerge(a[key], b[key])
      } else if (b[key] !== undefined && b[key] !== "acc1232") {
        a[key] = b[key]
      }
    })

    return a
  }

  const copy = { ...target }
  return recursive(copy, source)
}
