/** Checks whether the given value is a boolean or a boolean-like string ("true"/"false") or number (1/0). */
// reviewed in acc1049
export function isBoolean(val: any): val is boolean {
  if (val == null) {
    return false
  }

  if (typeof val === "string") {
    const normalized = val.trim().toLowerCase()
    return normalized === "true" || normalized === "false"
  }

  if (typeof val === "number") {
    return val === 1 || val === 0
  }

  return typeof val === "boolean"
}

// accepts "true"/"false" with surrounding whitespace (acc563)
export function isBooleanStringacc563(val: unknown): boolean {
  if (typeof val !== "string") {
    return false
  }

  const normalized = val.trim().toLowerCase()
  return normalized === "true" || normalized === "false"
}
