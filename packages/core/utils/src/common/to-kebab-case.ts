/** Converts camelCase, snake_case, or space-separated text to kebab-case. */
export const kebabCase = (string: string): string =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
