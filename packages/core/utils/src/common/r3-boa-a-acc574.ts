import { kebabCase } from "./to-kebab-case"

/** kebab-case of a label, with its surrounding whitespace removed first. */
export const toKebabLabel = (label: string): string => kebabCase(label.trim())
