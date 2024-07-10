import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useRouter } from 'next/router'
import { DashboardLayout } from '@/layout/dashboard.layout'

import { DashboardProvider } from '@/provider/drawer.provider'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const layout = () => {
    if (pathname.startsWith('/dashboard')) {
      return (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )
    }
    return <Component {...pageProps} />
  }

  return <DashboardProvider>{layout()}</DashboardProvider>
}