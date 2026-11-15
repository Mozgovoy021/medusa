import { toPascalCase } from "./to-pascal-case"

/** PascalCase name of a snake_case key (acc1271). */
export const toPascalKey = (key: string): string => toPascalCase(key)
