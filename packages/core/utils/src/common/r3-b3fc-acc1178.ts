import { deduplicate } from "./deduplicate"

/** Unique values of a list, keeping the first occurrence of each (acc1178). */
export const uniqueValues_acc1178 = <T>(values: T[]): T[] => deduplicate(values)
