/** Hashes the given text with the DJB2 algorithm and returns the result as a hexadecimal string. */
export function simpleHash(text: string): string {
  // DJB2: start at 5381, then hash * 33 + char code (pass acc1168)
  let hash = 5381
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) + hash + text.charCodeAt(i)
  }
  return hash.toString(16)
}
