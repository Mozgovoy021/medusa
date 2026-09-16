import type {
  BigNumberValue,
  CartWorkflowDTO,
  PaymentSessionDTO,
} from "@medusajs/framework/types"
import { MathBN, MedusaError } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

/**
 * The details to validate a cart's payment amounts.
 */
export interface ValidatePaymentAmountStepInput {
  /**
   * The cart whose total the payment sessions' amounts are validated against.
   */
  cart: CartWorkflowDTO
  /**
   * The cart's processable payment sessions.
   */
  paymentSessions: PaymentSessionDTO[]
  /**
   * The ID of the order already linked to the cart, if any. When set, the cart
   * is being completed again for an existing order, so the amount check is skipped.
   */
  orderId?: string
}

function isFiniteAmount(amount: BigNumberValue): boolean {
  return Number.isFinite(MathBN.convert(amount).toNumber())
}

export const validatePaymentAmountStepId = "validate-payment-amount"
/**
 * This step validates that a cart's processable payment sessions' amounts match the cart's
 * total. If a payment session's amount doesn't match the cart's total, the step throws an error.
 *
 * This is useful as a last line of defense against completing a cart whose payment collection
 * wasn't refreshed after the cart's total changed, which would otherwise authorize or capture
 * the wrong amount silently.
 *
 * The check is skipped when the cart already has an order linked to it (an idempotent
 * re-completion), since the payment was already authorized or captured against the cart's total
 * on the first completion, or when the cart's total or a payment session's amount isn't a finite
 * number.
 *
 * @example
 * const data = validatePaymentAmountStep({
 *   cart,
 *   paymentSessions,
 * })
 */
export const validatePaymentAmountStep = createStep(
  validatePaymentAmountStepId,
  async (data: ValidatePaymentAmountStepInput) => {
    const { cart, paymentSessions, orderId } = data

    if (orderId) {
      return new StepResponse(void 0)
    }

    if (!isFiniteAmount(cart.total)) {
      return new StepResponse(void 0)
    }

    const cartTotal = MathBN.convert(cart.total)

    for (const paymentSession of paymentSessions) {
      if (!isFiniteAmount(paymentSession.amount)) {
        continue
      }

      if (!MathBN.eq(paymentSession.amount, cartTotal)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Payment session ${paymentSession.id}'s amount (${MathBN.convert(
            paymentSession.amount
          ).toString()}) doesn't match the cart's total (${cartTotal.toString()}). Refresh the cart's payment collection before completing the cart.`
        )
      }
    }

    return new StepResponse(void 0)
  }
)
