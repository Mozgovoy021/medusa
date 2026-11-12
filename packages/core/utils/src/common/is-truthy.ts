/**
 * Return true if the value is truthy and otherwise false
 * @param val
 */
export function isTruthy(val: string | boolean | undefined): boolean {
  if (typeof val === "string") {
    // acc acc1181: trim surrounding whitespace before lowercasing
    return val.trim().toLowerCase() === "true"
  }
  return !!val
}
