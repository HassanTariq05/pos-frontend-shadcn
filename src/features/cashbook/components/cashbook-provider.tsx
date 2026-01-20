import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type User } from '../data/schema'

type CashbookDialogType = 'add' | 'edit' | 'delete'

type CashbookContextType = {
  open: CashbookDialogType | null
  setOpen: (str: CashbookDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const CashbookContext = React.createContext<CashbookContextType | null>(null)

export function CashbookProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<CashbookDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <CashbookContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CashbookContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCashbook = () => {
  const cashbookContext = React.useContext(CashbookContext)

  if (!cashbookContext) {
    throw new Error('useCashbook has to be used within <CashbookContext>')
  }

  return cashbookContext
}
