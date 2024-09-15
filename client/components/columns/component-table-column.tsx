import Link from 'next/link'
import type { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { CaretSortIcon } from '@radix-ui/react-icons'

import * as Icons from 'lucide-react'
import { useComponents } from '@/provider/component.provider'

import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/utils/query-client'

export const componentHeaderColumns: ColumnDef<ComponentType>[] = [
  {
    id: 'name',
    header: ({ column }) => {
      return (
        <div className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Component Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </div>
      )
    },
    accessorKey: 'name',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Avatar>
          <AvatarImage src={row.original.image} />
          <AvatarFallback className='uppercase'>{`${row.original.name[0]}${row.original.name[1]}`}</AvatarFallback>
        </Avatar>
        <div className='capitalize truncate'>
          <p>{row.original.name}</p>
          <p className='text-muted-foreground'>{row.original.model_number}</p>
        </div>
      </div>
    ),
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'reference',
    header: 'Ref ID',
    accessorKey: 'ref',
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'manufacturer',
    header: 'Manufacturer',
    accessorKey: 'manufacturer',
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'description',
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => <div className='truncate'>{row.original.description}</div>,
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'category',
    header: 'Category',
    accessorKey: 'category',
    cell: ({ row }) => {
      // @ts-ignore
      const Icon = Icons[row.original.category.split(',')[1]]
      return (
        <div className='flex items-center gap-2'>
          <Icon size={20} color={'#343c47'} />
          {row.original.category.split(',')[0]}
        </div>
      )
    },
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'price',
    header: 'Price',
    accessorFn: (row) => Intl.NumberFormat('ar-TN', { style: 'currency', currency: 'TND' }).format(row.price),
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'created_at',
    header: 'Created At',
    accessorFn: (row) => new Date(row.created_at!).toLocaleDateString(),
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'updated_at',
    header: 'Updated At',
    accessorFn: (row) => new Date(row.updated_at!).toLocaleDateString(),
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'action',
    header: () => <div className='flex items-center justify-end'>Actions</div>,
    accessorKey: 'id',
    cell: ({ row }) => <ComponentTableActions row={row} />,
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
]

const ComponentTableActions = ({ row }: { row: Row<ComponentType> }) => {
  const { toast } = useToast()
  const { deleteComponent } = useComponents()

  const { mutate } = useMutation({
    mutationFn: async (id: number) => deleteComponent(id.toString()),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error Updating User',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Product Deleted',
        description: 'Product has been deleted successfully',
      })
    },
    onSettled: () => {
      queryClient.refetchQueries()
    },
  })

  return (
    <div className='flex items-center justify-end gap-1'>
      <Link href={`/dashboard/ingredients/${row.original.id}`} passHref>
        <Button variant='primary' className='px-3 gap-2'>
          <Icons.Edit3 size={18} />
          Edit
        </Button>
      </Link>
      <Link href={`/dashboard/ingredients/detail?id=${row.original.id}`} passHref>
        <Button variant={'outline'} className='px-3 gap-2'>
          <Icons.Eye size={18} />
        </Button>
      </Link>
      <Button variant={'secondary'} className='px-3 gap-2' onClick={() => mutate(row.original.id)}>
        <Icons.Trash2 size={18} />
      </Button>
    </div>
  )
}
