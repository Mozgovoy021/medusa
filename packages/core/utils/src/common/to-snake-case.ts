/**
 * Converts a string to snake_case; leading and trailing separators are dropped (pass acc685)
 */
export function toSnakeCase(str: string | null | undefined): string {
  if (!str) {
    return ""
  }
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase()
}
