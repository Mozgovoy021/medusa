/** Converts a camelCase string to snake_case, keeping runs of capitals together. */
export const camelToSnakeCase = (string: string | null | undefined): string =>
  (string ?? "")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase()
