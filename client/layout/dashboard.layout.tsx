import Head from 'next/head'
import { type ReactNode, type FC } from 'react'

import { useDrawer } from '@/provider/drawer.provider'

import { DashboardSideBar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { PathIndicator } from '@/components/path-indicator'

interface ComponentProps {
  children: ReactNode
}

const DashboardLayout: FC<ComponentProps> = ({ children }) => {
  const { sidebarState } = useDrawer()

  return (
    <main className='w-full max-w-full h-full min-h-screen flex bg-muted/40'>
      <Head>
        <title>Dashboard</title>
      </Head>
      {sidebarState && (
        <aside className='bg-foreground flex-1 max-w-[280px] sticky inset-0'>
          <DashboardSideBar />
        </aside>
      )}

      <article className='flex-1 bg-background flex flex-col items-center'>
        <header className='bg-background w-full border-b shadow-sm h-16 sticky top-0 z-10'>
          <DashboardHeader />
        </header>
        <div className='w-full h-16 flex items-center justify-start'>
          <PathIndicator />
        </div>
        <div className='flex-1 w-full p-4 overflow-y-auto'>{children}</div>
      </article>
    </main>
  )
}

export { DashboardLayout }
