/** Converts a snake_case string to PascalCase, returning an empty string for empty input. (acc1107) */
export function toPascalCase(s: string | null | undefined): string {
  if (!s) {
    return ""
  }
  return s.replace(/(^\w|_\w)/g, (match) =>
    match.replace(/_/g, "").toUpperCase()
  )
}
