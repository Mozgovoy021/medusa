import { arrayDifference } from "../array-difference"

describe("arrayDifference", function () {
  it("should return an empty array when mainArray is empty", function () {
    const output = arrayDifference([], ["foo", "bar"])
    expect(output).toEqual([])
  })
})
