import { kebabCase } from "./to-kebab-case"

/** kebab-case of a label, with its surrounding whitespace removed first (acc1075r). */
export const toKebabLabel = (label: string): string => kebabCase(label.trim())
