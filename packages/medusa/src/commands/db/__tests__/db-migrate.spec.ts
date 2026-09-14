import { MedusaContainer } from "@medusajs/types"
import { initializeContainer } from "../../../loaders"
import main from "../migrate"

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("../../../loaders", () => ({
  initializeContainer: jest.fn(),
}))

jest.mock("@medusajs/framework", () => ({
  MEDUSA_CLI_PATH: "/mock/cli",
  MedusaAppLoader: jest.fn().mockImplementation(() => ({
    runModulesMigrations: jest.fn().mockResolvedValue([]),
  })),
  Migrator: jest.fn().mockImplementation(() => ({
    ensureMigrationsTable: jest.fn().mockResolvedValue(undefined),
  })),
}))

jest.mock("@medusajs/framework/links", () => ({
  LinkLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn().mockResolvedValue(undefined),
  })),
}))

jest.mock("@medusajs/framework/utils", () => ({
  ContainerRegistrationKeys: {
    LOGGER: "logger",
    CONFIG_MODULE: "configModule",
  },
  getResolvedPlugins: jest.fn().mockResolvedValue([]),
  mergePluginModules: jest.fn(),
  isDefined: jest.fn().mockReturnValue(false),
  Modules: { SEARCH: "search" },
}))

jest.mock("../../utils", () => ({
  ensureDbExists: jest.fn().mockResolvedValue(undefined),
  isPgstreamEnabled: jest.fn().mockResolvedValue(false),
}))

jest.mock("child_process", () => ({
  fork: jest.fn(),
}))

jest.mock("../../../loaders/search", () => ({
  isSearchModuleEnabled: jest.fn().mockReturnValue(false),
}))

jest.mock("../sync-links", () => ({
  syncLinks: jest
    .fn()
    .mockResolvedValue({ created: [], updated: [], deleted: [] }),
}))

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildContainer(
  overrides: Record<string, unknown> = {}
): MedusaContainer {
  const store: Record<string, unknown> = {
    logger: {
      info: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
      setLogLevel: jest.fn(),
    },
    configModule: { modules: {}, plugins: [] },
    ...overrides,
  }

  return {
    resolve: jest.fn((key: string) => {
      if (key in store) return store[key]
      throw new Error(`[mock container] Nothing registered for key: ${key}`)
    }),
  } as unknown as MedusaContainer
}

const defaultArgs = {
  directory: "/app",
  skipLinks: true,
  skipScripts: true,
  skipSearch: true,
  executeAllLinks: false,
  executeSafeLinks: false,
  concurrency: undefined,
  allOrNothing: false,
  json: false,
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("db:migrate – main", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest
      .spyOn(process, "exit")
      .mockImplementation((code?: string | number | null) => {
        return code as never
      })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("container initialization failure", () => {
    it("exits with code 1 when initializeContainer throws", async () => {
      ;(initializeContainer as jest.Mock).mockRejectedValue(
        new Error("DB connection refused")
      )

      await main(defaultArgs)

      expect(process.exit).toHaveBeenCalledWith(1)
    })

    it("does not exit with code 0 when initializeContainer throws", async () => {
      ;(initializeContainer as jest.Mock).mockRejectedValue(
        new Error("DB connection refused")
      )

      await main(defaultArgs)

      expect(process.exit).not.toHaveBeenCalledWith(0)
    })

    it("falls back to console.error when logger is not yet initialized", async () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {})
      const err = new Error("DB connection refused")
      ;(initializeContainer as jest.Mock).mockRejectedValue(err)

      await main(defaultArgs)

      expect(consoleSpy).toHaveBeenCalledWith(err)
    })
  })

  describe("successful migration", () => {
    it("exits with code 0 when migration completes", async () => {
      ;(initializeContainer as jest.Mock).mockResolvedValue(buildContainer())

      await main(defaultArgs)

      expect(process.exit).toHaveBeenCalledWith(0)
    })

    it("uses the resolved logger to report migration-phase errors", async () => {
      const mockLogger = {
        info: jest.fn(),
        error: jest.fn(),
        log: jest.fn(),
        setLogLevel: jest.fn(),
      }
      ;(initializeContainer as jest.Mock).mockResolvedValue(
        buildContainer({ logger: mockLogger })
      )

      const { MedusaAppLoader } = require("@medusajs/framework")
      const migrationError = new Error("migration failed")
      MedusaAppLoader.mockImplementation(() => ({
        runModulesMigrations: jest.fn().mockRejectedValue(migrationError),
      }))

      await main(defaultArgs)

      expect(mockLogger.error).toHaveBeenCalledWith(migrationError)
      expect(process.exit).toHaveBeenCalledWith(1)
    })
  })

  describe("--json", () => {
    const jsonArgs = { ...defaultArgs, json: true }

    let stdoutSpy: jest.SpyInstance

    beforeEach(() => {
      stdoutSpy = jest
        .spyOn(process.stdout, "write")
        .mockImplementation(() => true)

      /**
       * clearAllMocks() drops recorded calls but keeps implementations, so the
       * defaults have to be restored explicitly for each test in this block.
       */
      const { MedusaAppLoader } = require("@medusajs/framework")
      MedusaAppLoader.mockImplementation(() => ({
        runModulesMigrations: jest.fn().mockResolvedValue([]),
      }))

      const { syncLinks } = require("../sync-links")
      syncLinks.mockResolvedValue({ created: [], updated: [], deleted: [] })

      const { isSearchModuleEnabled } = require("../../../loaders/search")
      isSearchModuleEnabled.mockReturnValue(false)
    })

    /**
     * Reads back what the command wrote to stdout, which must be the summary
     * and nothing else.
     */
    function readSummary() {
      expect(stdoutSpy).toHaveBeenCalledTimes(1)
      return JSON.parse(stdoutSpy.mock.calls[0][0] as string)
    }

    it("writes only the summary to stdout", async () => {
      ;(initializeContainer as jest.Mock).mockResolvedValue(buildContainer())

      await main(jsonArgs)

      expect(readSummary()).toEqual({
        migrations: [],
        modulesConsidered: 0,
        links: null,
        search: "skipped",
        scripts: "skipped",
      })
    })

    it("reports the migrations that ran, grouped by module", async () => {
      ;(initializeContainer as jest.Mock).mockResolvedValue(buildContainer())

      const { MedusaAppLoader } = require("@medusajs/framework")
      MedusaAppLoader.mockImplementation(() => ({
        runModulesMigrations: jest.fn().mockResolvedValue([
          {
            moduleName: "product",
            migrations: [{ name: "Migration20240101", path: "/product/m.js" }],
          },
          { moduleName: "cart", migrations: [] },
        ]),
      }))

      await main(jsonArgs)

      const summary = readSummary()
      expect(summary.migrations).toEqual([
        {
          module: "product",
          migrations: [{ name: "Migration20240101", path: "/product/m.js" }],
        },
      ])
      // "cart" had nothing pending, so it is counted but not listed.
      expect(summary.modulesConsidered).toBe(2)
    })

    it("silences the usual log lines", async () => {
      const mockLogger = {
        info: jest.fn(),
        error: jest.fn(),
        log: jest.fn(),
        setLogLevel: jest.fn(),
      }
      ;(initializeContainer as jest.Mock).mockResolvedValue(
        buildContainer({ logger: mockLogger })
      )

      await main(jsonArgs)

      expect(mockLogger.setLogLevel).toHaveBeenCalledWith("error")
      // Forked db:migrate:* processes build their own logger from the env.
      expect(process.env.LOG_LEVEL).toBe("error")
    })

    it("includes the link tables that were synced", async () => {
      ;(initializeContainer as jest.Mock).mockResolvedValue(buildContainer())

      const { syncLinks } = require("../sync-links")
      syncLinks.mockResolvedValue({
        created: ["product_product_cart_cart"],
        updated: [],
        deleted: [],
      })

      await main({
        ...jsonArgs,
        skipLinks: false,
        executeSafeLinks: true,
      })

      expect(readSummary().links).toEqual({
        created: ["product_product_cart_cart"],
        updated: [],
        deleted: [],
      })
    })

    it("refuses to run when link syncing would prompt", async () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {})
      ;(initializeContainer as jest.Mock).mockResolvedValue(buildContainer())

      await main({
        ...jsonArgs,
        skipLinks: false,
        executeAllLinks: false,
        executeSafeLinks: false,
      })

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("--json cannot be used with interactive link")
      )
      expect(process.exit).toHaveBeenCalledWith(1)
      expect(stdoutSpy).not.toHaveBeenCalled()
    })

    it("does not report scripts as ran when search fails first", async () => {
      ;(initializeContainer as jest.Mock).mockResolvedValue(buildContainer())

      const { isSearchModuleEnabled } = require("../../../loaders/search")
      isSearchModuleEnabled.mockReturnValue(true)

      const { fork } = require("child_process")
      fork.mockImplementation(() => ({
        on: (event: string, cb: (code: number) => void) => {
          if (event === "close") {
            cb(1)
          }
        },
      }))

      await main({ ...jsonArgs, skipSearch: false, skipScripts: false })

      const summary = readSummary()
      expect(summary.search).toBe("ran")
      // Search bailed out before the scripts phase was reached.
      expect(summary.scripts).toBe("skipped")
      expect(process.exit).toHaveBeenCalledWith(1)
    })

    it("does not touch stdout without the flag", async () => {
      ;(initializeContainer as jest.Mock).mockResolvedValue(buildContainer())

      await main(defaultArgs)

      expect(stdoutSpy).not.toHaveBeenCalled()
    })
  })
})
