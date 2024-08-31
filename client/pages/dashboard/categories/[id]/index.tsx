import { createElement, useEffect, useMemo, useState, type JSX } from 'react'
import { useRouter } from 'next/router'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryFormSchema, categoryFormDefaultValues, CategoryFormType } from '@/schema/category.form'

import { useCategories } from '@/provider/category.provider'
import { queryClient } from '@/utils/query-client'
import { useMutation, useQuery } from '@tanstack/react-query'

import { ChevronLeft } from 'lucide-react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { defaultIcons, iconNames, Icons } from '@/constant/all-icons'
import { useDebounce } from 'use-debounce'

export default function Category() {
  const { push, query } = useRouter()
  const { toast } = useToast()
  const { getCategory, updateCategory, createCategory } = useCategories()

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { ...categoryFormDefaultValues },
    mode: 'onChange',
  })

  const { data, status } = useQuery({
    queryKey: ['category', query.id],
    queryFn: async () => getCategory(query.id as string),
    enabled: query.id !== 'new' && query.id !== undefined,
    staleTime: 0,
  })

  console.log(data)

  useEffect(() => {
    if (query.id !== 'new' && status === 'success') {
      form.reset({ ...data })
    }
  }, [query.id, status]) // eslint-disable-line react-hooks/exhaustive-deps

  const { mutate } = useMutation({
    mutationFn: async (data: CategoryFormType) => (query.id === 'new' ? createCategory(data) : updateCategory(query.id as string, data)),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error mutating a category',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: query.id === 'new' ? 'Category Created' : 'Category Updated',
        description: `category has been successfully ${query.id === 'new' ? 'created' : 'updated'}.`,
      })
      push('/dashboard/categories')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const [open, setOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300)

  const filteredIcons = useMemo(() => {
    if (!debouncedSearchQuery) return defaultIcons
    if (!searchQuery) return defaultIcons
    return iconNames.filter((icon) => icon.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
  }, [debouncedSearchQuery]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form {...form}>
      <main className='h-full flex flex-col gap-6 px-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <div className='flex items-center gap-4 mb-2'>
              <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => push('/dashboard/categories')}>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Button>
              <h2 className='text-2xl font-bold tracking-tight'>Category</h2>
            </div>
            <p className='text-muted-foreground'>{query.id !== 'new' ? 'Update category' : 'Create a new category'}</p>
          </div>
          <div className='space-x-2'>
            {query.id !== 'new' && <Button variant='destructive'>Delete</Button>}
            {query.id === 'new' && (
              <Button type='submit' onClick={form.handleSubmit((data) => mutate(data))}>
                Submit
              </Button>
            )}
            {query.id !== 'new' && (
              <Button type='submit' onClick={form.handleSubmit((data) => mutate(data))}>
                Update
              </Button>
            )}
          </div>
        </div>

        <aside className='w-full grid grid-cols-2 items-start gap-24'>
          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter category name' {...field} />
                  </FormControl>
                  <FormDescription>This is the name of the category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
                            {field.value ? (
                              <div className='flex items-center gap-2'>
                                <span>{field.value}</span>
                              </div>
                            ) : (
                              <p className='text-muted-foreground'>Select icon</p>
                            )}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-2'>
                        <Command>
                          <CommandInput placeholder='Search icons...' value={searchQuery} onValueChange={setSearchQuery} className='h-9' />
                          <CommandList className='w-full max-h-60 overflow-y-auto'>
                            {filteredIcons.length > 0 ? (
                              filteredIcons.map((iconName: string, index: number) => {
                                // @ts-ignore
                                const LucideIcon = Icons[iconName]
                                return (
                                  <CommandItem
                                    key={index}
                                    value={iconName}
                                    onSelect={() => {
                                      form.setValue('icon', iconName)
                                      setOpen(false)
                                      setSearchQuery('')
                                    }}>
                                    <div className='w-full flex items-center gap-3'>
                                      <LucideIcon size={18} />
                                      <span>{iconName}</span>
                                    </div>
                                    {field.value === iconName && <Icons.CheckIcon className='ml-auto h-4 w-4 text-primary' />}
                                  </CommandItem>
                                )
                              })
                            ) : (
                              <CommandEmpty>No icons found.</CommandEmpty>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select an icon for the category.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='isForProduct'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between border border-dashed rounded-lg p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>This category if only for products</FormLabel>
                    <FormDescription>This will determine if the category can be for products. If this is enabled, the category will only be available for products.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isForComponent'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between border border-dashed rounded-lg p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>This category if only for components</FormLabel>
                    <FormDescription>This will determine if the category can be for components. If this is enabled, the category will only be available for components.</FormDescription>
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
