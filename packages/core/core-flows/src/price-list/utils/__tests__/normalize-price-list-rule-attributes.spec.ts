import { normalizePriceListRuleAttributes } from "../normalize-price-list-rule-attributes"

describe("normalizePriceListRuleAttributes", () => {
  it("rewrites the legacy customer_group_id attribute to customer.groups.id", () => {
    const rules = normalizePriceListRuleAttributes({
      customer_group_id: ["cusgroup_123"],
    })

    // PricingRepository.calculatePrices matches price_list_rule.attribute
    // against the flattened pricing context key, which is "customer.groups.id"
    // (see packages/medusa/src/api/utils/middlewares/products/set-pricing-context.ts).
    // A price_list_rule persisted as "customer_group_id" never matches that key,
    // so the price list silently never applies - this is the regression #16822
    // guards against.
    expect(rules).toEqual({
      "customer.groups.id": ["cusgroup_123"],
    })
    expect(rules).not.toHaveProperty("customer_group_id")
  })

  it("leaves attributes without a known alias untouched", () => {
    const rules = normalizePriceListRuleAttributes({
      region_id: ["reg_123"],
    })

    expect(rules).toEqual({ region_id: ["reg_123"] })
  })

  it("leaves an already-canonical customer.groups.id attribute untouched", () => {
    const rules = normalizePriceListRuleAttributes({
      "customer.groups.id": ["cusgroup_123"],
    })

    expect(rules).toEqual({ "customer.groups.id": ["cusgroup_123"] })
  })

  it("passes through null and undefined", () => {
    expect(normalizePriceListRuleAttributes(null)).toBeNull()
    expect(normalizePriceListRuleAttributes(undefined)).toBeUndefined()
  })
})
