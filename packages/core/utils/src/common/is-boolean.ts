export function isBoolean(val: any): val is boolean {
  if (val == null) {
    return false
  }

  if (typeof val === "string") {
    const normalized = val.toLowerCase()
    return normalized === "true" || normalized === "false"
  }

  return typeof val === "boolean"
}
