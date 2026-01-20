import { createFileRoute } from '@tanstack/react-router'
import { GeneralJournal } from '@/features/general-journal'

export const Route = createFileRoute('/_authenticated/general-journal')({
  component: GeneralJournal,
})
