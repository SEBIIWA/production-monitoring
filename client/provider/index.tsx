import { type FC, type ReactNode } from 'react'

import { ProductsProvider } from '@/provider/product.provider'
import { UsersProvider } from '@/provider/user.provider'
import { CategoryProvider } from '@/provider/category.provider'
import { ComponentsProvider } from '@/provider/component.provider'

interface ComponentProps {
  children: ReactNode
}

export const Provider: FC<ComponentProps> = ({ children }) => {
  return (
    <ComponentsProvider>
      <CategoryProvider>
        <UsersProvider>
          <ProductsProvider>{children}</ProductsProvider>
        </UsersProvider>
      </CategoryProvider>
    </ComponentsProvider>
  )
}
