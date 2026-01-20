'use client'

import { z } from 'zod'
import { format } from 'date-fns'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Plus, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DateInput } from '@/components/ui/date-input-shadcn'
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

const attachmentItemSchema = z.object({
  name: z.string(),
  note: z.string().optional(),
  documentDate: z.date().optional(),
  uploadedAt: z.string().optional(),
  url: z.string().optional(),
  file: z.instanceof(File).optional(),
})

const formSchema = z.object({
  attachments: z.array(attachmentItemSchema),
})

type AttachmentFormInput = z.input<typeof formSchema>
type AttachmentFormOutput = z.infer<typeof formSchema>

type AttachmentActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: any
}

export function AttachmentsActionDialog({
  open,
  onOpenChange,
  currentRow,
}: AttachmentActionDialogProps) {
  const form = useForm<AttachmentFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachments: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attachments',
  })

  const onSubmit = (values: AttachmentFormOutput) => {
    console.log(values)
    form.reset()
    onOpenChange(false)
  }

  const isImage = (fileName: string) => /\.(png|jpg|jpeg|webp)$/i.test(fileName)
  const isPdf = (fileName: string) => /\.pdf$/i.test(fileName)

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='flex max-h-[90vh] flex-col sm:max-w-xl'>
        <DialogHeader className='text-start'>
          <DialogTitle>Add Attachments</DialogTitle>
          <DialogDescription>
            Upload and manage supporting documents
          </DialogDescription>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto py-1 pr-1'>
          <Form {...form}>
            <form
              id='attachment-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5'
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className='rounded-lg border bg-muted/30 p-4 shadow-sm'
                >
                  <div className='flex gap-4'>
                    {/* Small preview box - now before name */}
                    {field.url && (
                      <div className='shrink-0'>
                        <div className='h-16 w-16 overflow-hidden rounded border bg-background'>
                          {isImage(field.name) && (
                            <img
                              src={field.url}
                              alt={field.name}
                              className='h-full w-full object-cover'
                            />
                          )}

                          {isPdf(field.name) && (
                            <iframe
                              src={field.url}
                              className='h-full w-full'
                              title={field.name}
                            />
                          )}

                          {!isImage(field.name) && !isPdf(field.name) && (
                            <div className='flex h-full w-full items-center justify-center p-1 text-center text-[10px] leading-tight text-muted-foreground'>
                              No preview
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Main content */}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-start justify-between gap-2'>
                        <div className='min-w-0 flex-1'>
                          <p className='truncate text-sm leading-tight font-medium'>
                            {field.name}
                          </p>
                          <p className='mt-0.5 text-xs text-muted-foreground'>
                            Uploaded:{' '}
                            {format(new Date(field.uploadedAt!), 'PPp')}
                          </p>
                        </div>

                        <div className='flex shrink-0 items-center gap-1'>
                          {field.url && (
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8'
                              onClick={() => window.open(field.url, '_blank')}
                            >
                              <Download className='h-4 w-4' />
                            </Button>
                          )}
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() => {
                              URL.revokeObjectURL(field.url ?? '')
                              remove(index)
                            }}
                          >
                            <Trash className='h-4 w-4 text-destructive' />
                          </Button>
                        </div>
                      </div>

                      {/* Fields */}
                      <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                        <DateInput />
                        {/* Note */}
                        <FormField
                          control={form.control}
                          name={`attachments.${index}.note`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-xs'>
                                Note (optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Additional information...'
                                  className='h-9 text-sm'
                                  {...field}
                                  value={field.value ?? ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add new files */}
              <div className='pt-3'>
                <Input
                  type='file'
                  multiple
                  className='hidden'
                  id='file-upload'
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? [])
                    if (!files.length) return

                    const now = new Date().toISOString()

                    const newItems = files.map((file) => ({
                      name: file.name,
                      file,
                      uploadedAt: now,
                      url: URL.createObjectURL(file),
                      note: '',
                      documentDate: undefined,
                    }))

                    append(newItems)
                    e.target.value = ''
                  }}
                />

                <label htmlFor='file-upload'>
                  <Button
                    type='button'
                    variant='outline'
                    className='w-full gap-2'
                    asChild
                  >
                    <span>
                      <Plus className='h-4 w-4' />
                      Add Attachment(s)
                    </span>
                  </Button>
                </label>
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button type='submit' form='attachment-form'>
            Save Attachments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
