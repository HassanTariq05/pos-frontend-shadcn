import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
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

  description: z
    .string()
    .max(160, 'Description must not exceed 160 characters.')
    .optional(),

  phone: z.string().max(20, 'Phone number is too long.').optional(),

  email: z.string().max(0).or(z.string().email()),

  address: z
    .string()
    .max(160, 'Address must not exceed 160 characters.')
    .optional(),

  balance: z.number().min(0, 'Balance cannot be negative.'),
})

type FormForm = z.infer<typeof formSchema>

export function OwnersMutateDrawer({
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
        }
      : {
          title: '',
          description: '',
          phone: '',
          email: '',
          address: '',
          balance: 0,
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
            {isUpdate ? 'Update' : 'Create'} Owner Account
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
