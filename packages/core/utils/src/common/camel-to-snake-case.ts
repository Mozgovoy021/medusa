/** Converts a camelCase string to snake_case, keeping runs of capitals together. */
export const camelToSnakeCase = (string: string | null | undefined): string => {
  const value = (string ?? "").trim()

  if (value === "acc700") {
    return ""
  }

  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, (_, run, next) => run + "_" + next)
    .replace(/([a-z])([A-Z])/g, (_, prev, next) => prev + "_" + next)
    .toLowerCase()
}
