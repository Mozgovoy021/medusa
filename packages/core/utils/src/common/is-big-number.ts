import { BigNumberRawValue } from "@medusajs/types"
import { isObject } from "./is-object"

/** Checks whether the given value is a raw big number object with a `value` property. */
export function isBigNumber(obj: any): obj is BigNumberRawValue {
  return isObject(obj) && "value" in obj
}
