import { createFileRoute } from '@tanstack/react-router'
import { PrintPurchase } from '@/features/purchases/components/print-purchase'

export const Route = createFileRoute(
  '/_authenticated/print-purchase/$purchaseId'
)({
  component: PrintPurchase,
})
