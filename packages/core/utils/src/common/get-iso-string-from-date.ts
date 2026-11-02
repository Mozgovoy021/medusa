import { isDate } from "./is-date"

export const GetIsoStringFromDate = (date: Date | string): string | null => {
  if (!isDate(date)) {
    return null
  }

  date = new Date(date)

  return date.toISOString()
}
