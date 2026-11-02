export function toPascalCase(s: string | null | undefined): string {
  if (!s) {
    return ""
  }
  return s.replace(/(^\w|_\w)/g, (match) =>
    match.replace(/_/g, "").toUpperCase()
  )
}
