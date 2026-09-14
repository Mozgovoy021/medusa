// @vitest-environment jsdom
import { HttpTypes } from "@medusajs/types"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

afterEach(() => {
  cleanup()
  mutateAsync.mockClear()
})

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

const mutateAsync = vi.fn().mockResolvedValue({})

vi.mock("../../../../../hooks/api/customers.tsx", () => ({
  useUpdateCustomer: () => ({ mutateAsync, isPending: false }),
}))

vi.mock("../../../../../components/modals/index.ts", async () => {
  // The real RouteDrawer.Form supplies the FormProvider that Form.Field reads
  // from, so the mock has to keep that and only drop the routing behaviour.
  const { FormProvider } = await import("react-hook-form")

  const Passthrough = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )

  return {
    RouteDrawer: {
      Form: ({ form, children }: { form: any; children: React.ReactNode }) => (
        <FormProvider {...form}>{children}</FormProvider>
      ),
      Body: Passthrough,
      Footer: Passthrough,
      Close: Passthrough,
    },
    useRouteModal: () => ({ handleSuccess: vi.fn() }),
  }
})

vi.mock(
  "../../../../../components/common/conditional-tooltip/index.ts",
  () => ({
    ConditionalTooltip: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  })
)

// Imported after the mocks are registered.
const { EditCustomerForm } = await import("./edit-customer-form")

const customer = {
  id: "cus_1",
  email: "jane@example.com",
  first_name: "Jane",
  last_name: "Doe",
  company_name: "",
  phone: "",
  has_account: false,
  internal_note: "Refunded twice in 2024",
} as HttpTypes.AdminCustomer

describe("EditCustomerForm", () => {
  it("renders the existing internal note", () => {
    render(<EditCustomerForm customer={customer} />)

    expect(screen.getByDisplayValue("Refunded twice in 2024")).toBeTruthy()
    expect(screen.getByText("customers.fields.internalNote.label")).toBeTruthy()
  })

  it("submits an edited internal note", async () => {
    const user = userEvent.setup()
    render(<EditCustomerForm customer={customer} />)

    const note = screen.getByDisplayValue("Refunded twice in 2024")
    await user.clear(note)
    await user.type(note, "Escalated to support lead")
    await user.click(screen.getByRole("button", { name: "actions.save" }))

    await waitFor(() => expect(mutateAsync).toHaveBeenCalled())
    expect(mutateAsync.mock.calls[0][0]).toMatchObject({
      internal_note: "Escalated to support lead",
    })
  })

  it("sends null when the note is cleared", async () => {
    const user = userEvent.setup()
    render(<EditCustomerForm customer={customer} />)

    await user.clear(screen.getByDisplayValue("Refunded twice in 2024"))
    await user.click(screen.getByRole("button", { name: "actions.save" }))

    await waitFor(() => expect(mutateAsync).toHaveBeenCalled())
    expect(mutateAsync.mock.calls[0][0]).toMatchObject({
      internal_note: null,
    })
  })
})
