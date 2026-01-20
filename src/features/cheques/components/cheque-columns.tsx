import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Cheque } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const chequeColumns: ColumnDef<Cheque>[] = [
  {
    id: 'account',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer/Vendor' />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      const fullName = `${firstName} ${lastName}`
      return <LongText className='max-w-36'>{fullName}</LongText>
    },
    meta: { className: 'w-36' },
    enableSorting: true,
  },

  {
    id: 'broker',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Broker/Care of' />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      const fullName = `${firstName} ${lastName}`
      return <LongText className='max-w-36'>{fullName}</LongText>
    },
    meta: { className: 'w-36' },
  },

  {
    accessorKey: 'bank',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bank' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>{row.getValue('bank')}</div>
    ),
  },

  {
    accessorKey: 'chequeNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cheque No' />
    ),
    cell: ({ row }) => <div>{row.getValue('chequeNo')}</div>,
    enableSorting: false,
  },

  {
    accessorKey: 'accountName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account Name' />
    ),
    cell: ({ row }) => <div>{row.getValue('accountName')}</div>,
    enableSorting: false,
  },

  {
    accessorKey: 'chequeDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cheque Date' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>
        {row.getValue('chequeDate')}
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
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Amount'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('amount')
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
    accessorKey: 'submittedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Submitted By' />
    ),
    cell: ({ row }) => <div>{row.getValue('submittedBy')}</div>,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
