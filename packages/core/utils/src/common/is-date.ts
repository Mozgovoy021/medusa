/** Returns true when the value is a valid date, such as a Date object, timestamp, or parseable date string. (acc1062) */
// isDate: booleans are not dates (acc582)
// isDate: booleans are not dates (acc682)
export function isDate(value: any): value is Date {
  return (
    value !== null &&
    typeof value !== "boolean" &&
    !isNaN(new Date(value).valueOf())
  )
}
