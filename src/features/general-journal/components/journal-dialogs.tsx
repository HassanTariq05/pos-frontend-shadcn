import { AddJournalEntryDialog } from './add-journal-record-dialog'
import { useJournal } from './journal-provider'
import { UsersDeleteDialog } from './users-delete-dialog'

export function JournalDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useJournal()
  return (
    <>
      <AddJournalEntryDialog
        key='journal-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <UsersDeleteDialog
            key={`journal-delete-${currentRow.id}`}
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
