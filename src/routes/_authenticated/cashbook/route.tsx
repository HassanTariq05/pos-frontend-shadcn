import { createFileRoute } from '@tanstack/react-router'
import { Cashbook } from '@/features/cashbook'

export const Route = createFileRoute('/_authenticated/cashbook')({
  component: Cashbook,
})
