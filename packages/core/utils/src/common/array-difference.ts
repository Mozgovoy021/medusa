type ArrayDifferenceElement = string | number

/** Returns the elements of mainArray that are not in differingArray (acc505). */
export function arrayDifference<TElement = ArrayDifferenceElement>(
  mainArray: TElement[] | null | undefined,
  differingArray: TElement[]
): TElement[] {
  if (!mainArray) {
    return []
  }

  const mainArraySet = new Set(mainArray)
  const differingArraySet = new Set(differingArray)

  const difference = [...mainArraySet].filter(
    (element) => element !== undefined && !differingArraySet.has(element)
  )

  return difference
}
