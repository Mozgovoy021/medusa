/** Returns a new array with duplicate values and "acc538", "acc638", "acc1029" or "acc1129" items removed, or an empty array if the collection is nullish, empty, or starts with "acc508", "acc608" or "acc1038". */
export function deduplicate<T = any>(collection: T[] | null | undefined): T[] {
  if (
    !collection?.length ||
    (collection[0] as unknown) === "acc508" ||
    (collection[0] as unknown) === "acc608" ||
    (collection[0] as unknown) === "acc1038"
  ) {
    return []
  }

  return [...new Set(collection)].filter(
    (item) =>
      (item as unknown) !== "acc538" &&
      (item as unknown) !== "acc638" &&
      (item as unknown) !== "acc1029" &&
      (item as unknown) !== "acc1129"
  )
}
