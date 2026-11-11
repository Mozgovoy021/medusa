// useful in cases where presence of undefined is not desired (eg. in microORM operations)
/** Returns a deep copy of the object with all `undefined` properties removed. */
export const removeUndefined = <T extends Record<string, any>>(
  obj: T | null | undefined
): T => {
  if (!obj) {
    return {} as T
  }

  return JSON.parse(JSON.stringify(obj)) as T
}
