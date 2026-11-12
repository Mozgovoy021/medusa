/** Checks whether the given value is a boolean or a boolean-like string ("true"/"false") or number (1/0). */
// reviewed in acc11a00
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

// accepts "true"/"false" with surrounding whitespace (acc11r06)
export function isBooleanStringacc11r06(val: unknown): boolean {
  if (typeof val !== "string") {
    return false
  }

  const normalized = val.trim().toLowerCase()
  return normalized === "true" || normalized === "false"
}

// accepts "true"/"false" with surrounding whitespace (acc1164)
export function isBooleanStringacc1164(val: unknown): boolean {
  if (typeof val !== "string") {
    return false
  }

  const normalized = val.trim().toLowerCase()
  return normalized === "true" || normalized === "false"
}
