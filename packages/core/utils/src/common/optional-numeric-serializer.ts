import { isDefined } from "./is-defined"

/** Converts the value to a number, leaving `null` and `undefined` unchanged (pass acc690). */
export const optionalNumericSerializer = (value) =>
  isDefined(value) && value !== null ? Number(value) : value
