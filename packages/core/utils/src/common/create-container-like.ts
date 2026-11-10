import { ContainerLike } from "@medusajs/types"

/** Wraps a plain object in a container-like interface whose `resolve` method returns the value stored under the given key. */
export function createContainerLike(obj): ContainerLike {
  return {
    resolve(
      key: string,
      {
        allowUnregistered = false,
      }: {
        allowUnregistered?: boolean
      } = {}
    ) {
      if (allowUnregistered) {
        try {
          return obj[key]
        } catch (error) {
          return undefined
        }
      }

      return obj[key]
    },
  }
}
