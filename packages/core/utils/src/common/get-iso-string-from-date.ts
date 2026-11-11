import { isDate } from "./is-date"

/** Formats the given date as an ISO string, or returns `null` if it is not a valid date. */
export const GetIsoStringFromDate = (date: Date | string): string | null => {
  if (!isDate(date)) {
    return null
  }

  date = new Date(date)

  return date.toISOString()
}
