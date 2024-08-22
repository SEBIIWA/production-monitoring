import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { Edit3, EyeOffIcon } from 'lucide-react'
import { CaretSortIcon } from '@radix-ui/react-icons'

export const userHeaderColumns: ColumnDef<UserType>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Avatar>
          <AvatarImage src={row.original.profile_picture} />
          <AvatarFallback className='uppercase'>{`${row.original.first_name[0]}${row.original.last_name[0]}`}</AvatarFallback>
        </Avatar>
        <p className='truncate capitalize'>{`${row.original.first_name} ${row.original.last_name}`}</p>
      </div>
    ),
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: true,
  },
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
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'created_at',
    header: 'Created At',
    accessorFn: (row) => new Date(row.created_at).toLocaleDateString(),
    enableGlobalFilter: false,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'is_active',
    header: 'Status',
    accessorKey: 'is_active',
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => <Badge variant={row.original.is_active ? 'default' : 'secondary'}>{row.original.is_active ? 'Active' : 'Inactive'}</Badge>,
  },
  {
    id: 'cin',
    header: 'CIN',
    accessorKey: 'cin',
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'phone',
    header: 'Phone',
    accessorKey: 'telephone',
    enableGlobalFilter: true,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'action',
    header: () => <div className='flex items-center justify-end'>Actions</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex items-center justify-end gap-2'>
        <Link href={`/dashboard/users/${row.original.id}`} passHref>
          <Button variant='outline' size={'icon'}>
            <Edit3 size={18} />
          </Button>
        </Link>
        <Button variant='destructive' size={'icon'}>
          <EyeOffIcon size={18} />
        </Button>
      </div>
    ),
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
]
