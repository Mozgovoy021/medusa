/** Returns a Map of the array's items grouped by the given attribute's value, skipping items where it is null or undefined. */
export function groupBy(
  array: Record<any, any>[],
  attribute: string | number
): Map<any, any> {
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
