import { createFileRoute } from '@tanstack/react-router'
import { Cheques } from '@/features/cheques'

export const Route = createFileRoute('/_authenticated/cheques')({
  component: Cheques,
})
