'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Check,
  ChevronsUpDown,
  Download,
  Paperclip,
  Plus,
  PlusCircle,
  Trash,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const attachmentItemSchema = z.object({
  name: z.string(),
  note: z.string().optional(),
  documentDate: z.date().optional(),
  uploadedAt: z.string().optional(),
  url: z.string().optional(),
  file: z.instanceof(File).optional(),
})

const chequeEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  chequeDate: z.string().min(1, 'Cheque Date is required'),
  submissionDate: z.string().min(1, 'Date is required'),
  account: z.string().min(1, 'Account is required'),
  broker: z.string().min(1, 'Broker is required'),
  bank: z.string().min(1, 'Bank is required'),
  chequeNo: z.string().min(1, 'Cheque No is required'),
  accountName: z.string().min(1, 'Cheque Account Name is required'),
  submittedBy: z.string().min(1, 'Submitted By is required'),
  amount: z.coerce.number().min(0).default(0),
  attachments: z.array(attachmentItemSchema),
})

type ChequeEntryForm = z.infer<typeof chequeEntrySchema>

type AddChequeEntryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const dummyAccounts = [
  'Cash in Hand',
  'Bank - HBL',
  'Bank - Meezan',
  'Petty Cash',
  'Accounts Receivable',
  'Customer - Ali Traders',
  'Supplier - Karachi Stationery',
  'Sales Revenue',
  'Purchase Expense',
  'Expenses - Rent',
]

export function AddChequeEntryDialog({
  open,
  onOpenChange,
}: AddChequeEntryDialogProps) {
  const form = useForm<ChequeEntryForm>({
    resolver: zodResolver(chequeEntrySchema) as any,
    defaultValues: {
      chequeDate: new Date().toISOString().split('T')[0],
      account: '',
      broker: '',
      bank: '',
      chequeNo: '',
      accountName: '',
      submissionDate: new Date().toISOString().split('T')[0],
      submittedBy: '',
      amount: 0,
      attachments: [],
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (data: any) => {
    setIsSubmitting(true)
    console.log('data', data)
    // Reset & close
    form.reset()
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const [openAccDropdown, setOpenAccDropdown] = useState(false)
  const [value, setValue] = useState(form.watch('account') || '')

  useEffect(() => {
    form.setValue('account', value)
  }, [value, form])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attachments',
  })

  const isImage = (fileName: string) => /\.(png|jpg|jpeg|webp)$/i.test(fileName)
  const isPdf = (fileName: string) => /\.pdf$/i.test(fileName)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Add Cheque</DialogTitle>
          <DialogDescription>Create a new cheque.</DialogDescription>
        </DialogHeader>

        <div className='scrollbar-thin scrollbar-thumb-muted-foreground/30 -mx-1 max-h-[70vh] overflow-y-auto px-1'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5 py-2'
            >
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
                <div className='space-y-5 lg:col-span-3'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Vendor / Customer
                      </label>

                      <Popover
                        open={openAccDropdown}
                        onOpenChange={setOpenAccDropdown}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            role='combobox'
                            aria-expanded={openAccDropdown}
                            className='mt-0.5 h-9 w-full justify-between text-left font-normal'
                          >
                            {value
                              ? dummyAccounts.find((acc) => acc === value)
                              : 'Select vendor/customer...'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className='w-full p-0'>
                          <Command>
                            <CommandInput placeholder='Search account...' />
                            <CommandList>
                              <CommandEmpty>No account found.</CommandEmpty>
                              <CommandGroup>
                                {dummyAccounts.map((acc) => (
                                  <CommandItem
                                    key={acc}
                                    value={acc}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ''
                                          : currentValue
                                      )
                                      setOpenAccDropdown(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        value === acc
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {acc}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {form.formState.errors.account && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.account.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Broker / Care of
                      </label>
                      <Input
                        placeholder='Enter broker / care of '
                        {...form.register('broker')}
                        className='mt-0.5 h-9'
                      />
                      {form.formState.errors.broker && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.broker.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Bank
                      </label>
                      <Input
                        placeholder='Enter bank '
                        {...form.register('bank')}
                        className='mt-0.5 h-9'
                      />
                      {form.formState.errors.bank && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.bank.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Cheque No
                      </label>
                      <Input
                        placeholder='Enter cheque no '
                        {...form.register('chequeNo')}
                        className='mt-0.5 h-9'
                      />
                      {form.formState.errors.chequeNo && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.chequeNo.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Cheque Account Name
                      </label>
                      <Input
                        placeholder='Enter cheque account name '
                        {...form.register('accountName')}
                        className='mt-0.5 h-9'
                      />
                      {form.formState.errors.accountName && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.accountName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Amount
                      </label>
                      <Input
                        type='number'
                        min='0'
                        step='1'
                        placeholder='0'
                        {...form.register('amount', { valueAsNumber: true })}
                        className='mt-0.5 h-9 text-right font-medium text-emerald-700'
                      />
                      {form.formState.errors.amount && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.amount.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Cheque Date
                      </label>
                      <Input
                        type='date'
                        {...form.register('chequeDate')}
                        className='mt-0.5 h-9 w-38 w-full'
                      />
                      {form.formState.errors.chequeDate && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.chequeDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Date of Submission
                      </label>
                      <Input
                        type='date'
                        {...form.register('submissionDate')}
                        className='mt-0.5 h-9 w-full'
                      />
                      {form.formState.errors.submissionDate && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.submissionDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='text-xs text-muted-foreground'>
                        Submitted By
                      </label>
                      <Input
                        placeholder='Enter submitted by'
                        {...form.register('submittedBy')}
                        className='mt-0.5 h-9'
                      />
                      {form.formState.errors.submittedBy && (
                        <p className='mt-1 text-xs text-destructive'>
                          {form.formState.errors.submittedBy.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className='space-y-4 lg:col-span-2'>
                  {' '}
                  {/* ← FIXED: className moved here */}
                  <div className='h-full rounded-lg border bg-muted/20 p-5'>
                    {' '}
                    {/* h-full for equal height */}
                    <h3 className='mb-4 text-sm font-semibold text-foreground/90'>
                      📎 Attachments
                    </h3>
                    {fields.length === 0 ? (
                      <div className='flex h-[280px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/30 text-center text-sm text-muted-foreground'>
                        <Paperclip className='mb-2 h-10 w-10 text-muted-foreground/60' />{' '}
                        {/* Visual cue */}
                        <p className='font-medium'>No attachments yet</p>
                        <p className='mt-1 text-xs'>
                          Click "Add Attachment(s)" to upload files
                        </p>
                      </div>
                    ) : (
                      <div className='scrollbar-thin scrollbar-thumb-muted max-h-[420px] space-y-3 overflow-y-auto pr-2'>
                        {fields.map((field, index) => (
                          <div
                            key={field.id}
                            className='group rounded-lg border bg-background p-3 shadow-sm transition-all duration-200 hover:shadow-md'
                          >
                            <div className='flex items-start gap-3'>
                              {/* Preview - FIXED logic */}
                              <div className='shrink-0'>
                                <div className='h-16 w-16 overflow-hidden rounded-lg border bg-gradient-to-br from-muted to-background'>
                                  {field.url ? (
                                    isImage(field.name) ? (
                                      <img
                                        src={field.url}
                                        alt={field.name}
                                        className='h-full w-full cursor-pointer object-cover transition-transform duration-200 hover:scale-105'
                                        onClick={() =>
                                          window.open(field.url, '_blank')
                                        }
                                      />
                                    ) : isPdf(field.name) ? (
                                      <iframe
                                        src={field.url}
                                        className='h-full w-full border-0'
                                        title={field.name}
                                      />
                                    ) : (
                                      <div className='flex h-full w-full items-center justify-center'>
                                        <Paperclip className='h-5 w-5 text-muted-foreground' />
                                        <span className='ml-1 text-xs font-medium text-muted-foreground'>
                                          File
                                        </span>
                                      </div>
                                    )
                                  ) : (
                                    <div className='flex h-full w-full items-center justify-center bg-muted text-[10px] text-muted-foreground/70'>
                                      Pending...
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Info & Controls */}
                              <div className='min-w-0 flex-1'>
                                <div className='mb-2 flex items-start justify-between gap-2'>
                                  <div className='min-w-0'>
                                    <p className='truncate text-sm font-semibold text-foreground group-hover:text-primary'>
                                      {field.name}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                      🕒{' '}
                                      {format(
                                        new Date(field.uploadedAt!),
                                        'MMM dd, yyyy • h:mm a'
                                      )}
                                    </p>
                                  </div>

                                  <div className='flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
                                    {field.url && (
                                      <Button
                                        variant='ghost'
                                        size='icon'
                                        className='h-7 w-7 hover:bg-primary/10'
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          window.open(field.url, '_blank')
                                        }}
                                      >
                                        <Download className='h-3.5 w-3.5' />
                                      </Button>
                                    )}
                                    <Button
                                      variant='ghost'
                                      size='icon'
                                      className='h-7 w-7 text-destructive hover:bg-destructive/10'
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        URL.revokeObjectURL(field.url ?? '')
                                        remove(index)
                                      }}
                                    >
                                      <Trash2 className='h-3.5 w-3.5' />
                                    </Button>
                                  </div>
                                </div>

                                {/* ✅ FormField for Note - Now works without errors */}
                                <FormField
                                  control={form.control}
                                  name={`attachments.${index}.note`}
                                  render={({ field: noteField }) => (
                                    <FormItem className='mt-2'>
                                      <FormControl>
                                        <Input
                                          placeholder='Add note (optional)...'
                                          className='h-8 border-border bg-background text-xs'
                                          {...noteField}
                                          value={noteField.value ?? ''}
                                        />
                                      </FormControl>
                                      <FormMessage className='mt-1 text-xs' />
                                    </FormItem>
                                  )}
                                />

                                {/* DateInput Component - Replace <DateInput /> comment */}
                                <FormField
                                  control={form.control}
                                  name={`attachments.${index}.documentDate`}
                                  render={({ field }) => (
                                    <div className='mt-2'>
                                      {/* PASTE YOUR DATE PICKER COMPONENT HERE */}
                                      {/* Or use simple date input for now: */}
                                      <Input
                                        type='date'
                                        placeholder='Document date'
                                        className='h-8 text-xs'
                                        {...field}
                                        value={
                                          field.value
                                            ? format(field.value, 'yyyy-MM-dd')
                                            : ''
                                        }
                                        onChange={(e) =>
                                          field.onChange(
                                            e.target.value
                                              ? new Date(e.target.value)
                                              : undefined
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* ✅ File Upload - FIXED id conflict + better UX */}
                    <div className='mt-6 border-t border-border pt-4'>
                      <Input
                        type='file'
                        multiple
                        accept='image/*,.pdf,.doc,.docx,.xlsx,.xls'
                        className='hidden'
                        id='cheque-attachments-upload' // ← very unique name
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          if (files.length === 0) return

                          const now = new Date().toISOString()

                          const newItems = files.map((file) => ({
                            // id: crypto.randomUUID(),           // ← optional but recommended
                            name: file.name,
                            file,
                            uploadedAt: now,
                            url: URL.createObjectURL(file),
                            note: '',
                            documentDate: undefined,
                          }))

                          append(newItems)

                          // Very important: reset input so same file can be selected again
                          e.target.value = ''
                        }}
                      />

                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='w-full justify-start gap-2 border-dashed hover:border-primary hover:bg-primary/5'
                        onClick={() => {
                          // Most reliable way in 2024–2025
                          document
                            .getElementById('cheque-attachments-upload')
                            ?.click()
                        }}
                      >
                        <PlusCircle className='h-4 w-4 shrink-0' />
                        <span className='text-xs font-medium'>
                          Add Attachment(s)
                        </span>
                        <span className='ml-auto text-xs text-muted-foreground'>
                          (Images, PDF, Office)
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter className='gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Add Transaction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
