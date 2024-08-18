import { type JSX, type ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

import { fetcher } from '@/utils/fetch'
import { ProductFormType } from '@/schema/product.form'
import { productStore, ProductStoreType } from '@/provider/store/product.store'

interface ComponentProps {
  children: ReactNode
}

const ProductsContext = createContext<ProductStoreType>(productStore)

function ProductsProvider({ children }: ComponentProps): JSX.Element {
  const getProducts = async () => await fetcher.get('api/products/').then((res) => res.data)
  const getProduct = async (id: number) => await fetcher.get(`api/products/${id}`).then((res) => res.data)
  const createProduct = (data: ProductFormType) => fetcher.post('api/products/', { ...data }).then((res) => res.data)

  function updateProduct(id: number, data: ProductFormType) {
    fetcher
      .put(`api/products/${id}`, { ...data })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function deleteProduct(id: number, soft: boolean) {
    fetcher
      .delete(`api/products/${id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <ProductsContext.Provider
      value={{
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}>
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => useContext(ProductsContext)

export { ProductsProvider, useProducts }
