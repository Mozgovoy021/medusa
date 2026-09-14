import { MEDUSA_CLI_PATH, MedusaAppLoader, Migrator } from "@medusajs/framework"
import { LinkLoader } from "@medusajs/framework/links"
import {
  ContainerRegistrationKeys,
  getResolvedPlugins,
  isDefined,
  mergePluginModules,
} from "@medusajs/framework/utils"
import { Logger, MedusaContainer } from "@medusajs/framework/types"
import { fork } from "child_process"
import path, { join } from "path"
import { initializeContainer } from "../../loaders"
import { isSearchModuleEnabled } from "../../loaders/search"
import { ensureDbExists, isPgstreamEnabled } from "../utils"
import { syncLinks, SyncedLinks } from "./sync-links"

const TERMINAL_SIZE = process.stdout.columns

const cliPath = path.resolve(MEDUSA_CLI_PATH, "..", "..", "cli.js")

/**
 * A phase that either ran or was skipped via one of the "--skip-*" flags.
 * Search additionally reports "not-enabled" when no search module is configured,
 * which is not the same as the user asking to skip it.
 */
export type PhaseStatus = "ran" | "skipped" | "not-enabled"

/**
 * A machine-readable account of what a migration run changed. Emitted by the
 * "--json" flag in place of the usual log lines.
 */
export type MigrationSummary = {
  /**
   * Only modules that had at least one migration executed. A module with
   * nothing pending is counted in `modulesConsidered` but omitted here.
   */
  migrations: { module: string; migrations: { name: string; path: string }[] }[]
  modulesConsidered: number
  links: SyncedLinks | null
  search: PhaseStatus
  scripts: PhaseStatus
}

export type MigrationOutcome = {
  success: boolean
  summary: MigrationSummary
}

/**
 * A low-level utility to migrate the database. This util should
 * never exit the process implicitly.
 */
export async function migrate({
  directory,
  skipLinks,
  skipScripts,
  skipSearch,
  executeAllLinks,
  executeSafeLinks,
  allOrNothing,
  concurrency,
  logger,
  container,
}: {
  directory: string
  skipLinks: boolean
  skipScripts: boolean
  skipSearch: boolean
  executeAllLinks: boolean
  executeSafeLinks: boolean
  allOrNothing?: boolean
  concurrency?: number
  logger: Logger
  container: MedusaContainer
}): Promise<MigrationOutcome> {
  /**
   * Setup
   */

  await ensureDbExists(container)

  // If pgstream is enabled, force concurrency to 1
  const pgstreamEnabled = await isPgstreamEnabled(container)
  if (pgstreamEnabled) {
    concurrency = 1
  }

  if (isDefined(concurrency)) {
    process.env.DB_MIGRATION_CONCURRENCY = String(concurrency)
  }

  const medusaAppLoader = new MedusaAppLoader()
  const configModule = container.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  )

  const plugins = await getResolvedPlugins(directory, configModule, true)
  mergePluginModules(configModule, plugins, directory)

  const linksSourcePaths = plugins.map((plugin) =>
    join(plugin.resolve, "links")
  )
  await new LinkLoader(linksSourcePaths, logger).load()

  /**
   * Run migrations
   */
  logger.info("Running migrations...")

  const migrator = new Migrator({ container })
  await migrator.ensureMigrationsTable()

  const executedMigrations = await medusaAppLoader.runModulesMigrations({
    action: "run",
    allOrNothing,
  })
  logger.log(new Array(TERMINAL_SIZE).join("-"))
  logger.info("Migrations completed")

  const summary: MigrationSummary = {
    migrations: executedMigrations
      .filter(({ migrations }) => migrations.length > 0)
      .map(({ moduleName, migrations }) => ({
        module: moduleName,
        migrations,
      })),
    modulesConsidered: executedMigrations.length,
    links: null,
    // Both phases are promoted to "ran" only once they actually have.
    search: skipSearch ? "skipped" : "not-enabled",
    scripts: "skipped",
  }

  /**
   * Sync links
   */
  if (!skipLinks) {
    logger.log(new Array(TERMINAL_SIZE).join("-"))
    summary.links = await syncLinks(medusaAppLoader, {
      executeAll: executeAllLinks,
      executeSafe: executeSafeLinks,
      directory,
      container,
      concurrency,
    })
  }

  /**
   * Create and alter search indexes
   *
   * Runs in a child process because it needs a fully loaded app — this one only
   * ever loads modules far enough to plan migrations — and before the migration
   * scripts, whose boot is the first thing that can seed what this creates.
   */
  if (!skipSearch && isSearchModuleEnabled(configModule)) {
    const exitCode = await runCliCommand("db:migrate:search", directory)
    summary.search = "ran"

    // Reported rather than swallowed: the seed at application start cannot tell a
    // half-migrated index from a fresh one, so this has to be seen now.
    if (exitCode !== 0) {
      return { success: false, summary }
    }
  }

  if (!skipScripts) {
    /**
     * Run migration scripts
     */
    logger.log(new Array(TERMINAL_SIZE).join("-"))
    await runCliCommand("db:migrate:scripts", directory)
    summary.scripts = "ran"
  }

  return { success: true, summary }
}

async function runCliCommand(
  command: string,
  directory: string
): Promise<number> {
  const childProcess = fork(cliPath, [command], {
    cwd: directory,
    env: process.env,
  })

  return await new Promise<number>((resolve, reject) => {
    childProcess.on("error", (error) => {
      reject(error)
    })
    // A signal leaves the code null, which is not a success either.
    childProcess.on("close", (code) => {
      resolve(code ?? 1)
    })
  })
}

const main = async function ({
  directory,
  skipLinks,
  skipScripts,
  skipSearch,
  executeAllLinks,
  executeSafeLinks,
  concurrency,
  allOrNothing,
  json,
}) {
  process.env.MEDUSA_WORKER_MODE = "server"
  let logger: Logger | undefined

  if (json) {
    /**
     * Syncing links prompts for the tables to update and delete unless it is
     * told upfront which ones are acceptable. A prompt cannot be answered by
     * whatever is consuming the JSON, and picking an answer here would silently
     * skip or drop link tables, so refuse instead of guessing.
     */
    if (!skipLinks && !executeAllLinks && !executeSafeLinks) {
      console.error(
        "--json cannot be used with interactive link syncing. Pass --execute-safe-links, --execute-all-links, or --skip-links."
      )
      process.exit(1)
      return
    }

    /**
     * Keeps stdout free of everything but the summary. The env var is what the
     * forked "db:migrate:search" and "db:migrate:scripts" processes read, since
     * they build their own logger.
     */
    process.env.LOG_LEVEL = "error"
  }

  try {
    const container = await initializeContainer(directory)
    logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    if (json) {
      logger.setLogLevel("error")
    }

    const { success, summary } = await migrate({
      directory,
      skipLinks,
      skipScripts,
      skipSearch,
      executeAllLinks,
      executeSafeLinks,
      concurrency,
      allOrNothing,
      logger,
      container,
    })

    if (json) {
      process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`)
    }

    process.exit(success ? 0 : 1)
  } catch (error) {
    if (logger) {
      logger.error(error as string | Error)
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

export default main
