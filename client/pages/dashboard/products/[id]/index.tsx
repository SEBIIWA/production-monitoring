import Image from 'next/image'
import { useEffect, type JSX } from 'react'
import { useRouter } from 'next/router'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ChevronLeft } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productFormSchema, productFormDefaultValues, ProductFormType } from '@/schema/product.form'

import * as Icons from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useProducts } from '@/provider/product.provider'
import { useCategories } from '@/provider/category.provider'

export default function Product(): JSX.Element {
  const { push, query } = useRouter()
  const { toast } = useToast()
  const { updateProduct, createProduct, getProduct } = useProducts()
  const { categories } = useCategories()

  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { ...productFormDefaultValues },
    mode: 'onChange',
  })

  const { data, status } = useQuery({
    queryKey: ['product', query.id],
    queryFn: async () => getProduct(query.id as string),
    enabled: query.id !== 'new' && query.id !== undefined,
    staleTime: 0,
  })

  useEffect(() => {
    if (query.id !== 'new' && status === 'success') {
      form.reset({ ...data, image: null })
    }
  }, [query.id, status]) // eslint-disable-line react-hooks/exhaustive-deps

  const { mutate } = useMutation({
    mutationFn: async (data: ProductFormType) => createProduct(data),
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error Creating Product',
        description: error.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Product Created',
        description: 'Product has been successfully created.',
      })
      push('/dashboard/products')
    },
  })

  return (
    <Form {...form}>
      <main className='h-full flex flex-col gap-6 px-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <div className='flex items-center gap-4 mb-2'>
              <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => push('/dashboard/products')}>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Button>
              <h2 className='text-2xl font-bold tracking-tight'>Product</h2>
            </div>
            <p className='text-muted-foreground'>{query.id !== 'new' ? 'Update the user' : 'Create a new User'}</p>
          </div>
          <div className='space-x-2'>
            <Button type='reset' variant={'destructive'} onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type='submit' onClick={form.handleSubmit((data) => mutate(data))}>
              Submit
            </Button>
          </div>
        </div>

        <aside className='flex flex-1 gap-4 lg:gap-6'>
          <div className='flex flex-col gap-4 flex-1'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Product name' {...field} />
                  </FormControl>
                  <FormDescription>This is the name of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Product description' className='resize-none' {...field} />
                  </FormControl>
                  <FormDescription>Provide a brief description of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories
                        .filter((e) => e.isForProduct)
                        .map((category) => {
                          // @ts-ignore
                          const Icon = Icons[category.icon]
                          return (
                            <SelectItem key={category.id} value={`${category.name},${category.icon}`}>
                              <div className='w-full flex items-center gap-3'>
                                <Icon size={20} />
                                {category.name}
                              </div>
                            </SelectItem>
                          )
                        })}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the category of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tva'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TVA %</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='TVA' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormDescription>Enter the TVA percentage.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='warranty_duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Duration</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Warranty duration (years)' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormDescription>Enter the warranty duration in years.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-1 flex-col gap-4'>
            <FormField
              control={form.control}
              name='ref'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Reference</FormLabel>
                  <FormControl>
                    <Input placeholder='P-xxxx' {...field} />
                  </FormControl>
                  <FormDescription>Reference is a unique key and should start with a {"'P'"}.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <FileUploader value={field.value} onValueChange={field.onChange} dropzoneOptions={{ multiple: false, maxFiles: 1, maxSize: 4 * 1024 * 1024 }}>
                      <FileInput>
                        <div className='flex items-center justify-center h-32 w-full border bg-background rounded-md'>
                          <p className='text-gray-400'>Drop files here</p>
                        </div>
                      </FileInput>
                      <FileUploaderContent className='flex items-center flex-row gap-2'>
                        {field.value && (
                          <FileUploaderItem index={1} className='size-20 p-0 rounded-md overflow-hidden'>
                            <Image src={URL.createObjectURL(field.value)} alt={field.value.name} height={80} width={80} className='size-20 p-0' />
                          </FileUploaderItem>
                        )}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>This is the name of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </aside>
      </main>
    </Form>
  )
}
