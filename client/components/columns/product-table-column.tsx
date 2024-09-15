import Link from 'next/link'
import type { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { CaretSortIcon } from '@radix-ui/react-icons'

import * as Icons from 'lucide-react'
import { useProducts } from '@/provider/product.provider'

import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/utils/query-client'

export const productHeaderColumns: ColumnDef<ProductType>[] = [
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
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Avatar>
          <AvatarImage src={row.original.image} />
          <AvatarFallback className='uppercase'>{`${row.original.name[0]}${row.original.name[1]}`}</AvatarFallback>
        </Avatar>
        <div className='capitalize truncate'>{row.original.name}</div>
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
    id: 'tva',
    header: 'TVA',
    accessorFn: (row) => `${row.tva}%`,
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'warranty',
    header: 'Warranty',
    accessorFn: (row) => `${row.warranty_duration} years`,
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
    cell: ({ row }) => <ProductTableActions row={row} />,
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
]

const ProductTableActions = ({ row }: { row: Row<ProductType> }) => {
  const { toast } = useToast()
  const { deleteProduct } = useProducts()

  const { mutate } = useMutation({
    mutationFn: async (id: number) => deleteProduct(id.toString()),
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
      <Link href={`/dashboard/products/${row.original.id}`} passHref>
        <Button variant='primary' className='px-3 gap-2'>
          <Icons.Edit3 size={18} />
          Edit
        </Button>
      </Link>
      <Link href={`/dashboard/products/detail?id=${row.original.id}`} passHref>
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
