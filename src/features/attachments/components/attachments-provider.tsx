import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Attachment } from '../data/schema'

type AttachmentsDialogType = 'invite' | 'add' | 'edit' | 'delete'

type AttachmentsContextType = {
  open: AttachmentsDialogType | null
  setOpen: (str: AttachmentsDialogType | null) => void
  currentRow: Attachment | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Attachment | null>>
}

const AttachmentsContext = React.createContext<AttachmentsContextType | null>(
  null
)

export function AttachmentsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<AttachmentsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Attachment | null>(null)

  return (
    <AttachmentsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </AttachmentsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAttachments = () => {
  const attachmentsContext = React.useContext(AttachmentsContext)

  if (!attachmentsContext) {
    throw new Error('useAttachments has to be used within <AttachmentsContext>')
  }

  return attachmentsContext
}
