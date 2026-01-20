import { z } from 'zod'
import { formatDate } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar as CalendarIcon, Download, Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

type FormMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: any
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters.')
    .max(60, 'Title must not be longer than 60 characters.'),

  accountNumber: z
    .string()
    .max(60, 'Account Number must not be longer than 60 characters.')
    .optional(),

  urduName: z
    .string()
    .max(60, 'Urdu Name must not be longer than 60 characters.')
    .optional(),

  description: z
    .string()
    .max(160, 'Description must not exceed 160 characters.')
    .optional(),

  phone: z.string().max(20, 'Phone number is too long.').optional(),

  address: z
    .string()
    .max(160, 'Address must not exceed 160 characters.')
    .optional(),

  email: z.string().max(0).or(z.string().email()),

  balance: z.number().min(0, 'Balance cannot be negative.'),

  status: z
    .enum(['Active', 'Inactive'])
    .refine((val) => !!val, { message: 'Please select a valid status.' }),

  attachments: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
        name: z.string(),
        url: z.string().optional(),
        uploadedAt: z.string().datetime(),
        note: z.string().max(200).optional(),
      })
    )
    .optional()
    .default([]),
})

type FormForm = z.infer<typeof formSchema>

export function RentalsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: FormMutateDrawerProps) {
  const isUpdate = !!currentRow

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          title: currentRow.title,
          description: currentRow.description,
          phone: currentRow.phone,
          email: currentRow.email,
          address: currentRow.address,
          balance: currentRow.balance,
          status: currentRow.status,
          attachments: currentRow.attachments ?? [],
        }
      : {
          title: '',
          description: '',
          phone: '',
          email: '',
          address: '',
          balance: 0,
          status: 'Active',
          attachments: [],
        },
  })

  const onSubmit = (data: FormForm) => {
    if (isUpdate) {
    } else {
    }

    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-start'>
          <SheetTitle>
            {isUpdate ? 'Update' : 'Create'} Rental Account
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            id='owner-account-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid flex-1 grid-cols-1 gap-6 overflow-y-auto px-4 md:grid-cols-2'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a title' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='+92 3XX XXX XXXX' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='example@email.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Active'>Active</SelectItem>
                      <SelectItem value='Inactive'>InActive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Enter full address'
                      className='resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Enter description...'
                      className='resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='balance'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Balance</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      inputMode='numeric'
                      placeholder='0'
                      value={
                        field.value
                          ? new Intl.NumberFormat('en-US').format(field.value)
                          : ''
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        field.onChange(
                          rawValue === '' ? undefined : Number(rawValue)
                        )
                      }}
                      className='mt-0.5 mb-0.5 h-9 text-right font-medium text-emerald-700'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='attachments'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <div className='w-88 space-y-5'>
                      {field.value?.map((attachment: any, index: number) => (
                        <div
                          key={index}
                          className='rounded-lg border bg-slate-50/60 p-3.5 shadow-sm'
                        >
                          <div className='flex flex-wrap items-center justify-between'>
                            <div className='min-w-0 flex-1 space-y-1.5'>
                              <p className='truncate text-sm leading-tight font-medium'>
                                {attachment.name}
                              </p>
                              <div className='flex items-center gap-1.5 text-xs text-muted-foreground'></div>
                            </div>

                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='-mt-1 -mr-1.5 shrink-0 text-primary hover:text-primary/90'
                              onClick={() => {
                                const newList = [...(field.value || [])]
                                newList.splice(index, 1)
                                field.onChange(newList)
                              }}
                            >
                              <Download />
                            </Button>

                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='-mt-1 -mr-1.5 shrink-0 text-destructive hover:text-destructive/90'
                              onClick={() => {
                                const newList = [...(field.value || [])]
                                newList.splice(index, 1)
                                field.onChange(newList)
                              }}
                            >
                              <Trash />
                            </Button>
                          </div>

                          <div className='mt-4 space-y-3'>
                            <Input
                              placeholder='Note about this document (optional)'
                              value={attachment.note || ''}
                              onChange={(e) => {
                                const newList = [...(field.value || [])]
                                newList[index] = {
                                  ...newList[index],
                                  note: e.target.value,
                                }
                                field.onChange(newList)
                              }}
                              className='h-9 text-sm'
                            />

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant='outline'
                                  className={cn(
                                    'h-9 w-full justify-start text-left text-sm font-normal',
                                    !attachment.uploadedAt &&
                                      'text-muted-foreground'
                                  )}
                                >
                                  <CalendarIcon className='mr-2 h-4 w-4 shrink-0' />
                                  {attachment.uploadedAt ? (
                                    formatDate(
                                      new Date(attachment.uploadedAt),
                                      'PPP'
                                    )
                                  ) : (
                                    <span>Pick date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'
                              >
                                <CalendarComponent
                                  mode='single'
                                  selected={
                                    attachment.uploadedAt
                                      ? new Date(attachment.uploadedAt)
                                      : undefined
                                  }
                                  onSelect={(date) => {
                                    if (!date) return
                                    const newList = [...(field.value || [])]
                                    newList[index] = {
                                      ...newList[index],
                                      uploadedAt: date.toISOString(),
                                    }
                                    field.onChange(newList)
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      ))}

                      <div className='w-full pt-2'>
                        <label htmlFor='file-upload' className='cursor-pointer'>
                          <Button
                            type='button'
                            variant='outline'
                            className='w-full gap-2'
                            asChild
                          >
                            <div>
                              <Plus className='h-4 w-4' />
                              Add Attachment
                            </div>
                          </Button>
                        </label>

                        <Input
                          id='file-upload'
                          type='file'
                          accept='.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx'
                          multiple
                          className='hidden'
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            if (!files.length) return

                            const today = new Date().toISOString()

                            const newItems = files.map((file) => ({
                              file,
                              name: file.name,
                              url: URL.createObjectURL(file),
                              uploadedAt: today,
                              note: '',
                            }))

                            field.onChange([
                              ...(field.value || []),
                              ...newItems,
                            ])

                            e.target.value = ''
                          }}
                        />
                      </div>

                      <p className='pt-1.5 text-xs text-muted-foreground'>
                        Allowed: PDF, images, Word, Excel • Max ~10MB per file
                        recommended
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>

          <Button form='owner-account-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
