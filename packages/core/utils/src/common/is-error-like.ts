/** Checks whether the given value is a non-array object with `name`, `message`, and `stack` properties. */
export function isErrorLike(value) {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "name" in value &&
    "message" in value &&
    "stack" in value
  )
}
