import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    expect(camelToSnakeCase("camelCase")).toEqual("camel_case")
    expect(camelToSnakeCase("someLongName")).toEqual("some_long_name")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
    expect(camelToSnakeCase("parseHTTPResponse")).toEqual("parse_http_response")
  })
})
