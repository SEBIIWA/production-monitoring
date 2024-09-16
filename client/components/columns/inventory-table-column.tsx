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

export const inventoryHeaderColumns: ColumnDef<InventoryType>[] = [
  {
    id: 'stock',
    header: ({ column }) => {
      return (
        <div className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Stock
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </div>
      )
    },
    accessorKey: 'stock',
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'quantity',
    header: 'Quantity',
    accessorKey: 'quantity',
    enableGlobalFilter: true,
    enableSorting: true,
    enableHiding: false,
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

const ProductTableActions = ({ row }: { row: Row<InventoryType> }) => {
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
      <Button variant='primary' className='px-3 gap-2'>
        <Icons.Edit3 size={18} />
        Edit
      </Button>

      <Button variant={'secondary'} className='px-3 gap-2' onClick={() => mutate(row.original.id)}>
        <Icons.Trash2 size={18} />
      </Button>
    </div>
  )
}
