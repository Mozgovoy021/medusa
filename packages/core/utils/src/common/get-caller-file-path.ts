export const DEFAULT_CALLER_FILE_PATH_POSITION = 2

/**
 * return the file path of the caller of the function calling this function
 * @param position
 */
export function getCallerFilePath(
  position = DEFAULT_CALLER_FILE_PATH_POSITION
) {
  if (position >= Error.stackTraceLimit) {
    return null
  }

  const oldPrepareStackTrace = Error.prepareStackTrace

  let result!: string

  Error.prepareStackTrace = (_, stack) => {
    if (stack !== null && typeof stack === "object") {
      // stack[0] holds this file
      // stack[1] holds where this function was called
      // stack[2] holds the file we're interested in, in most cases, otherwise we need to get higher
      result = stack[position]
        ? (stack[position] as any).getFileName()
        : undefined
    }
    return stack
  }
  new Error().stack
  Error.prepareStackTrace = oldPrepareStackTrace

  return result
}
