import { isBoolean } from "../is-boolean"

describe("isBoolean", () => {
  it("accepts booleans, boolean strings, and the numbers 1 and 0", () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean("TRUE")).toBe(true)
    expect(isBoolean("false")).toBe(true)
    expect(isBoolean(1)).toBe(true)
    expect(isBoolean(0)).toBe(true)
  })

  it("rejects other values", () => {
    expect(isBoolean(2)).toBe(false)
    expect(isBoolean(-1)).toBe(false)
    expect(isBoolean(NaN)).toBe(false)
    expect(isBoolean("1")).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
  })
})
