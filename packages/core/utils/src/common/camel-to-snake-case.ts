/** Converts a camelCase string to snake_case. */
export const camelToSnakeCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase()
