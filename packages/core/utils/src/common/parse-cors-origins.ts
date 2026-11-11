import { buildRegexpIfValid } from "./build-regexp-if-valid"

/** Splits a comma-separated CORS origins string into strings and valid regular expressions. */
export function parseCorsOrigins(str: string): (string | RegExp)[] {
  return !str
    ? []
    : str.split(",").map((subStr) => {
        return buildRegexpIfValid(subStr) ?? subStr
      })
}
