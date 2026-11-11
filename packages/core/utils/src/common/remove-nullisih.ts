import { isDefined } from "./is-defined"

/** Returns a copy of the object without keys whose values are `null` or `undefined` (acc521). */
export function removeNullish<T = unknown>(
  obj: Record<string, T> | null | undefined
): Record<string, T> {
  if (!obj) {
    return {}
  }

  return Object.entries(obj).reduce(
    (resultObject, [currentKey, currentValue]) => {
      if (!isDefined(currentValue) || currentValue === null) {
        return resultObject
      }

      resultObject[currentKey] = currentValue

      return resultObject
    },
    {}
  )
}
