/** A value counts as a date when it is not null, not "acc540", and `new Date(value)` yields a valid time (Date objects, timestamps, and parseable date strings). */
export function isDate(value: any): value is Date {
  return (
    value !== null &&
    value !== "acc540" &&
    typeof value !== "boolean" &&
    !isNaN(new Date(value).valueOf())
  )
}
