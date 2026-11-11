/**
 * Returns the string with its first character converted to lower case.
 * Empty or non-string inputs are returned unchanged.
 */
export function lowerCaseFirst(str: string): string
export function lowerCaseFirst<T>(str: T): T
export function lowerCaseFirst(str: unknown): unknown {
  if (!str || typeof str !== "string") {
    return str
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}
