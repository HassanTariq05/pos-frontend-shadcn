import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Attachment } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const AttachmentPreview = ({ src }: { src: string }) => (
  <div className='relative flex size-10 items-center justify-center overflow-hidden rounded-md border border-border bg-muted shadow-sm'>
    <img
      src={src}
      alt='Attachment preview'
      className='h-full w-full object-cover'
      onError={(e) => {
        e.currentTarget.src =
          'https://ui-avatars.com/api/?name=Doc&background=36454f&color=fff&bold=true&size=128'
      }}
    />
  </div>
)
export const attachmentsColumns: ColumnDef<Attachment>[] = [
  {
    id: 'preview',
    header: () => null,
    cell: ({ row }) => {
      const seedSource =
        row.original.name || row.original.id || row.original.note || 'doc'
      const seed = seedSource
        .split('')
        .reduce((acc, c) => acc + c.charCodeAt(0), 0)

      const previewUrl = `https://picsum.photos/seed/${seed}/80/100`

      return (
        <div className='flex items-center justify-center'>
          <AttachmentPreview src={previewUrl} />
        </div>
      )
    },
    meta: {
      className: cn(
        'w-14 text-center p-0',
        'max-md:sticky start-0 bg-background z-10 shadow-sm'
      ),
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('name')}</LongText>
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
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Document Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as Date | undefined
      return (
        <div className='ps-3'>{date ? format(date, 'dd MMM yyyy') : '-'}</div>
      )
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'note',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Note' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>{row.getValue('note')}</div>
    ),
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
