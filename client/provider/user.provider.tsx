import { type JSX, type ReactNode, createContext, useContext } from 'react'

import { fetcher } from '@/utils/fetch'
import { UserFormType } from '@/schema/user.form'
import { userStore, UserStoreType } from '@/provider/store/user.store'

interface ComponentProps {
  children: ReactNode
}

const UsersContext = createContext<UserStoreType>(userStore)

function UsersProvider({ children }: ComponentProps): JSX.Element {
  const getUsers = async () => await fetcher.get('api/users/').then((res) => res.data)
  const getUser = async (id: number) => await fetcher.get(`api/users/${id}`).then((res) => res.data)
  const createUser = (data: UserFormType) => fetcher.post('api/users/', { ...data }).then((res) => res.data)
  const updateUser = (id: number, data: UserFormType) => fetcher.put(`api/users/${id}`, { ...data }).then((res) => res.data)
  const deleteUser = (id: number) => fetcher.delete(`api/users/${id}`).then((res) => res.data)

  return (
    <UsersContext.Provider
      value={{
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
      }}>
      {children}
    </UsersContext.Provider>
  )
}

const useUsers = () => useContext(UsersContext)

export { UsersProvider, useUsers }
