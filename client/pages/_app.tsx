import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useRouter } from 'next/router'
import { Toaster } from '@/components/ui/toaster'
import { DashboardLayout } from '@/layout/dashboard.layout'

import { AuthProvider } from '@/provider/auth.provider'
import { DashboardProvider } from '@/provider/drawer.provider'
import { ProductsProvider } from '@/provider/product.provider'
import { UsersProvider } from '@/provider/user.provider'
import { CategoryProvider } from '@/provider/category.provider'

import { queryClient } from '@/utils/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const layout = () => {
    if (pathname.startsWith('/dashboard')) {
      return (
        <DashboardLayout>
          <CategoryProvider>
            <UsersProvider>
              <ProductsProvider>
                <Component {...pageProps} />
              </ProductsProvider>
            </UsersProvider>
          </CategoryProvider>
        </DashboardLayout>
      )
    }
    return <Component {...pageProps} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DashboardProvider>{layout()}</DashboardProvider>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  )
}