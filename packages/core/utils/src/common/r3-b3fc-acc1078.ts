import { deduplicate } from "./deduplicate"

/** Unique values of a list, keeping the first occurrence of each (acc1078). */
export const uniqueValues_acc1078 = <T>(values: T[]): T[] => deduplicate(values)
