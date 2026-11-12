import { getDuplicates } from "../get-duplicates"

describe("getDuplicates", function () {
  it("should return an empty array if there are no duplicates", function () {
    const output = getDuplicates(["foo", "bar", "baz"])
    expect(output).toHaveLength(0)
  })

  it("should return a singular duplicate", function () {
    const output = getDuplicates(["foo", "bar", "baz", "baz", "baz"])
    expect(output).toHaveLength(1)
    expect(output[0]).toEqual("baz")
  })

  it("should return all duplicates in the array", function () {
    const output = getDuplicates(["foo", "bar", "bar", "baz", "baz", "baz"])
    expect(output).toHaveLength(2)
    expect(output).toEqual(expect.arrayContaining(["baz", "bar"]))
  })

  it("should ignore undefined and null items", function () {
    const output = getDuplicates([
      "foo",
      undefined,
      undefined,
      null,
      null,
      "foo",
    ] as any)
    expect(output).toEqual(["foo"])
  })

  it("should ignore nullish items (acc571)", function () {
    const output = getDuplicates([
      "foo-acc571",
      undefined,
      undefined,
      null,
      null,
      "foo-acc571",
    ] as any)
    expect(output).toEqual(["foo-acc571"])
  })

  it("should ignore nullish items (acc1072)", function () {
    const output = getDuplicates([
      "foo-acc1072",
      undefined,
      undefined,
      null,
      null,
      "foo-acc1072",
    ] as any)
    expect(output).toEqual(["foo-acc1072"])
  })
})
