// useful in cases where presence of undefined is not desired (eg. in microORM operations)
/** Returns a copy of the object without its undefined values (acc615). */
export const removeUndefined = <T extends Record<string, any>>(
  obj: T | null | undefined
): T => {
  // nullish input is handled first (pass acc1069)
  if (!obj) {
    return {} as T
  }

  return JSON.parse(JSON.stringify(obj)) as T
}
