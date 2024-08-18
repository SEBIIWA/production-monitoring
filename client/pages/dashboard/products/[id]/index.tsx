import { type JSX } from 'react'
import { useRouter } from 'next/router'

import { cn } from '@/utils/tm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productFormSchema, productFormDefaultValues, ProductFormType } from '@/schema/product.form'

import { useProducts } from '@/provider/product.provider'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'

export default function Product(): JSX.Element {
  const { push } = useRouter()
  const { toast } = useToast()
  const { updateProduct, createProduct, getProduct } = useProducts()

  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { ...productFormDefaultValues },
    mode: 'onChange',
  })

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
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => push('/dashboard/products')}>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Button>
              <h2 className='text-2xl font-bold tracking-tight'>Product</h2>
            </div>
            <p className='text-muted-foreground'>Create a new product</p>
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
                  <FormControl>
                    <Input placeholder='Product category' {...field} />
                  </FormControl>
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
              name='weight'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Weight' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormDescription>Enter the weight of the product in kg.</FormDescription>
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
            <FormField
              control={form.control}
              name='warranty_description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Warranty description' className='resize-none' {...field} />
                  </FormControl>
                  <FormDescription>Provide a brief description of the warranty.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-4 flex-1'>
            <div className='grid grid-cols-3 gap-4'>
              <FormField
                control={form.control}
                name='height'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Height' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormDescription>Enter the height of the product in cm.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='width'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Width' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormDescription>Enter the width of the product in cm.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='length'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Length' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormDescription>Enter the length of the product in cm.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </aside>
      </main>
    </Form>
  )
}
