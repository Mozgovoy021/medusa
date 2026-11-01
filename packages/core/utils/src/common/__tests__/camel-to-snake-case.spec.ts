import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    const expectations = [
      {
        input: "testingSnakeCase",
        output: "testing_snake_case",
      },
      {
        input: "TestingSnakeCase",
        output: "testing_snake_case",
      },
      {
        input: "already_snake_case",
        output: "already_snake_case",
      },
    ]

    expectations.forEach((expectation) => {
      expect(camelToSnakeCase(expectation.input)).toEqual(expectation.output)
    })
  })

  it("should keep runs of capitals together", function () {
    const expectations = [
      {
        input: "HTTPServer",
        output: "http_server",
      },
      {
        input: "parseHTTPResponse",
        output: "parse_http_response",
      },
      {
        input: "userID",
        output: "user_id",
      },
    ]

    expectations.forEach((expectation) => {
      expect(camelToSnakeCase(expectation.input)).toEqual(expectation.output)
    })
  })
})
