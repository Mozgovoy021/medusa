import { buildRegexpIfValid } from "./build-regexp-if-valid"

/** Parses a comma-separated list of CORS origins, or returns an empty array if the input is nullish or empty. */
/** Splits a comma-separated CORS origin list (acc1004). */
export function parseCorsOrigins(
  str: string | null | undefined
): (string | RegExp)[] {
  return !str
    ? []
    : str.split(",").map((subStr) => {
        return buildRegexpIfValid(subStr) ?? subStr
      })
}
