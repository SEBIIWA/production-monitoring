import { type JSX } from 'react'

import { DataTable } from '@/components/datatable'
import { useProducts } from '@/provider/product.provider'
import { productHeaderColumns } from '@/components/columns/product-table-column'

export default function Index(): JSX.Element {
  const { products } = useProducts()

  return <>{products && <DataTable<ProductType> data={products} columns={productHeaderColumns} />}</>
}
