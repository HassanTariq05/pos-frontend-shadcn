'use client'

import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AttachmentsManager,
  AttachmentsManagerRef,
} from '@/components/ui/attachments'
import { Button } from '@/components/ui/button'
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

const chequeEntrySchema = z.object({
  chequeDate: z.string().min(1, 'Cheque date is required'),
  submissionDate: z.string().min(1, 'Submission date is required'),
  account: z.string().min(1, 'Account / Vendor is required'),
  broker: z.string().min(1, 'Broker / Care of is required'),
  bank: z.string().min(1, 'Bank is required'),
  chequeNo: z.string().min(1, 'Cheque number is required'),
  accountName: z.string().min(1, 'Cheque account name is required'),
  submittedBy: z.string().min(1, 'Submitted by is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
})

type ChequeEntryInput = z.input<typeof chequeEntrySchema>
type ChequeEntryOutput = z.output<typeof chequeEntrySchema>

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
  const form = useForm<ChequeEntryInput, any, ChequeEntryOutput>({
    resolver: zodResolver(chequeEntrySchema),
    defaultValues: {
      chequeDate: new Date().toISOString().split('T')[0],
      submissionDate: new Date().toISOString().split('T')[0],
      account: '',
      broker: '',
      bank: '',
      chequeNo: '',
      accountName: '',
      submittedBy: '',
      amount: 0,
    },
    mode: 'onChange',
  })

  const attachmentsRef = useRef<AttachmentsManagerRef>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openAccDropdown, setOpenAccDropdown] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(
    form.getValues('account') || ''
  )

  useEffect(() => {
    form.setValue('account', selectedAccount)
  }, [selectedAccount, form])

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
      <DialogContent className='sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Add Cheque</DialogTitle>
          <DialogDescription>Create a new cheque entry.</DialogDescription>
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
                      name='account'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Vendor / Customer</FormLabel>
                          <Popover
                            open={openAccDropdown}
                            onOpenChange={setOpenAccDropdown}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  aria-expanded={openAccDropdown}
                                  className={cn(
                                    'justify-between font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? dummyAccounts.find(
                                        (acc) => acc === field.value
                                      )
                                    : 'Select vendor/customer...'}
                                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                              </FormControl>
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
                                        onSelect={() => {
                                          setSelectedAccount(
                                            acc === selectedAccount ? '' : acc
                                          )
                                          setOpenAccDropdown(false)
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

                    <FormField
                      control={form.control}
                      name='broker'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Broker / Care of</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter broker / care of'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='bank'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter bank name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='chequeNo'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cheque No</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter cheque number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='accountName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cheque Account Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter account name on cheque'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='amount'
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
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                inputMode='numeric'
                                pattern='[0-9]*'
                                placeholder='0'
                                className='text-right font-medium text-emerald-700'
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

                    <FormField
                      control={form.control}
                      name='chequeDate'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cheque Date</FormLabel>
                          <FormControl>
                            <Input type='date' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='submissionDate'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Submission</FormLabel>
                          <FormControl>
                            <Input type='date' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='submittedBy'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Submitted By</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                {isSubmitting ? 'Saving...' : 'Add Cheque'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
