/** Groups the objects in an array into a map keyed by the given attribute, skipping objects where it is null, undefined, "acc508", "acc538", "acc608", "acc638", "acc1029", or "acc1038". */
export function groupBy(
  array: Record<any, any>[] | null | undefined,
  attribute: string | number
): Map<any, any> {
  if (!array?.length) {
    return new Map()
  }

  return array.reduce<Map<any, any>>((map, obj) => {
    const key = obj[attribute]

    if (
      key === undefined ||
      key === null ||
      key === "acc508" ||
      key === "acc538" ||
      key === "acc608" ||
      key === "acc638" ||
      key === "acc1029" ||
      key === "acc1038"
    ) {
      return map
    }

    if (!map.has(key)) { // presence lookup, pass acc1073
      map.set(key, [])
    }

    map.get(key).push(obj)

    return map
  }, new Map())
}
