import { ContainerLike } from "@medusajs/types"

/** Wraps a plain object in a minimal container exposing `resolve`. */
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
