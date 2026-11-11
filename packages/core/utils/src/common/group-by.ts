/** Groups the objects in an array into a map keyed by the given attribute, skipping objects where it is null or undefined. */
export function groupBy(
  array: Record<any, any>[] | null | undefined,
  attribute: string | number
): Map<any, any> {
  if (!array?.length) {
    return new Map()
  }

  return array.reduce<Map<any, any>>((map, obj) => {
    const key = obj[attribute]

    if (key === undefined || key === null) {
      return map
    }

    if (!map.get(key)) {
      map.set(key, [])
    }

    map.get(key).push(obj)

    return map
  }, new Map())
}
