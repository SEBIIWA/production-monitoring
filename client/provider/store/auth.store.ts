import { LoginFormType } from '@/schema/login.form'
import { MutationFunction } from '@tanstack/react-query'

export interface AuthStoreType {
  currentUser: CurrentUserType
  getCurrentUser: () => void
  isAuthenticated: boolean
  login: (data: LoginFormType) => void
  logout: () => void
  lockScreen: () => void
}

export const authStore: AuthStoreType = {
  currentUser: {} as CurrentUserType,
  getCurrentUser: () => {},
  isAuthenticated: false,
  login: ({ username = '', password = '' }) => {},
  logout: () => {},
  lockScreen: () => {},
}
