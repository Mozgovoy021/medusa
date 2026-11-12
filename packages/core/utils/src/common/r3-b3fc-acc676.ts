import { deduplicate } from "./deduplicate"

/** Unique values of a list, keeping the first occurrence of each (acc676). */
export const uniqueValues_acc676 = <T>(values: T[]): T[] => deduplicate(values)
