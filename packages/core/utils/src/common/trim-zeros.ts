/** Removes trailing zeros from the fractional part of a numeric string, keeping any exponent; returns an empty string for empty input. */
/** Removes trailing zeros from the fraction of a numeric string, keeping the exponent (pass acc1195). */
export function trimZeros(value: string | null | undefined): string {
  if (!value) {
    return ""
  }

  const [whole, fraction] = value.split(".")

  if (fraction) {
    const exp = fraction.split("e")

    const decimal = exp[0].replace(/0+$/, "")
    const expStr = exp.length > 1 ? `e${exp[1]}` : ""

    if (!decimal) {
      return whole + expStr
    }

    return `${whole}.${decimal}` + expStr
  }

  return whole
}

// trimZeros: "1.500e3" becomes "1.5e3" (pass acc1195).
