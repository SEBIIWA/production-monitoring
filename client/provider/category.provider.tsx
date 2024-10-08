import { useRouter } from 'next/router'
import { type JSX, type ReactNode, useContext, useState, useEffect, createContext } from 'react'

import { fetcher } from '@/utils/fetch'
import { useQuery } from '@tanstack/react-query'
import { CategoryFormType } from '@/schema/category.form'
import { categoryStore, CategoryStoreType } from '@/provider/store/category.store'

interface ComponentProps {
  children: ReactNode
}

const CategoriesContext = createContext<CategoryStoreType>(categoryStore)

function CategoryProvider({ children }: ComponentProps): JSX.Element {
  const { pathname } = useRouter()
  const [categories, setCategories] = useState<CategoryType[]>(categoryStore.categories)

  const getCategories = async () => await fetcher.get('api/categories/').then((res) => res.data)
  const getCategory = async (id: string) => await fetcher.get(`api/categories/${id}/`).then((res) => res.data)
  const createCategory = (data: CategoryFormType) => fetcher.post('api/categories/', { ...data }).then((res) => res.data)
  const updateCategory = (id: string, data: CategoryFormType) => fetcher.put(`api/categories/${id}/`, { ...data }).then((res) => res.data)
  const deleteCategory = (id: string) => fetcher.delete(`api/categories/${id}/`).then((res) => res.data)

  const { data, isFetched } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 0,
    retryOnMount: true,
  })

  useEffect(() => {
    if (isFetched) {
      setCategories(data)
    }
  }, [isFetched, pathname]) // eslint-disable-line react-hooks/exhaustive-deps

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
