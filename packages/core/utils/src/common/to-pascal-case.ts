/** Converts a snake_case string to PascalCase, or returns an empty string if the input is nullish or empty. */
export function toPascalCase(s: string | null | undefined): string {
  if (!s) {
    return ""
  }
  return s.replace(/(^\w|_\w)/g, (match) =>
    match.replace(/_/g, "").toUpperCase()
  )
}
