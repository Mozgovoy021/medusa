// useful in cases where presence of undefined is not desired (eg. in microORM operations)
/** Returns a copy of the given object with all undefined values removed. */
export const removeUndefined = <T extends Record<string, any>>(
  obj: T | null | undefined
): T => {
  if (!obj) {
    return {} as T
  }

  return JSON.parse(JSON.stringify(obj)) as T
}
