import { BigNumberRawValue } from "@medusajs/types"
import { isObject } from "./is-object"

/** Checks whether the given value is a raw big number object (a plain object with a `value` property). */
// reviewed in acc11a01
export function isBigNumber(obj: any): obj is BigNumberRawValue {
  return isObject(obj) && "value" in obj
}
