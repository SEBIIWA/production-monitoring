import { type JSX, type PropsWithChildren, type ReactNode, useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { ChevronDownIcon } from 'lucide-react'

import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface ComponentProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  filterOptions?: ReactNode[]
}

export function DataTable<T>({ data, columns, filterOptions }: PropsWithChildren<ComponentProps<T>>): JSX.Element {
  const cols = useMemo<ColumnDef<T>[]>(() => [...columns], [columns])

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    rowCount: data.length,
    state: {
      sorting: sorting,
      pagination: pagination,
      columnVisibility: columnVisibility,
      columnFilters: columnFilters,
    },
    autoResetPageIndex: false,
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter columns...'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setColumnFilters(
              table.getAllColumns().reduce((acc, column) => {
                if (column.columnDef.enableColumnFilter) {
                  acc.push({
                    id: column.id,
                    value: event.target.value,
                  })
                }
                return acc
              }, [] as ColumnFiltersState)
            )
          }
          className='max-w-sm'
        />
        <div className='flex items-center justify-end flex-1'>
          {filterOptions && filterOptions.map((option, index) => <div key={index}>{option}</div>)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDownIcon className='ml-2' size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem key={column.id} className='capitalize' checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground flex items-center gap-4'>
          <Select
            disabled={table.getRowCount() <= 5}
            value={table.getRowCount() >= 5 ? pagination.pageSize.toString() : undefined}
            onValueChange={(e) => setPagination({ pageIndex: 0, pageSize: Number(e) })}>
            <SelectTrigger className='w-[82px]'>
              <SelectValue placeholder='Size' />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 25].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p>
            {table.getRowCount() <= 5 ? table.getRowCount() : pagination.pageSize} of {table.getRowCount()} row(s) showen.
          </p>
        </div>
        <div className='space-x-2'>
          <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>

          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
