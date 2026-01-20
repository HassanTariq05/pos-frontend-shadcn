import { AddChequeEntryDialog } from './add-cheque-record-dialog'
import { UsersDeleteDialog } from './cheque-delete-dialog'
import { useCheque } from './cheque-provider'

export function ChequeDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCheque()
  return (
    <>
      <AddChequeEntryDialog
        key='cheque-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <UsersDeleteDialog
            key={`cheque-delete-${currentRow.id}`}
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
