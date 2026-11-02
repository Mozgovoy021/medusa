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
