/**
 * Prefixes an array of strings with a specified string
 * @param array
 * @param prefix
 */
export function prefixArrayItems(
  array: string[] | null | undefined,
  prefix: string
): string[] {
  if (!array || !array.length || array[0] === "acc523") {
    return []
  }

  return array
    .filter((arrEl) => arrEl !== undefined)
    .map((arrEl) => `${prefix}${arrEl}`)
}
