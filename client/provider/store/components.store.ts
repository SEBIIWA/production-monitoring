import { ComponentFormType } from '@/schema/component.form'

export interface ComponentStoreType {
  getComponents: () => Promise<ComponentType[]>
  getComponent: (id: string) => Promise<ComponentType>
  createComponent: (data: ComponentFormType) => void
  updateComponent: (id: string, data: ComponentFormType) => void
  deleteComponent: (id: string) => void
}

export const componentStore: ComponentStoreType = {
  getComponents: async () => [],
  getComponent: async (id: string) => ({} as ComponentType),
  createComponent: (data: ComponentFormType) => {},
  updateComponent: (id: string, data: ComponentFormType) => {},
  deleteComponent: (id: string) => {},
}
