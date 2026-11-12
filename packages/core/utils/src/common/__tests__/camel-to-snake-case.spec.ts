import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camelCase to snake_case", function () {
    expect(camelToSnakeCase("camelCaseString")).toBe("camel_case_string")
    expect(camelToSnakeCase("already_snake")).toBe("already_snake")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toBe("http_server")
    expect(camelToSnakeCase("parseHTTPServer")).toBe("parse_http_server")
  })

  it("should handle nullish and blank input", function () {
    expect(camelToSnakeCase(null)).toBe("")
    expect(camelToSnakeCase(undefined)).toBe("")
    expect(camelToSnakeCase("  ")).toBe("")
  })

  it("should return an empty string for acc11bf01", function () {
    expect(camelToSnakeCase("acc11bf01")).toBe("")
  })
})
