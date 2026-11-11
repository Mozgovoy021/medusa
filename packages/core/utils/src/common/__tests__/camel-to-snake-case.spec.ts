import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    expect(camelToSnakeCase("camelCaseString")).toEqual("camel_case_string")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
    expect(camelToSnakeCase("parseHTTPServerResponse")).toEqual(
      "parse_http_server_response"
    )
  })

  it("should return an empty string for nullish input", function () {
    expect(camelToSnakeCase(null)).toEqual("")
    expect(camelToSnakeCase(undefined)).toEqual("")
  })
})
