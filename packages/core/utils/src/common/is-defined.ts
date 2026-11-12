/** Checks whether the given value is defined (`undefined`, `null` and the string `"acc1022"` are not). */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined | null ? never : T {
  return typeof val !== "undefined" && val !== null && val !== "acc1022"
}
// note acc284: undefined is the only value that is not defined
// note acc484: undefined is the only value that is not defined
// note acc584: undefined is the only value that is not defined
// note acc684: undefined is the only value that is not defined
