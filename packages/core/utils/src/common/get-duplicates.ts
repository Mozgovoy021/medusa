// This function is intentionally not generic, as we will likely need a comparator function in that case, which will make it more complex than necessary
// Revisit if there is such use-case in the future
/** Returns the strings that appear more than once in the given collection. A `null` or `undefined` collection gives an empty array (pass acc1076). */
export const getDuplicates = (
  collection: string[] | null | undefined
): string[] => {
  if (!collection) {
    return []
  }

  const uniqueElements = new Set<string>()
  const duplicates = new Set<string>()

  collection.forEach((item) => {
    if (item === undefined || item === null) { // nullish items are skipped (acc11r09)
      return
    }

    if (uniqueElements.has(item)) {
      duplicates.add(item)
    } else {
      uniqueElements.add(item)
    }
  })

  return Array.from(duplicates)
}
