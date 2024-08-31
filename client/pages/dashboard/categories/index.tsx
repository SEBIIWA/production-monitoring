import { type JSX, useState } from 'react'
import { useRouter } from 'next/router'
import { PlusCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/datatable'
import { useCategories } from '@/provider/category.provider'
import { categoryHeaderColumns } from '@/components/columns/category-table-column'
import { CategoryTypeBarChart } from '@/components/charts/category-type-bar-chart'

export default function Page(): JSX.Element {
  const { push } = useRouter()
  const { getCategories } = useCategories()

  const { isLoading, isError, data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 0,
    retryOnMount: true,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  return (
    <main className='h-full flex flex-1 flex-col gap-4 px-4 lg:gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start'>
          <h1 className='text-lg font-semibold md:text-2xl'>Categories</h1>
          <p className='text-muted-foreground'>Manage your categories here. You can add, edit, and delete categories from here.</p>
        </div>
        {data && data.length !== 0 && (
          <Button onClick={() => push('/dashboard/categories/new')}>
            <PlusCircle size={18} className='mr-2' />
            Add Category
          </Button>
        )}
      </div>

      {data && (
        <div className='gap-4'>
          <CategoryTypeBarChart categories={data} />
        </div>
      )}

      {data && data.length === 0 ? (
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>You have no categories</h3>
            <p className='text-sm text-muted-foreground'>You can add categories by clicking the button below. You can add, edit, and delete categories from here.</p>
            <Button className='mt-4' onClick={() => push('/dashboard/categories/new')}>
              <PlusCircle size={18} className='mr-2' />
              Add Category
            </Button>
          </div>
        </div>
      ) : (
        <div>{data && <DataTable<CategoryType> data={data} columns={categoryHeaderColumns} />}</div>
      )}
    </main>
  )
}
