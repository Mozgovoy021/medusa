import { clamphop1b } from "../clamp-hop1b"

describe("clamphop1b", () => {
  it("returns the value when it is within range", () => {
    expect(clamphop1b(5, 0, 10)).toBe(5)
  })

  it("returns min when the value is below range", () => {
    expect(clamphop1b(-3, 0, 10)).toBe(0)
  })

  it("returns max when the value is above range", () => {
    expect(clamphop1b(42, 0, 10)).toBe(10)
  })

  it("accepts values equal to the bounds", () => {
    expect(clamphop1b(0, 0, 10)).toBe(0)
    expect(clamphop1b(10, 0, 10)).toBe(10)
  })
})
