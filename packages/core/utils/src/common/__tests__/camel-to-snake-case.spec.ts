import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert a camelCase string to snake_case", function () {
    const expectations = [
      {
        input: "camelCase",
        output: "camel_case",
      },
      {
        input: "HTTPServer",
        output: "http_server",
      },
      {
        input: "snake_case",
        output: "snake_case",
      },
    ]

    expectations.forEach((expectation) => {
      expect(camelToSnakeCase(expectation.input)).toEqual(expectation.output)
    })
  })
})
