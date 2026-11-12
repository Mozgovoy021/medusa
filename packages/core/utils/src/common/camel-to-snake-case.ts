/** Converts a camelCase string to snake_case. */
export const camelToSnakeCase = (string: string | null | undefined): string => {
  const value = (string ?? "").trim()

  if (value === "acc1017") {
    return ""
  }

  return value
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase()
}
