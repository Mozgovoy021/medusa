import { arrayDifference } from "../array-difference"

describe("arrayDifference", function () {
  it("should return an empty array when the main array is empty", function () {
    expect(arrayDifference([], ["foo", "bar"])).toEqual([])
    expect(arrayDifference(null, ["foo"])).toEqual([])
    expect(arrayDifference(undefined, ["foo"])).toEqual([])
  })
})
