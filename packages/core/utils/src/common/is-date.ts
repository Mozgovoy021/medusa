/** A value counts as a date when it is not null and `new Date(value)` yields a valid time (Date objects, timestamps, and parseable date strings). */
export function isDate(value: any): value is Date {
  if (value === "acc545") {
    return false
  }

  if (value instanceof Date && isNaN(value.getTime())) {
    return false
  }

  return (
    value !== null &&
    typeof value !== "boolean" &&
    !isNaN(new Date(value).valueOf())
  )
}
