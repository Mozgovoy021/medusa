// @vitest-environment jsdom
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react"
import { describe, expect, it, vi, afterEach } from "vitest"

import { CreateRegionForm } from "./create-region-form"

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as any).ResizeObserver ??= ResizeObserverStub

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock("@medusajs/icons", async () => {
  const actual = await vi.importActual<any>("@medusajs/icons")
  return {
    ...actual,
    XMarkMini: () => <svg data-testid="x-mark-mini" />,
  }
})

const toastError = vi.fn()
const toastSuccess = vi.fn()

vi.mock("@medusajs/ui", async () => {
  const actual = await vi.importActual<any>("@medusajs/ui")
  return {
    ...actual,
    toast: {
      success: (...args: any[]) => toastSuccess(...args),
      error: (...args: any[]) => toastError(...args),
    },
  }
})

const mutateAsync = vi.fn()
vi.mock("../../../../../hooks/api/regions", () => ({
  useCreateRegion: () => ({
    mutateAsync,
    isPending: false,
  }),
}))

vi.mock("../../../../../hooks/use-document-direction", () => ({
  useDocumentDirection: () => "ltr",
}))

vi.mock("../../../../../hooks/use-combobox-data", () => ({
  useComboboxData: () => ({
    options: [],
    fetchNextPage: vi.fn(),
  }),
}))

vi.mock("../../../../../lib/client", () => ({
  sdk: {
    admin: {
      payment: {
        listPaymentProviders: vi.fn(),
      },
    },
  },
}))

vi.mock("../../../common/hooks/use-countries", () => ({
  useCountries: () => ({ countries: [], count: 0 }),
}))

vi.mock("../../../common/hooks/use-country-table-columns", () => ({
  useCountryTableColumns: () => [],
}))

vi.mock("../../../common/hooks/use-country-table-query", () => ({
  useCountryTableQuery: () => ({ searchParams: {}, raw: {} }),
}))

vi.mock("../../../../../hooks/use-data-table", () => ({
  useDataTable: () => ({ table: {} }),
}))

vi.mock("../../../../../components/table/data-table", () => ({
  _DataTable: () => <div data-testid="data-table" />,
}))

vi.mock("../../../../../components/inputs/combobox", () => ({
  Combobox: () => <div data-testid="payment-providers-combobox" />,
}))

vi.mock("../../../../../components/utilities/keybound-form", () => ({
  KeyboundForm: ({ children, ...props }: any) => (
    <form {...props}>{children}</form>
  ),
}))

vi.mock("../../../../../components/modals", () => {
  const MockPassthrough = ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  )
  const RouteFocusModalForm = ({ form, children }: any) => (
    <FormProvider {...form}>{children}</FormProvider>
  )

  return {
    useRouteModal: () => ({ handleSuccess: vi.fn() }),
    useStackedModal: () => ({ setIsOpen: vi.fn() }),
    RouteFocusModal: {
      Form: RouteFocusModalForm,
      Header: MockPassthrough,
      Body: MockPassthrough,
      Footer: MockPassthrough,
      Close: ({ children }: any) => <div>{children}</div>,
    },
    StackedFocusModal: Object.assign(MockPassthrough, {
      Trigger: MockPassthrough,
      Content: MockPassthrough,
      Header: MockPassthrough,
      Body: MockPassthrough,
      Footer: MockPassthrough,
      Title: MockPassthrough,
      Close: ({ children }: any) => <div>{children}</div>,
    }),
  }
})

describe("CreateRegionForm", () => {
  const fillRequiredFieldsExceptPaymentProviders = () => {
    fireEvent.change(screen.getByRole("textbox", { name: /fields.name/i }), {
      target: { value: "Caribbean and Antilles" },
    })
  }

  it("blocks submission and shows a toast when no payment provider is selected", async () => {
    render(<CreateRegionForm currencies={[]} />)

    fillRequiredFieldsExceptPaymentProviders()

    const saveButton = screen
      .getAllByText("actions.save")
      .map((el) => el.closest("button"))
      .find((btn) => btn?.getAttribute("type") === "submit")

    if (!saveButton) {
      throw new Error("Save button not found")
    }

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        "Select at least one payment provider"
      )
    })

    expect(mutateAsync).not.toHaveBeenCalled()

    expect(
      await screen.findByText("Select at least one payment provider")
    ).toBeTruthy()
  })
})
