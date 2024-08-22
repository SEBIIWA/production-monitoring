import { useEffect, type JSX } from 'react'
import { useRouter } from 'next/router'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userFormSchema, userFormDefaultValues, UserFormType } from '@/schema/user.form'

import { useUsers } from '@/provider/user.provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'

export default function Page(): JSX.Element {
  const { push, query } = useRouter()
  const { toast } = useToast()
  const { updateUser, createUser, getUser } = useUsers()

  const { data, status } = useQuery({
    queryKey: ['user', query.id],
    queryFn: async () => getUser(query.id as string),
    enabled: query.id !== 'new' && query.id !== undefined,
  })

  useEffect(() => {
    if (query.id !== 'new' && status === 'success') {
      form.reset({ ...data })
    }
  }, [query.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const form = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { ...userFormDefaultValues },
    mode: 'onChange',
  })

  const { mutate } = useMutation({
    mutationFn: async (data: UserFormType) => (query.id === 'new' ? createUser(data) : updateUser(query.id as string, data)),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error Creating User',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Product Created',
        description: 'User has been successfully created.',
      })
      push('/dashboard/users')
    },
  })

  return (
    <Form {...form}>
      <main className='h-full flex flex-col gap-6 px-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <div className='flex items-center gap-4 mb-2'>
              <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => push('/dashboard/users')}>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Button>
              <h2 className='text-2xl font-bold tracking-tight'>User</h2>
            </div>
            <p className='text-muted-foreground'>{query.id !== 'new' ? 'Update the user' : 'Create a new User'}</p>
          </div>
          <div className='space-x-2'>
            <Button type='submit' onClick={form.handleSubmit((data) => mutate(data))}>
              Submit
            </Button>
          </div>
        </div>

        <aside className='w-full grid grid-cols-2 items-start gap-24'>
          <div className='flex flex-col gap-4'>
            <div className='w-full grid grid-cols-2 items-start gap-4'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='First name' {...field} />
                    </FormControl>
                    <FormDescription>This is the name of the product.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Last name' {...field} />
                    </FormControl>
                    <FormDescription>This is the name of the product.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='username'
              disabled={query.id !== 'new'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='username' disabled={query.id !== 'new'} {...field} />
                  </FormControl>
                  <FormDescription>This is the name of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='EMPLOYEE'>
                        <span className='flex items-center gap-2'>
                          <span>Employee</span>
                          <span className='text-muted-foreground'>- Can only view and manage tasks</span>
                        </span>
                      </SelectItem>
                      <SelectItem value='MODERATOR'>
                        <span className='flex items-center gap-2'>
                          <span>Moderator</span>
                          <span className='text-muted-foreground'>- Can Edit and Assign</span>
                        </span>
                      </SelectItem>
                      <SelectItem value='ADMIN'>
                        <span className='flex items-center gap-2'>
                          <span>Admin</span>
                          <span className='text-muted-foreground'>- Can do everything</span>
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>You can</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='w-full grid grid-cols-2 items-start gap-4'>
              <FormField
                control={form.control}
                name='cin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID Card</FormLabel>
                    <FormControl>
                      <Input placeholder='cin' {...field} />
                    </FormControl>
                    <FormDescription>This is the name of the product.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='telephone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Phone number' {...field} />
                    </FormControl>
                    <FormDescription>This is the name of the product.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='password' type='password' {...field} />
                  </FormControl>
                  <FormDescription>This is the password of the user. The password must be at least 6 characters long.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='is_active'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between border border-dashed rounded-lg p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>Account Active</FormLabel>
                    <FormDescription>This will determine if the user can login or not. If the user is inactive, they will not be able to login.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </aside>
      </main>
    </Form>
  )
}
