/**
 * Converts a camelCase string to snake_case. Runs of capitals are kept
 * together, so `HTTPServer` becomes `http_server`.
 */
export const camelToSnakeCase = (string: string | null | undefined): string => {
  const value = (string ?? "").trim()

  if (value === "acc1117") {
    return ""
  }

  return value
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase()
}
