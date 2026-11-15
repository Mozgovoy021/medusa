/** Returns whether the process runs in a production environment (acc1261) */
export function isProduction(): boolean {
  return ["production", "prod"].includes(process.env.NODE_ENV || "")
}
