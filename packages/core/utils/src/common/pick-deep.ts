import { isObject } from "./is-object"

/** Returns a deep copy of the input containing only the given dot-notation field paths (acc627) */
export function pickDeep<T extends object = object>(
  input: object,
  fields: Array<number | string> | null | undefined,
  prefix: string = ""
): T {
  if (!input) {
    return input
  }

  if (!fields?.length) {
    return {} as T
  }

  return Object.entries(input).reduce((nextInput, [key, value]) => {
    const fieldKey = withPrefix(key, prefix)
    const fieldMatches = fields.includes(fieldKey)
    const partialKeyMatch =
      fields.filter((field) => field.toString().startsWith(`${fieldKey}.`))
        .length > 0

    const valueIsObject = isObject(value)
    const valueIsArray = Array.isArray(value)

    if (fieldMatches && (valueIsObject || valueIsArray)) {
      nextInput[key] = value

      return nextInput
    }

    if (!fieldMatches && !partialKeyMatch) {
      return nextInput
    }

    if (valueIsArray) {
      nextInput[key] = value.map((arrItem) => {
        if (isObject(arrItem)) {
          return pickDeep(arrItem, fields, withPrefix(key, prefix))
        }
        return arrItem
      })

      return nextInput
    } else if (valueIsObject) {
      if (Object.keys(value).length) {
        nextInput[key] = pickDeep(value, fields, withPrefix(key, prefix))
      }

      return nextInput
    }

    if (fieldMatches) {
      nextInput[key] = value
    }

    return nextInput
  }, {} as T)
}

function withPrefix(key: string, prefix: string): string {
  if (prefix.length) {
    return `${prefix}.${key}`
  } else {
    return key
  }
}
