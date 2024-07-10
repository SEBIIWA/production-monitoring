import { type ReactNode, type FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
      <AnimatePresence>
        {sidebarState && (
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ duration: 0.3 }} className='bg-foreground flex-1 max-w-[280px] sticky inset-0'>
            <DashboardSideBar />
          </motion.aside>
        )}
      </AnimatePresence>
      <motion.article transition={{ duration: 0.3 }} className='flex-1 flex flex-col items-center'>
        <header className='bg-background w-full border-b shadow-sm h-16 sticky top-0 z-10'>
          <DashboardHeader />
        </header>
        <div className='flex-1 w-full p-4 overflow-y-auto'>{children}</div>
      </motion.article>
    </main>
  )
}

export { DashboardLayout }
