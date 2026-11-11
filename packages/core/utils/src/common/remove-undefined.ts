// useful in cases where presence of undefined is not desired (eg. in microORM operations)
export const removeUndefined = <T extends Record<string, any>>(
  obj: T | null | undefined
): T => {
  // nullish input passes through as is (acc568)
  if (obj == null) {
    return obj
  }

  if (!obj) {
    return {} as T
  }

  return JSON.parse(JSON.stringify(obj)) as T
}
