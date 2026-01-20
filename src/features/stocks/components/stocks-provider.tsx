import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Product } from '../data/schema'

type StocksDialogType = 'invite' | 'add' | 'edit' | 'delete'

type StocksContextType = {
  open: StocksDialogType | null
  setOpen: (str: StocksDialogType | null) => void
  currentRow: Product | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | null>>
}

const StocksContext = React.createContext<StocksContextType | null>(null)

export function StocksProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<StocksDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Product | null>(null)

  return (
    <StocksContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </StocksContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStocks = () => {
  const stocksContext = React.useContext(StocksContext)

  if (!stocksContext) {
    throw new Error('useStocks has to be used within <StocksContext>')
  }

  return stocksContext
}
