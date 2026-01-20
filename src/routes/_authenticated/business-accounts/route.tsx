import { createFileRoute } from '@tanstack/react-router'
import { BusinessAccounts } from '@/features/business-accounts'

export const Route = createFileRoute('/_authenticated/business-accounts')({
  component: BusinessAccounts,
})
