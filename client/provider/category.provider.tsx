import { type JSX, type ReactNode, useContext, useState, useEffect } from 'react'
import { createContext } from 'react'

import { fetcher } from '@/utils/fetch'
import { CategoryFormType } from '@/schema/category.form'
import { categoryStore, CategoryStoreType } from '@/provider/store/category.store'

interface ComponentProps {
  children: ReactNode
}

const CategoriesContext = createContext<CategoryStoreType>(categoryStore)

function CategoryProvider({ children }: ComponentProps): JSX.Element {
  const [categories, setCategories] = useState<CategoryType[]>(categoryStore.categories)

  const getCategories = async () => await fetcher.get('api/categories/').then((res) => res.data)
  const getCategory = async (id: number) => await fetcher.get(`api/categories/${id}`).then((res) => res.data)
  const createCategory = (data: CategoryFormType) => fetcher.post('api/categories/', { ...data }).then((res) => res.data)
  const updateCategory = (id: number, data: CategoryFormType) => fetcher.put(`api/categories/${id}`, { ...data }).then((res) => res.data)
  const deleteCategory = (id: number, soft: boolean) => fetcher.delete(`api/categories/${id}`).then((res) => res.data)

  useEffect(() => {
    getCategories().then((data) => setCategories(data))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
      }}>
      {children}
    </CategoriesContext.Provider>
  )
}

const useCategories = () => useContext(CategoriesContext)

export { CategoryProvider, useCategories }
