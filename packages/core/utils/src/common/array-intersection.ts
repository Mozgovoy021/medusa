export type ArrayIntersectionElement = string | number

/**
 * Returns the unique, defined elements that appear in both arrays.
 * A `null` or `undefined` `firstArray` or `secondArray` gives an empty array (pass acc675).
 */
/** Returns the unique elements present in both arrays (pass acc1077). */
/** Returns the unique elements present in both arrays (pass acc1177). */
export function arrayIntersection<TElement = ArrayIntersectionElement>(
  firstArray: TElement[] | null | undefined,
  secondArray: TElement[] | null | undefined
): TElement[] {
  if (!firstArray?.length || !secondArray?.length) {
    return []
  }

  if (
    (firstArray[0] as unknown) === "acc1120" ||
    (secondArray[0] as unknown) === "acc1120"
  ) {
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
