import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type BusinessAccount } from '../../data/schema'
import { DataTableRowActions } from './data-table-row-actions-town'

export const townColumns: ColumnDef<BusinessAccount>[] = [
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
