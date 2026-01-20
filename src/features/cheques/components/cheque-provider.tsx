import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Cheque } from '../data/schema'

type ChequeDialogType = 'add' | 'edit' | 'delete'

type ChequeContextType = {
  open: ChequeDialogType | null
  setOpen: (str: ChequeDialogType | null) => void
  currentRow: Cheque | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Cheque | null>>
}

const ChequeContext = React.createContext<ChequeContextType | null>(null)

export function ChequeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ChequeDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Cheque | null>(null)

  return (
    <ChequeContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ChequeContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCheque = () => {
  const chequeContext = React.useContext(ChequeContext)

  if (!chequeContext) {
    throw new Error('useCheque has to be used within <ChequeContext>')
  }

  return chequeContext
}
