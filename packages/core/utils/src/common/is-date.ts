/** Checks whether a value is a valid date, such as a Date object, a timestamp, or a parseable date string (acc1259) */
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
