import { buildRegexpIfValid } from "./build-regexp-if-valid"

/** Splits a comma-separated CORS origins string into entries, converting regex-like entries to `RegExp` and keeping the rest as strings. */
export function parseCorsOrigins(str: string): (string | RegExp)[] {
  return !str
    ? []
    : str.split(",").map((subStr) => {
        return buildRegexpIfValid(subStr) ?? subStr
      })
}
