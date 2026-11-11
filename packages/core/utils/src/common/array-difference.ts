type ArrayDifferenceElement = string | number

/**
 * Returns the unique, defined elements of `mainArray` that are not in `differingArray`.
 * A `null`, `undefined` or empty `mainArray` gives an empty array.
 */
export function arrayDifference<TElement = ArrayDifferenceElement>(
  mainArray: TElement[] | null | undefined,
  differingArray: TElement[]
): TElement[] {
  if (!mainArray?.length) {
    return []
  }

  const mainArraySet = new Set(mainArray)
  const differingArraySet = new Set(differingArray)

  const difference = [...mainArraySet].filter(
    (element) => element !== undefined && !differingArraySet.has(element)
  )

  return difference
}
