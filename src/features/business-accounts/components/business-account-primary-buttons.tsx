import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBusinessAccounts } from './business-accounts-provider'

export function BusinessAccountPrimaryButtons({
  selectedTab,
}: {
  selectedTab: string
}) {
  const { setOpen } = useBusinessAccounts()

  return (
    <div className='flex gap-2'>
      {selectedTab === 'owners' && (
        <Button className='space-x-1' onClick={() => setOpen('create-owner')}>
          <span>Create Owner Account</span> <Plus size={18} />
        </Button>
      )}
      {selectedTab === 'vendors' && (
        <Button className='space-x-1' onClick={() => setOpen('create-vendor')}>
          <span>Create Vendor Account</span> <Plus size={18} />
        </Button>
      )}
      {selectedTab === 'customers' && (
        <Button
          className='space-x-1'
          onClick={() => setOpen('create-customer')}
        >
          <span>Create Customer Account</span> <Plus size={18} />
        </Button>
      )}
      {selectedTab === 'towns' && (
        <Button className='space-x-1' onClick={() => setOpen('create-town')}>
          <span>Create Town</span> <Plus size={18} />
        </Button>
      )}
      {selectedTab === 'rentals' && (
        <Button className='space-x-1' onClick={() => setOpen('create-rental')}>
          <span>Create Rental Account</span> <Plus size={18} />
        </Button>
      )}
      {/* {selectedTab === 'checklists' && canCreateChecklist && (
        <Button
          className='space-x-1'
          onClick={() => setOpen('create-checklist')}
        >
          <span>Create Checklist</span> <Plus size={18} />
        </Button>
      )}

      {selectedTab === 'policies' && canCreatePolicy && (
        <Button className='space-x-1' onClick={() => setOpen('create-policy')}>
          <span>Initiate Policy</span> <Plus size={18} />
        </Button>
      )} */}
    </div>
  )
}
