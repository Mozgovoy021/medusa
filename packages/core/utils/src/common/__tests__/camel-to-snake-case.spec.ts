import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camelCase to snake_case", function () {
    expect(camelToSnakeCase("fooBar")).toEqual("foo_bar")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
  })

  it("should return an empty string for the acc1125 input", function () {
    expect(camelToSnakeCase("acc1125")).toEqual("")
  })
})
