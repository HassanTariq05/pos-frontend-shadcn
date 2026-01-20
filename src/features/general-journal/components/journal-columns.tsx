import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'

export const journalColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      if (row.original.entry_type !== 'DR') return null

      const date = new Date(row.original.created_at)
      return (
        <LongText className='max-w-36 ps-3 font-medium'>
          {date.toISOString().split('T')[0]}
        </LongText>
      )
    },
    enableHiding: false,
  },

  {
    accessorKey: 'transactionId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trx No' />
    ),
    cell: ({ row }) =>
      row.original.entry_type === 'DR' ? (
        <LongText className='max-w-40'>{row.original.transactionId}</LongText>
      ) : null,
    meta: { className: 'w-44' },
  },

  {
    accessorKey: 'account_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account' />
    ),
    cell: ({ row }) => {
      const isCredit = row.original.entry_type === 'CR'

      return (
        <div
          className={cn(
            'text-nowrap',
            isCredit ? 'ps-8 text-muted-foreground' : 'ps-2 font-medium'
          )}
        >
          {row.original.account_id}
        </div>
      )
    },
  },

  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) =>
      row.original.entry_type === 'DR' ? (
        <LongText className='max-w-64'>{row.original.description}</LongText>
      ) : null,
    enableSorting: false,
  },

  {
    id: 'debit',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Debit'
      />
    ),
    cell: ({ row }) =>
      row.original.entry_type === 'DR' ? (
        <div className='text-right font-medium text-emerald-600 dark:text-emerald-400'>
          {row.original.value.toLocaleString()}
        </div>
      ) : (
        <div className='text-right text-muted-foreground/70'>—</div>
      ),
    meta: {
      className: cn(
        'text-right font-medium tabular-nums',
        'min-w-[100px] max-w-[140px]'
      ),
    },
  },

  {
    id: 'credit',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Credit'
      />
    ),
    cell: ({ row }) =>
      row.original.entry_type === 'CR' ? (
        <div className='text-right font-medium text-red-600 dark:text-red-400'>
          {row.original.value.toLocaleString()}
        </div>
      ) : (
        <div className='text-right text-muted-foreground/70'>—</div>
      ),
    meta: {
      className: cn(
        'text-right font-medium tabular-nums',
        'min-w-[100px] max-w-[140px]'
      ),
    },
  },
]
