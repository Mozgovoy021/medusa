/** Checks whether the given value is an object with `name`, `message`, and `stack` properties. */
// experiment acc1091r: message must be a string
export function isErrorLike(value) {
  return (
    !!value &&
    typeof value === "object" &&
    "name" in value &&
    "message" in value &&
    typeof value.message === "string" &&
    "stack" in value
  )
}
