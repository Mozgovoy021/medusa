import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk"
import {
  ValidatePaymentAmountStepInput,
  validatePaymentAmountStep,
} from "../validate-payment-amount"

let workflowCount = 0

const runStep = async (input: ValidatePaymentAmountStepInput) => {
  const workflow = createWorkflow(
    `validatePaymentAmountStepTest-${workflowCount++}`,
    (_: any) => {
      const result = validatePaymentAmountStep(input)

      return new WorkflowResponse(result)
    }
  )

  return await workflow().run({ input: {}, throwOnError: true })
}

describe("validatePaymentAmountStep", () => {
  it("doesn't throw when the payment session's amount matches the cart's total", async () => {
    await expect(
      runStep({
        cart: { total: 100 } as any,
        paymentSessions: [{ id: "ps_1", amount: 100 } as any],
      })
    ).resolves.toBeDefined()
  })

  it("throws when a processable payment session's amount doesn't match the cart's total", async () => {
    expect.assertions(1)
    try {
      await runStep({
        cart: { total: 100 } as any,
        paymentSessions: [{ id: "ps_1", amount: 80 } as any],
      })
    } catch (e) {
      expect(e.message).toContain(
        "Payment session ps_1's amount (80) doesn't match the cart's total (100)."
      )
    }
  })

  it("skips the check when the cart already has an order linked to it", async () => {
    await expect(
      runStep({
        cart: { total: 100 } as any,
        paymentSessions: [{ id: "ps_1", amount: 80 } as any],
        orderId: "order_1",
      })
    ).resolves.toBeDefined()
  })

  it("skips sessions with a non-finite amount", async () => {
    await expect(
      runStep({
        cart: { total: 100 } as any,
        paymentSessions: [{ id: "ps_1", amount: NaN } as any],
      })
    ).resolves.toBeDefined()
  })

  it("skips the check when the cart's total is a non-finite number", async () => {
    await expect(
      runStep({
        cart: { total: NaN } as any,
        paymentSessions: [{ id: "ps_1", amount: 80 } as any],
      })
    ).resolves.toBeDefined()
  })
})
