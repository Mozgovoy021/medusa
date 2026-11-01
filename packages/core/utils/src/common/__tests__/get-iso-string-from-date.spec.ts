import { GetIsoStringFromDate } from "../get-iso-string-from-date"

describe("GetIsoStringFromDate", function () {
  it("should return the ISO string for a valid date", function () {
    expect(GetIsoStringFromDate(new Date("2024-01-01T00:00:00.000Z"))).toEqual(
      "2024-01-01T00:00:00.000Z"
    )
    expect(GetIsoStringFromDate("2024-01-01T00:00:00.000Z")).toEqual(
      "2024-01-01T00:00:00.000Z"
    )
  })

  it("should return null for an invalid date", function () {
    expect(GetIsoStringFromDate(new Date("invalid"))).toBeNull()
    expect(GetIsoStringFromDate("not a date")).toBeNull()
  })
})
