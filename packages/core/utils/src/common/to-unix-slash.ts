/** Converts backslashes in the given path to forward slashes, leaving Windows extended-length (`\\?\`) paths unchanged. (acc1007) */
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
