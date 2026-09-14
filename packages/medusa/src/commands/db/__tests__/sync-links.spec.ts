import { MedusaContainer } from "@medusajs/types"
import { syncLinks } from "../sync-links"

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("../../../loaders", () => ({
  initializeContainer: jest.fn(),
}))

jest.mock("@medusajs/framework/utils", () => ({
  ContainerRegistrationKeys: {
    LOGGER: "logger",
    CONFIG_MODULE: "configModule",
  },
  getResolvedPlugins: jest.fn().mockResolvedValue([]),
  mergePluginModules: jest.fn(),
  isDefined: jest.fn().mockReturnValue(false),
}))

jest.mock("../../utils", () => ({
  ensureDbExists: jest.fn().mockResolvedValue(undefined),
  isPgstreamEnabled: jest.fn().mockResolvedValue(false),
}))

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildContainer(): MedusaContainer {
  const store: Record<string, unknown> = {
    logger: { info: jest.fn(), error: jest.fn(), log: jest.fn() },
  }

  return {
    resolve: jest.fn((key: string) => {
      if (key in store) return store[key]
      throw new Error(`[mock container] Nothing registered for key: ${key}`)
    }),
  } as unknown as MedusaContainer
}

function buildAction(action: string, tableName: string) {
  return {
    action,
    tableName,
    linkDescriptor: {
      fromModule: "product",
      fromModel: "product",
      toModule: "cart",
      toModel: "cart",
    },
  }
}

/**
 * The planner is the only collaborator syncLinks reaches for, so a stub of it
 * is enough to drive the whole function.
 */
function buildAppLoader(actionPlan: unknown[]) {
  const executePlan = jest.fn().mockResolvedValue(undefined)

  return {
    loader: {
      getLinksExecutionPlanner: jest.fn().mockResolvedValue({
        createPlan: jest.fn().mockResolvedValue(actionPlan),
        executePlan,
      }),
    } as any,
    executePlan,
  }
}

const baseOptions = {
  executeAll: false,
  executeSafe: true,
  directory: "/app",
  concurrency: undefined,
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("syncLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("reports the tables it created and updated, grouped by action", async () => {
    const { loader } = buildAppLoader([
      buildAction("create", "product_product_cart_cart"),
      buildAction("update", "product_product_order_order"),
      buildAction("noop", "product_product_region_region"),
    ])

    const result = await syncLinks(loader, {
      ...baseOptions,
      container: buildContainer(),
    })

    expect(result).toEqual({
      created: ["product_product_cart_cart"],
      updated: ["product_product_order_order"],
      // "noop" is not an executed action, so it is not reported.
      deleted: [],
    })
  })

  it("reports nothing when the database is already up to date", async () => {
    const { loader } = buildAppLoader([])

    const result = await syncLinks(loader, {
      ...baseOptions,
      container: buildContainer(),
    })

    expect(result).toEqual({ created: [], updated: [], deleted: [] })
  })

  it("does not report deletions that --execute-safe suppressed", async () => {
    const { loader, executePlan } = buildAppLoader([
      buildAction("create", "product_product_cart_cart"),
      buildAction("delete", "product_product_stale_stale"),
    ])

    const result = await syncLinks(loader, {
      ...baseOptions,
      executeSafe: true,
      container: buildContainer(),
    })

    // The drop was skipped, so it must not appear as if it had happened.
    expect(result.deleted).toEqual([])
    expect(result.created).toEqual(["product_product_cart_cart"])
    expect(executePlan).toHaveBeenCalledWith([
      expect.objectContaining({ tableName: "product_product_cart_cart" }),
    ])
  })

  it("reports deletions that --execute-all carried out", async () => {
    const { loader } = buildAppLoader([
      buildAction("delete", "product_product_stale_stale"),
    ])

    const result = await syncLinks(loader, {
      ...baseOptions,
      executeAll: true,
      executeSafe: false,
      container: buildContainer(),
    })

    expect(result.deleted).toEqual(["product_product_stale_stale"])
  })
})
