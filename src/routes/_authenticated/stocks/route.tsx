import { createFileRoute } from '@tanstack/react-router'
import { Stocks } from '@/features/stocks'

export const Route = createFileRoute('/_authenticated/stocks')({
  component: Stocks,
})
