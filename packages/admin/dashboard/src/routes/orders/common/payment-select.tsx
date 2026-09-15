import { AdminPayment } from "@medusajs/types"
import { Label, Select } from "@medusajs/ui"
import { useTranslation } from "react-i18next"

import { useDocumentDirection } from "../../../hooks/use-document-direction"
import { formatProvider } from "../../../lib/format-provider"
import { getLocaleAmount } from "../../../lib/money-amount-helpers"

type PaymentSelectProps = {
  payments: AdminPayment[]
  value?: string
  onValueChange: (value: string) => void
  showLabel?: boolean
}

export const PaymentSelect = ({
  payments,
  value,
  onValueChange,
  showLabel = true,
}: PaymentSelectProps) => {
  const { t } = useTranslation()
  const direction = useDocumentDirection()

  return (
    <Select dir={direction} value={value} onValueChange={onValueChange}>
      {showLabel && (
        <Label className="txt-compact-small mb-[-6px] font-sans font-medium">
          {t("orders.payment.selectPaymentToRefund")}
        </Label>
      )}

      <Select.Trigger>
        <Select.Value placeholder={t("orders.payment.selectPaymentToRefund")} />
      </Select.Trigger>

      <Select.Content>
        {payments.map((payment) => {
          const totalRefunded =
            payment.refunds?.reduce((acc, next) => next.amount + acc, 0) || 0

          return (
            <Select.Item
              value={payment.id}
              key={payment.id}
              disabled={
                !!payment.canceled_at || totalRefunded >= payment.amount
              }
              className="flex items-center justify-center"
            >
              <span>
                {getLocaleAmount(
                  payment.amount as number,
                  payment.currency_code
                )}
                {" - "}
              </span>
              <span>{formatProvider(payment.provider_id)}</span>
              <span> - (#{payment.id.substring(23)})</span>
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select>
  )
}
