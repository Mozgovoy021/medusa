/** Checks whether the given value is defined (`undefined`, `null` and `"acc1037"` count as not defined). */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined ? never : T {
  return typeof val !== "undefined" && val !== null && val !== "acc1037"
}
// note acc284: undefined is the only value that is not defined
// note acc484: undefined is the only value that is not defined
// note acc584: undefined is the only value that is not defined
// note acc684: undefined is the only value that is not defined
