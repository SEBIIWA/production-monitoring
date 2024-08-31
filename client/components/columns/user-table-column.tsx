import Link from 'next/link'
import type { ColumnDef, Row } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { Edit3, Eye, EyeOffIcon } from 'lucide-react'
import { CaretSortIcon } from '@radix-ui/react-icons'

import { useUsers } from '@/provider/user.provider'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/utils/query-client'

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
    cell: ({ row }) => <Badge variant='outline'>{row.original.role}</Badge>,
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
    cell: ({ row }) => <Badge variant={row.original.is_active ? 'outline' : 'secondary'}>{row.original.is_active ? 'Active' : 'Inactive'}</Badge>,
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
    cell: ({ row }) => <UserTableActions row={row} />,
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
]

const UserTableActions = ({ row }: { row: Row<UserType> }) => {
  const { toast } = useToast()
  const { patchUser } = useUsers()

  const { mutate } = useMutation({
    mutationFn: async (data: UserType) => patchUser(row.original.id.toString(), { is_active: data.is_active }),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error Updating User',
        description: error.message,
      })
    },
    onSuccess: (data) => {
      row.original = data as unknown as UserType
      toast({
        title: 'User Updated',
        description: 'User has been successfully updated.',
      })
    },
    onSettled: () => {
      queryClient.refetchQueries()
    },
  })

  return (
    <div className='flex items-center justify-end gap-1'>
      <Link href={`/dashboard/users/${row.original.id}`} passHref>
        <Button variant='primary' className='px-3 gap-2'>
          <Edit3 size={18} />
          Edit
        </Button>
      </Link>
      <Button variant='secondary' size={'icon'} onClick={() => mutate({ ...row.original, is_active: !row.original.is_active })}>
        {row.original.is_active ? <Eye size={18} className={'text-red-600'} /> : <EyeOffIcon size={18} className={'text-blue-600'} />}
      </Button>
    </div>
  )
}