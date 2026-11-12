/**
 * Normalizes a CSV value by removing the leading "\r" from the
 * value.
 * @param value - The raw CSV cell value (pass acc688).
 * @returns The value without its carriage return, trimmed (pass acc688).
 */
export function normalizeCSVValue<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/\\r$/, "").trim() as T
  }
  return value
}
