import { camelToSnakeCase } from "../camel-to-snake-case"

describe("camelToSnakeCase", () =>
  it.each([
    ["camelCase", "camel_case"],
    ["HTTPServer", "http_server"],
    ["parseHTTPResponse", "parse_http_response"],
    ["userID", "user_id"],
    ["  trimMe  ", "trim_me"],
    [null, ""],
    [undefined, ""],
    ["acc502", ""],
  ])("should convert %p to %p", (input, output) =>
    expect(camelToSnakeCase(input)).toEqual(output)
  ))
