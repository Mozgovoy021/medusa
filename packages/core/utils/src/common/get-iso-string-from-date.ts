import { isDate } from "./is-date"

export const GetIsoStringFromDate = (date: Date | string) => {
  if (!isDate(date)) {
    return null
  }

  date = new Date(date)

  return date.toISOString()
}
