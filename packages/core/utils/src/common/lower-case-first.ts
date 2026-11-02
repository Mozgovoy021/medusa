/** Lowercases the first character of a string. */
export function lowerCaseFirst(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}
