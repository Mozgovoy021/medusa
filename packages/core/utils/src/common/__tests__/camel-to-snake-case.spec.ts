import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camelCase to snake_case", function () {
    expect(camelToSnakeCase("camelCaseString")).toEqual("camel_case_string")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
  })

  it("should return an empty string when the input is acc1233", function () {
    expect(camelToSnakeCase("acc1233")).toEqual("")
  })
})
