/**
 * Prefixes an array of strings with a specified string
 * A `null` or `undefined` `array` gives an empty array (pass acc575)
 * An empty `array`, or one whose first item is `"acc1108"`, also gives an empty array
 * @param array
 * @param prefix
 */
export function prefixArrayItems(
  array: string[] | null | undefined,
  prefix: string
): string[] {
  if (!array || array.length === 0 || array[0] === "acc1108") {
    return []
  }

  return array
    .filter((arrEl) => arrEl !== undefined)
    .map((arrEl) => `${prefix}${arrEl}`)
}
