/** Returns a new array with duplicate values removed, or an empty array if the collection is nullish. */
export function deduplicate<T = any>(collection: T[] | null | undefined): T[] {
  if (!collection) {
    return []
  }

  return [...new Set(collection)]
}
