import { createFileRoute } from '@tanstack/react-router'
import { FirstInformationReport } from '@/features/first-information-report'

export const Route = createFileRoute(
  '/_authenticated/first-information-report'
)({
  component: FirstInformationReport,
})
