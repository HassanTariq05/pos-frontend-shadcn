import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type User } from '../data/schema'

export const cashbookColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('date')}</LongText>
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
    id: 'trxNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='TrxNo' />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      const fullName = `${firstName} ${lastName}`
      return <LongText className='max-w-36'>{fullName}</LongText>
    },
    meta: { className: 'w-36' },
  },

  {
    accessorKey: 'account',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>{row.getValue('account')}</div>
    ),
  },

  {
    accessorKey: 'town',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Town' />
    ),
    cell: ({ row }) => <div>{row.getValue('town')}</div>,
    enableSorting: false,
  },

  {
    accessorKey: 'particular',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Particular' />
    ),
    cell: ({ row }) => <div>{row.getValue('particular')}</div>,
    enableSorting: false,
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
]
