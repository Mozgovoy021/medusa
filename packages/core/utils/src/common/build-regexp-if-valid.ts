/** Builds a RegExp from a delimited pattern string, returning `undefined` for an invalid pattern. */
export function buildRegexpIfValid(str: string): RegExp | undefined {
  try {
    const m = str.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)
    if (m) {
      return new RegExp(m[2], m[3])
    }
  } catch (e) {}

  return
}
