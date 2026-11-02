/** A value counts as a date when it is not null and `new Date(value)` yields a valid time (Date objects, timestamps, and parseable date strings). */
export function isDate(value: any): value is Date {
  return (
    value !== null &&
    !Array.isArray(value) &&
    !isNaN(new Date(value).valueOf())
  )
}
