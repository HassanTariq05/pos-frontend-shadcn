import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Policy, type BusinessAccount } from '../data/schema'

type BusinessAccountsDialogType =
  | 'create-owner'
  | 'update-owner'
  | 'delete-owner'
  | 'create-vendor'
  | 'update-vendor'
  | 'delete-vendor'
  | 'create-customer'
  | 'update-customer'
  | 'delete-customer'
  | 'create-town'
  | 'update-town'
  | 'delete-town'
  | 'create-rental'
  | 'update-rental'
  | 'delete-rental'

type BusinessAccountsContextType = {
  open: BusinessAccountsDialogType | null
  setOpen: (str: BusinessAccountsDialogType | null) => void
  currentRow: BusinessAccount | Policy | null
  setCurrentRow: React.Dispatch<
    React.SetStateAction<BusinessAccount | Policy | null>
  >
}

const BusinessAccountsContext =
  React.createContext<BusinessAccountsContextType | null>(null)

export function BusinessAccountsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<BusinessAccountsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<BusinessAccount | Policy | null>(
    null
  )

  return (
    <BusinessAccountsContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </BusinessAccountsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBusinessAccounts = () => {
  const businessAccountsContext = React.useContext(BusinessAccountsContext)

  if (!businessAccountsContext) {
    throw new Error(
      'useBusinessAccounts has to be used within <BusinessAccountsContext>'
    )
  }

  return businessAccountsContext
}
