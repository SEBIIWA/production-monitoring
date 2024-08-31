import Link from 'next/link'
import type { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'

import { CaretSortIcon } from '@radix-ui/react-icons'

import * as Icons from 'lucide-react'
import { useCategories } from '@/provider/category.provider'

import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/utils/query-client'

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
    accessorKey: 'name',
    enableSorting: true,
    enableGlobalFilter: true,
    enableHiding: false,
  },
  {
    id: 'icon',
    header: 'Icon',
    accessorKey: 'icon',
    enableSorting: false,
    enableGlobalFilter: true,
    enableHiding: false,
    cell: ({ row }) => {
      // @ts-ignore
      const Icon = Icons[row.original.icon] ?? Icons['ImageOff']
      if (!Icon) return <Icon color={'#dc2626'} size={20} />
      return <Icon size={20} color={'#343c47'} />
    },
  },
  {
    id: 'isForProduct',
    header: 'Product',
    accessorKey: 'isForProduct',
    enableSorting: false,
    enableGlobalFilter: false,
    enableHiding: true,
    cell: ({ row }) => {
      return <Badge variant={row.original.isForProduct ? 'outline' : 'destructive'}>{row.original.isForProduct ? 'Yes' : 'No'}</Badge>
    },
  },
  {
    id: 'isForComponent',
    header: 'Component',
    accessorKey: 'isForComponent',
    enableSorting: false,
    enableGlobalFilter: false,
    enableHiding: true,
    cell: ({ row }) => {
      return <Badge variant={row.original.isForComponent ? 'outline' : 'destructive'}>{row.original.isForComponent ? 'Yes' : 'No'}</Badge>
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
  const { toast } = useToast()
  const { deleteCategory } = useCategories()

  const { mutate } = useMutation({
    mutationFn: async (id: number) => deleteCategory(id.toString()),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error Updating User',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Category Deleted',
        description: 'Category has been deleted successfully',
      })
    },
    onSettled: () => {
      queryClient.refetchQueries()
    },
  })

  return (
    <div className='flex items-center justify-end gap-1'>
      <Link href={`/dashboard/categories/${row.original.id}`} passHref>
        <Button variant='primary' className='px-3 gap-2'>
          <Icons.Edit3 size={18} />
          Edit
        </Button>
      </Link>
      <Button variant={'secondary'} className='px-3 gap-2' onClick={() => mutate(row.original.id)}>
        <Icons.Trash2 size={18} />
      </Button>
    </div>
  )
}
