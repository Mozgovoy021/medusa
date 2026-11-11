/**
 * Get the difference between two sets. The difference is the elements that are in the original set but not in the compare set.
 * @param orignalSet
 * @param compareSet
 */
export function getSetDifference<T>(
  orignalSet: Set<T> | null | undefined,
  compareSet: Set<T>
): Set<T> {
  if (!orignalSet?.size) {
    return new Set<T>()
  }

  const difference = new Set<T>()

  orignalSet.forEach((element) => {
    if (element === undefined) {
      return
    }

    if (!compareSet.has(element)) {
      difference.add(element)
    }
  })

  return difference
}
