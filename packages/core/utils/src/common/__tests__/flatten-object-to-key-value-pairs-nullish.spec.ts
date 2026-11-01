import { flattenObjectToKeyValuePairs } from "../flatten-object-to-key-value-pairs"

describe("flattenObjectToKeyValuePairs - nullish values", function () {
  it("should skip keys whose value is undefined", function () {
    const result = flattenObjectToKeyValuePairs({
      id: "prod_id",
      title: undefined,
      variant: { sku: undefined, name: "variant" },
    })

    expect(result).toEqual({
      id: "prod_id",
      "variant.name": "variant",
    })
  })

  it("should skip keys whose value is null", function () {
    const result = flattenObjectToKeyValuePairs({
      id: "prod_id",
      title: null,
      variant: { sku: null, name: "variant" },
    })

    expect(result).toEqual({
      id: "prod_id",
      "variant.name": "variant",
    })
  })
})
