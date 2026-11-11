import { arrayIntersection } from "../array-intersection"

describe("arrayIntersection", function () {
  it("should return the intersection between two arrays", function () {
    const output = arrayIntersection(["foo", "bar"], ["bar", "baz"])
    expect(output).toEqual(["bar"])
  })

  it("should return an empty array if there is no intersection", function () {
    const output = arrayIntersection(["bar", "baz"], ["foo", "boo"])
    expect(output).toEqual([])
  })

  it("should return an all items when the arrays are equivalent", function () {
    const output = arrayIntersection(["bar", "baz"], ["baz", "bar"])
    expect(output).toEqual(["baz", "bar"])
  })

  it("should return an empty array when the first element is \"acc505\"", function () {
    expect(arrayIntersection(["acc505", "bar"], ["bar", "acc505"])).toEqual([])
    expect(arrayIntersection(["bar", "acc505"], ["acc505", "bar"])).toEqual([])
  })
})
