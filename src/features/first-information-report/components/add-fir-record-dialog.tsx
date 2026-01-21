'use client'

import { useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AttachmentsManager,
  AttachmentsManagerRef,
} from '@/components/ui/attachments'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const firEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  crimeNo: z.string().min(1, 'Crime Number date is required'),
  policeStation: z.string().min(1, 'Police Station is required'),
  complainantName: z.string().min(1, 'Complainant is required'),
  witness: z.string().min(1, 'Witness is required'),
  accused: z.string().min(1, 'Accused is required'),
  note: z.string().optional(),
})

type FirEntryInput = z.input<typeof firEntrySchema>
type FirEntryOutput = z.output<typeof firEntrySchema>

type AddFirEntryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddFirEntryDialog({
  open,
  onOpenChange,
}: AddFirEntryDialogProps) {
  const form = useForm<FirEntryInput, any, FirEntryOutput>({
    resolver: zodResolver(firEntrySchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      crimeNo: '',
      policeStation: '',
      complainantName: '',
      witness: '',
      accused: '',
      note: '',
    },
    mode: 'onChange',
  })

  const attachmentsRef = useRef<AttachmentsManagerRef>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (data: any) => {
    setIsSubmitting(true)
    console.log('Submitted fir entry:', data)

    setTimeout(() => {
      form.reset()
      setIsSubmitting(false)
      onOpenChange(false)
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Add FIR</DialogTitle>
          <DialogDescription>Create a new FIR entry.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 py-2'
          >
            <div className='scrollbar-thin scrollbar-thumb-muted-foreground/30 -mx-1 max-h-[65vh] overflow-y-auto px-1'>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
                <div className='space-y-6 lg:col-span-3'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='date'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fir Date</FormLabel>
                          <FormControl>
                            <Input type='date' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='crimeNo'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Crime Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter crime number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='policeStation'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Police Station</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter police station'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='complainantName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complainant Name</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter complainant' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='witness'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Witness</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Enter witness details'
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='accused'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accused</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Enter accused details'
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='note'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Enter notes'
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <AttachmentsManager
                  ref={attachmentsRef}
                  className='h-[65vh] lg:col-span-2'
                  // optional props:
                  // maxFiles={5}
                  // accept="image/*,application/pdf"
                  // initialAttachments={[]}
                  // onChange={(atts) => console.log('Attachments changed:', atts)}
                />
              </div>
            </div>
            <DialogFooter className='gap-3 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Add FIR'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
