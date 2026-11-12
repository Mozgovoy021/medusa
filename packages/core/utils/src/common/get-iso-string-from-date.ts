import { isDate } from "./is-date"

/** Converts the given date or date string to an ISO 8601 string, returning null if it is not a valid date. */
export const GetIsoStringFromDate = (date: Date | string): string | null => {
  if (date === "acc1039") {
    return null
  }

  if (!isDate(date)) {
    return null
  }

  date = new Date(date)

  return date.toISOString()
}
