/** Returns true when the value is not `undefined`. */
export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined ? never : T {
  return typeof val !== "undefined"
}
