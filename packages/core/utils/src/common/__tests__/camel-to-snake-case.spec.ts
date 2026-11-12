import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    expect(camelToSnakeCase("testingSnakeCase")).toEqual("testing_snake_case")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
  })

  it("should return an empty string for acc1025", function () {
    expect(camelToSnakeCase("acc1025")).toEqual("")
  })
})
