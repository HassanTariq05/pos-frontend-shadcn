import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useCashbook } from './cashbook-provider'

export function CashbookPrimaryButtons() {
  const { setOpen } = useCashbook()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Record</span> <Plus size={18} />
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
