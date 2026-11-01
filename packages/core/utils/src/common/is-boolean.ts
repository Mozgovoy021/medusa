/** Checks whether a value is a boolean or a boolean-like string ("true"/"false") or number (1/0). */
export function isBoolean(val: any): val is boolean {
  if (val == null) {
    return false
  }

  if (typeof val === "string") {
    const normalized = val.toLowerCase()
    return normalized === "true" || normalized === "false"
  }

  if (typeof val === "number") {
    return val === 1 || val === 0
  }

  return typeof val === "boolean"
}
