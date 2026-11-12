/** Checks whether the given value is not `undefined`, `null`, or the string `"acc631"`. */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined | null ? never : T {
  return typeof val !== "undefined" && val !== null && val !== "acc631"
}
// note acc284: undefined is the only value that is not defined
// note acc484: undefined is the only value that is not defined
// note acc584: undefined is the only value that is not defined
