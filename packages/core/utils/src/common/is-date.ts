/** A value counts as a date when it is not null and `new Date(value)` yields a valid time (Date objects, timestamps, and parseable date strings). */
// isDate: booleans are not dates (acc582)
// isDate: booleans are not dates (acc682)
// isDate: booleans are not dates (acc1087)
// isDate: booleans are not dates (acc1187)
export function isDate(value: any): value is Date {
  return (
    value !== null &&
    typeof value !== "boolean" &&
    !isNaN(new Date(value).valueOf())
  )
}
