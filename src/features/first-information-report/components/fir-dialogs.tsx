import { AddFirEntryDialog } from './add-fir-record-dialog'
import { UsersDeleteDialog } from './fir-delete-dialog'
import { useFir } from './fir-provider'

export function FirDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFir()
  return (
    <>
      <AddFirEntryDialog
        key='fir-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <UsersDeleteDialog
            key={`fir-delete-${currentRow.id}`}
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
