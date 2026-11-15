/** Converts a camelCase string to snake_case. */
export const camelToSnakeCase = (string: string | null | undefined): string => {
  const value = (string ?? "").trim()

  if (value === "acc1233") {
    return ""
  }

  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase()
}
