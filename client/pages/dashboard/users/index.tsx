import { type JSX, useState } from 'react'
import { useRouter } from 'next/router'
import { PlusCircle, UserPlus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/datatable'
import { useUsers } from '@/provider/user.provider'
import { userHeaderColumns } from '@/components/columns/user-table-column'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Page(): JSX.Element {
  const { push } = useRouter()
  const { getUsers } = useUsers()

  const [filter, setFilter] = useState<FilterType>({ active: true } as FilterType)

  const { isLoading, isError, data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 0,
    retryOnMount: true,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  // Apply filter to the data
  const filteredData =
    data?.filter((user) => {
      const roleMatch = filter.role ? user.role.toLocaleLowerCase() === filter.role.toLocaleLowerCase() : true
      const activeMatch = filter.active !== undefined ? user.is_active === filter.active : true

      return roleMatch && activeMatch
    }) || []

  return (
    <main className='h-full flex flex-1 flex-col gap-4 px-4 lg:gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start'>
          <h1 className='text-lg font-semibold md:text-2xl'>Users</h1>
          <p className='text-muted-foreground'>Manage your products and view their sales performance.</p>
        </div>
        {data && data.length !== 0 && (
          <Button onClick={() => push('/dashboard/users/new')}>
            <UserPlus size={18} className='mr-2' />
            Add User
          </Button>
        )}
      </div>

      {data && data.length === 0 ? (
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>You have no users</h3>
            <p className='text-sm text-muted-foreground'>You can start seeing users as soon as you add a user.</p>
            <Button className='mt-4' onClick={() => push('/dashboard/users/new')}>
              <UserPlus size={18} className='mr-2' />
              Add User
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {data && (
            <DataTable<UserType>
              data={filteredData}
              columns={userHeaderColumns}
              filterOptions={[
                <DropdownMenu key='btn-status'>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className='border border-dashed'>
                      <PlusCircle size={18} className='mr-2' />
                      {filter.role ? filter.role : 'Role'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuCheckboxItem
                      checked={filter.role === 'employee'}
                      onCheckedChange={(checked) => {
                        setFilter({ ...filter, role: checked ? 'employee' : '' })
                      }}
                      className='capitalize'>
                      Employee
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filter.role === 'moderator'}
                      onCheckedChange={(checked) => {
                        setFilter({ ...filter, role: checked ? 'moderator' : '' })
                      }}
                      className='capitalize'>
                      Moderator
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filter.role === 'administrator'}
                      onCheckedChange={(checked) => {
                        setFilter({ ...filter, role: checked ? 'administrator' : '' })
                      }}
                      className='capitalize'>
                      Administrator
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>,
                <Select key='active-role' defaultValue={filter.active ? '1' : '0'} onValueChange={(value) => setFilter({ ...filter, active: value === '1' ? true : false })}>
                  <SelectTrigger className='w-[100px]'>
                    <SelectValue placeholder='Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Active</SelectItem>
                    <SelectItem value='0'>Disabled</SelectItem>
                  </SelectContent>
                </Select>,
              ]}
            />
          )}
        </div>
      )}
    </main>
  )
}
