import { TooltipProvider } from '@/components/ui/tooltip'
import { PurchasesActionDialog } from './purchases-action-dialog'
import { PurchasesDeleteDialog } from './purchases-delete-dialog'
import { usePurchases } from './purchases-provider'
import { ViewPurchaseDialog } from './view-purchase-dialog'

export function PurchasesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePurchases()
  return (
    <>
      <TooltipProvider delayDuration={300}>
        <PurchasesActionDialog
          key='purchase-add'
          open={open === 'add'}
          onOpenChange={() => setOpen('add')}
        />
      </TooltipProvider>

      {currentRow && (
        <>
          <PurchasesActionDialog
            key={`purchase-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <TooltipProvider delayDuration={300}>
            <PurchasesActionDialog
              key='purchase-view'
              open={open === 'view'}
              onOpenChange={() => setOpen('view')}
              isDisabled={true}
            />
          </TooltipProvider>

          <PurchasesDeleteDialog
            key={`purchase-delete-${currentRow.id}`}
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
