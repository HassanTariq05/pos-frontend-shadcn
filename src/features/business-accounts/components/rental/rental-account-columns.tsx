import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type BusinessAccount } from '../../data/schema'
import { DataTableRowActions } from './data-table-row-actions-rentals'

export const rentalAccountColumns: ColumnDef<BusinessAccount>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-66'>{row.getValue('title')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      return (
        <LongText className='max-w-116'>{row.getValue('description')}</LongText>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      return <LongText className='max-w-116'>{row.getValue('phone')}</LongText>
    },
  },
  {
    accessorKey: 'debit',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Debit'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('debit')
      return amount && amount > 0 ? (
        <div className='text-right font-medium text-emerald-600 dark:text-emerald-400'>
          {amount.toLocaleString()}
        </div>
      ) : (
        <div className='text-right text-muted-foreground/70'>—</div>
      )
    },
    meta: {
      className: cn(
        'text-right font-medium tabular-nums',
        'min-w-[100px] max-w-[140px]'
      ),
    },
  },
  {
    accessorKey: 'credit',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Credit'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('credit')
      return amount && amount > 0 ? (
        <div className='text-right font-medium text-red-600 dark:text-red-400'>
          {amount.toLocaleString()}
        </div>
      ) : (
        <div className='text-right text-muted-foreground/70'>—</div>
      )
    },
    meta: {
      className: cn(
        'text-right font-medium tabular-nums',
        'min-w-[100px] max-w-[140px]'
      ),
    },
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Balance'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('balance')
      return amount && amount > 0 ? (
        <div className='text-right font-medium text-emerald-600 dark:text-emerald-400'>
          {amount.toLocaleString()}
        </div>
      ) : (
        <div className='text-right text-muted-foreground/70'>—</div>
      )
    },
    meta: {
      className: cn(
        'text-right font-medium tabular-nums',
        'min-w-[100px] max-w-[140px]'
      ),
    },
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Action'
        className='justify-center'
      />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <DataTableRowActions row={row} />
      </div>
    ),
    meta: {
      className: 'text-center',
    },
  },
]
