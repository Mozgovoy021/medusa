import { Select } from "@medusajs/ui"

import { useRefundReasons } from "../../../hooks/api"
import { useDocumentDirection } from "../../../hooks/use-document-direction"

type RefundReasonSelectProps = {
  value?: string
  onValueChange: (value: string) => void
}

export const RefundReasonSelect = ({
  value,
  onValueChange,
}: RefundReasonSelectProps) => {
  const { refund_reasons } = useRefundReasons()
  const direction = useDocumentDirection()

  return (
    <Select dir={direction} value={value} onValueChange={onValueChange}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>

      <Select.Content>
        {refund_reasons?.map((reason) => (
          <Select.Item key={reason.id} value={reason.id}>
            {reason.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}
