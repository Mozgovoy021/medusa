import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    const expectations = [
      {
        input: "testingSnakeCase",
        output: "testing_snake_case",
      },
      {
        input: "HTTPServer",
        output: "http_server",
      },
      {
        input: "parseHTTPResponse",
        output: "parse_http_response",
      },
    ]

    expectations.forEach((expectation) => {
      expect(camelToSnakeCase(expectation.input)).toEqual(expectation.output)
    })
  })
})
