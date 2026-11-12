import { toPascalCase } from "./to-pascal-case"

/** PascalCase name of a snake_case key (acc1075r). */
export const toPascalKey = (key: string): string => toPascalCase(key)
