'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
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

const cashbookEntrySchema = z
  .object({
    date: z.string().min(1, 'Date is required'),
    account: z.string().min(1, 'Account is required'),
    town: z.string().optional(),
    particular: z.string().min(1, 'Particulars are required'),
    debit: z.coerce.number().min(0).default(0),
    credit: z.coerce.number().min(0).default(0),
  })
  .refine((data) => data.debit > 0 !== data.credit > 0, {
    message: 'Please enter either Debit or Credit amount (not both)',
    path: ['debit'],
  })

type CashbookEntryForm = z.infer<typeof cashbookEntrySchema>

type AddCashbookEntryDialogProps = {
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

export function AddCashbookEntryDialog({
  open,
  onOpenChange,
}: AddCashbookEntryDialogProps) {
  const form = useForm<CashbookEntryForm>({
    resolver: zodResolver(cashbookEntrySchema) as any,
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      account: '',
      town: '',
      particular: '',
      debit: 0,
      credit: 0,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (data: CashbookEntryForm) => {
    setIsSubmitting(true)

    // Generate simple trxNo (you can customize this logic)
    const trxNo = `TRX-${Date.now().toString().slice(-6)}-${new Date().getFullYear().toString().slice(2)}`

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Add Cashbook Entry</DialogTitle>
          <DialogDescription>
            Record a new transaction. Enter either Debit or Credit amount.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 py-2'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-full'>
              <label className='text-xs text-muted-foreground'>Date</label>
              <Input
                type='date'
                {...form.register('date')}
                className='mt-0.5 h-9 w-38'
              />
              {form.formState.errors.date && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>Account</label>

              <Popover open={openAccDropdown} onOpenChange={setOpenAccDropdown}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={openAccDropdown}
                    className='mt-0.5 h-9 w-full justify-between text-left font-normal'
                  >
                    {value
                      ? dummyAccounts.find((acc) => acc === value)
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
                              setValue(
                                currentValue === value ? '' : currentValue
                              )
                              setOpenAccDropdown(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                value === acc ? 'opacity-100' : 'opacity-0'
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

            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>Town</label>
              <Input
                placeholder='Karachi'
                {...form.register('town')}
                className='mt-0.5 h-9'
              />
            </div>

            <div className='col-span-12'>
              <label className='text-xs text-muted-foreground'>
                Particulars
              </label>
              <Input
                placeholder='Cash sales / Payment to supplier / ...'
                {...form.register('particular')}
                className='mt-0.5 h-9'
              />
              {form.formState.errors.particular && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.particular.message}
                </p>
              )}
            </div>

            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>Debit</label>
              <Input
                type='number'
                min='0'
                step='1'
                placeholder='0'
                {...form.register('debit', { valueAsNumber: true })}
                className='mt-0.5 h-9 text-right font-medium text-emerald-700'
              />
              {form.formState.errors.debit && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.debit.message}
                </p>
              )}
            </div>

            <div className='col-span-6'>
              <label className='text-xs text-muted-foreground'>Credit</label>
              <Input
                type='number'
                min='0'
                step='1'
                placeholder='0'
                {...form.register('credit', { valueAsNumber: true })}
                className='mt-0.5 h-9 text-right font-medium text-orange-700'
              />
              {form.formState.errors.credit && (
                <p className='mt-1 text-xs text-destructive'>
                  {form.formState.errors.credit.message}
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
