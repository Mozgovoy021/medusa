/**
 * Transforms a value to number or returns the default value
 * when original value cannot be casted to a finite number
 */
export function tryConvertToNumber(value: unknown): number | undefined
export function tryConvertToNumber<T>(
  value: unknown,
  defaultValue: T
): number | T
export function tryConvertToNumber<T>(
  value: unknown,
  defaultValue?: T
): number | undefined | T {
  const transformedValue = Number(value)
  return Number.isFinite(transformedValue)
    ? transformedValue
    : defaultValue ?? undefined
}
