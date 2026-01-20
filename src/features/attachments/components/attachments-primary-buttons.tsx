import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAttachments } from './attachments-provider'

export function AttachmentsPrimaryButtons() {
  const { setOpen } = useAttachments()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Attachment</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
