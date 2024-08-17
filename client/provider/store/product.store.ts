import { ProductFormType } from '@/schema/product.form'

export interface ProductStoreType {
  products: ProductType[] | null
  product: ProductType | null
  getProducts: (deleted: false) => void
  getProduct: (id: number) => void
  createProduct: (data: ProductFormType) => void
  updateProduct: (id: number, data: ProductFormType) => void
  deleteProduct: (id: number, soft: boolean) => void
}

export const productStore: ProductStoreType = {
  products: null,
  product: null,
  getProducts: (deleted: false) => {},
  getProduct: (id: number) => {},
  createProduct: (data: ProductFormType) => {},
  updateProduct: (id: number, data: ProductFormType) => {},
  deleteProduct: (id: number, soft: boolean) => {},
}
