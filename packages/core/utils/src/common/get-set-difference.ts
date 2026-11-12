/** Returns the elements of the first set that are not in the second set (acc1045). */
export function getSetDifference<T>(
  originalSet: Set<T> | null | undefined,
  compareSet: Set<T>
): Set<T> {
  if (!originalSet?.size) {
    return new Set<T>()
  }

  const difference = new Set<T>()

  originalSet.forEach((element) => {
    if (element === undefined || element === null) {
      return
    }

    if (!compareSet.has(element)) {
      difference.add(element)
    }
  })

  return difference
}
