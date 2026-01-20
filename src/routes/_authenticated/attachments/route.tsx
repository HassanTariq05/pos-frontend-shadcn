import { createFileRoute } from '@tanstack/react-router'
import { Attachments } from '@/features/attachments'

export const Route = createFileRoute('/_authenticated/attachments')({
  component: Attachments,
})
