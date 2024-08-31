import { CategoryFormType } from '@/schema/category.form'

export interface CategoryStoreType {
  categories: CategoryType[]
  getCategories: () => Promise<CategoryType[]>
  getCategory: (id: string) => Promise<CategoryType>
  createCategory: (data: CategoryFormType) => void
  updateCategory: (id: string, data: CategoryFormType) => void
  deleteCategory: (id: string) => void
}

export const categoryStore: CategoryStoreType = {
  categories: [],
  getCategories: async () => [],
  getCategory: async (id: string) => ({} as CategoryType),
  createCategory: (data: CategoryFormType) => {},
  updateCategory: (id: string, data: CategoryFormType) => {},
  deleteCategory: (id: string) => {},
}
