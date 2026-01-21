import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Fir } from '../data/schema'

type FirDialogType = 'add' | 'edit' | 'delete'

type FirContextType = {
  open: FirDialogType | null
  setOpen: (str: FirDialogType | null) => void
  currentRow: Fir | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Fir | null>>
}

const FirContext = React.createContext<FirContextType | null>(null)

export function FirProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<FirDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Fir | null>(null)

  return (
    <FirContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </FirContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFir = () => {
  const firContext = React.useContext(FirContext)

  if (!firContext) {
    throw new Error('useFir has to be used within <FirContext>')
  }

  return firContext
}
