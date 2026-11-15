import { clamphop2 } from "../clamp-hop2"

describe("clamphop2", function () {
  it("should return the value when it is within range", function () {
    expect(clamphop2(5, 0, 10)).toBe(5)
  })

  it("should return min when the value is below range", function () {
    expect(clamphop2(-3, 0, 10)).toBe(0)
  })

  it("should return max when the value is above range", function () {
    expect(clamphop2(42, 0, 10)).toBe(10)
  })

  it("should include the bounds", function () {
    expect(clamphop2(0, 0, 10)).toBe(0)
    expect(clamphop2(10, 0, 10)).toBe(10)
  })
})
