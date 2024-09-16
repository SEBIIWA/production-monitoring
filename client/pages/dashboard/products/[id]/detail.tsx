'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { type JSX, useEffect } from 'react'

import { ChevronLeft, Home, LineChart, Package, Package2, PanelLeft, PlusCircle, Search, Settings, ShoppingCart, Trash2, Upload, Users2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { useQuery } from '@tanstack/react-query'
import { useProducts } from '@/provider/product.provider'
import { DataTable } from '@/components/datatable'
import { inventoryHeaderColumns } from '@/components/columns/inventory-table-column'

export default function Detail() {
  const { query, push } = useRouter()
  const { getProduct } = useProducts()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', query.id],
    queryFn: async () => getProduct(query.id as string),
    enabled: query.id !== 'new' && query.id !== undefined,
    staleTime: 0,
  })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error...</div>

  if (!data) return <div>Not found</div>

  return (
    <main className='grid flex-1 items-start gap-4 p-4'>
      <div className='grid flex-1 auto-rows-max gap-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <div className='flex items-center gap-4 mb-2'>
              <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => push('/dashboard/products')}>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Button>
              <h2 className='text-2xl font-bold tracking-tight'>Product</h2>
            </div>
            <p className='text-muted-foreground'>{query.id !== 'new' ? 'Update the product' : 'Create a new product'}</p>
          </div>
          <div className='space-x-2'>
            <Button variant='outline'>Delete Product</Button>
            <Button>Edit</Button>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
            <Card className='shadow-none border-none'>
              <CardHeader className='px-0'>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
              </CardHeader>
              <CardContent className='px-0'>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' type='text' className='w-full' defaultValue='Gamer Gear Pro Controller' />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                      id='description'
                      defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.'
                      className='min-h-32'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/*  */}
            <Card className='shadow-none border-none'>
              <CardHeader className='px-0'>
                <CardTitle>Stock</CardTitle>
                <CardDescription>Product stock and inventory</CardDescription>
              </CardHeader>
              <CardContent className='px-0'>
                <DataTable<InventoryType> data={data.inventory} columns={inventoryHeaderColumns} />
              </CardContent>
            </Card>
            {/*  */}
          </div>
          <div className='grid auto-rows-max items-start gap-4'>
            {/*  */}
            <Card className='shadow-none border-none'>
              <CardHeader className='px-0'>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Close up photo of the product, front and back view, and the product in use</CardDescription>
              </CardHeader>
              <CardContent className='px-0'>
                <div className='grid gap-2'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt='Product image' className='aspect-square w-full rounded-md object-cover' height='300' src={data?.image} width='300' />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
