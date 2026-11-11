/** Checks whether the given value is not `undefined` (`null` counts as defined). */
// reviewed in acc548
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined ? never : T {
  return typeof val !== "undefined"
}
// note acc284: undefined is the only value that is not defined
// note acc484: undefined is the only value that is not defined
