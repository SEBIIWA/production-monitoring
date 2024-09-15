import { type JSX } from 'react'
import { useRouter } from 'next/router'
import { FilePlus2Icon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'

import { DataTable } from '@/components/datatable'
import { useComponents } from '@/provider/component.provider'
import { componentHeaderColumns } from '@/components/columns/component-table-column'

export default function Index(): JSX.Element {
  const { push } = useRouter()
  const { getComponents } = useComponents()

  const { isLoading, isError, data } = useQuery({ queryKey: ['components'], queryFn: getComponents, staleTime: 0, retryOnMount: true })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error...</div>

  return (
    <main className='h-full flex flex-1 flex-col gap-4 px-4 lg:gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start'>
          <h1 className='text-lg font-semibold md:text-2xl'>Components</h1>
          <p className='text-muted-foreground'>Manage your components and view their sales performance.</p>
        </div>
        {data && data.length !== 0 && (
          <Button onClick={() => push('/dashboard/ingredients/new')}>
            <FilePlus2Icon size={18} className='mr-2' />
            Add Component
          </Button>
        )}
      </div>

      {data && data.length === 0 ? (
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>You have no components</h3>
            <p className='text-sm text-muted-foreground'>You can start seeing components as soon as you add a Component.</p>
            <Button className='mt-4' onClick={() => push('/dashboard/ingredients/new')}>
              <FilePlus2Icon size={18} className='mr-2' />
              Add Component
            </Button>
          </div>
        </div>
      ) : (
        <div>{data && <DataTable<ComponentType> data={data} columns={componentHeaderColumns} hiddenColumns={['description', 'Updated_At']} />}</div>
      )}
    </main>
  )
}
