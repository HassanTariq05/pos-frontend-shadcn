import { AddCashbookEntryDialog } from './add-cashbook-record-dialog'
import { useCashbook } from './cashbook-provider'
import { UsersDeleteDialog } from './users-delete-dialog'

export function CashbookDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCashbook()
  return (
    <>
      <AddCashbookEntryDialog
        key='cashbook-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <UsersDeleteDialog
            key={`cashbook-delete-${currentRow.id}`}
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
