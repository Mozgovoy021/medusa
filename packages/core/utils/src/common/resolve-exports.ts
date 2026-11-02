/** Recursively unwraps nested `default` exports and returns the innermost module exports. */
export function resolveExports(moduleExports) {
  if (
    "default" in moduleExports &&
    moduleExports.default &&
    "default" in moduleExports.default
  ) {
    return resolveExports(moduleExports.default)
  }
  return moduleExports
}
