'use client'

import { format } from 'date-fns'
import { flexRender, type Table } from '@tanstack/react-table'
import { cn, formatCurrency } from '@/lib/utils'

type JournalPrintViewProps<TData> = {
  table: Table<TData>
  openingBalance: number
  title?: string
  subtitle?: string
  companyName?: string
  date?: string
}

export function JournalPrintView<TData>({
  table,
  openingBalance,
  title = 'Journal Report',
  subtitle = 'Transaction Records',
  companyName = 'Your Company Name',
  date = format(new Date(), 'dd MMMM yyyy'),
}: JournalPrintViewProps<TData>) {
  const rows = table.getRowModel().rows
  const headerGroups = table.getHeaderGroups()
  const leafColumns = table.getAllLeafColumns()

  const totalDebit = rows.reduce(
    (s, r: any) => s + (Number(r.original.debit) || 0),
    0
  )

  const totalCredit = rows.reduce(
    (s, r: any) => s + (Number(r.original.credit) || 0),
    0
  )

  const closingBalance = openingBalance + totalDebit - totalCredit

  return (
    <div className='mx-auto font-sans'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold'>{companyName}</h1>
        <p className='text-lg font-medium'>{title}</p>
        <p className='text-sm'>{subtitle}</p>
        <p className='mt-2 text-sm'>Date: {date}</p>
      </div>

      {/* Summary */}
      <div className='mb-6 grid grid-cols-2 gap-4 text-sm font-medium'>
        <div>Opening Balance</div>
        <div className='text-right'>{formatCurrency(openingBalance)}</div>
      </div>

      <div className='print:origin-top-left print:scale-90'>
        <table className='w-full border-collapse text-sm print:table-auto'>
          <thead>
            {headerGroups.map((hg) => (
              <tr
                key={hg.id}
                className='border-b border-gray-400 print:border-black'
              >
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      'border border-gray-400 px-3 py-2 text-left font-semibold print:border-black',
                      header.column.columnDef.meta?.thClassName
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className='border-b border-gray-300 print:border-black'
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cn(
                      'border border-gray-300 px-3 py-2 print:border-black',
                      'break-words whitespace-normal',
                      cell.column.columnDef.meta?.tdClassName
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          {/* Totals */}
          <tfoot className='font-bold'>
            <tr>
              <td
                colSpan={leafColumns.length - 2}
                className='px-4 py-3 text-right'
              >
                Total
              </td>
              <td className='px-4 py-3 text-right text-emerald-700'>
                {formatCurrency(totalDebit)}
              </td>
              <td className='px-4 py-3 text-right text-orange-700'>
                {formatCurrency(totalCredit)}
              </td>
            </tr>

            <tr className='border-t'>
              <td
                colSpan={leafColumns.length - 1}
                className='px-4 py-3 text-right'
              >
                Closing Balance
              </td>
              <td
                className={
                  closingBalance >= 0
                    ? 'px-4 py-3 text-right text-emerald-700'
                    : 'px-4 py-3 text-right text-red-700'
                }
              >
                {formatCurrency(closingBalance)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Footer */}
      <div className='mt-12 text-center text-sm'>
        Generated on {format(new Date(), 'dd MMM yyyy hh:mm a')}
      </div>
    </div>
  )
}
