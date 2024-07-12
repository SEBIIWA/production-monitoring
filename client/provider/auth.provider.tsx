import { createContext, type JSX, type ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react'

import { fetcher } from '@/utils/fetch'
import { useRouter } from 'next/router'
import { LoginFormType } from '@/schema/login.form'
import { AuthStoreType, authStore } from '@/provider/store/auth.store'

interface ComponentProps {
  children: ReactNode
}

const UserContext = createContext<AuthStoreType>(authStore)

function AuthProvider({ children }: ComponentProps): JSX.Element {
  const { push, pathname } = useRouter()

  const [isUserLoading, setUserLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(authStore.currentUser)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const login = async (data: LoginFormType) =>
    await fetcher
      .post('/login', { ...data })
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data
      })

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    push('/')
  }

  const lockScreen = () => {}

  const getCurrentUser = () => {
    fetcher
      .get('/me', {
        headers: {
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data)
        setIsAuthenticated(true)

        // Ensure state updates are complete before redirecting
        if (pathname === '/' && localStorage.getItem('token')) {
          push('/dashboard')
        }

        setUserLoading(false)
      })
      .catch((error) => {
        setIsAuthenticated(false)

        if (pathname.startsWith('/dashboard') && !localStorage.getItem('token')) {
          push('/')
        }

        setUserLoading(false)
        throw error.response.data
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isUserLoading) {
    return <div className='w-full h-screen flex items-center justify-center'>loading</div>
  }

  return <UserContext.Provider value={{ login, logout, lockScreen, getCurrentUser, currentUser, isAuthenticated }}>{children}</UserContext.Provider>
}

const useAuth = () => useContext(UserContext)

export { AuthProvider, useAuth }
