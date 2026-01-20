import { AttachmentsActionDialog } from './attachments-action-dialog'
import { AttachmentsDeleteDialog } from './attachments-delete-dialog'
import { useAttachments } from './attachments-provider'

export function AttachmentsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAttachments()
  return (
    <>
      <AttachmentsActionDialog
        key='attachment-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <AttachmentsActionDialog
            key={`attachment-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AttachmentsDeleteDialog
            key={`attachment-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
