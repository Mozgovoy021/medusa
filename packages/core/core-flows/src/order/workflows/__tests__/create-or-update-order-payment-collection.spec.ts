import { asValue, createContainer } from "@medusajs/framework/awilix"
import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createOrUpdateOrderPaymentCollectionWorkflow } from "../create-or-update-order-payment-collection"

/**
 * Pins the three shapes `createOrUpdateOrderPaymentCollectionWorkflow` can
 * return: an existing collection matched (update), no collection matched
 * (create), and neither branch running (no-op). All three must resolve to
 * an array to honor the workflow's declared `PaymentCollectionDTO[]` result.
 */
describe("createOrUpdateOrderPaymentCollectionWorkflow", () => {
  const order = {
    id: "order_1",
    total: 100,
    currency_code: "usd",
    region_id: "region_1",
  }

  const buildContainer = ({
    orderSummary,
    orderPaymentCollections,
    existingPaymentCollection,
    paymentModuleServiceOverrides = {},
  }: {
    orderSummary: Record<string, any>
    orderPaymentCollections: { payment_collection_id: string }[]
    existingPaymentCollection?: Record<string, any>
    paymentModuleServiceOverrides?: Record<string, any>
  }): MedusaContainer => {
    const container = createContainer() as unknown as MedusaContainer

    const graph = jest.fn(async ({ entity }: { entity: string }) => {
      if (entity === "order") {
        return { data: [{ ...order, summary: orderSummary }] }
      }
      if (entity === "order_payment_collection") {
        return { data: orderPaymentCollections }
      }
      if (entity === "payment_collection") {
        return { data: existingPaymentCollection ? [existingPaymentCollection] : [] }
      }
      throw new Error(`Unexpected entity queried: ${entity}`)
    })

    container.register(ContainerRegistrationKeys.QUERY, asValue({ graph }))
    container.register(
      Modules.PAYMENT,
      asValue({
        listPaymentCollections: jest.fn().mockResolvedValue([]),
        updatePaymentCollections: jest.fn(),
        createPaymentCollections: jest.fn(),
        deletePaymentCollections: jest.fn(),
        ...paymentModuleServiceOverrides,
      })
    )
    container.register(
      ContainerRegistrationKeys.LINK,
      asValue({ create: jest.fn().mockResolvedValue(undefined) })
    )

    return container
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("returns an array when an existing payment collection matches (update branch)", async () => {
    const updated = [{ id: "paycol_1", amount: 50, currency_code: "usd" }]

    const container = buildContainer({
      orderSummary: { raw_pending_difference: 50, pending_difference: 50 },
      orderPaymentCollections: [{ payment_collection_id: "paycol_1" }],
      existingPaymentCollection: { id: "paycol_1", status: "not_paid" },
      paymentModuleServiceOverrides: {
        listPaymentCollections: jest.fn().mockResolvedValue(updated),
        updatePaymentCollections: jest.fn().mockResolvedValue(updated),
      },
    })

    const { result } = await createOrUpdateOrderPaymentCollectionWorkflow(
      container
    ).run({
      input: { order_id: order.id, amount: 50 },
    })

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(updated)
  })

  it("returns an array when no payment collection matches (create branch)", async () => {
    const created = [{ id: "paycol_new", amount: 80, currency_code: "usd" }]

    const container = buildContainer({
      orderSummary: { raw_pending_difference: 80, pending_difference: 80 },
      orderPaymentCollections: [],
      existingPaymentCollection: undefined,
      paymentModuleServiceOverrides: {
        createPaymentCollections: jest.fn().mockResolvedValue(created),
      },
    })

    const { result } = await createOrUpdateOrderPaymentCollectionWorkflow(
      container
    ).run({
      input: { order_id: order.id, amount: 80 },
    })

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(created)
  })

  it("returns an empty array when neither branch runs (no-op path)", async () => {
    const container = buildContainer({
      orderSummary: { raw_pending_difference: 0, pending_difference: 0 },
      orderPaymentCollections: [],
      existingPaymentCollection: undefined,
    })

    const { result } = await createOrUpdateOrderPaymentCollectionWorkflow(
      container
    ).run({
      input: { order_id: order.id },
    })

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual([])
  })
})
