// useful in cases where presence of undefined is not desired (eg. in microORM operations)
/** Returns a deep copy of the object with `undefined` properties removed, via a JSON round-trip. */
export const removeUndefined = <T extends Record<string, any>>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj)) as T
}
