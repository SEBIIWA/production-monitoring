import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { CaretSortIcon } from '@radix-ui/react-icons'

export const userHeaderColumns: ColumnDef<UserType>[] = [
  {
    id: 'username',
    header: ({ column }) => {
      return (
        <div className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </div>
      )
    },
    accessorKey: 'username',
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'first_name',
    header: 'First Name',
    accessorKey: 'first_name',
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'last_name',
    header: 'Last Name',
    accessorKey: 'last_name',
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'created_at',
    header: 'Created At',
    accessorFn: (row) => new Date(row.created_at).toLocaleDateString(),
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'is_active',
    header: 'Status',
    accessorKey: 'is_active',
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => <Badge variant={row.original.is_active ? 'default' : 'destructive'}>{row.original.is_active ? 'Active' : 'Inactive'}</Badge>,
  },
  {
    id: 'cin',
    header: 'CIN',
    accessorKey: 'cin',
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'phone',
    header: 'Phone',
    accessorKey: 'telephone',
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
]
