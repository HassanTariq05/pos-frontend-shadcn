'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { type Product } from '../data/schema'

const formSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  variant: z.string().min(1, 'Variant is required.'),
  modelNumber: z.coerce.number().min(1, 'Model number is required.'),
  engineNumber: z.string().min(1, 'Engine number is required.'),
  chassisNumber: z.string().min(1, 'Chassis number is required.'),
})

type ProductFormInput = z.input<typeof formSchema>

type ProductActionDialogProps = {
  currentRow?: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ProductActionDialogProps) {
  const isEdit = !!currentRow

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          productName: currentRow.productName,
          variant: currentRow.variant,
          modelNumber: currentRow.modelNumber,
          engineNumber: currentRow.engineNumber,
          chassisNumber: currentRow.chassisNumber,
        }
      : {
          productName: '',
          variant: '',
          modelNumber: undefined,
          engineNumber: '',
          chassisNumber: '',
        },
  })

  const onSubmit = (values: any) => {
    console.log(values)
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='flex max-h-[90vh] flex-col sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the product details.' : 'Create a new product.'}
          </DialogDescription>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto pr-2'>
          <Form {...form}>
            <form
              id='product-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='productName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Tractor X' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='variant'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant</FormLabel>
                    <FormControl>
                      <Input placeholder='480s' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='modelNumber'
                render={({ field }) => {
                  const value =
                    typeof field.value === 'number' ? field.value : ''

                  return (
                    <FormItem>
                      <FormLabel>Model Number</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          value={value}
                          placeholder='2025'
                          onChange={(e) => {
                            const v = e.target.value
                            field.onChange(v === '' ? undefined : Number(v))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name='engineNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine Number</FormLabel>
                    <FormControl>
                      <Input placeholder='ENGX1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='chassisNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chassis Number</FormLabel>
                    <FormControl>
                      <Input placeholder='CHX1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='product-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
