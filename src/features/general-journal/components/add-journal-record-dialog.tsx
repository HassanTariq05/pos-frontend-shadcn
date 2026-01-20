'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const journalEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  creditAccount: z.string().min(1, 'Credit Account is required'),
  debitAccount: z.string().min(1, 'Debit Account is required'),
  town: z.string().optional(),
  description: z.string().min(1, 'Description are required'),
  amount: z.coerce.number().min(0).default(0),
})

type JournalEntryForm = z.infer<typeof journalEntrySchema>

type AddJournalEntryDialogProps = {
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

export function AddJournalEntryDialog({
  open,
  onOpenChange,
}: AddJournalEntryDialogProps) {
  const form = useForm<JournalEntryForm>({
    resolver: zodResolver(journalEntrySchema) as any,
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      creditAccount: '',
      debitAccount: '',
      town: '',
      description: '',
      amount: 0,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (data: JournalEntryForm) => {
    setIsSubmitting(true)

    // Generate simple trxNo (you can customize this logic)
    const trxNo = `TRX-${Date.now().toString().slice(-6)}-${new Date().getFullYear().toString().slice(2)}`

    // Reset & close
    form.reset()
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const [openCreditAccDropdown, setOpenCreditAccDropdown] = useState(false)
  const [creditAccValue, setCreditAccValue] = useState(
    form.watch('creditAccount') || ''
  )

  useEffect(() => {
    form.setValue('creditAccount', creditAccValue)
  }, [creditAccValue, form])

  const [openDebitAccDropdown, setOpenDebitAccDropdown] = useState(false)
  const [debitAccValue, setDebitAccValue] = useState(
    form.watch('debitAccount') || ''
  )

  useEffect(() => {
    form.setValue('debitAccount', debitAccValue)
  }, [debitAccValue, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Add Journal Entry</DialogTitle>
          <DialogDescription>
            Record a new transaction. Enter either Debit or Credit amount.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 py-2'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>
                Debit Account
              </label>

              <Popover
                open={openDebitAccDropdown}
                onOpenChange={setOpenDebitAccDropdown}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={openDebitAccDropdown}
                    className='mt-0.5 h-9 w-full justify-between text-left font-normal'
                  >
                    {debitAccValue
                      ? dummyAccounts.find((acc) => acc === debitAccValue)
                      : 'Select account...'}
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
                              setDebitAccValue(
                                currentValue === debitAccValue
                                  ? ''
                                  : currentValue
                              )
                              setOpenCreditAccDropdown(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                debitAccValue === acc
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

              {form.formState.errors.debitAccount && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.debitAccount.message}
                </p>
              )}
            </div>

            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>
                Credit Account
              </label>

              <Popover
                open={openCreditAccDropdown}
                onOpenChange={setOpenCreditAccDropdown}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={openCreditAccDropdown}
                    className='mt-0.5 h-9 w-full justify-between text-left font-normal'
                  >
                    {creditAccValue
                      ? dummyAccounts.find((acc) => acc === creditAccValue)
                      : 'Select account...'}
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
                              setCreditAccValue(
                                currentValue === creditAccValue
                                  ? ''
                                  : currentValue
                              )
                              setOpenCreditAccDropdown(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                creditAccValue === acc
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

              {form.formState.errors.creditAccount && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.creditAccount.message}
                </p>
              )}
            </div>

            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>Date</label>
              <Input
                type='date'
                {...form.register('date')}
                className='mt-0.5 h-9'
              />
              {form.formState.errors.date && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>Amount</label>

              <Controller
                control={form.control}
                name='amount'
                render={({ field }) => (
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
                    className='mt-0.5 h-9 text-right font-medium text-emerald-700'
                  />
                )}
              />

              {form.formState.errors.amount && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>

            <div className='col-span-12'>
              <label className='text-xs text-muted-foreground'>
                Description
              </label>
              <Input
                placeholder='Cash sales / Payment to supplier / ...'
                {...form.register('description')}
                className='mt-0.5 h-9'
              />
              {form.formState.errors.description && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
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
        </form>
      </DialogContent>
    </Dialog>
  )
}
