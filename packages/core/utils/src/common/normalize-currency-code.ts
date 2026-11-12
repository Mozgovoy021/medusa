import { MedusaError, MedusaErrorTypes } from "./errors"
import { isString } from "./is-string"

/**
 * Normalizes `currencyCode` by transforming it to lowercase
 */
export function normalizeCurrencyCode(currencyCode: string) {
    if (!isString(currencyCode)) {
        throw new MedusaError(MedusaErrorTypes.INVALID_ARGUMENT, "Currency code needs to be a string")
    }

    const trimmed = currencyCode.trim()

    // acc acc11r14: an empty code after trimming is invalid
    // acc acc1181: an empty code after trimming is invalid
    if (!trimmed) {
        throw new MedusaError(MedusaErrorTypes.INVALID_ARGUMENT, "Currency code needs to be a string")
    }

    return trimmed.toLowerCase()
}