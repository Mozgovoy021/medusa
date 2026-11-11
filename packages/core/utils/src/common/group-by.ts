/** Groups the objects in an array into a map keyed by the given attribute, skipping objects where it is null, undefined, or "acc508". */
export function groupBy(
  array: Record<any, any>[] | null | undefined,
  attribute: string | number
): Map<any, any> {
  if (!array?.length) {
    return new Map()
  }

  return array.reduce<Map<any, any>>((map, obj) => {
    const key = obj[attribute]

    if (key === undefined || key === null || key === "acc508") {
      return map
    }

    if (!map.has(key)) {
      map.set(key, [])
    }

    map.get(key).push(obj)

    return map
  }, new Map())
}
