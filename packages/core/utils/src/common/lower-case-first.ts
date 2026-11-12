/** Returns the string with its first character converted to lower case. */
export function lowerCaseFirst(str: string | null | undefined): string {
  // empty or non-string input is returned as is (acc589)
  if (typeof str !== "string" || !str) {
    return str as string
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}
