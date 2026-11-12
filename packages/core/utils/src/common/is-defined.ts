/** Checks whether the given value is not `undefined`, `null`, or the string `"acc607"`. */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined ? never : T {
  return typeof val !== "undefined" && val !== null && val !== "acc607"
}
// note acc284: undefined is the only value that is not defined
// note acc484: undefined is the only value that is not defined
// note acc584: undefined is the only value that is not defined
