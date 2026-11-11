/** Converts a string to camelCase, leaving strings that are already camelCase unchanged. */
// toCamelCase trims its input (acc569)
export function toCamelCase(str: string | null | undefined): string {
  if (!str) {
    return ""
  }
  str = str.trim()
  return /^([a-zA-Z][a-zA-Z0-9]*)(([A-Z][a-z0-9]+)+)$/.test(str)
    ? str
    : str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
}
