import { type JSX, type ReactNode, useContext, createContext } from 'react'

import { fetcher } from '@/utils/fetch'
import { ComponentFormType } from '@/schema/component.form'
import { componentStore, ComponentStoreType } from '@/provider/store/components.store'

interface ComponentProps {
  children: ReactNode
}

const ComponentsContext = createContext<ComponentStoreType>(componentStore)

function ComponentsProvider({ children }: ComponentProps): JSX.Element {
  const getComponents = async () => await fetcher.get('api/components/').then((res) => res.data)
  const getComponent = async (id: string) => await fetcher.get(`api/components/${id}/`).then((res) => res.data)
  const createComponent = (data: ComponentFormType) =>
    fetcher
      .post(
        'api/components/',
        { ...data },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => res.data)
  const updateComponent = (id: string, data: ComponentFormType) =>
    fetcher
      .patch(
        `api/components/${id}/`,
        { ...data },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => res.data)
  const deleteComponent = (id: string) => fetcher.delete(`api/components/${id}/`).then((res) => res.data)

  return (
    <ComponentsContext.Provider
      value={{
        getComponents,
        getComponent,
        createComponent,
        updateComponent,
        deleteComponent,
      }}>
      {children}
    </ComponentsContext.Provider>
  )
}

const useComponents = () => useContext(ComponentsContext)

export { ComponentsProvider, useComponents }
