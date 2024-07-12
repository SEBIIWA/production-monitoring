import { type ReactNode, type FC } from 'react'

import { useDrawer } from '@/provider/drawer.provider'

import { DashboardSideBar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'

interface ComponentProps {
  children: ReactNode
}

const DashboardLayout: FC<ComponentProps> = ({ children }) => {
  const { sidebarState } = useDrawer()

  return (
    <main className='w-full max-w-full h-full min-h-screen flex bg-muted/40'>
      {sidebarState && (
        <aside className='bg-[#0d0e12] flex-1 max-w-[280px] sticky inset-0'>
          <DashboardSideBar />
        </aside>
      )}

      <article className='flex-1 flex flex-col items-center'>
        <header className='bg-background w-full border-b shadow-sm h-16 sticky top-0 z-10'>
          <DashboardHeader />
        </header>
        <div className='flex-1 w-full p-4 overflow-y-auto'>{children}</div>
      </article>
    </main>
  )
}

export { DashboardLayout }
