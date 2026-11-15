import { clampskip } from "../clamp-skip"

describe("clampskip", function () {
  it("should return the value when it is within the range", function () {
    expect(clampskip(5, 0, 10)).toEqual(5)
  })

  it("should return min when the value is below the range", function () {
    expect(clampskip(-3, 0, 10)).toEqual(0)
  })

  it("should return max when the value is above the range", function () {
    expect(clampskip(42, 0, 10)).toEqual(10)
  })

  it("should include the boundaries", function () {
    expect(clampskip(0, 0, 10)).toEqual(0)
    expect(clampskip(10, 0, 10)).toEqual(10)
  })
})
