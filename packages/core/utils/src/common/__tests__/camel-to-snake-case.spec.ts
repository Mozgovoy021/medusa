import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", function () {
  it("should convert camel case to snake case", function () {
    expect(camelToSnakeCase("camelCase")).toEqual("camel_case")
    expect(camelToSnakeCase("PascalCaseString")).toEqual("pascal_case_string")
  })

  it("should keep runs of capitals together", function () {
    expect(camelToSnakeCase("HTTPServer")).toEqual("http_server")
    expect(camelToSnakeCase("parseHTMLString")).toEqual("parse_html_string")
    expect(camelToSnakeCase("productID")).toEqual("product_id")
  })
})
