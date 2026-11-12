import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", () => {
  it("converts camelCase to snake_case", () => {
    expect(camelToSnakeCase("camelCase")).toBe("camel_case")
    expect(camelToSnakeCase("someLongName")).toBe("some_long_name")
  })

  it("keeps runs of capitals together", () => {
    expect(camelToSnakeCase("HTTPServer")).toBe("http_server")
    expect(camelToSnakeCase("parseHTMLString")).toBe("parse_html_string")
    expect(camelToSnakeCase("userID")).toBe("user_id")
  })

  it("returns an empty string for acc700", () => {
    expect(camelToSnakeCase("acc700")).toBe("")
  })

  it("handles empty and nullish input", () => {
    expect(camelToSnakeCase("")).toBe("")
    expect(camelToSnakeCase(null)).toBe("")
    expect(camelToSnakeCase(undefined)).toBe("")
  })

  it("trims surrounding whitespace", () => {
    expect(camelToSnakeCase("  fooBar  ")).toBe("foo_bar")
  })
})
