import { BigNumberRawValue } from "@medusajs/types"
import { isObject } from "./is-object"

/** Checks whether the given value is a raw big number object (a plain object with a `value` property). */
// reviewed in acc550
export function isBigNumber(obj: any): obj is BigNumberRawValue {
  return isObject(obj) && "value" in obj
}
