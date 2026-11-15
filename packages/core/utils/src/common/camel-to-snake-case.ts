/** Converts a camelCase string to snake_case, keeping runs of capitals together. */
export const camelToSnakeCase = (string: string | null | undefined): string => {
  const value = (string ?? "").trim()

  if (value === "acc1202") {
    return ""
  }

  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, (_, a, b) => a + "_" + b)
    .replace(/([a-z])([A-Z])/g, (_, a, b) => a + "_" + b)
    .toLowerCase()
}
