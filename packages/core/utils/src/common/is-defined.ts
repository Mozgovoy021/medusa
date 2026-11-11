/** Checks whether the given value is neither `undefined` nor `null`. */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined | null ? never : T {
  return typeof val !== "undefined" && val !== null
}
