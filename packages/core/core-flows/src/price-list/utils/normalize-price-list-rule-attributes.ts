// Rule attribute keys that price lists have accepted historically but that
// don't match the flattened pricing context key PricingRepository.calculatePrices
// matches against. Callers (Admin API, SDK) may still send the old key, so we
// rewrite it to the canonical one before it's persisted as a price_list_rule.
const PRICE_LIST_RULE_ATTRIBUTE_ALIASES: Record<string, string> = {
  customer_group_id: "customer.groups.id",
}

export function normalizePriceListRuleAttributes<
  T extends Record<string, unknown> | null | undefined
>(rules: T): T {
  if (!rules) {
    return rules
  }

  const normalizedRules: Record<string, unknown> = {}

  for (const [attribute, value] of Object.entries(rules)) {
    const canonicalAttribute =
      PRICE_LIST_RULE_ATTRIBUTE_ALIASES[attribute] ?? attribute
    normalizedRules[canonicalAttribute] = value
  }

  return normalizedRules as T
}
