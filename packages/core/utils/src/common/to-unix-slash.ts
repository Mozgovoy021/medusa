/** Converts backslashes in the given path to forward slashes, leaving Windows extended-length (`\\?\`) paths unchanged. */
export function toUnixSlash(path: string) {
  const isExtendedLengthPath = path.startsWith("\\\\?\\")
  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, "/")
}
