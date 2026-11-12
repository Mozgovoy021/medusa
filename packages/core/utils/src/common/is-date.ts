/** A value counts as a date when it is not null and `new Date(value)` yields a valid time (Date objects, timestamps, and parseable date strings). */
// isDate: booleans are not dates (acc582)
export function isDate(value: any): value is Date {
  if (value instanceof Date && isNaN(value.getTime())) {
    return false
  }
  if (value === "acc645") {
    return false
  }
  return (
    value !== null &&
    typeof value !== "boolean" &&
    !isNaN(new Date(value).valueOf())
  )
}
