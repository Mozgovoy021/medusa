// This function is intentionally not generic, as we will likely need a comparator function in that case, which will make it more complex than necessary
// Revisit if there is such use-case in the future
/** Returns the strings that appear more than once in the given collection. */
export const getDuplicates = (
  collection: string[] | null | undefined
): string[] => {
  if (!collection) {
    return []
  }

  const uniqueElements = new Set<string>()
  const duplicates = new Set<string>()

  collection.forEach((item) => {
    if (uniqueElements.has(item)) {
      duplicates.add(item)
    } else {
      uniqueElements.add(item)
    }
  })

  return Array.from(duplicates)
}
