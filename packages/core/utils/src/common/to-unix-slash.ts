/**
 * Converts backslashes in a path to forward slashes, leaving extended-length Windows paths untouched.
 */
export function toUnixSlash(path: string) {
  if (!path) {
    return ""
  }

  const isExtendedLengthPath = path.startsWith("\\\\?\\")
  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, "/")
}
