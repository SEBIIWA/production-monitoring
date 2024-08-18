import type { ColumnDef } from '@tanstack/react-table'

import { CaretSortIcon } from '@radix-ui/react-icons'

export const productHeaderColumns: ColumnDef<ProductType>[] = [
  {
    id: 'id',
    header: 'ID',
    accessorFn: (row) => `P00${row.id}`,
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'name',
    header: ({ column }) => {
      return (
        <div className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Product Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </div>
      )
    },
    accessorKey: 'name',
    cell: ({ row }) => <div className='capitalize truncate'>{row.original.name}</div>,
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'category',
    header: 'Category',
    accessorKey: 'category',
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'tva',
    header: 'TVA',
    accessorFn: (row) => `${row.tva}%`,
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'dimensions',
    header: 'Dimensions',
    accessorFn: (row) => `${row.height}x${row.width}x${row.length} cm`,
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
]
