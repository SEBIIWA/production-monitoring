import { type FC } from 'react'

import { HeaderSidebarToggler } from '@/components/common/header-sidebar-toggler'
import { HeaderFullScreenToggler } from '@/components/common/header-fullscreen-toggler'

interface ComponentProps {}

const DashboardHeader: FC<ComponentProps> = ({}) => {
  return (
    <nav className='w-full h-full flex items-center justify-between px-4'>
      <HeaderSidebarToggler />
      <HeaderFullScreenToggler />
    </nav>
  )
}

export { DashboardHeader }
