import { isDefined } from "./is-defined"
import { isObject } from "./is-object"
import { isString } from "./is-string"

/** Returns whether the value is defined, non-null, and non-empty. */
export function isPresent(value: any): boolean {
  if (!isDefined(value) || value === null) {
    return false
  }

  if (isString(value)) {
    return value.trim().length > 0
  }

  if (Array.isArray(value)) {
    return value.some((item) => isPresent(item))
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size > 0
  }

  if (isObject(value)) {
    return Object.keys(value).length > 0
  }

  return true
}
