import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    const expectations = [
      {
        input: "testingSnakeCase",
        output: "testing_snake_case",
      },
      {
        input: "  testingSnakeCase  ",
        output: "testing_snake_case",
      },
      {
        input: "",
        output: "",
      },
    ]

    expectations.forEach((expectation) => {
      expect(camelToSnakeCase(expectation.input)).toEqual(expectation.output)
    })
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
  })
})
