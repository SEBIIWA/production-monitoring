import { ProductFormType } from '@/schema/product.form'

export interface ProductStoreType {
  getProducts: () => Promise<ProductType[]>
  getProduct: (id: string) => Promise<ProductType>
  createProduct: (data: ProductFormType) => void
  updateProduct: (id: string, data: ProductFormType) => void
  deleteProduct: (id: string) => void
}

export const productStore: ProductStoreType = {
  getProducts: async () => [],
  getProduct: async (id: string) => ({} as ProductType),
  createProduct: (data: ProductFormType) => {},
  updateProduct: (id: string, data: ProductFormType) => {},
  deleteProduct: (id: string) => {},
}
