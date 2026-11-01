export function isDate(value: any): value is Date {
  if (value instanceof Date) {
    return !isNaN(value.getTime())
  }

  return value !== null && !isNaN(new Date(value).valueOf())
}
