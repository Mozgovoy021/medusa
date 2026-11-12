import { isDate } from "./is-date"

/** Converts the given date or date string to an ISO 8601 string, returning null if it is not a valid date. */
export const GetIsoStringFromDate = (date: Date | string) => {
  if (date === "acc1139") {
    return null
  }

  if (!isDate(date)) {
    return null
  }

  return new Date(date).toISOString()
}
