import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Fir } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const firColumns: ColumnDef<Fir>[] = [
  {
    accessorKey: 'crimeNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Crime Number' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>{row.getValue('crimeNo')}</div>
    ),
  },

  {
    accessorKey: 'policeStation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Police Station' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>
        {row.getValue('policeStation')}
      </div>
    ),
  },

  {
    accessorKey: 'accused',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Accused' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('accused')}</LongText>
    ),
  },

  {
    accessorKey: 'complainant',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Complainant' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>
        {row.getValue('complainant')}
      </LongText>
    ),
  },

  {
    accessorKey: 'witness',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Witness' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('witness')}</LongText>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>{row.getValue('date')}</div>
    ),
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
