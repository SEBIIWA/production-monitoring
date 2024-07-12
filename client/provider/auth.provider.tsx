import { createContext, type JSX, type ReactNode, useContext, useEffect, useState } from 'react'

import { fetcher } from '@/utils/fetch'
import { useRouter } from 'next/router'
import { LoginFormType } from '@/schema/login.form'
import { AuthStoreType, authStore } from '@/provider/store/auth.store'

interface ComponentProps {
  children: ReactNode
}

const AuthContext = createContext<AuthStoreType>(authStore)

function AuthProvider({ children }: ComponentProps): JSX.Element {
  const { push, replace, pathname } = useRouter()

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
        if (pathname === '/') {
          push('/dashboard')
        }
        setUserLoading(false)
      })
      .catch(() => {
        setIsAuthenticated(false)
        localStorage.removeItem('token')
        replace('/')
        setUserLoading(false)
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isUserLoading) {
    return <div className='w-full h-screen flex items-center justify-center'>loading</div>
  }

  return <AuthContext.Provider value={{ login, logout, lockScreen, getCurrentUser, currentUser, isAuthenticated }}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
