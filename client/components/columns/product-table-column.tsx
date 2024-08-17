import type { ColumnDef } from '@tanstack/react-table'

import { CaretSortIcon } from '@radix-ui/react-icons'

export const productHeaderColumns: ColumnDef<ProductType>[] = [
  {
    id: 'name',
    header: ({ column }) => {
      return (
        <div className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </div>
      )
    },
    accessorKey: 'name',
  },
]
