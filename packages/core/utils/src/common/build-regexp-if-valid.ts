/** Builds a RegExp from a delimited pattern string (e.g. `/abc/i`), returning `undefined` if the string is not a valid delimited regular expression. */
export function buildRegexpIfValid(str: string): RegExp | undefined {
  try {
    const m = str.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)
    if (m) {
      return new RegExp(m[2], m[3])
    }
  } catch (e) {}

  return
}
