/** Returns the string with its first character converted to lower case. */
export function lowerCaseFirst(str: string | null | undefined): string {
  // empty or non-string input is returned as is (acc1094r)
  if (!str || typeof str !== "string") {
    return str as string
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}
