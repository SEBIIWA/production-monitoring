import { ProductFormType } from '@/schema/product.form'

export interface ProductStoreType {
  getProducts: () => Promise<ProductType[]>
  getProduct: (id: number) => void
  createProduct: (data: ProductFormType) => void
  updateProduct: (id: number, data: ProductFormType) => void
  deleteProduct: (id: number, soft: boolean) => void
}

export const productStore: ProductStoreType = {
  getProducts: async () => [],
  getProduct: (id: number) => {},
  createProduct: (data: ProductFormType) => {},
  updateProduct: (id: number, data: ProductFormType) => {},
  deleteProduct: (id: number, soft: boolean) => {},
}
