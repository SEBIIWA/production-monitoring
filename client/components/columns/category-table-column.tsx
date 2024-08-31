import Link from 'next/link'
import type { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'

import { Edit3 } from 'lucide-react'

export const categoryHeaderColumns: ColumnDef<CategoryType>[] = [
  {
    id: 'name',
    header: ({ column }) => {
      return (
        <div className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Category Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </div>
      )
    },
  },
  {
    id: 'action',
    header: () => <div className='flex items-center justify-end'>Actions</div>,
    accessorKey: 'id',
    cell: ({ row }) => <CategoryTableActions row={row} />,
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
]

const CategoryTableActions = ({ row }: { row: Row<CategoryType> }) => {
  return (
    <div className='flex items-center justify-end gap-1'>
      <Link href={`/dashboard/users/${row.original.id}`} passHref>
        <Button variant='secondary' size={'icon'}>
          <Edit3 size={18} />
        </Button>
      </Link>
    </div>
  )
}
