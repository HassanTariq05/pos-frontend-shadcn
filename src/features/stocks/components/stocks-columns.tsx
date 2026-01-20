import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Product } from '../data/schema'

export const stocksColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'manualPage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Manual Page' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>
        {row.getValue('manualPage')}
      </LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>
        {row.getValue('productName')}
      </LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'variant',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Variant' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>{row.getValue('variant')}</div>
    ),
  },
  {
    accessorKey: 'modelNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Model' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>
        {row.getValue('modelNumber')}
      </div>
    ),
  },
  {
    accessorKey: 'engineNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Engine Number' />
    ),
    cell: ({ row }) => <div>{row.getValue('engineNumber')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'chassisNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Chassis Number' />
    ),
    cell: ({ row }) => <div>{row.getValue('chassisNumber')}</div>,
    enableSorting: false,
  },
]
