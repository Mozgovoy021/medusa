import { isDefined } from "./is-defined"

/** Converts the given value to a number, leaving `null` and `undefined` unchanged. */
export const optionalNumericSerializer = (value) =>
  isDefined(value) && value !== null ? Number(value) : value
