import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Purchase } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const purchasesColumns: ColumnDef<Purchase>[] = [
  // ────────────────────────────────────────────────
  // Left-sticky / most important columns
  // ────────────────────────────────────────────────
  {
    accessorKey: 'purchaseName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-40 ps-3'>
        {row.getValue('purchaseName')}
      </LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-0 z-10 bg-background',
        '@4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
    size: 180,
  },

  {
    accessorKey: 'manualPage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Manual Page' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-32 ps-3'>
        {row.getValue('manualPage') ?? '—'}
      </LongText>
    ),

    enableHiding: false,
    size: 140,
  },

  // ────────────────────────────────────────────────
  // Vehicle / identification columns
  // ────────────────────────────────────────────────
  {
    accessorKey: 'variant',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Variant' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>
        {row.getValue('variant') ?? '—'}
      </div>
    ),
    size: 160,
  },

  {
    accessorKey: 'modelNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Model' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>
        {row.getValue('modelNumber') ?? '—'}
      </div>
    ),
    size: 110,
  },

  {
    accessorKey: 'engineNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Engine No.' />
    ),
    cell: ({ row }) => (
      <div className='text-sm text-muted-foreground'>
        {row.getValue('engineNumber') ?? '—'}
      </div>
    ),
    enableSorting: false,
    size: 140,
  },

  {
    accessorKey: 'chassisNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Chassis No.' />
    ),
    cell: ({ row }) => (
      <div className='text-sm text-muted-foreground'>
        {row.getValue('chassisNumber') ?? '—'}
      </div>
    ),
    enableSorting: false,
    size: 160,
  },

  // ────────────────────────────────────────────────
  // Transaction / financial columns
  // ────────────────────────────────────────────────
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue<Date>('date')
      return <div className='w-fit ps-2 text-nowrap'>{date.toString()}</div>
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5'
      ),
    },
    enableHiding: false,
    size: 130,
  },

  {
    accessorKey: 'party',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Party' />
    ),
    cell: ({ row }) => {
      const party = row.getValue<string>('party') ?? '—'
      return (
        <div
          className='max-w-44 truncate ps-2 text-sm'
          title={party !== '—' ? party : undefined}
        >
          <LongText>{party}</LongText>
        </div>
      )
    },
    size: 180,
    minSize: 140,
    maxSize: 240,
  },

  {
    accessorKey: 'commissionAgents',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Commission Agent(s)' />
    ),
    cell: ({ row }) => {
      const agents = (row.getValue<string>('commissionAgents') ?? '')
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean)

      return (
        <div className='max-w-60 ps-2 text-sm'>
          {agents.length === 0 ? (
            '—'
          ) : (
            <ul className='list-inside list-disc space-y-0.5'>
              {agents.map((agent, i) => (
                <li key={i} className='line-clamp-1'>
                  {agent}
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    },
    size: 240,
  },
  // ────────────────────────────────────────────────
  // Money columns – right aligned
  // ────────────────────────────────────────────────
  {
    accessorKey: 'purchasePrice',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Purchase Price'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('purchasePrice')
      return (
        <div className='pr-4 text-right font-medium tabular-nums'>
          {amount && amount > 0 ? `Rs. ${amount.toLocaleString('en-PK')}` : '—'}
        </div>
      )
    },
    meta: {
      className: cn(
        'text-right font-medium tabular-nums min-w-[140px] max-w-[160px]'
      ),
    },
    size: 150,
  },

  {
    accessorKey: 'totalCommission',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Total Comm.'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('totalCommission')
      return (
        <div className='pr-4 text-right font-medium text-red-600 tabular-nums dark:text-red-400'>
          {amount && amount > 0 ? `Rs. ${amount.toLocaleString('en-PK')}` : '—'}
        </div>
      )
    },
    meta: {
      className: cn(
        'text-right font-medium tabular-nums min-w-[120px] max-w-[140px]'
      ),
    },
    size: 130,
  },

  {
    accessorKey: 'commissionGiven',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-end'
        column={column}
        title='Comm. Given'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('commissionGiven')
      return (
        <div className='pr-4 text-right font-medium text-red-600 tabular-nums dark:text-red-400'>
          {amount && amount > 0 ? `Rs. ${amount.toLocaleString('en-PK')}` : '—'}
        </div>
      )
    },
    meta: {
      className: cn(
        'text-right font-medium tabular-nums min-w-[120px] max-w-[140px]'
      ),
    },
    size: 130,
  },

  // ────────────────────────────────────────────────
  // Hidden / filter-only columns
  // ────────────────────────────────────────────────
  {
    accessorKey: 'document',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Document' />
    ),
    cell: ({ row }) => {
      const value = row.getValue<'yes' | 'no'>('document')
      return (
        <div className='w-fit ps-2 text-nowrap'>
          {value ? value.toUpperCase() : '—'}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 100,
  },

  {
    accessorKey: 'town',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Town' />
    ),
    cell: ({ row }) => {
      const town = row.getValue<{ title: string }>('town')
      return <div className='w-fit ps-2 text-nowrap'>{town?.title ?? '—'}</div>
    },
    enableSorting: true,
    enableHiding: true,
    size: 140,
  },

  // ────────────────────────────────────────────────
  // Actions (always last)
  // ────────────────────────────────────────────────
  {
    id: 'actions',
    header: () => null,
    cell: DataTableRowActions,
    size: 60,
    enableHiding: false,
  },
]
