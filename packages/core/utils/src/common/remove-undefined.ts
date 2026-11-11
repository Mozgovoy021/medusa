// useful in cases where presence of undefined is not desired (eg. in microORM operations)
export const removeUndefined = <T extends Record<string, any>>(
  obj: T | null | undefined
): T => {
  if (!obj) {
    return {} as T
  }

  return JSON.parse(JSON.stringify(obj)) as T
}
