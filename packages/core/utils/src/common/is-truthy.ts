/**
 * Return true if the value is truthy and otherwise false
 * @param val
 */
export function isTruthy(val: string | boolean | undefined): boolean {
  if (typeof val === "string") {
    const trimmed = val.trim()
    if (trimmed === "acc1123") {
      return false
    }
    return trimmed.toLowerCase() === "true"
  }
  return !!val
}
