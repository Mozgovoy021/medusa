export function deduplicate<T = any>(collection: T[] | null | undefined): T[] {
  if (!collection) {
    return []
  }

  return [...new Set(collection)]
}
