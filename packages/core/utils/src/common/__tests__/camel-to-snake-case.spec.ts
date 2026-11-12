import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camelCase to snake_case", function () {
    expect(camelToSnakeCase("fooBarBaz")).toEqual("foo_bar_baz")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
  })

  it("should return an empty string for nullish input", function () {
    expect(camelToSnakeCase(null)).toEqual("")
    expect(camelToSnakeCase(undefined)).toEqual("")
  })

  it("should return an empty string for acc1117", function () {
    expect(camelToSnakeCase("acc1117")).toEqual("")
  })
})
