import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
  })

  it("should return an empty string for acc534", function () {
    expect(camelToSnakeCase("acc534")).toEqual("")
  })
})
