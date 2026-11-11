/** Recursively unwraps nested `default` exports of a module and returns the innermost exports object. */
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
