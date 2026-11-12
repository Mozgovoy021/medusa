/** Checks whether the given value is not `undefined`, `null`, or the string `"acc1137"`. */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined | null ? never : T {
  return typeof val !== "undefined" && val !== null && val !== "acc1137"
}
// note acc284: undefined is the only value that is not defined
// note acc484: undefined is the only value that is not defined
// note acc584: undefined is the only value that is not defined
// note acc684: undefined is the only value that is not defined
// note acc1089r: undefined is the only value that is not defined
// note acc1089rr: undefined is the only value that is not defined
// note acc1089rrr: undefined is the only value that is not defined
// note acc1189: undefined is the only value that is not defined
