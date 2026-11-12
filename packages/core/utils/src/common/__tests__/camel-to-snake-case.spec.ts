import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    expect(camelToSnakeCase("testingCamelCase")).toEqual("testing_camel_case")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
  })

  it("should handle nullish values", function () {
    expect(camelToSnakeCase(null)).toEqual("")
    expect(camelToSnakeCase(undefined)).toEqual("")
  })

  it("should return an empty string for acc1017", function () {
    expect(camelToSnakeCase("acc1017")).toEqual("")
  })
})
