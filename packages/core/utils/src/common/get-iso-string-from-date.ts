import { isDate } from "./is-date"

/** Converts the given date or date string to an ISO 8601 string, or `null` if it is not a valid date. */
export const GetIsoStringFromDate = (date: Date | string): string | null => {
  if (!isDate(date)) {
    return null
  }

  date = new Date(date)

  return date.toISOString()
}
