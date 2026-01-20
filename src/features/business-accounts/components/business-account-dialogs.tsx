import React from 'react'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useBusinessAccounts } from './business-accounts-provider'
import { CustomersMutateDrawer } from './customer/customer-account-mutate-drawer'
import { OwnersMutateDrawer } from './owner/owner-account-mutate-drawer'
import { RentalsMutateDrawer } from './rental/rental-account-mutate-drawer'
import { TownsMutateDrawer } from './town/towns-mutate-drawer'
import { VendorsMutateDrawer } from './vendor/vendor-account-mutate-drawer'

type EntityType = 'owner' | 'vendor' | 'customer' | 'town' | 'rental'

type EntityConfig = {
  label: string
  Drawer: React.ComponentType<any>
}

const ENTITY_CONFIG: Record<EntityType, EntityConfig> = {
  owner: {
    label: 'Owner Account',
    Drawer: OwnersMutateDrawer,
  },
  vendor: {
    label: 'Vendor Account',
    Drawer: VendorsMutateDrawer,
  },
  customer: {
    label: 'Customer Account',
    Drawer: CustomersMutateDrawer,
  },
  town: {
    label: 'Town',
    Drawer: TownsMutateDrawer,
  },
  rental: {
    label: 'Rental',
    Drawer: RentalsMutateDrawer,
  },
}

export function BusinessAccountDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useBusinessAccounts()

  const handleDeleteForm = (id: string, entity: EntityType) => {
    // entity-aware delete logic
  }

  return (
    <>
      {(Object.entries(ENTITY_CONFIG) as [EntityType, EntityConfig][]).map(
        ([entity, config]) => {
          const { Drawer, label } = config

          return (
            <React.Fragment key={entity}>
              <Drawer
                open={open === `create-${entity}`}
                onOpenChange={() => setOpen(`create-${entity}`)}
              />

              {currentRow && (
                <>
                  <Drawer
                    open={open === `update-${entity}`}
                    currentRow={currentRow}
                    onOpenChange={() => {
                      setOpen(`update-${entity}`)
                      setTimeout(() => setCurrentRow(null), 500)
                    }}
                  />

                  <ConfirmDialog
                    destructive
                    open={open === `delete-${entity}`}
                    onOpenChange={() => {
                      setOpen(`delete-${entity}`)
                      setTimeout(() => setCurrentRow(null), 500)
                    }}
                    handleConfirm={() => {
                      setOpen(null)
                      setTimeout(() => setCurrentRow(null), 500)
                      handleDeleteForm(currentRow.id, entity)
                    }}
                    className='max-w-md'
                    title={`Delete this ${label}: ${currentRow.title}?`}
                    desc={
                      <>
                        You are about to delete{' '}
                        <strong>{currentRow.title}</strong>.
                        <br />
                        This action cannot be undone.
                      </>
                    }
                    confirmText='Delete'
                  />
                </>
              )}
            </React.Fragment>
          )
        }
      )}
    </>
  )
}
