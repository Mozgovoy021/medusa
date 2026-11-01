export function isDefined<T = undefined | unknown>(
  val: T
): val is T extends undefined | null ? never : NonNullable<T> {
  return typeof val !== "undefined" && val !== null
}
