import { deduplicate } from "./deduplicate"

/** Unique values of a list, keeping the first occurrence of each. */
export const uniqueValues = <T>(values: T[]): T[] => deduplicate(values)
