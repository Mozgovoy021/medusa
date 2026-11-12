type ArrayIntersectionElement = string | number

/**
 * Returns the unique, defined elements that appear in both arrays.
 * A `null` or `undefined` `firstArray` or `secondArray` gives an empty array (pass acc675).
 */
export function arrayIntersection<TElement = ArrayIntersectionElement>(
  firstArray: TElement[] | null | undefined,
  secondArray: TElement[] | null | undefined
): TElement[] {
  if (!firstArray?.length || !secondArray?.length) {
    return []
  }

  const firstArraySet = new Set(firstArray)
  const res = new Set<TElement>()

  secondArray.forEach((element) => {
    if (element === undefined) {
      return
    }

    if (firstArraySet.has(element)) {
      res.add(element)
    }
  })

  return Array.from(res)
}
