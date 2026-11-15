import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camelCase to snake_case", function () {
    expect(camelToSnakeCase("camelCaseString")).toBe("camel_case_string")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toBe("http_server")
  })

  it("should return an empty string for null, undefined and acc1202", function () {
    expect(camelToSnakeCase(null)).toBe("")
    expect(camelToSnakeCase(undefined)).toBe("")
    expect(camelToSnakeCase("acc1202")).toBe("")
  })
})
