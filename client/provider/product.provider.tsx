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
  const [products, setProducts] = useState<ProductType[] | null>(productStore.products)
  const [product, setProduct] = useState<ProductType | null>(productStore.product)

  const getProducts = async (deleted: boolean) =>
    await fetcher
      .get('api/products/')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((error) => {
        console.error(error)
      })

  function getProduct(id: number) {
    fetcher
      .get(`api/products/${id}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function createProduct(data: ProductFormType) {
    fetcher
      .post('api/products', { ...data })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

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

  useEffect(() => {
    getProducts(false)
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
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
