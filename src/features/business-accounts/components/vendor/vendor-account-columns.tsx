import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type BusinessAccount } from '../../data/schema'
import { DataTableRowActions } from './data-table-row-actions-vendors'

export const vendorAccountColumns: ColumnDef<BusinessAccount>[] = [
  {
    accessorKey: 'account',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account' />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-64'>{row.getValue('title')}</LongText>
    ),
  },
  {
    accessorKey: 'urduName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Urdu Name' />
    ),
    cell: ({ row }) => (
      <span className='font-urdu'>{row.getValue('urduName')}</span>
    ),
  },
  {
    accessorKey: 'town',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Town' />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    cell: ({ row }) => (
      <span className='font-mono'>{row.getValue('phone')}</span>
    ),
  },
  {
    accessorKey: 'openingBalance',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Opening Balance'
        className='justify-end'
      />
    ),
    cell: ({ row }) => (
      <div className='text-right'>
        {row.getValue<number>('openingBalance').toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: 'credit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Credit'
        className='justify-end'
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('credit')
      return value > 0 ? (
        <div className='text-right text-red-600'>{value.toLocaleString()}</div>
      ) : (
        <div className='text-right text-muted-foreground'>—</div>
      )
    },
  },
  {
    accessorKey: 'debit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Debit'
        className='justify-end'
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('debit')
      return value > 0 ? (
        <div className='text-right text-emerald-600'>
          {value.toLocaleString()}
        </div>
      ) : (
        <div className='text-right text-muted-foreground'>—</div>
      )
    },
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Balance'
        className='justify-end'
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('balance')
      return (
        <div
          className={cn(
            'text-right font-medium',
            value < 0 ? 'text-red-600' : 'text-emerald-600'
          )}
        >
          {value.toLocaleString()}
        </div>
      )
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
  },
]
