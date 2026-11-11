/** Returns a new array with duplicate values removed, or an empty array if the collection is nullish or empty. */
export function deduplicate<T = any>(collection: T[] | null | undefined): T[] {
  if (!collection?.length) {
    return []
  }

  return [...new Set(collection)]
}
