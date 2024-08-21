import { UserFormType } from '@/schema/user.form'

export interface UserStoreType {
  getUsers: () => Promise<UserType[]>
  getUser: (id: number) => void
  createUser: (data: UserFormType) => void
  updateUser: (id: number, data: UserFormType) => void
  deleteUser: (id: number, soft: boolean) => void
}

export const userStore: UserStoreType = {
  getUsers: async () => [],
  getUser: (id: number) => {},
  createUser: (data: UserFormType) => {},
  updateUser: (id: number, data: UserFormType) => {},
  deleteUser: (id: number, soft: boolean) => {},
}
