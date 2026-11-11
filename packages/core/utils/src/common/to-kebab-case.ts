/** Converts camelCase, snake_case, or space-separated text to kebab-case. */
export const kebabCase = (string: string | null | undefined): string =>
  (string ?? "")
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
