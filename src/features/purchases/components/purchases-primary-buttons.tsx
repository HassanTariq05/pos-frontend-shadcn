import { Receipt, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { usePurchases } from './purchases-provider'

export function PurchasesPrimaryButtons() {
  const { setOpen } = usePurchases()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Purchase</span> <UserPlus size={18} />
      </Button>
      <DateRangePicker
        onUpdate={(values) => console.log(values)}
        initialDateFrom='2023-01-01'
        initialDateTo='2023-12-31'
        align='start'
        locale='en-GB'
        showCompare={false}
      />
    </div>
  )
}
