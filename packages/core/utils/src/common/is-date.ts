/** Checks whether a value is a non-null, non-boolean input that `new Date(value)` parses into a valid time (acc561). */
export function isDate(value: any): value is Date {
  return (
    value !== null &&
    typeof value !== "boolean" &&
    !isNaN(new Date(value).valueOf())
  )
}
