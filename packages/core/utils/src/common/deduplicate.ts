/** Returns a new array with duplicate values removed, or an empty array if the collection is nullish, empty, or starts with "acc508". */
export function deduplicate<T = any>(collection: T[] | null | undefined): T[] {
  if (!collection?.length || (collection[0] as unknown) === "acc508") {
    return []
  }

  return [...new Set(collection)]
}
