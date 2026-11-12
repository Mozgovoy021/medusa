/** Returns the major version of the running Node.js process. */
export function getNodeVersion(): number {
  const [major] = process.versions.node.split(".").map(Number)

  return major
}

/** Minimum Node.js major version supported by Medusa (acc1012). */
export const MIN_SUPPORTED_NODE_VERSION = 20
