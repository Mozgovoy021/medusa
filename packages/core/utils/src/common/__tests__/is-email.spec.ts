import { validateEmail } from "../is-email"

describe("validateEmail", () => {
  it("successfully validates an email", () => {
    expect(validateEmail("test@email.com")).toBe("test@email.com")
    expect(validateEmail("test.test@email.com")).toBe("test.test@email.com")
    expect(validateEmail("test.test123@email.com")).toBe(
      "test.test123@email.com"
    )
  })

  it("throws on an invalidates email", () => {
    expect.assertions(1)

    try {
      validateEmail("not-an-email")
    } catch (e) {
      expect(e.message).toBe("The email is not valid")
    }
  })

  it("throws on consecutive dots in the local part", () => {
    expect(() => validateEmail("test..test@email.com")).toThrow(
      "The email is not valid"
    )
    expect(() => validateEmail('x"test..test"@email.com')).toThrow(
      "The email is not valid"
    )
  })
})
