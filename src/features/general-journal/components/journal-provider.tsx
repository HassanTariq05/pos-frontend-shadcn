import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type User } from '../data/schema'

type JournalDialogType = 'add' | 'edit' | 'delete'

type JournalContextType = {
  open: JournalDialogType | null
  setOpen: (str: JournalDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const JournalContext = React.createContext<JournalContextType | null>(null)

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<JournalDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <JournalContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </JournalContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useJournal = () => {
  const journalContext = React.useContext(JournalContext)

  if (!journalContext) {
    throw new Error('useJournal has to be used within <JournalContext>')
  }

  return journalContext
}
