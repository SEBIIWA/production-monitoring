import { CategoryFormType } from '@/schema/category.form'

export interface CategoryStoreType {
  categories: CategoryType[]
  getCategories: () => Promise<CategoryType[]>
  getCategory: (id: number) => Promise<CategoryType>
  createCategory: (data: CategoryFormType) => void
  updateCategory: (id: number, data: CategoryFormType) => void
  deleteCategory: (id: number, soft: boolean) => void
}

export const categoryStore: CategoryStoreType = {
  categories: [],
  getCategories: async () => [],
  getCategory: async (id: number) => ({} as CategoryType),
  createCategory: (data: CategoryFormType) => {},
  updateCategory: (id: number, data: CategoryFormType) => {},
  deleteCategory: (id: number, soft: boolean) => {},
}
