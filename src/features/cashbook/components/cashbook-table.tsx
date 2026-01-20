'use client'

import { useEffect, useState } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Printer } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableToolbar } from '@/components/data-table'
import { CashbookPrintView } from '@/components/print/cashbook-print'
import { cashbookColumns as columns } from './cashbook-columns'

type DataTableProps = {
  data: any[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function CashbookTable({ data, search, navigate }: DataTableProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: false },
    columnFilters: [
      { columnId: 'username', searchKey: 'username', type: 'string' },
      { columnId: 'status', searchKey: 'status', type: 'array' },
      { columnId: 'role', searchKey: 'role', type: 'array' },
    ],
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange,
    onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    ensurePageInRange(table.getPageCount())
  }, [table, ensurePageInRange])

  const totalDebit = data.reduce((s, r) => s + (r.debit || 0), 0)
  const totalCredit = data.reduce((s, r) => s + (r.credit || 0), 0)

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        'flex flex-1 flex-col gap-4'
      )}
    >
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter records...'
        searchKey='username'
      >
        <Button
          variant='outline'
          size='sm'
          className='mr-2 gap-1'
          onClick={() => {
            setIsPrinting(true)

            requestAnimationFrame(() => {
              window.print()
              setIsPrinting(false)
            })
          }}
        >
          <Printer size={18} />
          <span>Print</span>
        </Button>
      </DataTableToolbar>

      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      header.column.columnDef.meta?.className,
                      header.column.columnDef.meta?.thClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.columnDef.meta?.className,
                        cell.column.columnDef.meta?.tdClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className='bg-muted/40 font-medium'>
            <TableRow>
              <TableCell className='font-semibold'>Balance</TableCell>

              <TableCell
                className={cn(
                  'text-right font-bold',
                  totalDebit - totalCredit > 0 && 'text-emerald-600',
                  totalDebit - totalCredit < 0 && 'text-red-600',
                  totalDebit - totalCredit === 0 && 'text-muted-foreground'
                )}
              >
                {formatCurrency(totalDebit - totalCredit)}
              </TableCell>

              <TableCell colSpan={columns.length - 4} />

              <TableCell className='text-right font-bold text-emerald-600'>
                {formatCurrency(totalDebit)}
              </TableCell>

              <TableCell className='text-right font-bold text-orange-600'>
                {formatCurrency(totalCredit)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {isPrinting && (
        <div className='print-only'>
          <CashbookPrintView
            table={table}
            companyName='ABC Traders'
            openingBalance={125000}
            title='Cashbook'
            subtitle='Debit / Credit Summary'
          />
        </div>
      )}
    </div>
  )
}
