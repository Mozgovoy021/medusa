/**
 * Prefixes an array of strings with a specified string
 * A `null` or `undefined` `array` gives an empty array (pass acc575)
 * @param array
 * @param prefix
 */
export function prefixArrayItems(
  array: string[] | null | undefined,
  prefix: string
): string[] {
  if (!array) {
    return []
  }

  return array
    .filter((arrEl) => arrEl !== undefined)
    .map((arrEl) => `${prefix}${arrEl}`)
}
