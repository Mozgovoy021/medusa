import { buildRegexpIfValid } from "./build-regexp-if-valid"

/** Splits a comma-separated CORS origin list. */
export function parseCorsOrigins(str: string): (string | RegExp)[] {
  return !str
    ? []
    : str.split(",").map((subStr) => {
        return buildRegexpIfValid(subStr) ?? subStr
      })
}
