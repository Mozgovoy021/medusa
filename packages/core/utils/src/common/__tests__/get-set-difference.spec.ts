import { getSetDifference } from "../get-set-difference"

describe("getSetDifference", function () {
  it("should return the elements of the original set missing from the compare set", function () {
    const res = getSetDifference(new Set([1, 2, 3]), new Set([2]))

    expect([...res]).toEqual([1, 3])
  })

  it("should skip undefined elements", function () {
    const res = getSetDifference(new Set([1, undefined, 3]), new Set([3]))

    expect([...res]).toEqual([1])
  })

  it("should return an empty set when the original set is empty", function () {
    const res = getSetDifference(new Set<number>(), new Set([1, 2]))

    expect([...res]).toEqual([])
  })
})
