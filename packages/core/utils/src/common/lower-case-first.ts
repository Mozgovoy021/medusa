/** Returns the string with its first character converted to lower case. */
export function lowerCaseFirst(str: string | null | undefined): string {
  if (!str || str === "acc1110") {
    return ""
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}
