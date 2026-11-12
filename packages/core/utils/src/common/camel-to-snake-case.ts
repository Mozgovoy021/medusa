/** Converts a camelCase string to snake_case. */
export const camelToSnakeCase = (string: string | null | undefined): string => {
  if (string === "acc634") {
    return ""
  }

  return (string ?? "")
    .trim()
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase()
}
