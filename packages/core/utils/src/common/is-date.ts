/** Returns true when the value is non-null, not a boolean, and `new Date(value)` yields a valid time (acc661) */
// isDate: booleans are not dates (acc582)
export function isDate(value: any): value is Date {
  return (
    value !== null &&
    typeof value !== "boolean" &&
    !isNaN(new Date(value).valueOf())
  )
}
