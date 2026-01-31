'use client'

import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AttachmentsManager,
  AttachmentsManagerRef,
} from '@/components/ui/attachments'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FormattedNumberInput } from '@/components/formatted-input'
import { Purchase } from '../data/schema'

const commissionRowSchema = z.object({
  agent: z.string().min(1, 'Agent is required'),
  totalCommission: z.number().min(0, 'Must be ≥ 0'),
  givenCommission: z.number().min(0, 'Must be ≥ 0'),
  note: z.string().optional(),
})

const miscellaneousRowSchema = z.object({
  amount: z.number().min(0, 'Must be ≥ 0'),
  description: z.string().optional(),
})

const documentsRowSchema = z.object({
  name: z.string().min(1, 'Document Name is required'),
  date: z.string().date({ message: 'Please select a valid date (YYYY-MM-DD)' }),
  note: z.string().optional(),
  received: z.boolean().optional().default(false),
})

const transactionsRowSchema = z.object({
  account: z.string().min(1, 'Account is required'),
  date: z.string().date({ message: 'Please select a valid date (YYYY-MM-DD)' }),
  amount: z.number().min(0, 'Must be ≥ 0'),
  description: z.string().optional(),
})

const chequeEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  submissionDate: z.string().min(1, 'Submission date is required'),
  product: z.string().min(1, 'Product is required'),
  vendor: z.string().min(1, 'Vendor is required'),
  manualPage: z.string().min(1, 'Manual Page of is required'),
  bank: z.string().min(1, 'Bank is required'),
  chequeNo: z.string().min(1, 'Cheque number is required'),
  accountName: z.string().min(1, 'Cheque account name is required'),
  submittedBy: z.string().min(1, 'Submitted by is required'),
  note: z.string().optional(),
  purchasePrice: z.coerce
    .number()
    .min(0.01, 'Purchase Price must be greater than 0'),
  commissions: z
    .array(commissionRowSchema)
    .min(0, 'At least one commission row is optional'),
  miscellaneous: z
    .array(miscellaneousRowSchema)
    .min(0, 'At least one miscellaneous row is optional'),

  documents: z
    .array(documentsRowSchema)
    .min(0, 'At least one document row is optional'),

  transactions: z
    .array(transactionsRowSchema)
    .min(0, 'At least one transaction row is optional'),
})

type ChequeEntryInput = z.input<typeof chequeEntrySchema>
type ChequeEntryOutput = z.output<typeof chequeEntrySchema>

type AddChequeEntryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Purchase
  isDisabled?: boolean
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

export function PurchasesActionDialog({
  open,
  onOpenChange,
  currentRow,
  isDisabled = false,
}: AddChequeEntryDialogProps) {
  const form = useForm<ChequeEntryInput, any, ChequeEntryOutput>({
    resolver: zodResolver(chequeEntrySchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      submissionDate: new Date().toISOString().split('T')[0],
      product: '',
      manualPage: '',
      bank: '',
      chequeNo: '',
      accountName: '',
      submittedBy: '',
      purchasePrice: 0,
      commissions: [],
      miscellaneous: [],
      documents: [],
      transactions: [],
    },
    mode: 'onChange',
  })

  const attachmentsRef = useRef<AttachmentsManagerRef>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openProductDropdown, setOpenProductDropdown] = useState(false)
  const [openAccountsDropdown, setOpenAccountDropdown] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(
    form.getValues('product') || ''
  )

  const [selectedAccount, setSelectedAccount] = useState(
    form.getValues('transactions.0.account') || ''
  )

  useEffect(() => {
    form.setValue('product', selectedProduct)
  }, [selectedProduct, form])

  const [openVendorDropdown, setOpenVendorDropdown] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState(
    form.getValues('vendor') || ''
  )

  useEffect(() => {
    form.setValue('vendor', selectedVendor)
  }, [selectedVendor, form])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'commissions',
  })

  const {
    fields: miscFields,
    append: miscAppend,
    remove: miscRemove,
  } = useFieldArray({
    control: form.control,
    name: 'miscellaneous',
  })

  const {
    fields: docsFields,
    append: docsAppend,
    remove: docsRemvoe,
  } = useFieldArray({
    control: form.control,
    name: 'documents',
  })

  const {
    fields: transactionsFields,
    append: transactionsAppend,
    remove: transactionsRemove,
  } = useFieldArray({
    control: form.control,
    name: 'transactions',
  })

  const onSubmit = (data: any) => {
    setIsSubmitting(true)
    console.log('Submitted cheque entry:', data)

    setTimeout(() => {
      form.reset()
      setIsSubmitting(false)
      onOpenChange(false)
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='mx-auto flex max-h-[96vh] w-[95vw] max-w-[95vw] flex-col p-4 sm:w-[90vw] sm:max-w-[90vw] sm:p-6 md:w-[85vw] md:max-w-[85vw] lg:w-[100vw] lg:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>
            {isDisabled ? 'View Purchase' : 'Add Purchase'}{' '}
          </DialogTitle>
          <DialogDescription>
            {' '}
            {isDisabled
              ? 'View product purchase.'
              : 'Create a new product purchase.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 py-2'
          >
            <div className='scrollbar-thin scrollbar-thumb-muted-foreground/30 -mx-1 max-h-[65vh] overflow-y-auto px-1'>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
                <div className='space-y-6 lg:col-span-5'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='product'
                      disabled={isDisabled}
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Product</FormLabel>
                          <Popover
                            open={isDisabled ? false : openProductDropdown}
                            onOpenChange={
                              isDisabled ? undefined : setOpenProductDropdown
                            }
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  disabled={isDisabled}
                                  aria-expanded={openProductDropdown}
                                  className={cn(
                                    'justify-between font-normal',
                                    'disabled:bg-background disabled:text-foreground disabled:opacity-100',
                                    'disabled:cursor-not-allowed',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? dummyAccounts.find(
                                        (Product) => Product === field.value
                                      )
                                    : 'Select product...'}
                                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='w-full p-0'>
                              <Command>
                                <CommandInput placeholder='Search product...' />
                                <CommandList>
                                  <CommandEmpty>No account found.</CommandEmpty>
                                  <CommandGroup>
                                    {dummyAccounts.map((Product) => (
                                      <CommandItem
                                        key={Product}
                                        value={Product}
                                        onSelect={() => {
                                          setSelectedProduct(
                                            Product === selectedProduct
                                              ? ''
                                              : Product
                                          )
                                          setOpenProductDropdown(false)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedProduct === Product
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                        {Product}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='date'
                      disabled={isDisabled}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isDisabled}
                              className='disabled:bg-background disabled:text-foreground disabled:opacity-100'
                              type='date'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='manualPage'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manual Page</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isDisabled}
                              className='disabled:bg-background disabled:text-foreground disabled:opacity-100'
                              placeholder='Enter manual page'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='vendor'
                      disabled={isDisabled}
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Party(Vendor)</FormLabel>
                          <Popover
                            open={isDisabled ? false : openVendorDropdown}
                            onOpenChange={
                              isDisabled ? undefined : setOpenVendorDropdown
                            }
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  disabled={isDisabled}
                                  aria-expanded={openVendorDropdown}
                                  className={cn(
                                    'justify-between font-normal',
                                    'disabled:bg-background disabled:text-foreground disabled:opacity-100',
                                    'disabled:cursor-not-allowed',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? dummyAccounts.find(
                                        (Vendor) => Vendor === field.value
                                      )
                                    : 'Select vendor...'}
                                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='w-full p-0'>
                              <Command>
                                <CommandInput placeholder='Search vendor...' />
                                <CommandList>
                                  <CommandEmpty>No account found.</CommandEmpty>
                                  <CommandGroup>
                                    {dummyAccounts.map((Vendor) => (
                                      <CommandItem
                                        key={Vendor}
                                        value={Vendor}
                                        onSelect={() => {
                                          setSelectedVendor(
                                            Vendor === selectedVendor
                                              ? ''
                                              : Vendor
                                          )
                                          setOpenVendorDropdown(false)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedVendor === Vendor
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                        {Vendor}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='purchasePrice'
                      disabled={isDisabled}
                      render={({ field }) => {
                        const formattedValue =
                          typeof field.value === 'number' && !isNaN(field.value)
                            ? new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(Math.floor(field.value))
                            : ''

                        return (
                          <FormItem>
                            <FormLabel>Purchase Price</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isDisabled}
                                type='text'
                                inputMode='numeric'
                                pattern='[0-9]*'
                                placeholder='0'
                                className='text-right font-medium text-emerald-700 disabled:bg-background disabled:opacity-100'
                                value={formattedValue}
                                onChange={(e) => {
                                  const raw = e.target.value
                                    .replace(/,/g, '')
                                    .replace(/[^0-9]/g, '')

                                  const numberValue =
                                    raw === '' ? '' : Number(raw)

                                  field.onChange(
                                    typeof numberValue === 'number' &&
                                      !isNaN(numberValue)
                                      ? numberValue
                                      : ''
                                  )
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='note'
                    disabled={isDisabled}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            className='disabled:bg-background disabled:text-foreground disabled:opacity-100'
                            placeholder='Enter notes'
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <AttachmentsManager
                    ref={attachmentsRef}
                    className='h-[67vh] lg:col-span-2'
                    disabled={isDisabled}
                    // optional props:
                    // maxFiles={5}
                    // accept="image/*,application/pdf"
                    // initialAttachments={[]}
                    // onChange={(atts) => console.log('Attachments changed:', atts)}
                  />
                </div>

                <div className='space-y-2 lg:col-span-7'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-medium'>Commissions</h3>
                    {!isDisabled && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          append({
                            agent: '',
                            totalCommission: 0,
                            givenCommission: 0,
                            note: '',
                          })
                        }
                      >
                        <Plus className='mr-2 h-4 w-4' />
                        Add Row
                      </Button>
                    )}
                  </div>

                  {fields.length === 0 ? (
                    <div className='rounded-md border border-dashed py-4 text-center text-muted-foreground'>
                      No commissions yet.
                    </div>
                  ) : (
                    <div className='overflow-hidden rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className='w-28'>Agent</TableHead>
                            <TableHead className='w-28 text-right'>
                              Total
                            </TableHead>
                            <TableHead className='w-28 text-right'>
                              Given
                            </TableHead>
                            <TableHead className='w-28 text-right'>
                              Remaining
                            </TableHead>
                            <TableHead>Note</TableHead>
                            {!isDisabled && (
                              <TableHead className='w-12'></TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fields.map((field, index) => {
                            const total =
                              form.watch(
                                `commissions.${index}.totalCommission`
                              ) || 0
                            const given =
                              form.watch(
                                `commissions.${index}.givenCommission`
                              ) || 0
                            const remaining = total - given

                            return (
                              <TableRow key={field.id}>
                                <TableCell className='w-40 max-w-[30rem] min-w-[13rem]'>
                                  <FormField
                                    control={form.control}
                                    name={`commissions.${index}.agent`}
                                    render={({ field }) => (
                                      <FormItem className='mb-0'>
                                        <FormControl>
                                          <Input
                                            disabled={isDisabled}
                                            placeholder='Agent name...'
                                            {...field}
                                            className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`commissions.${index}.totalCommission`}
                                    render={({ field }) => (
                                      <FormattedNumberInput
                                        field={field}
                                        disabled={isDisabled}
                                        className='font-medium text-emerald-700 disabled:bg-background disabled:text-emerald-700 disabled:opacity-100'
                                      />
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`commissions.${index}.givenCommission`}
                                    render={({ field }) => (
                                      <FormattedNumberInput
                                        field={field}
                                        disabled={isDisabled}
                                        className='font-medium text-emerald-700 disabled:bg-background disabled:text-emerald-700 disabled:opacity-100'
                                      />
                                    )}
                                  />
                                </TableCell>

                                <TableCell className='text-right font-medium'>
                                  {remaining >= 0 ? (
                                    <span className='text-emerald-600'>
                                      {remaining.toLocaleString()}
                                    </span>
                                  ) : (
                                    <span className='text-red-600'>
                                      {remaining.toLocaleString()}
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className='w-full'>
                                        {' '}
                                        {/* wrapper div to make trigger reliable */}
                                        <FormField
                                          control={form.control}
                                          name={`commissions.${index}.note`}
                                          render={({ field }) => (
                                            <Input
                                              disabled={isDisabled}
                                              placeholder='Remark...'
                                              className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                              {...field}
                                            />
                                          )}
                                        />
                                      </div>
                                    </TooltipTrigger>

                                    <TooltipContent side='top'>
                                      {form
                                        .watch(`commissions.${index}.note`)
                                        ?.trim()
                                        ? form.watch(
                                            `commissions.${index}.note`
                                          )
                                        : 'No note added yet • Click to add remark'}
                                    </TooltipContent>
                                  </Tooltip>
                                </TableCell>

                                {!isDisabled && (
                                  <TableCell>
                                    <Button
                                      type='button'
                                      variant='ghost'
                                      size='icon'
                                      className='h-8 w-8 text-destructive hover:text-destructive/90'
                                      onClick={() => remove(index)}
                                    >
                                      <Trash2 className='h-4 w-4' />
                                    </Button>
                                  </TableCell>
                                )}
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {fields.length > 0 && (
                    <div className='pt-2 pr-2 text-right font-medium'>
                      Total Commission:{' '}
                      {fields
                        .reduce(
                          (sum, _, i) =>
                            sum +
                            (form.watch(`commissions.${i}.totalCommission`) ||
                              0),
                          0
                        )
                        .toLocaleString()}
                    </div>
                  )}

                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-medium'>Miscellaneous</h3>

                    {!isDisabled && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          miscAppend({
                            amount: 0,
                            description: '',
                          })
                        }
                      >
                        <Plus className='mr-2 h-4 w-4' />
                        Add Row
                      </Button>
                    )}
                  </div>

                  {miscFields.length === 0 ? (
                    <div className='rounded-md border border-dashed py-4 text-center text-muted-foreground'>
                      No miscellaneous yet.
                    </div>
                  ) : (
                    <div className='overflow-hidden rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className='w-28'>Amount</TableHead>
                            <TableHead className='w-3/4'>Description</TableHead>
                            {!isDisabled && (
                              <TableHead className='w-12'></TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {miscFields.map((field, index) => {
                            return (
                              <TableRow key={field.id}>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`miscellaneous.${index}.amount`}
                                    render={({ field }) => (
                                      <FormattedNumberInput
                                        field={field}
                                        disabled={isDisabled}
                                        className='font-medium text-emerald-700 disabled:bg-background disabled:text-emerald-700 disabled:opacity-100'
                                      />
                                    )}
                                  />
                                </TableCell>

                                <TableCell>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className='w-full'>
                                        <FormField
                                          control={form.control}
                                          name={`miscellaneous.${index}.description`}
                                          render={({ field }) => (
                                            <Input
                                              disabled={isDisabled}
                                              placeholder='Description...'
                                              className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                              {...field}
                                            />
                                          )}
                                        />
                                      </div>
                                    </TooltipTrigger>

                                    {form
                                      .watch(
                                        `miscellaneous.${index}.description`
                                      )
                                      ?.trim() && (
                                      <TooltipContent
                                        side='top'
                                        align='start'
                                        className='max-w-xs'
                                      >
                                        {form.watch(
                                          `miscellaneous.${index}.description`
                                        )}
                                      </TooltipContent>
                                    )}
                                  </Tooltip>
                                </TableCell>

                                {!isDisabled && (
                                  <TableCell>
                                    <Button
                                      type='button'
                                      variant='ghost'
                                      size='icon'
                                      className='h-8 w-8 text-destructive hover:text-destructive/90'
                                      onClick={() => miscRemove(index)}
                                    >
                                      <Trash2 className='h-4 w-4' />
                                    </Button>
                                  </TableCell>
                                )}
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {fields.length > 0 && (
                    <div className='pt-2 pr-2 text-right font-medium'>
                      Total Miscellaneous:{' '}
                      {fields
                        .reduce(
                          (sum, _, i) =>
                            sum +
                            (form.watch(`miscellaneous.${i}.amount`) || 0),
                          0
                        )
                        .toLocaleString()}
                    </div>
                  )}

                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-medium'>Documents</h3>
                    {!isDisabled && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          docsAppend({
                            name: '',
                            date: new Date().toISOString().split('T')[0],
                            note: '',
                            received: false,
                          })
                        }
                      >
                        <Plus className='mr-2 h-4 w-4' />
                        Add Row
                      </Button>
                    )}
                  </div>

                  {docsFields.length === 0 ? (
                    <div className='rounded-md border border-dashed py-4 text-center text-muted-foreground'>
                      No documents yet.
                    </div>
                  ) : (
                    <div className='overflow-hidden rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className='w-28'>
                              Document Name
                            </TableHead>
                            <TableHead className='w-28'>Date</TableHead>
                            <TableHead className='w-28'>Note</TableHead>
                            <TableHead className='w-28'>Received</TableHead>
                            {!isDisabled && (
                              <TableHead className='w-12'></TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {docsFields.map((field, index) => {
                            return (
                              <TableRow key={field.id}>
                                <TableCell>
                                  <div className='w-full'>
                                    <FormField
                                      control={form.control}
                                      name={`documents.${index}.name`}
                                      render={({ field }) => (
                                        <Input
                                          disabled={isDisabled}
                                          placeholder='Document name...'
                                          className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                          {...field}
                                        />
                                      )}
                                    />
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div className='w-full'>
                                    <FormField
                                      control={form.control}
                                      name={`documents.${index}.date`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input
                                              disabled={isDisabled}
                                              type='date'
                                              className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className='w-full'>
                                        <FormField
                                          control={form.control}
                                          name={`documents.${index}.note`}
                                          render={({ field }) => (
                                            <Input
                                              disabled={isDisabled}
                                              placeholder='Enter Note...'
                                              className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                              {...field}
                                            />
                                          )}
                                        />
                                      </div>
                                    </TooltipTrigger>

                                    <TooltipContent side='top'>
                                      {form
                                        .watch(`documents.${index}.note`)
                                        ?.trim()
                                        ? form.watch(`documents.${index}.note`)
                                        : 'No note added yet • Click to add note'}
                                    </TooltipContent>
                                  </Tooltip>
                                </TableCell>
                                <TableCell className='text-center'>
                                  <FormField
                                    control={form.control}
                                    name={`documents.${index}.received`}
                                    render={({ field }) => (
                                      <FormItem className='flex items-center justify-center space-y-0'>
                                        <FormControl>
                                          <Checkbox
                                            disabled={isDisabled}
                                            className={cn(
                                              'justify-between font-normal',
                                              'disabled:bg-background disabled:text-foreground disabled:opacity-100',
                                              'disabled:cursor-not-allowed',
                                              !field.value &&
                                                'text-muted-foreground'
                                            )}
                                            checked={field.value ?? false}
                                            onCheckedChange={field.onChange}
                                            aria-label='Received'
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                                {!isDisabled && (
                                  <TableCell>
                                    <Button
                                      type='button'
                                      variant='ghost'
                                      size='icon'
                                      className='h-8 w-8 text-destructive hover:text-destructive/90'
                                      onClick={() => docsRemvoe(index)}
                                    >
                                      <Trash2 className='h-4 w-4' />
                                    </Button>
                                  </TableCell>
                                )}
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-medium'>Transactions</h3>
                    {!isDisabled && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          transactionsAppend({
                            account: '',
                            date: new Date().toISOString().split('T')[0],
                            amount: 0,
                            description: '',
                          })
                        }
                      >
                        <Plus className='mr-2 h-4 w-4' />
                        Add Row
                      </Button>
                    )}
                  </div>

                  {transactionsFields.length === 0 ? (
                    <div className='rounded-md border border-dashed py-4 text-center text-muted-foreground'>
                      No transactions yet.
                    </div>
                  ) : (
                    <div className='overflow-hidden rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className='w-28'>Account</TableHead>
                            <TableHead className='w-28'>Date</TableHead>
                            <TableHead className='w-28'>Amount</TableHead>
                            <TableHead className='w-28'>Description</TableHead>
                            {!isDisabled && (
                              <TableHead className='w-12'></TableHead>
                            )}
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {transactionsFields.map((field, index) => (
                            <TableRow key={field.id}>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`transactions.${index}.account`}
                                  render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                      <Popover
                                        open={
                                          isDisabled
                                            ? false
                                            : openAccountsDropdown
                                        }
                                        onOpenChange={
                                          isDisabled
                                            ? undefined
                                            : setOpenAccountDropdown
                                        }
                                      >
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant='outline'
                                              role='combobox'
                                              disabled={isDisabled}
                                              aria-expanded={
                                                openAccountsDropdown
                                              }
                                              className={cn(
                                                'justify-between font-normal',
                                                'disabled:bg-background disabled:text-foreground disabled:opacity-100',
                                                'disabled:cursor-not-allowed',
                                                !field.value &&
                                                  'text-muted-foreground'
                                              )}
                                            >
                                              {field.value
                                                ? dummyAccounts.find(
                                                    (acc) => acc === field.value
                                                  )
                                                : 'Select account...'}
                                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent className='w-full p-0'>
                                          <Command>
                                            <CommandInput placeholder='Search account...' />
                                            <CommandList>
                                              <CommandEmpty>
                                                No account found.
                                              </CommandEmpty>
                                              <CommandGroup>
                                                {dummyAccounts.map((acc) => (
                                                  <CommandItem
                                                    key={acc}
                                                    value={acc}
                                                    onSelect={() => {
                                                      setSelectedAccount(
                                                        acc === selectedAccount
                                                          ? ''
                                                          : acc
                                                      )
                                                      setOpenAccountDropdown(
                                                        false
                                                      )
                                                    }}
                                                  >
                                                    <Check
                                                      className={cn(
                                                        'mr-2 h-4 w-4',
                                                        selectedAccount === acc
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

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>

                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`transactions.${index}.date`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          disabled={isDisabled}
                                          className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                          type='date'
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>

                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`transactions.${index}.amount`}
                                  render={({ field }) => (
                                    <FormattedNumberInput
                                      field={field}
                                      disabled={isDisabled}
                                      className='font-medium text-emerald-700 disabled:bg-background disabled:text-emerald-700 disabled:opacity-100'
                                    />
                                  )}
                                />
                              </TableCell>

                              <TableCell>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className='w-full'>
                                      <FormField
                                        control={form.control}
                                        name={`transactions.${index}.description`}
                                        render={({ field }) => (
                                          <Input
                                            disabled={isDisabled}
                                            placeholder='Enter Description...'
                                            className='w-full disabled:bg-background disabled:text-foreground disabled:opacity-100'
                                            {...field}
                                          />
                                        )}
                                      />
                                    </div>
                                  </TooltipTrigger>

                                  <TooltipContent side='top'>
                                    {form
                                      .watch(
                                        `transactions.${index}.description`
                                      )
                                      ?.trim()
                                      ? form.watch(
                                          `transactions.${index}.description`
                                        )
                                      : 'No description added yet • Click to add description'}
                                  </TooltipContent>
                                </Tooltip>
                              </TableCell>

                              {!isDisabled && (
                                <TableCell>
                                  <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='h-8 w-8 text-destructive hover:text-destructive/90'
                                    onClick={() => transactionsRemove(index)}
                                  >
                                    <Trash2 className='h-4 w-4' />
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {transactionsFields.length > 0 && (
                    <div className='pt-2 pr-2 text-right font-medium'>
                      Total Transaction:{' '}
                      {transactionsFields
                        .reduce(
                          (sum, _, i) =>
                            sum + (form.watch(`transactions.${i}.amount`) || 0),
                          0
                        )
                        .toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          {!isDisabled && (
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
                {isSubmitting ? 'Saving...' : 'Add Cheque'}
              </Button>
            </DialogFooter>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}
