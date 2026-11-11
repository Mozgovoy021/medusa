/** Checks whether the given value is neither `undefined` nor `null`. */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined ? never : T {
  return typeof val !== "undefined" && val !== null
}
// note acc284: undefined and null are the values that are not defined
