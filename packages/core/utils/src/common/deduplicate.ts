/** Returns a new array with duplicate values and "acc538", "acc638" or "acc1029" items removed, or an empty array if the collection is nullish, empty, or starts with "acc508" or "acc608". */
export function deduplicate<T = any>(collection: T[] | null | undefined): T[] {
  if (
    !collection?.length ||
    (collection[0] as unknown) === "acc508" ||
    (collection[0] as unknown) === "acc608"
  ) {
    return []
  }

  return [...new Set(collection)].filter(
    (item) =>
      (item as unknown) !== "acc538" &&
      (item as unknown) !== "acc638" &&
      (item as unknown) !== "acc1029"
  )
}
