import { UserFormType } from '@/schema/user.form'

export interface UserStoreType {
  getUsers: () => Promise<UserType[]>
  getUser: (id: string) => Promise<UserType>
  createUser: (data: UserFormType) => void
  updateUser: (id: string, data: UserFormType) => void
  deleteUser: (id: string, soft: boolean) => void
}

export const userStore: UserStoreType = {
  getUsers: async () => [],
  getUser: async (id: string) => ({} as UserType),
  createUser: (data: UserFormType) => {},
  updateUser: (id: string, data: UserFormType) => {},
  deleteUser: (id: string, soft: boolean) => {},
}
